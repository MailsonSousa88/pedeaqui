# Análise de Refatoração: Separação de Profiles e Tenants

A introdução da tabela `profiles` como fonte da verdade para dados "humanos" (nome, telefone) altera fundamentalmente o escopo de outras tabelas baseadas em usuários no sistema (como `tenants` e `admins`).

## 1. Redefinição de Escopo das Tabelas

### `profiles` (A Pessoa Humana)
- **Escopo**: Armazenar os dados de qualquer indivíduo que interaja com o sistema (seja ele um Lojista, um Cliente Final ou um Admin).
- **Relacionamento**: `1:1` com `auth.users`.
- **Campos Pertencentes**: `id`, `name`, `phone`, `created_at`, `updated_at`.

### `tenants` (A Conta / Entidade Legal do Lojista)
- **Escopo**: Representar o Lojista do ponto de vista do negócio B2B e da nossa plataforma SaaS (Cobranças Stripe, Limites de Armazenamento, Status da Conta).
- **Relacionamento**: `1:1` com `auth.users` (O lojista dono da conta).
- **Atributos Removidos**: `name` (pois agora o nome do dono da conta SaaS reside em `profiles`).
- **Campos Pertencentes**: `id`, `business_document`, `status`, `photo_storage_limit`, `stripe_customer_id`, `created_at`, `updated_at`.

### `admins` (O Funcionário da Plataforma)
- **Escopo**: Representar o acesso privilegiado de suporte e operações do nosso sistema.
- **Relacionamento**: `1:1` com `auth.users`.
- **Atributos Removidos**: `name` (pois o nome do funcionário reside em `profiles`).
- **Campos Pertencentes**: `id`, `role`, `active`, `created_at`, `updated_at`.

---

## 2. Impactos em Cascata e Estruturas de Apoio no `bd-atual-v4.sql`

A adoção desse modelo exige adaptações em várias camadas do seu script SQL atual:

### A. Criação da Tabela Base (`profiles`)
- Deve ser a primeira tabela a ser criada (logo após os `ENUMS`), para que `tenants` e `admins` possam referenciá-la (ou pelo menos coexistirem com base no `auth.users`).
- RLS e Políticas para garantir que cada usuário gerencia seu próprio perfil.

### B. Remoção de Colunas
- `ALTER TABLE tenants DROP COLUMN name;`
- `ALTER TABLE admins DROP COLUMN name;`

### C. Triggers e Funções (O grande impacto)
No script atual, existe o seguinte bloco:
```sql
CREATE OR REPLACE FUNCTION fn_sync_tenant_name()
...
UPDATE tenants SET name = COALESCE(NEW.raw_user_meta_data->>'full_name', name) ...
```
- **Ação**: Este trigger **deve ser destruído e reescrito**. O Supabase agora deverá sincronizar os metadados (se você ainda usar `raw_user_meta_data` via OAuth, por exemplo) com a tabela `profiles`, e não mais com `tenants`. O novo trigger se chamará `fn_sync_profile_data()`.

### D. Views ou Consultas da API (Impacto no Backend)
Com a remoção do `name` do `tenant`, qualquer local da API ou Front-End que precise exibir "Nome do Lojista (dono)" ou "Nome do Admin" precisará fazer um `JOIN` implícito ou explícito com a tabela `profiles`. 
- Exemplo: Ao invés de `SELECT name FROM tenants`, será `SELECT p.name FROM tenants t JOIN profiles p ON t.id = p.id`.

### E. O Campo `business_document` no `tenants`
O campo `business_document` (anteriormente `cpf_cnpj`) está em `tenants` e agora é restrito estritamente a CNPJ (14 caracteres, opcional). Já o `document` (CPF) reside em `profiles` para representar a pessoa física do lojista. A consolidação dos documentos de faturamento é resolvida pela view `v_tenants_details` usando `COALESCE(t.business_document, p.document)`.

---

## 3. Plano de Ação para o Código SQL (v5)

Se você aprovar esta arquitetura, as seguintes mudanças exatas serão aplicadas no seu arquivo `/home/Vitor/Área de trabalho/pedeaqui/bd-pedeAqui/bd-atual-v4.sql`:

1. **Inserir `CREATE TABLE profiles`** com `id`, `name`, `phone`.
2. **Atualizar `CREATE TABLE admins`**: remover a coluna `name`.
3. **Atualizar `CREATE TABLE tenants`**: remover a coluna `name`.
4. **Atualizar Triggers de Sincronização**: Substituir `fn_sync_tenant_name` por `fn_sync_profile_name_from_auth` (focado na tabela `profiles`).
5. **Políticas RLS**: Adicionar as políticas para que `profiles` possa ser lido pelo dono, e possivelmente estabelecer políticas de leitura pública/parcial para o cenário onde Lojistas precisam ver os nomes dos Clientes nos pedidos.

## Open Questions para a Equipe

> [!WARNING]
> 1. Vocês concordam com essa forte separação onde `profiles` é universal para todos os humanos do sistema, e `tenants/admins` tornam-se apenas "tabelas de regras e papéis" acopladas ao ID do usuário?
> 2. Podemos proceder com as alterações de código diretamente no seu arquivo SQL (transformando-o efetivamente em uma versão v5 do seu schema)?
