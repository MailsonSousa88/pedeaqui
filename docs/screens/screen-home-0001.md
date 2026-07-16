# Tela Inicial

## Identificação

**Nome da tela:**  
Tela Inicial

**Código da tela:**  
`SCREEN-HOME-001`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, node `92:217`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Apresentação pública da plataforma, navegação inicial e entrada para autenticação.

**Etapa do fluxo:**  
Primeira tela pública acessada pelo visitante, consumidor ou lojista em potencial.

**Tela anterior:**  
Acesso direto ao domínio do PedeAqui ou navegação externa.

**Próxima tela esperada:**  
Login, cadastro, listagem de lojas, vitrine de uma loja, carrinho ou seção de planos.
## Objetivo

**Descrição da tela:**  
Tela pública de introdução ao PedeAqui, usada para apresentar a plataforma, explicar sua proposta, mostrar benefícios, divulgar planos e guiar o usuário para ações principais.

**Função principal:**  
Apresentar o PedeAqui como plataforma para comprar em lojas digitais e para lojistas venderem seus produtos.

**Ator principal:**  
Visitante.

**Atores secundários:**  
Cliente, lojista e usuário já cadastrado.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF001`, `RF011`, `RF012`, `RF031`, `RF032`

**Requisitos não funcionais relacionados:**  
`RNF0014`, `RNF0015`, `RNF0016`

**Casos de uso relacionados:**  
`use-case-cliente-0001`, `use-case-lojista-0001`

**Edge cases relacionados:**  
Não definido nesta etapa.

## Conteúdo da tela

**Título principal:**  
`ADICIONE, CRIE E VENDA!`

**Subtítulo ou texto de apoio:**  
Texto introdutório explicando o PedeAqui como plataforma para consumidores encontrarem lojas e para lojistas criarem suas vitrines digitais.

**Mensagens auxiliares:**  
Seções explicativas sobre como comprar, como vender, benefícios da plataforma, planos disponíveis, termos de uso, privacidade e direitos autorais.

## Elementos de interface

### Header

- Logo: `PedeAqui`, posicionada no canto superior esquerdo.
- Texto auxiliar: `Já tem uma conta?`
- Botão ou link de ação: `Entrar`
- Ícones: opcional no botão de login, seguindo padrão visual das telas de autenticação.

### Navegação mobile

- Tipo: guia inferior fixo ou de fácil acesso no mobile.
- Uso: exclusivo da experiência mobile.
- Ícones esperados:
  - ícone de casinha: tela inicial;
  - ícone de loja: tela de lojas;
  - ícone de carrinho: tela do carrinho;
  - ícone de bolsa: vitrine ou loja do lojista.
- Estado inicial: ícone de casinha ativo na Home.

### Navegação desktop

- Tipo: navegação textual.
- Uso: exclusiva da experiência desktop.
- Itens esperados:
  - Início;
  - Lojas;
  - Carrinho;
  - Vitrine ou Loja;
  - Entrar.

### Área principal

- Tipo de container: página pública escrolável.
- Título: `ADICIONE, CRIE E VENDA!`
- Conteúdo: introdução textual, banner rotativo, cards promocionais, seção de funcionamento, planos e rodapé.

### Banner rotativo

- Função: promover o PedeAqui, divulgar mensagens da plataforma ou reservar espaço futuro para anúncios.
- Conteúdo possível:
  - mensagem institucional;
  - chamada para lojistas;
  - chamada para consumidores;
  - anúncios;
  - destaques de funcionalidades.

### Seção rotativa de cards

- Função: mostrar recursos, utilidades e benefícios do sistema.
- Conteúdo possível:
  - criação de loja;
  - cadastro de produtos;
  - carrinho;
  - checkout via WhatsApp;
  - planos;
  - vitrine pública;
  - facilidade para vender.

### Seção de planos

- Deve apresentar os planos disponíveis ou previstos.
- O plano disponível no MVP deve ter destaque claro.
- Planos futuros devem aparecer como indisponíveis ou `Em breve`, conforme padrão já definido na tela de planos.

### Rodapé

- Direitos autorais;
- Termos de Uso;
- Política de Privacidade;
- links institucionais necessários.

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Entrar | Botão secundário | Habilitado | Leva para a tela de login |
| Criar loja ou Começar agora | Botão primário | Habilitado | Leva para cadastro ou fluxo de planos/cadastro |
| Ver lojas | Botão ou link | Habilitado | Leva para listagem de lojas |
| Ver planos | Botão ou âncora | Habilitado | Leva para a seção de planos na própria tela |
| Cards rotativos | Área clicável opcional | Conforme card | Pode navegar para detalhes ou apenas informar |

## Estados da tela

**Estado inicial:**  
Header visível, slogan em destaque, banner promocional e primeiras seções de apresentação.

**Estado de carregamento:**  
Banners e cards rotativos podem exibir skeleton, placeholder ou estado neutro até carregarem.

**Estado de erro:**  
Se banners ou anúncios não carregarem, a tela deve continuar funcional exibindo conteúdo institucional padrão.

**Estado de sucesso:**  
Usuário consegue navegar para login, cadastro, listagem de lojas ou planos.

**Estado vazio:**  
Não se aplica para o conteúdo institucional principal. Pode existir fallback caso banners ou anúncios não estejam cadastrados.

## Validações

- Links de login, cadastro, lojas e planos devem apontar para destinos válidos.
- Banner rotativo não deve quebrar a estrutura da página se não houver conteúdo dinâmico.
- Navegação mobile deve destacar corretamente a tela inicial.
- Navegação desktop deve usar texto, não depender apenas de ícones.

## Comportamento esperado

1. O visitante acessa a Home.
2. O sistema exibe logo, chamada de login e slogan principal.
3. O visitante visualiza banner rotativo e seções promocionais.
4. O visitante pode rolar a página para entender como comprar, como vender e quais planos existem.
5. No mobile, o visitante pode usar o guia inferior por ícones.
6. No desktop, o visitante usa navegação textual.
7. O visitante pode seguir para login, cadastro, listagem de lojas ou seção de planos.

## Design

**Layout:**  
Página pública vertical e escrolável, com header no topo, hero promocional, banner rotativo, seções de cards, área de planos e rodapé.

**Cores principais:**  
Vermelho da marca como cor de destaque, branco como base, preto para texto principal e cinza para textos auxiliares.

**Tipografia:**  
Título principal forte e promocional. Subtítulos menores e explicativos. Cards com títulos curtos e textos de apoio objetivos.

**Espaçamentos:**  
Espaçamento amplo entre seções para deixar a página respirável. No mobile, manter margens laterais confortáveis e evitar cards apertados.

**Componentes reutilizáveis:**  
`PublicHeader`, `MobileBottomNavigation`, `DesktopNavigation`, `HeroSection`, `RotatingBanner`, `FeatureCard`, `PlanCard`, `FooterLinks`.

**Ícones:**  
Ícones da navegação mobile: casinha, loja, carrinho e bolsa. Ícones dos cards devem representar funcionalidades do sistema.

**Imagens ou ilustrações:**  
Podem existir banners, imagens promocionais, ilustrações leves ou elementos visuais relacionados a lojas, produtos, pedidos e venda digital.

## Responsividade

**Desktop:**  
A navegação deve usar texto descritivo. A página pode usar seções mais largas, cards lado a lado, banners horizontais e maior respiro entre blocos.

**Mobile:**  
A experiência deve ser mobile-first. A navegação principal deve usar guia com ícones. Seções devem ser empilhadas verticalmente, banners devem se adaptar à largura da tela e cards rotativos devem permitir leitura confortável.

**Pontos de atenção:**  
O wireframe do Figma é uma versão reduzida da tela. A implementação final deve considerar rolagem vertical e mais seções do que aparecem na imagem. Textos promocionais não devem sobrepor cards, banners ou navegação inferior.

## Acessibilidade

- O botão `Entrar` deve ter texto claro.
- Ícones da navegação mobile devem possuir descrição acessível.
- O estado ativo da navegação não deve depender apenas de cor.
- Banners rotativos não devem trocar rápido demais.
- O usuário deve conseguir navegar pela página sem depender de gestos complexos.
- Contraste entre vermelho, branco, preto e cinza deve ser validado.

## Observações

Esta tela é uma página promocional e introdutória da plataforma. O wireframe de alta fidelidade serve como referência visual de estilo, cores, tipografia, ícones e composição, mas não representa todo o conteúdo final da Home.

A Home deve apresentar o PedeAqui para dois públicos: consumidores que querem comprar e lojistas que querem vender.
