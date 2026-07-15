# Tela de Categorias da Loja

## Identificação

**Nome da tela:**  
Categorias da loja

**Código da tela:**  
`SCREEN-STORE-012`

**Link ou referência visual:**  
Derivada da tela de loja (`screen-store-0010.md`), da tela de adicionar produto (`screen-store-add-product-0011.md`) e dos requisitos de criação, gerenciamento e associação de categorias.

**Status da tela:**  
Rascunho.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Jornada do lojista, gestão da loja, catálogo de produtos.

**Etapa do fluxo:**  
Tela acessada pelo lojista dentro da área de loja/gestão, ao lado da área de adicionar produtos.

**Tela anterior:**  
Tela de loja em contexto de gestão.

**Próxima tela esperada:**  
Retorno para produtos, adicionar produto ou permanência na gestão de categorias.

## Objetivo

**Descrição da tela:**  
Tela usada pelo lojista para visualizar e gerenciar categorias existentes da sua loja.

**Função principal:**  
Permitir que o lojista consulte, edite e remova categorias existentes. Novas categorias são criadas exclusivamente durante o cadastro de produto.

**Ator principal:**  
Lojista.

**Atores secundários:**  
Consumidor, pois futuramente verá essas categorias como filtros na vitrine pública.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF025`, `RF026`, `RF027`, `RF028`

**Requisitos não funcionais relacionados:**  
Responsividade, acessibilidade, isolamento por loja/tenant e consistência visual.

**Casos de uso relacionados:**  
`use-case-lojista-0003`

**Edge cases relacionados:**  
`edge-case-category-0008-gerenciamento-categorias`

## Conteúdo da tela

**Título principal:**  
`Categorias da loja`

**Subtítulo ou texto de apoio:**  
`Organize as categorias que serão usadas para agrupar os produtos da sua vitrine.`

**Mensagens auxiliares:**  
A tela deve deixar claro que `Todos` é uma categoria fixa/sistêmica e que categorias específicas podem existir antes de produtos serem vinculados.

## Elementos de interface

### Header

- Logo: usar a estrutura visual da tela de loja.
- Texto auxiliar: contexto de gestão da loja.
- Botão ou link de ação: não obrigatório nesta primeira versão se a tela estiver dentro das abas da loja.
- Ícones: categoria, adicionar, editar, remover e produto.

### Área principal

- Tipo de container: área de gestão dentro da feature `store`.
- Título: `Categorias da loja`.
- Subtítulo: texto curto explicando organização de categorias.
- Ícone principal: ícone de categoria/tag.
- Conteúdo: formulário de criação visual e lista de cards de categorias.

### Formulários

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Nome da categoria | Texto | Sim | `Ex: Bebidas` | Não pode estar vazio | Nome deve ser exibido em uppercase |

### Cards de categoria

| Card | Comportamento | Observação |
| --- | --- | --- |
| `Todos` | Card fixo, primeiro da lista, não removível | Representa a listagem geral da loja |
| Categoria específica | Card de categoria existente | Exibe a quantidade de produtos vinculados |

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Editar categoria | Botão de ação | Habilitado em categorias específicas | Permite testar edição visual/local |
| Remover categoria | Botão de ação | Clicável em categorias específicas | Apenas visual nesta versão, sem remoção real |

### Links

| Link | Destino ou ação | Observação |
| --- | --- | --- |
| Não definido | Não se aplica | A tela vive dentro da gestão da loja |

## Estados da tela

**Estado inicial:**  
Exibe o card fixo `Todos` e as categorias específicas já existentes, sem formulário ou ação de criação.

**Estado de carregamento:**  
Não se aplica nesta primeira versão visual/local.

**Estado de erro:**  
Pode exibir erro local para nome vazio ou duplicado, se a implementação optar por validar isso.

**Estado de sucesso:**  
Categoria aparece como card local após criação.

**Estado vazio:**  
Quando não houver categorias específicas, apenas `Todos` aparece.

## Validações

- Nome da categoria não deve estar vazio.
- Nome deve ser exibido em uppercase.
- `Todos` não pode ser editada nem removida.
- Categorias específicas podem existir sem produtos vinculados.
- Categoria pode classificar vários produtos.
- Produto pode ter no máximo uma categoria específica além de aparecer em `Todos`.

## Comportamento esperado

1. O lojista acessa a tela de loja em modo gestão.
2. O lojista abre a área `Categorias` para consultar, editar ou remover categorias existentes.
3. O sistema exibe `Todos` como primeiro card fixo e lista as categorias específicas existentes.
4. O lojista pode editar ou remover uma categoria específica pelas ações disponíveis.
5. Para criar uma categoria, o lojista utiliza a ação auxiliar disponível durante o cadastro de produto.
6. O sistema adiciona um card local com o nome em uppercase.
7. O lojista pode testar ações visuais de edição e remoção.
8. Nenhuma alteração é enviada ao backend nesta primeira versão.

## Design

**Layout:**  
Tela mobile-first dentro da gestão da loja. Deve usar formulário curto no topo e cards de categoria abaixo.

**Cores principais:**  
Vermelho da marca para ações principais e destaques. Verde suave pode ser usado para indicar estados positivos. Branco e cinzas claros para cards, bordas e áreas de apoio.

**Tipografia:**  
Título forte, subtítulo curto, labels claros e textos auxiliares menores.

**Espaçamentos:**  
Separar formulário, card `Todos` e lista de categorias com respiro suficiente para leitura em mobile.

**Componentes reutilizáveis:**  
`CategoryManagementPage`, `CategoryForm`, `CategoryCard`, `CategoryList`, `CategoryCounter`, `CategoryActions`.

**Ícones:**  
Categoria/tag, adicionar, editar, remover e produto.

**Imagens ou ilustrações:**  
Não se aplica.

## Responsividade

**Desktop:**  
Pode usar grid de cards em duas colunas ou largura confortável dentro da área de loja.

**Mobile:**  
Cards empilhados verticalmente, botões com área de toque confortável e formulário em coluna.

**Pontos de atenção:**  
Evitar cards largos demais, texto sobreposto e ações pequenas demais em mobile.

## Acessibilidade

- Botões devem ter texto ou `aria-label`.
- `Todos` não deve depender apenas de cor para indicar estado fixo.
- Contador de produtos deve ter texto compreensível.
- A ordem de foco deve seguir formulário, cards e ações.

## Observações

Esta primeira versão é visual/local. Ela existe para validar design e fluxo antes da integração com backend.

Categorias são entidades próprias da loja. Elas podem existir sem produtos vinculados.

O modelo atual permite que uma categoria classifique vários produtos, mas cada produto possui no máximo uma categoria específica via `products.category_id`.

A categoria `Todos` representa a listagem geral da loja e não deve ser tratada como categoria comum removível.

A lógica real de `sort_order`, persistência, edição, remoção e bloqueio de remoção com produtos vinculados deve ser conectada apenas quando o backend expuser contrato aprovado.
