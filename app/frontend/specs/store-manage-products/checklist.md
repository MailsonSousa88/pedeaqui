# Checklist: store-manage-products

## Spec

- [x] Escopo claro
- [x] Fora de escopo explicito
- [x] RFs/RNFs rastreados
- [x] Ambiguidades resolvidas ou registradas

## Plan

- [x] Scope Lock presente
- [x] Backend proibido quando frontend-only
- [x] Arquivos planejados coerentes
- [x] Design system referenciado
- [x] Necessidade de ADR avaliada
- [x] ADR aprovada antes de tasks/implementacao, quando necessaria

## Tasks

- [x] Tasks pequenas
- [x] Paths permitidos/proibidos
- [x] Dependencias claras
- [x] Checks definidos

## Resultado da Analise

Nao ha inconsistencia critica bloqueando a implementacao.

## Ajustes Realizados Durante Analyze

- `T008` foi ajustada para dizer que o modal deve "suportar modo de edicao" em vez de "abrir", porque abrir o modal depende de hook/pagina e pertence a `T009`.

## Pontos de Atencao Para Implementacao

- A origem final de `storeId` continua plugavel e nao deve ser fixada.
- A listagem usa `GET /api/products/store/:storeId` ate existir rota administrativa protegida especifica.
- Edicao usa `PUT /api/products/:id`, conforme records.
- Disponibilidade usa acao separada `PATCH /api/products/:id/toggle-availability`.
- `UpdateProductPayload` nao deve incluir `available`.
- `details` nao deve ter edicao livre.
- Imagens, variacoes e estoque nao devem prometer persistencia real nesta feature.
