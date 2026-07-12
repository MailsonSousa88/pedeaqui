# Edge Case Cart 0007 - Produto alterado enquanto está no carrinho

## Origem

Levantamento de edge cases a partir dos requisitos de carrinho, checkout e validação server-side.

## Contexto

O carrinho é temporário e armazenado no `localStorage`. O sistema registra snapshot de preço, nome e imagem no momento da adição, mas o checkout deve revalidar os dados no backend.

## Situação fora do caminho feliz

Enquanto o consumidor mantém produtos no carrinho, o lojista pode:

- remover o produto;
- alterar o preço;
- alterar a imagem ou nome;
- marcar produto como indisponível;
- encerrar uma promoção;
- aplicar soft delete.

## Risco

Sem revalidação, o consumidor pode:

- tentar comprar produto removido;
- finalizar pedido com preço antigo;
- ver produto no carrinho que não existe mais na vitrine;
- enviar pedido via WhatsApp com dados desatualizados.

## Comportamento esperado

O sistema deve:

1. Manter o snapshot no carrinho apenas como referência visual temporária.
2. Revalidar preço e disponibilidade no backend antes de criar pedido.
3. Informar itens inválidos ao consumidor.
4. Impedir criação de pedido quando qualquer item estiver inválido.
5. Atualizar totais usando preços retornados pelo backend.

## Critérios de validação

- Produto com soft delete não deve ser aceito no checkout.
- Produto indisponível deve bloquear o pedido.
- Preço usado no pedido deve vir do banco, não do `localStorage`.
- Promoção expirada não deve ser aplicada no checkout.

## Decisões pendentes

O time ainda precisa decidir:

- como o frontend exibirá itens inválidos no carrinho;
- se o consumidor poderá remover itens inválidos e continuar;
- se alteração de preço deve exigir confirmação antes de finalizar;
- como tratar carrinho com produtos de lojas diferentes.

## Observação

Esse edge case reforça que o `localStorage` não é fonte confiável para checkout. Ele serve para experiência do usuário, não para validação final.
