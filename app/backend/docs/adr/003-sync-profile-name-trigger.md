# ADR 003: Sincronização de Nome via Trigger (fn_sync_profile_name) vs UpdateProfileUseCase

**Status**: Proposto / Em Avaliação
**Data**: 2026-07-02
**Domínio**: IdentityContext

## Contexto

O projeto adota uma arquitetura em duas camadas para a gestão de usuários:
1. **`auth.users`**: Gerenciada pelo GoTrue (Supabase), responsável pelas credenciais e dados técnicos de sessão. Contém o campo JSONB `raw_user_meta_data`.
2. **`public.profiles`**: Nossa entidade de domínio, contendo regras de negócio da aplicação, como `name`, `phone` e `document` (CPF).

No início do desenvolvimento, foi criado o gatilho (`trigger`) de banco de dados **`trg_sync_profile_name`** que executa a função **`fn_sync_profile_name()`**. O objetivo era espelhar o `full_name` do GoTrue para o domínio de perfis de forma automática. 

Recentemente, para o fluxo de onboarding do lojista, implementamos a rota `PATCH /api/profile/me` e o **`UpdateProfileUseCase`**, permitindo a atualização dos dados do perfil diretamente na entidade de domínio com as devidas validações da aplicação.

Essa evolução resultou em **fontes de escrita concorrentes**, levantando preocupações sobre consistência de dados.

---

## Como funciona o Trigger (fn_sync_profile_name)

A lógica está fixada no banco de dados, configurada da seguinte forma:

1. **Gatilho (Trigger)**: Ouve eventos de `UPDATE` na tabela `auth.users`, focando especificamente na coluna `raw_user_meta_data`.
2. **Função de Sincronização**: Ao detectar uma mudança, extrai a string de `new.raw_user_meta_data->>'full_name'`.
3. **Escrita**: Executa um `UPDATE public.profiles SET name = novo_nome WHERE id = new.id`.

### Fluxo 1: Escrita via Supabase Client (Frontend)
- O frontend chama `supabase.auth.updateUser({ data: { full_name: 'Novo Nome' } })`.
- O GoTrue altera `auth.users`.
- O Trigger copia 'Novo Nome' para `public.profiles.name`.
- *Resultado: Sincronizado, mas contornou a API (Clean Architecture).*

### Fluxo 2: Escrita via Backend API (UpdateProfileUseCase)
- O frontend chama o backend: `PATCH /api/profile/me { "name": "Novo Nome Backend" }`.
- O backend altera `public.profiles.name` aplicando validações de negócio.
- O Trigger **não dispara** (pois `auth.users` não foi alterado).
- *Resultado: Desalinhado. `auth.users` contém o nome antigo, e `profiles` contém o nome atualizado.*

---

## Prós e Contras do Modelo Atual

### Prós (Por que o trigger existe?)
* **Integração com OAuth (Social Login)**: Quando o usuário loga via Google ou Apple, o GoTrue captura automaticamente o nome e preenche o `raw_user_meta_data`. O trigger salva o desenvolvedor de ter que escrever lógica adicional para mapear o nome do provedor para a tabela `profiles` no momento do registro.
* **Praticidade para MVPs**: Permite que o frontend construa fluxos simples utilizando apenas o SDK de Autenticação do Supabase.

### Contras (Riscos Arquiteturais)
* **Bypass de Regras de Negócio**: O `UpdateProfileUseCase` exige que o nome não seja vazio (`trim() === ''`). Uma atualização via SDK pelo frontend aciona o trigger, gravando diretamente no banco e **ignorando** completamente as validações codificadas no Use Case.
* **Dessincronização Bidirecional**: Quando o nome é alterado corretamente pelo backend, o `auth.users` retém um dado obsoleto. Se o frontend exibir o nome lendo da `session.user.user_metadata`, mostrará o nome desatualizado para o usuário até que o token expire ou a sessão seja recarregada.
* **Falta de Clareza de Responsabilidade**: Viola a regra onde a camada `Use Cases` é a única orquestradora da lógica de negócios, descentralizando a edição de perfis (parte no Node.js, parte no PostgreSQL).

---

## Decisão Recomendada

Devido às violações do paradigma da Clean Architecture e aos riscos de dados dessincronizados na UI:

1. **Restringir `raw_user_meta_data` a Leitura (Somente Provedores Externos):** O campo `full_name` no GoTrue deve ser considerado útil apenas no momento da criação da conta (para capturar o nome do Google/Facebook via `SignUpUseCase`).
2. **Descontinuar/Remover o Trigger em Updates:** O trigger `fn_sync_profile_name` para `UPDATE` deve ser removido ou desativado. 
3. **Consolidar o Backend como Única Fonte da Verdade para Escrita:** Toda modificação de nome, telefone ou CPF por parte de um usuário logado **deve obrigatoriamente** passar pelo `UpdateProfileUseCase` (API REST). O frontend não deve utilizar `supabase.auth.updateUser()` para atualizar dados pessoais de domínio.

**Ação futura pendente**: Discutir a remoção oficial deste trigger durante a fase de consolidação do módulo de autenticação e documentar no frontend qual API deve ser consumida para gerenciar a conta do lojista.
