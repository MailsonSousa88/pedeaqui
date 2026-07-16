# Spec: Cadastro de lojista

## Objetivo

Definir a interface da primeira versão da tela de cadastro de lojista, coletando os dados básicos de 
identificação e 
acesso sem implementar integração com backend, autenticação ou continuidade do fluxo após o cadastro.

## Fonte da Tela

- Screen esperada: `../../docs/screens/screen-register-0003.md`
- Referência visual oficial: `specs/register/assets/Tela-cadastro.png`
- Flow: `merchant-flow`
- Posição no fluxo: interface inicial de cadastro do lojista
- RFs/RNFs: RF012, RF013, RNF0015, RNF0016, observadas apenas as partes aplicáveis à interface desta etapa
- Use cases: cadastro de lojista
- User stories: cadastro e acesso inicial do lojista
- Edge cases aplicáveis nesta etapa: campos obrigatórios ausentes, e-mail em formato inválido e senha com menos 
  de 8 caracteres

## Escopo

- Exibir a interface do formulário de cadastro para um novo lojista.
- Coletar nome completo, e-mail, senha e CPF ou CNPJ.
- Aplicar somente validações locais compatíveis com esta etapa: preenchimento obrigatório, formato de e-mail e 
senha com no mínimo 8 caracteres.
- Apresentar um único campo denominado `CPF ou CNPJ`, sem máscara ou validação específica do documento.
- Separar visual e conceitualmente o cadastro da alternativa de entrada para quem já possui conta.
- Exibir referências visuais a `Termos de Uso` e `Política de Privacidade`, sem navegação.

## Fora de Escopo

- Implementação de backend, envio real do formulário, autenticação ou integração com Supabase.
- Redirecionamentos e definição do fluxo posterior ao cadastro.
- Navegação dos elementos `Termos de Uso` e `Política de Privacidade`.
- Máscara, identificação automática ou validação específica de CPF ou CNPJ.
- Validação de duplicidade de e-mail ou documento.
- Regras de senha além do mínimo de 8 caracteres.
- Campo de confirmação de senha.
- Login social, recuperação ou redefinição de senha.
- Configuração de loja, escolha de plano, pagamento ou ativação pós-cadastro.

## Requisitos Funcionais

### RF-FE-001

Como lojista, quero visualizar e preencher um formulário simples, para informar os dados necessários ao meu cadastro.

Critérios de aceite:

- A tela deve apresentar somente os campos `Nome completo`, `E-mail`, `Senha` e `CPF ou CNPJ`.
- A tela não deve apresentar o campo `Confirmar senha`.
- Todos os quatro campos devem ser obrigatórios.
- O formulário deve indicar claramente que se trata do fluxo de cadastro, e não do fluxo de login.
- A interface deve apresentar um botão principal de cadastro, sem envio real ou integração nesta etapa.

### RF-FE-002

Como lojista, quero receber feedback das validações locais previstas, para corrigir os dados básicos do formulário.

Critérios de aceite:

- O envio local do formulário deve ser bloqueado quando um campo obrigatório estiver vazio.
- O e-mail deve ser validado apenas quanto ao seu formato.
- A senha deve exigir somente o mínimo de 8 caracteres.
- Não devem ser aplicadas regras adicionais de complexidade de senha.
- O campo `CPF ou CNPJ` não deve aplicar máscara, identificação do tipo de documento, validação de formato ou de 
dígitos verificadores.
- Erros das validações locais devem aparecer próximos aos campos afetados.

### RF-FE-003

Como lojista, quero visualizar as referências legais associadas ao cadastro, para reconhecer os documentos aplicáveis 
ao uso da plataforma.

Critérios de aceite:

- A interface deve exibir o texto com os elementos `Termos de Uso` e `Política de Privacidade`.
- Esses elementos devem ser apenas visuais nesta etapa.
- Os elementos não devem navegar, abrir páginas ou executar outra ação.

### RF-FE-004

Como lojista que já possui conta, quero identificar visualmente a alternativa de entrada, para distinguir o 
cadastro do login.

Critérios de aceite:

- A tela deve apresentar uma alternativa visual para o fluxo de login.
- A alternativa deve ser visualmente distinta do botão principal de cadastro.
- A alternativa não deve realizar navegação ou redirecionamento nesta etapa.

## Estados

- Inicial
- Validação local do formulário
- Erro de campo obrigatório
- Erro de formato de e-mail
- Erro de senha com menos de 8 caracteres

Não fazem parte desta etapa os estados de envio ao backend, erro de cadastro remoto ou sucesso pós-cadastro.

## Conteúdo da Tela

- Títulos:
  - Título principal: cadastro de lojista
  - Subtítulo explicativo: criar conta
- Campos, nesta ordem:
  - Nome completo
  - E-mail
  - Senha
  - CPF ou CNPJ
- Botões e ações visuais:
  - Cadastrar
  - Alternativa para entrar, sem navegação nesta etapa
- Textos legais:
  - Texto com `Termos de Uso` e `Política de Privacidade`, sem navegação nesta etapa

## Contexto de Jornada

- Entrada esperada:
  - O lojista acessa a interface de cadastro.
- Próximo passo:
  - Não definido nesta etapa. A interface não deve implementar redirecionamento após a interação com o cadastro.
- O que esta tela não deve resolver:
  - Persistência do cadastro, autenticação, escolha de plano, pagamento, ativação, recuperação de senha ou gestão de 
  loja.

## Ambiguidades em Aberto

Não existem ambiguidades funcionais em aberto para esta etapa.

A referência visual oficial da tela está disponível em:

`specs/register/assets/Tela-cadastro.png`

Ela deverá ser utilizada como orientação para a composição visual da interface.

Em caso de divergência entre a referência visual e esta especificação, prevalece a especificação funcional definida 
neste documento.

As demais ambiguidades levantadas durante a fase `clarify` foram resolvidas e registradas em `clarify.md`.

