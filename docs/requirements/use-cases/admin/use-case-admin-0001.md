# UC-AD-0001 - Gerenciar lojistas

## Objetivo

Permitir que o administrador visualize, busque e gerencie contas de lojistas, podendo aprovar, bloquear ou editar cadastros.

## Ator principal

Administrador.

## Atores secundários

Lojista.

## Pré-condições

- O administrador deve possuir acesso ao painel administrativo.
- Devem existir lojistas cadastrados para consulta ou gestão.

## Pós-condições

- A conta do lojista é atualizada conforme a ação administrativa realizada.
- A ação administrativa fica registrada pelo sistema.
- A listagem de lojistas reflete o estado atualizado da conta.

## Gatilho

O administrador acessa a aba "Lojistas" no menu lateral do painel administrativo.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O administrador clica na aba "Lojistas" do menu lateral. |
| 2 | O sistema exibe a listagem de lojistas cadastrados. |
| 3 | O administrador utiliza busca ou filtros para localizar um lojista. |
| 4 | O administrador seleciona um lojista da lista. |
| 5 | O sistema exibe os detalhes da conta do lojista. |
| 6 | O administrador escolhe uma ação: aprovar, bloquear ou editar conta. |
| 7 | O sistema solicita confirmação da ação. |
| 8 | O administrador confirma a operação. |
| 9 | O sistema atualiza a loja e registra a ação realizada. |
| 10 | O sistema exibe novamente a listagem de lojistas cadastrados. |

## Fluxos alternativos

### FA01 - Administrador apenas visualiza detalhes

| Passo | Ação |
|-------|------|
| 6a | A partir do passo 6, o administrador seleciona "Voltar". |
| 6b | O sistema retorna para a tela de detalhes do lojista ou para a listagem. |
| 6c | Nenhuma ação de aprovação, bloqueio ou edição e executada. |

## Fluxos de exceção

### FE01 - Lojista não encontrado

| Passo | Ação |
|-------|------|
| 3a | O sistema não encontra lojistas com os critérios informados. |
| 3b | O sistema informa que nenhum resultado foi encontrado. |
| 3c | O administrador pode alterar os filtros ou retornar para a listagem completa. |

## Regras de negócio

- Aprovações, bloqueios e edicoes devem exigir confirmação do administrador.
- Toda ação administrativa sobre lojistas deve ser registrada.
- Lojistas bloqueados não devem operar normalmente a vitrine na plataforma.

## Referências

- Status Report I - Épico 3: Administração e Monitoramento da Plataforma.
- Fluxo Principal: Administrador acessa a dashboard administrativa.


