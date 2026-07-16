# Tela de Revisão e Redirecionamento para Pagamento

## Identificação

**Nome da tela:**  
Revisão do plano e redirecionamento para pagamento

**Código da tela:**  
`SCREEN-CHECKOUT-007`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, node `12:170`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Onboarding do lojista, revisão do plano selecionado e pagamento da assinatura.

**Etapa do fluxo:**  
Tela exibida após o lojista escolher um plano, concluir o cadastro e preencher as informações obrigatórias da loja.

**Tela anterior:**  
Tela de Pré-configuração da Loja ou etapa final de revisão dos dados da loja.

**Próxima tela esperada:**  
Ambiente seguro da Stripe para concluir o pagamento.

## Objetivo

**Descrição da tela:**  
Tela de revisão onde o lojista confere o plano escolhido, entende os benefícios incluídos, visualiza métodos de pagamento aceitos e segue para o pagamento seguro.

**Função principal:**  
Permitir que o lojista confirme que deseja continuar com o plano selecionado e seja redirecionado para a Stripe.

**Ator principal:**  
Lojista.

**Atores secundários:**  
Não definido.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF014A`, `RF014B`, `RF016`, `RF031`

**Requisitos não funcionais relacionados:**  
`RNF0003`, `RNF0010`, `RNF0018`

**Casos de uso relacionados:**  
`use-case-lojista-0001`

**Edge cases relacionados:**  
`edge-case-payment-0002-webhook-pagamento`, `edge-case-subscription-0001`, `edge-case-subscription-0003-inadimplencia-e-status`

## Conteúdo da tela

**Título principal:**  
`Finalize sua ativação`

**Subtítulo ou texto de apoio:**  
`Revise seu plano e siga para o pagamento seguro.`

**Mensagens auxiliares:**  
Textos informando que o pagamento é seguro, processado pela Stripe, e que os dados financeiros não são armazenados pelo PedeAqui.

## Elementos de interface

### Header

- Logo: `PedeAqui`, posicionada no canto superior esquerdo.
- Badge de status: `Plano selecionado`, posicionado no canto superior direito.
- Ícone do badge: check ou confirmação em vermelho.

### Área principal

- Tipo de container: card central branco com sombra leve.
- Ícone principal: cartão de pagamento com escudo, em vermelho, dentro de círculo suave.
- Título: `Finalize sua ativação`.
- Subtítulo: `Revise seu plano e siga para o pagamento seguro.`

### Card do plano selecionado

- Nome do plano: `Plano Básico`.
- Valor: `R$ 29,99/mês`.
- Badge: `Cobrança mensal`.
- Ícone: loja, vitrine ou equivalente.

**Benefícios exibidos:**

- `Criar loja no PedeAqui`
- `Cadastrar produtos`
- `Receber pedidos dos clientes`
- `Gerenciar pedidos recebidos`

### Métodos de pagamento aceitos

| Método | Texto exibido | Observação |
| --- | --- | --- |
| PIX | `Pagamento instantâneo` | Deve usar ícone relacionado a PIX |
| Cartão de crédito | `Visa, Mastercard, Elo, e mais` | Deve usar ícone de cartão |

### Aviso de pagamento seguro

- Título: `Pagamento 100% seguro`.
- Texto principal: `Processado com segurança pela Stripe.`
- Texto auxiliar: `Seus dados financeiros não são armazenados pelo PedeAqui.`
- Ícone: escudo, cadeado ou equivalente.

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Continuar para pagamento | Botão primário vermelho | Habilitado quando a revisão está válida | Redireciona o lojista para o ambiente seguro da Stripe |
| Voltar | Botão secundário com contorno vermelho | Habilitado | Retorna para a etapa anterior do onboarding sem apagar os dados preenchidos |

### Mensagem abaixo do botão

`Você será redirecionado para o ambiente seguro da Stripe para concluir o pagamento.`

Essa mensagem deve ser exibida com ícone de escudo, cadeado ou segurança.

## Estados da tela

**Estado inicial:**  
Header com logo e badge `Plano selecionado`, card central com plano Básico, benefícios, métodos de pagamento, aviso de segurança, botão `Continuar para pagamento` e botão secundário `Voltar`.

**Estado de carregamento:**  
Após clicar em `Continuar para pagamento`, o botão deve indicar processamento e impedir múltiplos cliques enquanto o redirecionamento é preparado.

**Estado de erro:**  
Se o sistema não conseguir iniciar o pagamento, deve exibir mensagem clara sem apagar os dados da revisão. Exemplos: falha ao criar sessão de checkout, plano indisponível, lojista sem loja configurada ou WhatsApp não informado.

**Estado de sucesso:**  
O lojista é redirecionado para o ambiente seguro da Stripe.

**Estado vazio:**  
Não se aplica. A tela depende de um plano selecionado e de uma conta em onboarding.

## Validações

- Deve existir um plano selecionado antes de exibir a tela.
- O valor do plano deve ser obtido da configuração do sistema, não digitado manualmente na interface.
- O plano Básico deve exibir `R$ 29,99/mês` enquanto esse for o valor aprovado para o MVP.
- O lojista deve possuir cadastro iniciado e loja criada no onboarding.
- O WhatsApp da loja deve estar informado antes de permitir redirecionamento para pagamento.
- O botão não deve permitir múltiplos redirecionamentos simultâneos.
- O botão `Voltar` não deve apagar dados já preenchidos no onboarding.
- O botão `Voltar` não deve alterar o plano selecionado.
- A ativação do lojista não deve ocorrer nesta tela; deve ocorrer apenas após confirmação de pagamento via webhook.

## Comportamento esperado

1. O lojista conclui as etapas anteriores do onboarding.
2. O sistema exibe o plano selecionado e os benefícios incluídos.
3. O lojista revisa o plano, valor e métodos de pagamento aceitos.
4. O lojista lê o aviso de pagamento seguro.
5. O lojista pode clicar em `Voltar` para revisar a etapa anterior sem perder os dados preenchidos.
6. O lojista clica em `Continuar para pagamento`.
7. O sistema prepara a sessão de pagamento.
8. O lojista é redirecionado para a Stripe.
9. Após o pagamento, o status do lojista deve ser atualizado somente por confirmação válida do webhook.

## Design

**Layout:**  
Tela mobile-first com header simples, card central e conteúdo empilhado. A hierarquia deve deixar claro que o lojista está revisando o plano antes de sair para pagamento.

**Cores principais:**  
Vermelho da marca para ícones, preço, botão principal, badges e destaques. Branco para fundo e cards. Preto para títulos. Cinza para textos auxiliares e bordas.

**Tipografia:**  
Título forte e direto. Valor do plano com destaque visual. Benefícios e métodos de pagamento com textos curtos e escaneáveis.

**Espaçamentos:**  
Blocos devem ter respiro entre plano, métodos de pagamento, aviso de segurança e botões. O botão primário deve ficar em destaque no final do card, seguido pelo botão secundário `Voltar`.

**Componentes reutilizáveis:**  
`CheckoutHeader`, `StatusBadge`, `CheckoutCard`, `SelectedPlanCard`, `BenefitList`, `PaymentMethodCard`, `SecurityNotice`, `PrimaryButton`, `OutlineButton`.

**Ícones:**  
Cartão com escudo para a tela, loja para o plano, checks para benefícios, PIX para pagamento instantâneo, cartão para crédito e escudo/cadeado para segurança.

**Imagens ou ilustrações:**  
Não usar imagens externas. A tela deve depender de ícones e composição visual limpa.

## Responsividade

**Desktop:**  
Card centralizado com largura controlada. Métodos de pagamento podem aparecer lado a lado. A tela não deve esticar o card em excesso.

**Mobile:**  
Mobile-first. Conteúdo empilhado, botões com largura confortável e métodos de pagamento em blocos legíveis. O badge `Plano selecionado` deve caber no header sem quebrar a logo.

**Pontos de atenção:**  
Esta tela não deve pedir dados de cartão ou PIX diretamente. O pagamento deve ocorrer no ambiente seguro da Stripe. O usuário não deve interpretar esta tela como confirmação final de ativação; ela é apenas revisão e redirecionamento.

O botão `Voltar` deve seguir o padrão visual dos botões secundários do fluxo: fundo branco, borda vermelha, texto vermelho, bordas arredondadas e largura semelhante à do botão primário. Ele deve retornar para a tela anterior do onboarding sem cancelar o cadastro, sem limpar os dados preenchidos e sem trocar o plano selecionado.

## Acessibilidade

- O botão principal deve ter texto claro.
- Ícones não devem substituir textos.
- O preço deve ser anunciado com periodicidade: `R$ 29,99 por mês`.
- O badge `Plano selecionado` deve ter texto visível.
- O aviso de segurança deve ser legível e não depender apenas do ícone.
- Contraste entre vermelho, branco, preto e cinza deve ser validado.
- A tela deve ser navegável por teclado.

## Observações

Esta tela também pode ser chamada internamente de `Tela de Revisão`, mas sua função no fluxo é revisar o plano e redirecionar o lojista para pagamento.

O PedeAqui não deve armazenar dados financeiros do lojista. A confirmação de pagamento e ativação do lojista devem depender do retorno seguro da Stripe e validação do webhook no backend.
