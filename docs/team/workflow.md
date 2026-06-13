# Workflow do Time

## Objetivo

Definir o fluxo básico de trabalho do time Cloud Hive no desenvolvimento do PedeAqui.

## Fluxo de trabalho que deve ser seguido pela equipe

1. Criar uma branch de trabalho a partir da branch `development` atualizada.
2. Implementar a alteração com escopo claro.
3. Fazer commits seguindo o guia de commits.
4. Atualizar documentação quando a alteração impactar regras, fluxos, arquitetura ou requisitos.
5. Abrir Pull Request apontando para a branch `development`.
6. Solicitar revisão de pelo menos 2 pessoas.
7. Corrigir pontos levantados na revisão.
8. O autor do PR deve fazer o merge na `development` somente após aprovação mínima.
9. Após validação na `development`, abrir Pull Request da `development` para a `main`.
10. Fazer merge na `main` somente quando a versão estiver validada e estável.

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

Mudanças sensíveis devem ter validação dos revisores que foram requisitados (Mínimo) antes do merge.

São consideradas mudanças sensíveis:

- Alterações em arquitetura.
- Alterações em banco de dados.
- Alterações em autenticação ou autorização.
- Alterações em pagamento.
- Alterações em deploy ou infraestrutura.
- Alterações em regras de negócio críticas.
- Alterações em documentos oficiais do projeto.

O merge da `development` para a `main` deve ser feito pelo responsavel ou por uma pessoa autorizada pelo responsavel, após validação da versão.

## Antes de abrir um Pull Request

O autor deve verificar:

- A branch possui nome adequado.
- Os commits possuem mensagens claras.
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
