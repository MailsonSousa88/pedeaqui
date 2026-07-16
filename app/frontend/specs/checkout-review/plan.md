# Plan: checkout-review

## Resumo Tecnico

Criar uma tela frontend-only para revisao do plano escolhido e preparacao do redirecionamento futuro para Stripe Checkout. A entrega deve renderizar a experiencia visual completa, preservar o conceito de `planId`, impedir continuidade sem plano e usar um service/adapter local para isolar a futura integracao com endpoint real.

## Flow Context

- Flow: `merchant-flow`
- Posicao: apos cadastro do lojista, pre-registro/configuracao inicial da loja e validacao/revisao dos dados obrigatorios; antes do pagamento externo.
- Entrada: lojista pendente em onboarding, com `planId` selecionado. Nesta entrega, considerar apenas o plano Basico.
- Saida/proximo passo: acionar logica preparada para obtencao de sessao/link de pagamento; sem redirecionamento externo real nesta entrega.
- Restricoes derivadas do fluxo:
  - A loja nao deve ser considerada ativa nesta tela.
  - A tela nao deve coletar dados financeiros.
  - A tela nao deve liberar dashboard, CRUD ou rotas administrativas.
  - Ativacao do lojista continua dependente de webhook valido no backend.
  - Botao `Voltar` esta fora do escopo atual.

## Scope Lock

Target: Frontend

Allowed paths:

- `app/frontend/src/`
- `app/frontend/specs/checkout-review/`
- `app/frontend/package.json`
- `app/frontend/package-lock.json`

Forbidden paths:

- `app/backend/`
- `database/`
- `supabase/`
- migrations
- `docs/` globais do projeto

## Arquitetura

A feature deve ficar em `src/features/billing/checkout-review/`, separando composicao de pagina, componentes visuais, hook de orquestracao, service/adapter e tipos.

O componente de pagina deve apenas compor a tela. A acao de continuar para pagamento deve chamar um hook da feature. O hook deve usar um service local preparado para futura integracao com backend, sem chamar Stripe diretamente e sem inventar endpoint real.

Como nao ha formulario, nao usar `schemas/`, React Hook Form ou Zod nesta entrega.

## Arquivos Planejados

- `pages/`: `CheckoutReviewPage.tsx`, responsavel pela composicao da tela.
- `components/`:
  - `CheckoutReviewHeader.tsx`
  - `SelectedPlanCard.tsx`
  - `PaymentMethodList.tsx`
  - `SecurityNotice.tsx`
  - `CheckoutAction.tsx`
- `hooks/`: `useCheckoutReview.ts`, responsavel por estado de loading, erro e acionamento do service.
- `services/`: `checkoutReviewService.ts`, adapter local preparado para futura sessao de Stripe Checkout.
- `schemas/`: nao aplicavel.
- `types/`: `checkoutReview.ts`, com `PlanId`, `PlanSummary`, `CheckoutSessionRequest` e `CheckoutSessionResult`.
- `styles/`: nao previsto inicialmente.
- `contracts/`: `specs/checkout-review/contracts/create-checkout-session.md`, descrevendo o contrato esperado futuro sem implementar backend.

## Design System Necessario

- foundations:
  - `colors.md`
  - `typography.md`
  - `spacing.md`
  - `radius.md`
  - `shadows.md`
- components:
  - `button.md`
  - `card.md`
  - `badge.md`
  - `alert.md`
- patterns:
  - `onboarding-flow.md`
  - `empty-error-loading-states.md`
- motion:
  - Nao usar nesta entrega, pois `framer-motion` nao esta instalado e microinteracao nao e requisito necessario.

## Estrategia de Estilo

- Tailwind no TSX: usar para layout, responsividade, cores, espacamento, tipografia, cards, botoes, badges e estados.
- CSS Modules em `styles/`: nao usar inicialmente.
- Motivo para usar CSS Module, se houver: apenas se durante implementacao surgir pseudo-elemento, efeito complexo ou repeticao visual que deixe TSX ilegivel.
- CSS global necessario: nao, salvo base/theme ja existente.

## Contratos e Dependencias

- Dependencia futura de backend: endpoint para criar/obter sessao de Stripe Checkout.
- Nesta entrega, o service deve retornar ausencia de URL real e permitir que o hook mostre o erro definido na spec.
- Contrato esperado deve registrar entrada minima com `planId` e contexto de onboarding quando definido futuramente.
- Nao criar endpoint, controller, webhook, rota ou logica backend.

## Dependencias de Biblioteca

- Framer Motion: nao usar nesta entrega.
- Lucide React: usar para icones visuais da tela. Como faz parte da stack prevista, pode ser adicionada ao frontend se ainda nao estiver instalada.
- React Hook Form: nao usar, pois nao ha formulario.
- Zod: nao usar, pois nao ha schema de formulario nesta tela.

## ADR

- ADR necessaria: nao
- Motivo: a feature nao altera arquitetura oficial, nao adiciona dependencia estrutural fora da stack prevista, nao muda autenticacao, contratos globais, backend ou organizacao oficial.
- Caminho do rascunho, se necessario: `app/frontend/docs/adrs/<numero>-<titulo>.md`
- Status: nao necessaria

## Validacao

- Rodar `npm run build` em `app/frontend`.
- Rodar `npm run lint` em `app/frontend`.
- Verificar visualmente:
  - logo oficial `/logoPedeAqui.jpeg`;
  - card central responsivo;
  - botao unico `Continuar para pagamento`;
  - estado de loading;
  - estado de erro com texto definido no clarify;
  - ausencia de coleta de dados financeiros;
  - ausencia de redirecionamento real para Stripe.

## Riscos

- O fluxo real de `planId` ainda nao existe no frontend; a implementacao deve usar uma fonte local controlada e deixar claro onde conectar contexto real depois.
- Endpoint de Stripe Checkout ainda nao existe; o service precisa ser facil de substituir.
- A tela pode parecer finalizacao de ativacao; copy e aviso de seguranca devem deixar claro que a ativacao depende de pagamento/webhook.
- Se `lucide-react` precisar ser instalado, o lockfile sera alterado e deve entrar no escopo do commit da feature.
