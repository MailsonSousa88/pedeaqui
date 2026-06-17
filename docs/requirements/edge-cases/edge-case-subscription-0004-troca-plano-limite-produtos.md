# Edge Case Subscription 0004 - Troca de plano reduzindo limite de produtos

## Origem

Levantamento de edge cases a partir do requisito `RF031 - Limite de produtos por plano`.

## Contexto

O sistema deve restringir o número de produtos cadastrados conforme o plano contratado, usando o campo `max_products`.

## Situação fora do caminho feliz

Um lojista possui um plano com limite maior de produtos e já cadastrou vários itens. Depois disso, ele troca para um plano com limite menor.

Exemplo:

- plano anterior permite 100 produtos;
- lojista possui 80 produtos cadastrados;
- novo plano permite 30 produtos.

## Risco

Se o sistema não tratar essa troca, podem ocorrer inconsistências como:

- lojista permanecer com mais produtos que o novo plano permite;
- produtos serem removidos automaticamente sem consentimento;
- loja pública exibir produtos além do limite do plano;
- painel permitir edição de produtos acima do limite;
- lojista ser impedido de gerenciar a loja sem orientação.

## Comportamento esperado

O sistema deve:

1. Detectar quando o novo plano possui limite menor que a quantidade atual de produtos.
2. Não apagar produtos automaticamente.
3. Bloquear cadastro de novos produtos enquanto o limite estiver excedido.
4. Definir como produtos excedentes serão tratados na vitrine.
5. Informar o lojista sobre o limite excedido.

## Critérios de validação

- Troca para plano menor não deve apagar produtos automaticamente.
- Se a quantidade atual exceder `max_products`, novo cadastro de produto deve retornar HTTP 403.
- O sistema deve apresentar mensagem clara de limite excedido.
- A regra de exibição dos produtos excedentes deve ser definida antes da implementação.

## Decisões pendentes

O time ainda precisa decidir:

- se produtos acima do limite continuam visíveis;
- se o lojista deverá escolher quais produtos manter ativos;
- se produtos excedentes serão pausados automaticamente;
- se haverá prazo para adequação após downgrade;
- se downgrade será bloqueado quando houver produtos acima do limite.

## Observação

Esse edge case não deve ser resolvido com exclusão automática. A decisão precisa preservar dados e evitar surpresa para o lojista.
