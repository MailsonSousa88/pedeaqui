# Clarify: Login de lojista

## Perguntas

### Q1

Pergunta: `Cadastrar` e `Cadastre-se` devem navegar para a tela de cadastro nesta primeira implementação?

Resposta: Não. Permanecem apenas visuais nesta primeira implementação, sem navegação.

Impacto na spec: As duas ações continuam presentes conforme a referência visual, mas não executam navegação nem outra ação.

### Q2

Pergunta: `Esqueci minha senha` deve navegar para o fluxo de recuperação de senha nesta primeira implementação?

Resposta: Sim. Deve navegar para a tela de recuperação de senha por meio de um callback recebido pela página de login e controlado centralmente por `App.tsx`.

Impacto na spec: A ação passa a ser um gatilho de navegação para a tela de recuperação de senha, sem implementar autenticação real, envio de e-mail ou integração remota.

### Q3

Pergunta: A ação opcional `Voltar ao início` deve ser incluída nesta primeira implementação?

Resposta: Não incluir nesta primeira implementação.

Impacto na spec: `Voltar ao início` foi explicitamente registrado como fora do escopo e não integra o conteúdo da tela.

### Q4

Pergunta: O que deve acontecer ao acionar `Entrar` quando os campos estiverem localmente válidos?

Resposta: Não autentica, não chama backend, não navega e não exibe sucesso.

Impacto na spec: O botão executa somente as validações locais previstas. Após a validação bem-sucedida, não há efeito adicional observável nesta primeira implementação.

### Q5

Pergunta: Os elementos decorativos do fundo precisam ser reproduzidos integralmente em mobile?

Resposta: Não. Podem ser simplificados para preservar a legibilidade.

Impacto na spec: A responsividade pode reduzir ou omitir detalhes decorativos em telas menores, mantendo o conteúdo e as ações legíveis.

## Decisões Registradas

- `Cadastrar` e `Cadastre-se` continuam seguindo o comportamento já existente da tela e não são alterados por esta integração.
- `Esqueci minha senha` navegará para a tela de recuperação de senha por meio de callback centralizado em `App.tsx`.
- `Voltar ao início` não será incluído.
- `Entrar` executará somente validações locais; com dados válidos, não haverá autenticação, backend ou mensagem de sucesso.
- Elementos decorativos poderão ser simplificados em mobile para preservar a legibilidade.

## Pendências

Não existem pendências funcionais em aberto para esta primeira implementação.

## Observação Arquitetural

Esta feature será implementada em:

src/features/auth/login/

seguindo a organização oficial do frontend para features relacionadas à autenticação.
