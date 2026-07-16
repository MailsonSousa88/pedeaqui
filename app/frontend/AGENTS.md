# Instruções para Agentes de IA - Frontend PedeAqui

Este arquivo governa exclusivamente `app/frontend`. O frontend usa Spec-Driven Development inspirado no GitHub Spec Kit.

## 1. Funcionamento do Frontend e Fontes de Verdade

- **Aplicação governada:** `app/frontend`.
- **Motor do spec kit:** `.specify/`.
- **Specs executáveis:** `specs/`.
- **Código real:** `src/`.
- **ADRs locais do frontend:** `docs/adrs/`.
- **Fonte oficial do produto:** `../../docs/`.
- **Descrição textual das telas:** `../../docs/screens/`.

Antes de qualquer tarefa, leia `.specify/memory/context-loading.md` e carregue somente o contexto necessário para a fase atual. Nunca carregue toda a pasta `.specify/`.

## 2. Escopo Obrigatório

O agente é frontend-only por padrão.

É proibido, salvo instrução explícita do usuário:

- alterar `../backend/`;
- criar endpoints, controllers, routes, use cases ou repositories backend;
- alterar banco, migrations, Supabase, autenticação ou webhooks;
- implementar contratos backend inexistentes;
- mudar contratos globais sem aprovação.

Quando a feature depender de backend, registre a dependência em `specs/<feature>/contracts/` e trate como contrato externo.

## 3. Fluxo Spec-Driven Obrigatório

Toda tela ou feature deve seguir esta ordem:

```text
specify -> clarify -> plan -> tasks -> analyze -> implement
```

Regras:

- `specify`: criar ou revisar `spec.md`; não implementar código.
- `clarify`: perguntar e registrar ambiguidades que afetam código.
- `plan`: definir arquitetura, design system, contratos, dependências e `Scope Lock`.
- `tasks`: quebrar o plano em tarefas pequenas com paths permitidos/proibidos.
- `analyze`: verificar inconsistências entre spec, clarify, plan e tasks.
- `implement`: executar somente a próxima task pendente.

Se faltar informação que afete código, pare em `clarify`. Nunca preencha lacunas com suposição.

## 4. Arquitetura Frontend

O frontend deve ser organizado por feature:

```text
src/
├── app/
├── features/
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── schemas/
│       ├── types/
│       ├── styles/
│       └── pages/
└── shared/
```

Regras:

- Componentes renderizam UI e não chamam API diretamente.
- Hooks orquestram estado, side effects e fluxo da feature.
- Services concentram comunicação HTTP.
- Schemas concentram validação de formulários.
- Types concentram contratos e DTOs.
- Código comum deve ir para `shared/`.
- Uma feature não deve importar outra feature diretamente.
- Tailwind/classes no TSX é o padrão principal para layout, espaçamento, cores, tipografia, responsividade e estados simples.
- CSS Modules são permitidos como apoio dentro de `feature/<feature>/styles/` ou ao lado do componente quando houver pseudo-elementos, animações, efeitos decorativos, seletores complexos ou repetição visual que prejudique a legibilidade do TSX.
- Não usar `assets/` para CSS. `assets/` deve guardar imagens, SVGs, fontes ou arquivos estáticos da feature.
- CSS global deve ser mínimo e nunca concentrar estilos de telas/features em uma pasta global.

## 5. Stack e Design

Stack esperada:

- React + TypeScript + Vite;
- Tailwind CSS;
- Lucide React;
- React Hook Form;
- Zod;
- Framer Motion para microinterações controladas.

Ao criar UI, use apenas os módulos de design system citados no `plan.md`. Não invente cores, padrões visuais, componentes ou fluxos fora da spec.

Logo oficial:

- Usar sempre a imagem real `public/logoPedeAqui.jpeg`.
- Em JSX, referenciar como `/logoPedeAqui.jpeg`.
- Não recriar a logo com texto, ícone avulso ou composição manual.

## 6. Princípios de Engenharia

Toda implementação deve respeitar `.specify/memory/engineering-principles.md`:

- KISS;
- YAGNI;
- DRY;
- SOLID;
- baixo acoplamento;
- padrões de projeto apenas quando reduzirem complexidade real.

Não crie abstrações especulativas. Não misture UI, API, validação e regra de negócio no mesmo componente.

## 7. Gatilhos de Parada

O agente deve parar e pedir confirmação quando:

- a task exigir alterar backend;
- a spec não existir;
- o `plan.md` não tiver `Scope Lock`;
- a task atual não tiver paths permitidos/proibidos;
- houver contradição entre spec, plan e tasks;
- for necessário adicionar dependência não prevista;
- uma decisão exigir ADR;
- faltar resposta para ambiguidade que afeta código.

ADR não é exigida para implementação comum. ADR só se aplica a decisões arquiteturais relevantes, dependências estruturais, autenticação, contratos globais, organização oficial, mudança de decisão já registrada ou inclusão de biblioteca relevante não prevista.

Quando uma ADR for necessária:

1. parar a implementação;
2. criar rascunho em `app/frontend/docs/adrs/`;
3. registrar contexto, opções consideradas, recomendação e impacto;
4. aguardar aprovação humana antes de continuar.

Não criar ADR em `../../docs/` a partir do spec kit frontend.

## 8. Definition of Done

Uma task só pode ser marcada como concluída quando:

- respeitou o escopo frontend;
- alterou apenas paths permitidos;
- não inventou requisitos ou comportamento;
- seguiu arquitetura, design system e princípios de engenharia;
- checks definidos na task foram executados ou a impossibilidade foi registrada;
- `tasks.md` foi atualizado somente após validação.
