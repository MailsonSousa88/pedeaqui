# Guia de Pull Requests e Code Review

## Objetivo

Padronizar a abertura, revisão e aprovação de Pull Requests no projeto PedeAqui para manter qualidade, rastreabilidade e colaboração antes do merge.

## Regra principal

Todo Pull Request deve ter pelo menos **2 pessoas revisoras** antes de ser aprovado para merge.

Mudanças sensíveis do backend continuam exigindo pelo menos **2 aprovações**, mas devem ser revisadas pelos Code Owners do backend: `@MailsonSousa88`, `@vitorlopes-coder` e `@Rikelry`.

Somente Pull Requests de integração entre `development` e `main` exigem pelo menos **4 aprovações válidas** e recebem a label `integration`.

São consideradas mudanças sensíveis do backend:

- Alterações em arquitetura.
- Alterações em banco de dados.
- Alterações em autenticação ou autorização.
- Alterações em pagamento.
- Alterações em infraestrutura do backend.
- Alterações em regras de negócio críticas.

## Padrão obrigatório para título de Pull Request

O título do PR deve seguir o formato:

```text
tipo(contexto): mensagem objetiva da alteração
```

Exemplos:

```text
feat(produtos): adiciona cadastro de produtos pelo lojista
fix(auth): corrige validação de documento no cadastro
docs(team): atualiza guia de revisão de pull requests
refactor(store): reorganiza serviços de vitrine
test(auth): adiciona testes para recuperação de senha
chore(config): ajusta configuração do TypeScript
```

## Tipos permitidos

| Tipo | Uso |
|------|-----|
| `feat` | Nova funcionalidade. |
| `fix` | Correção de bug. |
| `docs` | Alterações em documentação. |
| `chore` | Tarefas de manutenção, configuração ou ajustes sem impacto direto em regra de negócio. |
| `refactor` | Refatoração sem mudança de comportamento esperado. |
| `test` | Criação ou ajuste de testes. |

## Contexto do título

O contexto deve indicar a área principal afetada pelo PR.

Exemplos recomendados:

```text
auth
billing
store
checkout
products
categories
database
config
team
docs
```

Regras para o contexto:

- Usar letras minúsculas.
- Usar uma palavra curta e clara.
- Evitar contexto genérico como `geral`, `coisas`, `ajustes` ou `misc`.
- Usar o contexto que melhor representa o escopo principal do PR.

## Diferença entre título de PR e mensagem de commit

O título de PR deve conter contexto:

```text
feat(produtos): adiciona cadastro de produtos pelo lojista
```

As mensagens de commit devem continuar seguindo o guia de commits, sem contexto obrigatório:

```text
feat: adicionado cadastro de produtos pelo lojista
```

## Regras para abrir Pull Request

- O PR deve partir de uma branch criada a partir da `development` atualizada.
- O PR deve apontar para a branch `development`, exceto nos PRs de promoção da `development` para a `main`.
- O título do PR deve seguir o padrão obrigatório.
- A descrição deve explicar o que foi alterado e por quê.
- O responsável pelo PR deve se marcar no campo `Assignees` do GitHub.
- O PR deve relacionar a issue correspondente, quando existir.
- O PR deve estar vinculado à milestone correta, quando fizer parte de uma entrega planejada.
- O PR deve informar se houve alteração em documentação, frontend, backend, banco ou configuração.
- O PR deve ser pequeno o suficiente para revisão efetiva sempre que possível.
- O autor deve revisar o próprio diff antes de solicitar revisão.
- O PR não deve misturar alterações sem relação entre si.

## Estrutura recomendada para descrição do PR

```md
## Objetivo

Descrever o objetivo do PR.

## Alterações realizadas

- Item 1
- Item 2
- Item 3

## Como validar

- Passo 1
- Passo 2
- Passo 3

## Issue relacionada

Closes #numero-da-issue

## Observações

Informar riscos, decisões, pendências ou pontos de atenção.
```

## Checklist do autor

Antes de solicitar revisão, o autor deve verificar:

- O título do PR segue `tipo(contexto): mensagem objetiva`.
- A descrição explica o objetivo e as alterações realizadas.
- A issue foi relacionada seguindo o guia de issues, quando existir.
- A milestone foi definida, quando a alteração fizer parte de uma entrega planejada.
- Os commits seguem o guia de commits.
- A branch segue o guia de branches.
- O diff foi revisado pelo próprio autor.
- Arquivos desnecessários não foram adicionados.
- Documentação foi atualizada quando necessário.
- Testes foram adicionados ou atualizados quando necessário.
- O projeto continua executando conforme esperado.

## Automação de reviewers, labels e políticas

O `CODEOWNERS` solicita automaticamente os reviewers responsáveis pelos arquivos modificados. Os workflows aplicam labels de área, validam as políticas do PR e identificam mudanças sensíveis.

O autor não precisa repetir essas ações manualmente. Depois da execução dos workflows, deve conferir se:

- os reviewers correspondem às áreas alteradas;
- as labels representam todos os caminhos modificados;
- a label `sensitive` foi aplicada quando necessária;
- os checks obrigatórios foram executados;
- erros de política foram corrigidos antes da revisão.

A solicitação automática de reviewers não representa aprovação. Trabalhos comuns e mudanças sensíveis do backend exigem pelo menos 2 aprovações. Somente PRs de `development` para `main`, identificados por `integration`, exigem pelo menos 4 aprovações válidas.

Consulte [Automações do GitHub](github-automation.md) para os caminhos monitorados, responsabilidades manuais e instruções para agentes de programação.

## Regras para revisão

- Verificar se a alteração atende ao objetivo proposto.
- Verificar se o escopo está coerente com a issue e com a descrição do PR.
- Verificar se o código está claro, organizado e coerente com o padrão do projeto.
- Verificar impactos em regras de negócio.
- Verificar possíveis falhas de segurança, autenticação, autorização e validação.
- Verificar impactos em banco de dados, migrações e dados existentes.
- Verificar impactos em frontend, acessibilidade, responsividade e estados de erro.
- Verificar se documentação precisa ser atualizada.
- Verificar se há necessidade de testes.
- Não aprovar PR apenas por confiança no autor.

## Como comentar na revisão

Comentários devem ser objetivos, respeitosos e acionáveis.

Recomendações:

- Explicar o problema encontrado.
- Indicar o impacto ou risco da alteração.
- Sugerir uma correção quando possível.
- Diferenciar bloqueios de sugestões.
- Evitar comentários vagos como `melhorar`, `estranho` ou `não gostei`.

Exemplos:

```text
Bloqueio: essa validação permite CPF inválido quando o campo vem com máscara. Pode reutilizar o validador existente?
Sugestão: este trecho poderia ficar no hook para manter o componente focado em renderização.
Dúvida: esse fluxo também precisa tratar usuário sem tenant?
```

## Critérios mínimos para aprovação

Um PR só deve ser aprovado quando:

- Tiver pelo menos 2 revisores para trabalhos simples.
- Tiver pelo menos 2 aprovações dos responsáveis da área para mudanças sensíveis do backend.
- Tiver pelo menos 4 aprovações para integração de `development` em `main`.
- Não houver comentários críticos pendentes.
- A branch estiver atualizada com a base, quando necessário.
- O código ou documentação estiver coerente com o escopo do PR.
- O autor tiver respondido ou resolvido os apontamentos da revisão.
- A validação mínima descrita no PR tiver sido executada ou justificada.

## Quando solicitar mudanças

O revisor deve solicitar mudanças quando houver:

- Bug evidente ou comportamento incorreto.
- Falha de segurança, autenticação, autorização ou validação.
- Quebra de regra de negócio.
- Alteração fora do escopo sem justificativa.
- Código difícil de manter em uma parte relevante do fluxo.
- Ausência de documentação necessária.
- Ausência de teste em mudança crítica.
- PR sem informações suficientes para revisão.

## Exemplos de títulos recomendados

```text
feat(auth): adiciona recuperação de senha
feat(store): adiciona vitrine pública da loja
fix(checkout): corrige redirecionamento para WhatsApp
docs(team): atualiza guia de issues
refactor(products): separa regras de produto em serviço próprio
test(auth): adiciona testes para login do lojista
chore(config): atualiza configuração do ESLint
```

## Exemplos de títulos proibidos

```text
ajustes
alterações
coisas novas
arrumei
final
feat: adiciona cadastro de produtos
feat(produtos) adiciona cadastro de produtos
feat(): adiciona cadastro de produtos
feat(geral): ajustes
update(auth): altera login
```

## Merge

O merge só deve acontecer quando:

- A aprovação mínima tiver sido atingida.
- Comentários críticos tiverem sido resolvidos.
- A branch estiver pronta para integrar na base.
- A issue relacionada puder ser fechada pelo PR, quando existir.
- O autor ou responsável pelo PR tiver validado o resultado final.
