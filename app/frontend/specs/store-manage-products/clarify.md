# Clarify: store-manage-products

## Perguntas

### Q1

Pergunta:

Devemos criar um documento oficial de screen em `../../docs/screens/` para `Gerenciar produtos` antes do `plan`, ou esta feature pode seguir usando `screen-store-0010.md`, `screen-store-add-product-0011.md` e `docs/records/` como fontes aprovadas?

Resposta:

Sim. Deve existir uma screen oficial para `Gerenciar produtos` antes do `plan`. Foi criada a tela `../../docs/screens/screen-store-manage-products-0013.md` e o mapa `.specify/memory/screen-source-map.md` foi atualizado.

Impacto na spec:

A fase `plan` deve usar `../../docs/screens/screen-store-manage-products-0013.md` como fonte principal da tela, alem dos records e das telas relacionadas.

### Q2

Pergunta:

A aba atual `Adicionar` deve continuar sendo a entrada para os cards `Adicionar novo produto` e `Gerenciar produtos`, ou a aba deve ser renomeada para algo mais amplo, como `Produtos`?

Resposta:

Manter a aba como `Adicionar`. Dentro dela ficam os cards dedicados, incluindo o novo card `Gerenciar produtos`.

Impacto na spec:

A navegacao da storefront nao deve ser renomeada nesta feature. A implementacao deve adicionar o card `Gerenciar produtos` dentro da aba `Adicionar`.

### Q3

Pergunta:

Como a tela deve obter o `storeId` para listar e alterar produtos: estado ja carregado da storefront, parametro de rota, tenant/loja do usuario autenticado ou outro endpoint de loja atual?

Resposta:

Ainda nao ha origem definitiva confirmada para `storeId`. A solucao deve ficar plugavel: a tela/hook deve depender de uma entrada substituivel de `storeId`, sem fixar origem definitiva. Quando a conexao real da loja estiver pronta, deve ser necessario trocar apenas a camada de obtencao do `storeId` ou a integracao do container.

Impacto na spec:

O plano deve prever uma camada fina para resolver `storeId`, evitando acoplar a tela a dados mockados, rota especifica ou endpoint ainda nao conectado.

### Q4

Pergunta:

Para listar produtos no painel do lojista, devemos usar `GET /api/products/store/:storeId`, que os records marcam como rota publica, ou tratar essa listagem administrativa como dependencia de uma futura rota protegida?

Resposta:

Usar a rota certa conforme backend e boas praticas de protecao. Pelos records, `GET /api/products/store/:storeId` existe e esta marcada como publica; as acoes administrativas de criar, editar, alternar disponibilidade e remover sao protegidas. Como ainda nao ha loja criada/conectada pelas outras telas, a primeira implementacao deve preparar a integracao sem inventar origem de loja. Se surgir rota protegida especifica para listagem administrativa, ela deve substituir apenas o service/contrato.

Impacto na spec:

O plano deve separar listagem e acoes protegidas no service, registrar a dependencia de autenticacao para acoes administrativas e manter a listagem preparada para troca de endpoint se o backend expuser rota administrativa dedicada.

### Q5

Pergunta:

Na edicao de produto, deve prevalecer a rota documentada nos records (`PUT /api/products/:id` com payload parcial) ou o requisito `RF020`, que descreve semantica `PATCH`?

Resposta:

Deve prevalecer a rota documentada nos records do backend: `PUT /api/products/:id` com payload parcial. O requisito `RF020` deve ser corrigido futuramente, mas a feature deve seguir o contrato implementado. Antes do `plan`, os records confirmam que a rota atende ao objetivo de atualizar produto, validar pertencimento ao tenant, validar categoria da mesma loja e validar regras de preco/promocao.

Impacto na spec:

O contrato da feature deve usar `PUT /api/products/:id` e registrar a divergencia com `RF020` como observacao, nao como bloqueio.

### Q6

Pergunta:

A edicao deve reutilizar o modal/formulario de `Adicionar produto` preenchido com dados existentes ou deve abrir um modal proprio de `Editar produto`?

Resposta:

Reaproveitar o modal/formulario existente de `Adicionar produto` quando tecnicamente viavel, preenchendo com os dados atuais do produto. O fluxo deve ser: card `Gerenciar produtos` -> listagem de produtos da loja com busca e filtros -> clique no produto ou acao `Editar` -> modal reaproveitado para atualizar campos permitidos pelo backend.

Impacto na spec:

O plano deve prever reutilizacao controlada do formulario/modal, separando modo `create` e modo `edit` sem duplicar UI desnecessariamente.

### Q7

Pergunta:

Quais campos de `details` devem ser editaveis agora, considerando que o backend aceita JSON livre mas a UI nao deve inventar estrutura?

Resposta:

Nao expor edicao livre de `details` na primeira implementacao. A sugestao aprovada para seguir boas praticas e: preservar `details` existente quando vier do backend e usar apenas estruturas documentadas nos records como referencia. O exemplo atual (`ingredients` ou `spicy`) nao deve virar campo obrigatorio de UI sem aprovacao posterior.

Impacto na spec:

O formulario nao deve inventar campos para `details`. O service pode preservar valor existente se necessario, mas a UI deve focar nos campos explicitamente suportados.

### Q8

Pergunta:

Como devemos representar a categoria `Todos` no gerenciamento, ja que os requisitos dizem que ela e sistemica/implicita, mas os records indicam `categoryId` obrigatorio em `products` e informam que o backend cria uma categoria `Todos` ao criar loja?

Resposta:

A categoria `Todos` deve ser tratada como categoria imutavel e principal. Como o backend cria a categoria `Todos` ao criar loja e `products.category_id` e obrigatorio, o frontend deve seguir o backend: usar o `categoryId` real da categoria `Todos` quando o produto nao tiver categoria especifica, e impedir edicao/remocao de `Todos`.

Impacto na spec:

A spec deve deixar de tratar `Todos` como somente implicita no payload real. Visualmente ela continua fixa/sistemica; tecnicamente, se o backend exige `categoryId`, o frontend deve enviar o id real da categoria `Todos` ou da categoria especifica escolhida.

### Q9

Pergunta:

A disponibilidade deve ser alterada somente pela acao dedicada `PATCH /api/products/:id/toggle-availability`, ou tambem pode ser enviada dentro do payload de edicao?

Resposta:

Opcao A confirmada pelo usuario: alterar disponibilidade somente por acao separada na lista/card do produto, usando `PATCH /api/products/:id/toggle-availability`. O formulario de edicao pode exibir o estado atual, mas nao deve misturar pausa/reativacao com `Salvar alteracoes`.

Impacto na spec:

O plano deve criar uma acao separada de disponibilidade na listagem/card do produto, evitando duplicidade entre toggle e payload de edicao.

### Q10

Pergunta:

Quais mensagens finais devemos exibir para estes erros: limite de plano atingido, produto de outro tenant, categoria invalida/removida e falha de rede?

Resposta:

Mensagens aprovadas para orientar a implementacao:

- Limite de plano atingido: `Voce atingiu o limite de produtos do seu plano. Remova produtos existentes ou revise seu plano antes de cadastrar novos itens.`
- Produto de outra loja/tenant: `Nao foi possivel alterar este produto porque ele pertence a outra loja.`
- Categoria invalida: `Esta categoria nao atende aos criterios da loja. Selecione uma categoria valida para continuar.`
- Categoria removida: `Esta categoria nao pode mais ser utilizada porque foi removida. Escolha outra categoria.`
- Falha de rede: `Nao foi possivel acessar o servidor agora. Verifique sua conexao e tente novamente.`

Impacto na spec:

O plano deve usar essas mensagens como base de copy para estados de erro e mapeamento do service.

## Decisoes Registradas

- O escopo continua frontend-only; nao deve haver alteracao em `app/backend/`.
- A tela deve ficar no contexto de `src/features/store/product-management/` quando chegar a fase de implementacao.
- O card `Gerenciar produtos` deve seguir o mesmo modelo visual do card `Adicionar novo produto`.
- As rotas documentadas nos records como existentes sao:
  - `GET /api/products/store/:storeId`
  - `POST /api/products`
  - `PUT /api/products/:id`
  - `PATCH /api/products/:id/toggle-availability`
  - `DELETE /api/products/:id`
- `product_images` existe no schema, mas ainda nao tem rotas documentadas no PR #14.
- `product_variations` e `variation_options` existem no schema, mas ainda nao tem rotas documentadas no PR #14.
- Estoque controlado aparece nos requisitos, mas nao possui contrato final identificado nos records de `products`.
- Valores monetarios devem ser exibidos em reais na interface e enviados em centavos no contrato.
- Componentes nao devem montar payload final; hooks orquestram fluxo e services montam/chamam contratos da API.
- A screen oficial da feature e `../../docs/screens/screen-store-manage-products-0013.md`.
- A aba da storefront permanece `Adicionar`.
- O card `Gerenciar produtos` vive dentro da aba `Adicionar`.
- A origem de `storeId` deve ser plugavel e substituivel.
- A rota de edicao da feature deve seguir os records: `PUT /api/products/:id`.
- A listagem deve usar `GET /api/products/store/:storeId` enquanto nao houver rota administrativa protegida especifica.
- As acoes de criar, editar, alternar disponibilidade e remover devem respeitar protecao/autenticacao.
- O modal/formulario de produto deve ser reaproveitado para edicao quando tecnicamente viavel.
- `details` nao deve ter edicao livre nesta primeira implementacao.
- A categoria `Todos` e imutavel, principal e deve usar o id real criado pelo backend quando o backend exigir `categoryId`.
- Disponibilidade deve ser alterada pela rota dedicada `PATCH /api/products/:id/toggle-availability`, nao misturada no salvar edicao.

## Pendencias

- Confirmar durante `plan` quais arquivos de design system serao usados.
- Criar contrato frontend em `specs/store-manage-products/contracts/` na fase apropriada.
- Registrar no `plan` que a origem final de `storeId` depende da conexao das telas de criacao/gestao da loja.
- Registrar no `plan` que a listagem administrativa pode trocar de endpoint se o backend expuser rota protegida especifica.
