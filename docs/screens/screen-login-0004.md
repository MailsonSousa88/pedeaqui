# Tela de Login

## Identificação

**Nome da tela:**  
Login de lojista

**Código da tela:**  
`SCREEN-AUTH-004`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, node `5:17`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Autenticação e acesso do lojista.

**Etapa do fluxo:**  
Tela exibida para lojistas que já possuem conta e precisam acessar novamente o PedeAqui.

**Tela anterior:**  
Tela Inicial, Tela de Cadastro, fluxo de sessão expirada ou tentativa de acesso a uma área protegida.

**Próxima tela esperada:**  
Painel do lojista, etapa pendente do onboarding, tela de recuperação de senha ou tela de Cadastro.

## Objetivo

**Descrição da tela:**  
Tela usada para autenticar lojistas já cadastrados no PedeAqui usando e-mail e senha.

**Função principal:**  
Permitir que o lojista entre na própria conta e continue usando o sistema sem precisar refazer o cadastro.

**Ator principal:**  
Lojista.

**Atores secundários:**  
Usuário já cadastrado com sessão expirada.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF011`, `RF012`, `RF015`

**Requisitos não funcionais relacionados:**  
`RNF0001`, `RNF0004`, `RNF0009`, `RNF0015`, `RNF0016`

**Casos de uso relacionados:**  
`use-case-lojista-0001`

**Edge cases relacionados:**  
`edge-case-onboarding-0005-cadastro-incompleto-validacoes`

## Conteúdo da tela

**Título principal:**  
`Entrar na sua conta`

**Subtítulo ou texto de apoio:**  
`Digite seu e-mail e senha para acessar sua conta no PedeAqui.`

**Mensagens auxiliares:**  
`Esqueci minha senha`

`Não tem uma conta? Cadastre-se`

## Elementos de interface

### Header

- Logo: `PedeAqui`, posicionada no canto superior esquerdo.
- Texto auxiliar: `Não tem uma conta?`, posicionado no canto superior direito.
- Botão ou link de ação: `Cadastrar`, ao lado do texto auxiliar.
- Ícones: ícone de usuário com sinal de adição no botão `Cadastrar`, seguindo o padrão visual da tela.
- Ação alternativa: pode existir uma opção de `Voltar ao início` quando a tela for acessada como etapa isolada.

### Card, seção ou área principal

- Tipo de container: card central de autenticação.
- Título: `Entrar na sua conta`.
- Subtítulo: `Digite seu e-mail e senha para acessar sua conta no PedeAqui.`
- Ícone principal: ícone representativo de login, dentro de um círculo suave em vermelho claro.
- Conteúdo: formulário de login com e-mail e senha, link de recuperação, botão principal, divisor `ou` e chamada para cadastro.
- Destaque visual: a palavra `Entrar` no título deve aparecer em vermelho.

### Formulários

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| E-mail | E-mail | Sim | `Digite seu e-mail` | Deve possuir formato válido | Deve possuir ícone representando e-mail |
| Senha | Senha | Sim | `Digite sua senha` | Não pode estar vazia | Deve possuir ícone de senha e botão de olho para mostrar ou ocultar |

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Entrar | Botão primário | Habilitado após preenchimento válido | Envia as credenciais para autenticação |
| Mostrar ou ocultar senha | Botão de ícone | Habilitado | Alterna a visualização do campo de senha |
| Esqueci minha senha | Link textual | Habilitado | Leva para o fluxo de recuperação de senha |
| Cadastrar | Botão secundário no header | Habilitado | Leva para a tela de Cadastro |
| Cadastre-se | Link textual dentro do card | Habilitado | Leva para a tela de Cadastro |
| Voltar ao início | Botão ou link secundário opcional | Habilitado | Retorna para a Tela Inicial |

### Links

| Link | Destino ou ação | Observação |
| --- | --- | --- |
| Esqueci minha senha | Tela ou fluxo de recuperação de senha | Deve ficar abaixo do campo de senha, alinhado à direita |
| Cadastrar | Tela de Cadastro | Usado por quem ainda não possui conta |
| Cadastre-se | Tela de Cadastro | Deve aparecer após o divisor `ou` |
| Voltar ao início | Tela Inicial | Pode existir para o lojista sair do fluxo |

## Estados da tela

**Estado inicial:**  
Logo no canto superior esquerdo, ação `Cadastrar` no canto superior direito, card central com ícone de login, título, campos vazios, link `Esqueci minha senha`, botão `Entrar`, divisor `ou` e convite para cadastro.

**Estado de carregamento:**  
Após clicar em `Entrar`, o botão deve indicar processamento e evitar múltiplos envios das mesmas credenciais.

**Estado de erro:**  
Erros devem aparecer próximos aos campos ou em uma mensagem geral no card. Exemplos: e-mail inválido, senha vazia, credenciais inválidas ou conta sem permissão para acessar determinada área.

**Estado de sucesso:**  
Login realizado com sucesso e lojista direcionado para o painel, etapa pendente do onboarding ou destino protegido solicitado antes da autenticação.

**Estado vazio:**  
Não se aplica.

## Validações

- E-mail deve possuir formato válido.
- Senha não pode estar vazia.
- Credenciais inválidas devem impedir o acesso.
- O formulário não deve ser enviado mais de uma vez durante o carregamento.
- O link `Esqueci minha senha` deve estar disponível antes do envio do formulário.
- Usuários sem conta devem ser direcionados ao cadastro, não ao fluxo de recuperação.

## Comportamento esperado

1. O lojista acessa a tela de Login.
2. O sistema exibe a logo, o card de login e a ação `Cadastrar` para quem ainda não possui conta.
3. O lojista preenche e-mail e senha.
4. O lojista pode mostrar ou ocultar a senha pelo ícone de olho.
5. O lojista pode acessar `Esqueci minha senha` caso não lembre a senha.
6. O lojista clica em `Entrar`.
7. O sistema valida os campos e autentica as credenciais.
8. Se houver erro, o sistema exibe a mensagem adequada.
9. Se os dados forem válidos, o sistema direciona o lojista para a área correta.

## Design

**Layout:**  
Tela de autenticação com header no topo visual, card central e fundo claro. O card deve ser menor que o de cadastro, pois possui apenas dois campos. A estrutura visual deve manter consistência com a Tela de Cadastro.

**Cores principais:**  
Vermelho da marca para botão principal, link `Esqueci minha senha`, link `Cadastre-se`, ícones dos campos, destaque da palavra `Entrar` e elementos decorativos. Branco para card e fundo principal. Preto para títulos. Cinza para textos auxiliares, divisor, bordas e placeholders.

**Tipografia:**  
Título forte e direto. Subtítulo em tamanho menor e com leitura confortável. Labels dos campos devem ser claros. Links auxiliares devem ser menores, mas ainda legíveis.

**Espaçamentos:**  
Campos devem possuir espaço confortável entre si. O link `Esqueci minha senha` deve ficar visualmente associado ao campo de senha. O divisor `ou` deve separar o login da chamada de cadastro sem pesar visualmente.

**Componentes reutilizáveis:**  
`AuthHeader`, `AuthCard`, `EmailInput`, `PasswordInput`, `PrimaryButton`, `IconButton`, `DividerWithText`, `AuthSwitchLink`, `ReturnHomeLink`.

**Ícones:**  
Ícone principal de login no topo do card. Ícone de envelope no campo de e-mail. Ícone de cadeado no campo de senha. Ícone de olho no lado direito do campo de senha para alternar visibilidade. Ícone de usuário com adição no botão `Cadastrar`.

**Imagens ou ilustrações:**  
Podem existir detalhes sutis no background em vermelho, como forma orgânica no canto inferior esquerdo e padrões pontilhados em áreas laterais, seguindo o mesmo padrão da Tela de Cadastro.

## Responsividade

**Desktop:**  
Header com logo à esquerda e ação de cadastro à direita. Card centralizado com largura controlada. O formulário não deve se esticar demais e deve manter proporção de tela de login.

**Mobile:**  
Card deve se adaptar à largura da tela com margens laterais confortáveis. Campos e botões devem ter altura adequada para toque. O divisor `ou` e o texto `Não tem uma conta? Cadastre-se` devem permanecer legíveis.

**Pontos de atenção:**  
O link `Esqueci minha senha` não deve ficar pequeno demais no mobile. O divisor `ou` não deve encostar no botão `Entrar` nem na chamada de cadastro. Ícones não devem disputar espaço com os placeholders.

## Acessibilidade

- Todos os campos devem possuir label acessível.
- Ícones dos campos não devem substituir labels.
- O botão de olho da senha deve possuir descrição acessível, como `Mostrar senha` ou `Ocultar senha`.
- Links auxiliares devem possuir foco visível.
- O divisor `ou` deve ser tratado como conteúdo visual, sem atrapalhar leitores de tela.
- Mensagens de erro devem ser associadas ao campo correspondente ou ao formulário.
- O contraste entre texto, fundo, botão vermelho e links deve ser validado.
- A tela deve ser navegável por teclado.

## Observações

Esta tela é diferente da tela de Cadastro. Login deve ser usado por lojistas já cadastrados, inclusive quando o `refresh token` expirar e o lojista precisar entrar novamente.

Usuários sem conta devem ser direcionados para `Cadastrar` ou `Cadastre-se`, evitando tentativa de login sem cadastro prévio.
