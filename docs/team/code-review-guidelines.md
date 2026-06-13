# Guia de Pull Requests e Code Review

## Objetivo

Definir regras mínimas para revisão de Pull Requests no projeto PedeAqui, garantindo qualidade, colaboração e redução de erros antes do merge.

## Regra principal

Todo Pull Request deve ter pelo menos **2 pessoas revisoras** antes de ser aprovado para merge.

## Regras para abrir Pull Request

- O PR deve ter título claro e objetivo.
- O PR deve descrever o que foi alterado.
- O responsável pelo PR deve se marcar no campo `Assignees` do GitHub.
- O PR deve informar se houve alteração em documentação, frontend, backend, banco ou configuração.
- O PR deve ser pequeno o suficiente para revisão efetiva sempre que possível.
- O autor do PR deve revisar o próprio diff antes de solicitar revisão.
- O PR não deve misturar alterações sem relação entre si.

## Regras para revisão

- Verificar se a alteração atende ao objetivo proposto.
- Verificar se o código está claro, organizado e coerente com o padrão do projeto.
- Verificar impactos em regras de negócio.
- Verificar possíveis falhas de segurança, autenticação, autorização e validação.
- Verificar se documentação precisa ser atualizada.
- Verificar se há necessidade de testes.
- Não aprovar PR apenas por confiança no autor.

## Critérios mínimos para aprovação

Um PR só deve ser aprovado quando:

- Tiver pelo menos 2 revisores.
- Não houver comentários críticos pendentes.
- A branch estiver atualizada com a base, quando necessário.
- O código/documentação estiver coerente com o escopo do PR.
- O autor tiver respondido ou resolvido os apontamentos da revisão.

## Exemplos de títulos recomendados

```text
feat: adiciona cadastro de produtos
fix: corrige validação de documento do lojista
docs: adiciona casos de uso do cliente
refactor: reorganiza rotas de produtos
```

## Exemplos de títulos proibidos

```text
ajustes
alterações
coisas novas
arrumei
final
```
