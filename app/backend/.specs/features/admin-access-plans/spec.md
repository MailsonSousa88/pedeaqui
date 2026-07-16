# Acesso Administrativo e Gestao de Planos - Especificacao Backend

**Status**: Approved para Tasks
**Escopo**: `app/backend`
**Data**: 2026-07-15

## Problema

O backend autentica usuarios pelo Supabase Auth, mas atualmente trata qualquer JWT valido como suficiente para acessar as rotas administrativas de planos. Embora o banco ja possua `admins`, papeis administrativos, `audit_logs` e policies relacionadas, a aplicacao nao identifica explicitamente o ator administrador, nao valida o papel `super_admin` e nao propaga de forma consistente o JWT da requisicao para as operacoes protegidas por RLS.

Esta feature deve entregar o primeiro fluxo administrativo seguro do backend: um `super_admin` previamente provisionado consegue validar seu contexto e gerenciar planos, enquanto lojistas, usuarios comuns, administradores inativos e outros papeis recebem acesso negado.

## Autoridade e baseline atual

- Supabase Auth continua sendo a fonte de autenticacao e emissao de tokens.
- A tabela `admins` continua sendo a fonte de autorizacao administrativa.
- Os papeis modelados sao `super_admin`, `support` e `finance`, mas somente `super_admin` tera permissoes nesta entrega.
- `authMiddleware` valida o Bearer token e disponibiliza o identificador e o token da requisicao.
- `GET /api/plans/available` e publico e retorna somente planos ativos.
- `POST /api/plans`, `GET /api/plans` e `PATCH /api/plans/:id/status` existem, mas atualmente exigem apenas autenticacao.
- O repository de planos usa o cliente Supabase global e nao recebe explicitamente o contexto autenticado da requisicao.
- A policy atual de `admins` permite atualizacao da propria linha e precisa deixar de permitir alteracao de papel ou reativacao pelo proprio usuario.

## Objetivos

- [ ] Expor um contrato autenticado que identifique um `super_admin` ativo.
- [ ] Separar autenticacao por JWT de autorizacao administrativa.
- [ ] Garantir que somente `super_admin` ativo acesse as operacoes administrativas de planos.
- [ ] Executar operacoes administrativas no contexto RLS do JWT validado.
- [ ] Registrar de forma confiavel as criacoes e mudancas de status de planos.
- [ ] Preservar os contratos publicos e de autenticacao ja consumidos por outros fluxos.
- [ ] Documentar um procedimento reproduzivel e seguro para provisionar o primeiro `super_admin`.

## Decisoes confirmadas

| Decisao | Definicao |
| --- | --- |
| Primeira fatia | Acesso administrativo e gestao de planos |
| Papel autorizado | Somente `super_admin` ativo |
| Provisionamento | Fora da aplicacao; nao havera cadastro ou convite de admin nesta entrega |
| Fonte de autorizacao | Tabela `admins`; sem custom claims no JWT |
| Rotas de planos | Manter as URLs atuais para compatibilidade |
| Defesa em profundidade | Autorizacao na API e RLS no banco |
| Identidade | Admin e tenant serao tratados como perfis operacionais distintos nesta entrega |

## Fora de escopo

| Capacidade | Motivo |
| --- | --- |
| Implementacao do frontend administrativo | Sera especificada separadamente apos a aprovacao desta spec |
| Cadastro publico, convite ou CRUD de administradores | A decisao atual e provisionamento exclusivamente operacional |
| Permissoes funcionais para `support` e `finance` | O MVP autoriza apenas `super_admin` |
| Gestao administrativa de tenants ou lojas | Pertence a uma fatia posterior do backoffice |
| Gestao administrativa de subscriptions | Pertence a uma fatia posterior de faturamento |
| Tela ou endpoint de consulta de auditoria | Esta entrega grava os eventos, mas nao expoe sua consulta |
| Edicao completa ou exclusao de planos | O contrato atual permite criar, listar e alterar somente `active` |
| Custom claims, Auth Hooks ou alteracao do conteudo do JWT | A autorizacao sera consultada na tabela `admins` |
| Introducao de `service_role` no runtime normal da API | O acesso a dados continuara respeitando RLS com o token do usuario |

---

## Historias de usuario

### P1: Validar o contexto do administrador ⭐ MVP

**Historia**: Como `super_admin`, quero consultar meu contexto administrativo autenticado para que clientes autorizados consigam confirmar minha identidade e permissao antes de abrir o backoffice.

**Por que P1**: Este e o contrato de entrada do fluxo administrativo e a base para a futura integracao frontend.

**Criterios de aceitacao**:

1. WHEN uma requisicao com Bearer token valido de um `super_admin` ativo acessar `GET /api/admin/me` THEN o sistema SHALL retornar HTTP 200 com `actor.kind = "admin"`, `id`, `email`, `role = "super_admin"` e `active = true`.
2. WHEN o Bearer token estiver ausente, malformado ou invalido THEN o sistema SHALL retornar HTTP 401 sem consultar ou expor dados administrativos.
3. WHEN o usuario autenticado nao possuir registro em `admins` THEN o sistema SHALL retornar HTTP 403.
4. WHEN o registro administrativo estiver inativo THEN o sistema SHALL retornar HTTP 403.
5. WHEN o papel administrativo for diferente de `super_admin` THEN o sistema SHALL retornar HTTP 403 nesta entrega.
6. WHEN o acesso for negado THEN o sistema SHALL responder sem revelar se outro identificador administrativo existe.

**Teste independente**: Autenticar fixtures de `super_admin`, lojista, admin inativo e admin com outro papel e comparar os status e payloads de `GET /api/admin/me`.

---

### P1: Proteger as operacoes administrativas de planos ⭐ MVP

**Historia**: Como responsavel pela plataforma, quero que as rotas administrativas de planos exijam autorizacao de `super_admin` para impedir que qualquer lojista autenticado altere a oferta comercial.

**Por que P1**: As rotas atuais verificam apenas autenticacao e formam a principal lacuna de seguranca desta feature.

**Criterios de aceitacao**:

1. WHEN um `super_admin` ativo acessar `GET /api/plans` THEN o sistema SHALL permitir a listagem administrativa de planos ativos e inativos.
2. WHEN um `super_admin` ativo acessar `POST /api/plans` com dados validos THEN o sistema SHALL permitir a criacao do plano.
3. WHEN um `super_admin` ativo acessar `PATCH /api/plans/:id/status` com status valido THEN o sistema SHALL permitir a alteracao de `active`.
4. WHEN um lojista, usuario comum, admin inativo ou papel diferente de `super_admin` acessar qualquer uma dessas rotas THEN o sistema SHALL retornar HTTP 403 sem executar o Use Case correspondente.
5. WHEN o token estiver ausente ou invalido THEN o sistema SHALL retornar HTTP 401.
6. WHEN a operacao administrativa consultar ou modificar `plans` THEN o sistema SHALL executar a query com o contexto autenticado da requisicao e respeitar as policies RLS.
7. WHEN `GET /api/plans/available` for chamado sem autenticacao THEN o sistema SHALL continuar retornando HTTP 200 somente com planos ativos.

**Teste independente**: Executar cada rota com token de `super_admin`, token de lojista e sem token, verificando que apenas o primeiro acessa a superficie administrativa e que `/available` permanece publico.

---

### P1: Gerenciar planos dentro do contrato existente ⭐ MVP

**Historia**: Como `super_admin`, quero listar, criar e ativar ou desativar planos para controlar quais ofertas podem ser apresentadas aos lojistas.

**Por que P1**: Esta e a primeira capacidade operacional do backoffice e reutiliza Use Cases ja existentes.

**Criterios de aceitacao**:

1. WHEN `GET /api/plans` receber `active=true` ou `active=false` THEN o sistema SHALL aplicar o filtro booleano solicitado.
2. WHEN `GET /api/plans` nao receber o filtro `active` THEN o sistema SHALL retornar planos ativos e inativos visiveis ao `super_admin`.
3. WHEN `POST /api/plans` receber `name`, `priceBrlCents > 0`, `stripePriceId` opcional e `active` opcional THEN o sistema SHALL criar e retornar o plano com HTTP 201.
4. WHEN `POST /api/plans` receber preco menor ou igual a zero THEN o sistema SHALL rejeitar a requisicao com HTTP 400.
5. WHEN `stripePriceId` informado ja pertencer a outro plano THEN o sistema SHALL rejeitar a criacao com HTTP 409.
6. WHEN `PATCH /api/plans/:id/status` receber `active` booleano THEN o sistema SHALL atualizar somente o status e retornar o plano com HTTP 200.
7. WHEN `active` estiver ausente ou nao for booleano THEN o sistema SHALL retornar HTTP 400 sem converter valores arbitrarios por coerção.
8. WHEN o plano nao existir THEN o sistema SHALL retornar HTTP 404.

**Teste independente**: Com um token de `super_admin`, criar um plano, lista-lo com e sem filtros, desativa-lo e confirmar que a rota publica deixa de retorna-lo.

---

### P1: Impedir escalada de privilegio e auditar mutacoes ⭐ MVP

**Historia**: Como responsavel pela seguranca da plataforma, quero impedir que administradores alterem o proprio papel e registrar mutacoes de planos para manter rastreabilidade das operacoes privilegiadas.

**Por que P1**: Autorizar a rota sem corrigir a policy de autoatualizacao ou sem registrar a mutacao deixaria a fronteira administrativa incompleta.

**Criterios de aceitacao**:

1. WHEN um usuario autenticado tentar alterar diretamente o proprio `admins.role` ou `admins.active` THEN o banco SHALL negar a operacao.
2. WHEN um registro administrativo possuir um papel fora de `super_admin`, `support` ou `finance` THEN o banco SHALL rejeitar a persistencia.
3. WHEN um `super_admin` criar um plano THEN o sistema SHALL registrar exatamente um evento `plan.create` em `audit_logs` com o `admin_id`, `target_id` e payload relevante.
4. WHEN um `super_admin` alterar o status de um plano THEN o sistema SHALL registrar exatamente um evento `plan.update` ou `plan.deactivate`, de acordo com a transicao realizada.
5. WHEN a persistencia do plano falhar THEN o sistema SHALL nao registrar um evento de auditoria bem-sucedido.
6. WHEN a gravacao da auditoria falhar THEN a mutacao administrativa SHALL nao ser considerada concluida parcialmente.

**Teste independente**: Tentar autoelevar um admin via cliente autenticado e, em seguida, executar criacao e desativacao de plano, validando bloqueio, atomicidade e eventos gravados.

---

### P1: Provisionar e encerrar a sessao administrativa ⭐ MVP

**Historia**: Como operador da plataforma, quero um procedimento seguro para criar o primeiro `super_admin` e encerrar sua sessao para que o fluxo possa ser reproduzido sem expor cadastro administrativo na API.

**Por que P1**: Sem uma identidade provisionada e um logout funcional, o fluxo administrativo nao pode ser demonstrado ou operado de ponta a ponta.

**Criterios de aceitacao**:

1. WHEN o ambiente local for inicializado com seed de desenvolvimento THEN o sistema SHALL disponibilizar uma fixture documentada de `super_admin` sem aplicar esse seed automaticamente em ambientes remotos.
2. WHEN o primeiro `super_admin` for provisionado em ambiente remoto THEN o procedimento SHALL criar ou relacionar consistentemente `auth.users`, `profiles` e `admins` com o mesmo identificador.
3. WHEN o provisionamento detectar que o identificador ja pertence a um tenant THEN o procedimento SHALL interromper sem criar um perfil administrativo ambiguo.
4. WHEN `POST /api/auth/logout` receber o token da sessao administrativa THEN o sistema SHALL encerrar a sessao correspondente e impedir a reutilizacao do refresh token encerrado.
5. WHEN o logout for concluido THEN o sistema SHALL deixar explicito que o access token ja emitido pode permanecer valido ate sua expiracao natural.
6. WHEN o provisionamento for executado THEN nenhuma credencial `service_role` SHALL ser exposta ao frontend ou incorporada ao runtime comum das rotas da API.

**Teste independente**: Provisionar a fixture local, autenticar, validar `/api/admin/me`, executar logout e confirmar que o refresh token encerrado nao gera nova sessao.

## Contratos HTTP do backend

### Novo endpoint

`GET /api/admin/me`

Resposta HTTP 200:

```json
{
  "actor": {
    "kind": "admin",
    "id": "uuid",
    "email": "admin@example.com",
    "role": "super_admin",
    "active": true
  }
}
```

### Endpoints existentes com autorizacao fortalecida

| Metodo | Caminho | Resultado esperado |
| --- | --- | --- |
| `GET` | `/api/plans/available` | Publico; somente planos ativos |
| `GET` | `/api/plans` | Somente `super_admin`; filtro opcional `active=true|false` |
| `POST` | `/api/plans` | Somente `super_admin`; cria plano |
| `PATCH` | `/api/plans/:id/status` | Somente `super_admin`; altera apenas `active` |
| `POST` | `/api/auth/login` | Mantido sem alteracao de contrato |
| `POST` | `/api/auth/refresh` | Mantido sem alteracao de contrato |
| `POST` | `/api/auth/logout` | Mantido; passa a encerrar a sessao representada pelo token recebido |

### Contrato de erros administrativos

Novas respostas administrativas e respostas alteradas nas rotas de planos SHALL seguir:

```json
{
  "error": true,
  "message": "Mensagem segura e acionavel",
  "code": 403
}
```

| Situacao | HTTP |
| --- | ---: |
| Token ausente ou invalido | 401 |
| Usuario autenticado sem permissao de `super_admin` | 403 |
| Payload invalido | 400 |
| Plano nao encontrado | 404 |
| `stripePriceId` duplicado | 409 |

## Casos de borda

- WHEN um usuario possuir JWT valido, mas nao possuir linha em `admins`, THEN o sistema SHALL trata-lo como nao autorizado, nunca como admin parcial.
- WHEN um admin for desativado entre duas requisicoes THEN a proxima requisicao SHALL retornar 403 sem depender da renovacao do JWT.
- WHEN um admin tiver papel `support` ou `finance` THEN ele SHALL receber 403 em toda a superficie administrativa desta entrega.
- WHEN um valor de query `active` for diferente de `true` ou `false` THEN o sistema SHALL retornar 400 em vez de interpreta-lo silenciosamente.
- WHEN dois requests tentarem criar o mesmo `stripePriceId` THEN somente um SHALL concluir e o outro SHALL receber 409.
- WHEN o status solicitado ja for o status atual THEN o sistema SHALL retornar o estado atual sem gerar evento de desativacao duplicado.
- WHEN a rota publica listar planos THEN ela SHALL continuar protegida contra exposicao de planos inativos, independentemente das policies administrativas.
- WHEN o cliente autenticado da requisicao nao puder ser construido THEN a operacao SHALL falhar fechada e nao usar `service_role` ou o cliente global como fallback administrativo.

## Requisitos nao funcionais

- **Seguranca**: autorizacao SHALL ser aplicada antes da execucao dos Use Cases administrativos e reforcada por RLS.
- **Arquitetura**: o fluxo SHALL respeitar `Route -> Middleware -> Controller -> Use Case -> Repository -> Supabase`.
- **Isolamento**: Use Cases SHALL permanecer sem dependencias de Express, JWT ou SDK Supabase.
- **Tipagem**: codigo novo SHALL evitar `any` e modelar explicitamente o principal administrativo e os erros esperados.
- **Observabilidade**: tokens, senhas e chaves privilegiadas SHALL nunca ser registrados em logs ou payloads de auditoria.
- **Compatibilidade**: `/api/plans/available`, login e refresh SHALL manter seus contratos atuais.
- **Testabilidade**: cada Use Case criado ou alterado SHALL possuir testes unitarios co-localizados e cobertura minima de 95% em statements, branches, functions e lines.
- **Consolidacao**: os cenarios de autorizacao HTTP e RLS SHALL possuir testes de integracao usando ambiente Supabase local ou de teste isolado, nunca producao.
- **Documentacao operacional**: o fluxo de bootstrap e os requests administrativos SHALL ser documentados em runbook e artefato importavel do Insomnia.

## Rastreabilidade de requisitos

| ID | Requisito | Historia | Fase | Status |
| --- | --- | --- | --- | --- |
| ADM-BE-01 | Identificar `super_admin` ativo em `/api/admin/me` | Validar contexto | Design | Pending |
| ADM-BE-02 | Retornar 401 para autenticacao invalida | Validar contexto | Design | Pending |
| ADM-BE-03 | Retornar 403 para usuario comum, admin inativo ou papel nao permitido | Validar contexto | Design | Pending |
| ADM-BE-04 | Autorizar rotas privadas de planos somente para `super_admin` | Proteger planos | Design | Pending |
| ADM-BE-05 | Propagar o JWT da requisicao para queries administrativas protegidas por RLS | Proteger planos | Design | Pending |
| ADM-BE-06 | Preservar `/api/plans/available` publico e limitado a ativos | Proteger planos | Design | Pending |
| ADM-BE-07 | Listar planos com filtro booleano opcional | Gerenciar planos | Design | Pending |
| ADM-BE-08 | Criar plano com validacao de preco e unicidade Stripe | Gerenciar planos | Design | Pending |
| ADM-BE-09 | Alterar somente o status de plano existente | Gerenciar planos | Design | Pending |
| ADM-BE-10 | Impedir autoalteracao de papel e estado administrativo | Seguranca e auditoria | Design | Pending |
| ADM-BE-11 | Restringir valores persistidos de papel administrativo | Seguranca e auditoria | Design | Pending |
| ADM-BE-12 | Auditar criacao e mudanca de status de forma atomica | Seguranca e auditoria | Design | Pending |
| ADM-BE-13 | Provisionar fixture local e primeiro admin remoto fora da API | Provisionar e logout | Design | Pending |
| ADM-BE-14 | Encerrar a sessao representada pelo token no logout | Provisionar e logout | Design | Pending |
| ADM-BE-15 | Padronizar erros administrativos sem expor dados sensiveis | Todas | Design | Pending |
| ADM-BE-16 | Manter Clean Architecture, tipagem estrita e cobertura minima | Todas | Design | Pending |

**Cobertura**: 16 requisitos, 16 associados a historias, 0 ainda mapeados para tarefas nesta fase.

## Criterios de sucesso

- [ ] `super_admin` provisionado autentica e recebe HTTP 200 em `GET /api/admin/me`.
- [ ] Lojista, usuario comum, admin inativo e papeis `support`/`finance` recebem HTTP 403 nas rotas administrativas.
- [ ] Apenas `super_admin` lista todos os planos, cria plano e altera seu status.
- [ ] `GET /api/plans/available` permanece publico e nunca retorna planos inativos.
- [ ] Autoelevacao de papel e autorreativacao sao negadas pelo banco.
- [ ] Cada criacao ou mudanca efetiva de status gera exatamente um evento de auditoria atomico.
- [ ] O refresh token da sessao encerrada nao pode ser reutilizado apos logout.
- [ ] Build, testes unitarios, testes de integracao e cobertura passam sem regressao dos contratos existentes.

## Gate da fase Specify

Esta especificacao precisa de aprovacao antes da criacao de `design.md`. Nenhum `context.md` adicional e necessario no momento porque escopo, papel autorizado e estrategia de provisionamento ja foram decididos pelo usuario.
