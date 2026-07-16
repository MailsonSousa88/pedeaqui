# Spec: Login de lojista

## Objetivo

Definir a interface da primeira versão da tela de login para lojistas já cadastrados, permitindo o preenchimento de e-mail e senha e o feedback de validações locais, sem implementar backend, autenticação real ou navegação após a interação com o formulário.

## Fonte da Tela

- Screen esperada: `../../docs/screens/screen-login-0004.md`
- Referência visual fornecida: `src/assets/Tela-login.png`
- Referência de consistência visual: tela de cadastro de lojista
- Flow: `merchant-flow`
- Posição no fluxo: entrada de lojistas que já possuem conta, inclusive após sessão expirada ou tentativa de acesso a uma área protegida
- RFs/RNFs relacionados: RF011, RF012, RF015, RNF0001, RNF0004, RNF0009, RNF0015 e RNF0016, observadas somente as partes aplicáveis à interface local desta etapa
- Use case relacionado: `use-case-lojista-0001`
- User story: acesso de lojista já cadastrado
- Edge cases aplicáveis nesta etapa: campo obrigatório ausente e e-mail em formato inválido

## Escopo

- Exibir uma tela de login visualmente consistente com a tela de cadastro.
- Exibir header sticky com a marca PedeAqui à esquerda e a alternativa visual de cadastro à direita.
- Exibir card central de login com título, texto de apoio e formulário.
- Coletar somente e-mail e senha.
- Aplicar validações locais de preenchimento obrigatório e formato de e-mail.
- Permitir mostrar e ocultar o conteúdo do campo de senha.
- Exibir as ações auxiliares `Esqueci minha senha`, `Cadastrar` e `Cadastre-se` conforme a referência visual, com `Esqueci minha senha` navegando para a tela de recuperação de senha e `Cadastrar`/`Cadastre-se` seguindo o comportamento já existente da tela.
- Manter comportamento responsivo e acessível em desktop e mobile.

## Fora de Escopo

- Campos `Nome`, `Nome completo`, `CPF/CNPJ`, `CPF ou CNPJ` e `Confirmar senha`.
- Backend, endpoints, persistência, Supabase ou qualquer integração remota.
- Autenticação real, criação ou renovação de sessão e validação de credenciais.
- Estados remotos de carregamento, credenciais inválidas, sucesso de autenticação ou falta de permissão.
- Navegação ou redirecionamento pós-login.
- Navegação das ações `Cadastrar` e `Cadastre-se` fora do comportamento já implementado da tela.
- Definição do destino após o acionamento de `Entrar`.
- Ação `Voltar ao início`.
- Recuperação ou redefinição de senha.
- Cadastro de usuário dentro desta feature.
- Login social.

## Requisitos Funcionais

### RF-FE-001

Como lojista já cadastrado, quero visualizar e preencher um formulário simples de login, para informar meus dados de acesso.

Critérios de aceite:

- A tela deve apresentar somente os campos `E-mail` e `Senha`, nesta ordem.
- Os dois campos devem ser obrigatórios.
- A tela não deve apresentar os campos `Nome`, `Nome completo`, `CPF/CNPJ`, `CPF ou CNPJ` ou `Confirmar senha`.
- O campo `E-mail` deve usar o placeholder `Digite seu e-mail`.
- O campo `Senha` deve usar o placeholder `Digite sua senha`.
- A interface deve apresentar um botão principal `Entrar`.
- Com os campos localmente válidos, acionar `Entrar` não deve autenticar, chamar backend, navegar para outra tela nem exibir mensagem de sucesso nesta etapa.

### RF-FE-002

Como lojista, quero receber feedback das validações locais previstas, para corrigir os dados básicos antes de tentar entrar.

Critérios de aceite:

- A interação com `Entrar` deve validar localmente os dois campos.
- O avanço local do formulário deve ser bloqueado quando qualquer campo obrigatório estiver vazio.
- O e-mail deve ser validado somente quanto ao formato.
- A senha deve ser validada somente quanto ao preenchimento obrigatório, sem regra de tamanho ou complexidade nesta etapa.
- Erros devem aparecer próximos aos campos afetados e ser associados a eles de forma acessível.
- Não deve existir mensagem de credenciais inválidas, pois não há autenticação real.

### RF-FE-003

Como lojista, quero mostrar ou ocultar a senha digitada, para conferir o conteúdo com segurança e conveniência.

Critérios de aceite:

- O campo `Senha` deve iniciar com o conteúdo oculto.
- Um botão de ícone deve alternar entre conteúdo oculto e visível sem alterar o valor digitado.
- O controle deve possuir nome acessível coerente com o estado, como `Mostrar senha` e `Ocultar senha`.

### RF-FE-004

Como visitante sem conta ou que esqueceu a senha, quero identificar visualmente as alternativas disponíveis, para reconhecer os fluxos relacionados.

Critérios de aceite:

- O header deve exibir `Não tem uma conta?` e a ação `Cadastrar`.
- O card deve exibir a ação `Esqueci minha senha` abaixo do campo de senha, alinhada à direita.
- O card deve exibir um divisor `ou` e a chamada `Não tem uma conta? Cadastre-se`.
- As ações auxiliares devem possuir foco visível e aparência interativa.
- `Cadastrar` e `Cadastre-se` devem seguir o comportamento já existente da tela.
- `Esqueci minha senha` deve navegar para a tela de recuperação de senha por meio de callback centralizado em `App.tsx`.
- A ação `Voltar ao início` não deve ser incluída nesta primeira implementação.

### RF-FE-005

Como usuário, quero reconhecer a tela de login como parte do PedeAqui, para ter uma experiência consistente com o cadastro.

Critérios de aceite:

- A composição deve seguir o mesmo padrão visual da tela de cadastro: fundo claro, header, card branco centralizado, vermelho da marca, tipografia, bordas, sombras, espaçamentos e elementos decorativos equivalentes.
- O card de login deve ser proporcional ao conteúdo de dois campos e pode ser menor que o card de cadastro.
- O título deve ser `Entrar na sua conta`, com a palavra `Entrar` destacada em vermelho.
- O texto de apoio deve ser `Digite seu e-mail e senha para acessar sua conta no PedeAqui.`, com `PedeAqui` destacado em vermelho.
- O card deve exibir um ícone representativo de entrada em um círculo de fundo vermelho claro.
- O campo de e-mail deve exibir ícone de envelope e o campo de senha, ícone de cadeado.
- O header deve permanecer sticky no topo durante a rolagem, sem cobrir o conteúdo principal.
- Em telas menores, card, campos, botões, divisor e ações auxiliares devem preservar legibilidade, margens confortáveis e área adequada para toque.
- Em mobile, os elementos decorativos do fundo podem ser simplificados para preservar a legibilidade.

## Estados

- Inicial: campos vazios, senha oculta e nenhuma mensagem de erro.
- Preenchido: valores mantidos localmente nos campos.
- Senha visível: conteúdo da senha temporariamente revelado pelo controle de alternância.
- Erro de campo obrigatório: mensagem local próxima ao campo vazio.
- Erro de formato de e-mail: mensagem local próxima ao campo de e-mail.

Não fazem parte desta etapa os estados de autenticação, carregamento remoto, credenciais inválidas, falta de permissão ou sucesso pós-login.

## Conteúdo da Tela

- Header sticky:
  - Logo oficial PedeAqui à esquerda.
  - Texto `Não tem uma conta?` à direita.
  - Ação visual `Cadastrar` com ícone de usuário com adição.
- Card:
  - Ícone principal de entrada.
  - Título `Entrar na sua conta`.
  - Texto de apoio `Digite seu e-mail e senha para acessar sua conta no PedeAqui.`
- Campos, nesta ordem:
  - `E-mail`.
  - `Senha`.
- Botões e ações visuais:
  - Controle para mostrar ou ocultar senha.
  - `Esqueci minha senha`.
  - `Entrar`.
  - `Cadastrar`.
  - `Cadastre-se`.
- Separador:
  - `ou` entre o botão principal e a chamada para cadastro.
- Elementos não presentes:
  - Nome.
  - CPF/CNPJ.
  - Confirmar senha.

## Comportamento

1. A tela é exibida com o header sticky, o card central e os campos vazios.
2. O lojista preenche e-mail e senha.
3. O lojista pode alternar a visibilidade da senha sem perder o valor digitado.
4. Ao acionar `Entrar`, a interface executa somente as validações locais previstas.
5. Se houver erro local, a interface o apresenta próximo ao campo correspondente e mantém os valores já preenchidos.
6. Se os campos forem localmente válidos, nenhuma autenticação, requisição, mensagem de sucesso ou navegação pós-login é executada nesta etapa.6. Ao acionar `Esqueci minha senha`, a interface navega para a tela de recuperação de senha sem executar backend, envio real de e-mail ou outra integração remota.
## Dependências Externas

- Referência visual `src/assets/Tela-login.png` para composição e conteúdo da tela.
- Padrão visual da tela de cadastro para consistência entre as interfaces de autenticação.
- Logo oficial disponível em `/logoPedeAqui.jpeg`.
- Ícones compatíveis com a stack oficial do frontend, sem introdução de nova biblioteca.
- Os fluxos de cadastro e recuperação de senha são externos à feature de login e não devem receber navegação nesta primeira implementação.
- Não existe dependência de backend ou contrato externo de autenticação nesta etapa.

## Contexto de Jornada

- Entrada esperada:
  - O lojista acessa diretamente a interface de login.
  - O lojista chega pela tela inicial, pela tela de cadastro, por sessão expirada ou por tentativa de acesso a área protegida.
- Próximo passo:
  - Não definido nesta etapa; não deve existir navegação pós-login.
- O que esta tela não deve resolver:
  - Autenticação, sessão, autorização, recuperação de senha, cadastro, onboarding, acesso ao painel ou escolha de destino após o login.

## Ambiguidades Resolvidas

- `Cadastrar` e `Cadastre-se` permanecem apenas visuais, sem navegação nesta primeira implementação.
- `Esqueci minha senha` permanece apenas visual, sem navegação nesta primeira implementação.
- `Voltar ao início` não será incluído nesta primeira implementação.
- `Entrar`, quando os campos estiverem localmente válidos, não autentica, não chama backend, não navega e não exibe sucesso.
- Os elementos decorativos em mobile podem ser simplificados para preservar a legibilidade.

Não existem ambiguidades funcionais em aberto para esta primeira implementação.

Em caso de divergência entre a referência visual e os requisitos explícitos desta spec, prevalecem os requisitos funcionais definidos neste documento.
