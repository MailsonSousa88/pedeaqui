# Requisitos Funcionais

## Finalidade e interpretação

Este documento é a fonte normativa dos requisitos funcionais do PedeAqui. Ele descreve o comportamento obrigatório do produto, independentemente do estágio atual da implementação. Lacunas entre estes requisitos e o código devem ser registradas e corrigidas; não devem ser usadas para enfraquecer ou remover regras necessárias ao funcionamento seguro da plataforma SaaS.

Os identificadores `RFxxx` são permanentes. Os sufixos `A` e `B` representam requisitos relacionados, porém verificáveis separadamente. Os requisitos estão agrupados por domínio e, por isso, os identificadores não aparecem necessariamente em ordem numérica. Os critérios de aceitação definem o resultado observável mínimo e não limitam validações adicionais de segurança, privacidade ou integridade.

## Limites do produto

O PedeAqui é uma plataforma SaaS de vitrines digitais. O Stripe processa exclusivamente a assinatura do lojista pelo uso da plataforma. O pagamento dos produtos, a negociação, a entrega e o atendimento ao consumidor acontecem diretamente entre consumidor e lojista. O WhatsApp é aberto por `wa.me`; o PedeAqui não envia mensagens em nome do consumidor e não pode confirmar que uma mensagem foi efetivamente enviada.

## Atores

- **Consumidor:** visitante não autenticado que consulta vitrines, organiza itens e inicia um pedido pelo WhatsApp.
- **Lojista:** usuário autenticado responsável por um único tenant e por sua loja.
- **Administrador:** usuário interno autorizado a operar e auditar a plataforma conforme seu papel.
- **Stripe:** provedor externo usado na contratação e manutenção das assinaturas SaaS.
- **Cloudflare R2:** serviço externo usado no armazenamento de imagens.
- **WhatsApp:** canal externo no qual consumidor e lojista concluem a negociação.

## Catálogo público e jornada do consumidor

### [RF001] – Visualização das lojas

O sistema deve permitir que o consumidor consulte as lojas disponíveis na plataforma.

> **Critérios de aceitação:** A listagem deve conter somente lojas não excluídas, publicadas, vinculadas a tenant operacionalmente ativo e com direito de uso vigente. Cada item deve apresentar, no mínimo, nome, identidade visual disponível, descrição resumida, cidade e UF. A consulta deve permitir busca por nome e filtros de localização, retornar no máximo 20 lojas por página e produzir estado vazio informativo quando não houver resultados.

### [RF002] – Visualização da vitrine e dos produtos

O sistema deve permitir que o consumidor acesse a vitrine de uma loja e visualize seus produtos públicos.

> **Critérios de aceitação:** A vitrine deve exibir somente produtos disponíveis, não excluídos e pertencentes à loja acessada. Deve apresentar a identidade da loja, descrição, endereço, cidade, UF, horário, situação de funcionamento, WhatsApp e identificação legal do fornecedor por CPF ou CNPJ conforme a natureza do tenant e as regras de privacidade aplicáveis. Produtos devem respeitar categoria, promoção vigente e paginação.

### [RF003] – Visualização dos detalhes do produto

O sistema deve permitir que o consumidor visualize os detalhes de um produto da loja.

> **Critérios de aceitação:** A apresentação deve incluir nome, descrição, preço aplicável, imagens, disponibilidade, categoria, detalhes e variações existentes. Produto indisponível, excluído, pertencente a loja não pública ou inexistente não deve ser apresentado como comprável.

### [RF004] – Adição de produtos ao carrinho

O sistema deve permitir que o consumidor adicione produtos a um carrinho temporário armazenado localmente no navegador.

> **Critérios de aceitação:** O carrinho deve aceitar no máximo 50 produtos distintos. A repetição do mesmo produto e da mesma configuração deve incrementar sua quantidade. O sistema deve guardar um snapshot de nome, preço, imagem e variações para exibição, sem tratar esses dados locais como fonte confiável no checkout. Os itens devem permanecer agrupados por loja.

### [RF005] – Atualização e remoção de itens do carrinho

O sistema deve permitir alterar quantidades e remover itens do carrinho.

> **Critérios de aceitação:** A quantidade mínima deve ser 1. A tentativa de reduzir abaixo desse valor deve solicitar confirmação para remoção. Totais e subtotais devem ser recalculados imediatamente. Quando o último item de uma loja for removido, o respectivo grupo deve desaparecer; quando não houver itens, deve ser exibido o estado de carrinho vazio.

### [RF006] – Preparação da finalização por loja

O sistema deve permitir que o consumidor finalize separadamente os itens de uma loja.

> **Critérios de aceitação:** O consumidor deve selecionar uma loja, revisar itens e quantidades e informar os dados necessários ao contato, como nome, telefone, endereço e observações quando aplicáveis. O botão de continuar deve permanecer bloqueado sem itens válidos ou sem os campos obrigatórios. Produtos de lojas diferentes não podem compor o mesmo pedido.

### [RF007] – Busca, ordenação e filtragem de produtos

O sistema deve permitir pesquisar e filtrar produtos dentro da vitrine acessada.

> **Critérios de aceitação:** A busca deve aceitar termos parciais do nome. Devem existir filtros por categoria e faixa de preço e ordenação alfabética, por menor preço e por maior preço. Os critérios devem poder ser combinados sem recarregar a página. A consulta deve retornar no máximo 20 produtos por página e informar quando não houver resultados.

### [RF008] – Exibição de produtos em promoção

O sistema deve permitir que o lojista configure e o consumidor visualize promoções de produtos.

> **Critérios de aceitação:** O preço promocional deve ser maior que zero e menor que o preço-base. A data final é opcional, mas só pode existir quando houver preço promocional. Promoção expirada não deve ser aplicada. Quando vigente, a interface deve exibir o preço-base riscado e o promocional em destaque. Promoção não depende de um marcador separado de destaque.

### [RF009] – Compartilhamento da loja

O sistema deve permitir que o consumidor compartilhe o endereço público da loja.

> **Critérios de aceitação:** Quando a Web Share API estiver disponível, o sistema deve oferecer o compartilhamento nativo; nos demais casos, deve copiar a URL. A ação deve apresentar feedback acessível de sucesso ou falha, sem alterar a URL compartilhada.

### [RF010] – Visualização pública dos planos

O sistema deve permitir que visitantes e lojistas consultem os planos SaaS disponíveis.

> **Critérios de aceitação:** Apenas planos ativos devem ser oferecidos para nova contratação. Cada plano deve informar nome, preço recorrente, benefícios, limites e disponibilidade. Planos anunciados como futuros não podem iniciar checkout.

## Identidade, autenticação e onboarding do lojista

### [RF011] – Login do lojista

O sistema deve autenticar o lojista por e-mail e senha.

> **Critérios de aceitação:** Credenciais válidas devem retornar sessão com `access token` de curta duração e mecanismo de renovação. Credenciais inválidas devem retornar HTTP 401 sem revelar qual campo está incorreto. O acesso posterior deve respeitar o tenant, a situação da conta e a assinatura.

### [RF012] – Cadastro do perfil do lojista

O sistema deve permitir que uma pessoa responsável crie sua conta informando nome completo, e-mail único, senha, telefone e CPF.

> **Critérios de aceitação:** O CPF identifica o perfil pessoal e deve ser armazenado sem máscara. O cadastro deve exigir aceite dos Termos de Uso e da Política de Privacidade vigentes. E-mail ou CPF já cadastrado deve retornar HTTP 409. Cadastro válido deve criar a identidade no Supabase Auth e o perfil correspondente e retornar HTTP 201.

### [RF013] – Validação do CPF do perfil

O sistema deve validar o CPF antes da criação ou alteração do perfil.

> **Critérios de aceitação:** Devem ser verificados presença, quantidade de dígitos e dígitos verificadores após remoção da máscara. CPF inválido deve impedir a operação e retornar HTTP 422 associado ao campo `document`. Validação visual no frontend não substitui a validação do backend.

### [RF014A] – Estado de onboarding e período de avaliação

O sistema deve controlar separadamente a conclusão do onboarding, o estado do tenant e o direito de uso concedido por trial ou assinatura paga.

> **Critérios de aceitação:** O cadastro do perfil, sozinho, não deve publicar uma vitrine. Ao registrar o tenant, o sistema pode conceder um trial de 30 dias sem plano pago, com início e término definidos. A publicação só pode ocorrer depois da configuração mínima da loja, da validação documental, do aceite legal e da existência de direito de uso vigente. Trial expirado não deve ser tratado como assinatura paga ativa.

### [RF014B] – Ativação e atualização por webhook de pagamento

O sistema deve atualizar a assinatura SaaS somente a partir de eventos válidos do Stripe.

> **Critérios de aceitação:** O retorno do navegador não confirma pagamento. O webhook deve validar a assinatura sobre o corpo bruto, identificar tenant, plano, assinatura e evento, rejeitar assinatura inválida com HTTP 400 e processar eventos repetidos de forma idempotente. A situação deve ser refletida em até 5 segundos após o recebimento válido.

### [RF015] – Recuperação e redefinição de senha

O sistema deve permitir a recuperação segura da senha por e-mail.

> **Critérios de aceitação:** A solicitação não deve revelar se o e-mail existe. O link ou token deve ser de uso único, possuir validade máxima de 1 hora e deixar de funcionar depois do uso, revogação ou expiração. A nova senha deve obedecer à política de credenciais.

### [RF035] – Registro do tenant comercial

O sistema deve permitir que o usuário autenticado registre seu tenant como pessoa física ou jurídica.

> **Critérios de aceitação:** Pessoa física deve utilizar o CPF válido do perfil. Pessoa jurídica deve informar CNPJ válido e único, armazenado separadamente como documento empresarial. O sistema deve impedir mais de um tenant por perfil, retornar HTTP 409 em duplicidade e usar o CPF como documento de cobrança quando não houver CNPJ.

### [RF036] – Atualização do perfil pessoal

O sistema deve permitir que o usuário autenticado atualize seus próprios dados de perfil.

> **Critérios de aceitação:** Nome, telefone e CPF devem ser validados no backend. A alteração não pode alcançar o perfil de outro usuário nem romper a unicidade documental. Campos não enviados em uma atualização parcial devem ser preservados.

### [RF037] – Renovação e encerramento de sessão

O sistema deve permitir renovar e encerrar sessões autenticadas.

> **Critérios de aceitação:** Token de renovação válido deve produzir uma nova sessão; token expirado, revogado ou inválido deve exigir novo login. O logout deve revogar a sessão correspondente e impedir seu uso posterior, inclusive em dispositivos ou contextos nos quais a revogação se aplique.

## Gestão da loja

### [RF016] – Criação da loja

O sistema deve permitir que cada tenant crie uma única loja.

> **Critérios de aceitação:** A criação deve exigir direito de uso vigente e dados mínimos: nome, slug único, endereço, cidade, UF, WhatsApp e horários quando informados. O sistema deve criar a categoria sistêmica `Todos`. Segunda loja para o mesmo tenant ou slug duplicado deve retornar HTTP 409. A loja não pode ser publicada sem cumprir as condições de elegibilidade.

### [RF017] – Atualização dos dados da loja

O sistema deve permitir que o lojista atualize parcialmente sua loja.

> **Critérios de aceitação:** Podem ser alterados nome, descrição, endereço, cidade, UF, horários, WhatsApp, slug e identidade visual conforme permissões. Campos ausentes devem ser preservados. Slug e demais valores únicos devem ser revalidados. Alteração bem-sucedida deve retornar os dados atuais da loja.

### [RF018A] – Desativação e exclusão lógica da loja

O sistema deve permitir retirar a loja de circulação sem perda imediata de seus dados.

> **Critérios de aceitação:** Loja desativada ou excluída logicamente não deve aparecer no catálogo nem responder publicamente pelo slug. A desativação deve ser reversível. A exclusão lógica deve preservar loja, categorias, produtos, imagens e histórico durante o período de retenção e deve exigir confirmação explícita.

### [RF018B] – Reativação da loja

O sistema deve permitir reativar uma loja desativada.

> **Critérios de aceitação:** A reativação só pode publicar a loja se tenant e assinatura estiverem aptos, os dados mínimos estiverem completos e a loja não estiver excluída. Produtos continuam sujeitos à própria disponibilidade e exclusão lógica.

### [RF029] – Upload de banner da loja

O sistema deve permitir que o lojista envie ou substitua, opcionalmente, o banner de sua loja.

> **Critérios de aceitação:** O arquivo deve seguir o fluxo seguro de imagens, possuir formato e tamanho permitidos e só ter sua referência persistida após upload confirmado. A ausência de banner deve usar apresentação neutra, sem imagem quebrada.

### [RF030] – Upload da imagem de perfil da loja

O sistema deve permitir que o lojista envie ou substitua, opcionalmente, o logotipo ou avatar da loja.

> **Critérios de aceitação:** O arquivo deve seguir o fluxo seguro de imagens. A imagem deve ser exibida em cards, cabeçalhos e áreas compactas. Falhas de upload não podem apagar a referência válida anterior.

### [RF032] – Acesso à vitrine por slug

O sistema deve disponibilizar uma URL pública e única para cada loja elegível.

> **Critérios de aceitação:** Slug inexistente, loja inativa, excluída, tenant suspenso ou ausência de direito de uso deve resultar em HTTP 404 para visitantes. A disponibilidade de produtos, isoladamente, não torna uma loja pública. Alteração de slug deve impedir colisão e seguir política explícita de redirecionamento ou invalidação do endereço anterior.

## Gestão de produtos, categorias e imagens

### [RF019] – Cadastro de produtos

O sistema deve permitir que o lojista cadastre produtos em sua própria loja.

> **Critérios de aceitação:** Nome, categoria e preço maior que zero são obrigatórios. Valores monetários devem chegar ao domínio em centavos. Descrição, detalhes, promoção, imagens e variações são opcionais. O produto deve iniciar disponível, salvo escolha explícita em contrário, e a operação deve respeitar o plano e o tenant autenticado.

### [RF020] – Edição de produtos

O sistema deve permitir a atualização parcial dos produtos da loja.

> **Critérios de aceitação:** Nome, descrição, preço, promoção, categoria, detalhes e disponibilidade podem ser alterados. Campos não enviados devem ser preservados mesmo quando a rota HTTP existente utilizar `PUT`. Produto de outro tenant deve retornar HTTP 403. A resposta deve conter o estado atualizado.

### [RF021] – Remoção de produtos por exclusão lógica

O sistema deve permitir remover produtos sem apagá-los imediatamente do banco.

> **Critérios de aceitação:** Produto excluído logicamente não deve aparecer na vitrine nem ser aceito no checkout. A remoção deve exigir confirmação e retornar HTTP 204. Produto existente pertencente a outro tenant deve retornar HTTP 403. Referências e imagens devem seguir a política de retenção e limpeza.

### [RF022] – Listagem de produtos no painel do lojista

O sistema deve permitir que o lojista consulte e gerencie os produtos de sua loja.

> **Critérios de aceitação:** A listagem deve ser paginada em até 20 itens, permitir busca, filtros por disponibilidade e categoria e não misturar produtos de outros tenants. Itens excluídos devem ficar fora da listagem padrão e só podem aparecer em contexto explícito de recuperação ou auditoria.

### [RF023] – Upload e gerenciamento de imagens de produto

O sistema deve permitir adicionar, ordenar, substituir e remover imagens de produto.

> **Critérios de aceitação:** O backend deve autorizar a operação e emitir URL pré-assinada de curta duração; o frontend deve enviar o binário diretamente ao Cloudflare R2 e confirmar o upload; somente então a referência deve ser persistida. Ordem, chave do objeto, URL, MIME e tamanho devem ser registrados. A operação deve respeitar a quota do tenant.

### [RF024] – Gerenciamento de variações e opções do produto

O sistema deve permitir criar, listar, editar, ordenar e remover variações e suas opções.

> **Critérios de aceitação:** Cada variação deve possuir um rótulo, como `Cor` ou `Tamanho`, e opções ordenáveis. Uma opção pode modificar o preço-base em centavos, desde que o preço final permaneça válido. Todas as operações devem validar a propriedade do produto e impedir acesso entre tenants.

### [RF025] – Criação de categorias

O sistema deve permitir criar categorias específicas para organizar os produtos da loja.

> **Critérios de aceitação:** Categoria deve possuir nome e ordem de exibição e pertencer à loja e ao tenant autenticado. A criação pode ocorrer no fluxo de produto ou na gestão de categorias. Nomes duplicados na mesma loja devem ser impedidos após normalização.

### [RF026] – Gerenciamento de categorias

O sistema deve permitir editar, ordenar e remover categorias da loja.

> **Critérios de aceitação:** Nome, descrição e ordem podem ser alterados. A categoria sistêmica `Todos` não pode ser renomeada nem removida. Categoria com produtos vinculados deve exigir remapeamento ou retornar HTTP 409. Categoria de outro tenant deve retornar HTTP 403.

### [RF027] – Associação de categoria ao produto

O sistema deve permitir associar cada produto a uma categoria específica da própria loja.

> **Critérios de aceitação:** A categoria deve pertencer à mesma loja e tenant do produto. Cada produto deve possuir exatamente uma categoria persistida; quando nenhuma categoria específica for escolhida, deve usar a categoria padrão `Todos`. Na vitrine, o filtro `Todos` deve reunir todos os produtos públicos, e não apenas aqueles cujo `category_id` aponta para a categoria padrão.

### [RF028] – Navegação pública por categoria

O sistema deve permitir que consumidores filtrem os produtos pela categoria da loja.

> **Critérios de aceitação:** `Todos` deve exibir todos os produtos públicos da loja; categorias específicas devem exibir apenas seus produtos. A ordem deve seguir a configuração do lojista. Categorias excluídas, vazias quando ocultadas pela regra de apresentação ou pertencentes a outra loja não devem produzir resultados indevidos.

### [RF031] – Limites de produtos e armazenamento por plano

O sistema deve restringir produtos e armazenamento de imagens conforme o direito de uso do tenant.

> **Critérios de aceitação:** O plano deve definir limites verificáveis, incluindo quantidade de produtos e quota de imagens. Tentativa de exceder um limite deve ser bloqueada no backend com HTTP 403 e mensagem orientativa. Downgrade não pode apagar dados automaticamente; deve bloquear novas inclusões e conduzir o lojista à adequação conforme política vigente.

## Checkout, pedido e WhatsApp

### [RF033] – Validação server-side do checkout

O sistema deve validar o conteúdo do carrinho no backend antes de preparar o pedido.

> **Critérios de aceitação:** O frontend deve enviar IDs, variações escolhidas, quantidades e dados do consumidor, nunca valores financeiros confiáveis. O backend deve consultar loja, WhatsApp, produtos, preços atuais, promoções, variações e disponibilidade. Se qualquer item for inválido, nenhum pedido deve ser criado e a resposta deve identificar os itens problemáticos. Em sucesso, o sistema deve criar o registro de pedido de forma idempotente e devolver seu identificador, totais validados e mensagem formatada.

### [RF034] – Redirecionamento do pedido ao WhatsApp

O sistema deve permitir abrir o WhatsApp do lojista com a mensagem do pedido validado.

> **Critérios de aceitação:** A URL deve seguir `wa.me/{numero}?text={mensagem_codificada}` e usar o WhatsApp atual da loja. A mensagem deve conter identificação do pedido, produtos, variações, quantidades, valores unitários, total e dados adicionais autorizados. O sistema não pode afirmar que a mensagem foi enviada, pois apenas abre um serviço externo. Falha ao abrir deve permitir nova tentativa sem duplicar o pedido.

### [RF038] – Acompanhamento do pedido pelo lojista

O sistema deve permitir que o lojista consulte os pedidos preparados para sua loja e atualize seus estados operacionais.

> **Critérios de aceitação:** A listagem deve ser restrita ao tenant, paginada e pesquisável. O estado inicial deve indicar que o envio pelo WhatsApp não foi confirmado. Mudanças de estado devem ser explícitas e auditáveis. O sistema não deve representar pagamento, entrega ou aceite comercial como concluídos sem ação ou evidência correspondente.

## Planos e assinaturas SaaS

### [RF039] – Contratação de plano pelo Stripe Checkout

O sistema deve permitir que o lojista elegível inicie a contratação de um plano ativo.

> **Critérios de aceitação:** O backend deve resolver o `stripe_price_id` a partir do plano interno, criar a sessão com os metadados de tenant e plano e retornar somente a URL de checkout. Não deve aceitar preço enviado pelo frontend. Tenant com assinatura paga ativa não pode criar contratação duplicada incompatível.

### [RF040] – Gestão do ciclo de vida da assinatura

O sistema deve refletir os estados `active`, `past_due`, `unpaid` e `canceled` e a vigência da assinatura.

> **Critérios de aceitação:** Mudanças devem vir de eventos válidos do provedor ou de operação administrativa autorizada. `past_due` deve seguir período de tolerância configurado; `unpaid`, cancelamento sem vigência e expiração devem suspender recursos pagos e a publicação, sem apagar dados. Cancelamento com vigência restante deve manter direitos até `ends_at`.

### [RF041] – Reconciliação de pagamentos

O sistema deve permitir reconciliar assinaturas quando o webhook estiver ausente, atrasado ou fora de ordem.

> **Critérios de aceitação:** A reconciliação deve consultar o Stripe por identificadores confiáveis, preservar idempotência, não confiar no navegador e registrar divergências. Enquanto não houver confirmação segura, a interface deve informar que o pagamento está em processamento, sem conceder acesso pago indevido.

### [RF042] – Alteração ou cancelamento de plano

O sistema deve permitir ao lojista solicitar mudança ou cancelamento da assinatura conforme as regras comerciais.

> **Critérios de aceitação:** A operação deve apresentar impacto, vigência e limites antes da confirmação. Downgrade não deve excluir produtos ou imagens automaticamente. Cancelamento deve preservar os dados durante a retenção e registrar quando o direito de uso termina.

## Administração da plataforma

### [RF043] – Gestão administrativa de lojistas

O sistema deve permitir que administradores autorizados consultem, suspendam e reativem tenants.

> **Critérios de aceitação:** A listagem deve oferecer busca e filtros. Ações devem exigir confirmação, justificativa e permissão compatível com o papel do administrador. Suspensão deve bloquear operações privadas pagas e retirar a loja de circulação, sem apagar dados. Toda ação deve gerar auditoria.

### [RF044] – Moderação de lojas e produtos

O sistema deve permitir que administradores autorizados moderem conteúdo que viole regras legais, contratuais ou comerciais.

> **Critérios de aceitação:** A ação deve identificar alvo, motivo, administrador e data, preservar evidência necessária e ser reversível quando aplicável. Conteúdo bloqueado não deve permanecer publicamente acessível. O lojista deve receber informação adequada sobre a restrição.

### [RF045] – Gestão administrativa de planos

O sistema deve permitir que administradores autorizados criem, consultem, alterem e desativem planos.

> **Critérios de aceitação:** Nome, preço em centavos, limites, `stripe_price_id` e disponibilidade devem ser validados. Desativar um plano impede novas contratações, mas não altera silenciosamente contratos vigentes. Alterações críticas devem gerar auditoria.

### [RF046] – Consulta de logs e eventos de auditoria

O sistema deve permitir que administradores autorizados pesquisem logs de acesso, segurança, pagamento e ações administrativas.

> **Critérios de aceitação:** A consulta deve permitir filtros por período, ator, tenant, ação e alvo, respeitar o papel do administrador e não permitir alteração do conteúdo auditado. Eventos devem possuir data, origem, resultado e correlação suficientes para investigação.

### [RF047] – Gestão de administradores e papéis

O sistema deve permitir que somente administradores com privilégio superior gerenciem outros administradores.

> **Critérios de aceitação:** Devem existir, no mínimo, os papéis `super_admin`, `support` e `finance`, cada um com permissões explícitas. Criação, alteração de papel, desativação e reativação devem exigir autenticação reforçada e gerar auditoria.

## Privacidade, transparência e suporte

### [RF048] – Aceite e versionamento de documentos legais

O sistema deve registrar o aceite dos Termos de Uso e da Política de Privacidade aplicáveis ao lojista e, quando houver coleta de dados do consumidor, apresentar a informação legal adequada.

> **Critérios de aceitação:** O registro deve conter usuário ou contexto, documento, versão, data e finalidade. Nova versão que exija consentimento deve solicitar novo aceite. Quando dados do consumidor forem coletados para preparar o pedido, a informação de privacidade e o aceite aplicável devem ser apresentados antes do envio ao WhatsApp. A recusa deve impedir apenas o fluxo que depende legitimamente daquele aceite.

### [RF049] – Exercício dos direitos do titular

O sistema deve oferecer canal para solicitações de acesso, correção, portabilidade quando aplicável e exclusão de dados pessoais.

> **Critérios de aceitação:** A solicitação deve receber protocolo, passar por verificação de identidade e ser rastreável até a conclusão. Exclusão deve respeitar obrigações legais, prevenção a fraude, retenção de logs e dados que pertencem ao lojista como controlador.

### [RF050] – Transparência sobre a negociação externa

O sistema deve informar que o PedeAqui oferece a vitrine e prepara o contato, mas que negociação, pagamento do produto, entrega e atendimento acontecem entre consumidor e lojista fora da plataforma.

> **Critérios de aceitação:** A informação deve aparecer antes do redirecionamento e nos documentos legais. A interface não deve afirmar que a compra, o pagamento, o envio da mensagem ou a entrega foram concluídos apenas porque o WhatsApp foi aberto.
