# Tela de Detalhes do Produto

## Identificação

**Nome da tela:**

Detalhes públicos do produto

**Código da tela:**

`SCREEN-PRODUCT-014`

**Link ou referência visual:**

Issue GitHub `#53 - Criar tela pública de detalhes do produto`, tela `screen-store-0010.md`, requisitos `RF003` e `RF008` e contrato público registrado em `docs/records/backend/01-rotas-e-payloads.md`.

**Status da tela:**

Rascunho.

## Contexto no fluxo

**Fluxo ao qual pertence:**

Jornada pública do consumidor, dentro da vitrine da loja.

**Etapa do fluxo:**

Após o consumidor selecionar um card de produto na vitrine pública.

**Tela anterior:**

Vitrine pública da loja (`screen-store-0010.md`).

**Próxima tela esperada:**

Retorno à vitrine da mesma loja. A integração funcional com carrinho pertence a uma entrega própria.

## Objetivo

**Descrição da tela:**

Página pública dedicada a um produto específico, acessível pela URL `/lojas/:storeSlug/produtos/:productId` e vinculada à loja informada na rota.

**Função principal:**

Permitir que o consumidor consulte nome, descrição, preço, promoção vigente, disponibilidade, categoria e demais informações públicas existentes antes de realizar futuras ações de pedido.

**Ator principal:**

Consumidor.

**Atores secundários:**

Lojista como responsável pelos dados exibidos, sem controles administrativos nesta tela.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**

`RF002`, `RF003`, `RF008`, `RF032`

**Requisitos não funcionais relacionados:**

`RNF0013`, `RNF0015`, `RNF0016`, `RNF0017`, `RNF0020`, `RNF0022`

**Casos de uso relacionados:**

`use-case-cliente-0001`

**Edge cases relacionados:**

`edge-case-store-0006-visibilidade-slug-whatsapp`, `edge-case-image-0009-upload-r2-banco`

## Conteúdo da tela

**Título principal:**

Nome público do produto.

**Subtítulo ou texto de apoio:**

Descrição cadastrada para o produto, quando disponível.

**Mensagens auxiliares:**

Disponibilidade do produto, promoção vigente, imagem indisponível, falha de carregamento e produto não encontrado ou não pertencente à loja.

## Elementos de interface

### Header

- Logo: imagem oficial `/logoPedeAqui.jpeg`.
- Texto auxiliar: não aplicável.
- Botão ou link de ação: nenhum; o header segue o mesmo padrão visual da vitrine pública.
- Ícones: nenhum no header.
- As ações de retorno ficam no conteúdo da página, fora do header: um botão ícone `X` no topo e um botão textual `Voltar` na área de ações, ambos com o mesmo destino.

### Galeria do produto

- Tipo de container: galeria principal responsiva.
- Estado inicial desta entrega: três posições visuais neutras de imagem, sem fotografias mockadas.
- Cada posição deve apresentar um placeholder consistente com o fallback visual da vitrine e o texto acessível `Imagem indisponível`.
- A posição ativa deve ficar em evidência; as demais podem aparecer como indicadores ou miniaturas neutras conforme o espaço disponível.
- Controles `Imagem anterior` e `Próxima imagem` devem navegar entre as três posições.
- Os controles devem possuir nomes acessíveis, funcionar por teclado e não depender somente do ícone.
- Quando o contrato passar a fornecer imagens reais, elas substituirão os placeholders sem alterar a estrutura da galeria.

### Informações do produto

- Nome do produto.
- Descrição, quando disponível.
- Preço base em reais.
- Preço original riscado e preço promocional em destaque apenas quando a promoção estiver vigente.
- Categoria, quando puder ser resolvida pelo contrato público.
- Demais detalhes públicos existentes, sem inventar labels para dados desconhecidos.
- Estado textual `Indisponível` quando `available = false`.

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Imagem anterior | Botão com ícone | Habilitado conforme posição | Exibe a posição anterior da galeria |
| Próxima imagem | Botão com ícone | Habilitado conforme posição | Exibe a próxima posição da galeria |
| Voltar para a loja | Botão secundário em tamanho ícone, com `X` | Habilitado | Retorna à vitrine e descarta a quantidade local |
| Diminuir quantidade | Botão secundário em tamanho ícone | Desabilitado em `1` | Reduz uma unidade sem permitir valor menor que `1` |
| Aumentar quantidade | Botão secundário em tamanho ícone | Habilitado | Incrementa uma unidade |
| Voltar | Botão secundário textual | Habilitado | Executa a mesma ação do `X`: retorna à vitrine e descarta a quantidade local |
| Adicionar ao carrinho | Botão primário com ícone de carrinho | Desabilitado | Reserva a ação futura sem persistir dados nesta entrega |

### Quantidade

| Campo | Tipo | Obrigatório | Valor inicial | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Quantidade | Número inteiro | Sim | `1` | Mínimo `1`; vazio, zero, negativo ou inválido volta para `1` | Pode ser alterado por `−`, digitação ou `+` |

### Links

| Link | Destino ou ação | Observação |
| --- | --- | --- |
| Voltar para a loja | `/lojas/:storeSlug` | Preserva o contexto da loja de origem |

## Estados da tela

**Estado inicial:**

A URL contém `storeSlug` e `productId`; a tela inicia a consulta da loja e dos produtos públicos vinculados.

**Estado de carregamento:**

Exibe skeletons ou placeholders estáveis para galeria, nome, descrição, preços, metadados e ação principal.

**Estado de erro:**

Falha de rede ou resposta inesperada exibe mensagem clara, opção de tentar novamente e retorno à loja quando o slug estiver disponível.

**Estado de sucesso:**

O produto localizado e vinculado à loja é exibido com seus dados públicos atuais.

**Estado de conteúdo indisponível:**

Produto inexistente, removido ou não pertencente à loja exibe um estado apropriado e ação para retornar à vitrine. Produto com `available = false` continua visível, recebe identificação textual e mantém `Adicionar ao carrinho` desabilitado.

## Validações

- Consultar `GET /api/stores/:slug` para obter e validar a loja pública.
- Consultar `GET /api/products/store/:storeId` e localizar localmente o item correspondente a `productId`.
- Não exibir um produto cujo vínculo com a loja informada não possa ser validado.
- Não presumir campos de imagem ausentes do contrato público atual.
- Usar três placeholders neutros até que o contrato forneça imagens reais.
- Considerar promoção vigente somente quando `promoPriceCents` for positivo, menor que `priceCents` e `promoEndsAt` estiver ausente ou no futuro.
- Promoção expirada não deve apresentar preço riscado nem destaque promocional.
- Tratar preços internamente em centavos e formatá-los em reais na interface.
- Não apresentar controles de edição, exclusão ou disponibilidade administrativa.

## Comportamento esperado

1. O consumidor seleciona um produto na vitrine ou acessa diretamente `/lojas/:storeSlug/produtos/:productId`.
2. O sistema consulta a loja pública pelo slug.
3. O sistema consulta os produtos públicos pelo identificador da loja.
4. O sistema localiza o produto da URL e valida seu vínculo com a loja.
5. O sistema exibe a galeria com três placeholders neutros e os dados públicos essenciais do produto.
6. Se a promoção estiver expirada, o sistema exibe somente o preço base.
7. O consumidor ajusta uma quantidade inteira, sempre maior ou igual a `1`.
8. `Adicionar ao carrinho` permanece visível e desabilitado enquanto não houver integração real.
9. Se o produto estiver indisponível, o sistema mantém o conteúdo visível e sinaliza `Indisponível`.
10. O consumidor pode navegar pelos placeholders ou retornar à vitrine pelo botão `X` ou pelo botão `Voltar`; os dois descartam a quantidade local e, ao abrir novamente, ela começa em `1`.

## Design

**Layout:**

Página pública mobile-first. No desktop, galeria e informações podem ocupar duas colunas; no mobile, devem ficar empilhadas, com galeria antes do conteúdo textual.

**Cores principais:**

Usar exclusivamente os tokens e padrões já adotados pela vitrine pública: cor de marca nas ações, branco nos cards, cinza neutro nos placeholders e textos com contraste suficiente.

**Tipografia:**

Nome do produto em destaque, preço atual com forte hierarquia, descrição e metadados em níveis secundários legíveis.

**Espaçamentos:**

Manter separação clara entre galeria, identificação, preços, detalhes, disponibilidade e ações, com áreas de toque confortáveis.

**Componentes reutilizáveis:**

Header público, fallback visual de imagem, formatação monetária, estados de carregamento/erro e botão primário já definidos no frontend, quando compatíveis com o plano técnico.

**Ícones:**

Ícone `X` para retorno superior, setas para navegar pela galeria, ícone neutro de imagem indisponível e ícone de carrinho na ação principal.

**Imagens ou ilustrações:**

Não há imagens reais nesta entrega. A estrutura reserva três posições para futura integração com URLs fornecidas pelo contrato.

## Responsividade

**Desktop:**

Galeria e informações lado a lado, respeitando largura máxima de leitura e sem ampliar excessivamente os placeholders.

**Mobile:**

Conteúdo empilhado, controles da galeria alcançáveis, nome e preços sem truncamento crítico e ações em largura confortável. `Adicionar ao carrinho` aparece acima de `Voltar` na área de ações.

**Pontos de atenção:**

Evitar salto de layout durante carregamento, sobreposição das setas, textos sobre a galeria, botão inacessível e dependência exclusiva de cor para promoção ou indisponibilidade.

## Acessibilidade

- O botão textual `Voltar` deve possuir rótulo claro; o botão `X` deve possuir nome acessível `Voltar para a loja`.
- Controles da galeria devem possuir nomes acessíveis e foco visível.
- A posição ativa da galeria deve ser anunciável sem depender somente de cor.
- O placeholder deve ter texto alternativo ou descrição acessível.
- Promoção e indisponibilidade devem ser comunicadas por texto.
- Botão desabilitado deve manter rótulo compreensível e estado semântico correto.
- A ordem de foco deve seguir a ordem visual da página.

## Observações

- A issue `#53`, esta descrição de tela, os requisitos oficiais, o fluxo do consumidor e o contrato de rotas devem ser usados em conjunto como fontes da implementação.
- O payload público atual não documenta campo de imagem; por isso, imagens reais não fazem parte desta entrega.
- O carrinho atual usa seed mockado e não possui operação real de inclusão compatível com esta tela. Por isso, o CTA `Adicionar ao carrinho` aparece desabilitado e sem persistência; a integração pertence a uma issue própria.
