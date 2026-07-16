# Contract: create-checkout-session

## Objetivo

Registrar o contrato esperado para a futura criacao ou obtencao de uma sessao de pagamento Stripe Checkout no fluxo de onboarding do lojista.

Este contrato e uma dependencia futura de backend. Ele nao representa endpoint existente nesta entrega e nao autoriza implementacao de backend, webhook ou integracao real com Stripe.

## Contexto de Uso

- Feature: `checkout-review`
- Tela: revisao do plano e preparacao para pagamento
- Ator: lojista em onboarding
- Momento: apos cadastro, pre-registro da loja e validacao minima do fluxo anterior

## Request Esperado

Metodo futuro sugerido: `POST`

Rota futura sugerida: a definir pelo backend.

Body esperado:

```json
{
  "planId": "basic",
  "onboardingContextId": "string"
}
```

Campos:

| Campo | Tipo | Obrigatorio | Descricao |
| --- | --- | --- | --- |
| `planId` | `string` | Sim | Identificador do plano selecionado pelo lojista. No MVP visual, o plano disponivel e `basic`. |
| `onboardingContextId` | `string` | A definir | Identificador futuro do contexto de onboarding, caso o backend use esse recurso. |

## Response de Sucesso Esperado

```json
{
  "checkoutUrl": "https://checkout.stripe.com/...",
  "expiresAt": "2026-07-03T12:00:00.000Z"
}
```

Campos:

| Campo | Tipo | Obrigatorio | Descricao |
| --- | --- | --- | --- |
| `checkoutUrl` | `string` | Sim | URL segura da Stripe para onde o frontend redirecionara o lojista. |
| `expiresAt` | `string` | Nao | Data/hora de expiracao da sessao, se o backend expuser essa informacao. |

## Response de Erro Esperado

Formato futuro sugerido:

```json
{
  "message": "Nao foi possivel realizar o redirecionamento para a plataforma de pagamento",
  "code": "CHECKOUT_SESSION_UNAVAILABLE"
}
```

Codigos esperados:

| Codigo | Quando usar |
| --- | --- |
| `PLAN_NOT_SELECTED` | Quando `planId` nao for enviado ou estiver invalido. |
| `PLAN_UNAVAILABLE` | Quando o plano nao estiver disponivel para contratacao. |
| `STORE_NOT_READY` | Quando a loja ainda nao estiver pre-registrada ou validada. |
| `CHECKOUT_SESSION_UNAVAILABLE` | Quando o backend nao conseguir criar ou recuperar a sessao de pagamento. |

## Comportamento Nesta Entrega

- Nao existe redirecionamento real para Stripe.
- Nao existe chamada HTTP real para backend.
- O frontend deve usar service/adapter local preparado para esse contrato.
- Ao nao receber `checkoutUrl`, a tela deve exibir:

```text
Nao foi possivel realizar o redirecionamento para a plataforma de pagamento
```

## Regras de Seguranca e Escopo

- O PedeAqui nao deve coletar dados de cartao, PIX ou dados financeiros diretamente.
- A ativacao do lojista nao ocorre nesta tela.
- A ativacao depende de webhook de pagamento valido no backend.
- O frontend nao deve confiar em retorno visual da Stripe como confirmacao final de pagamento.
- Este contrato nao deve alterar `app/backend/`, `docs/` globais, banco, Supabase ou migrations.
