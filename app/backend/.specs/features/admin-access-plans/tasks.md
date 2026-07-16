# Acesso Administrativo e Gestão de Planos - Tasks Backend

**Spec**: `.specs/features/admin-access-plans/spec.md`  
**Design**: `.specs/features/admin-access-plans/design.md`  
**ADR**: `docs/adr/008-autorizacao-admin-auditoria-e-logout-por-sessao.md`  
**Status**: In Progress - Execute  
**Fase**: Consolidação confirmada em 2026-07-15  
**Escopo**: `app/backend`

---

## 1. Regras de execução

- Executar o baseline antes da primeira alteração: build, testes unitários consolidados e integração disponível.
- Parar diante de regressão preexistente não explicada ou se o ambiente Supabase não for comprovadamente local/teste.
- Não usar `service_role` no runtime da API; ele é permitido somente no helper isolado de fixtures, assertions e cleanup.
- Cada tarefa inclui seus testes obrigatórios; não existe tarefa posterior para “adicionar testes”.
- Tasks com banco compartilhado são sequenciais, mesmo quando o código seria independente.
- Manter intactos os itens não relacionados já presentes no worktree, especialmente `.agents/` e `supabase/snippets/`.
- O ADR 008 deve ser incluído de forma estreita no primeiro commit de segurança, sem absorver arquivos alheios.
- Atualizar o checkbox e registrar resultado/gate desta tarefa antes de iniciar a seguinte.

### Baseline obrigatório antes de T1

```bash
npm run build
npx jest --testMatch '**/src/useCases/**/*.spec.ts' --testPathIgnorePatterns='\.integration\.spec\.ts$' --coverage --runInBand
npm run test:integration -- --runInBand
```

Se o Supabase isolado não estiver disponível, registrar o bloqueio antes de qualquer mutation de banco. Nunca substituir o gate por produção.

## 2. Perfis de ferramentas propostos

### Perfil A - TypeScript e testes unitários

- **MCP**: nenhum MCP técnico específico detectado.
- **Skills**: `tlc-spec-driven` para orquestração; `codenavi` para navegação e implementação cirúrgica.
- **Ferramentas**: `apply_patch`, `rg`, Jest direcionado e TypeScript build.

### Perfil B - Supabase e integração

- **MCP**: nenhum Context7 disponível; consultar documentação oficial do Supabase somente quando código e docs locais não resolverem.
- **Skills**: `tlc-spec-driven` + `codenavi`.
- **Ferramentas**: Supabase CLI local, Jest/Supertest, cliente de teste isolado e `apply_patch`.

### Perfil C - Documentação

- **MCP**: nenhum.
- **Skills**: `tlc-spec-driven`.
- **Ferramentas**: `apply_patch`, validação JSON e checagens de links/arquivos.

Os perfis precisam ser confirmados pelo usuário antes de Execute. Exceções podem ser definidas por task.

## 3. Plano de execução

### Fase 1 - Fundação e banco

As fundações unitárias podem avançar em paralelo; a trilha de banco é estritamente sequencial.

```text
T1 ─→ T2 ─→ T3 ─→ T4

T5 ─→ T6
T7
T8
T9
```

### Fase 2 - Contexto administrativo

```text
T4 + T7 + T8 ──────────→ T10 ─┐
T5 + T7 + T8 ──────────→ T11 ─┼→ T13 → T14
T6 + T9 ────────────────→ T12 ─┘
```

### Fase 3 - Planos administrativos

```text
T4 + T5 + T14 → T15
T6 + T9 + T15 ─┬→ T16 ─┐
                ├→ T17 ─┼→ T19
                └→ T18 ─┘
T13 ────────────────────┘
```

### Fase 4 - Sessão, bootstrap e documentação

```text
T19 → T20 → T21 ─┬→ T22 ─┐
                  └→ T23 ─┼→ T24
```

## 4. Task breakdown

### T1: Proteger e ampliar a infraestrutura de fixtures de integração [P]

**Status**: ✅ Complete — commit `32f5e8f`; 11 testes focados e build aprovados.  

**What**: endurecer o helper de integração para rejeitar ambiente inseguro e criar/limpar fixtures administrativas tipadas.  
**Where**: `src/test-helpers/integrationSetup.ts` e spec focada do helper.  
**Depends on**: None.  
**Reuses**: clientes `supabaseAdmin`, `supabaseAnon`, factories de email/CPF/CNPJ e cleanup existentes.  
**Requirement**: ADM-BE-13, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] URLs de produção ou não classificadas como local/teste falham antes de criar ou apagar dados.
- [x] Helpers criam usuários com `super_admin`, `support`, `finance`, ativo/inativo e tenant comum.
- [x] Cleanup remove audit, plans de teste, admin, tenant/profile e auth user na ordem segura.
- [x] Nenhuma chave privilegiada é exportada para código de runtime.
- [x] Testes do guard de ambiente e factories passam.

**Tests**: unit.  
**Gate**: `npx jest src/test-helpers --runInBand` e `npm run build`.  
**Commit**: `test: protege fixtures de integração administrativa`

### T2: Endurecer `admins` contra escalada de privilégio

**Status**: ✅ Complete — commit `e693c1c`; 6 testes RLS e build aprovados após reset local.  

**What**: adicionar migration de constraint, policy de leitura própria e revogação completa de escrita direta em `admins`.  
**Where**: `supabase/migrations/20260715180000_harden_admin_authorization.sql` e `src/useCases/admin/__tests__/admin-rls.integration.spec.ts`.  
**Depends on**: T1.  
**Reuses**: tabela/policies atuais e modelagem de papéis do ADR 008.  
**Requirement**: ADM-BE-10, ADM-BE-11, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [x] Migration falha fechada se já existirem papéis inválidos.
- [x] Constraint aceita somente `super_admin`, `support` e `finance`.
- [x] `admin_self_update` deixa de existir.
- [x] Authenticated lê somente a própria linha e não insere, altera ou remove admins.
- [x] Teste direto prova bloqueio de autoelevação e autorreativação.

**Tests**: integration/RLS.  
**Gate**: `npx jest src/useCases/admin/__tests__/admin-rls.integration.spec.ts --runInBand`.  
**Commit**: `fix(db): bloqueia escalada de privilégios administrativos`

### T3: Restringir `plans` e criar RPCs `SECURITY INVOKER`

**Status**: ✅ Complete — commit `d19ae6b`; 17 testes RLS/RPC e build aprovados após reset local.  

**What**: substituir policies amplas de planos por capacidades explícitas e implementar as duas RPCs administrativas sob RLS.  
**Where**: `supabase/migrations/20260715181000_secure_plan_admin_operations.sql` e `src/useCases/plans/__tests__/plans-rls.integration.spec.ts`.  
**Depends on**: T2.  
**Reuses**: `plans`, `createAuthenticatedSupabaseClient`, ADR 007 e decisão do ADR 008.  
**Requirement**: ADM-BE-04, ADM-BE-05, ADM-BE-06, ADM-BE-07, ADM-BE-08, ADM-BE-09, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [x] Leitura anônima retorna somente planos ativos.
- [x] Apenas `super_admin` ativo lê ativos/inativos e executa insert/update.
- [x] `support`, `finance`, admin inativo e tenant não escrevem.
- [x] Grants permitem somente SELECT, colunas de insert previstas e UPDATE de `active`.
- [x] RPC de status bloqueia row, retorna ausência e não atualiza status idempotente.
- [x] Concorrência do Stripe ID é resolvida pela unique constraint.

**Tests**: integration/RLS/RPC.  
**Gate**: `npx jest src/useCases/plans/__tests__/plans-rls.integration.spec.ts --runInBand`.  
**Commit**: `feat(db): aplica autorização super admin em planos`

### T4: Implementar auditoria atômica de planos

**Status**: ✅ Complete — commit `febd435`; 6 testes de auditoria/atomicidade e build aprovados após reset local.  

**What**: criar função trigger privada e policies/grants de `audit_logs` para gravar create e transições de status na mesma transação.  
**Where**: `supabase/migrations/20260715182000_add_atomic_plan_audit.sql` e `src/useCases/plans/__tests__/plan-audit.integration.spec.ts`.  
**Depends on**: T3.  
**Reuses**: enum `audit_action`, tabela `audit_logs` e padrão de trigger existente.  
**Requirement**: ADM-BE-12, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [x] Função usa schema privado, `SECURITY DEFINER`, `search_path = ''` e nomes qualificados.
- [x] Execução direta e CRUD de audit são negados a `anon`/`authenticated`.
- [x] Create gera exatamente um `plan.create` com `admin_id` e payload mínimo.
- [x] Desativação gera `plan.deactivate`; reativação gera `plan.update`; idempotência não gera evento.
- [x] Falha provocada no audit desfaz a mutação do plano em teste transacional isolado.
- [x] Contexto de manutenção sem `auth.uid()` é registrado como sistema, sem criar bypass no runtime.

**Tests**: integration/SQL/trigger.  
**Gate**: `npx jest src/useCases/plans/__tests__/plan-audit.integration.spec.ts --runInBand`.  
**Commit**: `feat(db): adiciona auditoria atômica de planos`

### T5: Criar taxonomia de erros de aplicação [P]

**Status**: ✅ Complete — commit `3515fdf`; 7 testes focados e build aprovados.  

**What**: modelar erros tipados de validação, acesso negado, não encontrado e conflito sem dependência HTTP.  
**Where**: `src/errors/ApplicationError.ts` e respectiva spec unitária.  
**Depends on**: None.  
**Reuses**: mensagens de domínio existentes dos Use Cases de plans.  
**Requirement**: ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Tipos internos não carregam Express nem status HTTP.
- [x] `instanceof` permite distinguir as quatro categorias.
- [x] Erro inesperado continua distinguível de erro esperado.
- [x] Código usa `unknown`, sem introduzir `any`.

**Tests**: unit.  
**Gate**: `npx jest src/errors --runInBand` e `npm run build`.  
**Commit**: `feat(core): adiciona erros tipados de aplicação`

### T6: Padronizar o adaptador de respostas HTTP [P]

**Status**: ✅ Complete — commit `94b068f`; 18 testes de utils e build aprovados.  

**What**: criar helper único que converte erros esperados em `{ error: true, message, code }` e sanitiza falhas inesperadas.  
**Where**: `src/utils/httpErrorResponse.ts` e respectiva spec unitária.  
**Depends on**: T5.  
**Reuses**: formato obrigatório de `RULES.md`.  
**Requirement**: ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Categorias mapeiam para 400, 403, 404 e 409.
- [x] Falhas inesperadas retornam mensagem genérica e 500.
- [x] SQL, mensagens Supabase e credenciais não vazam no payload.
- [x] Helper mantém Controllers livres de duplicação de mapeamento.

**Tests**: unit.  
**Gate**: `npx jest src/utils --runInBand` e `npm run build`.  
**Commit**: `feat(http): padroniza respostas de erro`

### T7: Validar `AdminRole` em runtime [P]

**Status**: ✅ Complete — commit `1f7a7e9`; 12 testes focados e build aprovados.  

**What**: fazer o model `Admin` rejeitar papéis desconhecidos além da constraint do banco.  
**Where**: `src/models/Admin.ts` e `src/models/__tests__/Admin.spec.ts`.  
**Depends on**: None.  
**Reuses**: union `AdminRole` existente.  
**Requirement**: ADM-BE-11, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Guard/export identifica somente os três papéis válidos.
- [x] Constructor aceita rows válidas e rejeita valor desconhecido vindo de infraestrutura.
- [x] Nenhuma dependência externa é adicionada ao model.

**Tests**: unit.  
**Gate**: `npx jest src/models/__tests__/Admin.spec.ts --runInBand`.  
**Commit**: `fix(admin): valida papéis administrativos em runtime`

### T8: Definir contrato do repository administrativo [P]

**Status**: ✅ Complete — commit `1ff44ca`; build aprovado.  

**What**: criar a interface mínima de leitura do contexto administrativo.  
**Where**: `src/repositories/IAdminRepository.ts`.  
**Depends on**: None.  
**Reuses**: model `Admin` e convenção de interfaces `I*`.  
**Requirement**: ADM-BE-01, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Interface expõe somente `findById(id): Promise<Admin | null>`.
- [x] Não referencia Express, JWT ou Supabase.
- [x] Export é consumível pelo Use Case e adapter.

**Tests**: none; contrato TypeScript.  
**Gate**: `npm run build`.  
**Commit**: `feat(admin): define contrato do repository administrativo`

### T9: Tipar token e principal administrativo no Express [P]

**Status**: ✅ Complete — commit `5b8b307`; build e validação `ts-node --files` aprovados.  

**What**: consolidar a augmentation global de `Request` com `accessToken` e `AdminPrincipal`, sem duplicar definições incompatíveis.  
**Where**: `src/@types/express/index.d.ts`.  
**Depends on**: None.  
**Reuses**: augmentation existente e configuração `ts-node.files = true`.  
**Requirement**: ADM-BE-01, ADM-BE-05, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] `req.user`, `req.accessToken` e `req.admin` possuem tipos explícitos.
- [x] `req.admin.role` é literal `super_admin` e `active` é literal `true`.
- [x] `npm run dev`/ts-node e `tsc` enxergam a augmentation.
- [x] Token continua apenas request-scoped.

**Tests**: none; contrato TypeScript.  
**Gate**: `npm run build`.  
**Commit**: `feat(auth): tipa principal administrativo no request`

### T10: Implementar `SupabaseAdminRepository`

**Status**: ✅ Complete — commit `9f180bf`; 4 testes de integração do repository e build aprovados.  

**What**: ler a própria linha administrativa usando exclusivamente o cliente Supabase autenticado injetado.  
**Where**: `src/repositories/supabase/SupabaseAdminRepository.ts` e spec de integração focada.  
**Depends on**: T4, T7, T8.  
**Reuses**: `SupabaseProductDetailRepository` como padrão de injeção de `SupabaseClient`.  
**Requirement**: ADM-BE-01, ADM-BE-03, ADM-BE-05, ADM-BE-11, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [x] Constructor exige `SupabaseClient`; não existe fallback administrativo global.
- [x] `.maybeSingle()` diferencia ausência de erro de infraestrutura.
- [x] Row tipada é convertida para `Admin` sem `any`.
- [x] Fixtures própria, ausente e inativa produzem o resultado esperado sob RLS.
- [x] Erros Supabase são logados sem token e repassados de forma sanitizável.

**Tests**: integration/repository.  
**Gate**: `npx jest src/repositories/supabase --testPathPatterns 'SupabaseAdminRepository.*integration' --runInBand`.  
**Commit**: `feat(admin): implementa leitura do contexto administrativo`

### T11: Implementar `GetAdminContextUseCase` [P]

**Status**: ✅ Complete — commit `914918d`; 6 testes, 100% nas quatro métricas e build aprovados.  

**What**: transformar uma identidade autenticada em `AdminPrincipal` somente quando for `super_admin` ativo.  
**Where**: `src/useCases/admin/GetAdminContextUseCase.ts` e spec co-localizada.  
**Depends on**: T5, T7, T8.  
**Reuses**: `IAdminRepository`, `Admin` e erro tipado de acesso negado.  
**Requirement**: ADM-BE-01, ADM-BE-03, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Super-admin ativo retorna principal literal autorizado.
- [x] Ausente, inativo, support e finance geram exatamente o mesmo erro público.
- [x] Falha de repository não é convertida em 403.
- [x] Use Case não conhece Express, JWT ou Supabase.
- [x] Cobertura do Use Case fica em pelo menos 95% nas quatro métricas.

**Tests**: unit.  
**Gate**: `npx jest src/useCases/admin/GetAdminContextUseCase.spec.ts --coverage --runInBand`.  
**Commit**: `feat(admin): autoriza contexto de super admin`

### T12: Padronizar respostas do `authMiddleware` [P]

**Status**: ✅ Complete — commit `78f272a`; 5 testes focados, cobertura integral do middleware e build aprovados.  

**What**: adequar 401/500 do middleware ao contrato de erro sem alterar sua validação de JWT.  
**Where**: `src/middlewares/authMiddleware.ts` e `src/middlewares/__tests__/authMiddleware.spec.ts`.  
**Depends on**: T6, T9.  
**Reuses**: `supabase.auth.getUser(token)` e helper HTTP comum.  
**Requirement**: ADM-BE-02, ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Header ausente, formato inválido e token inválido retornam 401 padronizado.
- [x] Nenhum cenário inválido chama o próximo middleware.
- [x] Sucesso preserva user e access token.
- [x] Catch usa `unknown`, log sanitizado e resposta 500 genérica.
- [x] Testes existentes são atualizados sem reduzir cenários.

**Tests**: unit.  
**Gate**: `npx jest src/middlewares/__tests__/authMiddleware.spec.ts --runInBand`.  
**Commit**: `fix(auth): padroniza erros do middleware de autenticação`

### T13: Criar `superAdminMiddleware`

**Status**: ✅ Complete — commit `850bde0`; 13 testes de middleware e build aprovados.  

**What**: adaptar o request autenticado ao Use Case de contexto e bloquear todos os atores não autorizados antes do controller.  
**Where**: `src/middlewares/superAdminMiddleware.ts` e spec co-localizada.  
**Depends on**: T10, T11, T12.  
**Reuses**: factory de cliente autenticado, repository e Use Case administrativos.  
**Requirement**: ADM-BE-01, ADM-BE-03, ADM-BE-04, ADM-BE-05, ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Ausência interna de user/token falha fechada.
- [x] Cliente e repository são criados por request.
- [x] Principal autorizado é anexado em `req.admin`.
- [x] Ausente, inativo e papel incorreto recebem o mesmo 403.
- [x] `next()` só é chamado no caminho autorizado.
- [x] Falha de infraestrutura retorna 500, não falso 403.

**Tests**: unit.  
**Gate**: `npx jest src/middlewares --testPathPatterns 'superAdminMiddleware' --runInBand`.  
**Commit**: `feat(admin): adiciona middleware de super admin`

### T14: Expor `GET /api/admin/me`

**Status**: ✅ Complete — commit `d1fd75e`; 9 testes HTTP e build aprovados.  

**What**: criar e montar o endpoint de contexto administrativo com os dois middlewares na ordem aprovada.  
**Where**: `src/controllers/admin/AdminController.ts`, `src/routes/admin.routes.ts`, `src/app.ts` e spec de integração do endpoint.  
**Depends on**: T13.  
**Reuses**: `req.user.email`, `req.admin` e padrões atuais de route/controller.  
**Requirement**: ADM-BE-01, ADM-BE-02, ADM-BE-03, ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [x] 200 retorna exatamente `actor.kind`, id, email, role e active.
- [x] Token ausente/inválido retorna 401 padronizado.
- [x] Tenant, admin ausente, inativo, support e finance retornam 403 indistinguível.
- [x] Controller não consulta banco nem recebe JWT no Use Case.
- [x] Route está montada somente em `/api/admin/me`.

**Tests**: HTTP integration + focused controller unit if needed for invariant branch.  
**Gate**: `npx jest src/useCases/admin/__tests__/admin-context.integration.spec.ts --runInBand` e `npm run build`.  
**Commit**: `feat(admin): expõe contexto administrativo autenticado`

### T15: Tornar `PlansRepository` request-scoped

**Status**: ✅ Complete — commit `503ad91`; 7 testes de integração do repository e build aprovados.  

**What**: injetar `SupabaseClient`, usar RPCs nas mutações e mapear conflitos/ausência sem fallback global privado.  
**Where**: `src/repositories/supabase/PlansRepository.ts` e spec de integração do repository.  
**Depends on**: T4, T5, T14.  
**Reuses**: `IPlansRepository`, mapper `Plan` e padrão de repository autenticado do ADR 007.  
**Requirement**: ADM-BE-05, ADM-BE-07, ADM-BE-08, ADM-BE-09, ADM-BE-12, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [x] Constructor aceita cliente injetado e mantém default somente para leitura pública.
- [x] Create chama `admin_create_plan`; status chama `admin_set_plan_status`.
- [x] `23505` do Stripe vira conflito esperado e zero rows vira `null`.
- [x] `42501` não é mascarado como validação.
- [x] Mapper não usa `any`.
- [x] Repository autenticado lista ativos e inativos; cliente público vê somente ativos.

**Tests**: integration/repository/RPC.  
**Gate**: `npx jest src/repositories/supabase --testPathPatterns 'PlansRepository.*integration' --runInBand`.  
**Commit**: `feat(plans): executa operações no contexto autenticado`

### T16: Consolidar criação administrativa de plano [P]

**Status**: ✅ Complete — commit `f9a21bd`; 18 testes focados e gate conjunto aprovados.  

**What**: validar payload, normalizar defaults e construir repository/use case autenticados por request no controller de criação.  
**Where**: `src/controllers/plans/CreatePlanController.ts` e spec unitária do controller.  
**Depends on**: T6, T9, T15.  
**Reuses**: `CreatePlanUseCase`, factory autenticada e helper de resposta HTTP.  
**Requirement**: ADM-BE-04, ADM-BE-05, ADM-BE-08, ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Name, preço inteiro seguro, Stripe ID opcional e active opcional são validados estritamente.
- [x] Defaults são `active = true` e `stripePriceId = null`.
- [x] Repository é criado com o token da requisição.
- [x] Sucesso retorna 201; validação 400; duplicidade 409; infraestrutura 500.
- [x] Nenhuma mensagem Supabase é exposta.

**Tests**: unit/controller.  
**Gate**: `npx jest src/controllers/plans --testPathPatterns 'CreatePlanController' --runInBand`.  
**Commit**: `fix(plans): valida criação administrativa de plano`

### T17: Consolidar listagem administrativa de planos [P]

**Status**: ✅ Complete — commit `415b780`; 9 testes focados e gate conjunto aprovados.  

**What**: separar repository público/privado e rejeitar filtros diferentes de `true|false`.  
**Where**: `src/controllers/plans/ListPlansController.ts` e spec unitária do controller.  
**Depends on**: T6, T9, T15.  
**Reuses**: `ListPlansUseCase`, handler público existente e factory autenticada.  
**Requirement**: ADM-BE-04, ADM-BE-05, ADM-BE-06, ADM-BE-07, ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] Ausência de filtro lista todos no contexto super-admin.
- [x] `true` e `false` viram booleanos; qualquer outro valor retorna 400.
- [x] Handler privado usa JWT; handler público permanece anônimo e força `active = true`.
- [x] Falhas inesperadas retornam 500 padronizado.

**Tests**: unit/controller.  
**Gate**: `npx jest src/controllers/plans --testPathPatterns 'ListPlansController' --runInBand`.  
**Commit**: `fix(plans): valida listagem administrativa de planos`

### T18: Consolidar mudança de status de plano [P]

**Status**: ✅ Complete — commit `0eae37f`; 12 testes focados e gate conjunto aprovados.  

**What**: aceitar somente boolean real e usar repository autenticado para alterar exclusivamente `active`.  
**Where**: `src/controllers/plans/UpdatePlanStatusController.ts` e spec unitária do controller.  
**Depends on**: T6, T9, T15.  
**Reuses**: `UpdatePlanStatusUseCase`, RPC idempotente e helper HTTP.  
**Requirement**: ADM-BE-04, ADM-BE-05, ADM-BE-09, ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil A.

**Done when**:

- [x] `active` ausente, string, número, null ou objeto retorna 400 sem coerção.
- [x] ID ausente/inválido é rejeitado conforme contrato definido.
- [x] Plano ausente retorna 404 e sucesso retorna 200.
- [x] Apenas `active` é enviado ao Use Case/RPC.
- [x] Infraestrutura retorna 500 seguro.

**Tests**: unit/controller.  
**Gate**: `npx jest src/controllers/plans --testPathPatterns 'UpdatePlanStatusController' --runInBand`.  
**Commit**: `fix(plans): valida alteração de status do plano`

### T19: Proteger e integrar as rotas privadas de planos

**What**: aplicar `superAdminMiddleware` às três rotas privadas e consolidar o contrato HTTP completo de plans.  
**Where**: `src/routes/plans.routes.ts` e `src/useCases/plans/__tests__/plans-admin.integration.spec.ts`.  
**Depends on**: T13, T16, T17, T18.  
**Reuses**: rotas/URLs atuais, controllers consolidados e fixtures de atores.  
**Requirement**: ADM-BE-02, ADM-BE-03, ADM-BE-04, ADM-BE-05, ADM-BE-06, ADM-BE-07, ADM-BE-08, ADM-BE-09, ADM-BE-12, ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [ ] Ordem é auth -> super-admin -> controller em POST, GET e PATCH privados.
- [ ] Matriz de atores comprova 401/403/200/201 sem executar mutação negada.
- [ ] Fluxo create/list/filter/status/available funciona ponta a ponta.
- [ ] Duplicidade concorrente retorna um 201 e um 409.
- [ ] Auditoria HTTP gera ações corretas e nenhuma duplicata idempotente.
- [ ] `/available` permanece público e exclui inativos.

**Tests**: HTTP integration + RLS assertions.  
**Gate**: `npx jest src/useCases/plans/__tests__/plans-admin.integration.spec.ts --runInBand` e `npm run build`.  
**Commit**: `feat(plans): protege rotas administrativas de planos`

### T20: Corrigir logout para encerrar a sessão recebida

**What**: usar o JWT recebido em `auth.admin.signOut(token, 'local')` e provar revogação do refresh token daquela sessão.  
**Where**: `src/repositories/supabase/SupabaseAuthRepository.ts`, spec unitária do repository e integração de auth/logout.  
**Depends on**: T19.  
**Reuses**: `IAuthRepository`, `LogoutUseCase`, `authMiddleware` e ADR 008.  
**Requirement**: ADM-BE-14, ADM-BE-15, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [ ] Exatamente o access token recebido é passado ao SDK com scope `local`.
- [ ] Outra sessão do mesmo usuário não é encerrada.
- [ ] Refresh token da sessão encerrada não cria nova sessão.
- [ ] Access token residual é documentado/testado como válido até `exp`.
- [ ] Falha do Supabase é propagada e respondida sem detalhes sensíveis.
- [ ] Nenhum `service_role` é usado no runtime.

**Tests**: unit/repository + HTTP integration.  
**Gate**: `npx jest src/useCases/auth src/repositories/supabase --testPathPatterns 'Logout|Auth.*integration' --runInBand`.  
**Commit**: `fix(auth): encerra sessão representada pelo token`

### T21: Adicionar fixture local de `super_admin`

**What**: inserir no seed local uma identidade Auth, profile e admin consistentes e verificáveis pelo fluxo real.  
**Where**: `supabase/seed.sql` e spec de smoke da fixture local.  
**Depends on**: T20.  
**Reuses**: formato atual do dump/seed e credenciais marcadas como desenvolvimento.  
**Requirement**: ADM-BE-13, ADM-BE-16.  
**Tools**: Perfil B.

**Done when**:

- [ ] O mesmo UUID existe em auth user, identity, profile e admin.
- [ ] UUID não pertence a tenant.
- [ ] `supabase db reset` cria a fixture sem afetar migrations remotas.
- [ ] Login da fixture seguido de `/api/admin/me` retorna 200.
- [ ] Credenciais são explicitamente locais e não reutilizam segredo remoto.

**Tests**: seed integration smoke.  
**Gate**: `supabase db reset` em ambiente local seguido de `npx jest src/useCases/admin/__tests__/admin-seed.integration.spec.ts --runInBand`.  
**Commit**: `test(seed): adiciona fixture local de super admin`

### T22: Documentar provisionamento operacional remoto [P]

**What**: criar runbook transacional de bootstrap, verificação, falha por tenant existente e rollback operacional.  
**Where**: `docs/runbooks/provision-super-admin.md`.  
**Depends on**: T21.  
**Reuses**: fixture local, schema atual e limites do ADR 008.  
**Requirement**: ADM-BE-13, ADM-BE-14.  
**Tools**: Perfil C.

**Done when**:

- [ ] Distingue claramente `db reset` local de `db push` remoto.
- [ ] Procedimento relaciona auth user, profile e admin pelo mesmo UUID.
- [ ] Transação aborta se o UUID já existir em tenants.
- [ ] Inclui verificação por login, `/admin/me`, logout e refresh negativo.
- [ ] Não contém service key, senha remota ou endpoint de cadastro admin.

**Tests**: none automated; review operacional e checagem de comandos.  
**Gate**: validar todos os paths/SQL contra migration e seed atuais.  
**Commit**: `docs(admin): documenta provisionamento de super admin`

### T23: Criar coleção Insomnia do fluxo administrativo [P]

**What**: fornecer artefato importável e guia de execução para os atores e contratos da feature.  
**Where**: `docs/insomnia/admin-access-plans.insomnia.json` e `docs/insomnia/admin-access-plans.md`.  
**Depends on**: T21.  
**Reuses**: estrutura e variáveis de `shopkeeper-onboarding.insomnia.json`.  
**Requirement**: ADM-BE-01 a ADM-BE-15.  
**Tools**: Perfil C.

**Done when**:

- [ ] JSON importa sem erro e contém base URL, credenciais locais, tokens e plan ID como variáveis.
- [ ] Sequência cobre login, admin me, available, list, create, status, logout e refresh negativo.
- [ ] Guia cobre respostas 200/201/400/401/403/404/409 e atores negados.
- [ ] Nenhum segredo remoto ou `service_role` é incluído.
- [ ] Paths e payloads coincidem com integração aprovada.

**Tests**: none automated; JSON parse + importabilidade/manual contract review.  
**Gate**: parse do JSON e comparação dos paths com `src/routes`.  
**Commit**: `docs(insomnia): adiciona fluxo administrativo de planos`

### T24: Executar aceitação final e fechar rastreabilidade

**What**: executar todos os gates, confirmar os 16 requisitos e registrar desvios ou conclusão sem alterar o escopo.  
**Where**: `.specs/features/admin-access-plans/tasks.md`, `spec.md` e `STATE.md` somente para status/resultados.  
**Depends on**: T22, T23.  
**Reuses**: matriz de testes, critérios de sucesso e comandos do design.  
**Requirement**: ADM-BE-01 a ADM-BE-16.  
**Tools**: Perfis A, B e C.

**Done when**:

- [ ] Todos os testes unitários direcionados passam sem exclusão silenciosa.
- [ ] Suite de integração passa sequencialmente em Supabase isolado.
- [ ] Cobertura dos Use Cases é pelo menos 95% nas quatro métricas.
- [ ] Build TypeScript passa.
- [ ] Cada requisito possui evidência objetiva e nenhum `SPEC_DEVIATION` aberto.
- [ ] Diff final contém somente arquivos da feature e preserva mudanças preexistentes.
- [ ] Status de spec/design/tasks/STATE reflete o resultado real.

**Tests**: full acceptance.  
**Gate**:

```bash
npx jest --testMatch '**/src/useCases/**/*.spec.ts' --testPathIgnorePatterns='\.integration\.spec\.ts$' --coverage --runInBand
npm run test:integration -- --runInBand
npm run test:coverage -- --runInBand
npm run build
```

**Commit**: `docs(spec): registra validação de admin access plans` somente se houver atualização versionável autorizada; nunca incluir `.agents/` ou `supabase/snippets/`.

## 5. Parallel execution map

```text
Primeira onda [P]:
  T1, T5, T7, T8, T9

Após T5:
  T6 [P]

Trilha DB sequencial:
  T1 → T2 → T3 → T4 → T10

Trilha unitária administrativa:
  T5 + T7 + T8 → T11 [P]
  T6 + T9 → T12 [P]
  T10 + T11 + T12 → T13 → T14

Trilha plans:
  T14 + T4 + T5 → T15
  T15 + T6 + T9 → T16 [P], T17 [P], T18 [P]
  T13 + T16 + T17 + T18 → T19

Fechamento sequencial de integração:
  T19 → T20 → T21

Documentação paralela:
  T21 → T22 [P], T23 [P]

Aceitação:
  T22 + T23 → T24
```

Tasks `[P]` nunca executam integração no banco compartilhado. Toda task de migration, repository integration, HTTP integration, seed e aceitação permanece sequencial.

## 6. Task granularity check

| Task | Entrega atômica | Status |
| --- | --- | --- |
| T1 | um helper de integração e sua spec | ✅ Granular |
| T2 | uma migration de segurança de admins e seu teste | ✅ Granular |
| T3 | uma migration de autorização/RPC de plans e seu teste | ✅ Granular |
| T4 | uma migration de auditoria e seu teste | ✅ Granular |
| T5 | uma taxonomia de erros e sua spec | ✅ Granular |
| T6 | um mapper HTTP e sua spec | ✅ Granular |
| T7 | um model/guard de role e sua spec | ✅ Granular |
| T8 | uma interface de repository | ✅ Granular |
| T9 | uma augmentation Express | ✅ Granular |
| T10 | um adapter de repository e sua integração | ✅ Granular |
| T11 | um Use Case e sua spec | ✅ Granular |
| T12 | um middleware existente e sua spec | ✅ Granular |
| T13 | um middleware administrativo e sua spec | ✅ Granular |
| T14 | um endpoint completo e sua integração | ✅ Granular por endpoint |
| T15 | um repository existente e sua integração | ✅ Granular |
| T16 | um controller de create e sua spec | ✅ Granular |
| T17 | um controller de list e sua spec | ✅ Granular |
| T18 | um controller de status e sua spec | ✅ Granular |
| T19 | um router de plans e sua integração | ✅ Granular |
| T20 | uma operação de logout e seus testes | ✅ Granular por fluxo |
| T21 | uma fixture de seed e seu smoke | ✅ Granular |
| T22 | um runbook operacional | ✅ Granular |
| T23 | uma coleção Insomnia com guia sincronizado | ✅ Granular por artefato |
| T24 | um gate de aceitação | ✅ Granular |

**Resultado**: 24 de 24 tasks passaram no check de granularidade.

## 7. Diagram-definition cross-check

| Task | Depends on no corpo | Diagrama mostra | Status |
| --- | --- | --- | --- |
| T1 | None | início independente | ✅ Match |
| T2 | T1 | T1 -> T2 | ✅ Match |
| T3 | T2 | T2 -> T3 | ✅ Match |
| T4 | T3 | T3 -> T4 | ✅ Match |
| T5 | None | início independente | ✅ Match |
| T6 | T5 | T5 -> T6 | ✅ Match |
| T7 | None | início independente | ✅ Match |
| T8 | None | início independente | ✅ Match |
| T9 | None | início independente | ✅ Match |
| T10 | T4, T7, T8 | T4 + T7 + T8 -> T10 | ✅ Match |
| T11 | T5, T7, T8 | T5 + T7 + T8 -> T11 | ✅ Match |
| T12 | T6, T9 | T6 + T9 -> T12 | ✅ Match |
| T13 | T10, T11, T12 | T10 + T11 + T12 -> T13 | ✅ Match |
| T14 | T13 | T13 -> T14 | ✅ Match |
| T15 | T4, T5, T14 | T4 + T5 + T14 -> T15 | ✅ Match |
| T16 | T6, T9, T15 | T6 + T9 + T15 -> T16 | ✅ Match |
| T17 | T6, T9, T15 | T6 + T9 + T15 -> T17 | ✅ Match |
| T18 | T6, T9, T15 | T6 + T9 + T15 -> T18 | ✅ Match |
| T19 | T13, T16, T17, T18 | T13 + T16 + T17 + T18 -> T19 | ✅ Match |
| T20 | T19 | T19 -> T20 | ✅ Match |
| T21 | T20 | T20 -> T21 | ✅ Match |
| T22 | T21 | T21 -> T22 | ✅ Match |
| T23 | T21 | T21 -> T23 | ✅ Match |
| T24 | T22, T23 | T22 + T23 -> T24 | ✅ Match |

**Resultado**: 24 de 24 definições correspondem ao diagrama; dependências transitivas não foram repetidas como arestas diretas.

## 8. Test co-location validation

| Task | Camada alterada | Matriz exige | Task declara | Status |
| --- | --- | --- | --- | --- |
| T1 | test helper | unit | unit | ✅ OK |
| T2 | migration/RLS | integration | integration/RLS | ✅ OK |
| T3 | migration/RLS/RPC | integration | integration/RLS/RPC | ✅ OK |
| T4 | migration/trigger | integration/SQL | integration/SQL/trigger | ✅ OK |
| T5 | pure error model | unit | unit | ✅ OK |
| T6 | pure HTTP utility | unit | unit | ✅ OK |
| T7 | model | unit | unit | ✅ OK |
| T8 | TypeScript interface | build | none + build | ✅ OK |
| T9 | ambient types | build | none + build | ✅ OK |
| T10 | Supabase repository | integration | integration/repository | ✅ OK |
| T11 | Use Case | unit | unit + coverage | ✅ OK |
| T12 | middleware | unit | unit | ✅ OK |
| T13 | middleware | unit | unit | ✅ OK |
| T14 | endpoint/route | HTTP integration | HTTP integration | ✅ OK |
| T15 | Supabase repository | integration | integration/repository/RPC | ✅ OK |
| T16 | controller | unit | unit | ✅ OK |
| T17 | controller | unit | unit | ✅ OK |
| T18 | controller | unit | unit | ✅ OK |
| T19 | router | HTTP integration | HTTP integration/RLS | ✅ OK |
| T20 | auth repository + endpoint | unit + HTTP integration | unit + HTTP integration | ✅ OK |
| T21 | seed | integration smoke | integration smoke | ✅ OK |
| T22 | runbook | none | none | ✅ OK |
| T23 | Insomnia docs | none | none | ✅ OK |
| T24 | final acceptance | full | full acceptance | ✅ OK |

**Resultado**: 24 de 24 tasks atendem à matriz de testes; nenhum teste obrigatório foi postergado para uma task genérica.

## 9. Rastreabilidade requisito -> tasks

| Requisito | Tasks |
| --- | --- |
| ADM-BE-01 | T8, T9, T10, T11, T13, T14, T23, T24 |
| ADM-BE-02 | T12, T14, T19, T23, T24 |
| ADM-BE-03 | T10, T11, T13, T14, T19, T24 |
| ADM-BE-04 | T3, T13, T16, T17, T18, T19, T24 |
| ADM-BE-05 | T3, T9, T10, T13, T15, T16, T17, T18, T19, T24 |
| ADM-BE-06 | T3, T17, T19, T23, T24 |
| ADM-BE-07 | T3, T15, T17, T19, T24 |
| ADM-BE-08 | T3, T15, T16, T19, T24 |
| ADM-BE-09 | T3, T15, T18, T19, T24 |
| ADM-BE-10 | T2, T24 |
| ADM-BE-11 | T2, T7, T10, T24 |
| ADM-BE-12 | T4, T15, T19, T24 |
| ADM-BE-13 | T1, T21, T22, T23, T24 |
| ADM-BE-14 | T20, T22, T23, T24 |
| ADM-BE-15 | T5, T6, T12, T13, T14, T16, T17, T18, T19, T20, T23, T24 |
| ADM-BE-16 | T1 a T24 |

**Cobertura**: 16 de 16 requisitos possuem tasks e gate de aceitação.

## 10. Gate da fase Tasks

Antes de Execute, o usuário deve:

1. aprovar este `tasks.md`;
2. confirmar ou ajustar os Perfis A, B e C por task;
3. autorizar a estratégia de commits atômicos descrita;
4. garantir Supabase local/teste disponível para o baseline e as tasks sequenciais de banco.

Nenhuma implementação deve começar enquanto qualquer item estiver pendente.
