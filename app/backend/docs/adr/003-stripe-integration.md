# ADR 003: Integração com Stripe e Isolamento de Dependência

## Contexto

O sistema precisa permitir que os usuários (Tenants) assinem planos pagos antes de criar suas Lojas (Stores). Para processar os pagamentos e gerenciar as assinaturas, optamos por utilizar o **Stripe**. 

Porém, a introdução do SDK do Stripe (`stripe`) adiciona uma dependência externa pesada. Como a arquitetura do projeto segue os princípios da **Clean Architecture**, precisamos garantir que a lógica de negócio (Use Cases e Models) não fique acoplada a essa biblioteca de terceiros. 

Além disso, a validação de segurança de webhooks do Stripe exige o body bruto (raw buffer) da requisição, o que impacta na forma como configuramos as rotas no framework web (Express).

## Proposta de Mudança (Design da Integração)

1. **Adição da Dependência**: Instalaremos a biblioteca oficial `stripe` no projeto via npm.
2. **Camada de Infraestrutura (Adapter Pattern)**: 
   - A biblioteca `stripe` **não** será importada em nenhum Controller ou Use Case.
   - Criaremos uma interface abstrata `IStripeProvider` (ex: em `src/repositories/interfaces/` ou `src/infra/providers/`) que define apenas os métodos necessários:
     - `createCheckoutSession(tenantId: string, planId: string): Promise<string>`
     - `constructWebhookEvent(rawBody: Buffer, signature: string): any`
   - Implementaremos essa interface na classe `StripeProvider` dentro de `src/infra/providers/`. Somente essa classe conhecerá o SDK do Stripe.
3. **Gestão de Estado (Idempotência)**: 
   - Quando o Checkout for gerado, passaremos o `tenant_id` e `plan_id` via campo estrito do Stripe (como `client_reference_id` ou `metadata`).
   - Quando o webhook chegar, ele retornará esses metadados, facilitando a vinculação e a atualização correta da tabela `subscriptions` através do Repositório nativo (Supabase).
4. **Middleware do Express para Webhook**:
   - A rota `/webhooks/stripe` utilizará o middleware `express.raw({ type: 'application/json' })` no lugar do tradicional `express.json()`, para preservar o buffer da requisição que é essencial para o método de validação do Stripe (assinatura `stripe-signature`).

## Alternativas Consideradas

- **Usar chamadas HTTP diretas via fetch/axios para a API do Stripe**: 
  - *Pró*: Não requer instalar o pacote npm pesado do `stripe`.
  - *Contra*: Traz altíssima complexidade para gerenciar a criptografia da verificação da assinatura do webhook, sendo muito propenso a erros de segurança. A biblioteca oficial resolve isso com precisão. **(Rejeitada)**

- **Acoplar o SDK do Stripe diretamente nos Use Cases**:
  - *Pró*: Mais rápido e fácil de implementar inicialmente.
  - *Contra*: Fere o princípio de Inversão de Dependência (DIP) do SOLID e quebra a regra arquitetural da Clean Architecture do projeto, dificultando mocks nos testes unitários dos Use Cases. **(Rejeitada)**

## Consequências

- **Testabilidade**: Como abstraímos o provedor de pagamentos via `IStripeProvider`, os Use Cases poderão ser facilmente testados injetando um Provider mockado, sem precisar bater na rede ou na API de Sandbox do Stripe.
- **Manutenibilidade**: Se futuramente for necessário migrar ou adicionar outro gateway de pagamento (ex: Mercado Pago), a alteração ficará restrita à camada de infraestrutura, não afetando as regras de negócio.
- **Rotas**: O arquivo de configuração principal (ou rotas de webhook) precisará tratar o parser do Express de forma ligeiramente diferente apenas para esse endpoint.
