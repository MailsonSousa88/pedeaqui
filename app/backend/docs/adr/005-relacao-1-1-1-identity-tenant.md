# ADR 005: Relacionamento 1:1:1 entre Auth, Profile e Tenant

**Data:** 2026-07-03
**Status:** Aceito

## Contexto
Durante a implementação do fluxo de onboarding do lojista (auth -> profile -> tenant), foi adotado um padrão onde a chave primária UUID gerada pelo serviço de autenticação (`auth.users.id`) é reutilizada como a chave primária para o perfil do usuário (`profiles.id`) e, subsequentemente, para a entidade comercial do lojista (`tenants.id`). Ou seja, a invariante estrutural atual garante que `auth.user.id === profile.id === tenant.id`.

## Decisão
Manteremos a relação 1:1:1 (um para um para um) entre `auth.users`, `profiles` e `tenants` na fase atual do projeto, utilizando a propagação do ID principal (UUID) do serviço de autenticação para todas essas entidades relacionadas na raiz.

## Justificativa (Prós)
1. **Simplicidade de Infraestrutura (RLS e Joins):** O Row Level Security (RLS) do Supabase é baseado fundamentalmente no `auth.uid()`. Ao compartilhar o mesmo ID, as políticas de RLS para tabelas dependentes de `tenant_id` ou `profile_id` ficam extremamente eficientes. Em vez de `auth.uid() -> join profile -> join tenant`, uma política precisa checar apenas `tenant_id = auth.uid()`.
2. **Eficiência de Banco e Carga Cognitiva:** Reduz as viagens ao banco no backend, já que o UUID presente no token JWT (como sub) é suficiente para saber o ID do tenant, dispensando chamadas a repositórios apenas para converter `authUserId` em `tenantId`.
3. **Prevenção Inata de Duplicidade:** O próprio schema de banco de dados (Primary Key) e a constraint de Foreign Key evitam estruturalmente que um Profile possua mais de um Tenant, ou vice-versa.
4. **Agilidade Inicial:** Na fase atual de construção rápida (startup/SaaS inicial), essa arquitetura elimina complexidade prematura, simplificando imensamente as assinaturas dos Use Cases e a rastreabilidade nos logs.

## Consequências (Contras)
1. **Forte Acoplamento (Rigidez de Modelo de Negócio):** 
   - A consequência mais severa é que impede estruturalmente que o sistema mude para um modelo onde um `Profile` seja "dono" de múltiplos `Tenants` no futuro.
   - Também impede o modelo B2B multiusuário tradicional, onde um `Tenant` possui múltiplos `Profiles` atrelados (ex: uma conta de loja com funcionários "gerente", "atendente").
2. **Vazamento de Detalhe de Autenticação:** A separação de responsabilidades (Clean Architecture) sofre uma leve pressão, dado que a camada de domínio (`Tenant`) passa a conhecer indiretamente uma chave de infraestrutura externa (o UUID gerado pelo Supabase Auth).
3. **Escalabilidade Restrita:** Caso a aplicação precise pivotar para suportar hierarquias organizacionais, será necessária uma migração estrutural considerável para desvincular o `id` da tabela `tenants` do `id` da tabela `profiles`, transformando-o num UUID independente com uma relação NxN (via tabela associativa `tenant_users`) ou 1xN.

## Mitigação
A decisão é baseada no trade-off da velocidade atual vs flexibilidade futura (YAGNI - You Aren't Gonna Need It). Se no futuro o produto pivotar para suportar múltiplos usuários (funcionários) por loja, introduziremos o conceito de "Papéis/Permissões de Loja" (Store Roles/Permissions), ou executaremos uma migração onde o UUID do Tenant se torne autônomo. Para o estágio atual do "PedeAqui", focado no Lojista individual e cadastro rápido, esta relação 1:1:1 fornece segurança impenetrável via RLS e altíssima velocidade.
