# Tasks: checkout-review

## Dependency Graph

```text
T001 -> T002 -> T003 -> T004 -> T005 -> T006 -> T007 -> T008
```

## Tasks

- [x] T001 Criar contrato futuro de sessao de pagamento
  - Type: documentation/contract
  - Paths allowed:
    - `app/frontend/specs/checkout-review/contracts/create-checkout-session.md`
  - Paths forbidden:
    - `app/backend/`
    - `docs/`
    - `app/frontend/src/`
  - Depends on: none
  - Requirements: registrar contrato esperado para futura integracao Stripe Checkout sem implementar backend.
  - Done when: o contrato descreve request, response de sucesso, response de erro, ausencia de redirecionamento real nesta entrega e dependencia futura de backend.
  - Checks: revisar se nenhum endpoint real foi inventado como existente.

- [x] T002 Criar tipos base da feature
  - Type: code/types
  - Paths allowed:
    - `app/frontend/src/features/billing/checkout-review/types/checkoutReview.ts`
  - Paths forbidden:
    - `app/backend/`
    - `docs/`
    - `app/frontend/src/features/*` fora de `checkout-review`
  - Depends on: T001
  - Requirements: definir `PlanId`, `PlanSummary`, `CheckoutSessionRequest`, `CheckoutSessionResult` e estados auxiliares necessarios.
  - Done when: os tipos representam plano Basico, contexto de `planId`, erro de redirecionamento indisponivel e resultado futuro com URL opcional.
  - Checks: `npm run build`
  - Status: concluida apos instalacao das dependencias ausentes do PR #13 e execucao bem-sucedida de `npm run build`.

- [x] T003 Criar service/adapter local de checkout
  - Type: code/service
  - Paths allowed:
    - `app/frontend/src/features/billing/checkout-review/services/checkoutReviewService.ts`
    - `app/frontend/src/features/billing/checkout-review/types/checkoutReview.ts`
  - Paths forbidden:
    - `app/backend/`
    - `database/`
    - `supabase/`
    - `docs/`
  - Depends on: T002
  - Requirements: criar adapter local preparado para futura sessao Stripe, sem `fetch`, sem endpoint real e sem redirecionamento externo.
  - Done when: o service aceita request com `planId` e retorna resultado controlado indicando que o redirecionamento ainda nao esta disponivel.
  - Checks: `npm run build`

- [x] T004 Criar hook de orquestracao da tela
  - Type: code/hook
  - Paths allowed:
    - `app/frontend/src/features/billing/checkout-review/hooks/useCheckoutReview.ts`
    - `app/frontend/src/features/billing/checkout-review/services/checkoutReviewService.ts`
    - `app/frontend/src/features/billing/checkout-review/types/checkoutReview.ts`
  - Paths forbidden:
    - `app/backend/`
    - `docs/`
    - `app/frontend/src/features/*` fora de `checkout-review`
  - Depends on: T003
  - Requirements: controlar plano selecionado, loading, erro e acao `continueToPayment`.
  - Done when: o hook bloqueia continuidade sem plano, impede clique duplicado em loading e exibe a mensagem `Nao foi possivel realizar o redirecionamento para a plataforma de pagamento` quando nao houver URL.
  - Checks: `npm run build`

- [x] T005 Criar componentes visuais da feature
  - Type: code/ui
  - Paths allowed:
    - `app/frontend/src/features/billing/checkout-review/components/CheckoutReviewHeader.tsx`
    - `app/frontend/src/features/billing/checkout-review/components/SelectedPlanCard.tsx`
    - `app/frontend/src/features/billing/checkout-review/components/PaymentMethodList.tsx`
    - `app/frontend/src/features/billing/checkout-review/components/SecurityNotice.tsx`
    - `app/frontend/src/features/billing/checkout-review/components/CheckoutAction.tsx`
    - `app/frontend/package.json`
    - `app/frontend/package-lock.json`
  - Paths forbidden:
    - `app/backend/`
    - `docs/`
    - `app/frontend/src/App.tsx`
  - Depends on: T004
  - Requirements: criar header com logo oficial `/logoPedeAqui.jpeg`, badge `Plano selecionado`, card do plano Basico, metodos PIX/cartao, aviso de seguranca e botao unico.
  - Done when: componentes usam Tailwind, nao exibem botao `Voltar`, nao coletam dados financeiros e usam icones via `lucide-react` se a dependencia estiver instalada/adicionada.
  - Checks: `npm run build`

- [x] T006 Criar pagina `CheckoutReviewPage`
  - Type: code/page
  - Paths allowed:
    - `app/frontend/src/features/billing/checkout-review/pages/CheckoutReviewPage.tsx`
    - `app/frontend/src/features/billing/checkout-review/components/`
    - `app/frontend/src/features/billing/checkout-review/hooks/useCheckoutReview.ts`
    - `app/frontend/src/features/billing/checkout-review/types/checkoutReview.ts`
  - Paths forbidden:
    - `app/backend/`
    - `docs/`
    - `app/frontend/src/features/*` fora de `checkout-review`
  - Depends on: T005
  - Requirements: compor a tela completa, responsiva, centralizada, com estado inicial, loading e erro.
  - Done when: a pagina mostra `Finalize sua ativacao`, plano Basico, beneficios, metodos de pagamento, aviso Stripe e mensagem abaixo do botao.
  - Checks: `npm run build`

- [x] T007 Integrar a pagina no frontend atual
  - Type: code/integration
  - Paths allowed:
    - `app/frontend/src/App.tsx`
    - `app/frontend/src/features/billing/checkout-review/pages/CheckoutReviewPage.tsx`
  - Paths forbidden:
    - `app/backend/`
    - `docs/`
    - `app/frontend/src/features/*` fora de `checkout-review`
  - Depends on: T006
  - Requirements: renderizar a tela de checkout review como tela atual da aplicacao sem criar roteamento complexo.
  - Done when: `App.tsx` importa e renderiza `CheckoutReviewPage`.
  - Checks: `npm run build`

- [x] T008 Validar implementacao final da feature
  - Type: validation
  - Paths allowed:
    - `app/frontend/specs/checkout-review/tasks.md`
  - Paths forbidden:
    - `app/backend/`
    - `docs/`
  - Depends on: T007
  - Requirements: executar validacoes finais e marcar tasks concluidas somente apos checks.
  - Done when: `npm run build` e `npm run lint` passam ou a impossibilidade e registrada; revisao visual confirma escopo da spec.
  - Checks:
    - `npm run build`
    - `npm run lint`

## Notes

- Marcar task como concluida somente apos checks.
- Nao executar tasks futuras sem pedido explicito.
- Nao implementar backend, Stripe real, webhook, ativacao de lojista, dashboard, CRUD ou botao `Voltar`.
- Se `lucide-react` precisar ser instalado, limitar a alteracao a `app/frontend/package.json` e `app/frontend/package-lock.json`.
