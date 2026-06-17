# Guia de Milestones

## Objetivo

Padronizar o uso de milestones no projeto PedeAqui para organizar entregas, acompanhar progresso e representar etapas do MVP.

## O que é uma milestone

Uma milestone representa uma entrega planejada do projeto.

No PedeAqui, milestones devem ser usadas como etapas de evolução até o MVP final.

Exemplo:

```text
M1 - Setup e Documentação Inicial
M2 - Requisitos e Modelagem
M3 - Backend Base e Banco de Dados
M4 - Frontend Base e Fluxos Principais
M5 - Pagamentos, Storage e Integrações
M6 - Deploy e Validação do MVP
```

## Diferença entre milestone e label

Labels classificam o tipo ou área da tarefa.

Milestones indicam a entrega à qual a tarefa pertence.

Exemplo:

```text
Issue: Implementar upload de imagem de produto
Labels: feature, backend, storage
Milestone: M5 - Pagamentos, Storage e Integrações
```

## Regras de uso

- A criação de milestones é responsabilidade do Scrum Master (SM).
- O Scrum Master deve criar milestones que representem versões ou entregas do MVP.
- O Scrum Master deve manter as milestones organizadas e atualizadas conforme o planejamento do time.
- Toda issue planejada para uma entrega deve estar associada a uma milestone.
- Todo PR relacionado a uma entrega deve estar associado à mesma milestone da issue correspondente.
- Uma issue ou PR deve pertencer a apenas uma milestone por vez.
- A milestone deve representar uma entrega clara, não uma tarefa isolada.
- Milestones não devem ser criadas sem objetivo definido.
- O nome da milestone deve indicar ordem e escopo da entrega.

## Padrão de nome

As milestones devem seguir o formato:

```text
M<número> - Nome da Entrega
```

Exemplos:

```text
M1 - Setup e Documentação Inicial
M2 - Requisitos e Modelagem
M3 - Backend Base e Banco de Dados
```

## Como associar uma issue à milestone

Ao criar ou editar uma issue no GitHub:

1. Abrir a issue.
2. Ir até o campo `Milestone`.
3. Selecionar a milestone correspondente.
4. Salvar a alteração.

A issue passará a contar no progresso da milestone.

## Como associar um PR à milestone

Ao abrir ou editar um Pull Request:

1. Ir até o campo `Milestone`.
2. Selecionar a milestone correspondente.
3. Garantir que o PR referencia a issue relacionada, quando existir.

Exemplo de referência no PR:

```text
Closes #12
```

## Acompanhamento de progresso

O GitHub calcula o progresso da milestone com base em issues e PRs abertos ou fechados.

Exemplo:

```text
10 itens associados
6 fechados
4 abertos
Progresso: 60%
```

## Quando fechar uma milestone

Uma milestone só deve ser fechada quando:

- Todas as issues planejadas forem concluídas ou removidas com justificativa.
- Todos os PRs relacionados forem mergeados ou fechados com justificativa.
- A entrega tiver sido validada pelo time.
- A documentação da entrega estiver atualizada, quando necessário.

## O que evitar

- Criar milestone para uma única tarefa pequena.
- Usar milestone como label.
- Deixar issues sem milestone quando pertencem a uma entrega.
- Manter milestones antigas abertas sem revisão.
- Misturar tarefas de entregas diferentes na mesma milestone.
