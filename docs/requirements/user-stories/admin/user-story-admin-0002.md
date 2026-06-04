# US-AD-0002 - Moderar conteúdos publicados

## Épico

Épico 3 - Administração e Monitoramento da Plataforma.

## Ator

Administrador.

## História de usuário

Como administrador, eu quero moderar conteúdos das lojas e produtos publicados para que eu possa remover informações inadequadas ou fora das diretrizes da plataforma.

## Valor para o usuário

Ajuda a manter a qualidade, segurança e conformidade dos conteúdos publicados na plataforma.

## Critérios de aceitação

- Dado que existam produtos cadastrados, quando o administrador acessar a aba de conteúdo, então o sistema deve exibir a listagem de produtos.
- Dado que o administrador utilize busca ou filtros, quando houver produtos correspondentes, então o sistema deve exibir os resultados encontrados.
- Dado que o administrador selecione um produto, quando revisar o conteúdo, então o sistema deve exibir as informações do produto e da loja relacionada.
- Dado que o administrador aprove, bloqueie ou remova um produto, quando confirmar a operação, então o sistema deve atualizar o estado do produto.
- Dado que um produto seja bloqueado ou removido, quando a vitrine pública for acessada, então o produto não deve aparecer como disponível.

## Prioridade

Média.

## Dependências

- Painel administrativo.
- Produtos cadastrados por lojistas.
- Regras de moderação da plataforma.

## Referências

- Status Report I - Fluxo Alternativo: Administrador modera conteúdos.
- Caso de uso: [UC-AD-0002 - Moderar conteúdos](../use-cases/admin/use-case-admin-0002.md).


