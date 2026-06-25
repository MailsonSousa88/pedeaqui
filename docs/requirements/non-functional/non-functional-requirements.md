# Requisitos Não Funcionais

## Segurança

**[RNF0001] – Controle de acesso por perfil**

O sistema deve controlar o acesso às rotas protegidas conforme o perfil do usuário autenticado.

> **Critério:** Rotas `/admin/*` devem exigir JWT válido com claim `role=LOJISTA`. Ausência de token ou token inválido deve retornar HTTP 401. Token válido com perfil incorreto deve retornar HTTP 403.
---

**[RNF0002] – Controle de dados por loja**

O sistema deve garantir isolamento de dados entre lojas, impedindo que um lojista acesse dados de outro tenant.

> **Critério:** Toda operação de leitura ou escrita deve usar o `tenant_id` extraído do JWT para filtrar dados. Tentativa de acesso a dados de outro tenant deve retornar HTTP 403.
---

**[RNF0003] – Segurança no sistema de pagamento**

O sistema deve validar eventos de pagamento antes de alterar o status do lojista ou da assinatura.

> **Critério:** Webhook de pagamento deve ser validado por assinatura `HMAC-SHA256`. Falha de validação deve retornar HTTP 400. A transição de status só deve ocorrer após confirmação bem-sucedida. A idempotência deve ser garantida por chave única por evento.
---

**[RNF0004] – Tratamento padronizado de dados inválidos**

O sistema deve retornar erros de validação de forma padronizada quando receber dados inválidos.

> **Critério:** Campos com tipo, formato ou tamanho inválido devem retornar HTTP 422 com body no formato `{ errors: [{ field, message }] }`.
---

**[RNF0005] – Registro de logs de acesso**

O sistema deve registrar informações de acesso em requisições da API que envolvam leitura ou manipulação de dados.

> **Critério:** Cada registro deve conter endereço IP, data, hora e rota acessada.
---

**[RNF0006] – Armazenamento seguro de logs**

O sistema deve armazenar registros de log em ambiente separado da aplicação principal.

> **Critério:** Logs devem ser armazenados em serviço separado da aplicação principal e acessíveis apenas por administradores autenticados por credencial própria.
---

**[RNF0007] – Retenção de logs para auditoria**

O sistema deve manter logs por período mínimo para auditoria e investigação de incidentes.

> **Critério:** Registros de log devem ser mantidos por no mínimo 6 meses.
---

**[RNF0008] – Proteção contra abuso em rotas públicas**

O sistema deve limitar requisições em rotas públicas para reduzir abuso e uso indevido da API.

> **Critério:** Rotas públicas devem permitir no máximo 200 requisições por IP em janela deslizante de 60 segundos. Excesso deve retornar HTTP 429 com header `Retry-After: 60`.
---

**[RNF0009] – Autenticação em rotas privadas do lojista**

O sistema deve exigir autenticação do lojista para acesso às rotas privadas.

> **Critério:** O JWT deve ser enviado no header `Authorization: Bearer {token}` e validado pelo backend a cada requisição protegida.
---

**[RNF0010] – Proteção de dados em trânsito**

O sistema deve proteger toda comunicação entre cliente e servidor usando conexão segura.

> **Critério:** Toda comunicação cliente-servidor deve ocorrer via HTTPS/TLS 1.2 ou superior. Requisições HTTP puras devem ser redirecionadas automaticamente para HTTPS com HTTP 301.
---

## Desempenho

**[RNF0011] – Tempo de resposta da API**

O sistema deve manter tempo de resposta aceitável nas principais rotas públicas da API.

> **Critério:** Requisições da API para listagem de lojas e produtos devem responder em até 2 segundos no percentil 95 sob carga de 100 requisições simultâneas.
---

**[RNF0012] – Paginação de resultados**

O sistema deve paginar listagens para evitar respostas excessivamente grandes.

> **Critério:** Listagens de produtos e lojas devem retornar no máximo 20 registros por requisição, com metadados `{ page, limit, total }`.
---

**[RNF0013] – Disponibilidade mínima do sistema**

O sistema deve manter disponibilidade mínima mensal para acesso às páginas públicas.

> **Critério:** Páginas públicas de lojas e produtos devem manter disponibilidade mínima de 99% ao mês. Downtime tolerado: até 7,2 horas por mês.
---

## Usabilidade

**[RNF0014] – Facilidade no contato com lojista**

O sistema deve permitir que o consumidor inicie contato com o lojista de forma simples a partir da experiência de compra.

> **Critério:** O consumidor deve conseguir iniciar o contato via WhatsApp em até 4 interações a partir da página de produtos.
---

**[RNF0015] – Responsividade da interface**

O sistema deve ser utilizável em dispositivos móveis e desktop.

> **Critério:** Telas públicas de loja, produto, carrinho, checkout via WhatsApp e telas do lojista devem se adaptar a diferentes tamanhos de tela sem sobreposição de textos, botões ou cards. Ações principais devem permanecer acessíveis em dispositivos móveis.
---

**[RNF0016] – Acessibilidade básica da interface**

O sistema deve seguir práticas básicas de acessibilidade nas telas principais.

> **Critério:** Campos de formulário devem possuir labels visíveis. Botões devem ter texto ou descrição acessível. Ações importantes não devem depender apenas de cor. Textos e elementos interativos devem manter contraste suficiente para leitura.
---

## Integridade de dados

**[RNF0017] – Representação monetária em centavos**

O sistema deve armazenar valores monetários de forma segura contra erros de arredondamento.

> **Critério:** Preços de produtos e totais de pedidos devem ser armazenados e processados internamente em centavos. A interface pode exibir valores em reais, mas cálculos financeiros devem usar os valores inteiros armazenados pelo backend.
---

**[RNF0018] – Validação server-side de regras críticas**

O sistema deve validar no backend todas as regras críticas que impactam segurança, pagamento, estoque, plano e criação de pedidos.

> **Critério:** Regras como limite de produtos por plano, disponibilidade de produto, estoque, status da loja, status do lojista, preço atual e tenant do lojista não devem depender apenas de validação no frontend.
---

**[RNF0019] – Criação consistente de pedidos**

O sistema deve evitar criação parcial ou inconsistente de pedidos durante o checkout.

> **Critério:** A criação de pedido deve ocorrer somente após validação completa dos itens, preços e disponibilidade. Se qualquer item for inválido, indisponível ou sem estoque, nenhum pedido deve ser criado.
---

## Arquivos e imagens

**[RNF0020] – Armazenamento externo de imagens**

O sistema deve armazenar imagens de produtos e lojas fora do build do frontend.

> **Critério:** Imagens enviadas por lojistas devem ser armazenadas em serviço externo apropriado, como Cloudflare R2. O banco de dados deve armazenar apenas as referências necessárias para acesso às imagens, como URL, chave do objeto ou metadados.
---

**[RNF0021] – Validação segura de uploads**

O sistema deve validar arquivos enviados por lojistas antes do armazenamento.

> **Critério:** Uploads devem aceitar apenas formatos de imagem permitidos pelo projeto. Arquivos inválidos, vazios, com tipo incompatível ou acima do limite definido devem retornar HTTP 422. O backend não deve confiar apenas na extensão do arquivo informada pelo usuário.
---

**[RNF0022] – Padronização de imagens para exibição**

O sistema deve preparar imagens enviadas para uso adequado na vitrine e no painel do lojista.

> **Critério:** Imagens aceitas devem seguir uma regra de padronização definida pelo projeto antes de serem exibidas, considerando dimensões, formato final e compressão. Essa regra deve ser aplicada de forma consistente para produto, banner da loja e imagem de perfil da loja.
---
