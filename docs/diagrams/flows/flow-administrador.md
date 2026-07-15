# Fluxo atual do administrador

## Escopo

Este diagrama registra o estado atual do ator administrador. O banco possui entidades para administradores e auditoria, e o backend possui operações de planos marcadas como administrativas. Entretanto, ainda não existe uma jornada administrativa completa ou segura conectada ao frontend.

```mermaid
flowchart TD
    start([Início]) --> frontAccess["Tentar acessar área administrativa no frontend"]
    frontAccess --> frontDecision{"Existe rota ou página administrativa?"}
    frontDecision -->|Não| noFrontend["Fluxo interrompido: frontend administrativo inexistente"]

    start --> apiAccess["Consumir rotas de planos diretamente na API"]
    apiAccess --> authenticate["Enviar Bearer token ao authMiddleware"]
    authenticate --> tokenValid{"Token é válido?"}
    tokenValid -->|Não| unauthorized["Retornar HTTP 401"]
    tokenValid -->|Sim| roleCheck{"Backend valida cadastro e papel de administrador?"}
    roleCheck -->|Não| genericAuth["Qualquer usuário autenticado alcança as rotas marcadas como Admin"]
    genericAuth --> planAction{"Escolher operação"}
    planAction --> listPlans["GET /api/plans"]
    planAction --> createPlan["POST /api/plans"]
    planAction --> updatePlan["PATCH /api/plans/:id/status"]
    listPlans --> planResult["Consultar planos"]
    createPlan --> planResult
    updatePlan --> planResult

    database["Banco possui admins e audit_logs"]
    database --> noAdminApi["Não existem controllers ou rotas para administrar lojistas"]
    database --> noModerationApi["Não existem rotas para moderação de lojas ou produtos"]
    database --> noLogsApi["Não existe rota para consultar logs e eventos"]
    database --> auditTrigger["Existe trigger de auditoria para cancelamento de assinatura"]

    classDef integrated fill:#dcfce7,stroke:#166534,color:#14532d;
    classDef partial fill:#fef3c7,stroke:#b45309,color:#78350f;
    classDef unavailable fill:#fee2e2,stroke:#b91c1c,color:#7f1d1d;

    class authenticate,listPlans,createPlan,updatePlan,planResult,auditTrigger integrated;
    class apiAccess,genericAuth,database partial;
    class noFrontend,noAdminApi,noModerationApi,noLogsApi unavailable;
```

## Limites atuais representados

- Não há rota, tela, menu ou dashboard administrativo no frontend.
- As rotas de gestão de planos exigem autenticação, mas não verificam a tabela `admins` nem o papel `super_admin`, `support` ou `finance`.
- Não há API para listar, suspender ou reativar tenants.
- Não há API administrativa para moderar lojas ou produtos.
- Não há API para consultar `audit_logs` ou logs de acesso.
- A existência dos modelos `Admin` e `AuditLog` não constitui, sozinha, um fluxo administrativo implementado.
