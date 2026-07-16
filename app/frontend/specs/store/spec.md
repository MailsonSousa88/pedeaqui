# Spec: storefront pública do consumidor

## Objetivo

Entregar em `src/features/store/storefront/` a experiência pública de uma loja para o consumidor descobrir o estabelecimento e seus produtos sem cadastro ou autenticação, separada dos fluxos de gestão do lojista e sem expor dados privados ou ações administrativas.

## Fonte da Tela

- Issue: `https://github.com/MailsonSousa88/pedeaqui/issues/52`
- PRD: `../../docs/product/prd.md`, especialmente as seções 4.3, 5.1.A, 6.2, 7, 8.4 e 9.3–9.5
- Screen: `../../docs/screens/screen-store-0010.md`
- Flow: `consumer-flow`
- Posição no fluxo: após o consumidor selecionar uma loja na navegação pública ou abrir seu link por slug; antes do detalhe do produto e do carrinho por loja.
- RFs/RNFs: `RF002`, `RF003`, `RF007`, `RF008`, `RF009`, `RF028`, `RF032`, `RNF0011`, `RNF0012`, `RNF0013`, `RNF0015`, `RNF0016`, `RNF0017`, `RNF0018`, `RNF0020`, `RNF0022`, `RNF0029`, `RNF0031`, `RNF0032`, `RNF0033`, `RNF0043`, `RNF0044`, `RNF0045`
- Use cases: `use-case-cliente-0001`, `use-case-cliente-0002`
- User stories: `user-story-cliente-0001`, `user-story-cliente-0002`
- Edge cases: `edge-case-store-0006-visibilidade-slug-whatsapp`, `edge-case-cart-0007-produto-alterado-no-carrinho`, `edge-case-category-0008-gerenciamento-categorias`, `edge-case-image-0009-upload-r2-banco`

## Escopo

- Disponibilizar a rota pública `/storefront/:slug` sem guarda de autenticação.
- Carregar somente uma loja pública elegível e seus dados públicos reais pelo slug.
- Exibir identidade, descrição, funcionamento, endereço resumido, cidade, UF, WhatsApp, e-mail público e identificação legal aplicável quando presentes no contrato público.
- Exibir banner, avatar e imagens de produtos com fallback consistente quando ausentes ou indisponíveis.
- Listar somente produtos públicos, disponíveis, não excluídos e pertencentes à loja acessada.
- Apresentar preço-base e preço promocional vigente de forma distinta.
- Permitir busca parcial por nome, filtro por categoria, filtro por faixa de preço e ordenação alfabética ou por preço.
- Combinar busca, filtros e ordenação sem recarregar a página e respeitar até 20 produtos por página.
- Oferecer compartilhamento nativo quando suportado e cópia da URL pública como fallback, com feedback acessível.
- Permitir abrir o detalhe público de um produto mantendo o contexto da loja.
- Exibir acesso ao carrinho público existente sem simular inclusão de item ainda não implementada.
- Diferenciar loading, falha temporária, loja não encontrada/indisponível, catálogo vazio e busca/filtro sem resultado.
- Garantir experiência mobile-first, desktop, teclado e tecnologias assistivas.
- Manter ações administrativas exclusivamente nos fluxos autenticados e autorizados do lojista.
- Adicionar ou atualizar testes que provem a diferença entre a visão pública do consumidor e o contexto administrativo do proprietário.

## Fora de Escopo

- Criar ou alterar backend, banco, autenticação, Supabase, R2 ou regras de assinatura.
- Exibir dados privados do tenant, do lojista ou de operações administrativas.
- Editar loja, cadastrar/editar/excluir produto ou gerenciar categorias pela rota pública.
- Autenticar o consumidor ou exigir conta para navegar, pesquisar, filtrar ou abrir produtos.
- Processar pagamento de produtos ou afirmar que pedido, mensagem, pagamento ou venda foi concluído.
- Implementar checkout completo ou negociação posterior ao redirecionamento para WhatsApp.
- Implementar ou substituir nesta issue o serviço de carrinho, que ainda possui dados demonstrativos e exige uma spec própria antes de persistir produtos reais.
- Inventar dados, produtos, categorias, imagens ou estados de elegibilidade quando o contrato público não os fornecer.
- Duplicar no frontend regras críticas de publicação, tenant, assinatura, preço ou disponibilidade que pertencem ao backend.

## Requisitos Funcionais

### RF-FE-001 — Acesso público por slug

Como consumidor, quero abrir uma loja ativa por seu endereço público, para conhecer a vitrine sem criar conta.

Critérios de aceite:

- `/storefront/:slug` é acessível sem sessão, assinatura ou perfil de lojista.
- O slug é lido da rota e usado na consulta pública, sem fallback para loja simulada.
- Loja inexistente, inativa, suspensa ou indisponível apresenta estado público apropriado.
- O estado de indisponibilidade não revela tenant, assinatura, autorização ou detalhes administrativos.

### RF-FE-002 — Identidade e informações públicas

Como consumidor, quero entender qual loja estou visitando e como ela funciona, para decidir se desejo explorar seus produtos.

Critérios de aceite:

- A tela usa a logo oficial do PedeAqui em `/logoPedeAqui.jpeg`.
- Nome, descrição e dados públicos vêm do contrato da loja carregada.
- Funcionamento, endereço, contato e identificação legal são exibidos somente quando públicos e disponíveis.
- Banner, avatar e imagens ausentes ou com falha usam fallback, nunca conteúdo inventado ou imagem quebrada.

### RF-FE-003 — Catálogo público

Como consumidor, quero visualizar os produtos disponíveis da loja, para conhecer preços e opções atuais.

Critérios de aceite:

- A lista contém somente produtos públicos retornados para a loja acessada.
- Cada produto apresenta nome, imagem ou fallback, descrição curta quando disponível, categoria, disponibilidade e preço aplicável.
- Promoção vigente mostra preço-base riscado e preço promocional em destaque.
- A listagem respeita o limite de 20 produtos por página definido no contrato público.
- Produto indisponível não é apresentado como adicionável ao carrinho.

### RF-FE-004 — Busca, filtros e ordenação

Como consumidor, quero refinar os produtos da loja, para encontrar itens relevantes com rapidez.

Critérios de aceite:

- A busca aceita termos parciais do nome.
- `Todos` reúne todos os produtos públicos; categorias específicas filtram apenas seus produtos e respeitam a ordem recebida.
- Faixa de preço e ordenação A–Z, Z–A, menor preço e maior preço estão disponíveis quando suportadas pelo contrato/planejamento.
- Busca, categoria, preço e ordenação podem ser combinados sem reload.
- Catálogo sem produtos e filtro sem correspondência produzem estados vazios distintos.

### RF-FE-005 — Compartilhamento público

Como consumidor, quero compartilhar a loja, para enviar seu endereço público a outra pessoa.

Critérios de aceite:

- A URL compartilhada é a URL canônica da loja real carregada.
- O sistema usa Web Share API quando disponível e copia a URL como fallback.
- Sucesso ou falha gera feedback acessível e temporário, com nova tentativa possível.
- Sem slug válido, o controle permanece indisponível.

### RF-FE-006 — Continuidade para produto e carrinho

Como consumidor, quero abrir um produto e acessar a área pública de carrinho, para continuar a jornada sem perder o contexto da loja.

Critérios de aceite:

- O detalhe navega para a rota pública do produto mantendo o contexto da loja.
- O acesso ao carrinho permanece disponível por toque e teclado.
- A storefront não simula inclusão de produto enquanto o carrinho real por loja não estiver especificado e implementado.
- A interface não afirma que navegação ou seleção concluiu pedido, mensagem ou venda.

### RF-FE-007 — Separação entre consumidor e lojista

Como consumidor, quero ver somente ações públicas, para navegar sem confundir a vitrine com o painel de gestão.

Critérios de aceite:

- A rota pública não mostra `Editar`, `Adicionar produto`, `Gerenciar produtos`, `Gerenciar categorias` nem equivalentes administrativos.
- A existência de sessão de proprietário não altera a storefront pública para inserir controles de gestão.
- Fluxos administrativos continuam disponíveis apenas em rotas/contextos autenticados e autorizados.
- Componentes públicos não executam mutações administrativas.

### RF-FE-008 — Estados, responsividade e acessibilidade

Como consumidor, quero compreender o estado da loja em qualquer dispositivo, para conseguir navegar ou me recuperar de falhas.

Critérios de aceite:

- Loading preserva a estrutura principal sem saltos bruscos.
- Falha temporária oferece orientação e nova tentativa quando seguro.
- Loja indisponível oferece retorno à Home ou à listagem pública.
- A interface funciona a partir de 320 px sem sobreposição ou rolagem horizontal indevida.
- Controles têm nome acessível, foco visível, ordem lógica, área de toque adequada e feedback que não depende somente de cor.
- Imagens informativas têm texto alternativo e estados dinâmicos relevantes são anunciados.

## Estados

- Inicial: slug válido identificado e consulta pública preparada.
- Loading: skeletons/fallbacks para identidade, filtros e produtos durante requisições reais.
- Sucesso: loja pública carregada com identidade, dados públicos e catálogo.
- Catálogo vazio: loja disponível, mas sem produtos públicos no momento.
- Resultado vazio: loja e catálogo existem, mas a combinação de busca/filtros não possui correspondência.
- Loja não encontrada/indisponível: resposta pública sem detalhes administrativos.
- Erro temporário: mensagem em português claro, ação de tentar novamente e navegação pública alternativa.
- Feedback de compartilhamento: sucesso ou falha anunciado de forma acessível.
- Feedback de carrinho: inclusão confirmada sem sugerir pedido concluído.

## Conteúdo da Tela

- Títulos: nome público da loja, `Promoções da loja` quando houver e `Produtos`.
- Campos: `Buscar produto`, faixa de preço e ordenação conforme planejamento.
- Controles públicos: voltar para lojas, compartilhar/copiar link, categorias, filtros, ordenar, ver detalhes, adicionar ao carrinho e abrir carrinho.
- Controles proibidos no contexto público: editar loja, adicionar/editar/excluir produto e gerenciar categorias.
- Mensagens: loja indisponível, catálogo vazio, nenhum resultado, falha de carregamento, link copiado/falha ao compartilhar e produto indisponível.
- Transparência: a jornada prepara o contato; não confirma pedido, mensagem, pagamento ou venda.

## Contexto de Jornada

- Entrada esperada: Home/listagem pública, link compartilhado, navegação externa ou URL direta `/storefront/:slug`.
- Próximo passo: detalhe público do produto ou carrinho temporário organizado por loja.
- O que esta tela não deve resolver: gestão da loja, autenticação de consumidor, checkout completo, pagamento, entrega ou atendimento após o WhatsApp.

## Ambiguidades Para Clarify

- Confirmar no contrato atual quais campos públicos representam identificação legal do fornecedor e situação de funcionamento.
- Confirmar se paginação, faixa de preço e ordenação serão executadas pelo endpoint público ou em memória sobre os produtos já carregados.
- Confirmar as rotas públicas existentes para detalhe do produto, carrinho e retorno à listagem de lojas.
- Confirmar qual contexto/rota autenticada preservará edição da loja após a remoção definitiva dos controles administrativos da storefront pública.
