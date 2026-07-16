# Signup Document - Design atual / Autoritativo

## Autoridade
- `src/controllers/AuthController.ts`
- `src/useCases/auth/SignUpUseCase.ts`
- `src/models/Profile.ts`
- `src/utils/cpfValidator.ts`
- `src/repositories/supabase/SupabaseProfileRepository.ts`

## Camadas Confirmadas
- Controller apenas confere campos obrigatorios e delega.
- Use case decide a regra de aplicacao: documento obrigatorio, CPF valido e nao duplicado.
- Entidade `Profile` reforca validade estrutural do CPF.
- Repository persiste e busca CPF em `profiles.document`.

## Fluxo Confirmado
1. Controller recebe `document` no body.
2. `SignUpUseCase` sanitiza CPF e valida por utilitario interno.
3. Use case consulta duplicidade por CPF sanitizado.
4. Use case cria usuario Supabase Auth.
5. Use case cria `Profile` com o mesmo id do Auth.

## Decisoes Confirmadas
- O algoritmo de validacao foi encapsulado em `src/utils`, preservando API interna.
- A dependencia `cpf-cnpj-validator` fica fora dos models/use cases diretamente.
- O `Profile` nao aceita CNPJ como documento.

## Gaps Reais
- O banco nao expressa a regra completa de CPF obrigatorio/exatamente 11 digitos para novos registros.
