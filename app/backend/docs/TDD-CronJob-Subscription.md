# TDD - Cron Job de Cancelamento de Assinaturas (Edge Case 0001)

| Campo           | Valor                        |
| --------------- | ---------------------------- |
| Tech Lead       | @Name                        |
| Team            | Backend                      |
| Epic/Ticket     | TBD                          |
| Status          | Draft                        |
| Created         | 2026-06-17                   |
| Last Updated    | 2026-06-17                   |

## Contexto

O projeto PedeAqui possui um sistema de vitrine pública e painel administrativo para lojas (tenants). O banco de dados (PostgreSQL/Supabase) já foi atualizado para bloquear instantaneamente lojas na vitrine pública e via Row Level Security (RLS) no painel quando `tenants.status != 'active'`.

Para que esse sistema funcione de forma integrada ao módulo de pagamentos/assinaturas, precisamos de um mecanismo responsável por fazer a transição do status do tenant quando sua assinatura é cancelada, mas respeitando o fim do período já pago (vigência da carência).

## Definição do Problema

### Problemas que Estamos Resolvendo
- **Lojas com assinaturas expiradas permanecem ativas**: O banco já protege o acesso baseando-se no `tenants.status`. Entretanto, atualmente nenhuma aplicação muda automaticamente o status do tenant de `active` para `suspended` quando o `ends_at` da assinatura cancelada chega ao fim.
- Sem esse serviço, os tenants cancelados continuariam vendendo produtos de graça indefinidamente após o fim da carência.

### Por Que Agora?
- O Edge Case 0001 requer que esse gap entre o encerramento do período de assinatura e a inativação da loja seja coberto de forma assíncrona, automática e confiável.

### Impacto de NÃO Resolver
- **Negócio**: Prejuízo financeiro e uso indevido de infraestrutura e vitrine pública.
- **Técnico**: Inconsistência nos estados dos usuários (assinatura cancelada, mas plataforma ativa).

## Escopo

### ✅ No Escopo (V1 - MVP)
- Script automatizado (Cron Job) rodando em Node.js de forma periódica (ex: a cada hora).
- Consulta ao Supabase buscando assinaturas onde:
  - `status = 'canceled'`
  - `ends_at < now()`
  - E cujo `tenants.status` atrelado seja `'active'`.
- Alteração do `tenants.status` para `'suspended'` para essas lojas específicas.
- Integração de bibliotecas como `node-cron` no servidor existente ou rotina dedicada.
- Implementação de logs estruturados das execuções do cron.

### ❌ Fora do Escopo (V1)
- Lidar com o bloqueio real das requisições (já tratado pelo banco de dados / RLS).
- Envio de emails e notificações para o lojista alertando sobre o cancelamento do tenant.
- Retentativas complexas com filas e dead-letter queues. (Por ser idempotente, o script apenas tentará de novo no próximo ciclo).

## Solução Técnica

### Visão Geral da Arquitetura
A solução consiste em rodar um Job agendado no Backend (Node.js) que varrerá periodicamente o Supabase em busca de assinaturas expiradas e realizará a suspensão associada no sistema de `tenants`.

**Componentes Chave:**
- **Cron Worker**: Inicializador rodando com `node-cron`. Pode ser acoplado no ponto de entrada (`app.ts`) ou como um script worker autônomo.
- **Repository de Assinatura/Tenant**: Interação com Supabase-js para ler e escrever os estados.
- **Use Case**: Contém a regra de buscar expiradas -> Suspender.

### Fluxo de Dados
1. O agendador (`node-cron`) dispara a rotina no início da hora.
2. O `UseCase` é invocado e requisita do `Repository` todas as assinaturas canceladas expiradas de lojas que ainda estão com `status = 'active'`.
3. O Backend recebe os IDs de tenant expirados.
4. O Backend faz um update (em lote/batch) ou individual no Supabase, setando `tenants.status = 'suspended'`.
5. Resultado é logado na saída do console/ferramenta de log estruturado.

### Recomendações de Biblioteca e Infraestrutura
- **Bibliotecas Node.js**: Usar a biblioteca [`node-cron`](https://www.npmjs.com/package/node-cron) para facilitar o agendamento interno, ex: rodando a cada 1 hora com o cron string `0 * * * *`.
- **Worker Dedicado ou Instância Única**: Ao escalar a API principal (múltiplos containers ou instâncias Node.js rodando via PM2/cluster), existe o risco do job rodar várias vezes simultâneas. Devemos assegurar ou um isolamento (job worker em uma infra separada) ou um lock no Redis/BD para garantir execução de uma via única por ciclo, ou basear a rotina em sua natureza idempotente (onde concorrência é apenas custosa e não danosa).

## Riscos

| Risco | Impacto | Probabilidade | Mitigação |
|------|--------|-------------|------------|
| **Concorrência entre múltiplos containers** | Baixo | Média | Como a consulta busca e atualiza o estado e a operação é idempotente (setar para `suspended`), o impacto no DB é apenas processamento redundante. Para mitigar, agendar um script exclusivo (Singleton) ou usar Distributed Locks. |
| **Sobrecarga por alto volume (Timeout)** | Médio | Baixa | Processar atualizações de status em lotes (ex: 100 por iteração) em vez de uma transaction gigante única. |
| **Falha silenciosa do Cron** | Alto | Baixa | A rotina parar de rodar significa que tenants não serão desativados. Implementar health check de que o Cron executou e registrou no log em < 2 horas. |

## Plano de Implementação

| Fase                 | Tarefa              | Descrição                            | Status |
| --------------------- | ----------------- | -------------------------------------- | ------ |
| **Fase 1 - Setup**    | Instalar pacotes   | Instalar `node-cron` e configurar setup base | TODO   |
| **Fase 2 - Queries**  | Repository | Construir queries RPC/Supabase para recuperar dados e atualizar em lote  | TODO   |
| **Fase 3 - Regra**    | Use Case | Desenvolver a lógica e testes de processamento limitando batches | TODO   |
| **Fase 4 - Worker**   | Agendamento | Registrar a rotina de hora em hora e adicionar log estruturado | TODO   |
| **Fase 5 - Deploy**   | Config. Ambiente | Validar que o job é executado em produção da forma esperada e singleton | TODO |

## Considerações de Segurança

- **Chaves de Acesso**: Por atuar como um processo no nível de sistema de retaguarda, o script pode precisar contornar o RLS natural em tabelas complexas, usando a chave `SUPABASE_SERVICE_ROLE_KEY`. Isso é seguro, visto que rodará no servidor Backend de confiança.
- **Sensibilidade de Log**: Garantir que as assinaturas que falhem sejam logadas apenas com seus IDs, nunca expondo e-mails ou dados financeiros (PII) dos donos do tenant.

## Estratégia de Testes

| Tipo de Teste         | Escopo                    | Abordagem             |
| --------------------- | ------------------------ | -------------------- |
| **Testes Unitários**  | Use Case de cancelamento | Usar `jest` com mock do Repository e mock das datas (`ends_at < now`). Confirmar que ele chama o update corretamente para as datas expiradas. |
| **Teste de Integração** | Repository + BD | Isolar um BD local (via Supertest/Supabase), criar assinaturas com datas antigas e confirmar a virada correta de status de `active` para `suspended`. |

## Monitoramento e Observabilidade

Para monitorar se o cron executa sua responsabilidade com precisão:

**Logs Estruturados**:
```json
{
  "level": "info",
  "timestamp": "2026-06-17T12:00:00Z",
  "message": "Cron: Processamento de assinaturas expiradas concluido",
  "context": {
    "action": "suspend_expired_tenants",
    "processed_count": 14,
    "failed_count": 0,
    "duration_ms": 320
  }
}
```

**Métricas a Monitorar**:
- O cron está rodando? Deve ocorrer pelo menos uma execução de `action: suspend_expired_tenants` a cada 1 hora.
- Existem exceptions geradas com o `failed_count > 0`? Podem indicar anomalias na conexão de rede e BD.

## Plano de Rollback

**Triggers**:
- Excesso de lojistas alertando suspensão indevida ou falha na regra que está desativando tenants válidos.

**Passos para Rollback**:
1. Parar a aplicação/worker que detém o serviço de cron (remover a instância de cron ativa na build).
2. Investigar o intervalo de falha pelo Log (quem foi alterado hoje equivocadamente).
3. Via console administrativo ou SQL pontual: atualizar `tenants.status = 'active'` dos tenants afetados baseados nos logs e com as devidas evidências do erro de inativação.
4. Adicionar teste regressivo reproduzindo o trigger para garantir o novo comportamento após a correção.
