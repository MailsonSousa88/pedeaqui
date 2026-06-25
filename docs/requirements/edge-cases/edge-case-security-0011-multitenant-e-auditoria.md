# Edge Case Security 0011 - Isolamento multi-tenant e auditoria

## Origem

Levantamento de edge cases a partir dos requisitos de segurança, multi-tenant e logs de auditoria.

## Contexto

O sistema é multi-tenant. Cada lojista deve acessar apenas dados da própria loja, e ações críticas devem ser auditáveis.

## Situação fora do caminho feliz

Podem ocorrer situações como:

- lojista tenta editar produto de outro tenant;
- `tenant_id` do token diverge do recurso acessado;
- JWT é válido, mas tenant está `suspended`;
- admin ou suporte acessa dados sem registro em `audit_logs`;
- rota privada aceita token válido sem verificar tenant do recurso.

## Risco

Sem isolamento forte, o sistema pode:

- expor dados de uma loja para outra;
- permitir alteração indevida de produtos;
- permitir acesso administrativo sem rastreabilidade;
- manter tenant suspenso operando;
- quebrar confiança da plataforma.

## Comportamento esperado

O sistema deve:

1. Validar `tenant_id` em toda leitura e escrita de dados do lojista.
2. Bloquear acesso a recursos de outro tenant.
3. Bloquear ações pagas ou administrativas de tenant suspenso.
4. Registrar ações administrativas críticas.
5. Não confiar em identificadores enviados pelo frontend sem checar o contexto autenticado.

## Critérios de validação

- Tentativa de acessar recurso de outro tenant deve retornar HTTP 403.
- Tenant suspenso não deve operar rotas administrativas pagas.
- Ações críticas de admin devem gerar `audit_logs`.
- `tenant_id` usado na consulta deve vir do contexto autenticado.
- IDs enviados pelo frontend não devem permitir escapar do isolamento multi-tenant.

## Decisões pendentes

O time ainda precisa decidir:

- quais ações de admin entram obrigatoriamente em auditoria;
- quais rotas tenant suspenso ainda pode acessar;
- se suporte pode acessar dados de lojista e sob quais condições;
- como revisar logs de auditoria.

## Observação

Esse edge case foca apenas no isolamento entre tenants e na auditoria operacional.
