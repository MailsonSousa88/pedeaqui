# Signup Document - Baseline atual / Autoritativo

## Autoridade
- `src/useCases/auth/SignUpUseCase.ts`
- `src/models/Profile.ts`
- `src/utils/cpfValidator.ts`
- `src/repositories/IProfileRepository.ts`
- `src/repositories/supabase/SupabaseProfileRepository.ts`
- `supabase/migrations/20260621194800_restrict_profile_document_to_cpf.sql`
- `docs/adr/001-cpf-cnpj-validation.md`
- `docs/adr/006-adocao-cpf-cnpj-validator.md`

## Comportamento Confirmado
- Signup exige `document`.
- O documento de signup representa CPF do `Profile`, nao CNPJ do `Tenant`.
- `SignUpUseCase` sanitiza e valida o CPF antes de criar usuario no Auth.
- CPF invalido gera erro `Invalid CPF`.
- CPF ja existente e consultado por `IProfileRepository.findByDocument` antes do signup no Auth.
- `Profile` tambem valida CPF no construtor quando `document` esta presente.
- O CPF persistido em `profiles.document` usa somente digitos.

## Interfaces/Fluxos Confirmados
- Entrada: `POST /api/auth/signup` com `email`, `password`, `name`, `phone`, `document`.
- Fluxo: AuthController -> `SignUpUseCase` -> `IProfileRepository.findByDocument` -> `IAuthRepository.signUp` -> `IProfileRepository.create`.

## Persistencia
- `profiles.document` e `VARCHAR(11) UNIQUE`.
- O banco permite registros legados sem documento porque a coluna nao e `NOT NULL`.
- Nao ha constraint de banco garantindo exatamente 11 digitos; a validacao forte esta na aplicacao/dominio.

## Fora de Escopo
- CNPJ e documento empresarial pertencem ao `Tenant.businessDocument`.
- Fallback de documento de cobranca pertence a `v_tenants_details`.

## Gaps Reais
- Obrigatoriedade de CPF para novos cadastros existe no use case, nao no banco.
- Specs antigas citavam validador generico e suporte CPF/CNPJ no signup; o estado real e CPF estrito em `Profile`.
