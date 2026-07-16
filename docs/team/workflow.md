# Workflow do Time

## Objetivo

Definir o fluxo básico de trabalho do time Cloud Hive no desenvolvimento do PedeAqui.

## Fluxo de trabalho que deve ser seguido pela equipe

1. Criar uma branch de trabalho a partir da branch `development` atualizada.
2. Vincular o trabalho a uma issue, quando a alteração fizer parte de uma tarefa planejada.
3. Garantir que a issue esteja associada à milestone correta, quando fizer parte de uma entrega.
4. Implementar a alteração com escopo claro.
5. Fazer commits seguindo o guia de commits.
6. Atualizar documentação quando a alteração impactar regras, fluxos, arquitetura ou requisitos.
7. Abrir Pull Request apontando para a branch `development`.
8. Relacionar o PR com a issue correspondente, quando existir.
9. Confirmar os reviewers solicitados automaticamente pelo `CODEOWNERS` e complementar somente quando necessário.
10. Corrigir pontos levantados na revisão.
11. O autor do PR deve fazer o merge na `development` somente após aprovação mínima.
12. Após validação na `development`, abrir Pull Request da `development` para a `main`.
13. Fazer merge na `main` somente quando a versão estiver validada e estável.

As labels de área e os reviewers do Pull Request são definidos automaticamente. O autor continua responsável por preencher o template, marcar-se em `Assignees`, relacionar issue e milestone quando aplicável e confirmar se a automação classificou corretamente a alteração. Consulte [Automações do GitHub](github-automation.md).

## Branch principal (Main)

- A branch principal deve representar o estado estável do projeto.

- Alterações não devem ir diretamente para a `main`.

- Toda alteração deve passar primeiro pela branch `development`, que funciona como ambiente de integração, validação e revisão antes de chegar à branch principal.

- O merge para a `main` deve acontecer apenas quando a versão em `development` estiver validada pelo time.

## Branch de desenvolvimento (Development)

- A branch `development` deve concentrar as alterações aprovadas que ainda estão em validação.

- Ela deve ser usada para integrar funcionalidades, correções, documentação e ajustes antes da publicação na `main`.

- Branches de trabalho devem ser criadas a partir da `development` e retornar para ela por Pull Request.

## Responsabilidade pelo merge

O merge de uma branch de trabalho para a `development` deve ser feito pelo autor do Pull Request após aprovação mínima de 2 pessoas revisoras.

Mudanças sensíveis do backend devem ser revisadas pelos Code Owners da área e permanecem sujeitas ao mínimo de 2 aprovações do ruleset.

São consideradas mudanças sensíveis do backend:

- Alterações em arquitetura.
- Alterações em banco de dados.
- Alterações em autenticação ou autorização.
- Alterações em pagamento.
- Alterações em infraestrutura do backend.
- Alterações em regras de negócio críticas.

Pull Requests de integração entre `development` e `main` recebem a label `integration` e exigem no mínimo 4 aprovações válidas. Essa exigência não se aplica a branches de trabalho destinadas à `development`.

O merge da `development` para a `main` deve ser feito pelo responsável ou por uma pessoa autorizada pelo responsável, após validação da versão.

## Antes de abrir um Pull Request

O autor deve verificar:

- A branch possui nome adequado.
- Os commits possuem mensagens claras.
- A issue relacionada está vinculada ao PR, quando existir.
- A milestone está definida, quando a alteração fizer parte de uma entrega planejada.
- O escopo da alteração está coeso.
- Arquivos desnecessários não foram adicionados.
- Documentação foi atualizada quando necessário.
- O projeto continua executando conforme esperado.

## Durante a implementação

- Evitar alterações grandes demais em um único PR.
- Evitar misturar documentação, refatoração e funcionalidade sem necessidade.
- Registrar decisões relevantes em documentação apropriada.
- Manter comunicação com o time quando houver mudança de escopo.

## Quando atualizar documentação

A documentação deve ser atualizada quando houver mudança em:

- Requisitos.
- Casos de uso.
- Histórias de usuário.
- Fluxos principais.
- Regras de negócio.
- Arquitetura.
- Stack tecnológica.
- Integrações externas.
- Processo do time.
