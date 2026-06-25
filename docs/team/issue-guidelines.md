# Guia de Issues

## Objetivo

Padronizar o uso de issues no projeto PedeAqui para registrar tarefas, bugs, melhorias, decisões pendentes e entregas planejadas.

## Quando criar uma issue

Uma issue deve ser criada quando houver:

- Nova funcionalidade a implementar.
- Correção de bug.
- Alteração ou criação de documentação.
- Tarefa de configuração, infraestrutura ou manutenção.
- Discussão técnica que precisa de decisão do time.
- Ajuste em requisito, caso de uso, história de usuário ou regra de negócio.
- Atividade que fará parte de uma milestone.

## Regras para criar uma issue

- O título deve ser claro e objetivo.
- A descrição deve explicar o problema, tarefa ou objetivo.
- A issue deve possuir responsável no campo `Assignees`, quando já houver alguém definido.
- A issue deve possuir labels coerentes com o tipo e área da tarefa.
- A issue deve estar vinculada a uma milestone quando fizer parte de uma entrega planejada.
- A issue deve ter escopo pequeno o suficiente para ser acompanhada e concluída.
- Issues grandes devem ser quebradas em issues menores.

## Estrutura recomendada

```md
## Objetivo

Descrever o que precisa ser feito.

## Contexto

Explicar por que essa tarefa existe.

## Critérios de aceite

- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

## Observações

Adicionar links, decisões, arquivos relacionados ou dependências.
```

## Labels recomendadas

Labels devem ajudar a identificar o tipo e a área da issue.

Exemplos de tipo:

```text
feature
fix
docs
chore
refactor
test
```

Exemplos de área:

```text
frontend
backend
```

## Relação com Pull Requests

Quando um PR resolver uma issue, a descrição do PR deve referenciar a issue usando uma palavra-chave do GitHub.

Exemplos:

```text
Closes #12
Fixes #18
Resolves #21
```

Ao fazer merge do PR, o GitHub fecha a issue automaticamente.

## Exemplos de títulos recomendados

```text
Criar documentação de commits do time
Implementar cadastro de produtos
Corrigir validação de CPF/CNPJ
Definir fluxo de upload de imagens no R2
Revisar requisitos funcionais do cliente
```

## Exemplos de títulos proibidos

```text
arrumar
coisas
ajustes
ver isso
bug
tarefa
```

## Fechamento de issue

Uma issue só deve ser fechada quando:

- A tarefa tiver sido concluída.
- O PR relacionado tiver sido aprovado e mergeado.
- A documentação necessária tiver sido atualizada.
- Os critérios de aceite tiverem sido atendidos.

Caso a issue deixe de fazer sentido, ela pode ser fechada com uma justificativa clara.
