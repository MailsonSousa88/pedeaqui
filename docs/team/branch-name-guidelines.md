# Guia de Branches

## Objetivo

Padronizar a criação de branches para facilitar organização, revisão e rastreabilidade das entregas do time.

## Padrão obrigatório

As branches devem seguir o formato:

```text
tipo/nome-da-funcionalidade
```

Exemplos:

```text
feat/cadastro-produtos
fix/validacao-cpf-cnpj
docs/status-report-i
refactor/service-produtos
chore/configuracao-eslint
```

## Prefixos permitidos

| Prefixo | Uso |
|---------|-----|
| `feat/` | Nova funcionalidade. |
| `fix/` | Correção de bug. |
| `docs/` | Alterações de documentação. |
| `refactor/` | Refatoração de código. |
| `chore/` | Configuração, manutenção ou tarefas internas. |
| `test/` | Criação ou ajuste de testes. |

## Regras

- Usar letras minúsculas.
- Usar hífen para separar palavras.
- Evitar acentos, espaços e caracteres especiais no nome da branch.
- O nome deve indicar claramente o objetivo da alteração.
- Uma branch deve representar uma entrega ou correção coesa.

## Exemplos proibidos

```text
minha-branch
alteracoes
teste
feat/coisas
branch-mailson
arrumando-tudo
```

## Exemplos recomendados

```text
feat/cadastro-loja
feat/carrinho-por-loja
feat/upload-imagem-produto
fix/redirecionamento-whatsapp
docs/casos-de-uso-admin
chore/setup-backend-express
```
