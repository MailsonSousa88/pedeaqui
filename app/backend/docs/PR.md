# Modificações: Cadastro de Usuários, Validação de CPF e Separação de Domínios (Identity & Tenant)

Nesta etapa, implementamos a validação de CPF no fluxo de cadastro de usuários (para evitar a criação de usuários órfãos no Supabase Auth) e a separação arquitetural e de domínio entre **Identity** (Profile com CPF de 11 dígitos) e **Billing/Tenant** (Tenant com CNPJ de 14 dígitos opcional).

---

## 1. Migração de Banco de Dados (Supabase/PostgreSQL)
Para suportar o novo fluxo de separação de contextos e validações, foram realizadas as seguintes alterações na estrutura de dados:
- **Renomeação de Coluna:** Renomeada a coluna `cpf_cnpj` para `business_document` na tabela `tenants`.
- **Flexibilização de Restrição:** Removida a restrição `NOT NULL` da coluna `business_document` na tabela `tenants`.
- **Constraint de Validação (CHECK):** Adicionada a constraint `CHECK (business_document IS NULL OR length(business_document) = 14)` para assegurar que apenas CNPJs válidos de 14 dígitos (ou nulos) sejam inseridos em `tenants`.
- **Criação de View (`v_tenants_details`):** Implementação de uma view de banco de dados para consolidação das informações do Tenant, incluindo a lógica de fallback para faturamento:
  ```sql
  COALESCE(t.business_document, p.document) AS billing_document
  ```
  Esta view atua como uma Anti-Corruption Layer (ACL) na infraestrutura para ler os dados unificados sem acoplar os modelos de domínio.

---

## 2. Separação de Domínios
Em conformidade com o ADR 002 e as regras de Clean Architecture definidas para o projeto:
- **IdentityContext (Profile):** Lida estritamente com pessoas físicas (CPF). A entidade `Profile` contém o campo `document` (CPF com 11 dígitos).
- **TenantManagementContext (Tenant):** Lida com a entidade comercial (CNPJ). O modelo [Tenant.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/models/Tenant.ts) foi modificado para utilizar `businessDocument` (CNPJ com 14 dígitos ou nulo).
- Ajustados também os testes do domínio correspondente em `src/models/__tests__/models.spec.ts`.

---

## 3. Validações no SignUpUseCase (Cadastro)
Modificação no caso de uso [SignUpUseCase.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/useCases/auth/SignUpUseCase.ts) para robustecer o fluxo de registro:
- **Verificação Prévia de CPF:** Antes de disparar a criação do usuário no Supabase Auth (`this.authRepository.signUp`), realizamos uma busca pelo CPF no banco de dados através do `ProfileRepository`.
- **Prevenção de Usuários Órfãos:** Caso o CPF já esteja cadastrado em algum perfil existente, o caso de uso lança imediatamente o erro `'CPF already registered'`, impedindo que uma credencial de autenticação seja criada no Supabase Auth sem o perfil associado.

---

## 4. Interfaces, Repositórios e Testes Unitários
Para viabilizar a verificação do documento e garantir a cobertura de testes:
- **Nova Consulta no Repositório:** Adicionado o método `findByDocument(document: string): Promise<Profile | null>` na interface `IProfileRepository` e implementado em `SupabaseProfileRepository`.
- **Atualização de Mocks:** Atualizados os mocks de teste nos casos de uso de Autenticação (`LoginUseCase`, `RefreshSessionUseCase`, `SignUpUseCase`).
- **Cobertura de Testes:** Garantida a cobertura de 100% de linhas, instruções e ramificações (branches) nos casos de uso modificados e criados.

---

# Modificações Históricas: Correção do Fluxo de Autenticação e Habilitação de RLS em `plans`

Este documento registra as correções realizadas no script de testes de autenticação e a implementação de segurança com Row Level Security (RLS) na tabela `plans` do banco de dados local e de produção.

---

## 1. Correção no Script de Teste

#### [verifyAuth.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/scripts/verifyAuth.ts)
Ajustamos o mapeamento do token JWT obtido no endpoint `/api/auth/login`. O script esperava `session.access_token`, mas a resposta real devolve diretamente `accessToken`. O script agora completa com sucesso o fluxo: Cadastro -> Login -> Obter perfil do usuário logado.

---

## 2. Habilitação de RLS e Políticas na tabela `plans`

Para sanar a vulnerabilidade apontada no Supabase Studio de que a tabela `plans` estava exposta de forma pública sem RLS ativo, implementamos as alterações nos seguintes arquivos fonte da verdade:
1. **Migração do Projeto**: [20260618000000_init.sql](file:///home/Vitor/Projetos/pedeaqui/app/backend/supabase/migrations/20260618000000_init.sql)
2. **Arquivo Externo Versão de Produção/Banco de Dados**: [bd-atual-v4.sql](file:///home/Vitor/%C3%81rea%20de%20trabalho/pedeaqui/bd-pedeAqui/bd-atual-v4.sql)

### Modificações Realizadas em Ambos os Arquivos:
- Habilitamos o RLS na tabela `plans`:
  ```sql
  ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
  ```
- Criamos a política de leitura pública (`plans_read_all`) para permitir que todos (autenticados ou não) vejam os planos ativos da plataforma:
  ```sql
  CREATE POLICY plans_read_all ON plans
    FOR SELECT
    USING (active = true);
  ```
- Criamos a política de escrita administrativa (`plans_admin_modify`) que restringe a manipulação da tabela exclusivamente a administradores do sistema ativos (presentes na tabela `admins`):
  ```sql
  CREATE POLICY plans_admin_modify ON plans
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM admins
        WHERE admins.id = auth.uid() AND admins.active = true
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM admins
        WHERE admins.id = auth.uid() AND admins.active = true
      )
    );
  ```

---

## 3. Validação das Políticas no Banco Local

Executamos as instruções SQL correspondentes diretamente no banco de dados local do Supabase via MCP, e consultamos as políticas ativas da tabela `plans` para certificar o funcionamento correto.

### Resultado da Consulta das Políticas (`pg_policies`):
- **`plans_read_all`**: Ativa para comando `SELECT` com filtro `(active = true)`.
- **`plans_admin_modify`**: Ativa para todos os comandos (`ALL`) com checagem de existência ativa na tabela `admins` vinculada ao `auth.uid()`.
