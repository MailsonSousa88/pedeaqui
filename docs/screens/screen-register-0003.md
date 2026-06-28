# Tela de Cadastro

## Identificação

**Nome da tela:**  
Cadastro de lojista

**Código da tela:**  
`SCREEN-AUTH-003`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, node `4:2`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Autenticação, contratação do serviço e cadastro inicial do lojista.

**Etapa do fluxo:**  
Tela exibida para usuários que ainda não possuem uma instância registrada no banco de dados ou para usuários que já compraram o serviço anteriormente e desejam contratar novamente.

**Tela anterior:**  
Tela de Planos, Tela Inicial, chamada de `Criar loja`, chamada de `Cadastrar` ou rota pública de cadastro.

**Próxima tela esperada:**  
Validação de CPF/CNPJ, configuração inicial da loja ou próxima etapa do fluxo de contratação.

## Objetivo

**Descrição da tela:**  
Tela usada para coletar os dados básicos de criação da conta do lojista no PedeAqui.

**Função principal:**  
Permitir que o lojista informe nome completo, e-mail, senha e CPF ou CNPJ para iniciar a criação da conta e seguir no fluxo de contratação.

**Ator principal:**  
Lojista em potencial.

**Atores secundários:**  
Usuário que deseja contratar novamente o serviço.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF012`, `RF013`, `RF014A`

**Requisitos não funcionais relacionados:**  
`RNF0004`, `RNF0015`, `RNF0016`, `RNF0018`

**Casos de uso relacionados:**  
`use-case-lojista-0001`

**Edge cases relacionados:**  
`edge-case-onboarding-0005-cadastro-incompleto-validacoes`

## Conteúdo da tela

**Título principal:**  
`Crie sua conta`

**Subtítulo ou texto de apoio:**  
`Preencha os dados abaixo para criar sua conta no PedeAqui.`

**Mensagens auxiliares:**  
`Ao cadastrar sua conta, você concorda com nossos Termos de Uso e Política de Privacidade.`

Os textos `Termos de Uso` e `Política de Privacidade` devem aparecer em vermelho e possuir comportamento visual de link. No hover, devem exibir underline vermelho.

## Elementos de interface

### Header

- Logo: `PedeAqui`, posicionada no canto superior esquerdo.
- Texto auxiliar: `Já tem uma conta?`, posicionado no canto superior direito.
- Botão ou link de ação: `Entrar`, ao lado do texto auxiliar.
- Ícones: ícone de entrada no botão `Entrar`, seguindo o padrão visual da tela.
- Ação alternativa: pode existir uma opção de `Voltar ao início` quando a tela for acessada como etapa isolada do fluxo de contratação.

### Card, seção ou área principal

- Tipo de container: card central de autenticação.
- Título: `Crie sua conta`.
- Subtítulo: `Preencha os dados abaixo para criar sua conta no PedeAqui.`
- Ícone principal: ícone de usuário com sinal de adição, dentro de um círculo suave em vermelho claro.
- Conteúdo: formulário de cadastro com quatro campos principais.
- Destaque visual: a palavra `conta` no título deve aparecer em vermelho.

### Formulários

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Nome completo | Texto | Sim | `Digite seu nome completo` | Não pode estar vazio | Deve possuir ícone representando usuário |
| E-mail | E-mail | Sim | `Digite seu e-mail` | Deve ser válido e único | Deve possuir ícone representando e-mail |
| Senha | Senha | Sim | `Crie uma senha com mínimo de 8 caracteres` | Mínimo de 8 caracteres | Deve possuir ícone de senha e botão de olho para mostrar ou ocultar |
| CPF ou CNPJ | Texto | Sim | `Digite seu CPF ou CNPJ` | Deve ter formato válido e dígitos verificadores válidos | Deve possuir ícone representando documento |

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Cadastrar | Botão primário | Habilitado após preenchimento válido | Envia os dados para criação da conta |
| Mostrar ou ocultar senha | Botão de ícone | Habilitado | Alterna a visualização do campo de senha |
| Entrar | Botão secundário no header | Habilitado | Leva para a tela de Login |
| Voltar ao início | Botão ou link secundário opcional | Habilitado | Retorna para a Tela Inicial |
| Termos de Uso | Link textual | Habilitado | Abre ou navega para os Termos de Uso |
| Política de Privacidade | Link textual | Habilitado | Abre ou navega para a Política de Privacidade |

### Links

| Link | Destino ou ação | Observação |
| --- | --- | --- |
| Entrar | Tela de Login | Deve ser usado por lojistas que já possuem conta |
| Voltar ao início | Tela Inicial | Pode existir para o lojista sair do fluxo sem cadastrar |
| Termos de Uso | Página ou documento legal | Texto vermelho com underline no hover |
| Política de Privacidade | Página ou documento legal | Texto vermelho com underline no hover |

## Estados da tela

**Estado inicial:**  
Logo no canto superior esquerdo, ação `Entrar` no canto superior direito, card central com ícone de criação de usuário, título, campos vazios, botão `Cadastrar` e mensagem legal abaixo do botão.

**Estado de carregamento:**  
Após clicar em `Cadastrar`, o botão deve indicar processamento e evitar múltiplos envios do mesmo formulário.

**Estado de erro:**  
Erros devem aparecer próximos aos campos relacionados. Exemplos: e-mail inválido, e-mail já cadastrado, senha curta, CPF/CNPJ inválido ou campos obrigatórios vazios.

**Estado de sucesso:**  
Cadastro criado com sucesso e usuário direcionado para a próxima etapa do fluxo definido pelo produto.

**Estado vazio:**  
Não se aplica.

## Validações

- Nome completo não pode estar vazio.
- E-mail deve possuir formato válido.
- E-mail duplicado deve impedir o cadastro.
- Senha deve possuir no mínimo 8 caracteres.
- CPF ou CNPJ deve possuir formato válido e dígitos verificadores válidos.
- O formulário não deve ser enviado mais de uma vez durante o carregamento.
- Links legais devem estar visíveis antes ou imediatamente após a ação de cadastro.

## Comportamento esperado

1. O lojista acessa a tela de Cadastro.
2. O sistema exibe a logo, o card de cadastro e a ação `Entrar` para quem já possui conta.
3. O lojista preenche nome completo, e-mail, senha e CPF ou CNPJ.
4. O lojista pode mostrar ou ocultar a senha pelo ícone de olho.
5. O lojista clica em `Cadastrar`.
6. O sistema valida os campos.
7. Se houver erro, o sistema exibe a mensagem no campo correspondente.
8. Se os dados forem válidos, o sistema cria a conta e direciona o lojista para a próxima etapa do fluxo.

## Design

**Layout:**  
Tela de autenticação com header fixo no topo visual, card central e fundo claro. O card não deve ocupar largura excessiva no desktop e não deve ficar apertado no mobile. O card deve seguir proporções comuns de telas de login e cadastro, com boa leitura e hierarquia clara.

**Cores principais:**  
Vermelho da marca para botão principal, links legais, ícones dos campos, destaque da palavra `conta`, detalhes de foco e elementos decorativos. Branco para card e fundo principal. Preto para títulos. Cinza para textos auxiliares, bordas e placeholders.

**Tipografia:**  
Título forte e direto. Labels e textos de apoio em tamanho confortável. Mensagem legal menor, mas legível.

**Espaçamentos:**  
Campos devem possuir espaço considerável entre si para evitar sensação de formulário apertado. Botão principal deve ficar visualmente separado dos inputs. Mensagem legal deve aparecer abaixo do botão com respiro suficiente.

**Componentes reutilizáveis:**  
`AuthHeader`, `AuthCard`, `TextInput`, `EmailInput`, `PasswordInput`, `DocumentInput`, `PrimaryButton`, `IconButton`, `LegalText`, `ReturnHomeLink`.

**Ícones:**  
Cada campo deve possuir um ícone representativo em vermelho: usuário para nome, envelope para e-mail, cadeado para senha e documento para CPF/CNPJ. O campo de senha deve possuir ícone de olho no lado direito para alternar visibilidade.

**Imagens ou ilustrações:**  
Podem existir detalhes sutis no background em vermelho, como forma orgânica no canto inferior esquerdo e padrões pontilhados em áreas laterais, desde que não prejudiquem leitura, contraste ou foco no formulário.

## Responsividade

**Desktop:**  
Header com logo à esquerda e ação de login à direita. Card centralizado com largura controlada. Background pode usar detalhes visuais vermelhos e padrões pontilhados. A tela não deve parecer vazia demais nem esticar o formulário.

**Mobile:**  
Card deve se adaptar à largura da tela com margens laterais confortáveis. Campos e botões devem ter altura adequada para toque. O conteúdo deve caber bem em telas menores, com rolagem quando necessário.

**Pontos de atenção:**  
O card não deve ficar grande demais no desktop, nem pequeno demais no mobile. Ícones não devem disputar espaço com o texto dos inputs. A mensagem legal não deve quebrar de forma confusa.

## Acessibilidade

- Todos os campos devem possuir label acessível.
- Ícones dos campos não devem substituir labels.
- O botão de olho da senha deve possuir descrição acessível, como `Mostrar senha` ou `Ocultar senha`.
- Links legais devem ser identificáveis além da cor vermelha, usando underline no hover e foco visível.
- Mensagens de erro devem ser associadas ao campo correspondente.
- O contraste entre texto, fundo, botão vermelho e estados de erro deve ser validado.
- A tela deve ser navegável por teclado.

## Observações

Esta tela é diferente da tela de Login. Cadastro deve ser usado para criação ou nova contratação do serviço. Lojistas que já possuem conta e apenas precisam acessar novamente devem usar a tela de Login.

O botão `Voltar ao início` deve permitir que o lojista abandone o cadastro sem ficar preso no fluxo.
