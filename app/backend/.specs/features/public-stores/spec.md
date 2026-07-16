# Public Stores Specification

## Problem Statement

Clientes precisam visualizar lojas publicas disponiveis sem autenticacao antes de acessar um cardapio especifico. O backend hoje expoe a consulta publica de uma loja por slug, mas nao oferece uma listagem publica de lojas.

## Goals

- [ ] Expor uma rota publica para listar lojas visiveis ao cliente.
- [ ] Manter a regra de Clean Architecture: rota -> controller -> use case -> repository.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Paginacao, busca e filtros | Nao foram solicitados para o primeiro corte. |
| Produtos, categorias ou checkout na mesma resposta | Ja existem rotas publicas separadas para cardapio. |
| Teste de integracao | Fase de exploracao proibe novos testes de integracao. |

---

## User Stories

### P1: Listar lojas publicas MVP

**User Story**: Como cliente, quero consultar lojas publicas para escolher qual cardapio acessar.

**Why P1**: E a menor rota necessaria para descoberta de lojas antes da tela publica por slug.

**Acceptance Criteria**:

1. WHEN um cliente chamar `GET /api/stores/public` sem token THEN o sistema SHALL retornar `200` com uma lista de lojas.
2. WHEN houver lojas inativas ou removidas logicamente THEN o sistema SHALL nao retorna-las na listagem publica.
3. WHEN nao houver lojas publicas THEN o sistema SHALL retornar `200` com lista vazia.

**Independent Test**: Executar o use case com repositorio mockado e confirmar que ele retorna a lista publica fornecida pelo repositorio.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| PSTORE-01 | P1: Listar lojas publicas | Execute | Verified |

**Coverage:** 1 total, 1 mapped, 0 unmapped.

---

## Success Criteria

- [x] `GET /api/stores/public` existe sem `authMiddleware`.
- [x] O use case de listagem publica possui teste unitario.
- [x] O reposititorio Supabase filtra lojas com `active = true` e `deleted_at IS NULL`.
