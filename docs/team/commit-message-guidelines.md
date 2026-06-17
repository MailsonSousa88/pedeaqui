# Guia de Commits

## Objetivo

Padronizar as mensagens de commit do projeto PedeAqui para manter o histórico do Git claro, rastreável e útil para revisão.

## Padrão obrigatório

As mensagens de commit devem seguir o formato:

```text
tipo: descrição objetiva da alteração
```

Exemplos:

```text
feat: adicionado cadastro de produtos pelo lojista
fix: corrigida validação de CPF no cadastro do lojista
docs: adicionados casos de uso do fluxo do cliente
chore: atualizada configuração do TypeScript
refactor: reorganizado serviço de produtos
test: adicionados testes para criação de loja
```

## Tipos permitidos

| Tipo | Uso |
|------|-----|
| `feat` | Nova funcionalidade. |
| `fix` | Correção de bug. |
| `docs` | Alterações em documentação. |
| `chore` | Tarefas de manutenção, configuração ou ajustes sem impacto direto em regra de negócio. |
| `refactor` | Refatoração sem mudança de comportamento esperado. |
| `test` | Criação ou ajuste de testes. |

## Regras

- A mensagem deve ser escrita em português(pt-br).
- A descrição deve ser objetiva e explicar o que foi alterado.
- Usar verbo no passado/particípio: `adicionado`, `corrigido`, `removido`, `atualizado`, `organizado`.
- Não usar mensagens genéricas ou informais.
- Evitar commits grandes com muitas alterações sem relação entre si.
- Separar alterações de documentação, código, testes e configuração quando fizer sentido.

## Exemplos proibidos

```text
fiz uma alteração legal
ajustes
coisas
update
commit final
arrumei tudo
teste
subindo alterações
```

## Exemplos recomendados

```text
feat: adicionado fluxo de cadastro de loja
feat: adicionado upload de imagem de produto
fix: corrigido redirecionamento para WhatsApp
docs: adicionado guia de commits do time
refactor: separadas validações de produto em serviço próprio
chore: configuradas variáveis de ambiente do backend
```
