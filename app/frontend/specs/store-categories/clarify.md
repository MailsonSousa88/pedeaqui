# Clarify: store-categories

## Perguntas

### Q1

Pergunta: A tela de categorias deve ser acessada como uma aba dentro da tela de loja/gestão ou como uma página/rota separada?

Resposta: Deve ser acessada dentro da loja, em uma área/aba própria ao lado de `Adicionar`.

Impacto na spec: A implementação deve integrar a tela ao contexto da store, provavelmente junto ao controle de abas usado pela vitrine/gestão.

### Q2

Pergunta: A primeira versão deve ser apenas visual/local, como a tela de adicionar produto, ou já deve preparar service/contract frontend para backend futuro?

Resposta: A primeira versão deve ser visual/local, apenas para entender o funcionamento futuro e definir o design visual.

Impacto na spec: Não criar service real, mock service ou chamada backend nesta fase. A lógica deve ficar local e temporária.

### Q3

Pergunta: Categorias criadas nesta primeira versão devem existir apenas enquanto a tela estiver aberta ou podem permanecer em estado local da página enquanto o usuário navegar entre abas da loja?

Resposta: Devem existir apenas enquanto a tela estiver aberta, de forma mockada temporária para testes visuais.

Impacto na spec: O estado pode ficar dentro da própria tela/hook local de categorias, sem persistência entre sessões ou backend.

### Q4

Pergunta: Como a ordenação deve aparecer nesta primeira versão: botões subir/descer, campo numérico de ordem ou apenas indicação visual sem ação funcional?

Resposta: Usar ordem de criação por enquanto. Categorias aparecem como cards na ordem em que forem criadas. A lógica real de `sort_order` fica para depois.

Impacto na spec: Não implementar reordenação local, drag-and-drop, input numérico de ordem ou botões subir/descer nesta primeira versão.

### Q5

Pergunta: A tela deve mostrar contador de produtos por categoria mesmo sem backend real?

Resposta: Sim. Cada card de categoria deve exibir um contador visual de produtos vinculados.

Impacto na spec: Usar contadores mockados/locais para representar a futura quantidade de produtos vinculados.

### Q6

Pergunta: Para categoria com produtos vinculados, a tela deve mostrar botão de remover desabilitado com aviso visual ou permitir clique e exibir mensagem de bloqueio?

Resposta: Permitir clicar para testar hover/interação visual. Não precisa aviso. O botão pode existir sem funcionar por falta de backend.

Impacto na spec: O botão de remover deve permanecer visualmente interativo, mas sem executar remoção real ou exibir erro obrigatório nesta primeira versão.

### Q7

Pergunta: A categoria `Todos` deve aparecer em um card fixo destacado próprio ou dentro da mesma lista das demais categorias?

Resposta: Deve aparecer como card fixo, sendo o primeiro card da tela de categorias. Ela não pode ser deletada.

Impacto na spec: Criar hierarquia visual com `Todos` em primeiro lugar e sem ação de remoção/edição real.

### Q8

Pergunta: Devemos criar agora a documentação textual da tela em `../../docs/screens/` ou manter apenas a spec executável em `app/frontend/specs/store-categories/`?

Resposta: Sim, criar a documentação textual da tela para servir como base da implementação.

Impacto na spec: Criar `../../docs/screens/screen-store-categories-0012.md` e registrar no mapa de telas.

## Decisões Registradas

- Categoria é entidade própria da loja.
- Categoria pode existir sem produto vinculado.
- Uma categoria pode classificar vários produtos.
- Um produto pode ter no máximo uma categoria específica.
- `Todos` é categoria sistêmica/fixa e não removível.
- A feature deve ficar dentro de `src/features/store/`.
- A tela de categorias deve ser acessada dentro da tela de loja/gestão.
- A primeira versão é visual/local e temporária.
- Categorias criadas localmente vivem apenas enquanto a tela estiver aberta.
- Cards aparecem na ordem de criação.
- Cada card deve mostrar contador visual de produtos.
- Botões de remoção podem ser clicáveis visualmente, mas sem remoção real nesta fase.
- Backend, migrations e Supabase estão fora do escopo.

## Pendências

- Nenhuma pendência bloqueante para a fase `plan`.

## Atualização de decisão — issue #51

### Q9

Pergunta: A criação de categorias deve continuar disponível nesta tela de gerenciamento?

Resposta: Não. A tela deve listar, editar e remover categorias existentes. A criação fica exclusiva ao fluxo de cadastro de produto, onde já existe de forma inline.

Impacto na spec: Remove formulário, estado e chamada de criação desta tela sem alterar o cadastro de produto.

### Decisões substituídas

- As decisões da Q2 e Q3 descrevem a primeira versão visual e não autorizam mais criação de categoria nesta tela.
- A categoria continua sendo entidade própria e pode existir sem produto, mas novas categorias somente são criadas durante o cadastro de produto.
- Não há pendência bloqueante para o plano desta evolução.
