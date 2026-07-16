# Store Location Fields Specification

## Problem Statement

O cadastro de loja hoje guarda endereco, mas nao guarda cidade e estado como campos estruturados. Isso dificulta exibir, filtrar ou validar a localizacao basica da loja sem depender de texto livre.

## Goals

- [ ] Permitir que a criacao de loja receba e persista `city` como nome da cidade.
- [ ] Permitir que a criacao de loja receba e persista `state` como UF brasileira em duas letras maiusculas.
- [ ] Manter o fluxo manual do Insomnia alinhado ao contrato atual de criacao de loja.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Geolocalizacao, latitude/longitude ou mapa | O pedido atual e apenas cidade e estado. |
| Lista oficial de municipios/UFs | A primeira validacao necessaria e estrutural e simples. |
| Busca publica por cidade/estado | Nenhuma rota de filtro foi solicitada. |

---

## User Stories

### P1: Criar loja com cidade e estado MVP

**User Story**: Como lojista, quero informar cidade e estado ao criar minha loja para que a localizacao basica fique estruturada no cadastro.

**Why P1**: A criacao de loja e o ponto de entrada do fluxo principal de onboarding.

**Acceptance Criteria**:

1. WHEN `POST /api/stores` receber `city` e `state` validos THEN system SHALL criar a Store com esses campos.
2. WHEN o use case criar uma Store THEN system SHALL repassar `city` e `state` para a entidade e para o repository.
3. WHEN `state` nao tiver exatamente duas letras maiusculas THEN system SHALL rejeitar a Store.
4. WHEN `city` estiver vazio THEN system SHALL rejeitar a Store.

**Independent Test**: Executar unitarios de `CreateStoreUseCase` e `Store` validando que `city` e `state` existem no resultado e que entradas invalidas falham.

---

### P1: Persistir cidade e estado no Supabase

**User Story**: Como sistema, quero mapear cidade e estado entre dominio e tabela `stores` para preservar os dados apos persistencia.

**Why P1**: Sem persistencia, a API retornaria dados inconsistentes entre criacao, consulta e listagem.

**Acceptance Criteria**:

1. WHEN `SupabaseStoreRepository.create` inserir uma Store THEN system SHALL enviar `city` e `state` para `stores`.
2. WHEN `SupabaseStoreRepository.update` atualizar uma Store THEN system SHALL enviar `city` e `state` para `stores`.
3. WHEN `SupabaseStoreRepository` mapear uma linha da tabela THEN system SHALL preencher `Store.city` e `Store.state`.
4. WHEN a migration for aplicada THEN system SHALL adicionar `city` e `state` na tabela `stores`.

**Independent Test**: Executar build TypeScript e unitarios que exercitam Store/Use Cases; migration pode ser revisada por diff.

---

### P2: Atualizar loja com cidade e estado

**User Story**: Como lojista, quero editar cidade e estado junto com os demais dados da loja para corrigir informacoes do cadastro.

**Why P2**: O CRUD de Store ja possui atualizacao e deve permanecer coerente com os campos criados.

**Acceptance Criteria**:

1. WHEN `UpdateStoreUseCase` receber `city` THEN system SHALL atualizar `Store.city`.
2. WHEN `UpdateStoreUseCase` receber `state` THEN system SHALL atualizar `Store.state`.
3. WHEN `city` ou `state` nao forem enviados no update THEN system SHALL preservar os valores existentes.

**Independent Test**: Executar unitarios de `UpdateStoreUseCase`.

---

### P2: Fixture Insomnia atualizada

**User Story**: Como desenvolvedor/testador, quero que a collection do Insomnia envie cidade e estado para validar o fluxo manual real.

**Why P2**: A request documentada de criacao de loja precisa acompanhar o contrato obrigatorio.

**Acceptance Criteria**:

1. WHEN a request `07 - Criar loja` for aberta THEN system SHALL conter `city` e `state` no body JSON.
2. WHEN a request `19 - Atualizar loja` for aberta THEN system SHALL conter exemplo de `city` e `state` editaveis.
3. WHEN a documentacao do Insomnia for lida THEN system SHALL mencionar que Store cobre cidade e estado.

**Independent Test**: Validar o JSON da collection e revisar o trecho do markdown.

---

## Edge Cases

- WHEN `city` for string vazia ou apenas espacos THEN system SHALL rejeitar com erro de dominio.
- WHEN `state` for diferente de duas letras maiusculas THEN system SHALL rejeitar com erro de dominio.
- WHEN update nao enviar `city` nem `state` THEN system SHALL manter os valores existentes.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| SLOC-01 | P1: Criar loja com cidade e estado | Execute | Verified |
| SLOC-02 | P1: Persistir cidade e estado no Supabase | Execute | Implemented; integration pending DB migration |
| SLOC-03 | P2: Atualizar loja com cidade e estado | Execute | Verified |
| SLOC-04 | P2: Fixture Insomnia atualizada | Execute | Verified |

**Coverage:** 4 total, 4 mapped to inline execution steps, 0 unmapped.

---

## Success Criteria

- [x] `Store` possui `city` e `state` como strings.
- [x] `CreateStoreUseCase` cria loja com `city` e `state`.
- [x] `UpdateStoreUseCase` atualiza `city` e `state` quando enviados.
- [x] Repository Supabase persiste e mapeia `city` e `state`.
- [x] `docs/insomnia/shopkeeper-onboarding.insomnia.json` contem `city` e `state` na criacao de loja.

## Validation Notes

- `npm run build` passou.
- `npx jest src/models/__tests__/models.spec.ts src/useCases/store/__tests__/CreateStoreUseCase.spec.ts src/useCases/store/__tests__/UpdateStoreUseCase.spec.ts --runInBand` passou com 57 testes.
- `npx jest --testMatch '**/src/useCases/**/*.spec.ts' --testPathIgnorePatterns='\\.integration\\.spec\\.ts$' --coverage --runInBand` passou com 162 testes; `src/useCases/store` ficou em 100% para statements, branches, functions e lines.
- `npm run test:coverage -- --runInBand` falhou em testes de integracao porque o banco usado pelos testes ainda nao tem `stores.city` no schema cache. Aplicar `supabase/migrations/20260711153000_add_store_location_fields.sql` no ambiente de teste e repetir o coverage amplo.
