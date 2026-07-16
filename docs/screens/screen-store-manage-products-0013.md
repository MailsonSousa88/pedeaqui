# Tela de Gerenciar Produtos

## Identificacao

**Nome da tela:**

Gerenciar produtos da loja

**Codigo da tela:**

`SCREEN-STORE-013`

**Link ou referencia visual:**

Derivada da tela de loja (`screen-store-0010.md`), da tela de adicionar produto (`screen-store-add-product-0011.md`), da tela de categorias (`screen-store-categories-0012.md`) e dos records de backend sobre produtos, rotas e payloads.

**Status da tela:**

Rascunho.

## Contexto no fluxo

**Fluxo ao qual pertence:**

Jornada do lojista, gestao da loja, catalogo de produtos.

**Etapa do fluxo:**

Tela acessada pelo lojista dentro da area de loja/gestao, a partir da aba `Adicionar`, por meio do card `Gerenciar produtos`.

**Tela anterior:**

Tela de loja em contexto de gestao, com a aba `Adicionar` aberta.

**Proxima tela esperada:**

Listagem de produtos gerenciaveis, modal de edicao de produto, confirmacao de remocao, ou retorno para os cards de gestao.

## Objetivo

**Descricao da tela:**

Tela usada pelo lojista para visualizar produtos ja cadastrados, pesquisar itens, filtrar por categoria/disponibilidade/promocao, editar informacoes permitidas pelo backend, pausar ou reativar disponibilidade e remover produtos por soft delete.

**Funcao principal:**

Permitir que o lojista mantenha produtos existentes atualizados sem sair do contexto da loja.

**Ator principal:**

Lojista.

**Atores secundarios:**

Consumidor, pois a vitrine publica reflete as alteracoes feitas pelo lojista.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**

`RF002`, `RF003`, `RF008`, `RF019`, `RF020`, `RF021`, `RF022`, `RF023`, `RF024`, `RF027`, `RF028`, `RF031`, `RF032`

**Requisitos nao funcionais relacionados:**

`RNF0011`, `RNF0012`, `RNF0015`, `RNF0016`, `RNF0017`, `RNF0018`, `RNF0020`, `RNF0022`

**Casos de uso relacionados:**

`use-case-lojista-0003`

**Edge cases relacionados:**

`edge-case-category-0008-gerenciamento-categorias`, `edge-case-image-0009-upload-r2-banco`, `edge-case-subscription-0004-troca-plano-limite-produtos`

## Conteudo da tela

**Titulo principal:**

`Gerenciar produtos`

**Subtitulo ou texto de apoio:**

`Encontre, edite, pause ou remova produtos cadastrados na sua vitrine.`

**Mensagens auxiliares:**

A tela deve explicar estados de limite de plano, categoria invalida/removida, falha de permissao e falha de rede sem prometer persistencia de imagens, variacoes ou estoque quando o backend ainda nao possuir rotas finais para essas capacidades.

## Elementos de interface

### Header

- Logo: usar a estrutura visual da tela de loja.
- Texto auxiliar: contexto de gestao da loja.
- Botao ou link de acao: voltar para os cards de gestao ou para a vitrine.
- Icones: produto, busca, categoria, editar, pausar/reativar e remover.

### Area de entrada por cards

- Tipo de container: area de gestao dentro da aba `Adicionar`.
- Titulo: `Produtos da loja`.
- Subtitulo: texto curto sobre cadastro e manutencao do catalogo.
- Icone principal: produto/listagem.
- Conteudo:
  - card `Adicionar novo produto`, ja existente;
  - card `Gerenciar produtos`, novo card dedicado a produtos existentes.

### Area principal de gerenciamento

- Tipo de container: listagem dentro da feature `store`.
- Titulo: `Gerenciar produtos`.
- Subtitulo: orientacao curta para localizar e atualizar produtos.
- Icone principal: pacote/listagem.
- Conteudo:
  - barra de pesquisa por nome;
  - filtros por categoria, disponibilidade e promocao;
  - lista/cards dos produtos cadastrados;
  - acoes de editar, pausar/reativar e remover.

### Formulario de edicao

O formulario de edicao deve reaproveitar o modal/formulario visual de adicionar produto quando tecnicamente viavel, preenchendo os dados atuais do produto e limitando os campos ao que o backend permite persistir.

| Campo | Tipo | Obrigatorio | Placeholder | Validacao | Observacao |
| --- | --- | --- | --- | --- | --- |
| Nome do produto | Texto | Sim | `Ex: X-Burguer artesanal` | Nao pode estar vazio | Enviado como `name` |
| Descricao | Texto longo | Nao | `Descreva ingredientes, detalhes ou caracteristicas` | Limite visual definido pela UI | Enviado como `description` |
| Preco base | Moeda BRL | Sim | `R$ 0,00` | Maior que zero | Exibido em reais e enviado em centavos como `priceCents` |
| Categoria | Select/combobox | Sim | `Selecionar categoria` | Deve pertencer a mesma loja e nao estar removida | Enviado como `categoryId` |
| Preco promocional | Moeda BRL | Nao | `R$ 0,00` | Maior que zero e menor que preco base | Enviado como `promoPriceCents` |
| Fim da promocao | Data/hora | Condicional | `Selecionar data` | So pode existir com preco promocional | Enviado como `promoEndsAt` |
| Details | Estrutura controlada ou preservada | Nao | Nao se aplica | Nao inventar JSON livre na UI | Nesta tela, usar apenas campos documentados ou preservar valor existente |

### Botões e ações

| Elemento | Tipo | Estado inicial | Acao esperada |
| --- | --- | --- | --- |
| Gerenciar produtos | Card/botao | Habilitado | Abre a listagem de produtos existentes |
| Buscar produto | Campo de texto | Habilitado | Filtra produtos por termo parcial |
| Filtro de categoria | Select/chips | Habilitado quando houver categorias | Filtra produtos por categoria |
| Filtro de disponibilidade | Select/chips | Habilitado | Filtra por disponivel ou pausado |
| Filtro de promocao | Select/chips | Habilitado | Filtra produtos com promocao |
| Editar | Botao secundario | Habilitado por produto | Abre o modal de edicao preenchido |
| Salvar alteracoes | Botao primario | Habilitado apos validacoes | Envia payload parcial para atualizacao |
| Pausar | Botao de estado | Produto disponivel | Chama toggle de disponibilidade |
| Reativar | Botao de estado | Produto pausado | Chama toggle de disponibilidade |
| Remover | Botao destrutivo | Habilitado por produto | Abre confirmacao de soft delete |
| Confirmar remocao | Botao destrutivo | Habilitado no modal de confirmacao | Remove o produto da vitrine via soft delete |
| Cancelar | Botao secundario | Habilitado | Fecha modal sem salvar |

### Links

| Link | Destino ou acao | Observacao |
| --- | --- | --- |
| Voltar para gestao | Retorna aos cards `Adicionar novo produto` e `Gerenciar produtos` | Mantem contexto da aba `Adicionar` |
| Gerenciar categorias | Abre a area `Categorias`, se disponivel | Opcional, usado para ajustar categorias antes de editar produto |

## Estados da tela

**Estado inicial:**

A aba `Adicionar` exibe os cards `Adicionar novo produto` e `Gerenciar produtos`. Ao clicar em `Gerenciar produtos`, a tela carrega a lista de produtos da loja.

**Estado de carregamento:**

Exibir skeletons ou placeholders para barra de busca, filtros e produtos enquanto a lista ou a acao solicitada esta em andamento.

**Estado de erro:**

Exibir erros claros para falha ao carregar produtos, produto de outra loja/tenant, categoria invalida, categoria removida, limite de plano atingido, falha de validacao e falha de rede.

**Estado de sucesso:**

Produto atualizado, disponibilidade alternada ou produto removido da listagem apos confirmacao do backend.

**Estado vazio:**

Quando a loja ainda nao possuir produtos, orientar o lojista a usar `Adicionar novo produto`. Quando busca/filtro nao retornar resultados, exibir mensagem especifica para limpar filtros ou procurar outro termo.

## Validacoes

- Produto deve pertencer a loja/tenant correto.
- `storeId` deve ser recebido por uma camada substituivel, ate a origem definitiva da loja autenticada estar conectada.
- Nome do produto e obrigatorio.
- Preco base deve ser maior que zero.
- Preco promocional deve ser maior que zero e menor que o preco base.
- `promoEndsAt` so deve ser enviado quando houver `promoPriceCents`.
- Categoria deve existir, pertencer a mesma loja e nao estar removida.
- Categoria `Todos` e fixa, imutavel e deve sempre representar a listagem geral.
- Disponibilidade deve ser alterada pela rota dedicada de toggle, evitando misturar pausa/reativacao com salvamento de edicao.
- Remocao deve exigir confirmacao e usar soft delete.
- Imagens, variacoes e estoque nao devem prometer persistencia real enquanto nao houver contrato backend final.

## Comportamento esperado

1. O lojista acessa a tela de loja em modo gestao.
2. O lojista abre a aba `Adicionar`.
3. O sistema exibe os cards `Adicionar novo produto` e `Gerenciar produtos`.
4. O lojista clica em `Gerenciar produtos`.
5. O sistema carrega produtos da loja conforme `storeId` disponivel.
6. O lojista pesquisa ou filtra produtos.
7. O lojista escolhe editar um produto.
8. O sistema abre o modal reaproveitado de produto, preenchido com dados atuais.
9. O lojista salva alteracoes permitidas pelo backend.
10. O sistema envia payload parcial para a rota de edicao documentada.
11. O lojista pode pausar ou reativar um produto por acao dedicada.
12. O lojista pode remover um produto apos confirmacao.
13. A vitrine publica passa a refletir os dados retornados pelo backend.

## Design

**Layout:**

Tela mobile-first dentro da gestao da loja. A entrada deve usar cards de acao no mesmo padrao visual do card `Adicionar novo produto`. A listagem deve priorizar leitura rapida, com busca e filtros antes dos produtos.

**Cores principais:**

Vermelho da marca para acao principal e estados ativos. Branco para cards e modais. Cinzas para fundo, bordas e textos auxiliares. Preto para titulos e labels. Estados destrutivos devem usar vermelho com texto claro e confirmacao explicita.

**Tipografia:**

Titulo forte para a area de gerenciamento, subtitulo curto, nomes de produto legiveis, preco em destaque e textos auxiliares menores.

**Espacamentos:**

Separar cards de entrada, filtros, listagem e acoes por produto com respiro suficiente para mobile.

**Componentes reutilizaveis:**

`ManageProductsCard`, `ManageProductsPanel`, `ProductManagementSearch`, `ProductManagementFilters`, `ManagedProductList`, `ManagedProductCard`, `ProductEditModal`, `ProductDeleteConfirmation`, `ProductAvailabilityAction`.

**Icones:**

Produto/listagem, busca, categoria, editar, pausar/reativar, remover, voltar e alerta.

**Imagens ou ilustracoes:**

Pode exibir placeholder de produto quando imagem nao existir. Imagens reais dependem de contrato futuro de `product_images`.

## Responsividade

**Desktop:**

Pode exibir cards de entrada em grid e produtos em lista ou grid de duas colunas, mantendo acoes visiveis sem comprimir texto.

**Mobile:**

Cards e produtos empilhados, filtros em rolagem horizontal ou selects compactos, botoes com area de toque confortavel e modais com scroll interno.

**Pontos de atencao:**

Evitar texto de produto estourando card, acoes destrutivas proximas demais de acoes comuns, filtros que escondem o conteudo e modais altos sem rolagem.

## Acessibilidade

- Campo de busca deve possuir label ou `aria-label` claro.
- Botoes de editar, pausar/reativar e remover devem ter texto ou descricao acessivel.
- Estados de disponibilidade nao devem depender apenas de cor.
- Confirmacao de remocao deve deixar claro o efeito da acao.
- Erros devem ser textuais e associados ao campo quando aplicavel.
- Ordem de foco deve seguir busca, filtros, produtos e acoes.

## Observacoes

As rotas documentadas nos records indicam que criacao, edicao, toggle de disponibilidade e remocao de produto existem no backend. A listagem disponivel nos records e `GET /api/products/store/:storeId`, marcada como publica. Caso o backend crie uma rota protegida especifica para painel administrativo, o frontend deve trocar apenas o service/contrato da feature.

Como outras telas de criacao da loja ainda nao estao conectadas, a origem definitiva de `storeId` deve permanecer plugavel no frontend. A tela nao deve fixar um `storeId` real nem criar loja por conta propria.

O requisito `RF020` menciona semantica `PATCH`, mas os records do backend documentam `PUT /api/products/:id` com payload parcial. Enquanto o requisito oficial nao for corrigido, a tela deve seguir a rota implementada e registrar a divergencia na spec.

`details` deve ser tratado com cautela: o backend aceita JSON, mas a UI nao deve expor edicao livre sem campos aprovados. Na primeira versao, usar somente campos documentados ou preservar o valor existente.
