# Spec: store-categories

## Objetivo

Permitir que o lojista visualize e gerencie categorias existentes da sua loja em uma tela própria dentro da feature `store`, mantendo a criação de novas categorias exclusivamente no cadastro de produto.

## Fonte da Tela

- Screen: `../../docs/screens/screen-store-categories-0012.md`
- Flow: `merchant-flow`
- Posição no fluxo: gestão pós-onboarding da loja, acessada dentro da tela de loja/gestão, ao lado da área `Adicionar`.
- RFs/RNFs: `RF025`, `RF026`, `RF027`, `RF028`
- Use cases: `../../docs/requirements/use-cases/lojista/use-case-lojista-0003.md`
- User stories: `../../docs/requirements/user-stories/lojista/user-story-lojista-0003.md`
- Edge cases: `../../docs/requirements/edge-cases/edge-case-category-0008-gerenciamento-categorias.md`

## Escopo

- Criar uma tela visual/local para gerenciamento de categorias da loja.
- Integrar o acesso à tela dentro da área de loja/gestão.
- Representar a categoria `Todos` como card fixo, sistêmico e não removível.
- Permitir edição visual de nome de categoria.
- Exibir categorias em cards na ordem em que forem criadas.
- Exibir contador visual de produtos vinculados por categoria.
- Permitir clique visual no botão de remoção, sem remover de verdade nesta primeira versão.
- Deixar claro que categorias pertencem à loja e podem existir antes de produtos.
- Deixar claro que uma categoria pode classificar vários produtos.
- Deixar claro que um produto possui no máximo uma categoria específica além de aparecer em `Todos`.
- Registrar dependência de backend para listagem, edição, ordenação e remoção reais.

## Fora de Escopo

- Alterar backend, migrations, Supabase ou modelo de dados.
- Implementar endpoint real de categorias.
- Implementar persistência real.
- Implementar service ou mock service.
- Implementar drag-and-drop.
- Implementar reordenação por botões subir/descer ou input numérico.
- Remover categoria de verdade.
- Remover categoria com produtos vinculados.
- Alterar a regra da categoria `Todos`.
- Alterar o fluxo de cadastro de produto.
- Implementar associação real de produtos a categorias.
- Criar categoria pela tela de gerenciamento de categorias.

## Requisitos Funcionais

### RF-FE-001

Como lojista, quero visualizar as categorias da minha loja, para entender como meus produtos poderão ser organizados na vitrine.

Critérios de aceite:

- A tela deve exibir a categoria `Todos` como primeiro card fixo.
- A tela deve exibir categorias específicas criadas localmente pelo lojista.
- A tela deve indicar visualmente que `Todos` não pode ser removida.
- A tela deve indicar que categorias específicas podem existir mesmo sem produtos vinculados.
- A tela deve representar estado vazio quando não houver categorias específicas.

### RF-FE-002

Como lojista, quero que a criação de categorias fique concentrada no cadastro de produto, para evitar categorias criadas fora do contexto de associação a um produto.

Critérios de aceite:

- A tela de gerenciamento não deve exibir campo, formulário, botão, modal ou ação para criar categoria.
- A criação inline disponível no cadastro de produto deve permanecer funcional.
- Uma categoria criada no cadastro de produto deve ser disponibilizada para seleção e associação ao produto.

### RF-FE-003

Como lojista, quero editar visualmente o nome de uma categoria, para testar o fluxo futuro de correção e organização da vitrine.

Critérios de aceite:

- A tela deve representar ação de edição para categorias específicas.
- A categoria `Todos` não deve exibir ação de edição.
- A edição visual não deve persistir no backend.
- O comportamento real deve depender de contrato backend futuro.

### RF-FE-004

Como lojista, quero ver a ordem das categorias, para entender como elas aparecerão na vitrine.

Critérios de aceite:

- Categorias devem aparecer como cards na ordem de criação.
- A categoria `Todos` deve permanecer sempre como primeiro card.
- A lógica real de `sort_order` fica para etapa futura.
- Não deve haver drag-and-drop, setas de reordenação ou input de ordem nesta versão.

### RF-FE-005

Como lojista, quero visualizar a quantidade de produtos por categoria, para entender quais categorias já possuem produtos vinculados.

Critérios de aceite:

- Cada card deve exibir um contador visual de produtos.
- O contador pode usar valor local/mockado nesta primeira versão.
- `Todos` deve representar visualmente a quantidade geral de produtos.
- O contador real deve depender de backend futuro.

### RF-FE-006

Como lojista, quero visualizar a ação de remover categorias, para entender o comportamento futuro da gestão.

Critérios de aceite:

- Categorias específicas devem exibir ação de remoção.
- A categoria `Todos` não deve poder ser removida.
- O botão de remover pode ser clicável para testar hover/interação visual.
- Clicar em remover não deve executar remoção real nesta primeira versão.
- A regra real futura deve respeitar `RF026`: categoria com produtos vinculados não deve ser removida sem tratamento.

### RF-FE-007

Como sistema frontend, quero deixar o contrato de categorias separado do contrato de produto, para evitar acoplamento indevido entre criação de categoria e criação de produto.

Critérios de aceite:

- A spec deve tratar categoria como entidade própria da loja.
- A spec deve registrar que `products.category_id` é opcional.
- A spec deve registrar que uma categoria pode classificar vários produtos.
- A spec deve registrar que um produto pode ter no máximo uma categoria específica.
- A spec deve registrar que a categoria `Todos` é regra sistêmica da vitrine.

## Estados

- Inicial: tela carregada com `Todos` como card fixo e sem categorias específicas reais.
- Loading: não aplicável nesta primeira versão visual/local.
- Erro: não aplicável para backend nesta primeira versão; erros locais podem ser usados para nome vazio ou duplicado.
- Sucesso: categoria existente alterada ou removida conforme as regras vigentes.
- Vazio: nenhuma categoria específica criada; apenas `Todos` deve aparecer.

## Conteúdo da Tela

- Títulos:
  - `Categorias da loja`
- Campos:
  - Nome da categoria apenas durante a edição de uma categoria existente
- Botões:
  - Editar categoria
  - Remover categoria
  - Voltar para loja/gestão, se o layout atual exigir
- Links:
  - Não definido.
- Textos legais:
  - Não se aplica.

## Contexto de Jornada

- Entrada esperada: lojista autenticado acessa a área de gestão da loja e abre a área `Categorias` dentro da tela de loja.
- Próximo passo: categorias criadas futuramente poderão ser usadas na tela de adicionar/editar produto e na navegação da vitrine.
- O que esta tela não deve resolver: cadastro de produto, edição de produto, upload de imagem, checkout, carrinho, backend, persistência real, ordenação real ou associação real sem contrato aprovado.

## Ambiguidades Para Clarify

- Nenhuma ambiguidade bloqueante após `clarify.md`.

## Evolução aprovada: categorias reais

Em 13/07/2026, a tela foi autorizada a usar os endpoints existentes de categorias. A listagem,
edição e remoção deixam de ser apenas locais quando houver uma loja real e sessão válida.
O estado visual continua disponível somente para a storefront placeholder.

## Evolução aprovada: criação exclusiva no cadastro de produto

Em 14/07/2026, a criação de categorias foi removida da seção de gerenciamento. A tela deve
concentrar consulta, edição e remoção de categorias existentes. A ação de criar categoria permanece
exclusivamente no cadastro de produto, onde a nova categoria é persistida, selecionada e associada
ao produto em criação.
