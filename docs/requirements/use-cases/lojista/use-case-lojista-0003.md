# UC-LJ-0003 - Gerenciar produtos da loja

## Objetivo

Permitir que o lojista cadastre, edite e remova produtos para manter sua vitrine digital atualizada.

## Ator principal

Lojista.

## Atores secundários

Consumidor.

## Pré-condições

- O lojista deve estar autenticado.
- O lojista deve possuir uma loja cadastrada.
- O lojista deve ter acesso ao painel administrativo da loja.

## Pós-condições

- Os produtos da loja ficam cadastrados, atualizados ou removidos conforme a ação realizada.
- A vitrine pública reflete as alterações feitas pelo lojista.
- As ações realizadas pelo lojista ficam registradas pelo sistema.

## Gatilho

O lojista acessa a opção de gerenciamento de produtos na dashboard da loja.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O lojista realiza login na plataforma. |
| 2 | O sistema valida as credenciais e permite o acesso. |
| 3 | O lojista acessa a dashboard administrativa da loja. |
| 4 | O sistema exibe informações da loja, produtos cadastrados e pedidos recebidos. |
| 5 | O lojista acessa a opção de gerenciamento de produtos. |
| 6 | O sistema exibe a listagem de produtos da loja. |
| 7 | O lojista escolhe cadastrar, editar ou remover um produto. |
| 8 | O sistema processa a ação escolhida. |
| 9 | O sistema atualiza as informações dos produtos cadastrados. |
| 10 | O sistema registra a ação realizada pelo lojista. |

## Fluxos alternativos

### FA01 - Cadastrar produto

| Passo | Ação |
|-------|------|
| 7a | O lojista seleciona a opção de cadastrar produto. |
| 7b | O sistema exibe o formulário de cadastro. |
| 7c | O lojista informa os dados do produto. |
| 7d | O sistema salva o novo produto. |
| 7e | O fluxo retorna ao passo 9 do fluxo principal. |

### FA02 - Editar produto

| Passo | Ação |
|-------|------|
| 7a | O lojista seleciona um produto existente. |
| 7b | O lojista escolhe a opção de editar produto. |
| 7c | O sistema exibe os dados atuais do produto. |
| 7d | O lojista altera as informações e salva. |
| 7e | O fluxo retorna ao passo 9 do fluxo principal. |

### FA03 - Remover produto

| Passo | Ação |
|-------|------|
| 7a | O lojista seleciona um produto existente. |
| 7b | O lojista escolhe a opção de remover produto. |
| 7c | O sistema solicita confirmação. |
| 7d | O lojista confirma a remoção. |
| 7e | O sistema remove o produto da vitrine da loja. |
| 7f | O fluxo retorna ao passo 9 do fluxo principal. |

## Fluxos de exceção

### FE01 - Dados do produto inválidos ou incompletos

| Passo | Ação |
|-------|------|
| 8a | O sistema identifica dados inválidos ou obrigatórios ausentes. |
| 8b | O sistema impede o salvamento do produto. |
| 8c | O sistema informa quais campos devem ser corrigidos. |
| 8d | O lojista corrige os dados e tenta salvar novamente. |

## Regras de negócio

- Produtos cadastrados devem pertencer a uma loja específica.
- Produtos removidos não devem aparecer na vitrine pública.
- Alterações de produtos devem ser refletidas para os consumidores.
- As ações do lojista devem ser registradas para auditoria operacional.

## Referências

- Status Report I - Fluxo Principal: Lojista acessa a dashboard administrativa.
- User Story: "Como lojista, eu quero gerenciar meus produtos..."


