# UC-LJ-0001 - Contratar plano lojista

## Objetivo

Permitir que o lojista contrate um plano da plataforma utilizando CPF ou CNPJ válido para liberar o uso dos recursos do PedeAqui.

## Ator principal

Lojista.

## Atores secundários

Sistema de válidação cadastral.

## Pré-condições

- O lojista deve acessar a plataforma.
- A plataforma deve possuir ao menos um plano disponível para contratação.

## Pós-condições

- O plano do lojista é contratado.
- O acesso ao painel da loja é liberado após a aprovação da contratação.
- O CPF ou CNPJ válido fica associado ao cadastro do lojista.

## Gatilho

O lojista inicia o processo de contratação de um plano.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O lojista acessa a página inicial da plataforma. |
| 2 | O lojista seleciona a opção de contratar plano. |
| 3 | O sistema solicita CPF ou CNPJ. |
| 4 | O lojista informa o CPF ou CNPJ. |
| 5 | O sistema válida o documento informado. |
| 6 | O sistema exibe os planos disponíveis. |
| 7 | O lojista escolhe um plano. |
| 8 | O sistema confirma a contratação do plano. |
| 9 | O sistema libera o acesso ao painel da loja. |

## Fluxos alternativos

### FA01 - Lojista já possui plano contratado

| Passo | Ação |
|-------|------|
| 2a | O sistema identifica que o lojista já possui um plano ativo. |
| 2b | O sistema direciona o lojista para o painel da loja. |

## Fluxos de exceção

### FE01 - CPF ou CNPJ inválido

| Passo | Ação |
|-------|------|
| 5a | O sistema identifica que o CPF ou CNPJ informado é inválido. |
| 5b | O sistema impede o avanço da contratação. |
| 5c | O sistema exibe mensagem de erro solicitando a correção do documento. |
| 5d | O fluxo retorna ao passo 3 do fluxo principal. |

## Regras de negócio

- O lojista não deve avançar na contratação com CPF ou CNPJ inválido.
- A contratação de plano e requisito para uso completo dos recursos da loja.
- A plataforma deve manter registro do documento associado ao cadastro do lojista.

## Referências

- Status Report I - Épico 2: Gestão de Loja pelo Lojista.
- User Story: "Como lojista, eu quero contratar o plano lojista com um CPF ou CNPJ válido..."


