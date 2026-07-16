# Spec: Recuperacao de senha

## Objetivo

Definir a interface da primeira versao da feature de recuperacao de senha do dominio Auth, permitindo que o lojista percorra visualmente as etapas de solicitacao de link e aviso de e-mail enviado, com validacoes locais e sem implementar backend, envio real de e-mail, autenticacao, persistencia ou navegacao real para a redefinicao de senha.

## Fonte da Tela

- Referencia visual fornecida: `src/assets/Tela-recuperar-senha.png`
- Referencias de consistencia funcional e visual: `specs/login/` e `specs/register/`
- Dominio: Auth
- Feature: recuperacao de senha
- Fluxo previsto: duas etapas locais de recuperacao de senha
  - `Solicitar link`
  - `E-mail enviado`
- Edge cases aplicaveis nesta etapa: campo obrigatorio ausente e e-mail em formato invalido

## Contexto no Fluxo

Fluxo previsto da aplicacao:

```text
Login
↓
Usuario seleciona "Esqueci minha senha"
↓
Recuperacao de senha
- Solicitar link
- E-mail enviado
↓
Usuario acessa o link recebido por e-mail
↓
Redefinir senha
↓
Retorno ao Login (fluxo futuro)
```

Nesta versao frontend-only, a etapa `Redefinir senha` e apresentada apenas para validacao da interface e demonstracao visual do fluxo. No fluxo definitivo, essa etapa sera acessada pelo link enviado por e-mail apos integracao futura com backend.

Esta documentacao nao cria backend, endpoint, token, rota, envio real de e-mail ou navegacao real nesta versao.

## Escopo

- Exibir uma experiencia de recuperacao de senha pertencente ao dominio Auth.
- Representar visualmente as duas etapas do fluxo: solicitacao de link e e-mail enviado.
- Exibir a marca PedeAqui e um stepper de progresso coerente com a referencia visual.
- Na etapa `Solicitar link`, coletar somente o e-mail.
- Na etapa `E-mail enviado`, informar que o link de redefinicao foi enviado para o e-mail informado.
- Exibir as acoes `Enviar link de recuperacao`, `Enviar novamente` e `Voltar para login` de acordo com a etapa correspondente.
- Manter comportamento responsivo e acessivel em desktop e mobile.


## Fora de Escopo

- Backend, endpoints, persistencia, Supabase ou qualquer integracao remota.
- Envio real de e-mail de recuperacao.
- Geracao, validacao, expiracao real ou consumo de token de redefinicao.
- Autenticacao real, alteracao real de senha ou criacao de sessao.
- Navegacao real para cadastro, home ou qualquer outra rota fora do fluxo central da aplicacao.
- Roteamento, parametros de URL, deeplink ou abertura real de link recebido por e-mail.
- Estados remotos de carregamento, erro de servidor, token invalido, token expirado ou sucesso remoto.
- Reenvio real de e-mail.
- Login, cadastro de usuario ou login social dentro desta feature.
- Criacao de `plan.md`, `tasks.md`, `clarify.md`, contratos ou codigo nesta etapa.

## Requisitos Funcionais

### RF-FE-001

Como lojista que esqueceu a senha, quero informar meu e-mail, para solicitar visualmente um link de recuperacao.

Critérios de aceite:

- A etapa inicial deve ser `Solicitar link`.
- A tela deve apresentar somente o campo `E-mail`.
- O campo `E-mail` deve ser obrigatorio.
- O campo `E-mail` deve validar somente o formato de e-mail.
- O campo `E-mail` deve usar o placeholder `Digite seu e-mail`.
- A interface deve apresentar o botao principal `Enviar link de recuperacao`.
- A interface deve apresentar o texto auxiliar `Enviaremos um link valido por 1 hora para este e-mail.`
- Ao acionar `Enviar link de recuperacao` com e-mail invalido ou ausente, a interface deve exibir erro local proximo ao campo.
- Ao acionar `Enviar link de recuperacao` com e-mail localmente valido, a interface pode avancar localmente para a etapa `E-mail enviado`.
- O acionamento nao deve chamar backend, enviar e-mail real, gerar token, persistir dados, navegar ou exibir sucesso remoto.

### RF-FE-002

Como lojista, quero visualizar a confirmacao de e-mail enviado, para entender a proxima acao esperada no fluxo.

Critérios de aceite:

- A etapa `E-mail enviado` deve destacar o segundo passo do stepper.
- A tela deve exibir o titulo `Verifique seu e-mail`, com `e-mail` destacado visualmente em vermelho.
- A tela deve exibir o texto `Enviamos um link de redefinicao para o e-mail informado.`
- A tela deve exibir a orientacao `Clique no link recebido para continuar a redefinicao da sua senha.`
- A tela deve exibir as informacoes `O link e valido por 1 hora.` e `Verifique tambem sua caixa de spam ou lixo eletronico.`
- A interface deve apresentar o botao principal `Enviar novamente`.
- Acionar `Enviar novamente` nao deve reenviar e-mail real, chamar backend, gerar token, criar loading remoto, navegar ou alterar senha.
- A tela deve apresentar a acao visual `Voltar para login`, que navega para a tela de Login por meio de callback centralizado em `App.tsx`.

### RF-FE-003

Como usuario, quero reconhecer a recuperacao de senha como parte do PedeAqui, para ter uma experiencia consistente com as demais telas de Auth.

Critérios de aceite:

- A composicao deve seguir a referencia visual `src/assets/Tela-recuperar-senha.png` e manter consistencia com `specs/login/` e `specs/register/`.
- A tela deve exibir a marca PedeAqui no topo do conteudo.
- A tela deve exibir stepper com os passos `Solicitar link` e `E-mail enviado`.
- O passo atual deve ser destacado em vermelho.
- Passos ainda nao alcancados devem permanecer visualmente inativos.
- O conteudo principal deve aparecer em card branco centralizado, com bordas, sombras, espacamentos, icones e fundo claro coerentes com as telas de Auth.
- Em telas menores, card, campos, botoes, textos e stepper devem preservar legibilidade, margens confortaveis e area adequada para toque.
- Elementos decorativos de fundo podem ser simplificados em mobile para preservar legibilidade.
- A tela nao deve apresentar botao superior com icone `ArrowLeft` nesta versao.
- O retorno visual para login deve permanecer apenas pela acao `Voltar para login` dentro do card, com navegação controlada centralmente por `App.tsx`.

## Estados

- Etapa solicitar link: campo de e-mail vazio, nenhum erro e primeiro passo ativo.
- Etapa e-mail enviado: mensagem informativa exibida, segundo passo ativo e sem envio real.
- Preenchido: valores mantidos localmente nos campos da etapa atual.
- Senha visivel: conteudo de um campo de senha temporariamente revelado pelo controle de alternancia.
- Erro de campo obrigatorio: mensagem local proxima ao campo vazio.
- Erro de formato de e-mail: mensagem local proxima ao campo de e-mail.
- Erro de senha curta: mensagem local indicando o minimo de 8 caracteres.
- Erro de confirmacao divergente: mensagem local proxima ao campo `Confirmar senha`.

Nao fazem parte desta etapa os estados de carregamento remoto, envio real de e-mail, reenvio real, token invalido, token expirado, sucesso remoto, autenticacao ou navegacao pos-redefinicao.

## Conteudo da Tela

- Marca
  - Logo oficial PedeAqui.
- Stepper:
  - `Solicitar link`.
  - `E-mail enviado`.
  - `Redefinir senha`.
- Etapa `Solicitar link`:
  - Icone principal de envelope com cadeado.
  - Titulo `Recuperar senha`, com `senha` destacado em vermelho.
  - Texto de apoio `Digite seu e-mail para receber um link de redefinicao de senha.`
  - Campo `E-mail`.
  - Texto auxiliar `Enviaremos um link valido por 1 hora para este e-mail.`
  - Botao `Enviar link de recuperacao`.
  - Acao visual `Voltar para login`.
- Etapa `E-mail enviado`:
  - Icone principal de envelope com confirmacao.
  - Titulo `Verifique seu e-mail`, com `e-mail` destacado em vermelho.
  - Texto de apoio `Enviamos um link de redefinicao para o e-mail informado.`
  - Bloco informativo `Clique no link recebido para continuar a redefinicao da sua senha.`
  - Informacao `O link e valido por 1 hora.`
  - Informacao `Verifique tambem sua caixa de spam ou lixo eletronico.`
  - Botao `Enviar novamente`.
  - Acao visual `Voltar para login`.

## Comportamento

1. A feature exibe a etapa `Solicitar link` como estado inicial do fluxo.
2. O lojista informa o e-mail.
3. Ao acionar `Enviar link de recuperacao`, a interface valida localmente o e-mail.
4. Se houver erro local, a interface exibe a mensagem junto ao campo e permanece na etapa `Solicitar link`.
5. Se o e-mail for localmente valido, a interface pode avancar localmente para a etapa `E-mail enviado`, sem backend e sem envio real.
6. Na etapa `E-mail enviado`, a interface informa que o link foi enviado e exibe orientacoes visuais sobre validade e caixa de spam.
7. Acionar `Enviar novamente` nao executa envio real nem integracao remota.
8. A etapa `Redefinir senha` permanece reservada para acesso futuro pelo link real de recuperacao do Supabase, sem abertura local por simulacao.
9. A etapa `Redefinir senha` representa a tela de definicao de nova senha dentro do mesmo fluxo visual, sem depender de rota, token ou link real nesta etapa.
10. O lojista informa `Nova senha` e `Confirmar senha`.
11. O lojista pode alternar a visibilidade de cada senha sem perder os valores digitados e sem perder o foco do campo correspondente.
12. Ao acionar `Redefinir senha`, a interface executa somente as validacoes locais previstas.
13. Se houver erro local, a interface exibe a mensagem junto ao campo correspondente e permanece na etapa `Redefinir senha`.
14. Se os campos forem localmente validos, nenhuma alteracao real de senha, requisicao, autenticacao, mensagem de sucesso remoto ou navegacao e executada nesta etapa.
15. `Voltar para login` navega para a tela de Login em todas as etapas em que aparece, sem executar backend, envio real de e-mail ou outra integração remota.

## Dependencias Externas

- Referencia visual `src/assets/Tela-recuperar-senha.png` para composicao, conteudo, stepper, estados visuais e hierarquia.
- Specs de `login` e `register` para consistencia com o dominio Auth, restricoes frontend-only, linguagem de validacao local e tratamento de acoes visuais sem navegacao.
- Logo oficial PedeAqui disponivel conforme as regras do frontend.
- Icones compativeis com a stack oficial do frontend, sem introducao de nova biblioteca.
- Nao existe dependencia de backend, contrato externo, servico de e-mail, token ou rota nesta etapa.

## Contexto de Jornada

- Entrada esperada:
  - O lojista acessa conceitualmente a recuperacao de senha a partir do fluxo de Auth.
  - A feature inicia pela etapa `Solicitar link`.
- Proximos passos:
  - Nao definidos nesta etapa como navegacao real.
  - A etapa `E-mail enviado` orienta o usuario sobre o link recebido e prepara o retorno para Login.
- O que esta tela nao deve resolver:
  - Envio de e-mail, validacao de token, alteracao real de senha, autenticacao, sessao, redirecionamento para login ou continuidade pos-redefinicao.

## Ambiguidades em Aberto

- Nesta versão não existem ambiguidades em aberto.
