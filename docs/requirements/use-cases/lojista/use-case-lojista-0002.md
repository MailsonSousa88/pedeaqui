# UC-LJ-0002 - Cadastrar e configurar loja

## Objetivo

Permitir que o lojista cadastre e configure as informações da sua loja para disponibilizar sua vitrine digital na plataforma.

## Ator principal

Lojista.

## Atores secundários

Cliente.

## Pré-condições

- O lojista deve possuir cadastro válido na plataforma.
- O lojista deve possuir acesso ao painel da loja.

## Pós-condições

- A loja fica cadastrada ou atualizada.
- As informações da loja ficam disponíveis para exibicao pública quando a loja estiver ativa.

## Gatilho

O lojista acessa o painel e inicia o cadastro ou edição das informações da loja.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O lojista realiza login na plataforma. |
| 2 | O sistema valida as credenciais e permite o acesso. |
| 3 | O lojista acessa a dashboard administrativa da loja. |
| 4 | O sistema exibe as informações atuais da loja. |
| 5 | O lojista acessa a opção de cadastro ou configuração da loja. |
| 6 | O lojista informa ou altera nome, descrição, contato e endereco da loja. |
| 7 | O lojista salva as informações. |
| 8 | O sistema válida os dados informados. |
| 9 | O sistema atualiza os dados da loja. |
| 10 | O sistema retorna para a dashboard da loja. |

## Fluxos alternativos

### FA01 - Editar informações da loja após cadastro

| Passo | Ação |
|-------|------|
| 4a | A partir da dashboard, o lojista acessa a opção de editar informações da loja. |
| 4b | O sistema exibe os dados atuais da loja para edição. |
| 4c | O lojista altera as informações desejadas. |
| 4d | O lojista salva as alterações. |
| 4e | O sistema atualiza os dados da loja. |
| 4f | O fluxo retorna para a dashboard da loja. |

## Fluxos de exceção

### FE01 - Dados obrigatórios ausentes

| Passo | Ação |
|-------|------|
| 8a | O sistema identifica ausencia de dados obrigatórios. |
| 8b | O sistema impede o salvamento das informações. |
| 8c | O sistema informa quais campos devem ser corrigidos. |
| 8d | O fluxo retorna ao passo 6 do fluxo principal. |

## Regras de negócio

- A loja deve possuir dados mínimos de identificação e contato.
- Informações públicas da loja devem ser mantidas atualizadas pelo lojista.
- Alterações salvas devem refletir na vitrine pública da loja.

## Referências

- Status Report I - Fluxo Alternativo: Editar informações da loja após cadastro.
- User Story: "Como lojista, eu quero cadastrar e configurar as informações da minha loja..."


