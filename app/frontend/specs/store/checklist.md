# Checklist: storefront pública do consumidor — issue #52

## Spec

- [x] Escopo consumer claro e sem mistura administrativa
- [x] Fora de escopo explícito, incluindo backend e carrinho demonstrativo
- [x] RFs/RNFs e fontes do PRD rastreados
- [x] Ambiguidades resolvidas ou registradas como dependências externas

## Plan

- [x] Flow Context e Scope Lock presentes
- [x] Backend, banco, Supabase e migrations proibidos
- [x] Arquivos planejados coerentes com arquitetura por feature
- [x] Gestão preservada em rota separada e autorização mantida
- [x] Design system limitado aos módulos necessários
- [x] Necessidade de ADR avaliada; ADR não necessária
- [x] Tooling de teste isolado em dependências de desenvolvimento

## Tasks

- [x] Tasks pequenas e ordenadas por dependência
- [x] Paths permitidos/proibidos em todas as tasks
- [x] Requisitos e critérios de conclusão definidos
- [x] Testes, lint, build e diff previstos nos checks
- [x] Testes distinguem visão pública e gestão do proprietário

## Coerência Cruzada

- [x] `/storefront/:slug` e `/lojas/:slug` são sempre consumer em spec, clarify, plan e tasks
- [x] `/storefront/:slug/manage` concentra a gestão existente
- [x] Busca, categoria, preço, ordenação e paginação são locais sobre dados reais
- [x] Campos ausentes no contrato não são simulados
- [x] 404 público não revela motivo administrativo
- [x] Carrinho real não é implementado nesta issue e não usa o seed demonstrativo existente
- [x] Web Share API possui fallback de cópia
- [x] Nenhuma task autoriza alteração backend

## Resultado da Análise

- Nenhuma inconsistência crítica encontrada entre `spec.md`, `clarify.md`, `plan.md`, `tasks.md` e `contracts/storefront-api.md`.
- As decisões históricas de storefront mista estão explicitamente superadas.
- A feature permanece frontend-only.
- A implementação pode iniciar pela T001.

## Análise Pós-Implementação

- [x] A página pública não importa nem renderiza `ProductManagementPage`, `CategoryManagementPage`, formulário ou mutação administrativa.
- [x] A página de gestão é resolvida antes da rota pública genérica e exige `canManage` para compor controles.
- [x] Login e configuração pós-checkout direcionam para `/storefront/:slug/manage`.
- [x] Listagem pública direciona para `/storefront/:slug`.
- [x] Estados `missing`, `unavailable` e `error` não exibem causa administrativa.
- [x] Catálogo usa somente coleções reais e ignora produtos indisponíveis.
- [x] Promoção expirada não altera o preço apresentado.
- [x] Página limita a apresentação a 20 produtos.
- [x] Testes, TypeScript, build e `git diff --check` passaram.
- [ ] Lint global: bloqueado por 3 erros preexistentes fora do Scope Lock; lint de todos os arquivos alterados nesta issue passou.
