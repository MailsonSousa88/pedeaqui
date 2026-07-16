# Backend Health Assessment - Go/No-Go Tecnico

Data: 2026-07-05
Escopo: backend em `/home/Vitor/Projetos/pedeaqui/app/backend`

## Recomendacao executiva

**Decisao: reconstruir por fatias, nao reescrever do zero.**

O backend atual tem um nucleo aproveitavel: compila, a suite completa passa, ha uma estrutura Clean Architecture reconhecivel, os use cases principais estao implementados e o fluxo de onboarding `auth -> profile -> tenant -> store -> category -> product` esta coberto por testes. Isso elimina a justificativa tecnica para reescrita total imediata.

O estado atual tambem nao sustenta um "manter como esta" sem estabilizacao. Existem inconsistencias de seguranca/autorizacao em nivel de desenho, drift entre docs/specs e codigo real, regra de cobertura de use cases descumprida em branches, script de teste unitario quebrado, padrao de erro HTTP divergente do `RULES.md` e features planejadas no schema sem camada de aplicacao.

A melhor rota e preservar o nucleo que funciona e estabilizar por slices curtos, usando codigo, migrations e testes atuais como fonte primaria. Specs antigas devem continuar como contexto historico ate serem revalidadas.

## Evidencias de verificacao

Comandos executados:

| Comando | Resultado | Observacao |
| --- | --- | --- |
| `npm run build` | Passou | `tsc` concluiu sem erro. |
| `npm test -- --runInBand` | Passou fora do sandbox | 40 suites, 199 testes. No sandbox falhou antes dos testes com `listen EPERM 0.0.0.0`, por Supertest abrir listener local. |
| `npm run test:coverage -- --runInBand` | Passou fora do sandbox | 40 suites, 199 testes. Cobertura global: 70.71% statements, 57.55% branches, 70.62% functions, 72.49% lines. |
| `npm run test:unit -- --runInBand` | Falhou | Jest 30 rejeita `--invert`: `Unrecognized option "invert"`. |

Cobertura por pasta de use cases no snapshot gerado:

| Use case group | Statements | Branches | Functions | Lines | Status contra 95% |
| --- | ---: | ---: | ---: | ---: | --- |
| `useCases/auth` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `useCases/category` | 100.00% | 89.28% | 100.00% | 100.00% | Falha em branches |
| `useCases/plans` | 100.00% | 100.00% | 100.00% | 100.00% | OK |
| `useCases/product` | 91.04% | 80.00% | 100.00% | 96.72% | Falha em statements e branches |
| `useCases/store` | 93.02% | 76.11% | 100.00% | 98.73% | Falha em statements e branches |
| `useCases/subscription` | 100.00% | 84.84% | 100.00% | 100.00% | Falha em branches |
| `useCases/tenant` | 100.00% | 100.00% | 100.00% | 100.00% | OK |

Agregado calculado para `src/useCases`: 96.80% statements, 85.76% branches, 100.00% functions, 99.16% lines. A regra de 95% em branches nao esta atendida.

## Mapa da API real

Montagem em `src/app.ts`:

| Base path | Rotas reais | Observacao |
| --- | --- | --- |
| `/` | `GET /` | Health simples. |
| `/api/auth` | signup, login, recover-password, reset-password, refresh, logout, me | Logout e me protegidos por `authMiddleware`. |
| `/api/tenants` | `POST /`, `GET /me`, `PATCH /me` | Todas protegidas. |
| `/api/stores` | create, update, toggle, delete, public get by slug | Escritas protegidas; leitura por slug publica. |
| `/api/categories` | public list by store, create, update, delete | Escritas protegidas por `router.use(authMiddleware)`. |
| `/api/products` | public list by store, create, update, delete, toggle availability | Escritas protegidas por `router.use(authMiddleware)`. |
| `/api/plans` | public available, admin-ish create/list/update status | Rotas de mutacao exigem auth, mas nao ha checagem explicita de admin no controller/use case. |
| `/api/subscriptions` | checkout | Protegida. |
| `/api/webhooks` | Stripe webhook | Usa `express.raw` antes de `express.json`, correto para assinatura Stripe. |
| `/api/profile` | update me | Protegida. |

## Implementado e confiavel

- O projeto compila em TypeScript estrito (`strict: true`).
- A cadeia geral `Route -> Middleware -> Controller -> Use Case -> Repository -> Supabase` existe e e reconhecivel.
- Use cases nao dependem de Express nem do SDK Supabase diretamente.
- Repositories Supabase existem para auth, profile, tenant, subscription, store, category, product e plans.
- O fluxo principal de lojista esta implementado e testado: signup cria profile, login retorna token, tenant cria subscription trial, store cria categoria padrao `Todos`, product cria item vinculado ao tenant/store/category.
- Models existem para entidades principais e subtabelas: `Profile`, `Tenant`, `Subscription`, `Store`, `Category`, `Product`, `ProductImage`, `ProductVariation`, `VariationOption`, `Plan`, `Admin`, `AuditLog`.
- Migrations aplicam separacao CPF/CNPJ, `tenants -> profiles`, `products.category_id NOT NULL`, `subscriptions.plan_id` nullable para trial e RLS em tabelas principais.
- Regras de ownership mais importantes estao em use cases de store/category/product, nao apenas no banco.

## Implementado mas inconsistente

- **Auth/Supabase por request:** `authMiddleware` valida o JWT, mas os repositories usam um singleton Supabase criado com `SUPABASE_ANON_KEY`. Nao ha cliente Supabase escopado por request com o token do usuario. Na pratica, a aplicacao depende de validacoes de use case e da chave configurada no ambiente; RLS pode nao estar sendo exercido da forma esperada pelo fluxo HTTP.
- **Admin de plans:** `/api/plans` protege create/list/update com auth, mas nao ha checagem de papel admin no controller/use case. Se o backend estiver usando chave com privilegio elevado, qualquer usuario autenticado poderia acionar essas operacoes pela camada HTTP.
- **Padrao de erro HTTP:** Controllers e middleware retornam `{ error: string }`, enquanto `RULES.md` exige `{ error: true, message: string, code: number }`.
- **Uso de `any`:** Controllers, middleware e mappers de repositories usam `any`, contrariando `RULES.md`.
- **Script unitario:** `npm run test:unit` esta quebrado com Jest 30 por uso de `--invert`. A suite completa passa, mas o comando dedicado de unitarios nao e confiavel.
- **Cobertura:** A suite passa, mas a regra declarada de 95% em use cases falha em branches no agregado e em varios grupos.
- **Testes de integracao:** Existem e passam no ambiente validado, mas usam `SUPABASE_URL` da `.env` ou fallback local e service-role fallback. Sem guardrail forte de ambiente isolado, ha risco operacional de rodar contra banco errado.
- **Soft delete:** Specs rebaselined ja apontam que `findById` de category/product precisa de politica explicita para registros soft-deleted. Store filtra `deleted_at`, product/category tem comportamento menos uniforme.
- **Store horarios:** DB exige `horario_abertura` e `horario_fechamento` `NOT NULL`, mas model/use cases aceitam `null`; isso pode virar erro tardio de repository em inputs incompletos.
- **Docs/specs:** `.specs/project/STATE.md` diz que consolidacao iniciou e ao mesmo tempo lista tarefas de Supertest pendentes; `.notebook/backend-status.md` esta obsoleto; `docs/DATABASE.md` ainda pode divergir das migrations recentes.

## Documentado ou modelado, mas ausente no codigo de aplicacao

- Fluxo de `product_images`: nao ha rota, controller, use case, repository, calculo de cota por tenant nem revalidacao de quota no registro de metadata.
- Fluxo de `product_variations` e `variation_options`: existem tabelas/models, mas nao ha camada de aplicacao.
- Storage/R2: schema tem `r2_key`, `url`, `size_bytes`, `mime_type`, mas nao ha provider de storage, bucket, SDK, URL assinada ou fluxo de metadata implementado.
- Backoffice/admin/audit: migrations tem `admins` e `audit_logs`, mas nao ha rotas/use cases de administracao ou consulta de auditoria.
- Autorizacao administrativa: RLS tem policy para `plans_admin_modify`, mas a camada HTTP nao modela explicitamente permissao admin.
- Ambiente de teste isolado formal: ha helpers de integracao, mas o proprio estado do projeto registra a necessidade de banco de teste separado.

## Rubrica tecnica

Escala: 0 = inviavel, 5 = saudavel para evoluir sem estabilizacao previa.

| Dimensao | Nota | Justificativa |
| --- | ---: | --- |
| Arquitetura Clean Architecture | 3.5/5 | Camadas existem e use cases sao puros, mas controllers fazem composicao direta de repositorios concretos, usam `any` e nao padronizam erros. |
| Coerencia schema/codigo | 3.5/5 | Core alinha com migrations recentes, mas ha drift em docs, store horarios nullable no dominio e subtabelas sem aplicacao. |
| Seguranca/auth | 2.5/5 | JWT e ownership existem, mas Supabase singleton sem token por request e admin plans sem checagem explicita reduzem confianca. |
| Cobertura e confiabilidade dos testes | 3/5 | Suite passa e cobre fluxo principal, mas `test:unit` quebra, branches de use cases ficam abaixo de 95% e integracao depende de ambiente. |
| Completude do MVP | 3/5 | Onboarding e CRUD base estao presentes; imagens, variacoes, backoffice e partes de billing/admin ainda faltam. |
| Custo de manutencao | 3/5 | Nucleo e legivel, mas drift documental, convencoes violadas e acoplamento de composicao em controllers aumentam custo. |
| Risco de regressao | 3/5 | Testes reduzem risco no fluxo principal, mas gaps de branches, scripts quebrados e integracao ambiental deixam pontos cegos. |

Media indicativa: **3.1/5**.

## Go/No-Go por alternativa

### Manter e estabilizar no lugar

**No-Go como estrategia unica.** O backend nao deve ser mantido "como esta" porque ha regras operacionais descumpridas: cobertura de use cases abaixo do exigido em branches, script unitario quebrado, erro HTTP fora do padrao e risco de auth/admin.

**Go apenas para o nucleo atual:** auth, tenant, store, category e product podem ser preservados como base, desde que recebam hardening antes de novas features grandes.

### Reconstruir por fatias

**Go recomendado.** Esta opcao aproveita o que ja compila e passa, reduz risco e corrige os pontos estruturais antes de expandir.

Fatias sugeridas:

1. **Harness de testes e cobertura:** corrigir `test:unit`, separar unit/integration de forma confiavel, manter `npm test` e `npm run test:coverage`, elevar branches de use cases para 95%.
2. **Contrato HTTP e TypeScript:** remover `any` dos controllers/mappers mais criticos e padronizar erros como `{ error: true, message, code }`.
3. **Auth e autorizacao:** decidir formalmente se repositories usam cliente por request com bearer token ou service role com autorizacao 100% na aplicacao; adicionar admin guard para plans.
4. **Schema/docs rebaseline:** alinhar `docs/DATABASE.md`, `.specs/project/STATE.md` e specs vivas ao codigo/migrations atuais.
5. **Produto expandido:** implementar `product_images` como primeiro slice isolado, com repository proprio, boolean preflight de quota, registro de metadata e revalidacao no confirm.

### Reescrever do zero

**No-Go.** Nao ha evidencia de que os invariantes centrais estejam inviaveis. O schema e razoavel, o fluxo principal passa, use cases estao separados e a suite tem valor. Reescrita total descartaria esse capital e provavelmente recriaria os mesmos problemas de auth/testes sem necessidade.

Reescrita so deveria ser reavaliada se uma validacao posterior provar que:

- o modelo `tenant.id === profile.id === auth.user.id` nao pode sustentar o produto;
- a estrategia Supabase/RLS escolhida exige mudanca transversal incompativel;
- ou o custo real de estabilizar as fatias acima superar reconstruir incrementalmente modulo a modulo.

## Plano de recuperacao

| Prioridade | Trabalho | Criterio de saida |
| --- | --- | --- |
| P0 | Corrigir `npm run test:unit` e documentar comandos oficiais de teste | Unitarios rodam sem Supertest/listener; coverage continua disponivel. |
| P0 | Fechar cobertura de branches em use cases abaixo de 95% | `src/useCases` >= 95% em statements, branches, functions e lines. |
| P0 | Definir modelo de autorizacao Supabase no backend | Decisao documentada: client por request ou service role + checks obrigatorios em use cases. |
| P1 | Adicionar guard admin real para plans | Usuario nao admin nao consegue criar/listar admin/update status por HTTP. |
| P1 | Padronizar erro HTTP e remover `any` dos controllers | Controllers seguem `RULES.md`; build e testes passam. |
| P1 | Rebaseline dos docs vivos | `.specs/project/STATE.md`, `docs/DATABASE.md` e specs atuais deixam claro o que e atual, legado ou planejado. |
| P2 | Implementar `product_images` por slice | Preflight booleano, metadata registration, listagem e quota revalidada com testes unitarios. |
| P2 | Decidir variacoes/backoffice | Variations e admin/audit entram como slices posteriores, nao como prerequisito para estabilizar o nucleo. |

## Conclusao

O backend esta em estado **recuperavel e aproveitavel**, mas ainda nao esta em estado **estavel para acelerar feature grande sem hardening**.

Decisao final:

- **Go** para estabilizacao/reconstrucao incremental por fatias.
- **No-Go** para reescrita total agora.
- **No-Go** para seguir expandindo produto sem antes corrigir testes, cobertura, auth/admin e drift documental.
