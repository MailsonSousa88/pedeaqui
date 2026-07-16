# Checklist: detalhe público do produto

## Spec

- [x] Escopo claro.
- [x] Fora de escopo explícito.
- [x] RFs/RNFs rastreados.
- [x] Ambiguidades resolvidas ou registradas.

## Plan

- [x] Scope Lock presente.
- [x] Backend proibido para a entrega frontend-only.
- [x] Arquivos planejados coerentes com `src/features/` e com a feature `orders`.
- [x] Design system referenciado somente nos módulos necessários.
- [x] Necessidade de ADR avaliada.
- [x] ADR de testes rejeitada por decisão humana; nenhuma dependência estrutural permanece planejada ou bloqueia a implementação.

## Tasks

- [x] Tasks pequenas e ordenadas.
- [x] Paths permitidos/proibidos definidos em todas as tasks.
- [x] Dependências claras.
- [x] Checks de build, lint e diff definidos.

## Cobertura dos requisitos

| Requisito | Cobertura |
| --- | --- |
| Navegação do card para URL própria | T005, T006 |
| Recarregamento e parâmetros de rota | T004, T005 |
| Nome, descrição, preço e disponibilidade | T001, T002, T003, T004 |
| Promoção vigente e expirada | T001, T003 |
| Categoria pública | T001, T002, T003 |
| Detalhes públicos apresentáveis | T001, T003 |
| Três placeholders e navegação da galeria | T003 |
| Produto indisponível continua visível | T002, T003, T004 |
| Produto inexistente/removido/outra loja | T002, T004 |
| Loading, erro, retry e conteúdo indisponível | T002, T003, T004 |
| Retorno à vitrine da mesma loja | T004, T005 |
| Responsividade e acessibilidade básica | T003, T004, T007 |
| Dados reais e endpoints documentados | T001, T002 |

## Inconsistências encontradas e resolução

### I001 — Produto indisponível classificado como conteúdo indisponível

- Severidade: crítica antes da correção.
- Problema: `spec.md` agrupava indisponibilidade para pedido com conteúdo não localizado, contradizendo Q7.
- Resolução: `available = false` agora permanece no estado de sucesso, com texto claro e botão desabilitado. Conteúdo indisponível fica restrito a loja inexistente/inativa, produto inexistente/removido ou vínculo divergente.
- Status: resolvida.

### I002 — Loja ativa no contrato, mas validação não estava explícita nas tasks

- Severidade: média.
- Problema: o DTO consumia `active`, mas a orquestração não exigia tratamento explícito de `active = false`.
- Resolução: plano e T002 agora classificam loja inativa como conteúdo indisponível.
- Status: resolvida.

### I003 — `details` previsto no plano sem cobertura explícita de UI

- Severidade: baixa.
- Problema: T003 não citava a exibição segura de detalhes públicos simples.
- Resolução: T003 agora inclui detalhes apresentáveis e omissão de estruturas incompatíveis conforme o plano.
- Status: resolvida.

## Desvios aceitos

- A issue pede imagens atuais do produto, mas o contrato público não possui campo de imagem. Por decisão humana, esta entrega usa três placeholders neutros navegáveis.
- A issue pede testes automatizados. Por decisão humana motivada pelo prazo, nenhuma biblioteca será adicionada; build e lint serão executados pelo agente e a validação funcional será manual pelo responsável do projeto.
- O carrinho está fora do escopo e a implementação existente usa seed mockado; nenhuma integração será feita.

## Resultado

- Inconsistências críticas pendentes: nenhuma.
- ADR bloqueadora: nenhuma.
- Backend necessário: não.
- Pronto para `implement`: sim, iniciando exclusivamente por T001.
