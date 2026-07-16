# Clarify: Cadastro de lojista

## Status

Fase `clarify` concluída. A fase `plan` não foi iniciada.

## Perguntas e Respostas

### Q1 — Referência visual

Pergunta: Qual referência deve orientar a estrutura visual e os textos exatos da tela?

Resposta: A referência visual oficial da tela foi definida e servirá como base para o planejamento (`plan`) e para a implementação (`implement`).

Impacto na spec: a composição visual da interface deverá seguir a referência oficial. Em caso de conflito entre a referência visual e a especificação funcional, prevalece a especificação funcional registrada em `spec.md`.

### Q2 — Comportamento após o cadastro

Pergunta: Qual deve ser o fluxo após o cadastro?

Resposta: O fluxo após o cadastro não faz parte desta etapa. Deve ser considerada apenas a interface, sem integração com backend, autenticação ou redirecionamentos.

Impacto na spec: foram removidos os requisitos e estados de sucesso, integração e continuidade do onboarding.

### Q3 — Regra de senha

Pergunta: Quais regras devem ser aplicadas à senha?

Resposta: A senha deve possuir apenas o requisito mínimo de 8 caracteres, sem outras regras nesta fase.

Impacto na spec: a validação local exige somente o mínimo de 8 caracteres e não inclui regras adicionais de complexidade.

### Q4 — Termos e política de privacidade

Pergunta: Como os textos legais devem se comportar nesta etapa?

Resposta: Exibir o texto com `Termos de Uso` e `Política de Privacidade` apenas como elementos visuais, sem navegação.

Impacto na spec: os dois elementos passam a fazer parte do conteúdo da tela, mas não podem abrir páginas nem executar ações.

### Q5 — Campo de documento

Pergunta: CPF e CNPJ devem ser tratados em campos separados ou em um único campo?

Resposta: Utilizar um único campo chamado `CPF ou CNPJ`, sem máscara ou validação específica nesta etapa.

Impacto na spec: o formulário possui um único campo de documento e não identifica, mascara ou valida CPF/CNPJ.

### Q6 — Confirmação de senha

Pergunta: A primeira versão deve possuir o campo `Confirmar senha`?

Resposta: Não. O formulário deve conter somente `Nome completo`, `E-mail`, `Senha` e `CPF ou CNPJ`.

Impacto na spec: o campo de confirmação de senha foi removido do escopo e a lista fechada de campos foi registrada.

## Decisões Registradas

- A entrega desta etapa é exclusivamente a interface da tela de cadastro.
- Não haverá integração com backend, autenticação, envio real ou redirecionamento.
- O formulário terá exatamente quatro campos: `Nome completo`, `E-mail`, `Senha` e `CPF ou CNPJ`.
- A senha exigirá somente o mínimo de 8 caracteres.
- `CPF ou CNPJ` será um campo único, sem máscara ou validação específica.
- Não haverá campo `Confirmar senha`.
- `Termos de Uso` e `Política de Privacidade` serão elementos visuais sem navegação.

## Pendências

Não existem pendências para esta etapa.

A fase `clarify` está concluída.

A referência visual oficial foi aprovada e deverá orientar apenas os aspectos 
visuais da implementação. As decisões funcionais permanecem definidas em `spec.md`.