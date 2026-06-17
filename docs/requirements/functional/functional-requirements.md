# Requisitos Funcionais

**[RF001] – Visualização das lojas**

O sistema deve permitir que o usuário visualize uma lista de lojas disponíveis dentro da plataforma.

> **Critério:** A listagem deve exibir apenas lojas ativas e disponíveis para acesso público. Cada loja deve apresentar informações mínimas para identificação, como nome, imagem ou identidade visual e descrição resumida.
---

**[RF002] – Visualização de produtos da loja**

O sistema deve permitir que o usuário visualize uma página de loja específica e visualize seus produtos cadastrados.

> **Critério:** A página da loja deve exibir os produtos vinculados à loja acessada, respeitando categorias, disponibilidade e informações públicas cadastradas pelo lojista.
---

**[RF003] – Informações de um produto**

O sistema deve permitir que o usuário possa visualizar detalhes de um produto específico dentro da loja.

> **Critério:** A tela ou área de detalhes do produto deve apresentar nome, descrição, preço, imagem e disponibilidade do produto no momento da visualização.
---

**[RF004] – Adição de produtos ao carrinho de compras**

O sistema deve permitir que o consumidor adicione produtos de uma loja a um carrinho de compras temporário, armazenado no `localStorage`.

> **Critério:** Carrinho aceita até 50 itens distintos. Produto já presente tem quantidade incrementada. Snapshot do preço, nome e imagem é gravado no momento da adição.
---

**[RF005] – Remoção e atualização de quantidade de produtos do carrinho**

O sistema deve permitir que o usuário ajuste a quantidade de cada item no carrinho por meio de botões `+` e `−`, além de remover itens individualmente.

> **Critério:** Botão `+` incrementa a quantidade em 1 a cada clique. Botão `−` decrementa em 1; ao chegar a 0, o sistema deve pedir confirmação adicional para apagar o produto do carrinho. O total do carrinho deve ser recalculado em tempo real. Carrinho vazio deve exibir mensagem informativa.
---

**[RF006] – Finalização da compra**

O sistema deve permitir que o usuário finalize sua compra a partir do carrinho, gerando automaticamente uma mensagem com os produtos selecionados, quantidades e valor total, redirecionando o usuário para o WhatsApp para envio do pedido ao lojista.

> **Critério:** O botão de finalização só deve ser habilitado com ao menos 1 item de quantidade válida (`≥ 1`). O fluxo deve permitir que o consumidor acesse o carrinho, escolha a loja do pedido, escolha finalizar todos os itens daquela loja ou apenas um pedido específico, informe dados adicionais como endereço, telefone e observações, visualize uma tela de confirmação e finalize o pedido via WhatsApp. A URL deve seguir o formato `wa.me/{numero}?text={mensagem_codificada}`.
---

**[RF007] – Busca e filtragem de produtos dentro da loja**

O sistema deve disponibilizar um campo de pesquisa dentro da loja e permitir que o usuário filtre os resultados encontrados.

> **Critério:** O campo de busca deve aceitar termos parciais do nome do produto na vitrine pública da loja. O usuário deve poder aplicar filtros por faixa de valor, ordem alfabética (`A–Z` / `Z–A`), menor preço e maior preço. Os filtros devem ser aplicados sobre o resultado da busca sem recarregar a página. A combinação de filtros deve ser permitida. Os resultados devem ser paginados com máximo de 20 itens por página.
---

**[RF008] – Exibição de produtos em destaque via banner dinâmico**

O sistema deve exibir produtos selecionados pelo lojista como destaque dentro da loja.

> **Critério:** Produtos em destaque devem aparecer em uma moldura ou área visual de destaque. Apenas produtos em destaque podem estar em promoção. Quando houver promoção, o sistema deve exibir o valor antigo cortado e o novo valor com destaque visual próprio.
---

**[RF009] – Compartilhamento de loja**

O sistema deve permitir que o usuário compartilhe o link de uma loja em aplicativos externos.

> **Critério:** Ao clicar no ícone de compartilhamento da loja, o link deve ser copiado. O ícone deve mudar temporariamente para `✅` por 2 segundos, a mensagem `Link copiado com sucesso ✅` deve aparecer na tela e, após esse período, o ícone deve voltar ao estado natural de compartilhamento.
---

**[RF011] – Login de lojista**

O sistema deve permitir que o lojista autentique sua conta utilizando e-mail e senha.

> **Critério:** Credenciais válidas devem retornar HTTP 200 com um `access token` de curta duração e um `refresh token` de longa duração. Credenciais inválidas devem retornar HTTP 401. O `access token` deve ser usado para acessar rotas protegidas da API, enquanto o `refresh token` deve permitir a renovação da sessão por meio de uma rota de atualização, como `/auth/refresh`. Caso o `refresh token` expire ou seja inválido, o lojista deve realizar login novamente.
---

**[RF012] – Cadastro de lojista**

O sistema deve permitir que um novo lojista se cadastre informando nome completo, e-mail único, senha e CPF ou CNPJ.

> **Critério:** Cadastro válido deve retornar HTTP 201. E-mail duplicado deve retornar HTTP 409. A senha deve possuir no mínimo 8 caracteres. A interface deve separar claramente os fluxos `Cadastrar` e `Entrar`, evitando que lojistas já registrados tentem realizar novo cadastro quando precisarem apenas acessar a conta novamente.
---

**[RF013] – Validação de CPF ou CNPJ**

O sistema deve validar o CPF ou CNPJ informado pelo lojista antes da criação da conta.

> **Critério:** O sistema deve verificar formato e dígitos verificadores do documento. Documento inválido deve impedir a criação da conta e retornar HTTP 422 com o campo `errors.document` na resposta.
---

**[RF014A] – Status pendente pós-cadastro**

O sistema deve definir o status inicial do lojista como `PENDENTE` após o cadastro, até que exista confirmação de pagamento.

> **Critério:** Usuário com status `PENDENTE` não deve conseguir acessar rotas administrativas protegidas, como `/admin/*`, e deve receber HTTP 403 ao tentar acessar recursos restritos ao lojista ativo. O usuário pendente pode acessar apenas as etapas necessárias do onboarding, como escolha de plano, configuração inicial da loja, revisão e pagamento.
---

**[RF014B] – Ativação via webhook de pagamento**

O sistema deve alterar automaticamente o status do lojista de `PENDENTE` para `LOJISTA` após confirmação de pagamento via webhook.

> **Critério:** A atualização deve ocorrer em até 5 segundos após o recebimento do evento válido. O webhook deve ser validado por assinatura `HMAC-SHA256`. Eventos inválidos ou com assinatura incorreta devem retornar HTTP 400 e não devem ativar a conta.
---

**[RF015] – Recuperação de senha**

O sistema deve permitir que o lojista redefina sua senha por meio de um link enviado por e-mail.

> **Critério:** O link de redefinição deve ser válido por 1 hora. Após uso ou expiração, o link deve retornar HTTP 410. Link expirado ou já utilizado não deve alterar a senha.
---

**[RF016] – Criação de loja**

O sistema deve permitir que um lojista crie uma única loja vinculada à sua conta.

> **Critério:** A criação da primeira loja deve ser permitida durante o onboarding do lojista, mesmo antes da confirmação do pagamento, para que as informações da loja sejam revisadas antes da ativação. A loja criada antes do pagamento deve permanecer indisponível na vitrine pública até que o lojista seja ativado. Uma segunda tentativa de criação de loja para o mesmo lojista deve retornar HTTP 409.
---

**[RF017] – Atualização de dados da loja**

O sistema deve permitir que o lojista atualize parcialmente os dados da sua loja.

> **Critério:** A atualização deve permitir alteração de nome, descrição, endereço textual, horário, telefone e WhatsApp. A operação deve seguir semântica `PATCH`, sem sobrescrever campos não enviados. Atualização bem-sucedida deve retornar HTTP 200 com os dados atualizados.
---

**[RF018A] – Desativação da loja**

O sistema deve permitir que o lojista desative sua loja sem remover definitivamente seus dados.

> **Critério:** Loja desativada não deve aparecer no catálogo público e deve retornar HTTP 404 em `GET /stores/:slug` para visitantes não autenticados. A desativação deve ser reversível e não deve apagar loja, produtos, pedidos ou histórico relacionado.
---

**[RF018B] – Ativação da loja**

O sistema deve permitir que o lojista reative uma loja desativada.

> **Critério:** Loja reativada deve voltar a ficar disponível no catálogo público e deve retornar HTTP 200 em `GET /stores/:slug`, desde que o lojista esteja ativo e a loja esteja válida para exibição.
---

**[RF019] – Cadastro de produtos**

O sistema deve permitir que o lojista cadastre produtos vinculados à sua loja.

> **Critério:** Nome e preço são obrigatórios; ausência deve retornar HTTP 422. O preço deve ser informado em reais na interface e armazenado internamente em centavos. A descrição deve ser opcional. O produto deve iniciar com disponibilidade `true`, salvo quando o lojista definir o contrário durante o cadastro.
---

**[RF020] – Edição de produtos**

O sistema deve permitir que o lojista atualize parcialmente os dados de produtos da sua loja.

> **Critério:** A atualização deve permitir alteração de nome, preço, descrição, disponibilidade e destaque quando essa opção estiver habilitada no produto. A operação deve seguir semântica `PATCH`, sem zerar campos não enviados. Atualização bem-sucedida deve retornar HTTP 200 com os dados atualizados.
---

**[RF021] – Remoção de produtos por soft delete**

O sistema deve permitir a remoção lógica de produtos, sem apagar imediatamente o registro do banco de dados.

> **Critério:** Produto removido por soft delete não deve aparecer na vitrine nem no banner de destaque. A remoção bem-sucedida deve retornar HTTP 204. Tentativa de remover produto pertencente a outra loja ou outro lojista deve retornar HTTP 403. O tempo de retenção dos dados removidos deve seguir política de retenção definida pelo projeto.
---

**[RF022] – Listagem de produtos no painel administrativo**

O sistema deve listar os produtos ativos da loja no painel administrativo do lojista.

> **Critério:** A listagem deve possuir paginação de até 20 itens por página e não deve retornar produtos com soft delete aplicado.
---

**[RF023] – Upload de imagens de produto**

O sistema deve permitir que o lojista envie imagens para produtos cadastrados.

> **Critério:** O upload deve aceitar apenas formatos de imagem aprovados pelo projeto, inicialmente `JPEG` e `PNG`, e deve rejeitar arquivos inválidos com HTTP 422. A resposta deve retornar as URLs das imagens armazenadas. O limite de quantidade de imagens por produto e o tamanho máximo por arquivo devem seguir a regra de imagens definida pela equipe.
---

**[RF024] – Controle de estoque misto**

O sistema deve permitir que o lojista escolha o modo de controle de estoque de cada produto.

> **Critério:** No modo `Estoque Livre`, o produto pode ser vendido enquanto estiver marcado como disponível. No modo `Estoque Controlado`, o sistema deve exigir quantidade inicial e bloquear novas compras automaticamente quando o saldo chegar a zero. Produto sem estoque ou marcado como indisponível deve permanecer visível na vitrine, mas com botão de compra desabilitado no frontend. Tentativa de inclusão no carrinho via API deve retornar HTTP 400 com `errors.product` indicando o motivo: `sem_estoque` ou `indisponivel`. Como não haverá inserção em lote, o controle de estoque deve ser definido individualmente durante o cadastro ou edição de cada produto.
---

**[RF025] – Criação de categorias**

O sistema deve permitir que o lojista crie categorias para organizar os produtos da sua loja.

> **Critério:** A categoria deve possuir nome e ordem de exibição. Criação válida deve retornar HTTP 201. Cada loja deve possuir uma categoria padrão `Todos`, criada automaticamente pelo sistema ou garantida como categoria sistêmica da loja.
---

**[RF026] – Gerenciamento de categorias**

O sistema deve permitir que o lojista edite, ordene e remova categorias criadas para sua loja.

> **Critério:** O lojista deve conseguir atualizar nome e ordem de exibição de uma categoria. Edição bem-sucedida deve retornar HTTP 200 com os dados atualizados. Categorias criadas pelo lojista podem ser removidas quando não possuírem produtos vinculados. Remoção de categoria com produtos vinculados deve retornar HTTP 409. Remoção bem-sucedida deve retornar HTTP 204. A categoria padrão `Todos` não deve poder ser removida, pois representa a listagem geral dos produtos da loja.
---

**[RF027] – Associação de categorias ao produto**

O sistema deve permitir que o lojista associe categorias ao produto durante o cadastro ou edição do produto.

> **Critério:** Todo produto deve pertencer automaticamente à categoria padrão `Todos`. Além da categoria `Todos`, o produto pode possuir no máximo 1 categoria específica criada pelo lojista. Caso o lojista não selecione uma categoria específica, o produto permanece apenas em `Todos`. Ao cadastrar ou editar um produto, o frontend deve apresentar claramente o campo de categoria específica como opcional.
---

**[RF028] – Exibição e filtro de produtos por categoria**

O sistema deve permitir que consumidores filtrem os produtos de uma loja por categoria.

> **Critério:** A categoria `Todos` deve exibir todos os produtos disponíveis da loja. Categorias específicas devem exibir apenas produtos associados a elas. As categorias devem funcionar como filtro principal de navegação da vitrine e respeitar a ordem de exibição definida pelo lojista.
---

**[RF029] – Upload de banner da loja**

O sistema deve permitir que o lojista envie opcionalmente uma imagem de banner para a loja.

> **Critério:** O banner deve representar a imagem principal horizontal da loja na vitrine pública. O upload deve aceitar apenas formatos de imagem aprovados pelo projeto, inicialmente `JPEG` e `PNG`, e deve rejeitar arquivos inválidos com HTTP 422. Após upload bem-sucedido, a URL da imagem deve ser atualizada automaticamente no campo correspondente do cadastro da loja. O limite de tamanho do arquivo deve seguir a regra de imagens definida pela equipe; `2 MB` pode ser usado apenas como limite inicial até validação final.
---

**[RF030] – Upload de imagem de perfil da loja**

O sistema deve permitir que o lojista envie opcionalmente uma imagem de perfil para a loja.

> **Critério:** A imagem de perfil deve representar o ícone ou avatar da loja em listagens, cards, cabeçalhos e áreas compactas da interface. O upload deve aceitar apenas formatos de imagem aprovados pelo projeto, inicialmente `JPEG` e `PNG`, e deve rejeitar arquivos inválidos com HTTP 422. Após upload bem-sucedido, a URL da imagem deve ser atualizada automaticamente no campo correspondente do cadastro da loja. O limite de tamanho do arquivo deve seguir a regra de imagens definida pela equipe; `2 MB` pode ser usado apenas como limite inicial até validação final.
---

**[RF031] – Limite de produtos por plano**

O sistema deve restringir o número de produtos cadastrados pelo lojista conforme o plano contratado.

> **Critério:** Cada plano deve possuir um limite de produtos definido no campo `max_products`. Ao tentar cadastrar produto acima do limite permitido pelo plano, o sistema deve bloquear a operação e retornar HTTP 403 com a mensagem `Limite do plano atingido`.
---

**[RF032] – Exibição da vitrine pública**

O sistema deve exibir a loja para consumidores por meio de um `slug` público, sem exigir autenticação.

> **Critério:** A vitrine pública deve ser acessível por `slug` quando a loja estiver ativa. Loja inativa deve retornar HTTP 404. `Slug` inexistente deve retornar HTTP 404.
---

**[RF033] – Processamento de checkout e validação**

O sistema deve receber os produtos selecionados pelo frontend e validar os dados no backend antes de criar o pedido.

> **Critério:** O frontend deve enviar apenas IDs dos produtos e quantidades. O sistema deve ignorar qualquer valor financeiro enviado pelo cliente e sempre consultar os preços atuais no banco de dados. Antes de criar o pedido, o backend deve verificar disponibilidade, estoque controlado e pausa manual de cada item. Se algum produto estiver indisponível, sem estoque ou inválido, a operação deve ser cancelada, nenhum pedido deve ser criado e o sistema deve retornar HTTP 400 com a lista de itens inválidos em `errors.items`. Em caso de sucesso, deve retornar HTTP 201 com o ID do pedido criado e a mensagem formatada para o WhatsApp.
---

**[RF034] – Checkout via WhatsApp**

O sistema deve redirecionar o usuário ao WhatsApp com o pedido formatado após a validação bem-sucedida do checkout.

> **Critério:** A mensagem deve conter nome do produto, quantidade, preço unitário e total. A URL deve seguir o formato `wa.me/{numero}?text={mensagem_codificada}`. Os preços exibidos na mensagem devem ser os valores retornados pelo backend após a validação do checkout.
---

**[RF035] – Validação do WhatsApp da loja**

O sistema deve validar o número de WhatsApp informado pelo lojista durante a configuração inicial da loja.

> **Critério:** O WhatsApp deve ser obrigatório para lojas que receberão pedidos via WhatsApp. O sistema deve validar o formato do número, normalizar para padrão internacional quando aplicável e enviar um código numérico de validação para o número informado. O lojista deve informar o código recebido para confirmar que possui acesso ao WhatsApp cadastrado. Número inválido, código incorreto, código expirado ou número não confirmado deve impedir o redirecionamento para pagamento, a publicação da loja e o uso do checkout via WhatsApp.
---
