# Tela de Adicionar Produto

## Identificação

**Nome da tela:**  
Adicionar produto à loja

**Código da tela:**  
`SCREEN-STORE-011`

**Link ou referência visual:**  
Derivada da tela de loja (`screen-store-0010.md`) e dos requisitos de gestão de produtos, categorias, imagens, promoções e variações.

**Status da tela:**  
Rascunho.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Jornada do lojista, gestão da loja, catálogo de produtos.

**Etapa do fluxo:**  
Tela ou modal acessado quando o lojista, autenticado e com loja ativa, escolhe adicionar um novo produto à vitrine.

**Tela anterior:**  
Vitrine da loja em contexto de gestão, dashboard da loja ou área de gerenciamento de produtos.

**Próxima tela esperada:**  
Retorno para a vitrine/gestão da loja com o novo produto listado, ou permanência na tela exibindo erro de validação.

## Objetivo

**Descrição da tela:**  
Tela usada pelo lojista para cadastrar um produto no catálogo da sua loja, informando dados comerciais, categoria específica opcional, imagens, disponibilidade, promoção e variações do produto.

**Função principal:**  
Permitir que o lojista cadastre um produto válido, vinculado à sua loja, pronto para aparecer na vitrine pública conforme disponibilidade, categoria e regras do plano.

**Ator principal:**  
Lojista.

**Atores secundários:**  
Consumidor, pois visualizará o produto cadastrado na vitrine pública.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF003`, `RF008`, `RF019`, `RF020`, `RF022`, `RF023`, `RF025`, `RF026`, `RF027`, `RF028`, `RF031`, `RF032`

**Requisitos não funcionais relacionados:**  
`RNF0011`, `RNF0012`, `RNF0013`, `RNF0014`, `RNF0015`, `RNF0016`, `RNF0017`, `RNF0018`, `RNF0020`, `RNF0022`

**Casos de uso relacionados:**  
`use-case-lojista-0003`

**Edge cases relacionados:**  
`edge-case-category-0008-gerenciamento-categorias`, `edge-case-image-0009-upload-r2-banco`, `edge-case-subscription-0004-troca-plano-limite-produtos`

## Conteúdo da tela

**Título principal:**  
`Adicionar produto`

**Subtítulo ou texto de apoio:**  
`Preencha as informações do produto que será exibido na sua vitrine.`

**Mensagens auxiliares:**  
Textos de apoio devem explicar que preço é informado em reais, que a categoria específica é opcional, que o produto sempre pertence à categoria `Todos` e que imagens, variações e promoção podem ser configuradas conforme necessidade.

## Elementos de interface

### Header

- Logo: `PedeAqui`, usando a imagem oficial da marca.
- Texto auxiliar: nome da loja ou indicação de gestão da vitrine.
- Botão ou link de ação: voltar para a vitrine/gestão da loja.
- Ícones: voltar, produto, imagem, categoria, variação e salvar.

### Área principal

- Tipo de container: formulário em card ou página de gestão dentro da feature `store`.
- Título: `Adicionar produto`.
- Subtítulo: orientação curta sobre cadastro.
- Ícone principal: ícone de produto, sacola ou caixa.
- Conteúdo: formulário dividido em seções para dados básicos, categoria, imagens, preço/promoção e variações.

### Formulários

#### Dados básicos do produto

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Nome do produto | Texto | Sim | `Ex: X-Burguer artesanal` | Não pode estar vazio | Nome comercial exibido na vitrine |
| Descrição | Texto longo | Não | `Descreva os ingredientes, detalhes ou características` | Limite visual definido pela UI | Usada como descrição curta ou ficha do produto |
| Preço base | Moeda BRL | Sim | `R$ 0,00` | Deve ser maior que zero | Frontend exibe em reais e envia em centavos |
| Disponível para venda | Toggle | Não | Não se aplica | Booleano | Deve iniciar como `true`, salvo escolha contrária do lojista |

#### Categoria

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Categoria padrão | Badge fixo | Sim | `Todos` | Não pode ser removida | Todo produto pertence automaticamente a `Todos` |
| Categoria específica | Select ou combobox | Não | `Selecionar categoria` | Deve existir na loja | Produto pode ter no máximo uma categoria específica além de `Todos` |
| Criar nova categoria | Ação auxiliar | Não | `Nova categoria` | Nome obrigatório se usada | Atalho de UX; tecnicamente cria categoria antes de associar ao produto |

**Regra da categoria `Todos`:**  
A categoria `Todos` é sistêmica, obrigatória e não removível. Ela não deve ser apresentada como uma categoria editável. O produto sempre deve aparecer em `Todos`, mesmo quando possuir uma categoria específica adicional.

#### Imagens

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Imagens do produto | Upload | Não | `Adicionar imagem` | JPEG/PNG inicialmente | Imagens devem ser armazenadas como `product_images` quando integração estiver pronta |
| Ordem das imagens | Ordenação visual | Não | Não se aplica | Ordem numérica | Mapeia para `sort_order` |

**Estado sem imagem:**  
Quando o produto não possuir imagem ou a imagem falhar, a vitrine deve usar fallback visual consistente, sem quebrar o card.

#### Promoção

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Produto em promoção | Toggle | Não | Não se aplica | Booleano | Habilita os campos de promoção |
| Preço promocional | Moeda BRL | Condicional | `R$ 0,00` | Deve ser maior que zero e menor que o preço base | Enviar como `promo_price_cents` |
| Fim da promoção | Data/hora | Condicional | `Selecionar data` | Deve ser data futura quando exigida | Enviar como `promo_ends_at` |

**Regra de promoção:**  
Produto em promoção deve possuir preço promocional válido. O preço promocional não pode ser maior ou igual ao preço base.

#### Variações do produto

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Nome da variação | Texto | Não | `Ex: Tamanho` | Obrigatório quando uma variação for adicionada | Mapeia para `product_variations.label` |
| Opção da variação | Texto | Condicional | `Ex: Grande` | Obrigatório dentro de uma variação | Mapeia para `variation_options.value` |
| Acréscimo ou desconto | Moeda BRL | Não | `R$ 0,00` | Pode ser zero, positivo ou negativo conforme limite do backend | Mapeia para `price_modifier_cents` |
| Ordem da variação | Ordenação visual | Não | Não se aplica | Ordem numérica | Mapeia para `product_variations.sort_order` |
| Ordem da opção | Ordenação visual | Não | Não se aplica | Ordem numérica | Mapeia para `variation_options.sort_order` |

**Conceito de variação:**  
Variação é um grupo de escolha do produto, como `Tamanho`, `Cor`, `Sabor`, `Borda` ou `Ponto da carne`.

**Conceito de opção:**  
Opção é cada escolha dentro de uma variação, como `Pequeno`, `Médio`, `Grande`, `Preto`, `Branco`, `Calabresa` ou `Bem passado`.

**Regra de preço da opção:**  
Cada opção pode modificar o preço base do produto por meio de `price_modifier_cents`. O preço final da escolha deve considerar o preço base do produto somado aos modificadores selecionados.

**Exemplo estrutural:**

```ts
variations: [
  {
    label: "Tamanho",
    options: [
      { value: "Pequeno", priceModifierCents: 0 },
      { value: "Médio", priceModifierCents: 500 },
      { value: "Grande", priceModifierCents: 1000 }
    ]
  }
]
```

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Salvar produto | Botão primário | Habilitado após validações mínimas | Cria o produto e retorna para a gestão da loja |
| Cancelar | Botão secundário | Habilitado | Retorna sem salvar |
| Adicionar imagem | Botão/área de upload | Habilitado | Seleciona imagem do produto |
| Remover imagem | Botão com ícone | Habilitado quando houver imagem | Remove imagem da lista antes de salvar |
| Adicionar variação | Botão secundário | Habilitado | Cria um bloco de variação |
| Remover variação | Botão com ícone | Habilitado quando houver variação | Remove a variação e suas opções antes de salvar |
| Adicionar opção | Botão secundário | Habilitado dentro de uma variação | Adiciona uma opção selecionável |
| Remover opção | Botão com ícone | Habilitado quando houver opção | Remove a opção antes de salvar |
| Criar categoria | Botão auxiliar | Habilitado quando UX permitir | Cria categoria da loja e associa ao produto se selecionada |

### Links

| Link | Destino ou ação | Observação |
| --- | --- | --- |
| Voltar para vitrine | Retorna para a tela de loja em modo gestão | Deve preservar o contexto da loja |
| Gerenciar categorias | Abre fluxo de categorias | Opcional, pode ser substituído por criação inline |

## Estados da tela

**Estado inicial:**  
Formulário vazio, com `Disponível para venda` ativado, categoria `Todos` exibida como fixa e nenhuma categoria específica selecionada.

**Estado de carregamento:**  
Exibir estado de carregamento ao buscar categorias da loja, limites do plano ou dados necessários para montar o formulário.

**Estado de erro:**  
Exibir erros de validação por campo e erros gerais quando o produto não puder ser salvo, como limite do plano atingido, categoria inválida, preço inválido ou falha no upload de imagem.

**Estado de sucesso:**  
Produto cadastrado com sucesso. O sistema retorna para a vitrine/gestão da loja ou exibe confirmação com opção de cadastrar outro produto.

**Estado vazio:**  
Se não houver categorias específicas criadas, manter apenas `Todos` como categoria padrão e explicar que a categoria específica é opcional.

## Validações

- Nome do produto é obrigatório.
- Preço base é obrigatório e deve ser maior que zero.
- Preço deve ser digitado em reais no frontend e enviado em centavos.
- Descrição é opcional.
- Produto deve iniciar disponível por padrão, salvo escolha contrária do lojista.
- Categoria `Todos` deve estar sempre presente e não pode ser removida.
- Categoria específica é opcional e deve existir na loja.
- Produto pode ter no máximo uma categoria específica além de `Todos`.
- Categoria criada inline deve virar uma categoria real da loja antes de ser associada ao produto.
- Imagens devem respeitar formatos aceitos inicialmente: JPEG/PNG.
- Produto em promoção deve ter preço promocional válido.
- Preço promocional deve ser menor que o preço base.
- Variação sem opção válida não deve ser enviada.
- Opção de variação deve ter valor textual.
- Modificador de preço da opção deve ser convertido para centavos.
- O sistema deve bloquear cadastro quando o limite de produtos do plano for atingido.

## Comportamento esperado

1. O lojista acessa a área de loja ou gestão de produtos.
2. O lojista escolhe a ação `Adicionar`.
3. O sistema abre a tela ou modal de cadastro de produto.
4. O sistema exibe a categoria `Todos` como padrão obrigatória.
5. O lojista preenche nome, preço e demais dados opcionais.
6. O lojista pode selecionar uma categoria específica existente ou criar uma categoria por atalho, se a UX permitir.
7. O lojista pode adicionar imagens do produto.
8. O lojista pode definir disponibilidade e promoção.
9. O lojista pode adicionar variações e opções, como tamanho e sabor.
10. O sistema valida os campos.
11. O sistema prepara o payload de criação do produto.
12. O produto é salvo quando o backend estiver integrado.
13. O lojista retorna para a vitrine/gestão da loja com o produto disponível conforme regras de visibilidade.

## Contrato esperado para frontend

### Modelo conceitual do formulário

```ts
type ProductFormValues = {
  name: string;
  description?: string;
  priceCents: number;
  categoryId?: string | null;
  available: boolean;
  promoPriceCents?: number;
  promoEndsAt?: string;
  images?: File[];
  variations?: ProductVariationInput[];
};

type ProductVariationInput = {
  label: string;
  sortOrder?: number;
  options: ProductVariationOptionInput[];
};

type ProductVariationOptionInput = {
  value: string;
  priceModifierCents?: number;
  sortOrder?: number;
};
```

### Observações de contrato

- `categoryId` representa apenas a categoria específica. A categoria `Todos` é implícita/sistêmica.
- `priceCents`, `promoPriceCents` e `priceModifierCents` devem ser enviados em centavos.
- Imagens podem exigir fluxo separado de upload quando Cloudflare R2 estiver integrado.
- Variações devem ser criadas como registros filhos do produto.
- Opções devem ser criadas como registros filhos da variação.

## Design

**Layout:**  
Tela de gestão, mobile-first, com formulário dividido em blocos claros. Campos obrigatórios devem aparecer primeiro. Configurações avançadas, como promoção e variações, podem ficar em seções expansíveis para não pesar o cadastro básico.

**Cores principais:**  
Vermelho da marca para ações primárias, estados ativos e destaques. Branco para cards/formulário. Cinzas para bordas, divisórias e textos auxiliares. Preto para títulos e labels principais.

**Tipografia:**  
Título forte no topo. Labels claros acima dos campos. Textos auxiliares menores para explicar categoria `Todos`, preço em reais e variações.

**Espaçamentos:**  
Separar visualmente dados básicos, categoria, imagens, promoção e variações. Blocos de variação devem ter espaçamento suficiente para opções dinâmicas sem confundir o lojista.

**Componentes reutilizáveis:**  
`ProductForm`, `ProductBasicInfoSection`, `ProductCategorySection`, `ProductImageUploader`, `ProductPromotionSection`, `ProductVariationSection`, `VariationOptionRow`, `MoneyInput`, `CategorySelect`, `AvailabilityToggle`, `FormActions`.

**Ícones:**  
Produto, imagem, categoria, tag/promoção, variação, adicionar, remover, salvar e voltar.

**Imagens ou ilustrações:**  
Usar preview das imagens selecionadas. Quando não houver imagem, usar placeholder visual consistente com a vitrine.

## Responsividade

**Desktop:**  
Pode usar duas colunas leves: formulário principal à esquerda e prévia/resumo à direita. Se não houver prévia, manter largura confortável para leitura e preenchimento.

**Mobile:**  
Todos os campos devem ficar empilhados. Seções avançadas devem ser expansíveis ou claramente separadas. Botões de salvar/cancelar devem ter área de toque confortável.

**Pontos de atenção:**  
Campos de variações podem crescer muito. A tela deve evitar poluição visual, permitir remover blocos com clareza e impedir que botões pequenos fiquem difíceis de tocar no mobile.

## Acessibilidade

- Todos os campos devem possuir labels visíveis.
- Campos monetários devem indicar que o valor é em reais.
- Toggles devem ter texto associado, não depender apenas de cor.
- Botões de adicionar/remover variação e opção devem ter texto ou `aria-label`.
- Erros de validação devem aparecer próximos aos campos.
- Ordem de foco deve seguir a ordem visual do formulário.
- Seções expansíveis devem informar estado aberto/fechado para tecnologias assistivas.

## Observações

Esta tela é parte da gestão da loja e deve ficar associada à feature `store`.

A categoria `Todos` é uma regra central do catálogo: ela existe para garantir que todo produto continue acessível na listagem geral da loja, mesmo sem categoria específica.

As variações e opções existem no modelo de dados do backend (`product_variations` e `variation_options`) e devem ser consideradas no desenho do formulário. Porém, para reduzir complexidade, a UI pode tratar variações como seção avançada.

O formulário não deve apresentar destaque ou controle de estoque, pois esses campos não fazem parte do contrato atual de produtos.

Esta documentação não define a implementação final do endpoint. Ela define o comportamento esperado da tela, os campos necessários e os pontos que a spec de implementação deve validar antes de codificar a funcionalidade real.
