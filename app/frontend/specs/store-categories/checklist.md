# Checklist: store-categories

## Spec

- [x] Escopo claro
- [x] Fora de escopo explícito
- [x] RFs/RNFs rastreados
- [x] Ambiguidades resolvidas ou registradas

## Plan

- [x] Scope Lock presente
- [x] Backend proibido quando frontend-only
- [x] Arquivos planejados coerentes
- [x] Design system referenciado
- [x] Necessidade de ADR avaliada
- [x] ADR aprovada antes de tasks/implementação, quando necessária

## Tasks

- [x] Tasks pequenas
- [x] Paths permitidos/proibidos
- [x] Dependências claras
- [x] Checks definidos

## Resultado da Análise

Nenhuma inconsistência crítica encontrada.

## Observações

- A edição de categoria nesta primeira versão é visual/local, sem persistência e sem backend.
- A remoção é clicável visualmente, mas não deve remover categoria de verdade nesta versão.
- A ordenação real por `sort_order` está fora do escopo; cards aparecem em ordem de criação.
- Não criar `services/`, `schemas/`, contratos HTTP, backend, migrations ou Supabase.
- A implementação pode seguir para `implement` a partir da T001.

## Análise da evolução — issue #51

- [x] Spec, clarify e plan substituem explicitamente a criação histórica no gerenciamento.
- [x] Listagem, edição, remoção e estados existentes permanecem no escopo.
- [x] A criação inline do cadastro de produto usa hook e service próprios e está protegida como read-only.
- [x] Scope Lock impede backend, migrations e dependência nova.
- [x] Nenhuma inconsistência crítica bloqueia T010.
