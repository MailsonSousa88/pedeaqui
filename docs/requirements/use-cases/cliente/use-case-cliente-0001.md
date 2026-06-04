# UC-CL-0001 - Buscar e visualizar lojas

## Objetivo

Permitir que o cliente encontre lojas disponíveis na plataforma e acesse a vitrine de uma loja para conhecer seus produtos.

## Ator principal

Cliente.

## Atores secundários

Lojista.

## Pré-condições

- A plataforma deve possuir lojas cadastradas e disponíveis para visualização pública.
- A loja acessada deve estár ativa na plataforma.

## Pós-condições

- O cliente visualiza as informações públicas da loja.
- O cliente visualiza os produtos disponíveis na vitrine da loja.

## Gatilho

O cliente acessa a página inicial da plataforma ou procura uma loja específica.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O cliente acessa a página inicial da plataforma. |
| 2 | O sistema exibe as lojas disponíveis. |
| 3 | O cliente navega pela listagem ou utiliza recursos de busca para encontrar uma loja. |
| 4 | O cliente seleciona uma loja. |
| 5 | O sistema exibe a página pública da loja. |
| 6 | O sistema apresenta as informações da loja e seus produtos disponíveis. |

## Fluxos alternativos

### FA01 - Cliente não utiliza busca

| Passo | Ação |
|-------|------|
| 3a | O cliente navega manualmente pela listagem de lojas. |
| 3b | O sistema mantem a listagem visivel para exploração. |
| 3c | O fluxo retorna ao passo 4 do fluxo principal. |

## Fluxos de exceção

### FE01 - Nenhuma loja disponível

| Passo | Ação |
|-------|------|
| 2a | O sistema identifica que não existem lojas disponíveis para exibicao. |
| 2b | O sistema informa que não ha lojas disponíveis no momento. |
| 2c | O caso de uso é encerrado sem acesso a uma vitrine. |

### FE02 - Loja indisponível

| Passo | Ação |
|-------|------|
| 5a | O sistema identifica que a loja selecionada está inativa, bloqueada ou indisponível. |
| 5b | O sistema informa que a loja não pode ser acessada no momento. |
| 5c | O cliente retorna para a listagem de lojas. |

## Regras de negócio

- Somente lojas ativas devem aparecer na listagem pública.
- A vitrine pública deve exibir informações suficientes para identificar a loja.
- Produtos indisponíveis ou removidos não devem ser exibidos como disponíveis para pedido.

## Referências

- Status Report I - Épico 1: Jornada de Compra do Consumidor.
- User Story: "Como consumidor, eu quero navegar e buscar por diferentes lojas dentro da plataforma..."


