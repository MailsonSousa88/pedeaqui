# Checklist: listagem pública de lojas

## Spec

- [x] Escopo claro
- [x] Fora de escopo explícito
- [x] RFs/RNFs rastreados
- [x] Ambiguidades resolvidas ou registradas

Evidências:

- A integração limita-se a substituir `localStores` por `GET /api/stores/public`.
- A UI atual e a pesquisa existente estão explicitamente congeladas.
- `RF001`, `RNF0011`, `RNF0012`, `UC-CL-0001` e `US-CL-0002` estão referenciados.
- A ausência de screen oficial, paginação, cidade/UF e filtro de localização está registrada como pendência futura.

## Plan

- [x] Scope Lock presente
- [x] Backend proibido quando frontend-only
- [x] Arquivos planejados coerentes
- [x] Design system referenciado
- [x] Necessidade de ADR avaliada
- [x] ADR aprovada antes de tasks/implementação, quando necessária

Evidências:

- Os caminhos permitidos limitam a implementação a service, types, hook assíncrono, composição da rota, `App.tsx` e exclusão do mock.
- Componentes, `StoreListPage`, `useStoreList`, carrinho, storefront, package, Vitest e backend estão proibidos.
- Nenhum módulo novo de design system é necessário porque não haverá mudança visual.
- ADR foi avaliada como desnecessária por se tratar de integração comum com padrões já previstos.

## Tasks

- [x] Tasks pequenas
- [x] Paths permitidos/proibidos
- [x] Dependências claras
- [x] Checks definidos

Evidências:

- T001 implementa contrato e adapter.
- T002 implementa estado assíncrono e retry.
- T003 compõe a rota sem UI nova.
- T004 liga `App.tsx` e remove o mock.
- T005 valida comportamento e Scope Lock.
- Dependência linear: `T001 -> T002 -> T003 -> T004 -> T005`.

## Rastreabilidade

| Requisito | Spec | Plan | Tasks |
| --- | --- | --- | --- |
| Lojas reais via endpoint público | RF-FE-001 | Service, hook e composição | T001, T002, T003, T004, T005 |
| Navegação por slug para visão do consumidor | RF-FE-002 | Adapter e ligação no App | T001, T003, T004, T005 |
| Loading, sucesso, vazio, erro e retry | RF-FE-003 | Hook de orquestração | T002, T003, T005 |
| Pesquisa atual preservada | RF-FE-004 | Separação entre hooks | T002, T003, T005 |
| Remoção do mock de lojas | Escopo | Remoção do mock | T004, T005 |
| Carrinho intocado | Fora de escopo | Scope Lock | Todas as tasks |
| UI e lógica atuais preservadas | Fora de escopo | Scope Lock e composição | T003, T004, T005 |

## Inconsistências

### Críticas

- Nenhuma.

### Não bloqueantes

- Não existe screen oficial da listagem em `docs/screens`; a UI atual foi confirmada pelo usuário como referência imutável.
- `RF001` e `RNF0012` exigem recursos que o endpoint e a tela atuais não suportam. A entrega não afirma concluir esses requisitos integralmente e mantém a lacuna registrada.
- `StoreSummary.id` continuará representando o slug por compatibilidade com o callback atual; essa decisão é intencional e está registrada no contrato.
- O diretório `app/frontend/specs/` pode estar ignorado pelo Git e talvez não seja incluído em commit comum.

## Resultado da Análise

- Status: aprovado para implementação da T001.
- Bloqueios críticos: nenhum.
- Implementação executada nesta etapa: nenhuma.
- Próxima ação permitida: executar somente T001 após solicitação explícita do usuário.
