# US-LJ-0002 - Gerenciar produtos

## Épico

Épico 2 - Gestão de Loja pelo Lojista.

## Ator

Lojista.

## História de usuário

Como lojista, eu quero gerenciar meus produtos, cadastrando, editando e removendo itens, para que minha vitrine esteja sempre atualizada para os consumidores.

## Valor para o usuário

Permite que o lojista mantenha o catálogo atualizado, reduzindo informações incorretas ou desatualizadas para os clientes.

## Critérios de aceitação

- Dado que o lojista esteja autenticado, quando acessar o gerenciamento de produtos, então o sistema deve exibir os produtos cadastrados.
- Dado que o lojista informe os dados obrigatórios de um novo produto, quando salvar, então o sistema deve cadastrar o produto na loja.
- Dado que o lojista altere dados de um produto existente, quando salvar, então o sistema deve atualizar o produto na vitrine.
- Dado que o lojista remova um produto, quando confirmar a remoção, então o sistema deve retirar o produto da vitrine pública.
- Dado que os dados do produto estejam inválidos ou incompletos, quando o lojista tentar salvar, então o sistema deve bloquear a operação e informar o problema.

## Prioridade

Alta.

## Dependências

- Loja cadastrada.
- Painel administrativo da loja.

## Referências

- Status Report I - Fluxo Principal: Lojista acessa a dashboard administrativa.
- Caso de uso: [UC-LJ-0003 - Gerenciar produtos da loja](../use-cases/lojista/use-case-lojista-0003.md).


