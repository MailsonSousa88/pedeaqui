# Tela de Loja

## Identificação

**Nome da tela:**  
Vitrine pública da loja

**Código da tela:**  
`SCREEN-STORE-010`

**Link ou referência visual:**  
Imagem de referência fornecida no chat. A imagem deve ser usada como direção visual de estrutura, composição e hierarquia, mas os textos e dados exibidos nela são exemplos e não representam a versão final.

**Status da tela:**  
Rascunho.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Jornada do consumidor, vitrine pública, descoberta de produtos e início do carrinho.

**Etapa do fluxo:**  
Tela exibida quando o consumidor seleciona uma loja na listagem pública ou acessa diretamente uma loja por slug.

**Tela anterior:**  
Home, listagem de lojas, link direto da loja por slug ou navegação externa.

**Próxima tela esperada:**  
Detalhes do produto, carrinho da loja, checkout do pedido por loja ou retorno para listagem de lojas.

## Objetivo

**Descrição da tela:**  
Tela pública que apresenta uma loja ativa dentro do PedeAqui, exibindo informações da loja, produtos disponíveis, categorias, produtos em promoção e ações para o consumidor montar um pedido.

**Função principal:**  
Permitir que o consumidor conheça a loja, encontre produtos, filtre ou pesquise itens e adicione produtos ao carrinho temporário.

**Ator principal:**  
Consumidor.

**Atores secundários:**  
Lojista.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF002`, `RF003`, `RF004`, `RF007`, `RF008`, `RF009`, `RF028`, `RF032`

**Requisitos não funcionais relacionados:**  
`RNF0011`, `RNF0012`, `RNF0013`, `RNF0014`, `RNF0015`, `RNF0016`, `RNF0017`, `RNF0018`, `RNF0020`, `RNF0022`

**Casos de uso relacionados:**  
`use-case-cliente-0001`, `use-case-cliente-0002`

**Edge cases relacionados:**  
`edge-case-cart-0007-produto-alterado-no-carrinho`, `edge-case-category-0008-gerenciamento-categorias`, `edge-case-image-0009-upload-r2-banco`

## Conteúdo da tela

**Título principal:**  
Nome público da loja.

**Subtítulo ou texto de apoio:**  
Descrição curta da loja, seguida pelas informações públicas coletadas na tela de pré-configuração da loja.

**Mensagens auxiliares:**  
Mensagens de disponibilidade da loja, estado vazio de produtos, aviso de produto indisponível, feedback de link copiado e confirmação visual ao adicionar produto ao carrinho.

## Elementos de interface

### Header

- Logo: `PedeAqui`, usando a imagem oficial da marca.
- Texto auxiliar: não obrigatório.
- Botão ou link de ação: `Minha vitrine`, quando a visualização estiver no contexto do lojista; no contexto público do consumidor, a ação pode ser substituída por carrinho ou navegação pública.
- Ícones: loja, carrinho, compartilhar, copiar link e navegação inferior quando aplicável.

### Área de identidade da loja

- Tipo de container: card principal branco com banner da loja no topo e informações abaixo.
- Título: nome da loja.
- Subtítulo: descrição resumida da loja.
- Ícone principal: imagem de perfil da loja ou fallback visual com ícone de loja.
- Conteúdo:
  - imagem de banner da loja, quando existir;
  - imagem de perfil da loja, quando existir;
  - nome da loja;
  - descrição curta;
  - informações públicas da loja vindas da tela de pré-configuração;
  - ação de compartilhar link da loja.

**Origem das informações da loja:**  
As informações exibidas nesta área devem ser derivadas dos dados coletados na tela de pré-configuração da loja (`screen-store-preconfiguration-0005.md`) e do cadastro posterior da vitrine, quando existir.

Dados vindos da pré-configuração:

| Informação exibida na vitrine | Campo de origem na pré-configuração | Observação |
| --- | --- | --- |
| Nome da loja | `storeName` | Deve ser o título principal da loja |
| E-mail de contato | `contactEmail` | Deve aparecer como informação de contato |
| WhatsApp | `whatsapp` | Deve aparecer formatado para leitura |
| Dias de funcionamento | `businessHours.startDay` e `businessHours.endDay` | Exibir como intervalo, por exemplo `Segunda-feira até Sexta-feira` |
| Horário de funcionamento | `businessHours.opensAt` e `businessHours.closesAt` | Exibir como intervalo, por exemplo `08:00 até 18:00` |
| Endereço | `address.street`, `address.number`, `address.neighborhood`, `address.city`, `address.state` | Montar endereço público resumido |

**Importante:**  
Os dados da imagem de referência, como `Sabor do Chef`, `Rua das Flores`, horários, telefone e e-mail, são apenas exemplos visuais. A implementação não deve fixar essas informações. A vitrine deve exibir os dados reais da loja cadastrada/pré-configurada.

**Organização das informações no card:**  
As informações de funcionamento, endereço, WhatsApp e e-mail devem ficar uma abaixo da outra, em linhas separadas, com ícone à esquerda e texto à direita. Não usar layout em duas colunas para essas informações no mobile.

Exemplo de organização visual:

```text
[ícone relógio] Segunda-feira até Sexta-feira
                08:00 até 18:00

[ícone localização] Rua, número
                    Bairro, Cidade - UF

[ícone WhatsApp] (11) 91234-5678

[ícone e-mail] contato@sualoja.com
```

### Ações de gestão ou compartilhamento

- `Editar`: pode aparecer somente quando o lojista estiver visualizando a própria vitrine em contexto autenticado.
- `Copiar link`: copia o link público da loja.
- No contexto público do consumidor, evitar mostrar ações administrativas como `Editar`.

### Navegação por abas da vitrine

- Tipo: barra de navegação em card ou faixa abaixo da identidade da loja.
- Abas esperadas:
  - `Produtos`;
  - `Adicionar`, somente para contexto do lojista ou gestão da vitrine;
  - `Categorias`, quando a tela permitir navegação ou gestão de categorias.
- Para consumidores, priorizar `Produtos`, categorias e carrinho. A aba `Adicionar` não deve aparecer para consumidor comum.

### Produtos em promoção

- Tipo de container: seção horizontal, banner dinâmico ou cards destacados.
- Título: `Promoções da loja`.
- Subtítulo: texto curto indicando produtos com preço promocional ativo.
- Ícone principal: opcional.
- Conteúdo: produtos que possuem preço promocional válido.

### Busca e filtros

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Buscar produto | Texto | Não | `Buscar produto` | Aceita termos parciais | Filtra produtos da loja sem recarregar a página |
| Categoria | Filtro/abas | Não | `Todos` | Categoria deve existir na loja | A categoria `Todos` deve listar todos os produtos disponíveis |
| Ordenação | Select ou menu | Não | `Ordenar` | Opções válidas do sistema | Pode conter A-Z, Z-A, menor preço e maior preço |
| Faixa de valor | Filtro | Não | Não definido | Valores monetários válidos | Usado quando o design comportar filtro por preço |

### Categorias

- Tipo: chips, abas horizontais ou botões arredondados.
- Categoria padrão: `Todos`.
- Exemplos visuais possíveis: `Todos`, `Bebidas`, `Lanches`, `Promoções`.
- As categorias reais devem vir do cadastro de categorias da loja.
- A categoria selecionada deve ter destaque visual em vermelho.

### Lista de produtos

- Tipo de container: grid de cards no desktop e lista/card vertical no mobile.
- Título: pode variar conforme filtro selecionado.
- Subtítulo: quantidade de produtos ou estado do filtro.
- Ícone principal: não se aplica.
- Conteúdo:
  - imagem do produto;
  - nome;
  - descrição curta, quando disponível;
  - preço em reais;
  - preço antigo riscado e preço promocional, quando aplicável;
  - disponibilidade;
  - botão de adicionar ao carrinho;
  - ação para abrir detalhes do produto.

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Compartilhar loja | Botão com ícone | Habilitado | Copia o link da loja e exibe feedback temporário |
| Copiar link | Botão com ícone | Habilitado | Copia o link público da loja |
| Editar | Botão secundário | Apenas para lojista autenticado | Leva para edição da loja ou vitrine |
| Carrinho | Botão ou ícone | Habilitado | Leva para o carrinho com produtos organizados por loja |
| Buscar | Campo interativo | Habilitado | Filtra produtos conforme texto digitado |
| Categoria | Aba ou botão de filtro | `Todos` ativo | Filtra produtos pela categoria selecionada |
| Adicionar | Botão primário no card do produto | Habilitado em produto disponível | Adiciona produto ao carrinho temporário da loja |
| Ver detalhes | Card clicável ou botão secundário | Habilitado | Abre tela ou modal de detalhes do produto |

### Links

| Link | Destino ou ação | Observação |
| --- | --- | --- |
| Voltar para lojas | Navega para listagem de lojas | Deve existir quando o consumidor veio da listagem |
| Compartilhar loja | Copia URL pública da loja | Deve seguir comportamento de feedback do `RF009` |
| Carrinho | Navega para carrinho | Carrinho deve preservar organização por loja |

## Estados da tela

**Estado inicial:**  
A tela carrega a identidade da loja, o card com informações vindas da pré-configuração, produtos em promoção quando existirem, filtros/categorias e listagem de produtos disponíveis.

**Estado de carregamento:**  
Exibir skeletons ou placeholders para banner, informações da loja, filtros e cards de produto. A estrutura principal não deve pular de forma brusca.

**Estado de erro:**  
Se a loja não existir, estiver inativa ou indisponível, exibir estado de loja não encontrada ou loja indisponível, com ação para voltar à Home ou à listagem de lojas.

**Estado de sucesso:**  
O consumidor consegue visualizar produtos e adicionar itens disponíveis ao carrinho temporário.

**Estado vazio:**  
Quando a loja não possuir produtos disponíveis, exibir mensagem clara informando que ainda não há produtos para pedido. Quando busca/filtro não tiver resultado, exibir estado vazio específico para o filtro aplicado.

## Validações

- A loja deve existir, estar ativa e estar disponível para acesso público.
- As informações de contato, funcionamento e endereço devem refletir os dados cadastrados na pré-configuração da loja.
- Não usar dados mockados ou exemplos da imagem como conteúdo final da loja.
- Slug inexistente, inválido ou removido deve resultar em estado de loja não encontrada.
- Loja inativa deve ser tratada como indisponível para o consumidor.
- Produtos removidos, indisponíveis para pedido ou sem condição de compra não devem aparecer como disponíveis para adicionar.
- A categoria `Todos` deve estar disponível como categoria padrão.
- Filtros devem ser aplicados sem recarregar a página.
- A listagem deve respeitar paginação de até 20 produtos por página.
- Preços exibidos devem ser formatados em reais, mas regras críticas de preço e disponibilidade devem ser validadas pelo backend no checkout.
- O carrinho temporário deve registrar snapshot de nome, preço e imagem no momento da adição.

## Comportamento esperado

1. O consumidor acessa a loja pela listagem ou por link direto com slug.
2. O sistema valida se a loja existe, está ativa e pode ser exibida publicamente.
3. O sistema exibe a identidade da loja e as informações públicas derivadas da pré-configuração.
4. O consumidor pode compartilhar o link da loja.
5. O consumidor pode pesquisar produtos pelo nome.
6. O consumidor pode filtrar produtos por categoria.
7. O consumidor pode ordenar ou refinar a listagem quando os filtros estiverem disponíveis.
8. O consumidor visualiza um produto ou adiciona o produto ao carrinho.
9. O sistema registra o item no carrinho temporário associado à loja de origem.
10. O consumidor pode acessar o carrinho para revisar os produtos daquela loja.

## Design

**Layout:**  
Tela pública, mobile-first e escrolável. Deve começar com header da plataforma, card principal da loja com banner, avatar/logo, nome, descrição, ações e informações empilhadas. Abaixo devem aparecer abas da vitrine, categorias, busca/filtros e lista de produtos. A ação de carrinho deve permanecer fácil de acessar.

**Cores principais:**  
Vermelho da marca para ações principais, ícones ativos e feedbacks. Branco para cards e áreas de conteúdo. Cinza claro para fundo e divisórias. Preto para títulos e textos principais.

**Tipografia:**  
Nome da loja em destaque. Descrição e informações de funcionamento em tamanho menor. Títulos de seção com peso forte. Cards de produto com nome legível, preço destacado e descrição curta.

**Espaçamentos:**  
Manter respiro entre cabeçalho da loja, filtros e produtos. Cards devem ter espaçamento suficiente para imagem, nome, preço e botão sem sobreposição.

**Componentes reutilizáveis:**  
`PublicStoreHeader`, `StoreHero`, `StoreAvatar`, `StoreInfoList`, `StoreInfoItem`, `ShareButton`, `CopyLinkButton`, `CartShortcut`, `StoreTabs`, `PromotionalProductSection`, `ProductSearch`, `CategoryTabs`, `ProductCard`, `ProductGrid`, `EmptyState`, `LoadingSkeleton`.

**Ícones:**  
Loja, localização, relógio, WhatsApp/telefone, e-mail, compartilhar, copiar link, carrinho, busca, filtro, categoria e adicionar.

**Imagens ou ilustrações:**  
A tela pode usar banner da loja, imagem de perfil da loja e imagens dos produtos. Quando uma imagem não existir ou falhar, usar fallback visual consistente.

## Responsividade

**Desktop:**  
Usar largura maior com grid de produtos em múltiplas colunas, filtros em linha ou área lateral leve, banner horizontal e informações da loja bem distribuídas.

**Mobile:**  
Mobile-first. Cabeçalho compacto, card da loja com informações empilhadas uma abaixo da outra, busca acessível, categorias em rolagem horizontal, cards de produto em lista vertical e botão de carrinho fácil de alcançar.

**Pontos de atenção:**  
Imagens não devem distorcer. Texto de produto não deve estourar o card. Categorias longas devem permitir rolagem ou quebra controlada. Botões de adicionar devem manter área de toque confortável. As informações de endereço e funcionamento podem ocupar mais de uma linha, mas não devem virar uma grade apertada no mobile.

## Acessibilidade

- Botões devem possuir texto claro ou descrição acessível.
- Ícones de compartilhar, carrinho e filtro não devem depender apenas do desenho.
- Cards de produto devem ter nome legível e preço associado.
- Feedback de link copiado deve ser perceptível para tecnologias assistivas.
- Estados de erro e vazio devem ter texto claro.
- O contraste entre texto, fundo e vermelho da marca deve ser suficiente.
- A navegação por teclado deve permitir acessar busca, filtros, produtos e carrinho.

## Observações

Esta tela representa a vitrine pública de uma loja específica, não a listagem geral de lojas. Ela deve ser acessível sem autenticação quando a loja estiver ativa.

A imagem de referência ajuda a definir a composição geral: header com marca, card de loja com banner, avatar, ações, informações da loja, abas, categorias, busca e lista de produtos. Porém, os dados textuais da imagem são exemplos. A vitrine real deve usar os dados coletados na pré-configuração da loja e os produtos/categorias cadastrados pelo lojista.

A tela ainda precisa de validação visual por wireframe final. Esta documentação define o comportamento, conteúdo e limites de escopo para orientar a criação do wireframe e futura spec de implementação.
