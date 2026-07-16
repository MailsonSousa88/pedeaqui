# Spec: store-manage-products

## Objetivo

Criar a spec da tela/area `Gerenciar produtos` dentro da gestao da loja, permitindo que o lojista visualize produtos existentes, acesse a edicao, alterne disponibilidade e remova produtos por soft delete conforme as rotas ja documentadas pelo backend.

Esta feature pertence ao modulo `store` e deve evoluir a area ja existente em `src/features/store/product-management/`, mantendo o card `Adicionar novo produto` como modelo visual e adicionando um card equivalente `Gerenciar produtos` para operar produtos existentes.

## Fonte da Tela

- Screen: `../../docs/screens/screen-store-manage-products-0013.md`
- Flow: `merchant-flow`
- Posicao no fluxo: apos o lojista autenticado acessar a vitrine/gestao da loja e entrar na aba `Adicionar`; antes de editar, pausar, reativar ou remover produtos ja cadastrados.
- RFs/RNFs: `RF002`, `RF003`, `RF008`, `RF019`, `RF020`, `RF021`, `RF022`, `RF023`, `RF024`, `RF027`, `RF028`, `RF031`, `RF032`, `RNF0011`, `RNF0012`, `RNF0015`, `RNF0016`, `RNF0017`, `RNF0018`, `RNF0020`, `RNF0022`
- Use cases: `docs/requirements/use-cases/lojista/use-case-lojista-0003.md`
- User stories: `docs/requirements/user-stories/lojista/user-story-lojista-0002.md`
- Edge cases: `edge-case-category-0008-gerenciamento-categorias`, `edge-case-image-0009-upload-r2-banco`, `edge-case-subscription-0004-troca-plano-limite-produtos`
- Records usados como material extra:
  - `../../docs/records/frontend/01-comunicacao-com-backend.md`
  - `../../docs/records/backend/01-rotas-e-payloads.md`
  - `../../docs/records/backend/02-banco-de-dados.md`
  - `../../docs/records/backend/03-fluxos-principais.md`
  - `../../docs/records/backend/04-estrutura-do-codigo.md`

## Escopo

- Criar a especificacao da tela/area `Gerenciar produtos`.
- Manter a entrada pela aba `Adicionar` da storefront em contexto de lojista.
- Manter a origem de `storeId` plugavel e substituivel, pois as telas de criacao/gestao real da loja ainda nao estao conectadas.
- Exibir dois cards de gestao no mesmo padrao visual:
  - `Adicionar novo produto`, ja existente.
  - `Gerenciar produtos`, novo card para produtos existentes.
- Ao clicar em `Gerenciar produtos`, exibir uma area/listagem de produtos cadastrados da loja.
- Listar produtos por loja usando contrato de frontend alinhado a `GET /api/products/store/:storeId`, ate que exista rota administrativa protegida especifica.
- Exibir nome, descricao resumida, preco, preco promocional quando existir, categoria, disponibilidade e data de atualizacao quando disponivel.
- Permitir busca local por nome e filtros visuais por disponibilidade, promocao e categoria quando os dados estiverem carregados.
- Permitir abrir edicao de produto existente usando o mesmo modelo conceitual do cadastro, mas preenchido com os dados atuais do produto.
- Preparar payload parcial para atualizacao alinhado a `PUT /api/products/:id`, seguindo os records do backend mesmo que `RF020` mencione `PATCH`.
- Permitir alternar disponibilidade usando `PATCH /api/products/:id/toggle-availability`.
- Permitir remover produto com confirmacao, usando `DELETE /api/products/:id` e tratando como soft delete.
- Exibir estados de loading, erro, vazio, sucesso e conflito de regras.
- Registrar dependencias ainda nao prontas: imagens, variacoes e estoque controlado ainda nao possuem rotas completas documentadas no PR #14.

## Fora de Escopo

- Alterar `app/backend/`.
- Criar endpoints, controllers, use cases, repositories, migrations, Supabase, autenticacao ou webhooks.
- Implementar backend inexistente para imagens, variacoes ou estoque.
- Fixar um `storeId` real ou criar loja por conta propria.
- Resolver upload real de imagem para Cloudflare R2.
- Gerenciar variacoes por rotas reais, pois `product_variations` e `variation_options` ainda nao possuem endpoints documentados no PR #14.
- Resolver definitivamente estoque controlado, pois o schema documentado de `products` nao apresenta campos finais de estoque.
- Criar dashboard administrativo completo.
- Criar gestao de pedidos.
- Exibir a tela para consumidor publico.
- Remover produto sem confirmacao explicita do lojista.
- Remover categoria associada a produtos dentro desta tela.

## Requisitos Funcionais

### RF-FE-001

Como lojista, quero ver um card `Gerenciar produtos` ao lado do card `Adicionar novo produto`, para acessar rapidamente a administracao dos itens existentes.

Critérios de aceite:

- A area deve manter o card `Adicionar novo produto` ja existente.
- A area deve adicionar um card `Gerenciar produtos` com o mesmo modelo visual do card de adicionar.
- O card deve usar icone coerente de produtos/listagem/edicao.
- O card deve deixar claro que a acao gerencia produtos existentes.
- O card deve abrir a area de gerenciamento sem sair do contexto da loja.

### RF-FE-002

Como lojista, quero listar os produtos cadastrados da minha loja, para saber quais itens estao ativos, pausados ou em promocao.

Critérios de aceite:

- A listagem deve depender de `storeId`.
- A rota documentada como pronta para uso e `GET /api/products/store/:storeId`.
- A lista deve ignorar produtos com soft delete, conforme comportamento do backend.
- A tela deve respeitar paginacao de ate 20 itens por pagina quando o backend oferecer metadados.
- Cada item deve exibir, no minimo, nome, preco em reais e disponibilidade.
- Quando disponiveis, a tela deve exibir descricao, categoria, preco promocional e data de atualizacao.

### RF-FE-003

Como lojista, quero pesquisar e filtrar produtos existentes, para encontrar rapidamente o item que preciso alterar.

Critérios de aceite:

- A tela deve oferecer campo de busca por nome.
- A busca pode ser local sobre os produtos carregados nesta primeira versao, se a rota nao documentar query params.
- A tela deve prever filtros por disponibilidade, categoria e promocao.
- Filtros nao devem recarregar a pagina inteira.
- Quando nenhum item corresponder ao filtro, a tela deve exibir estado vazio especifico.

### RF-FE-004

Como lojista, quero editar dados de um produto existente, para manter a vitrine atualizada.

Critérios de aceite:

- A tela deve permitir abrir acao `Editar` em um produto existente.
- A edicao deve carregar os dados atuais do produto.
- O payload deve ser parcial e alinhado a `PUT /api/products/:id`.
- Campos nao alterados nao devem ser enviados como valores vazios.
- O payload pode conter `categoryId`, `name`, `description`, `priceCents`, `promoPriceCents`, `promoEndsAt` e `details` quando aplicavel.
- `priceCents` deve ser maior que zero.
- `promoPriceCents`, se enviado, deve ser maior que zero e menor que `priceCents`.
- `promoEndsAt` so deve ser enviado quando houver `promoPriceCents`.
- Se a categoria for alterada, a nova categoria deve existir na mesma loja e nao pode estar deletada.
- `details` nao deve ter edicao livre na UI nesta primeira implementacao; o frontend deve preservar valor existente ou usar apenas campos documentados/aprovados.

### RF-FE-005

Como lojista, quero pausar ou reativar a disponibilidade de um produto, para controlar se ele pode ser comprado sem remover o cadastro.

Critérios de aceite:

- A tela deve exibir estado atual de disponibilidade do produto.
- A acao deve chamar o contrato esperado `PATCH /api/products/:id/toggle-availability`.
- A rota nao exige body.
- O formulario de edicao pode exibir disponibilidade atual, mas nao deve salvar pausa/reativacao no payload de edicao.
- A UI deve atualizar o produto apos sucesso, por refetch ou atualizacao local consistente.
- Em erro, a UI deve restaurar o estado anterior ou informar que a acao nao foi concluida.
- Produto indisponivel nao deve ser apresentado como compravel na vitrine publica.

### RF-FE-006

Como lojista, quero remover um produto existente com confirmacao, para retirar itens que nao vendo mais da vitrine.

Critérios de aceite:

- A tela deve oferecer acao `Remover` para produto existente.
- Antes de remover, a tela deve solicitar confirmacao explicita.
- A confirmacao deve informar que a remocao retira o produto da vitrine publica.
- A acao deve chamar `DELETE /api/products/:id`.
- A remocao deve ser tratada como soft delete.
- Apos sucesso, o produto deve sair da listagem de gerenciamento.
- A tela deve tratar erro de permissao, produto inexistente ou falha de rede.

### RF-FE-007

Como sistema frontend, quero montar payloads de produto dentro do service da feature, para manter componentes sem conhecimento de endpoint ou formato de API.

Critérios de aceite:

- Componentes nao devem montar payload final de API.
- Hooks devem orquestrar estado e chamar services.
- Services em `src/features/store/product-management/services/` devem montar payloads especificos.
- O cliente generico deve ficar em `src/shared/services/api.ts` quando a fase de implementacao permitir.
- A tela deve enviar valores monetarios em centavos.
- A tela deve exibir valores monetarios em reais.
- A origem de `storeId` deve ficar isolada em camada substituivel para trocar quando a loja real estiver conectada.

### RF-FE-008

Como lojista, quero entender quando alguma capacidade ainda nao esta disponivel no backend, para nao acreditar que imagens, variacoes ou estoque foram persistidos quando nao foram.

Critérios de aceite:

- A spec deve registrar que `product_images` existe no schema, mas ainda nao tem rotas no PR #14.
- A spec deve registrar que `product_variations` e `variation_options` existem no schema, mas ainda nao tem rotas no PR #14.
- A spec deve registrar que estoque controlado existe nos requisitos, mas nao esta refletido de forma final no schema de `products` documentado nos records.
- A UI futura nao deve prometer persistencia real dessas partes ate que os contratos existam.
- Qualquer campo visual sem rota deve ser indicado no plano e nas tasks como dependencia externa.

### RF-FE-009

Como lojista, quero receber feedback claro de limite de plano, validacao e falha de permissao, para corrigir a acao ou entender por que ela foi bloqueada.

Critérios de aceite:

- Limite de produtos do plano deve ser tratado como regra server-side.
- Ao receber HTTP 403 por limite de plano, a tela deve exibir: `Voce atingiu o limite de produtos do seu plano. Remova produtos existentes ou revise seu plano antes de cadastrar novos itens.`
- Ao receber HTTP 422 por campos invalidos, a tela deve associar erros aos campos quando possivel.
- Ao receber erro de produto de outra loja/tenant, a tela deve exibir: `Nao foi possivel alterar este produto porque ele pertence a outra loja.`
- Ao receber erro de categoria invalida, a tela deve exibir: `Esta categoria nao atende aos criterios da loja. Selecione uma categoria valida para continuar.`
- Ao receber erro de categoria removida, a tela deve exibir: `Esta categoria nao pode mais ser utilizada porque foi removida. Escolha outra categoria.`
- Erros de rede devem permitir nova tentativa e exibir: `Nao foi possivel acessar o servidor agora. Verifique sua conexao e tente novamente.`

## Estados

- Inicial: area de gestao aberta na aba `Adicionar`, exibindo os cards `Adicionar novo produto` e `Gerenciar produtos`.
- Loading: skeleton ou estado de carregamento ao buscar produtos, categorias ou ao executar edicao, toggle e remocao.
- Erro: falha ao carregar produtos, falha de permissao, produto nao encontrado, categoria invalida, payload invalido, limite do plano ou falha de rede.
- Sucesso: produto atualizado, disponibilidade alternada ou produto removido da listagem.
- Vazio: loja sem produtos cadastrados; busca/filtro sem resultados; produto removido nao aparece mais.

## Conteúdo da Tela

- Títulos:
  - `Produtos da loja`
  - `Gerenciar produtos`
  - `Produtos cadastrados`
- Campos:
  - Buscar produto
  - Filtro de disponibilidade
  - Filtro de categoria
  - Filtro de promocao
  - Campos de edicao herdados do cadastro quando o produto for editado
- Botões:
  - Adicionar novo produto
  - Gerenciar produtos
  - Editar
  - Pausar
  - Reativar
  - Remover
  - Confirmar remocao
  - Cancelar
  - Salvar alteracoes
  - Tentar novamente
- Links:
  - Voltar para cards de gestao
  - Voltar para vitrine/gestao da loja
  - Gerenciar categorias, se o plano posterior confirmar integracao com categorias
- Textos legais:
  - Nao se aplica.

## Contexto de Jornada

- Entrada esperada: lojista autenticado acessa a gestao da loja, entra na aba `Adicionar` e escolhe o card `Gerenciar produtos`.
- Proximo passo: lojista edita, pausa, reativa ou remove produto; a vitrine publica reflete as alteracoes apos confirmacao do backend.
- O que esta tela nao deve resolver: criar backend, upload real de imagens, variacoes reais, estoque final, pedidos, checkout, carrinho ou dashboard completo.

## Contrato Backend Identificado

### Rotas prontas para uso conforme records

```txt
GET    /api/products/store/:storeId
POST   /api/products
PUT    /api/products/:id
PATCH  /api/products/:id/toggle-availability
DELETE /api/products/:id
```

### Payload de criacao documentado

```json
{
  "storeId": "uuid-da-loja",
  "categoryId": "uuid-da-categoria",
  "name": "X-Burger",
  "description": "Pao, carne, queijo e molho",
  "priceCents": 2990,
  "promoPriceCents": 2490,
  "promoEndsAt": "2026-07-31T23:59:59.000Z",
  "details": {
    "ingredients": ["pao", "carne", "queijo"]
  },
  "available": true
}
```

Obrigatorios: `storeId`, `categoryId`, `name`, `priceCents`.

### Payload parcial de edicao documentado

```json
{
  "categoryId": "uuid-da-nova-categoria",
  "name": "X-Burger Especial",
  "description": "Nova descricao",
  "priceCents": 3490,
  "promoPriceCents": 2990,
  "promoEndsAt": null,
  "details": {
    "spicy": false
  }
}
```

### Modelo de frontend esperado

```ts
type ManageProductListItem = {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  description?: string | null;
  priceCents: number;
  promoPriceCents?: number | null;
  promoEndsAt?: string | null;
  details?: Record<string, unknown> | null;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type UpdateProductPayload = Partial<{
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number;
  promoPriceCents: number | null;
  promoEndsAt: string | null;
  details: Record<string, unknown>;
}>;
```

## Ambiguidades Para Clarify

- Resolvidas em `clarify.md`.
- A fase `plan` deve registrar como pendencia tecnica a origem final de `storeId`.
- A fase `plan` deve registrar que a listagem administrativa podera trocar de endpoint caso o backend exponha uma rota protegida especifica.
- A fase `plan` deve registrar a divergencia entre `RF020` e records, adotando `PUT /api/products/:id` conforme backend atual.
