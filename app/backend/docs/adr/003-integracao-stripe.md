# ADR 003: Preparação da Infraestrutura para Integração com Stripe

**Status**: Aceito  
**Data**: 2026-07-06

## Contexto

O PedeAqui passará a oferecer planos por assinatura para os lojistas, exigindo a integração com um provedor de pagamentos recorrentes.

Antes da implementação dos fluxos de cobrança, foi necessário definir como o SDK da Stripe seria incorporado à arquitetura existente, preservando os princípios de Clean Architecture e mantendo consistência com a organização já utilizada para o Supabase.

## Decisão

A infraestrutura da Stripe será introduzida de forma isolada, sem adicionar regras de negócio nesta etapa.

Foram adotadas as seguintes decisões arquiteturais:

- Centralizar as configurações da Stripe em `src/config/index.ts`.
- Isolar o cliente oficial da Stripe em `src/infra/stripe/stripeClient.ts`.
- Utilizar variáveis de ambiente para todas as credenciais da integração.
- Fixar explicitamente a versão da API da Stripe para evitar mudanças automáticas de comportamento.
- Não criar Controllers, Use Cases, Repositories ou Rotas nesta fase.

## Estrutura Adotada

```
src/
├── config/
│   └── index.ts
└── infra/
    └── stripe/
        └── stripeClient.ts
```

## Consequências

### Positivas

- Mantém o SDK desacoplado das regras de negócio.
- Segue o mesmo padrão arquitetural utilizado pelo Supabase.
- Facilita a evolução da integração nas próximas Sprints.
- Centraliza toda a configuração da Stripe em um único ponto.

### Negativas

- A infraestrutura adicionada ainda não possui funcionalidade visível.
- Novas camadas (Controllers, Use Cases e Webhooks) serão introduzidas nas próximas etapas da implementação.

## Escopo desta ADR

Esta decisão contempla **apenas a preparação da infraestrutura** para a integração com a Stripe.

A criação de Checkout Sessions, Webhooks, gerenciamento de assinaturas e persistência no banco serão documentadas em ADRs futuras, caso introduzam novas decisões arquiteturais.