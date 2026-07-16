# UC-CL-0001 - Acessar plataforma, descobrir lojas e abrir vitrine

> Observação de nomenclatura: o diretório e o código `CL` permanecem por compatibilidade documental, mas o ator correto deste fluxo é **Consumidor**, não cliente.

## Objetivo

Permitir que o consumidor acesse o PedeAqui, conheça a plataforma quando entrar pela Home, encontre lojas disponíveis ou acesse diretamente uma loja por slug, e visualize a vitrine pública com informações e produtos.

## Ator principal

Consumidor.

## Atores secundários

Lojista.

## Pré-condições

- A plataforma pode ser acessada publicamente.
- Para listagem pública, devem existir lojas ativas e disponíveis.
- Para acesso direto por slug, a loja deve existir, estar ativa e estar disponível para exibição pública.

## Pós-condições

- O consumidor entende o propósito do PedeAqui quando acessa a Home.
- O consumidor visualiza a lista de lojas disponíveis quando decide explorar lojas.
- O consumidor acessa uma vitrine pública e visualiza informações da loja.
- O consumidor visualiza produtos disponíveis da loja acessada.

## Gatilho

O consumidor acessa `pedeaqui.store`, navega para a área de lojas ou abre um link direto de uma loja por slug.

## Fluxo principal - Entrada pela plataforma

| Passo | Ação |
|-------|------|
| 1 | O consumidor acessa a Home/Inicio do PedeAqui. |
| 2 | O sistema exibe informações institucionais da plataforma, benefícios, chamadas e conteúdos de apresentação. |
| 3 | O consumidor identifica que não deseja contratar plano de lojista e decide explorar lojas. |
| 4 | O consumidor acessa a tela/listagem de lojas. |
| 5 | O sistema exibe lojas ativas e disponíveis para acesso público. |
| 6 | O consumidor pesquisa, filtra, navega manualmente ou seleciona uma loja específica. |
| 7 | O sistema exibe a vitrine pública da loja selecionada. |
| 8 | O sistema apresenta informações da loja, categorias/filtros quando aplicável e produtos disponíveis. |
| 9 | O consumidor pode visualizar detalhes de um produto ou iniciar a seleção de itens para o carrinho. |

## Fluxos alternativos

### FA01 - Acesso direto por slug da loja

| Passo | Ação |
|-------|------|
| 1a | O consumidor acessa um link direto de loja, como uma URL pública com slug. |
| 1b | O sistema valida se o slug existe e se a loja está ativa. |
| 1c | O sistema exibe diretamente a vitrine pública da loja. |
| 1d | O fluxo segue a partir do passo 8 do fluxo principal. |

### FA02 - Consumidor navega sem busca

| Passo | Ação |
|-------|------|
| 6a | O consumidor não usa busca |
| 6b | O sistema mantém a listagem visível para exploração manual. |
| 6c | O consumidor seleciona uma loja. |
| 6d | O fluxo retorna ao passo 7 do fluxo principal. |

### FA03 - Consumidor visualiza produtos sem adicionar ao carrinho

| Passo | Ação |
|-------|------|
| 9a | O consumidor visualiza produtos e informações da loja. |
| 9b | O consumidor decide não adicionar produtos ao carrinho. |
| 9c | O caso de uso encerra sem criação ou atualização de carrinho. |

## Fluxos de exceção

### FE01 - Nenhuma loja disponível

| Passo | Ação |
|-------|------|
| 5a | O sistema identifica que não existem lojas disponíveis para exibição. |
| 5b | O sistema exibe estado vazio informando que não há lojas disponíveis no momento. |
| 5c | O consumidor pode retornar à Home ou tentar novamente depois. |

### FE02 - Loja indisponível

| Passo | Ação |
|-------|------|
| 7a | O sistema identifica que a loja selecionada está inativa, bloqueada ou indisponível. |
| 7b | O sistema informa que a loja não pode ser acessada no momento. |
| 7c | O consumidor pode retornar para a listagem de lojas. |

### FE03 - Slug inexistente ou inválido

| Passo | Ação |
|-------|------|
| 1a | O consumidor acessa uma URL de loja com slug inexistente, inválido ou removido. |
| 1b | O sistema retorna estado de loja não encontrada. |
| 1c | O consumidor pode voltar para a Home ou acessar a listagem de lojas. |

### FE04 - Nenhum produto disponível na loja

| Passo | Ação |
|-------|------|
| 8a | O sistema identifica que a loja não possui produtos disponíveis para pedido. |
| 8b | O sistema exibe a vitrine da loja com estado vazio de produtos. |
| 8c | O consumidor não consegue adicionar produtos ao carrinho nessa loja. |

## Regras de negócio

- A Home é uma tela de apresentação da plataforma e não deve obrigar o consumidor a contratar plano.
- A lista pública deve exibir apenas lojas ativas e disponíveis.
- A vitrine pública deve ser acessível por slug quando a loja estiver ativa.
- Slug inexistente ou loja inativa deve resultar em estado de não encontrado ou indisponível.
- Produtos indisponíveis, removidos ou sem condição de pedido não devem aparecer como disponíveis para compra.
- O consumidor não precisa estar autenticado para visualizar lojas e produtos.

## Telas relacionadas

- `docs/screens/screen-home-0001.md`
- Futuras telas de listagem de lojas.
- Futuras telas de vitrine pública da loja.
- Futuras telas de detalhes do produto.

## Referências

- `RF001` - Visualização das lojas.
- `RF002` - Visualização de produtos da loja.
- `RF003` - Informações de um produto.
- `RF007` - Busca e filtragem de produtos dentro da loja.
- `RF008` - Exibição de produtos em promoção.
- `RF009` - Compartilhamento de loja.
- `RF032` - Exibição da vitrine pública.
- Status Report I - Épico 1: Jornada de Compra do Consumidor.
- User Story: "Como consumidor, eu quero navegar e buscar por diferentes lojas dentro da plataforma..."
