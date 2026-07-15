# Automações do GitHub

## Objetivo

Documentar o comportamento da pasta `.github/` e separar o que acontece automaticamente do que continua sob responsabilidade das pessoas contribuidoras e revisoras.

As automações não consultam todas a mesma branch:

- o `CODEOWNERS` é lido da branch de destino do Pull Request;
- os workflows acionados por `pull_request` validam o PR no contexto da branch de destino;
- o template de Pull Request precisa estar na branch padrão do repositório, atualmente `main`;
- workflows acionados por `pull_request_target`, como o labeler, executam no contexto da branch padrão.

Por isso, após a configuração ser integrada somente em `development`, os próximos PRs para `development` já podem usar o `CODEOWNERS` e os checks baseados em `pull_request`, mas o template e o labeler ficam plenamente disponíveis depois que a configuração também chegar à `main`.

## O que acontece automaticamente

Quando as configurações necessárias já estiverem nas branches indicadas acima, ao abrir ou atualizar um Pull Request para `development` ou `main`, o repositório executa as seguintes automações:

| Automação | Comportamento |
|---|---|
| Template de PR | Preenche a descrição com as seções obrigatórias do projeto. |
| `CODEOWNERS` | Solicita revisão das pessoas responsáveis pelos arquivos alterados. |
| Labels por caminho | Aplica e sincroniza labels conforme as áreas modificadas. |
| Política de PR | Valida título, branch, destino, descrição e o autor em `Assignees`. |
| Mudanças sensíveis | Aplica `sensitive` e exige no mínimo 4 aprovações válidas. |

## Revisores solicitados pelo CODEOWNERS

Os revisores são escolhidos conforme os arquivos alterados:

| Área | Revisores solicitados |
|---|---|
| Frontend (`app/frontend/`) | `@MailsonSousa88`, `@MateusARJ` e `@Cassiosampaio2016` |
| Backend (`app/backend/`) | `@MailsonSousa88`, `@vitorlopes-coder` e `@Rikelry` |
| Documentação, `.github/` e arquivos gerais | Todos os integrantes definidos no `CODEOWNERS` |

Se o autor estiver entre os responsáveis, ele não pode aprovar o próprio Pull Request. A solicitação automática de revisão não substitui a aprovação: cada pessoa revisora ainda precisa analisar a alteração e registrar sua decisão no GitHub.

Em um Draft Pull Request, a solicitação aos Code Owners pode aguardar o PR ser marcado como pronto para revisão.

## Labels aplicadas automaticamente

O workflow aplica labels com base nos arquivos modificados:

| Label | Caminhos principais |
|---|---|
| `frontend` | `app/frontend/**` |
| `backend` | `app/backend/**` |
| `database` | `app/backend/supabase/**` |
| `docs` | `docs/**`, `README.md` e `CONTRIBUTING.md` |
| `github` | `.github/**` |
| `dependencies` | `package.json` e `package-lock.json` |
| `test` | Arquivos e diretórios de testes |

Uma alteração pode receber mais de uma label. Por exemplo, um teste do frontend pode receber `frontend` e `test`.

Não é necessário aplicar essas labels manualmente em Pull Requests. O autor deve apenas conferir o resultado e corrigir manualmente se existir um caso excepcional que a automação não represente.

Essa automação é exclusiva para Pull Requests. As labels de issues continuam sendo definidas manualmente enquanto não houver uma automação específica para issues.

## Mudanças sensíveis

Um Pull Request é tratado automaticamente como sensível quando:

- aponta para `main`;
- possui a label `sensitive`;
- altera banco de dados, autenticação, autorização ou pagamento;
- altera deploy, infraestrutura ou configurações do GitHub;
- altera documentos oficiais do projeto;
- altera caminhos críticos definidos no workflow.

Quando a mudança é sensível, o workflow:

1. aplica a label `sensitive`, caso ela ainda não exista no PR;
2. informa o motivo identificado no resumo da execução;
3. bloqueia o check `Enforce sensitive approvals` enquanto houver menos de 4 aprovações válidas;
4. desconsidera o autor e aprovações que tenham sido substituídas por uma solicitação de mudanças.

Se uma mudança for sensível por seu significado, mas não estiver em um caminho detectado automaticamente, o autor ou responsável deve aplicar `sensitive` manualmente. Remover a label não desativa a política quando os arquivos ou o destino do PR continuarem sensíveis.

## Validação das políticas do PR

O check `Validate PR policy` valida automaticamente:

- título no formato `tipo(contexto): mensagem objetiva`;
- branch de trabalho no formato definido pelo guia de branches;
- PR de trabalho destinado a `development`;
- somente `development` como origem de PR destinado a `main`;
- presença das seções obrigatórias do template;
- autor do PR marcado no campo `Assignees`.

Falhas devem ser corrigidas no próprio PR. Não se deve remover seções obrigatórias ou tentar contornar os checks.

## O que continua manual

As automações não substituem as seguintes responsabilidades:

- preencher corretamente o template do PR;
- marcar o próprio autor em `Assignees`;
- relacionar a issue, quando existir;
- associar a milestone, quando aplicável;
- identificar manualmente uma sensibilidade sem correspondência por caminho;
- revisar o código, testar o comportamento e registrar aprovação ou solicitação de mudanças;
- responder e resolver conversas de revisão;
- realizar o merge quando todas as políticas forem atendidas.

## Instruções para agentes de programação

Ao preparar ou acompanhar um Pull Request, agentes devem:

1. preservar os títulos das seções fornecidas pelo template;
2. preencher todas as informações conhecidas e registrar explicitamente o que não se aplica;
3. não solicitar manualmente os revisores já cobertos pelo `CODEOWNERS`;
4. não aplicar manualmente labels de caminho antes da execução do workflow;
5. conferir reviewers e labels depois que as automações terminarem;
6. aplicar `sensitive` manualmente somente quando o risco for semântico e não tiver sido detectado;
7. nunca interpretar um check vermelho por falta de aprovações como falha técnica do código;
8. não realizar merge sem aprovação mínima, checks obrigatórios verdes e conversas resolvidas;
9. comunicar ao responsável quando uma automação não executar ou produzir classificação incorreta.

## Checks usados nos rulesets

Os checks destinados a bloquear merges são:

- `Validate PR policy`;
- `Enforce sensitive approvals`.

O check `Apply path labels` organiza o Pull Request, mas não precisa ser configurado como requisito para merge.
