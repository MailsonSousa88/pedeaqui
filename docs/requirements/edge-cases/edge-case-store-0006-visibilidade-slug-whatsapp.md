# Edge Case Store 0006 - Visibilidade pública, slug e WhatsApp da loja

## Origem

Levantamento de edge cases a partir dos requisitos de vitrine pública, loja ativa, slug e checkout via WhatsApp.

## Contexto

A loja pública é acessada por `slug`, possui estado de exibição pública e usa WhatsApp como canal de finalização do pedido.

## Situação fora do caminho feliz

Podem ocorrer situações como:

- `stores.active = false`, mas produtos continuam ativos;
- tenant suspenso, mas loja continua acessível via `slug`;
- lojista altera o `slug` depois que ele já foi compartilhado;
- duas lojas tentam usar o mesmo `slug`;
- loja sem WhatsApp configurado recebe tentativa de checkout.

## Risco

Sem regra clara, o sistema pode:

- exibir loja que deveria estar indisponível;
- permitir pedido para lojista suspenso;
- quebrar links compartilhados anteriormente;
- criar colisão de URLs públicas;
- gerar checkout sem destino configurado no WhatsApp.

## Comportamento esperado

O sistema deve:

1. Validar `stores.active` antes de exibir a vitrine.
2. Validar status do tenant antes de exibir loja pública.
3. Garantir unicidade de `slug`.
4. Impedir checkout quando a loja não possuir WhatsApp configurado.
5. Definir comportamento para alteração de `slug`.

## Critérios de validação

- Loja inativa deve retornar HTTP 404 na vitrine pública.
- Tenant suspenso não deve ter loja pública acessível.
- `slug` duplicado deve ser impedido.
- Checkout de loja sem WhatsApp configurado deve ser bloqueado.
- Produtos ativos não devem tornar pública uma loja inativa.

## Decisões pendentes

O time ainda precisa decidir:

- se alteração de `slug` será permitida;
- se `slug` antigo terá redirecionamento;
- qual mensagem aparece para consumidor quando a loja está indisponível;
- se tenant suspenso altera `stores.active` automaticamente;
- se ausência de WhatsApp configurado desativa checkout ou a loja inteira.

## Observação

Esse edge case mostra que produto ativo não basta para publicar vitrine. A disponibilidade pública depende também da loja, tenant e assinatura.
