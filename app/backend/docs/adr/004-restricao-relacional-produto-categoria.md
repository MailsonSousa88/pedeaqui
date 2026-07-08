# ADR 004: Restrição Relacional entre Produto e Categoria e o Uso de Soft Delete

**Data:** 02 de Julho de 2026
**Status:** Aceito

## 1. Contexto

Durante o design do Catálogo (Vitrine Viva) envolvendo Produtos e Categorias, encontramos um conflito estrutural entre a modelagem de banco de dados original e as novas regras de negócio referentes à Auditoria:

1. **A Modelagem Original:** A tabela `products` definia a FK `category_id` com a constraint `ON DELETE SET NULL`. Isso significa que um produto poderia existir sem categoria (ficando "órfão") caso a categoria-mãe fosse deletada.
2. **A Exigência de Auditoria:** Foi definido globalmente que as entidades core do sistema não sofreriam Hard Delete (exclusão física) para proteger a integridade de relatórios do usuário Super Admin. Adotou-se o **Soft Delete** (`deleted_at = NOW()`).
3. **O Conflito:** Como adotamos o Soft Delete, o gatilho `ON DELETE SET NULL` do PostgreSQL nunca é acionado. Se uma categoria recebesse o Soft Delete, ela sumiria da vitrine, mas os produtos atrelados a ela continuariam existindo com `category_id` válido apontando para uma categoria "fantasma", o que fatalmente quebraria a renderização do catálogo para o consumidor final, gerando produtos inacessíveis ou categorizados incorretamente.

## 2. Decisão

Para resolver a orfandade e proteger o catálogo contra inconsistências visuais e lógicas, tomamos as seguintes decisões conjuntas:

1. **Forçar Vínculo (Banco de Dados):**
   - Alteramos a FK `category_id` em `products` para ser **`NOT NULL`** e `ON DELETE RESTRICT` (vide migration `20260702104500_make_product_category_not_null.sql`). A partir deste ponto, **um Produto jamais pode existir sem Categoria**.

2. **Trava Relacional Reversa (Regra de Negócios):**
   - No `DeleteCategoryUseCase`, introduzimos uma trava de proteção (Count Check). **É proibido inativar/dar soft delete em uma Categoria se ela possuir Produtos Ativos**. O lojista é obrigado a excluir os produtos primeiro (ou movê-los de categoria).

3. **Garantia de Inicialização (Domínio Store):**
   - Para impedir o "Deadlock" no qual o Lojista não consegue criar um produto porque não tem categoria, mas não sabe que precisa criar uma, **a criação de uma Loja (`CreateStoreUseCase`) passou a injetar nativamente a categoria básica `"Todos"`**.

## 3. Consequências

### Positivas
- **Integridade Absoluta:** O banco de dados garante que todo produto tenha categoria, e a API garante que categorias com produtos ativos nunca sumam. 
- **UX Protegida:** A vitrine (Frontend) e os relatórios analíticos não precisarão criar checagens complexas sobre "produtos cuja categoria foi deletada".
- **Facilidade no Onboarding:** Ao criar a Loja, o lojista já pode cadastrar produtos imediatamente na categoria "Todos", acelerando a jornada de ativação.

### Negativas / Trade-offs
- O código do UseCase de Categorias e Lojas ficou ligeiramente mais complexo, exigindo injeção de repositórios vizinhos (Cross-Domain).
- O Lojista terá um pouco mais de fricção ao tentar excluir categorias em massa, sendo forçado a gerenciar o conteúdo delas primeiro.
