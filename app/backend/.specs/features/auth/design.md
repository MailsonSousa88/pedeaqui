# Auth - Design atual / Autoritativo

## Autoridade
- `src/routes/authRoutes.ts`
- `src/controllers/AuthController.ts`
- `src/middlewares/authMiddleware.ts`
- `src/useCases/auth/*`
- `src/repositories/IAuthRepository.ts`
- `src/repositories/IProfileRepository.ts`
- `src/repositories/supabase/SupabaseAuthRepository.ts`
- `src/repositories/supabase/SupabaseProfileRepository.ts`
- `src/models/Profile.ts`

## Camadas Confirmadas
- Routes declaram endpoints publicos e protegidos.
- `AuthController` valida campos obrigatorios simples, chama use cases e formata status HTTP.
- Use cases contem a coordenacao de autenticacao, sessao e profile.
- Repositories encapsulam chamadas Supabase Auth e queries em `profiles`.
- `Profile` e entidade de dominio e valida CPF quando recebe documento.

## Fluxos Confirmados
- Signup: route publica -> controller extrai body -> `SignUpUseCase` valida CPF, verifica duplicidade por documento, cria usuario Auth e cria `Profile`.
- Login: route publica -> `LoginUseCase` autentica credenciais e busca profile por `authUserId`.
- Refresh: route publica -> `RefreshSessionUseCase` atualiza sessao e busca profile.
- Logout: route protegida -> `authMiddleware` valida token -> `LogoutUseCase` chama repositorio Auth.
- Me: route protegida retorna o objeto `req.user` injetado pelo middleware.

## Integracoes
- Supabase Auth e acessado somente pelo repositorio Auth e pelo middleware.
- Supabase tabela `profiles` e acessada somente pelo repositorio de Profile.
- O middleware assume a decisao ADR 005: `auth.user.id === profile.id === tenant.id`.

## Gaps Reais
- O Supabase client e singleton; o middleware valida token, mas nao cria client por request com contexto do usuario para as queries seguintes.
- Reset de senha esta simplificado no controller e nao modela o token de recuperacao como contrato HTTP explicito.
