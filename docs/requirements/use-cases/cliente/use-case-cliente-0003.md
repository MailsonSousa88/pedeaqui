# UC-CL-0003 - Finalizar pedido via WhatsApp

> Observação de nomenclatura: o diretório e o código `CL` permanecem por compatibilidade documental, mas o ator correto deste fluxo é **Consumidor**, não cliente.

## Objetivo

Permitir que o consumidor finalize os produtos de uma loja a partir do card correspondente no carrinho, informe os dados necessários para compor a mensagem do pedido, revise as informações e seja redirecionado ao WhatsApp do lojista com a mensagem personalizada.

## Ator principal

Consumidor.

## Atores secundários

Lojista e WhatsApp.

## Pré-condições

- O consumidor deve possuir ao menos um card de loja no carrinho.
- O card selecionado deve possuir ao menos um produto com quantidade válida.
- A loja associada ao card deve estar ativa para checkout.
- A loja deve possuir WhatsApp configurado para receber o pedido.

## Pós-condições

- O consumidor informa os dados necessários para montar a mensagem personalizada.
- O consumidor revisa os dados do pedido antes da finalização.
- O sistema valida os produtos selecionados e gera uma mensagem personalizada.
- O consumidor é redirecionado para o WhatsApp do lojista.
- A negociação passa a ocorrer diretamente entre consumidor e lojista fora da plataforma.

## Gatilho

O consumidor acessa o carrinho, abre o card de uma loja e clica em "Finalizar pedido".

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O consumidor acessa a página de carrinho. |
| 2 | O sistema exibe cards de lojas com produtos selecionados. |
| 3 | O consumidor clica no card da loja desejada. |
| 4 | O sistema exibe os produtos referentes somente àquela loja. |
| 5 | O consumidor revisa produtos, quantidades e resumo. |
| 6 | O consumidor clica em "Finalizar pedido". |
| 7 | O sistema exibe a tela para preenchimento das informações necessárias ao pedido. |
| 8 | O consumidor informa dados como endereço, telefone, observações ou outros campos definidos pela spec da tela. |
| 9 | O consumidor avança para a tela de revisão. |
| 10 | O sistema exibe os produtos, dados informados e resumo do pedido para conferência. |
| 11 | O consumidor confirma que as informações estão corretas. |
| 12 | O sistema valida os itens do pedido e gera a mensagem personalizada. |
| 13 | O sistema exibe a finalização e redireciona o consumidor para o WhatsApp do lojista. |

## Fluxos alternativos

### FA01 - Consumidor volta para revisar produtos

| Passo | Ação |
|-------|------|
| 7a | O consumidor decide voltar antes de preencher ou confirmar as informações. |
| 7b | O sistema retorna para a visualização dos produtos do card da loja. |
| 7c | O consumidor pode revisar, remover produtos ou alterar quantidades. |

### FA02 - Consumidor corrige dados na revisão

| Passo | Ação |
|-------|------|
| 10a | O consumidor identifica informação incorreta na tela de revisão. |
| 10b | O consumidor escolhe editar os dados. |
| 10c | O sistema retorna para a tela de informações do pedido preservando os dados preenchidos. |
| 10d | O consumidor corrige as informações e avança novamente para revisão. |

### FA03 - Consumidor cancela a finalização

| Passo | Ação |
|-------|------|
| 7a | O consumidor decide não continuar a finalização. |
| 7b | O sistema mantém o carrinho preservado. |
| 7c | O consumidor pode retornar ao carrinho ou à vitrine. |

## Fluxos de exceção

### FE01 - Carrinho vazio

| Passo | Ação |
|-------|------|
| 1a | O consumidor acessa o carrinho sem cards de loja. |
| 1b | O sistema exibe estado vazio e não permite finalização. |

### FE02 - Card da loja sem produtos válidos

| Passo | Ação |
|-------|------|
| 6a | O sistema identifica que o card da loja não possui produtos com quantidade válida. |
| 6b | O sistema bloqueia o botão "Finalizar pedido". |
| 6c | O sistema orienta o consumidor a adicionar ou corrigir produtos. |

### FE03 - Dados obrigatórios ausentes ou inválidos

| Passo | Ação |
|-------|------|
| 8a | O consumidor tenta avançar sem preencher dados obrigatórios ou com dados inválidos. |
| 8b | O sistema impede o avanço. |
| 8c | O sistema exibe mensagens próximas aos campos correspondentes. |

### FE04 - Produto inválido no checkout

| Passo | Ação |
|-------|------|
| 12a | O backend identifica produto indisponível, inválido ou com preço alterado. |
| 12b | O sistema cancela a geração do pedido. |
| 12c | O sistema informa os itens inválidos e mantém o consumidor no fluxo para revisão. |

### FE05 - Loja sem WhatsApp configurado

| Passo | Ação |
|-------|------|
| 13a | O sistema identifica que a loja não possui WhatsApp configurado. |
| 13b | O sistema impede o redirecionamento. |
| 13c | O sistema informa que o pedido não pode ser finalizado no momento. |

### FE06 - Falha ao abrir WhatsApp

| Passo | Ação |
|-------|------|
| 13a | O redirecionamento para WhatsApp falha ou é bloqueado pelo navegador/dispositivo. |
| 13b | O sistema oferece alternativa para copiar a mensagem ou tentar novamente, quando aplicável. |

## Regras de negócio

- A plataforma não processa pagamento do consumidor no MVP.
- A finalização acontece por loja, a partir de um card de loja no carrinho.
- A mensagem personalizada deve conter os produtos selecionados daquela loja.
- O frontend deve enviar apenas IDs dos produtos e quantidades para validação quando houver backend de checkout.
- Valores financeiros finais devem vir da validação do backend, não do frontend.
- Um pedido vazio não pode ser finalizado.
- O consumidor deve revisar os dados antes do redirecionamento.
- Cada redirecionamento deve ser feito para o WhatsApp da loja responsável pelo pedido.

## Telas relacionadas

- Futuras telas de carrinho.
- Futuras telas de informações do pedido.
- `docs/screens/screen-checkout-review-0007.md`, quando aplicada ao contexto de revisão de checkout.
- Futuras telas de finalização/redirecionamento WhatsApp.

## Referências

- `RF006` - Finalização da compra.
- `RF033` - Processamento de checkout e validação.
- `RF034` - Checkout via WhatsApp.
- Status Report I - Fluxo Principal: Consumidor finaliza pedido por loja.
- Status Report I - Fluxo de Exceção: Carrinho vazio ao finalizar pedido.
