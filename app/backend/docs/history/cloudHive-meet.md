# Documentação de Requisitos Funcionais (RF)

## Metodologia de Discussão de Requisitos

* **RESPOSTA:** Identifica aqueles que devem responder (o ALVO da pergunta).
* **ANALISTAS:** Identifica aqueles que devem entender a DÚVIDA e COMPREENDER a resposta (tirando suas dúvidas, caso necessário).
* **OBS:** Os analistas utilizam estas discussões para alinhamento entre ambas as partes durante o desenvolvimento.

---

### [RF001] – Visualização das lojas

O sistema deve permitir que o usuário visualize uma lista de lojas disponíveis dentro da plataforma.

* **STATUS:** Aceito

---

### [RF002] – Visualização de produtos da loja

O sistema deve permitir que o usuário visualize uma página de loja específica e visualize seus produtos cadastrados.

* **STATUS:** Aceito

---

### [RF003] – Informações de um produto

O sistema deve permitir que o usuário possa visualizar detalhes de um produto específico dentro da loja.

* **STATUS:** Aceito

---

### [RF004] – Adição de produtos ao carrinho de compras

O sistema deve permitir que o usuário adicione um ou mais produtos de uma loja a um carrinho de compras temporário.

* **Critério:** Carrinho aceita até 50 itens distintos. Produto já presente tem quantidade incrementada. Snapshot do preço, nome e imagem é gravado no momento da adição.
* **Dúvidas:** 1. Quando nos referimos ao carrinho de compras temporario falamos do "CARD DE LOJA" que contém os items/produtos que foram pedidos nessa loja especifica, certo?
* **SUGESTÃO:** FRONTEND --> Adicionar um botão que leva o usuario até o carrinho de compras apartir do momento em que voce adiciona um produto no seu carrinho! (Esse botão seria um extra, o icone de carrinho continua igual)
* **Resposta:** @⁨Vitor L.⁩ @⁨Rykelry 🐧⁩
* **Analistas:** @⁨Cássio⁩ @⁨Mateus de Araújo⁩ @⁨~Larry Skeleton⁩

---

### [RF005] – Remoção e Atualização de Quantidade de Produtos do Carrinho

O sistema deve permitir que o usuário ajuste a quantidade de cada item no carrinho por meio de botões '+' e '−', e remova itens individualmente. Ao atingir quantidade 0 pelo botão '−', o item é removido do carrinho automaticamente.

* **Critério:** Botão '+' incrementa a quantidade em 1 a cada clique. Botão '−' decrementa em 1; ao chegar a 0 o item é removido sem confirmação adicional. Total do carrinho é recalculado em tempo real. Carrinho vazio exibe mensagem informativa.
* **Histórico de Modificação:** ▲ MODIFICADO (instrução nova) — RF original era apenas remoção. Reescrito para incluir controle de quantidade com botões '+'/'-', comportamento ao zerar e recalculo em tempo real.
* **Pergunta:** Sinceramente isso é otimo, eu gostaria que isso fosse aceito!
* **Resposta:** @⁨Mateus de Araújo⁩ @⁨Cássio⁩ @⁨~Larry Skeleton⁩
* **Analistas:** @⁨Rykelry 🐧⁩ @⁨Vitor L.⁩

---

### [RF006] – Finalização da compra

O sistema deve permitir que o usuário finalize sua compra a partir do carrinho, gerando automaticamente uma mensagem contendo os produtos selecionados, quantidades e valor total, redirecionando o usuário para o WhatsApp para envio do pedido ao lojista.

* **Critério:** Botão só é habilitado com ao menos 1 item de quantidade válida (≥ 1). URL segue formato wa.me/{numero}?text={mensagem_codificada}. WhatsApp abre em nova aba. Se loja não tiver número cadastrado, botão é desabilitado com aviso.
* **Histórico de Modificação:** ▲ MODIFICADO — critério expandido com formato de URL, condição de habilitação e tratamento de loja sem WhatsApp.
* **Duvida:** O fluxo seria assim? Pagina de carrinho --> card de loja --> lista de produtos da loja --> botao de finalizar pedido --> tela de informações que devem ser preenchidas --> tela de finalização do pedido final (Essa redireciona para o whatsapp)
* **Obs:** Na utlima tela teremos um botão de cancelar pedido?
* **Resposta:** @⁨~Larry Skeleton⁩ @⁨Cássio⁩
* **Analistas:** @⁨Vitor L.⁩ @⁨Rykelry 🐧⁩

---

> ⚠️ **Nota de Controle de Escopo:** RF07 e RF08 originais foram REMOVIDOS. O antigo RF09 foi reordenado e agora assume a numeração **RF007**.

---

### [RF007] – Busca e Filtragem de Produtos dentro da Loja

O sistema deve disponibilizar um campo de pesquisa centralizado na parte superior da loja. A partir de uma busca realizada, o usuário poderá aplicar filtros sobre os resultados: por faixa de valor, ordem alfabética (A–Z / Z–A), menor preço e maior preço.

* **Critério:** Campo de busca aceita termos parciais do nome do produto. Filtros são aplicados sobre o resultado da busca sem recarregar a página. Combinação de filtros é permitida. Resultados paginados com máximo de 20 itens por página.
* **Histórico de Modificação:** ▲ REESCRITO (instrução nova) — RF008 original ('filtragem por categoria') foi substituído. Navegação por categoria já é feita pelas abas na parte superior da loja. Este RF passa a cobrir: campo de busca centralizado + filtros de valor e ordenação sobre os resultados. RF009 original (ordenação isolada) foi fundido aqui.
* **Aviso Técnico:** ⚠️ O time responsavel pela ideia de filtro deve apresentar um modelo visual para que os membros do frontend entendam como deve ser feito!
* **Duvida:** 1. Devemos usar categorias/filtros SOMENTE dentro das lojas (LOJA INDIVIDUAL) ou na PAGINA DE LOJAS tambem? 2. Teremos uma barra de pesquisa dentro da loja (INDIVIDUAL) e uma na pagina de lojas certo?
* **Resposta:** @⁨Rykelry 🐧⁩ @⁨Vitor L.⁩
* **Analistas:** @⁨Cássio⁩ @⁨~Larry Skeleton⁩

---

### [RF008] – Exibição de Produtos em Destaque via Banner Dinâmico

O sistema deve exibir um banner dinâmico na parte superior da página da loja do vendedor, logo abaixo do perfil e banner principal, destacando produtos selecionados pelo lojista. O banner deve ser rotativo e exibir imagem, nome e preço de cada produto em destaque.

* **Critério:** Banner exibe apenas produtos marcados como 'em destaque' pelo lojista e com disponibilidade activa. Produtos indisponíveis são automaticamente removidos do banner. Clique no produto do banner redireciona para a página de detalhe do produto.
* **Histórico de Modificação:** ▲ REESCRITO (instrução nova) — 'destaque' agora está definido: banner dinâmico abaixo do perfil/banner principal, com produtos selecionados pelo lojista. O modelo de domínio precisa incluir campo featured (booleano) na tabela products para suportar este RF.
* **Duvida:** 1. Destaque é diferente de promoção? 2. Os produtos vão possuir ESTADOS é isso? Exemplo: Lojista adiciona o produto, ele começa no estado "PADRÃO" lojista aplica estado "DESTAQUE" --> produto deixa o estado inicial (PADRÃO)
* **SUGESTÃO:** Alterar DESTAQUE para PROMOÇÃO ou algo relativo/proximo disso, facilitar o trabalho de desenvolvimento dessa feature. Usariamos esses dois estados, padrão e promocional, poderiamos possibilitar o lojista alterar o estado e assim garantindo uma forma de destaque para os produtos desejados. No front, poderiamos deixar os produtos destacados (Em promoção) com uma cor em sua volta, como uma moldura, isso caso o time do backend aceitem a SUGESTÃO ACIMA , ou tenham uma ideia melhor!
* **Resposta:** @⁨Vitor L.⁩ @⁨Rykelry 🐧⁩
* **Analistas:** @⁨~Larry Skeleton⁩ @⁨Cássio⁩
* **Discussão em Aberto:** Este banner deve ser discutido, com base na questão do estado promoção! @⁨Cássio⁩ @⁨Mateus de Araújo⁩ @⁨Vitor L.⁩ Vai existir mais de um banner? Ele continua ou não existindo? Minha opinião: Não acho bom existir esse banner, vai dar muito trabalho a não ser que tenham uma sugestão melhor.

---

### [RF009] – Compartilhamento de loja

O sistema deve permitir que o usuário compartilhe o link de uma loja em aplicativos externos.

* **SUGESTÃO:** Usaremos apenas uma URL para cada loja, com icones responsivos e uma mensagem que notifica o usuario que ele copiou o link
* **Fluxo Sugerido:** cliente entra na pagina de uma loja X --> clica no icone de compartilha loja --> icone muda para um "✅" e fica por 2 segundos nesse estado --> mensagem de "Link copiado com sucesso ✅" aparece na tela --> o icone volta para o estado natural (icone padrao de compartilhamento)
* **Respostas (BACKEND/FRONTEND):** @⁨Vitor L.⁩ @⁨~Larry Skeleton⁩ @⁨Rykelry 🐧⁩ @⁨Cássio⁩

---

### [RF0010] – Listagem, atualização e deleção de lojas

O sistema deve possuir rotas de listagem, atualização e deleção de lojas para servir o catálogo principal da plataforma (rota /stores).

* **Critério:** GET /stores retorna lista paginada (20/página). PATCH /admin/store retorna HTTP 200. DELETE solicita confirmação; retorna HTTP 204.
* **Histórico de Modificação:** ▲ MODIFICADO — três operações ainda agrupadas por decisão do time, mas critérios HTTP explicitados para cada uma. Rota '*/main' substituída por '/stores' conforme contratos REST do projeto.
* **STATUS:** Aceito

---

### [RF0011] – Login de Lojista

O sistema deve autenticar o lojista via e-mail e senha.

* **Critério:** Credenciais válidas retornam JWT com expiração de 24h (HTTP 200); inválidas retornam HTTP 401.
* **Discussão Estrutural:** > O JWT não é o SUFICENTE para manter a "estabilidade" do site/plataforma.
Sugestão para o RF0011: O login do lojista não deve depender apenas de um único JWT com expiração longa de 24 horas. A autenticação deve utilizar dois tipos de token:
1. Access Token: Token JWT de curta duração, usado para acessar rotas protegidas da API. Exemplo: 15 minutos ou 1 hora.
2. Refresh Token: Token de longa duração, usado para renovar o Access Token sem exigir que o lojista faça login novamente. Exemplo: 7 dias, 15 dias ou 30 dias.


--> Com isso, o lojista continua autenticado de forma mais estável, mas sem manter um JWT válido por tempo excessivo.
* **DETALHAMENTO:** Access Token/JWT ↓ prova temporária de acesso (usado em cada requisição, expira rápido)
Refresh Token ↓ prova de sessão/renovação (usado só para gerar novo access token, expira mais tarde)
* **FLUXO:**
1. Lojista faz login
2. Backend valida e-mail e senha
3. Backend retorna: access token curto, refresh token longo
4. Frontend usa access token nas requisições
5. Quando o access token expira: frontend chama /auth/refresh -> backend valida refresh token -> backend gera novo access token
6. Se o refresh token expirar: lojista precisa fazer login novamente


* **Resposta:** @⁨Vitor L.⁩ @⁨Rykelry 🐧⁩
* **Analistas:** @⁨Cássio⁩ @⁨~Larry Skeleton⁩

---

### [RF0012] – Cadastro de Lojistas

O sistema deve permitir que um usuário se cadastre informando nome completo, e-mail único, senha (mínimo 8 caracteres) e CPF ou CNPJ.

* **Critério:** Cadastro válido retorna HTTP 201; e-mail duplicado retorna HTTP 409.
* **SUGESTÃO:** Só pra dexar mais facil de entender... A tela de autenticação deve separar claramente dois fluxos:
1. Criar conta: Usado apenas por novos lojistas que ainda não possuem cadastro.
2. Entrar na conta: Usado por lojistas já cadastrados.


Quando o Refresh Token expirar, o lojista não deve refazer o cadastro. Ele deve apenas realizar login novamente usando e-mail e senha. Essa separação evita que lojistas já registrados tentem se cadastrar novamente, reduzindo erros como e-mail duplicado e melhorando a experiência do usuário. Na tela de login/cadastro teremos duas opcoes usem como exemplo: "Ja possui uma conta registrada?" e "Não tenho uma conta, logar agora".
A cada tantos dias (15, 20 ou 30 dias), apos o REFRESH TOKEN expirar, o lojista devera logar de novo! Entao, e melhor usar uma segunda forma de login, que o lojista apenas escolhe a conta em que ele estava e o sistema verifica que ele ja estava registrado (Assim, evitamos que ele precise colocar todas as informações novamente)
* **Resposta:** @⁨Rykelry 🐧⁩ @⁨Vitor L.⁩
* **Analistas:** @⁨Mateus de Araújo⁩ @⁨Cássio⁩

---

### [RF0013] – Validação de CPF/CNPJ

O sistema deve validar o CPF ou CNPJ informado, verificando formato e dígitos verificadores antes de criar a conta.

* **Critério:** Documento inválido retorna HTTP 422 com campo errors.document na resposta
* **STATUS:** Aceito

---

### [RF0014a] – Status PENDENTE pós-cadastro

O sistema deve definir o status inicial do usuário como PENDENTE até confirmação do pagamento.

* **Critério:** Usuário PENDENTE não pode acessar rotas /admin/* (HTTP 403).

### [RF0014b] – Ativação via webhook de pagamento

O sistema deve alterar automaticamente o status de PENDENTE para LOJISTA após confirmação de pagamento via webhook.

* **Critério:** Atualização deve ocorrer em até 5 segundos após o evento. Webhook validado por assinatura HMAC-SHA256; falha retorna HTTP 400.
* **STATUS:** Aceitos

---

### [RF0015] – Recuperação de Senha

O sistema deve permitir redefinição de senha via link enviado por e-mail.

* **Critério:** Link válido por 1 hora. Após uso ou expiração retorna HTTP 410. Link expirado não altera a senha.
* **Diretrizes para Equipes:** A equipe do front deve começar a fazer os exemplos (WIREFRAMES/DESENHO) da tela de login com todas as features que já foram mencionadas! Sobre a tela de recuperação de senha, devemos discutir sobre isso. Onde ela vai ficar? Como ela vai ser?
* **Resposta:** @⁨Mateus de Araújo⁩ @⁨Cássio⁩

---

### [RF0016a] – Status PENDENTE pós-cadastro

O sistema deve definir o status inicial do usuário como PENDENTE até confirmação do pagamento.

* **Critério:** Usuário PENDENTE não pode acessar rotas /admin/* (HTTP 403). ERS pedaqui.store — v3  |  pág. 4

### [RF0016b] – Ativação via webhook de pagamento

O sistema deve alterar automaticamente o status de PENDENTE para LOJISTA após confirmação de pagamento via webhook.

* **Critério:** Atualização deve ocorrer em até 5 segundos após o evento. Webhook validado por assinatura HMAC-SHA256; falha retorna HTTP 400.

---

### [RF0017] – Atualização de Dados da Loja

O sistema deve permitir atualização parcial dos dados da loja (nome, descrição, endereço textual, horário, telefone, WhatsApp).

* **Critério:** Deve seguir semântica PATCH (não sobrescrever campos não enviados). Atualização bem sucedida retorna HTTP 200 com os dados atualizados.
* **Aviso para a equipe backend:** Lembrando que esses campos precisam ser muito descritos para que o pessoal do front possa fazer a interface com perfeição (Resumo: Se tiver algum campo que não foi mencionado, por favor adicionem logo)
* **STATUS:** Necessita de confirmação.

---

### [RF0018a] – Desativação da Loja

O sistema deve permitir que o lojista desative sua loja.

* **Critério:** Loja desativada retorna HTTP 404 em GET /stores/:slug para visitantes não autenticados.
* **Dúvida:** Esse requisto menciona a possibilidade do lojista desativar sua loja, do ponto de vista funcional isso seria uma forma de cancelar o serviço certo? Ou seja, existe um tempo em que manteremos os dados dessa loja no banco de dados? Se sim, vcs devem deixar isso explicito. Outra coisa, isso já uma pergunta para o front, só que meio que deve ter um conversa entre as duas partes, onde exatamente essa funcionalidade vai ficar? nas configurações do cliente (Editar suas informações)? vai ter alguma DANGER ZONE aonde isso deve ficar?
* **Resposta:** @⁨Rykelry 🐧⁩ @⁨Vitor L.⁩ @⁨~Larry Skeleton⁩ @⁨Cássio⁩

### [RF0018b] – Ativação da Loja

O sistema deve permitir reativar uma loja desativada.

* **Critério:** Loja reativada retorna HTTP 200 em GET /stores/:slug.
* **STATUS:** Necessita de confirmação (RF18a)

---

## Bloco: Catálogo de Produtos

### [RF0019] – Cadastro de Produtos

O sistema deve permitir cadastrar produtos com nome, preço em reais (armazenado internamente em centavos), descrição opcional e disponibilidade inicial true. O lojista também pode marcar o produto como 'em destaque' para exibição no banner dinâmico da vitrine.

* **Critério:** Nome e preço são obrigatórios; ausência retorna HTTP 422. Campo featured (booleano, padrão false) adicionado ao modelo. Produto recém-criado aparece imediatamente na vitrine.
* **IMPORTANTE:** Bom esse requisito é algo que todo mundo sabe muito bem, essa questão de destaque foi tratada lá em cima mas não foi definido com 100% de certeza.. então vou só esperar a discussão acontecer para decidirmos o que fazer em relação a esse requisito.
* **Relação:** RF008

---

### [RF0020] – Edição de Produtos

O sistema deve permitir atualização parcial de produtos (nome, preço, descrição, disponibilidade, destaque).

* **Critério:** Retorna HTTP 200 com dados atualizados. Campos não enviados não são zerados (semântica PATCH).
* **STATUS:** Aceito

---

### [RF0021] – Remoção de Produtos (Soft Delete)

O sistema deve permitir remoção lógica de produtos, sem apagar o registro do banco de dados.

* **Critério:** Produto removido não aparece na vitrine nem no banner de destaque; retorno HTTP 204. Produto de outro tenant retorna HTTP 403.
* **IMPORTANTE:** Novamente, o tempo limite que vamos manter esses dados salvos no banco de dados deve ser adicionado ao requisito @⁨Vitor L.⁩ @⁨Rykelry 🐧⁩

---

### [RF0022] – Listagem de Produtos (Admin)

O sistema deve listar produtos ativos da loja no painel administrativo.

* **Critério:** Paginação de até 20 itens por página; excluir itens com soft delete aplicado.
* **STATUS:** Aceito

---

### [RF0023] – Upload de Imagens de Produto

O sistema deve permitir envio de até 5 imagens por produto.

* **Critério:** Formatos JPEG/PNG, até 5 MB cada; resposta retorna URLs das imagens armazenadas. Upload inválido retorna HTTP 422.
* **IMPORTANTE:** 5 imagens é algo que a gente não discutiu, então esse RF deve ser atualizado com base no que foi definido pela equipe do backend em relação ao sistema de imagens (Limite de imagens). Alem disso, adicionem novos requisitos falando sobre como vai funcionar o sistema de imagens pra deixar isso "rastreado" Ex: Cada imagem deve ter no maximo 5MB... As imagens serão convertidas para WEBP... As imagens serao compactadas usando a biblioteca Sharp...
* **Resposta:** @⁨Rykelry 🐧⁩ @⁨Vitor L.⁩

---

### [RF0024] – Controle de Estoque Misto

O sistema deve permitir que o lojista opte por dois modos de venda para cada produto:

* *Estoque Livre (Booleano):* Produto pode ser vendido indefinidamente enquanto estiver marcado como disponível (is_available = true).
* *Estoque Controlado (Quantitativo):* O sistema exige uma quantidade inicial (stock_quantity) e bloqueia novas compras automaticamente quando o saldo chegar a zero (manage_stock = true).
* **Critério:** Se o estoque controlado chegar a zero ou o produto for marcado como indisponível (is_available = false), ele permanece visível na vitrine, mas o botão de compra é desabilitado no frontend. Tentativa de inclusão no carrinho via API retorna HTTP 400 com campo errors.product indicando o motivo (sem_estoque | indisponivel).
* **IMPORTANTE:** Esse RF é extramamente importante, sinceramente, ele não pode nem sequer ser removido! Ainda sim, não quer dizer que não precise de mudanças, precisamos pensar em como ele vai funcionar de acordo com a INSERÇÃO EM LOTE. Motivo: Se é para cada produto, então no caso de INSERIR MUITOS produtos de uma vez ainda sim o lojista deve selecionar cada produto e gerenciar o tipo de stock... Outra coisa, se o sistema vai ser intuitivo, entao o FRONT deve saber muito bem explicar o que é e como funciona essa configuração!
* **Resposta:** @⁨Vitor L.⁩ @⁨Rykelry 🐧⁩
* **Analistas:** @⁨~Larry Skeleton⁩ @⁨Cássio⁩

---

### [RF0025] – Criação de Categorias

O sistema deve permitir criar categorias com nome e ordem de exibição.

* **Critério:** Retorna HTTP 201
* **IMPORTANTE:** Lembrando que cada produto, no momento que for adicionado pelo lojista, deve conter o campo para adicionar a categoria relacionada a este produto.
* **PROBLEMA:** Gerenciamento dessas categorias exigem muitos sistemas basicos de edição, pois se pensarmos no pior caso, alguns LOJISTAS podem adicionar produtos que NATURALMENTE pertencem a uma categoria e acabam colocando/criando uma nova categoria na hora de adicionar esse produto. Ou seja, isso causa a NECESSIDADE de GERENCIAR/EDITAR categorias (Sistema de EDIÇÃO de categorias).
Frontend x Backend --> lidar com esse problema, pois se cada produto, já começa pertencendo a uma categoria ( NA TEORIA, vamos assumir que cada lojista vai adicionar categoria do produto na hora de adiciona-lo ) então isso acaba mundando um pouco o rumo das coisas... Além disso, durante a adição de um produto: As categorias são OPCIONAIS? ou OBRIGATORIAS? Definam isso, façam um ou mais requisitos sobre essas questões @⁨Rykelry 🐧⁩ @⁨Vitor L.⁩
* **OBS:** Eu tinha falado com o @⁨~Larry Skeleton⁩ e @⁨Cássio⁩ sobre as categorias e meio que dei uma ideia de ter uma categoria que TODOS (Provavelmente, vcs já tinham em mente)
* **Design:** O Mateus está fazendo as WIREFRAMES dessa tela pra mostrar o design da tela com as categorias!
* **Resposta:** @⁨Rykelry 🐧⁩ @⁨Vitor L.⁩

---

> ⚠️ **Nota de Sessão:** DISCUSSÃO SOBRE OS REQUISITOS ENCERRADA! Interrupção temporária do fluxo sequencial (Pausa estabelecida do RF28 para o RF25).

---

### [RF0029a] – Edição de Categorias

O sistema deve permitir editar nome e ordem de exibição de uma categoria existente.

* **Critério:** Retorna HTTP 200 com os dados atualizados.
* **STATUS:** Necessita de confirmação.
