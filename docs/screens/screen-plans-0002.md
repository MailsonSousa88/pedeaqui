# Tela de Planos

## Identificação

**Nome da tela:**  
Tela de Planos

**Código da tela:**  
`SCREEN-PLANS-002`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, node `9:79`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Apresentação comercial da plataforma, escolha de plano e entrada para o cadastro do lojista.

**Etapa do fluxo:**  
Tela exibida quando um visitante interessado em vender no PedeAqui precisa escolher um plano antes de continuar para cadastro, configuração da loja ou pagamento.

**Tela anterior:**  
Tela Inicial, chamada de `Ver planos`, chamada de `Criar loja`, link comercial externo ou acesso direto à rota de planos.

**Próxima tela esperada:**  
Cadastro de lojista, configuração inicial da loja ou próxima etapa definida no fluxo de contratação.

## Objetivo

**Descrição da tela:**  
Tela usada para apresentar os planos disponíveis e futuros do PedeAqui, permitindo que o lojista em potencial entenda o que está disponível no MVP e quais planos ainda serão liberados.

**Função principal:**  
Permitir que o visitante escolha o plano Básico, atualmente disponível por `R$ 29,99/mês`, para iniciar o fluxo de contratação do serviço.

**Ator principal:**  
Lojista em potencial.

**Atores secundários:**  
Visitante e usuário ainda não cadastrado ou consumidor.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF012`, `RF014A`, `RF014B`, `RF030`, `RF031`

**Requisitos não funcionais relacionados:**  
`RNF0015`, `RNF0016`, `RNF0018`

**Casos de uso relacionados:**  
`use-case-lojista-0001`

**Edge cases relacionados:**  
`edge-case-subscription-0001`, `edge-case-subscription-0003-inadimplencia-e-status`, `edge-case-subscription-0004-troca-plano-limite-produtos`

## Conteúdo da tela

**Título principal:**  
`Escolha seu plano`

**Subtítulo ou texto de apoio:**  
`Comece a vender no PedeAqui com o plano disponível para o MVP.`

**Mensagens auxiliares:**  
Textos curtos explicando os benefícios de cada plano, destaque visual para o plano disponível e indicação clara de que os planos Premium e Exclusivo ainda estão `Em breve`.

## Elementos de interface

### Header

- Logo: `PedeAqui`, posicionada no canto superior esquerdo.
- Texto auxiliar: não obrigatório nesta tela.
- Botão ou link de ação: opcional, seguindo o padrão do header público se a tela for acessada como página independente.
- Ícones: ícone da marca ou elemento visual usado no logotipo.

### Área principal

- Tipo de container: página ou seção pública com conteúdo centralizado.
- Título: `Escolha seu plano`.
- Subtítulo: texto de apoio sobre começar a vender no PedeAqui.
- Conteúdo: cards de planos exibidos no centro da tela.

### Card do plano Básico

- Tipo de container: card de plano disponível com destaque visual.
- Nome do plano: `Básico`.
- Status: `Disponível agora`.
- Preço: `R$ 29,99/mês`.
- Descrição: plano inicial para criar a loja, cadastrar produtos e começar a vender pelo PedeAqui.
- Botão principal: `Continuar com Básico`.
- Estado do botão: habilitado.
- Destaque visual: borda ou acento vermelho para indicar que é o plano ativo no MVP.

### Card do plano Premium

- Tipo de container: card de plano futuro.
- Nome do plano: `Premium`.
- Status: `Em breve`.
- Preço: `Em breve`.
- Descrição: plano superior planejado para conter todos os recursos do plano Básico e recursos adicionais.
- Botão principal: `Em breve`.
- Estado do botão: desabilitado.
- Destaque visual: aparência cinza ou neutra para indicar indisponibilidade.

### Card do plano Exclusivo

- Tipo de container: card de plano futuro.
- Nome do plano: `Exclusivo`.
- Status: `Em breve`.
- Preço: `Em breve`.
- Descrição: plano superior planejado para conter todos os recursos do Premium e benefícios avançados.
- Botão principal: `Em breve`.
- Estado do botão: desabilitado.
- Destaque visual: aparência cinza ou neutra para indicar indisponibilidade.

### Benefícios dos planos

| Plano | Benefícios esperados | Observação |
| --- | --- | --- |
| Básico | Criação de loja, cadastro de produtos, vitrine pública e acesso ao painel do lojista | Único plano disponível no MVP |
| Premium | Todos os recursos do Básico, mais destaque para a loja, relatórios mais completos e recursos promocionais | Indisponível inicialmente |
| Exclusivo | Todos os recursos do Premium, suporte prioritário, personalização avançada e recursos para campanhas especiais | Indisponível inicialmente |

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Continuar com Básico | Botão primário | Habilitado | Avança para o fluxo de cadastro, configuração da loja ou contratação |
| Em breve - Premium | Botão desabilitado | Desabilitado | Não executa ação de contratação |
| Em breve - Exclusivo | Botão desabilitado | Desabilitado | Não executa ação de contratação |

## Estados da tela

**Estado inicial:**  
Logo visível no topo, título centralizado, subtítulo explicativo e cards de planos renderizados no centro da tela.

**Estado de carregamento:**  
Cards podem exibir skeleton ou placeholders enquanto os dados de planos, preços e disponibilidade são carregados.

**Estado de erro:**  
Caso os dados de planos não carreguem, a tela deve exibir mensagem simples de erro e manter uma opção de tentar novamente. A tela não deve exibir preço incorreto ou permitir contratação sem dados confiáveis.

**Estado de sucesso:**  
Ao escolher o plano Básico, o visitante avança para a próxima etapa do fluxo de contratação.

**Estado vazio:**  
Não se aplica para o conteúdo principal. Se nenhum plano estiver configurado, a tela deve exibir uma mensagem de indisponibilidade temporária.

## Validações

- Apenas planos disponíveis podem ter botão de contratação habilitado.
- O plano Básico deve exibir o valor `R$ 29,99/mês`.
- Planos Premium e Exclusivo devem exibir estado `Em breve` e não podem avançar no fluxo.
- O botão desabilitado não deve parecer clicável.
- O valor exibido na tela deve estar consistente com a configuração usada pelo backend ou gateway de pagamento.

## Comportamento esperado

1. O visitante acessa a tela de Planos pela Home, por um link comercial ou por acesso direto.
2. O sistema exibe a logo, o título `Escolha seu plano` e o subtítulo de apoio.
3. O visitante visualiza os planos Básico, Premium e Exclusivo.
4. O sistema destaca o plano Básico como disponível.
5. O sistema exibe Premium e Exclusivo como indisponíveis, com botão `Em breve`.
6. O visitante clica em `Continuar com Básico`.
7. O sistema avança para a próxima etapa do fluxo de contratação do lojista.

## Design

**Layout:**  
Tela com header simples, título e subtítulo centralizados, seguida por cards de planos posicionados no centro. No desktop, os cards devem formar uma grade horizontal com espaçamento confortável. No mobile, os cards devem ser empilhados verticalmente.

**Cores principais:**  
Vermelho da marca para destaque, botões principais e acentos do plano disponível. Branco como fundo principal. Preto para títulos. Cinza para textos secundários, bordas neutras e estados desabilitados.

**Tipografia:**  
Título principal forte, com destaque visual na palavra `Escolha`. Subtítulo menor e explicativo. Cards com nome do plano em destaque, preço bem visível e benefícios com leitura rápida.

**Espaçamentos:**  
Espaçamento generoso entre título, subtítulo e cards. Cards devem manter largura suficiente para textos de benefícios sem quebra visual estranha.

**Componentes reutilizáveis:**  
`PublicHeader`, `PlanCard`, `PlanBadge`, `PlanBenefitList`, `PrimaryButton`, `DisabledButton`.

**Ícones:**  
Ícones podem ser usados para representar cada plano e para marcar benefícios. O plano Básico pode usar ícone simples de loja ou início. Premium e Exclusivo podem usar ícones de evolução, destaque ou coroa, desde que não transmitam disponibilidade imediata.

**Imagens ou ilustrações:**  
Não é obrigatório usar imagem nesta tela. O foco visual deve estar nos cards, nos ícones e na hierarquia de planos.

**Animações:**  
Podem existir animações sutis de entrada dos cards, hover no plano disponível e transições leves nos botões. As animações não devem deslocar o layout, dificultar leitura ou chamar mais atenção que a escolha do plano.

## Responsividade

**Desktop:**  
Cards em grade horizontal, centralizados, com espaço agradável entre eles. A tela deve aproveitar largura maior sem esticar excessivamente os cards.

**Mobile:**  
Cards empilhados verticalmente, um abaixo do outro. O plano Básico deve aparecer primeiro. Botões devem ocupar largura confortável para toque.

**Pontos de atenção:**  
Os textos dos benefícios não devem vazar dos cards. Botões `Em breve` precisam parecer indisponíveis mesmo em telas pequenas. A tela pode aparecer dentro da Home, mas também deve funcionar como página independente.

## Acessibilidade

- Botões devem ter texto claro.
- Botões desabilitados devem usar `disabled` ou `aria-disabled`.
- O estado `Em breve` não deve depender apenas da cor cinza.
- Benefícios marcados com ícones devem possuir texto legível.
- O contraste entre vermelho, branco, preto e cinza deve ser validado.
- Animações devem ser sutis e não impedir leitura ou navegação.

## Observações

Esta tela pode aparecer como uma seção dentro da Tela Inicial, mas não deve ser tratada exclusivamente como parte da Home. Ela também pode existir como etapa independente no fluxo de contratação do lojista.

No MVP, apenas o plano Básico está disponível. Premium e Exclusivo devem ser apresentados como evolução futura do produto.
