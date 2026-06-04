# UC-AD-0003 - Monitorar logs e eventos

## Objetivo

Permitir que o administrador visualize logs de acesso, atividades dos usuários e eventos da plataforma para acompanhar o funcionamento do sistema e apoiar a segurança da aplicação.

## Ator principal

Administrador.

## Atores secundários

Usuários da plataforma.

## Pré-condições

- O administrador deve possuir acesso ao painel administrativo.
- O sistema deve possuir logs ou eventos registrados.

## Pós-condições

- O administrador visualiza os logs ou detalhes de eventos selecionados.
- O sistema mantem o histórico de acesso e atividades para monitoramento.

## Gatilho

O administrador acessa a aba "Logs" no menu lateral do painel administrativo.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O administrador clica na aba "Logs" do menu lateral. |
| 2 | O sistema exibe a listagem de logs de acesso no período de 6 meses. |
| 3 | O administrador utiliza busca ou filtros para localizar um log, por exemplo por data. |
| 4 | O administrador seleciona um log. |
| 5 | O sistema exibe os detalhes do log selecionado. |
| 6 | O administrador analisa as informações do log. |
| 7 | O administrador clica em voltar. |
| 8 | O sistema retorna para a tela que lista todos os logs. |

## Fluxos alternativos

### FA01 - Administrador visualiza logs sem filtro

| Passo | Ação |
|-------|------|
| 3a | O administrador não aplica filtros. |
| 3b | O sistema mantem a listagem geral de logs disponível para navegação. |
| 3c | O fluxo segue para o passo 4 do fluxo principal. |

## Fluxos de exceção

### FE01 - Nenhum log encontrado

| Passo | Ação |
|-------|------|
| 3a | O sistema não encontra logs para os filtros informados. |
| 3b | O sistema informa que nenhum log foi encontrado. |
| 3c | O administrador pode alterar os filtros ou voltar para a listagem geral. |

## Regras de negócio

- Logs de acesso devem ficar disponíveis para consulta administrativa pelo período de 6 meses.
- O acesso aos logs deve ser restrito a administradores autorizados.
- Logs devem auxiliar na identificação de problemas, atividades suspeitas e eventos relevantes da plataforma.

## Referências

- Status Report I - Fluxo Alternativo: Administrador visualiza logs.
- User Story: "Como Admin, eu quero visualizar logs de acesso, atividades dos usuários e eventos da plataforma..."


