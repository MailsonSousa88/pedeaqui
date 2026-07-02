# Tela de Pré-configuração da Loja

## Identificação

**Nome da tela:**  
Pré-configuração da loja do lojista

**Código da tela:**  
`SCREEN-STORE-005`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, nodes `35:110`, `35:126` e `35:127`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Onboarding do lojista, criação inicial da loja e preparação antes do pagamento ou ativação.

**Etapa do fluxo:**  
Tela exibida após o cadastro do lojista, para que ele configure as informações obrigatórias da loja antes de seguir para revisão, pagamento ou próxima etapa do onboarding.

**Tela anterior:**  
Tela de Cadastro ou etapa equivalente de criação da conta.

**Próxima tela esperada:**  
Tela de Verificação do Pré-registro da Loja.

## Objetivo

**Descrição da tela:**  
Tela em formato de formulário por etapas, usada para coletar as informações iniciais da loja do lojista. O objetivo é garantir que, ao acessar o sistema e a página pública da loja, o lojista já tenha uma loja criada com as informações principais preenchidas.

**Função principal:**  
Permitir que o lojista informe identidade da loja, contato, horário de funcionamento, endereço e revise os dados antes de concluir a pré-configuração.

**Ator principal:**  
Lojista.

**Atores secundários:**  
Não definido.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF014A`, `RF016`, `RF017`

**Requisitos não funcionais relacionados:**  
`RNF0004`, `RNF0015`, `RNF0016`

**Casos de uso relacionados:**  
`use-case-lojista-0001`

**Edge cases relacionados:**  
`edge-case-onboarding-0005-cadastro-incompleto-validacoes`

## Conteúdo da tela

**Título principal:**  
`Configure sua loja`

**Subtítulo ou texto de apoio:**  
Texto orientando o lojista a preencher as informações obrigatórias da loja para continuar o onboarding.

**Mensagens auxiliares:**  
Cada campo deve possuir uma descrição curta abaixo dele, explicando como aquela informação será usada.

## Estrutura por etapas

### Etapa 1 de 3 - Identidade da loja

**Objetivo da etapa:**  
Coletar os dados principais de identificação, contato e funcionamento da loja.

**Título do card:**  
`Identidade da loja`

**Campos obrigatórios:**

| Campo | Tipo | Obrigatório | Placeholder ou exemplo | Descrição abaixo do campo |
| --- | --- | --- | --- | --- |
| Nome da loja | Texto | Sim | `Ex: Sabor do Chef` | Esse será o nome exibido para seus clientes. |
| E-mail de contato | E-mail | Sim | `contato@sualoja.com` | Esse e-mail será usado para contato com clientes e comunicações importantes. |
| Número de WhatsApp | Telefone | Sim | `(11) 91234-5678` | Esse número será usado para receber pedidos e mensagens. |
| Dia inicial de funcionamento | Seletor | Sim | `Segunda` | Informe o primeiro dia em que sua loja estará aberta. |
| Dia final de funcionamento | Seletor | Sim | `Sexta` | Informe o último dia em que sua loja estará aberta. |
| Horário de abertura | Seletor de horário | Sim | `06:00` | Informe o horário em que sua loja começa a atender. |
| Horário de fechamento | Seletor de horário | Sim | `17:00` | Informe o horário em que sua loja encerra o atendimento. |

**Comportamento dos seletores de dia:**  
O campo `De` deve abrir uma lista com os dias da semana. O campo `Até` deve abrir a mesma lista. O resultado representa o intervalo de funcionamento, como `Aberto de Segunda até Sexta`.

**Comportamento dos seletores de horário:**  
O campo de abertura e o campo de fechamento devem permitir seleção de horário. O resultado representa o intervalo de atendimento, como `06:00 até 17:00`.

**Botões da etapa:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Continuar | Botão primário | Habilitado após preenchimento válido | Avança para a etapa de Endereço da loja |
| Voltar ao cadastro | Botão secundário | Habilitado | Retorna para a tela de Cadastro |

**Observação da etapa:**  
Esta etapa não deve conter upload de foto, logotipo, imagem de perfil ou banner da loja.

### Etapa 2 de 3 - Endereço da loja

**Objetivo da etapa:**  
Coletar o endereço completo da loja.

**Título do card:**  
`Endereço da loja`

**Campos obrigatórios:**

| Campo | Tipo | Obrigatório | Placeholder ou exemplo | Descrição abaixo do campo |
| --- | --- | --- | --- | --- |
| Estado | Texto | Sim | `Ex: São Paulo` | Informe o estado onde sua loja está localizada. |
| Cidade | Texto | Sim | `Ex: São Paulo` | Informe a cidade da sua loja. |
| Bairro | Texto | Sim | `Ex: Centro` | Informe o bairro onde sua loja atende. |
| Rua | Texto | Sim | `Ex: Rua das Flores` | Informe o nome da rua da loja. |
| Número residencial ou comercial | Texto ou número | Sim | `Ex: 123` | Informe o número do endereço da loja. |

**Botões da etapa:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Continuar | Botão primário | Habilitado após preenchimento válido | Avança para a etapa de Revisão |
| Voltar | Botão secundário | Habilitado | Retorna para a etapa de Identidade da loja |

**Observação da etapa:**  
Esta etapa deve conter apenas informações de endereço. Dados de contato e funcionamento pertencem à etapa 1.

### Etapa 3 de 3 - Revisão da loja

**Objetivo da etapa:**  
Permitir que o lojista confira os dados preenchidos antes de finalizar a pré-configuração.

**Título do card:**  
`Revisão da loja`

**Blocos de revisão:**

| Bloco | Informações exibidas | Ação disponível |
| --- | --- | --- |
| Identidade da loja | Nome da loja, e-mail de contato, WhatsApp, dias de funcionamento e horário de funcionamento | `Editar` |
| Endereço da loja | Estado, cidade, bairro, rua e número | `Editar` |

**Comportamento da revisão:**  
Os dados devem ser apresentados como resumo revisável, sem edição direta dentro da etapa 3. Ao clicar em `Editar`, o lojista deve voltar para a etapa correspondente.

**Botões da etapa:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Finalizar | Botão primário | Habilitado com dados válidos | Envia o payload para validação no backend e avança para a tela de Verificação do Pré-registro da Loja |
| Voltar | Botão secundário | Habilitado | Retorna para a etapa de Endereço da loja |

## Elementos de interface

### Header

- Logo: `PedeAqui`, posicionada no topo.
- Indicador de etapa: `Etapa 1 de 3`, `Etapa 2 de 3` ou `Etapa 3 de 3`.
- Barra de progresso: 3 segmentos, destacando o avanço atual em vermelho.
- Título principal: `Configure sua loja`.
- Subtítulo: muda conforme a etapa, mas deve orientar o lojista sobre o preenchimento atual.

### Cards

- Tipo de container: card branco centralizado.
- Borda: suave.
- Sombra: leve.
- Espaçamento interno: confortável.
- Organização: campos empilhados no mobile e organizados com largura controlada no desktop.

### Ícones

- Cada input deve possuir um ícone representativo dentro do campo.
- Quando não houver o ícone exato disponível, deve ser usado um ícone com sentido próximo.
- Ícones devem seguir a cor vermelha da marca quando estiverem em estado padrão.
- Exemplos de equivalência:
  - Loja, etiqueta ou prédio comercial para identidade da loja;
  - Envelope para e-mail;
  - WhatsApp, telefone ou mensagem para número de WhatsApp;
  - Calendário para dias de funcionamento;
  - Relógio para horários;
  - Pin de localização para endereço;
  - Mapa ou globo para estado/cidade;
  - Casa, rua ou mapa para bairro, rua e número;
  - Check ou confirmação para revisão.

## Estados da tela

**Estado inicial:**  
Etapa 1 aberta, com indicador `Etapa 1 de 3`, barra de progresso no primeiro segmento e card de identidade da loja.

**Estado de carregamento:**  
Ao avançar ou finalizar, o botão acionado deve indicar processamento e impedir múltiplos envios.

**Estado de erro:**  
Erros devem aparecer próximos aos campos correspondentes. Campos obrigatórios vazios, e-mail inválido, WhatsApp em formato inválido, horário inconsistente ou endereço incompleto devem impedir avanço.

**Estado de sucesso:**  
Ao concluir a etapa 3, o frontend deve enviar os dados para validação no backend e o lojista deve avançar para a tela de Verificação do Pré-registro da Loja.

**Estado vazio:**  
Não se aplica. Todos os campos das etapas 1 e 2 são obrigatórios.

## Validações

- Nenhum campo das etapas 1 e 2 deve ser opcional.
- Nome da loja não pode estar vazio.
- E-mail de contato deve possuir formato válido.
- WhatsApp deve possuir formato válido.
- Dia inicial e dia final de funcionamento devem ser preenchidos.
- Horário de abertura e horário de fechamento devem ser preenchidos.
- Horário de fechamento deve ser posterior ao horário de abertura quando o atendimento ocorrer no mesmo dia.
- Estado, cidade, bairro, rua e número devem ser preenchidos.
- A etapa 3 deve refletir exatamente os dados preenchidos nas etapas anteriores.

## Comportamento esperado

1. O lojista conclui o cadastro e acessa a pré-configuração da loja.
2. O sistema exibe a etapa 1 de 3.
3. O lojista preenche identidade, e-mail, WhatsApp e horário de funcionamento.
4. O lojista clica em `Continuar`.
5. O sistema valida a etapa 1 e avança para a etapa 2.
6. O lojista preenche o endereço completo da loja.
7. O lojista clica em `Continuar`.
8. O sistema valida a etapa 2 e avança para a etapa 3.
9. O lojista revisa os dados preenchidos.
10. O lojista pode editar uma etapa específica ou finalizar.
11. Ao clicar em `Finalizar`, o frontend envia o payload para o backend e avança para a tela de Verificação do Pré-registro da Loja.

## Design

**Layout:**  
Fluxo mobile-first com uma etapa por vez. A tela deve usar card central, barra de progresso e botões no final do card. A interface deve ser clara, leve e fácil de preencher em telas pequenas.

**Cores principais:**  
Vermelho da marca para progresso, ícones, botões primários e destaques. Branco para cards. Preto para títulos. Cinza para descrições, bordas, placeholders e textos secundários.

**Tipografia:**  
Título principal forte. Título do card com peso intermediário. Labels claros. Descrições abaixo dos campos em tamanho menor, mas legíveis.

**Espaçamentos:**  
Campos devem possuir espaço suficiente entre si. Descrições devem ficar próximas ao campo correspondente, sem parecer desconectadas. Botões devem ficar separados do formulário.

**Componentes reutilizáveis:**  
`OnboardingHeader`, `StepIndicator`, `ProgressBar`, `OnboardingCard`, `TextInput`, `EmailInput`, `PhoneInput`, `DaySelect`, `TimeSelect`, `ReviewBlock`, `PrimaryButton`, `SecondaryButton`.

**Ícones:**  
Ícones devem reforçar a função de cada campo. Se o ícone exato não existir na biblioteca usada, utilizar equivalente de sentido próximo.

**Imagens ou ilustrações:**  
Não usar imagens de produto, logotipo, perfil ou banner nesta tela. Elementos visuais decorativos podem existir, desde que sejam discretos e não prejudiquem leitura.

## Responsividade

**Desktop:**  
O fluxo deve continuar sendo por etapas, mas o card pode ter largura maior e layout mais confortável. Campos relacionados podem ser organizados lado a lado, como `De/Até` e `Abertura/Fechamento`. A tela não deve ficar com formulário excessivamente largo.

**Mobile:**  
Mobile-first. Campos devem ser empilhados verticalmente, com seletores lado a lado apenas quando couber com boa leitura. Botões devem ter área de toque confortável.

**Pontos de atenção:**  
A versão antiga das wireframes serve como referência visual, mas o conteúdo foi atualizado. A etapa 1 não deve conter upload de imagens. A etapa 2 não deve misturar contato com endereço. A etapa 3 deve revisar apenas os dados coletados nas etapas 1 e 2.

## Acessibilidade

- Todos os campos devem possuir label acessível.
- Ícones não devem substituir labels.
- Seletores de dia e horário devem ser navegáveis por teclado.
- O indicador de etapa não deve depender apenas da cor.
- Mensagens de erro devem ser associadas aos campos correspondentes.
- Botões devem possuir texto claro.
- O contraste entre vermelho, branco, preto e cinza deve ser validado.
- A tela deve permitir avanço e retorno sem perda acidental dos dados preenchidos.

## Observações

Esta tela representa a pré-configuração inicial da loja, não o cadastro completo de imagens da loja. Logotipo, imagem de perfil e banner devem ser tratados em telas ou etapas próprias, caso o produto decida permitir essa configuração posteriormente.

As wireframes antigas continuam úteis como referência de linguagem visual, mas a documentação desta tela segue o fluxo atualizado definido para o produto.
