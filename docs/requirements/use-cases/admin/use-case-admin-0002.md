# UC-AD-0002 - Moderar conteúdos

## Objetivo

Permitir que o administrador revise produtos publicados pelos lojistas e execute ações de moderação quando identificar conteúdos inadequados ou fora das diretrizes da plataforma.

## Ator principal

Administrador.

## Atores secundários

Lojista e cliente.

## Pré-condições

- O administrador deve possuir acesso ao painel administrativo.
- Devem existir produtos cadastrados por lojistas.

## Pós-condições

- O produto analisado é aprovado, bloqueado ou removido conforme a decisão administrativa.
- A loja relacionada ao produto é atualizada quando necessário.
- A ação de moderação fica registrada pelo sistema.

## Gatilho

O administrador acessa a aba "Conteúdo" no menu lateral do painel administrativo.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O administrador clica na aba "Conteúdo" do menu lateral. |
| 2 | O sistema exibe a listagem de todos os produtos cadastrados. |
| 3 | O administrador utiliza busca ou filtros para localizar um produto ou tipo de produto. |
| 4 | O administrador seleciona um produto para revisão. |
| 5 | O sistema exibe as informações do produto e da loja relacionada. |
| 6 | O administrador escolhe uma ação: aprovar, bloquear produto, remover produto ou voltar. |
| 7 | O administrador confirma a operação. |
| 8 | O sistema atualiza ou exclui o produto da loja a que ele pertence. |
| 9 | O sistema registra a ação administrativa. |
| 10 | O sistema retorna para a tela que lista todos os produtos. |

## Fluxos alternativos

### FA01 - Administrador volta sem moderar

| Passo | Ação |
|-------|------|
| 6a | O administrador seleciona a opção de voltar. |
| 6b | O sistema retorna para a listagem de produtos. |
| 6c | Nenhuma alteração é aplicada ao produto. |

## Fluxos de exceção

### FE01 - Produto não encontrado

| Passo | Ação |
|-------|------|
| 3a | O sistema não encontra produtos com os critérios informados. |
| 3b | O sistema informa que nenhum produto foi encontrado. |
| 3c | O administrador pode alterar os filtros ou retornar para a listagem completa. |

## Regras de negócio

- Produtos fora das diretrizes da plataforma podem ser bloqueados ou removidos.
- A moderação deve registrar qual administrador realizou a ação.
- Produtos removidos ou bloqueados não devem aparecer na vitrine pública da loja.

## Referências

- Status Report I - Fluxo Alternativo: Administrador modera conteúdos.
- User Story: "Como Admin, eu quero moderar conteúdos das lojas e produtos publicados..."


