# Plan: store-preconfiguration

## Resumo Técnico

Implementar a tela de pré-configuração da loja como uma feature isolada em `src/features/store/store-preconfiguration/`, seguindo o fluxo Spec-Driven definido para o frontend.

A tela será um formulário multi-step de 3 etapas:

1. Identidade, CNPJ opcional e funcionamento da loja.
2. Endereço da loja.
3. Revisão dos dados antes da finalização.

O frontend deve validar localmente os campos, preservar os dados enquanto o lojista navega entre as etapas e preparar um payload final para integração futura com backend. Como os endpoints ainda não devem ser assumidos como prontos, a implementação deve deixar um service/adapter desacoplado e facilmente conectável quando o contrato real existir.

## Flow Context

- Flow: `merchant-flow`
- Posição: depois da tela de cadastro do lojista e antes da tela de verificação do pré-registro da loja.
- Entrada: lojista recém-cadastrado, em onboarding/status pendente, com plano escolhido preservado em contexto, mas não exibido nesta tela.
- Saída/próximo passo: `screen-store-preregistration-validation-0009.md`.
- Restrições derivadas do fluxo:
  - não exibir plano escolhido;
  - não exibir, editar ou pré-visualizar slug;
  - não ativar lojista;
  - não processar pagamento;
  - não publicar loja;
  - não implementar dashboard ou CRUD de produtos;
  - preservar dados apenas durante as 3 etapas da tela;
  - não inventar endpoint backend.

## Scope Lock

Target: Frontend

Allowed paths:

- `app/frontend/src/`
- `app/frontend/specs/store-preconfiguration/`
- `app/frontend/package.json`
- `app/frontend/package-lock.json`

Forbidden paths:

- `app/backend/`
- `database/`
- `supabase/`
- migrations
- `docs/`
- `app/frontend/docs/adrs/`, salvo se surgir ADR obrigatória

## Arquitetura

A feature deve seguir organização por feature:

```text
app/frontend/src/features/store/store-preconfiguration/
├── components/
├── hooks/
├── pages/
├── schemas/
├── services/
├── styles/
└── types/
```

Responsabilidades:

- `pages/`: composição da tela e encaixe das etapas.
- `components/`: componentes visuais específicos da feature.
- `hooks/`: controle de etapa, submissão, loading e orquestração do formulário.
- `schemas/`: validação com Zod.
- `services/`: ponto de integração preparado para backend futuro.
- `types/`: tipos de formulário, etapas, payload e contratos.
- `styles/`: CSS Module de apoio apenas para efeitos/layout que ficarem ruins em Tailwind puro.

Componentes não devem chamar API diretamente. O hook orquestra o fluxo e chama o service quando a task permitir a integração mock/plug.

## Arquivos Planejados

- `app/frontend/src/features/store/store-preconfiguration/pages/StorePreconfigurationPage.tsx`
  - Composição geral da tela, header, etapa atual e botões principais.
- `app/frontend/src/features/store/store-preconfiguration/components/StorePreconfigurationHeader.tsx`
  - Logo oficial, título, subtítulo e indicador textual de etapa.
- `app/frontend/src/features/store/store-preconfiguration/components/StepProgress.tsx`
  - Barra segmentada de 3 etapas com acessibilidade.
- `app/frontend/src/features/store/store-preconfiguration/components/IdentityStep.tsx`
  - Campos da etapa 1.
- `app/frontend/src/features/store/store-preconfiguration/components/AddressStep.tsx`
  - Campos da etapa 2.
- `app/frontend/src/features/store/store-preconfiguration/components/ReviewStep.tsx`
  - Blocos de revisão e ações `Editar`.
- `app/frontend/src/features/store/store-preconfiguration/components/FormField.tsx`
  - Wrapper local para label, ícone, input/select, hint e erro, se não houver shared equivalente.
- `app/frontend/src/features/store/store-preconfiguration/hooks/useStorePreconfigurationForm.ts`
  - React Hook Form, step state, navegação, loading e submit.
- `app/frontend/src/features/store/store-preconfiguration/schemas/storePreconfigurationSchema.ts`
  - Schema Zod e validações por etapa.
- `app/frontend/src/features/store/store-preconfiguration/services/storePreconfigurationService.ts`
  - Adapter/plug para futura integração com backend.
- `app/frontend/src/features/store/store-preconfiguration/types/storePreconfiguration.ts`
  - Tipos do formulário, payload, dias da semana, steps e retorno do service.
- `app/frontend/src/features/store/store-preconfiguration/styles/StorePreconfiguration.module.css`
  - Apoio visual opcional para background/decorativos discretos e detalhes que não compensem em Tailwind.
- `app/frontend/specs/store-preconfiguration/contracts/store-preconfiguration-payload.md`
  - Contrato esperado do payload a ser enviado quando o backend estiver pronto.

Separação explícita:

- `pages/`: composição da tela.
- `components/`: blocos reutilizáveis da feature.
- `hooks/`: estado e orquestração.
- `services/`: comunicação HTTP futura/adapter.
- `schemas/`: validação de formulário.
- `types/`: contratos e DTOs.
- `styles/`: CSS Modules de apoio da feature, apenas quando Tailwind no TSX não for suficiente.

## Design System Necessário

- foundations:
  - `colors.md`
  - `spacing.md`
  - `typography.md`
- components:
  - `button.md`
  - `input.md`
  - `progress-bar.md`
  - `review-block.md`
- patterns:
  - `onboarding-flow.md`
- motion:
  - usar apenas se `framer-motion` estiver instalado e se a task permitir microinterações; caso contrário, usar transições CSS/Tailwind simples.

## Estratégia de Estilo

- Tailwind no TSX:
  - layout;
  - grid/flex;
  - spacing;
  - tipografia;
  - estados simples;
  - responsividade;
  - cards, inputs, botões e progress bar.
- CSS Modules em `styles/`:
  - permitido apenas para background/decorativos discretos, pseudo-elementos ou regras visuais repetidas que deixem o TSX ilegível.
- Motivo para usar CSS Module, se houver:
  - manter a tela visualmente refinada sem transformar os componentes em blocos enormes de classes.
- CSS global necessário:
  - não, salvo base/theme já existente.

## Contratos e Dependências

### Payload preparado pela tela

O payload final deve representar os dados coletados nas 3 etapas:

```ts
type StorePreconfigurationPayload = {
  tenant: {
    document: string | null;
  };
  store: {
    slug: string;
    storeName: string;
    horarioAbertura: string;
    horarioFechamento: string;
    endereco: string;
    descricao: string | null;
    logoUrl: string | null;
  };
  source: {
    businessDocument: string | null;
    businessHours: {
      startDay: Weekday;
      endDay: Weekday;
      opensAt: string;
      closesAt: string;
    };
    address: {
      state: string;
      city: string;
      neighborhood: string;
      street: string;
      number: string;
    };
  };
};
```

Regras:

- `tenant.document` deve receber o CNPJ sem máscara quando informado; se não houver CNPJ, fica `null` para o fluxo futuro usar o CPF do profile.
- O payload temporário do pré-registro não contém WhatsApp.
- Ao criar a loja, `checkoutReviewService` deve preencher `whatsappNumber` com `session.profile.phone`, já coletado e validado no cadastro principal.
- `store.slug` é gerado tecnicamente a partir do nome da loja, mas não aparece na UI.
- `opensAt` e `closesAt` devem usar formato `HH:mm`.
- `closesAt` deve ser posterior a `opensAt`.
- Funcionamento atravessando meia-noite não é suportado no MVP.
- Slug não aparece visualmente nesta tela.
- Plano escolhido não aparece visualmente e não deve ser alterado nesta tela.

### Backend

- Não assumir endpoint real.
- Não alterar backend.
- Não criar contrato global.
- Criar apenas contrato esperado dentro de `specs/store-preconfiguration/contracts/`.
- Service deve ser pequeno e desacoplado para conexão futura.

## Dependências de Biblioteca

- Framer Motion:
  - previsto no spec kit, mas não instalado atualmente no `package.json`.
  - não é obrigatório para a primeira implementação; se for usado, instalar antes conforme task específica.
- Lucide React:
  - previsto no spec kit, mas não instalado atualmente no `package.json`.
  - necessário para ícones de loja, e-mail, telefone, calendário, relógio, localização e check.
- React Hook Form:
  - previsto no spec kit, mas não instalado atualmente no `package.json`.
  - recomendado para controle do formulário multi-step.
- Zod:
  - previsto no spec kit, mas não instalado atualmente no `package.json`.
  - necessário para schema e validações.

Como essas bibliotecas já estão previstas em `AGENTS.md` e `.specify/memory/architecture.md`, a instalação delas não exige ADR. Ainda assim, a task de dependências deve ser explícita e limitada a `app/frontend/package.json` e `app/frontend/package-lock.json`.

## ADR

- ADR necessária: não
- Motivo: a feature segue arquitetura, stack e padrões já previstos no spec kit. Não há mudança arquitetural relevante, contrato global, autenticação, backend, organização oficial ou biblioteca fora da stack prevista.
- Caminho do rascunho, se necessário: não aplicável
- Status: não necessária

## Validação

Checks previstos:

- `npm run build`
- `npm run lint`

Validações funcionais esperadas:

- etapa 1 impede avanço com campos obrigatórios vazios;
- CNPJ inválido mostra erro próximo ao campo quando preenchido;
- Pré-registro não renderiza nem valida WhatsApp;
- dias usam intervalo contínuo;
- horário de fechamento menor ou igual à abertura é inválido;
- horário atravessando meia-noite é inválido;
- etapa 2 impede avanço com endereço incompleto;
- etapa 3 mostra exatamente os dados preenchidos;
- `Editar` volta para a etapa correspondente;
- `Voltar` preserva dados;
- `Finalizar` monta payload e avança para o próximo passo/mock de integração;
- não há exibição de plano, slug, upload de imagem ou pagamento.

## Riscos

- Dependências esperadas ainda não estão instaladas no projeto.
- O projeto ainda possui estrutura inicial do Vite em `App.tsx`/`App.css`, então a implementação pode precisar substituir conteúdo placeholder.
- Rota real de cadastro e próxima tela ainda podem não existir; usar callbacks/navegação isolada ou placeholders explícitos até o roteamento ser definido.
- Backend ainda não deve ser assumido como pronto; service deve ficar preparado sem acoplamento.
- A criação da loja depende de `session.profile.phone`; ausência de sessão ou telefone válido deve impedir a integração com mensagem clara.
