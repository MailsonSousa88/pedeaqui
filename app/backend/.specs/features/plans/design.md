# Plans - Design atual / Autoritativo

## Autoridade
- `src/routes/plans.routes.ts`
- `src/controllers/plans/*`
- `src/useCases/plans/*`
- `src/repositories/IPlansRepository.ts`
- `src/repositories/supabase/PlansRepository.ts`
- `src/models/Plan.ts`

## Camadas Confirmadas
- Route separa endpoint publico de endpoints protegidos.
- Controllers fazem validacao HTTP minima.
- Use cases aplicam regras de preco e duplicidade de Stripe price.
- Repository traduz campos camelCase para colunas Supabase.
- `Plan` valida preco positivo.

## Fluxos Confirmados
- Criar plano: valida `name` e `priceBrlCents` no controller, valida preco/stripe id no use case, persiste em `plans`.
- Listar planos: controller converte query `active`, use case delega busca.
- Listar disponiveis: controller publico chama listagem com `active: true`.
- Alterar status: controller le `id` e `active`, use case chama `updateStatus`.

## Decisoes Confirmadas
- `stripePriceId` e opcional para permitir plano interno.
- Desativar plano significa alterar `active`, nao excluir registro.

## Gaps Reais
- Autorizacao administrativa e uma regra incompleta na camada de aplicacao.
- Nao ha use case para editar nome, preco ou stripe price de plano existente.
