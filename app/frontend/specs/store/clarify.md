# Clarify: storefront pública do consumidor

## Perguntas

### Q1 — Qual contexto pertence à rota pública?

Pergunta: A presença de uma sessão de proprietário pode transformar `/storefront/:slug` ou `/lojas/:slug` em uma tela de gestão?

Resposta: Não. A issue #52, o PRD e `screen-store-0010.md` definem essa experiência como pública e destinada ao consumidor. A rota pública mantém o mesmo conteúdo para visitante anônimo e usuário autenticado, sem controles administrativos.

Impacto na spec: Supera as decisões legadas Q1, Q2 e Q9 que autorizavam mistura temporária, aba `Adicionar` e edição na storefront.

### Q2 — Onde a gestão existente será preservada?

Pergunta: Como manter a edição da loja e os painéis de produtos/categorias sem expô-los ao consumidor?

Resposta: A implementação existente será preservada em um contexto explícito de gestão `/storefront/:slug/manage`, acessível somente quando existir sessão válida e a loja pertencer ao perfil/tenant resolvido. Sem autorização, o contexto de gestão não renderiza seus controles e orienta autenticação ou retorno à vitrine pública.

Impacto na spec: A storefront pública deixa de importar páginas de gestão; a composição administrativa passa para uma página/rota separada, reaproveitando os componentes existentes.

### Q3 — Quais campos públicos podem ser exibidos agora?

Pergunta: O frontend deve preencher identificação legal do fornecedor e situação de funcionamento mesmo sem esses campos no contrato atual?

Resposta: Não. O contrato atual fornece identidade, descrição, horários, endereço, cidade, UF, logo e WhatsApp. Identificação legal, e-mail público, banner e situação de funcionamento só serão exibidos quando o endpoint público os fornecer explicitamente. Não serão inferidos nem simulados.

Impacto na spec: Registra dependência de evolução do contrato sem bloquear a entrega dos campos já disponíveis.

### Q4 — Como busca, filtros, ordenação e paginação funcionarão com o endpoint atual?

Pergunta: Essas operações dependem de novos endpoints?

Resposta: Nesta entrega, serão aplicadas em memória sobre o catálogo real retornado por `GET /api/products/store/:storeId`. Busca parcial, categoria, faixa de preço e ordenação serão combináveis. A apresentação será paginada em até 20 itens por página. Uma evolução server-side deve atualizar `contracts/storefront-api.md` antes de substituir esse comportamento.

Impacto na spec: Permite cumprir a experiência sem alterar backend e deixa explícito que o frontend não inventa resultados fora do conjunto retornado.

### Q5 — Quais rotas públicas dão continuidade à jornada?

Pergunta: Quais destinos existentes serão usados para detalhe, carrinho e listagem?

Resposta: Detalhe usa `/lojas/:slug/produtos/:productId`, carrinho usa `/market-cart` e listagem pública usa `/stores`. `/lojas/:slug` continua como alias público da storefront; `/storefront/:slug` é o endereço canônico compartilhado nesta entrega.

Impacto na spec: Evita criar destinos novos ou navegação sem implementação.

### Q6 — Como compartilhar a loja?

Pergunta: A ação continua restrita à cópia da URL?

Resposta: Não. Deve tentar Web Share API quando disponível e, se indisponível ou não aplicável, copiar a URL canônica. Cancelamento do compartilhamento nativo não deve ser anunciado como sucesso; falha deve permitir nova tentativa.

Impacto na spec: Evolui a decisão anterior de cópia funcional para cumprir `RF009` e a compatibilidade progressiva do PRD.

### Q7 — Como provar a separação por testes?

Pergunta: O projeto possui infraestrutura de testes existente?

Resposta: Não há script ou dependência de testes no `package.json`. O plano deve introduzir um runner frontend leve e testes focados na composição pública, autorização do contexto de gestão e regras puras de catálogo, sem alterar a stack de produção.

Impacto na spec: Testes automatizados passam a integrar o Scope Lock e a Definition of Done da issue #52.

## Decisões Registradas

- O ator correto é `consumidor`; ocorrências documentais de `cliente` são apenas compatibilidade legada.
- `/storefront/:slug` e `/lojas/:slug` são sempre públicas e não exigem autenticação.
- Controles de editar loja, adicionar/gerenciar produtos e gerenciar categorias não aparecem na storefront pública, mesmo para proprietário autenticado.
- A gestão existente fica em `/storefront/:slug/manage` e exige sessão/propriedade.
- Produtos e categorias vêm somente dos endpoints reais; não haverá mocks de catálogo.
- Busca, categoria, faixa de preço, ordenação e paginação de 20 itens serão aplicadas em memória nesta entrega.
- A URL canônica compartilhada permanece `/storefront/:slug`, com Web Share API e fallback de cópia.
- Campos públicos ausentes no contrato não serão inventados.
- Loja sem slug, inexistente ou indisponível recebe estado público sem informação administrativa.
- Rotas de continuidade: `/stores`, `/lojas/:slug/produtos/:productId` e `/market-cart`.
- As decisões legadas de storefront mista e botões administrativos inertes estão integralmente superadas pela issue #52 e pelo PRD de 15/07/2026.

## Pendências

- Evolução backend futura: identificação legal, e-mail público, banner, situação de funcionamento e paginação/filtros server-side exigem atualização prévia do contrato.
- A pendência não bloqueia a implementação dos dados e comportamentos já cobertos pelo contrato frontend atual.
