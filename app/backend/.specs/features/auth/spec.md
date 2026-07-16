# Auth - Baseline atual / Autoritativo

## Autoridade
- `src/app.ts`
- `src/routes/authRoutes.ts`
- `src/controllers/AuthController.ts`
- `src/middlewares/authMiddleware.ts`
- `src/useCases/auth/*`
- `src/repositories/IAuthRepository.ts`
- `src/repositories/IProfileRepository.ts`
- `src/repositories/supabase/SupabaseAuthRepository.ts`
- `src/repositories/supabase/SupabaseProfileRepository.ts`
- `src/models/Profile.ts`
- `supabase/migrations/20260618000000_init.sql`
- `supabase/migrations/20260621194800_restrict_profile_document_to_cpf.sql`
- `docs/adr/002-separacao-dominios-identidade-faturamento.md`
- `docs/adr/005-relacao-1-1-1-identity-tenant.md`
- `docs/adr/006-adocao-cpf-cnpj-validator.md`

## Comportamento Confirmado
- O modulo de auth usa Supabase Auth para credenciais e `profiles` para dados pessoais.
- Signup cria primeiro o usuario no Supabase Auth e depois cria um `Profile` com o mesmo `id` retornado pelo Auth.
- Signup exige `email`, `password`, `name`, `phone` e `document`.
- Login retorna `accessToken`, `refreshToken` e `profile`.
- Refresh recebe `refreshToken`, cria uma nova sessao pelo Supabase e retorna tokens novos mais `profile`.
- Logout exige header `Authorization: Bearer <token>` na rota protegida.
- Recover password solicita envio de email de recuperacao pelo Supabase.
- Reset password usa `supabase.auth.updateUser({ password })` no repositorio atual.
- `authMiddleware` valida Bearer token via `supabase.auth.getUser(token)` e injeta `req.user = { id, email, tenantId }`, onde `tenantId` e alias de `id`.

## Interfaces/Fluxos Confirmados
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/recover-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`, protegido por `authMiddleware`
- `GET /api/auth/me`, protegido por `authMiddleware`
- Fluxo principal: Route -> AuthController -> Use Case -> Auth/Profile Repository -> Supabase.

## Persistencia
- `profiles.id` referencia `auth.users.id`.
- `profiles.document` existe como `VARCHAR(11) UNIQUE` apos migration especifica.
- O dominio `Profile` valida CPF quando `document` esta presente.
- O armazenamento de CPF usa digitos sanitizados.

## Fora de Escopo
- Criacao de tenant, assinatura trial e loja pertencem aos modulos `tenant`, `subscription` e `store`.
- Permissoes administrativas nao sao resolvidas por auth; as rotas que exigem apenas JWT nao equivalem a autorizacao de papel admin.

## Gaps Reais
- `ResetPasswordUseCase` depende do estado/sessao do cliente Supabase e nao recebe token de reset explicitamente pela API.
- `SupabaseAuthRepository.signOut(accessToken)` recebe token, mas a implementacao atual nao usa esse valor ao chamar `supabase.auth.signOut`.
- Se `auth.signUp` concluir e `profileRepository.create` falhar por erro posterior, nao ha compensacao para remover o usuario criado no Auth.
- Specs antigas citavam rota `/api/auth/recover`; a rota real e `/api/auth/recover-password`.
