# TDD - Máquina de Estados e Manejo de Assinaturas no Banco de Dados

| Campo | Valor |
| --- | --- |
| Tech Lead | AI Agent |
| Equipe | Backend & Database |
| Status | Aprovado (Implementação Parcial Concluída) |
| Criado em | 2026-06-17 |

## 1. Contexto

O projeto PedeAqui opera em um modelo SaaS multi-tenant, onde cada lojista (tenant) possui uma assinatura que garante o funcionamento de sua loja e do seu painel administrativo. O controle preciso do status financeiro dessa assinatura é vital para o negócio, pois dita se a loja deve estar visível ao público (clientes finais) e acessível ao lojista.

O atual design foca em como a transição de status das assinaturas afeta o status da loja e como o banco de dados (Supabase) atua como um guardião dessas regras, trabalhando em conjunto com um serviço de background (Backend Cron).

## 2. Definição do Problema

Há a necessidade de sincronizar de maneira robusta os eventos de assinatura (ex: pagamento atrasado, cancelamento) com a disponibilidade da loja, garantindo que lojas inadimplentes ou canceladas deixem de ser públicas sem deletar seus dados. 
Além disso, é preciso ter um histórico claro (auditoria) de quando uma assinatura é cancelada, e garantir que um mesmo tenant não possa burlar o sistema ativando múltiplas assinaturas simultâneas.

## 3. Escopo

### ✅ No Escopo
- Definição dos status da tabela `subscriptions` e da tabela `tenants`.
- Constraints de integridade no banco de dados para evitar múltiplas assinaturas ativas.
- Gatilhos (Triggers) de auditoria para transições críticas (Cancelamento).
- Políticas de segurança (RLS) para ocultar dados de lojas suspensas.
- Definição da divisão de responsabilidades entre Banco de Dados e Backend (Worker/Cron).

### ❌ Fora do Escopo (Neste Documento)
- Integração direta com gateways de pagamento (Stripe, Pagar.me, etc).
- Fluxo de interface do usuário para atualização de cartão de crédito.
- Envio de webhooks para o lojista.

## 4. Solução Técnica

### 4.1. Máquina de Estados

A arquitetura define duas máquinas de estados interligadas, uma na tabela `subscriptions` e outra na tabela `tenants`.

**Status de Assinaturas (`subscriptions.status`)**:
- `active`: Pagamentos em dia. A loja deve operar normalmente.
- `past_due`: Ocorreu uma falha no pagamento recente. A assinatura ainda provê acesso dependendo da carência.
- `unpaid`: As tentativas de cobrança esgotaram-se. Assinatura inativa financeiramente.
- `canceled`: Assinatura foi encerrada (pelo usuário ou via sistema).

**Status de Tenants (`tenants.status`)**:
- `active`: Loja operante, visível ao público, produtos acessíveis.
- `suspended`: Loja inoperante. RLS bloqueia o acesso público e a loja é exibida como indisponível.

### 4.2. Separação de Responsabilidades (Banco vs. Backend)

Um pilar deste design é a separação clara de papéis:

1. **Backend (Workers/Cron)**: 
   - **Tomada de Decisão**: Avalia diariamente o `status` da assinatura e a data de expiração (`ends_at` ou `current_period_end`).
   - É o responsável exclusivo por alterar o campo `tenants.status` de `active` para `suspended` quando a carência expira ou o ciclo encerra em status inadimplente (`unpaid`/`canceled`).
   
2. **Banco de Dados (Supabase/PostgreSQL)**:
   - **Aplicação Rigorosa de Regras**: Age passivamente garantindo que as regras do negócio não sejam violadas caso o Backend mude o status.
   - Aplica cegueira via RLS nas lojas suspensas.

### 4.3. Implementações no Banco de Dados (v5 / bd-atual-v4.sql)

As seguintes regras arquiteturais já foram validadas e implementadas no banco:

1. **Constraint de Assinatura Única Ativa**:
   Foi criada uma constraint de exclusão (`EXCLUDE` ou index único parcial) na tabela `subscriptions` garantindo que um mesmo `tenant_id` não possa ter mais de um registro onde `status = 'active'`. Isso evita inconsistências caso ocorra duplicação no processamento de webhooks de pagamento.

2. **Auditoria de Cancelamento (Trigger)**:
   Foi introduzida a tabela `audit_logs` e a função `fn_audit_subscription_cancellation`. Quando o campo `status` de uma assinatura transiciona para `canceled`, um trigger registra na tabela de auditoria qual foi o ID da assinatura, o Tenant, e o timestamp exato da ocorrência, garantindo rastreabilidade financeira e de compliance.

3. **Políticas de RLS para Tenants Suspensos**:
   Políticas atualizadas na tabela `tenants`, `products` e `categories` garantem que, se `tenants.status = 'suspended'`, acessos anônimos (ou papéis públicos não autenticados do lojista) não consigam realizar `SELECT`. A loja fica essencialmente "invisível" para o público, sem necessidade de hard-delete.

### 4.4. Fluxo Completo de Ciclo de Vida

1. **Criação**: Tenant é registrado, assinatura nasce `active` com data `ends_at`. `tenants.status` é setado para `active`.
2. **Ativação/Renovação**: A cada ciclo de pagamento, a data de renovação é empurrada para frente.
3. **Inadimplência**: Pagamento falha, gateway envia webhook -> backend atualiza `subscriptions.status = 'past_due'`.
   - *Backend Cron* avalia se `ends_at` já passou + dias de carência.
   - Se estourar limite, backend atualiza `subscriptions.status = 'unpaid'` e muda `tenants.status = 'suspended'`.
   - O *RLS entra em ação* e as APIs públicas param de retornar os dados da loja.
4. **Cancelamento**: Ocorre via ação manual ou falha crônica.
   - `subscriptions.status = 'canceled'`.
   - *Trigger dispara* no banco, gravando log em `audit_logs`.
   - Backend garante que o `tenants.status` vá para `suspended`.

## 5. Riscos e Mitigações

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| **Desincronia Cron vs Gateway** | Alto | O webhook sempre reflete o status real no BD, enquanto o Cron deve atuar ativamente e de forma idempotente para suspender tenants atrasados. |
| **Race Conditions na Criação** | Médio | Resolvido com o Unique Constraint no banco para evitar assinaturas ativas duplicadas. |
| **Falsos Positivos de Bloqueio** | Alto (Lojas caindo indevidamente) | O RLS confia puramente em `tenants.status`. A regra de negócio para virar de `active` para `suspended` está 100% testada na camada de Use Cases do Backend antes de tocar no banco. |

## 6. Plano de Implementação

| Fase | Tarefa | Status |
| --- | --- | --- |
| Fase 1 | Estruturação de Tabelas (`subscriptions`, `tenants`) | **Concluído** |
| Fase 2 | Constraints do Banco (Prevenção de Duplicatas Ativas) | **Concluído** |
| Fase 3 | Triggers de Auditoria (`fn_audit_subscription_cancellation`) | **Concluído** |
| Fase 4 | Row Level Security baseada em status do Tenant | **Concluído** |
| Fase 5 | Criação e testes dos Use Cases do Backend (Cronjob de suspensão) | Pendente |
| Fase 6 | Monitoramento do Cron e Integração E2E | Pendente |
