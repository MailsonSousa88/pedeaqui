# Edge Case Category 0008 - Categorias removidas, duplicadas ou inválidas

## Origem

Levantamento de edge cases a partir dos requisitos de criação, gerenciamento e associação de categorias.

## Contexto

O sistema usa categorias como filtro principal da vitrine. Todo produto pertence à categoria sistêmica `Todos` e pode possuir uma categoria específica criada pelo lojista.

## Situação fora do caminho feliz

Podem ocorrer situações como:

- lojista tenta remover categoria com produtos vinculados;
- produto fica sem categoria específica;
- categoria `Todos` é alterada ou removida por engano;
- duas categorias possuem a mesma ordem de exibição;
- lojista cria categorias duplicadas ou muito parecidas.

## Risco

Sem regra clara, o sistema pode:

- deixar produtos órfãos;
- quebrar filtros da vitrine;
- ocultar produtos que deveriam aparecer em `Todos`;
- permitir remoção da categoria principal;
- exibir categorias em ordem inconsistente.

## Comportamento esperado

O sistema deve:

1. Impedir remoção da categoria `Todos`.
2. Impedir remoção de categoria com produtos vinculados ou exigir remapeamento.
3. Manter produtos sem categoria específica visíveis em `Todos`.
4. Tratar ordenação duplicada de forma previsível.
5. Validar categorias por loja e tenant.

## Critérios de validação

- Remoção de categoria com produtos vinculados deve retornar HTTP 409.
- Categoria `Todos` não deve poder ser removida.
- Produto sem categoria específica deve aparecer em `Todos`.
- Categoria de outro tenant não deve poder ser usada.
- Alteração de ordem deve preservar listagem consistente.

## Decisões pendentes

O time ainda precisa decidir:

- se categorias com produtos vinculados podem ser removidas após remapear produtos;
- se nomes duplicados serão bloqueados por loja;
- como resolver categorias com mesma `sort_order`;
- se a categoria `Todos` será registro no banco ou apenas filtro sistêmico.

## Observação

Categorias são parte da navegação da vitrine. Por isso, falhas nelas afetam diretamente a experiência do consumidor.
