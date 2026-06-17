# Panorama Arquitetural do Banco de Dados (v5)

| Campo | Valor |
|-------|-------|
| Status | Documentação Ativa |
| Domínio | Atividade da Loja (Lojista) e Assinaturas |
| Fonte da Verdade | `bd-atual-v4.sql` (versão 5 refatorada) |

---

## 1. Contexto e Visão Geral
Esta documentação detalha as regras de negócio intrínsecas que foram programadas **diretamente no Banco de Dados PostgreSQL (via Supabase)**. Isso significa que, independentemente de falhas no Backend (Node.js), o banco de dados garante a integridade e o comportamento descrito abaixo através de Constraints (Restrições), Foreign Keys (Chaves Estrangeiras) e Triggers (Gatilhos).

---

## 2. Ciclo de Vida do Lojista (Tenant) e Assinatura

### Cenário 1: Cadastro e Ativação (Happy Path)
1. O usuário é criado no `auth.users`.
2. A API cria o `profiles` (com nome e telefone).
3. A API cria o `tenants` (com Documento (CPF/CNPJ), definindo `status = 'active'`).
4. **Ativando a Assinatura:**
   - O sistema insere um registro em `subscriptions` vinculando ao `tenant_id` e `plan_id`.
   - **Regra do Banco**: O índice `uq_subscriptions_one_active_per_tenant` impede matematicamente que a loja tenha duas assinaturas ativas ao mesmo tempo. Se a API tentar inserir uma segunda assinatura `active`, o banco rejeita a operação com erro.
   - **Regra de Datas**: A constraint `chk_subscriptions_ends_after_start` garante que a assinatura não pode terminar antes de começar.

### Cenário 2: Inadimplência ou Cancelamento (Edge Case)
- Se o Lojista não pagar, a tabela `subscriptions` aceitará a mudança de `status` para `'past_due'`, `'unpaid'` ou `'canceled'`.
- Como a restrição de "apenas 1 ativa" não se aplica a esses status, o histórico de assinaturas canceladas do lojista é mantido para sempre.

### Cenário 3: Exclusão Permanente da Conta do Lojista (Edge Case)
**Pergunta**: *O que acontece se o usuário resolver deletar sua conta depois de assinar e montar a loja?*
- Se a conta original for excluída no Supabase Auth (`auth.users`), ocorre um **Efeito Cascata Absoluto (Hard Delete)**:
  1. `auth.users` é deletado.
  2. `profiles` é deletado (`ON DELETE CASCADE`).
  3. `tenants` é deletado (`ON DELETE CASCADE`).
  4. `subscriptions` do lojista são apagadas.
  5. `stores` (a loja em si) é apagada.
  6. `categories` e `products` são apagados da loja.
  7. `product_variations` e `product_images` são apagados.
- **Riscos e Impactos**: Essa exclusão limpa totalmente o banco de dados e apaga qualquer rastro da existência do cliente (ótimo para compliance LGPD). No entanto, faturas históricas na Stripe permanecerão soltas (pois a Stripe está fora do banco).

---

## 3. Gestão do Catálogo (Lojas, Categorias e Produtos)

### Cenário 1: Criação de Catálogo (Happy Path)
1. O Tenant cria uma `store` (Loja).
2. Ele cria uma `category` (Categoria). O banco força, por meio da chave estrangeira `fk_categories_store_tenant`, que a categoria obrigatoriamente pertença ao mesmo Tenant dono da loja.
3. Ele cadastra um `product` (Produto). A restrição `fk_products_category_store` faz uma checagem dupla impressionante: **É impossível cadastrar um produto em uma categoria que pertença à loja de outro concorrente.** O banco amarra `(category_id, store_id)` garantindo que o produto e a categoria vivam debaixo do mesmo teto.

### Cenário 2: Promoções Inválidas (Edge Case)
- Se um Lojista tentar colocar um preço promocional (`promo_price_cents`) que seja MAIOR que o preço original (`price_cents`), o banco barra a operação imediatamente (`chk_promo_price_below_base`).
- Se tentar definir uma data de validade para a promoção (`promo_ends_at`) mas esquecer de colocar o preço da promoção, o banco também barra a operação (`chk_promo_ends_requires_price`).

### Cenário 3: Pausando a Loja ou Itens (Soft Delete)
**Pergunta**: *E se o lojista não quiser deletar a loja inteira para sempre, mas apenas desativar temporariamente categorias ou a loja toda?*

O banco possui uma inteligência de **Soft Delete** avançada:
1. Se o lojista (ou admin) atualizar a loja (`stores`) preenchendo o campo `deleted_at` com a data de hoje:
   - O Trigger `trg_cascade_soft_delete_store` entra em ação automaticamente.
   - Ele varre todas as `categories` e `products` atrelados àquela loja e define o `deleted_at` de todos eles **com o exato mesmo milissegundo** da loja.
   - As Políticas de Segurança (RLS) bloqueiam imediatamente que os clientes finais (Storefront) vejam a loja e seus produtos.
2. **E se ele reativar a loja?**
   - Ele define `deleted_at = NULL` na loja.
   - O Trigger, de forma inteligente, percebe isso e varre as categorias e produtos. Ele reativa **apenas** as categorias e produtos que foram desativados no mesmo momento em que a loja foi desativada, mantendo ocultos aqueles que o próprio lojista já havia desativado manualmente no passado!

---

## 4. Integração com Nuvem e Limites (Imagens)

- A tabela `product_images` guarda o caminho da nuvem (`r2_key`) e o tamanho da imagem (`size_bytes`).
- A tabela `tenants` possui o campo `photo_storage_limit`.
- **Edge Case (Quase limite de espaço)**: O banco em si não bloqueia o upload se o lojista estourar o limite (isso precisa ser feito no Backend). No entanto, o índice `idx_product_images_product_size` permite que o Backend rode uma query extremamente rápida (`SUM(size_bytes)`) para verificar se o lojista estourou o seu plano antes de permitir um novo upload.

---

## 5. Resumo da Segurança do Cliente Final

Se um cliente final "comum" tentar fazer uma requisição direta ao banco de dados pelo navegador (graças ao Supabase):
1. **O que ele pode ver?** Somente produtos (`products`), lojas (`stores`) e categorias (`categories`) que não estejam deletadas (`deleted_at IS NULL`) e cujo lojista (`tenant`) esteja ativo.
2. **O que ele pode alterar?** Somente seu próprio `profile` (nome e telefone). Ele é blindado por RLS (Row Level Security) e é impossível que ele acesse a tabela `tenants`, `subscriptions` ou `audit_logs`.
