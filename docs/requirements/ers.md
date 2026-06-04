**Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas  
**Disciplina:** Engenharia de Software  
**Período:** 2026.3  
**Professor:** Mayllon Veras  
**Alunos:** Francisco Mailson, Francisco de Cássio, Mateus de Araujo, Rikelry Monteiro, Vitor Lopes  
**Time:** Cloud Hive  

<h2 align="center">
ESPECIFICAÇÕES DE REQUISITOS DE SOFTWARE (ERS)  
PEDEAQUI.STORE
</h2>

### LEGENDA DE ALTERAÇÕES

> [!WARNING]
> ⚠️ **MODIFICADO** — Atenção!

> [!CAUTION]
> 🚨 **PROBLEMA** — requer decisão.

> [!TIP]
> ✅ **NOVO** — RF incluído nesta versão.

O projeto pedaqui.store tem como propósito desenvolver uma plataforma no formato vitrine digital voltada para pequenos e médios empreendedores. O objetivo é entregar uma solução tecnológica acessível para empreendedores que estão começando e necessitam de uma forma de alavancar seus negócios de forma online.

O sistema permite que lojistas criem e gerenciem suas próprias lojas virtuais de forma simples e rápida, sem necessidade de desenvolvimento técnico. Cada loja possui seu catálogo de produtos exposto em uma vitrine online personalizada.

O MVP tem como foco principal facilitar a divulgação de produtos e conectar clientes diretamente aos vendedores por meio de redirecionamento para o WhatsApp, onde as negociações são finalizadas.

Usuários comuns podem navegar pelas lojas disponíveis, visualizar produtos e iniciar contato com os lojistas. Já os lojistas, mediante cadastro, podem criar sua loja, cadastrar produtos e configurar suas informações comerciais dentro da plataforma, desde que sigam todas as regras definidas.

### REQUISITOS FUNCIONAIS - FRONTEND

### (Interface de Usuário)

### USUÁRIOS COMUNS

**[RF001] – Visualização das lojas**
O sistema deve permitir que o usuário visualize uma lista de lojas disponíveis dentro da plataforma.

**[RF002] – Visualização de produtos da loja**
O sistema deve permitir que o usuário visualize uma página de loja específica e visualize seus produtos cadastrados.

**[RF003] – Informações de um produto**
O sistema deve permitir que o usuário possa visualizar detalhes de um produto específico dentro da loja.

**[RF004] – Adição de produtos ao carrinho de compras**
O sistema deve permitir que o usuário adicione um ou mais produtos de uma loja a um carrinho de compras temporário.

> **Critério:** Carrinho aceita até 50 itens distintos. Produto já presente tem quantidade incrementada. Snapshot do preço, nome e imagem é gravado no momento da adição.

> [!WARNING]
> ⚠️ _**MODIFICADO** — critério de aceitação adicionado: limite de itens, comportamento de duplicata e snapshot de preço._


**[RF005] – Remoção e Atualização de Quantidade de Produtos do Carrinho**
O sistema deve permitir que o usuário ajuste a quantidade de cada item no carrinho por meio de botões '+' e '−', e remova itens individualmente. Ao atingir quantidade 0 pelo botão '−', o item é removido do carrinho automaticamente.

> **Critério:** Botão '+' incrementa a quantidade em 1 a cada clique. Botão '−' decrementa em 1; ao chegar a 0 o item é removido sem confirmação adicional. Total do carrinho é recalculado em tempo real. Carrinho vazio exibe mensagem informativa.

> [!WARNING]
> ⚠️ _**MODIFICADO** — critério de aceitação adicionado: limite de itens, comportamento de duplicata e snapshot de preço._

**[RF006] – Finalização da compra**
O sistema deve permitir que o usuário finalize sua compra a partir do carrinho, gerando automaticamente uma mensagem contendo os produtos selecionados, quantidades e valor total, redirecionando o usuário para o WhatsApp para envio do pedido ao lojista.

> **Critério:** Botão só é habilitado com ao menos 1 item de quantidade válida (≥ 1). URL segue formato wa.me/{numero}?text={mensagem_codificada}. WhatsApp abre em nova aba. Se loja não tiver número cadastrado, botão é desabilitado com aviso.

> [!WARNING]
> ⚠️ _**MODIFICADO** — critério expandido com formato de URL, condição de habilitação e tratamento de loja sem WhatsApp._

**[RF007] – Busca e Filtragem de Produtos dentro da Loja**
O sistema deve disponibilizar um campo de pesquisa centralizado na parte superior da loja. A partir de uma busca realizada, o usuário poderá aplicar filtros sobre os resultados: por faixa de valor, ordem alfabética (A–Z / Z–A), menor preço e maior preço.

> **Critério:** Campo de busca aceita termos parciais do nome do produto. Filtros são aplicados sobre o resultado da busca sem recarregar a página. Combinação de filtros é permitida. Resultados paginados com máximo de 20 itens por página.

> [!WARNING]
> ⚠️ _**REESCRITO (instrução nova)** — RF008 original ('filtragem por categoria') foi substituído. Navegação por categoria já é feita pelas abas na parte superior da loja. Este RF passa a cobrir: campo de busca centralizado + filtros de valor e ordenação sobre os resultados. RF009 original (ordenação isolada) foi fundido aqui._

**[RF008] – Exibição de Produtos em Destaque via Banner Dinâmico**
O sistema deve exibir um banner dinâmico na parte superior da página da loja do vendedor, logo abaixo do perfil e banner principal, destacando produtos selecionados pelo lojista. O banner deve ser rotativo e exibir imagem, nome e preço de cada produto em destaque.

> **Critério:** Banner exibe apenas produtos marcados como 'em destaque' pelo lojista e com disponibilidade ativa. Produtos indisponíveis são automaticamente removidos do banner. Clique no produto do banner redireciona para a página de detalhe do produto.

> [!WARNING]
> ⚠️ _**REESCRITO (instrução nova)** — 'destaque' agora está definido: banner dinâmico abaixo do perfil/banner principal, com produtos selecionados pelo lojista. O modelo de domínio precisa incluir campo featured (booleano) na tabela products para suportar este RF._

**[RF009] – Compartilhamento de loja**
O sistema deve permitir que o usuário compartilhe o link de uma loja em aplicativos externos.

> [!CAUTION]
> 🚨 _**PENDENTE** — mecanismo ainda não definido: Web Share API? Botão de copiar link? QR code? Sem decisão técnica não é implementável. Manter fora do sprint até definição._

### REQUISITOS FUNCIONAIS - BACKEND

### (API e Regras de negócio)

**[RF0010] – Listagem, atualização e deleção de lojas**
O sistema deve possuir rotas de listagem, atualização e deleção de lojas para servir o catálogo principal
da plataforma (rota /stores).

> **Critério:** GET /stores retorna lista paginada (20/página). PATCH /admin/store retorna HTTP 200. DELETE solicita confirmação; retorna HTTP 204.

> [!WARNING]
> ⚠️ _**MODIFICADO** — três operações ainda agrupadas por decisão do time, mas critérios HTTP explicitados para cada uma. Rota '*/main' substituída por '/stores' conforme contratos REST do projeto._

**[RF0011] – Login de Lojista
O sistema deve autenticar o lojista via e-mail e senha.**

> **Critério:** Credenciais válidas retornam JWT com expiração de 24h (HTTP 200); inválidas retornam HTTP 401.

> [!WARNING]
> ⚠️ _**RENUMERADO (instrução nova)** — RF0013 original (favoritos) foi movido para o frontend como RF007. Este slot passa a abrigar o Login do lojista (que anteriormente era RF0017), mantendo sequência lógica de onboarding._

**[RF0012] – Cadastro de Lojistas**
O sistema deve permitir que um usuário se cadastre informando nome completo, e-mail único, senha (mínimo 8 caracteres) e CPF ou CNPJ.

> **Critério:** Cadastro válido retorna HTTP 201; e-mail duplicado retorna HTTP 409.

**[RF0013] – Validação de CPF/CNPJ**
O sistema deve validar o CPF ou CNPJ informado, verificando formato e dígitos verificadores antes de criar a conta.

> Critério: Documento inválido retorna HTTP 422 com campo errors.document na resposta.

> [!WARNING]
> ⚠️ _**MODIFICADO** — campo de erro explicitado (errors.document)._

**[RF0014a] – Status PENDENTE pós-cadastro**
O sistema deve definir o status inicial do usuário como PENDENTE até confirmação do pagamento.

> **Critério:** Usuário PENDENTE não pode acessar rotas /admin/* (HTTP 403).

**[RF0014b] – Ativação via webhook de pagamento**
O sistema deve alterar automaticamente o status de PENDENTE para LOJISTA após confirmação de pagamento via webhook.

> **Critério:** Atualização deve ocorrer em até 5 segundos após o evento. Webhook validado por assinatura HMAC-SHA256; falha retorna HTTP 400.

> [!WARNING]
> ⚠️ _**MODIFICADO** — validação HMAC-SHA256 adicionada ao critério._

**[RF0015] – Recuperação de Senha**
O sistema deve permitir redefinição de senha via link enviado por e-mail.

> **Critério:** Link válido por 1 hora. Após uso ou expiração retorna HTTP 410. Link expirado não altera a senha.

> [!WARNING]
> ⚠️ _**RENUMERADO** — era RF0018. Login passou a RF0013; recuperação assume RF0017._

### Gestão da Loja

<h2 align="center">
PROXIMA ATUALIZAÇÃO
</h2>