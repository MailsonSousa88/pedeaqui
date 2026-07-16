# Spec: store-add-product

## Objetivo

Criar a spec da tela de adição de produtos dentro da loja, permitindo que o lojista cadastre um produto para sua vitrine com dados básicos, categoria, imagens, disponibilidade, promoção e variações.

Esta feature pertence ao módulo `store` e deve ser implementada dentro de `src/features/store/`. A tela deve respeitar o fluxo de gestão do lojista e preparar o frontend para integração futura com backend, sem criar endpoints, migrations ou lógica backend.

## Fonte da Tela

- Screen: `../../docs/screens/screen-store-add-product-0011.md`
- Flow: `merchant-flow`
- Posição no fluxo: após o lojista acessar a vitrine/gestão da loja e escolher a ação `Adicionar`; antes do produto aparecer na vitrine pública ou na gestão de produtos.
- RFs/RNFs: `RF003`, `RF008`, `RF019`, `RF020`, `RF022`, `RF023`, `RF025`, `RF026`, `RF027`, `RF028`, `RF031`, `RF032`, `RNF0011`, `RNF0012`, `RNF0013`, `RNF0014`, `RNF0015`, `RNF0016`, `RNF0017`, `RNF0018`, `RNF0020`, `RNF0022`
- Use cases: `docs/requirements/use-cases/lojista/use-case-lojista-0003.md`
- User stories: pendente de confirmação na fase `clarify`, caso exista user story específica para gestão de produtos.
- Edge cases: `edge-case-category-0008-gerenciamento-categorias`, `edge-case-image-0009-upload-r2-banco`, `edge-case-subscription-0004-troca-plano-limite-produtos`

## Escopo

- Criar a spec executável da tela `Adicionar produto`.
- Posicionar a futura implementação dentro de `src/features/store/product-management/`.
- Representar a tela como parte da gestão da loja do lojista.
- Criar um fluxo visual em que o botão `Adicionar` da vitrine/gestão abre uma área com cards, incluindo o card `Adicionar novo produto`.
- Abrir o formulário de adicionar produto em um modal ao clicar no card `Adicionar novo produto`.
- Permitir cadastro visual/lógico de produto com nome, descrição, preço base e disponibilidade.
- Exibir a categoria `Todos` como padrão sistêmico, fixa, obrigatória e não removível.
- Permitir uma categoria específica opcional além de `Todos`.
- Prever ação auxiliar limitada/visual para criar categoria durante o cadastro, sem persistência real.
- Prever placeholders visuais de imagens do produto, com limite de 3 posições navegáveis.
- Prever promoção independente, sem campo de destaque.
- Prever variações do produto e opções de variação de forma elementar/visual, seguindo o modelo `product_variations` e `variation_options`.
- Preparar validações frontend para campos obrigatórios, valores monetários e variações.
- Preparar contrato esperado em fase posterior, sem implementar backend.

## Fora de Escopo

- Alterar `app/backend/`.
- Criar endpoints, controllers, use cases, repositories, migrations, Supabase, autenticação ou webhooks.
- Implementar contrato backend inexistente.
- Persistir produto real no banco nesta fase de spec.
- Implementar upload real para Cloudflare R2 nesta fase de spec.
- Implementar seleção real de arquivo ou preview local de imagem nesta primeira versão.
- Criar service mockado ou simular persistência real ao salvar produto.
- Implementar gestão completa de categorias fora do necessário para a tela.
- Implementar edição ou remoção de produto.
- Implementar vitrine pública completa, carrinho, checkout ou detalhes do produto.
- Permitir remover a categoria `Todos`.
- Permitir mais de uma categoria específica por produto.
- Inventar categorias, produtos ou imagens reais.

## Requisitos Funcionais

### RF-FE-001

Como lojista, quero acessar a tela de adicionar produto a partir da gestão da loja, para cadastrar um item novo na minha vitrine.

Critérios de aceite:

- A tela deve pertencer ao contexto da loja do lojista.
- A futura implementação deve ficar dentro de `src/features/store/product-management/`.
- A tela deve ser acessada a partir da vitrine em contexto de gestão, dashboard da loja ou área de gerenciamento de produtos.
- O botão `Adicionar` deve levar para uma área com cards de gestão.
- A área deve conter um card `Adicionar novo produto`.
- O card `Adicionar novo produto` deve abrir o modal do formulário.
- A tela deve permitir cancelar e retornar para a gestão da loja sem salvar.

### RF-FE-002

Como lojista, quero cadastrar os dados básicos do produto, para que ele possa ser exibido corretamente na vitrine.

Critérios de aceite:

- O formulário deve possuir campo obrigatório de nome do produto.
- O formulário deve possuir campo obrigatório de preço base.
- O preço deve ser digitado em reais na interface.
- O preço deve ser convertido para centavos no contrato esperado.
- A descrição deve ser opcional.
- O produto deve iniciar como disponível para venda, salvo escolha contrária do lojista.

### RF-FE-003

Como lojista, quero que todo produto pertença automaticamente à categoria `Todos`, para garantir que ele apareça na listagem geral da loja.

Critérios de aceite:

- A categoria `Todos` deve aparecer como categoria padrão.
- A categoria `Todos` não deve ser editável.
- A categoria `Todos` não deve ser removível.
- O formulário deve explicar que `Todos` é a categoria geral da loja.
- O payload/contrato não deve depender do usuário selecionar manualmente a categoria `Todos`.

### RF-FE-004

Como lojista, quero selecionar uma categoria específica opcional, para organizar melhor meus produtos na vitrine.

Critérios de aceite:

- A categoria específica deve ser opcional.
- O produto pode ter no máximo uma categoria específica além de `Todos`.
- A categoria específica deve existir na loja.
- Se nenhuma categoria específica for escolhida, o produto permanece apenas em `Todos`.
- O formulário não deve inventar categorias reais.

### RF-FE-005

Como lojista, quero adicionar imagem ao produto, para melhorar a apresentação visual da minha vitrine.

Critérios de aceite:

- A tela deve prever área de upload ou seleção de imagem.
- JPEG/PNG devem ser os formatos iniciais previstos.
- A tela deve prever preview ou placeholder visual.
- Produto sem imagem deve usar fallback visual consistente.
- Upload real, input de arquivo e Cloudflare R2 devem ficar fora desta primeira versão.
- A tela deve exibir até 3 placeholders de imagem navegáveis.
- A navegação entre placeholders deve permitir avançar e voltar entre posições 1, 2 e 3.

### RF-FE-006

Como lojista, quero configurar uma promoção, para oferecer um preço promocional na vitrine.

Critérios de aceite:

- A tela deve prever configuração de promoção.
- A configuração de promoção deve ser independente e habilitar diretamente seus campos.
- Preço promocional deve ser menor que o preço base.
- Preço promocional deve ser enviado em centavos no contrato esperado.
- Fim da promoção deve ser opcional nesta primeira versão.
- O formulário e o payload não devem possuir campo de destaque.

### RF-FE-008

Como lojista, quero adicionar variações ao produto, para oferecer escolhas como tamanho, sabor, cor ou ponto.

Critérios de aceite:

- A tela deve prever seção de variações do produto.
- A seção de variações será elementar/visual nesta primeira versão.
- Cada variação deve possuir um nome, como `Tamanho` ou `Sabor`.
- Cada variação deve permitir opções, como `Pequeno`, `Médio` ou `Grande`.
- Opções podem possuir acréscimo ou desconto no preço base.
- Acréscimos/descontos devem ser convertidos para centavos no contrato esperado.
- Variação sem opção válida não deve ser enviada.

### RF-FE-009

Como sistema frontend, quero preparar um contrato esperado para criação de produto, para facilitar a conexão futura com backend sem alterar a UI.

Critérios de aceite:

- O contrato esperado deve representar dados básicos, categoria específica, imagens, promoção e variações.
- O contrato deve deixar claro que `Todos` é implícita/sistêmica.
- O contrato deve registrar pendências de backend sem alterar backend.
- Services futuros devem ser criados apenas contra contrato frontend aprovado em `plan.md` e `tasks.md`.
- Nesta primeira versão, `Salvar produto` não deve chamar service real nem mock service.

## Estados

- Inicial: área de gestão aberta a partir de `Adicionar`, card `Adicionar novo produto` visível e modal fechado; ao abrir o modal, formulário vazio, produto disponível por padrão, categoria `Todos` fixa, nenhuma categoria específica selecionada, placeholders de imagem e nenhuma variação real persistida.
- Loading: usado futuramente ao carregar categorias, limites do plano ou salvar produto.
- Erro: erros de validação por campo, limite do plano atingido, categoria inválida, imagem inválida, preço inválido, falha de contrato ou falha de salvamento.
- Sucesso: não haverá sucesso de persistência nesta primeira versão. A tela deve apenas validar/representar visualmente o formulário sem comunicar cadastro real.
- Vazio: sem categorias específicas disponíveis; apenas `Todos` deve aparecer.

## Conteúdo da Tela

- Títulos:
  - `Adicionar produto`
- Campos:
  - Nome do produto
  - Descrição
  - Preço base
  - Disponível para venda
  - Categoria `Todos` fixa
  - Categoria específica opcional
  - Imagens do produto
  - Produto em promoção
  - Preço promocional
  - Fim da promoção
  - Nome da variação
  - Opções da variação
  - Acréscimo ou desconto por opção
- Botões:
  - Salvar produto
  - Cancelar
  - Adicionar imagem
  - Remover imagem
  - Adicionar variação
  - Remover variação
  - Adicionar opção
  - Remover opção
  - Criar categoria, se confirmado no `clarify`
- Links:
  - Voltar para vitrine/gestão da loja
  - Gerenciar categorias, se confirmado no `clarify`
- Textos legais:
  - Não se aplica.

## Contexto de Jornada

- Entrada esperada: lojista autenticado acessa a gestão da loja, clica em `Adicionar`, visualiza o card `Adicionar novo produto` e abre o modal do formulário.
- Próximo passo: produto salvo deve aparecer na gestão da loja e futuramente na vitrine pública conforme disponibilidade, categoria, promoção e regras do plano.
- O que esta tela não deve resolver: backend, upload real, CRUD completo de categorias, edição de produto, remoção de produto, carrinho, checkout ou vitrine pública completa.

## Ambiguidades Para Clarify

- Nenhuma ambiguidade bloqueante após `clarify.md`.

## Evolução aprovada: persistência real

Em 13/07/2026, o fluxo foi autorizado a evoluir da simulação visual para a integração real já
disponível no backend.

- O formulário deve listar categorias reais da loja por `GET /api/categories/store/:storeId`.
- O lojista pode criar uma categoria real por `POST /api/categories` antes de selecionar a categoria do produto.
- `Salvar produto` deve validar o formulário e criar o produto por `POST /api/products`.
- Após sucesso, o produto deve entrar imediatamente na coleção exibida no gerenciamento.
- Imagens e variações continuam fora desta evolução até seus fluxos específicos serem conectados.
