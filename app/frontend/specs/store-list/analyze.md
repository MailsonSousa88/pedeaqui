# Analyze: Lista de Lojas

## Status

Fase `analyze` concluída.

Resultado: **apta para IMPLEMENT**.

`spec.md`, `clarify.md`, `plan.md` e `tasks.md` estão consistentes entre si. Os bloqueios da análise anterior foram corrigidos em `tasks.md`.

## Spec

- [x] Escopo frontend-only claro.
- [x] Fora de escopo funcional explícito.
- [x] Fluxo da jornada do consumidor definido.
- [x] Pesquisa progressiva por prefixo definida.
- [x] Header sticky, cards e sub-botões especificados.
- [x] Estados, responsividade e acessibilidade definidos.
- [x] Contrato frontend definido.
- [x] Services futuros delimitados sem endpoint ou HTTP.
- [x] Ambiguidades funcionais resolvidas em `clarify.md`.

## Plan

- [x] Scope Lock presente.
- [x] Backend, banco, Supabase, endpoints e HTTP proibidos.
- [x] Arquitetura por feature definida.
- [x] Arquivos planejados coerentes com a arquitetura.
- [x] Componentes e responsabilidades definidos.
- [x] Hook de pesquisa e propagação de `onSearchChange` definidos.
- [x] Tipos e callbacks planejados.
- [x] Estados `initial`, `loading`, `success`, `empty` e `error` definidos.
- [x] `empty` diferencia os motivos `list` e `search`.
- [x] Disponibilidade própria de **Explorar** definida por `isExploreAvailable`.
- [x] Disponibilidade de **Explorar** separada de `StoreSummary.isSelectable`.
- [x] Design System necessário referenciado.
- [x] Estratégia de estilo e comportamento específico dos sub-botões definidos.
- [x] Responsividade e acessibilidade cobertas pela validação planejada.
- [x] Necessidade de ADR avaliada como não necessária.

## Tasks

- [x] Tasks pequenas e sequenciais.
- [x] Dependências claras.
- [x] Paths permitidos e proibidos presentes em todas as tasks.
- [x] Checks de lint e build presentes.
- [x] Backend, HTTP, roteamento e dependências novas bloqueados.
- [x] T001 cobre todos os estados definidos no plano.
- [x] T001 declara `empty` com motivos `list` e `search`.
- [x] T001 declara a disponibilidade independente `isExploreAvailable`.
- [x] T002 cobre o fluxo completo da pesquisa e a propagação externa única de `onSearchChange`.
- [x] T003 consome explicitamente `isExploreAvailable`, sem usar `StoreSummary.isSelectable`.
- [x] T005 usa o estado discriminado `empty` com motivos `list` e `search`.
- [x] T006 fornece o estado completo da tela e a disponibilidade própria de **Explorar**.
- [x] T007 valida estados, independência das disponibilidades e propagação única da pesquisa.

## Verificação dos Bloqueios Anteriores

### A001 — Resolvida

T001 inclui `initial`, `loading`, `success`, `empty` e `error`, com `empty` discriminado pelos motivos `list` e `search`.

### A002 — Resolvida

T001 declara `isExploreAvailable`; T003 exige seu consumo por **Explorar** e proíbe derivação a partir de `StoreSummary.isSelectable`.

### A003 — Resolvida

T002 cobre `StoreSearchField → onSearchChange → useStoreList → lista filtrada` e exige uma única propagação externa por alteração.

### A004 — Resolvida

T005 usa os cinco estados definidos no plano e diferencia `empty/list` de `empty/search`.

### A005 — Resolvida

T006 fornece o estado completo e `isExploreAvailable`. T007 valida todos os estados, a independência das disponibilidades e a propagação única de `onSearchChange`.

## Cobertura Confirmada

- Header sticky, fundo sólido, z-index e ausência de sobreposição: T003, T005 e T007.
- Pesquisa local por prefixo, normalização e refinamento: T002, T005 e T007.
- Card integralmente acionável e emissão única com **Ver loja**: T004 e T007.
- Hover específico dos sub-botões: T003, T004 e T007.
- Imagem ausente ou inválida: T004 e T007.
- Loading, erro e feedbacks vazios acessíveis: T005 e T007.
- Responsividade e ausência de rolagem horizontal: T005 e T007.
- Acessibilidade por teclado, foco, semântica e anúncios: T003, T004, T005 e T007.
- Fonte local substituível e service futuro sem HTTP: T001.
- Integração no `App` sem roteamento: T006.

## Conclusão

A documentação está coerente e as tasks cobrem os requisitos da feature.

A implementação pode iniciar por T001, respeitando uma única task por interação e todos os checks definidos.
