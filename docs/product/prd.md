# PRD — PedeAqui

## 1. Identificação do documento

| Campo | Valor |
| --- | --- |
| Documento | Product Requirements Document (PRD) |
| Produto | PedeAqui |
| Versão | 1.0 |
| Estado | Ativo |
| Data-base | 15 de julho de 2026 |
| Equipe | Cloud Hive |
| Público principal | Produto, engenharia, design, qualidade, operação e avaliação acadêmica |

Este PRD é o documento principal de produto do PedeAqui. Ele conecta o problema de negócio ao escopo que engenharia deve entregar. Requisitos funcionais e não funcionais detalham as obrigações aqui descritas; decisões arquiteturais explicam como implementá-las.

Mudanças de visão, público, escopo do MVP ou critérios de sucesso devem atualizar este arquivo antes de alterar artefatos derivados.

## 2. Visão geral do produto

O **PedeAqui** é uma plataforma SaaS multi-tenant de vitrines digitais para pequenos e médios empreendedores. O produto permite que um lojista crie uma presença digital, organize seu catálogo e compartilhe uma loja pública sem precisar desenvolver ou operar um e-commerce completo.

Consumidores podem descobrir lojas, consultar produtos, organizar itens em um carrinho por estabelecimento e preparar um pedido. Depois da validação dos itens, o sistema abre o WhatsApp do lojista com uma mensagem preenchida. A negociação, o pagamento dos produtos, a entrega e o atendimento permanecem sob responsabilidade direta do consumidor e do lojista.

O Stripe é utilizado exclusivamente para cobrar a assinatura SaaS do lojista. O PedeAqui não processa o pagamento dos produtos expostos nas vitrines.

### 2.1 Problema

Pequenos empreendedores frequentemente dependem de redes sociais e conversas dispersas no WhatsApp para divulgar e vender produtos. Esse processo gera problemas como:

- catálogo desorganizado ou desatualizado;
- repetição de informações durante o atendimento;
- dificuldade para compartilhar todos os produtos em um único endereço;
- baixa apresentação profissional do negócio;
- dependência de conhecimento técnico para criar uma presença digital própria;
- custo e complexidade excessivos nas plataformas tradicionais de e-commerce.

Para o consumidor, a ausência de uma vitrine organizada dificulta comparar produtos, conferir preços e preparar o contato com o lojista.

### 2.2 Solução

O PedeAqui oferece:

- onboarding orientado para o lojista;
- uma loja pública por tenant, acessível por slug único;
- gerenciamento de produtos, categorias, promoções, variações e imagens;
- carrinho temporário organizado por loja;
- validação dos itens antes da preparação do pedido;
- redirecionamento ao WhatsApp com mensagem estruturada;
- cobrança recorrente do lojista por assinatura SaaS;
- administração, moderação, auditoria e controles multi-tenant.

### 2.3 Princípios do produto

1. **Simplicidade antes de complexidade:** o lojista deve publicar e manter sua vitrine sem conhecimento técnico.
2. **WhatsApp como continuidade da jornada:** o produto organiza a descoberta e o pedido, mas preserva o canal de atendimento já usado pelo lojista.
3. **Transparência:** a interface não deve afirmar que uma mensagem, venda, pagamento de produto ou entrega foi concluída sem evidência.
4. **Segurança por padrão:** validações críticas pertencem ao backend e todo dado privado deve respeitar o tenant autenticado.
5. **Evolução incremental:** o MVP valida a proposta central antes de incorporar recursos de um e-commerce completo.

## 3. Valor de mercado

### 3.1 Segmento atendido

O produto atende pequenos empreendedores, lojistas locais, microempresas e negócios informais que usam o WhatsApp como principal canal de atendimento, mas precisam de uma apresentação digital mais organizada.

Esse público costuma encontrar duas alternativas insuficientes:

- redes sociais e listas enviadas manualmente, que possuem baixo controle de catálogo;
- plataformas completas de e-commerce, que acrescentam custos, configuração e operação superiores à necessidade inicial do negócio.

O PedeAqui ocupa o espaço entre essas alternativas: oferece catálogo e presença digital profissional sem exigir que o lojista adote imediatamente pagamentos, logística e automações de um e-commerce tradicional.

### 3.2 Proposta de valor

**Para o lojista:** publicar uma vitrine organizada rapidamente, manter produtos e preços atualizados, reduzir perguntas repetitivas e direcionar consumidores interessados ao WhatsApp.

**Para o consumidor:** consultar produtos e valores antes de iniciar o atendimento, organizar itens e enviar ao lojista uma solicitação mais clara.

**Para o PedeAqui:** gerar receita recorrente com uma solução enxuta, replicável e de baixo custo operacional.

### 3.3 Diferenciais

- foco em pequenos negócios que já vendem pelo WhatsApp;
- menor complexidade que um e-commerce completo;
- experiência pública sem cadastro obrigatório do consumidor;
- isolamento multi-tenant com uma vitrine por lojista;
- validação server-side de preços, disponibilidade e propriedade dos dados;
- upload escalável de imagens diretamente para o Cloudflare R2;
- modelo SaaS com custo inicial acessível.

### 3.4 Modelo econômico inicial

O plano inicial validado pelo projeto custa **R$ 29,99 por mês por lojista**. A infraestrutura estimada para os primeiros seis meses é de **R$ 272**, composta principalmente por VPS e domínio.

| Lojistas pagantes | Receita mensal | Receita bruta em 6 meses |
| ---: | ---: | ---: |
| 10 | R$ 299,90 | R$ 1.799,40 |
| 20 | R$ 599,80 | R$ 3.598,80 |
| 30 | R$ 899,70 | R$ 5.398,20 |

O primeiro marco comercial é atingir 10 lojistas pagantes, quantidade suficiente para validar adesão inicial e superar o custo de infraestrutura projetado para o período. Os valores não representam uma estimativa de tamanho total de mercado; são a hipótese econômica interna usada para validar o MVP.

## 4. Personas e público-alvo

### 4.1 Persona primária — Lojista pessoa física

**Exemplo:** João, 32 anos, produz alimentos ou artesanato e vende principalmente pelo WhatsApp e Instagram.

**Objetivos:**

- organizar os produtos em um único catálogo;
- compartilhar um endereço profissional;
- atualizar preço e disponibilidade sem depender de terceiros;
- receber contatos mais completos no WhatsApp;
- começar com baixo custo.

**Dificuldades:**

- pouco conhecimento técnico;
- catálogo espalhado entre fotos e mensagens;
- repetição de informações no atendimento;
- receio de plataformas difíceis de configurar.

**Necessidades no produto:** cadastro com CPF, onboarding curto, linguagem simples, gestão móvel, trial, plano acessível e feedback claro.

### 4.2 Persona primária — Lojista pessoa jurídica

**Exemplo:** Ana, 41 anos, administra uma pequena loja física formalizada e deseja ampliar sua presença digital.

**Objetivos:**

- publicar catálogo com CNPJ e informações comerciais corretas;
- organizar categorias, promoções e variações;
- controlar a identidade e a disponibilidade da vitrine;
- manter dados e produtos isolados de outros lojistas;
- possuir cobrança e histórico operacional rastreáveis.

**Dificuldades:**

- soluções completas possuem recursos e custos desnecessários;
- atualização manual em vários canais gera inconsistência;
- precisa cumprir requisitos de identificação do fornecedor.

**Necessidades no produto:** tenant empresarial com CNPJ, gestão segura, imagens, assinatura SaaS, auditoria e suporte.

### 4.3 Persona primária — Consumidor

**Exemplo:** Luiza, 27 anos, encontra lojas por links e prefere conferir produtos antes de chamar o vendedor.

**Objetivos:**

- acessar a vitrine sem criar conta;
- pesquisar produtos e visualizar valores atuais;
- organizar itens por loja;
- enviar uma solicitação clara pelo WhatsApp.

**Dificuldades:**

- catálogos desorganizados em redes sociais;
- preços e disponibilidade pouco claros;
- necessidade de repetir manualmente todos os itens desejados.

**Necessidades no produto:** navegação responsiva, busca, carrinho local, validação dos itens, transparência e redirecionamento confiável.

### 4.4 Persona secundária — Administrador da plataforma

**Exemplo:** integrante da operação, suporte ou financeiro responsável pela integridade do SaaS.

**Objetivos:**

- localizar e auxiliar lojistas;
- suspender contas ou conteúdo irregular;
- administrar planos e situações financeiras conforme seu papel;
- investigar eventos e manter rastreabilidade.

**Necessidades no produto:** acesso por papel, filtros, confirmações, justificativas, logs imutáveis e privilégio mínimo.

## 5. Escopo detalhado do MVP

O escopo abaixo representa o compromisso funcional do MVP. O estado de implementação e as lacunas técnicas devem ser acompanhados em registros de engenharia, sem reduzir silenciosamente este escopo.

### 5.1 Incluído no MVP

#### A. Descoberta e catálogo público

- página inicial com apresentação do produto, planos e lojas disponíveis;
- listagem paginada de lojas ativas;
- busca de lojas por nome e localização;
- acesso direto à vitrine por slug único;
- exibição de identidade, endereço, cidade, UF, horário, contato e identificação legal do lojista;
- listagem paginada de produtos públicos;
- busca, ordenação e filtros por categoria e preço;
- tela pública de detalhes do produto;
- apresentação de preço promocional vigente;
- compartilhamento da URL pública da loja;
- estados adequados para loja inexistente, inativa, suspensa ou sem produtos.

#### B. Carrinho e contato pelo WhatsApp

- carrinho temporário no `localStorage`, sem conta de consumidor;
- agrupamento de itens por loja;
- inclusão, alteração de quantidade e remoção de produtos;
- limite de 50 produtos distintos;
- coleta dos dados necessários à preparação do contato;
- validação server-side de loja, produtos, variações, quantidades, disponibilidade, promoções e preços;
- criação idempotente de um registro de pedido preparado;
- geração da mensagem com valores confirmados pelo backend;
- abertura do WhatsApp atual da loja por `wa.me`;
- nova tentativa sem duplicar o pedido quando o aplicativo externo não abrir;
- informação explícita de que abrir o WhatsApp não confirma envio, pagamento ou venda.

#### C. Cadastro, autenticação e perfil

- cadastro do responsável com nome, telefone, e-mail, senha e CPF;
- validação e unicidade de e-mail e CPF;
- aceite versionado dos documentos legais;
- login por e-mail e senha;
- sessão com token de acesso e renovação;
- logout e revogação de sessão;
- recuperação e redefinição de senha;
- consulta e atualização do próprio perfil.

#### D. Onboarding e tenant

- registro de tenant pessoa física pelo CPF do perfil;
- registro de tenant pessoa jurídica por CNPJ válido e único;
- relação de um perfil para um tenant;
- trial inicial de 30 dias, separado de uma assinatura paga;
- configuração orientada da primeira e única loja;
- bloqueio de publicação enquanto dados comerciais e legais obrigatórios estiverem incompletos;
- retomada segura do onboarding.

#### E. Gestão da loja

- uma loja por tenant;
- criação com nome, slug, endereço, cidade, UF, WhatsApp e dados de funcionamento;
- edição parcial das informações;
- logotipo, imagem de perfil e banner básico;
- ativação, desativação e exclusão lógica;
- publicação condicionada ao estado do tenant e ao direito de uso;
- categoria padrão `Todos` criada com a loja.

#### F. Gestão do catálogo

- criação, edição, consulta e exclusão lógica de produtos;
- preço em centavos e promoção opcional;
- disponibilidade manual;
- detalhes flexíveis do produto;
- criação, edição, ordenação e remoção de categorias;
- uma categoria persistida por produto e filtro público `Todos`;
- criação e gestão de variações e opções, incluindo modificador de preço;
- upload, ordenação, substituição e remoção de imagens;
- upload direto ao Cloudflare R2 por URL pré-assinada;
- controle de quota de armazenamento e limite de produtos pelo plano.

#### G. Planos e assinatura SaaS

- consulta pública dos planos ativos;
- oferta inicial de R$ 29,99 por mês;
- criação segura de sessão no Stripe Checkout;
- resolução do preço pelo plano interno, sem confiar no frontend;
- processamento idempotente de webhooks;
- estados `active`, `past_due`, `unpaid` e `canceled`;
- reconciliação quando houver webhook ausente ou fora de ordem;
- cancelamento e alteração de plano sem exclusão automática dos dados;
- suspensão de recursos pagos após o término da vigência ou da tolerância aplicável.

#### H. Operação e administração

- administradores com papéis `super_admin`, `support` e `finance`;
- listagem, pesquisa, suspensão e reativação de tenants;
- moderação básica de lojas e produtos;
- criação, alteração e desativação de planos por papel autorizado;
- consulta de logs de acesso, segurança, pagamento e auditoria;
- registro obrigatório das ações administrativas críticas.

#### I. Segurança, privacidade e qualidade mínima

- autenticação e autorização verificadas no backend;
- isolamento de dados por tenant e políticas RLS como defesa adicional;
- validação server-side das regras críticas;
- HTTPS nos ambientes publicados;
- proteção contra abuso e limitação de requisições;
- logs de acesso protegidos e retidos por 6 meses;
- minimização de dados e canal para direitos dos titulares;
- interface responsiva e acessível nas jornadas essenciais;
- tratamento padronizado de erros;
- backups, monitoramento e separação de ambientes.

### 5.2 Fora do MVP

| Item | Motivo ou destino |
| --- | --- |
| Conta e autenticação do consumidor | A jornada pública deve funcionar sem cadastro. |
| Pagamento dos produtos dentro do PedeAqui | A compra é negociada diretamente com o lojista; Stripe atende somente à assinatura SaaS. |
| Cálculo de frete, transportadoras e rastreamento de entrega | Exigem domínio logístico fora da proposta inicial. |
| Controle automático de estoque e integração com ERP | O MVP trabalha com disponibilidade manual. |
| Confirmação automática de envio da mensagem pelo WhatsApp | O fluxo `wa.me` não fornece essa confirmação ao sistema. |
| WhatsApp Business API, chatbot ou envio automatizado | Adicionam custo, autenticação e dependência operacional desnecessários à validação inicial. |
| Marketplace com vários vendedores no mesmo pedido | Cada pedido e contato pertencem a uma única loja. |
| Mais de uma loja por tenant | O modelo inicial é estritamente 1:1. |
| Domínio personalizado por lojista | O MVP utiliza slugs sob o domínio do PedeAqui. |
| Temas avançados, CSS personalizado e construtor visual | O MVP oferece somente identidade visual básica. |
| Cupons, programa de fidelidade, avaliações e favoritos | Não são necessários para validar catálogo e contato. |
| Recomendação de produtos por inteligência artificial | Requer dados e maturidade posteriores. |
| Aplicativos móveis nativos | A experiência inicial é web responsiva. |
| Geolocalização em tempo real | Cidade e UF atendem à descoberta inicial com menor impacto de privacidade. |
| Analytics avançado para o lojista | Métricas operacionais mínimas podem ser coletadas, mas dashboards analíticos ficam para evolução posterior. |
| Internacionalização e múltiplas moedas | O MVP opera em português do Brasil e valores em BRL. |
| Automação fiscal e emissão de nota | A responsabilidade comercial permanece com o lojista. |

## 6. Jornadas principais

### 6.1 Lojista publica sua vitrine

1. O usuário consulta os planos e inicia o cadastro.
2. Informa perfil pessoal e CPF, aceita os documentos legais e autentica a conta.
3. Registra o tenant como pessoa física ou jurídica.
4. Recebe o direito de uso inicial previsto para o trial.
5. Configura os dados obrigatórios da loja.
6. O sistema valida documento, endereço, contato, slug e assinatura ou trial.
7. A loja é criada com a categoria `Todos`.
8. O lojista cadastra produtos, categorias, imagens, promoções e variações.
9. A vitrine torna-se acessível pelo slug quando todas as condições forem atendidas.

### 6.2 Consumidor prepara um pedido

1. O consumidor encontra uma loja ou abre seu link direto.
2. Consulta, pesquisa e filtra produtos.
3. Adiciona itens ao carrinho, que os organiza por loja.
4. Seleciona uma loja e revisa quantidades e dados de contato.
5. O backend revalida todos os dados comerciais.
6. O sistema registra o pedido preparado e monta a mensagem.
7. O navegador abre o WhatsApp atual da loja.
8. O consumidor decide se enviará a mensagem e conclui a negociação externamente.

### 6.3 Lojista contrata o serviço

1. O lojista seleciona um plano ativo.
2. O backend encontra o preço correspondente no Stripe.
3. O Stripe Checkout processa a contratação.
4. O backend aguarda um webhook válido e idempotente.
5. A assinatura é atualizada com plano, vigência e estado corretos.
6. Falhas de entrega do webhook são tratadas por reconciliação segura.

### 6.4 Administrador atua sobre um tenant

1. O administrador autentica-se e tem seu papel validado.
2. Localiza o tenant por busca ou filtro.
3. Consulta dados permitidos ao seu papel.
4. Seleciona uma ação, informa justificativa e confirma.
5. O sistema aplica a mudança e registra a auditoria.
6. Suspensão retira a loja de circulação sem excluir os dados.

## 7. Regras centrais de negócio

1. Um perfil autenticado pode possuir no máximo um tenant.
2. Um tenant pode possuir no máximo uma loja.
3. O CPF pertence ao perfil pessoal; o CNPJ, quando existente, pertence ao tenant empresarial.
4. A loja só é pública quando não está excluída, está ativa, pertence a tenant ativo e possui direito de uso vigente.
5. Produtos públicos devem estar disponíveis, não excluídos e vinculados a uma loja pública.
6. Dados privados são sempre filtrados pelo tenant derivado da autenticação.
7. Valores financeiros são armazenados e calculados em centavos.
8. O carrinho local é uma conveniência visual, nunca a fonte final de preço ou disponibilidade.
9. Um pedido reúne itens de apenas uma loja.
10. O Stripe processa a assinatura do SaaS; não processa a compra dos produtos.
11. O WhatsApp é um serviço externo e o PedeAqui não confirma o envio da mensagem.
12. Cancelamento, inadimplência ou downgrade não apagam automaticamente os dados do lojista.
13. Ações administrativas, financeiras e de segurança devem ser auditáveis.
14. Dados obrigatórios do fornecedor devem ser exibidos de acordo com as obrigações legais e a política de privacidade.

## 8. Escopo técnico e restrições

### 8.1 Estrutura

O repositório é organizado como monorepositório, com aplicações separadas em:

- `app/frontend`: interface web;
- `app/backend`: API e regras de negócio;
- `docs`: produto, requisitos, arquitetura, telas, registros e operação da equipe.

### 8.2 Stack oficial

| Camada | Tecnologia ou decisão |
| --- | --- |
| Frontend | React, TypeScript, Vite e Tailwind CSS |
| Organização do frontend | Arquitetura por features/vertical slices |
| Comunicação HTTP | Cliente compartilhado sobre Fetch API |
| Backend | Node.js, Express e TypeScript |
| Organização do backend | Casos de uso, domínio e contratos inspirados em Clean Architecture |
| Autenticação | Supabase Auth |
| Banco | PostgreSQL gerenciado pelo Supabase |
| Dados de perfil | `public.profiles` relacionado a `auth.users` |
| Imagens | Cloudflare R2 por URLs pré-assinadas |
| Assinatura SaaS | Stripe Checkout e webhooks |
| Contato comercial | Link oficial `wa.me` |

### 8.3 Entidades principais

O domínio possui, no mínimo:

- perfis;
- tenants;
- administradores;
- planos e assinaturas;
- lojas;
- categorias;
- produtos;
- imagens de produto;
- variações e opções;
- pedidos;
- logs de auditoria.

### 8.4 Restrições

- regras de negócio e segredos não podem residir no frontend;
- componentes não devem chamar diretamente o banco ou provedores;
- endpoints privados devem validar autenticação, tenant e estado da conta;
- uploads binários não devem atravessar o backend;
- contratos de API devem evoluir de forma coordenada com o frontend;
- mensagens técnicas de provedores não devem ser exibidas diretamente ao usuário;
- migrações de banco devem ser reproduzíveis e versionadas.

## 9. Critérios de sucesso do produto

Os critérios abaixo são metas iniciais de validação. Resultados devem ser medidos em um período de seis meses após a disponibilização do MVP, salvo quando indicado de outra forma.

### 9.1 Sucesso comercial

| Indicador | Meta inicial |
| --- | ---: |
| Lojistas pagantes | Pelo menos 10 |
| Receita recorrente mensal com 10 lojistas | R$ 299,90 |
| Receita bruta acumulada em 6 meses com 10 lojistas | R$ 1.799,40 |
| Cobertura do custo de infraestrutura projetado | Superar R$ 272 no período |

### 9.2 Ativação do lojista

| Indicador | Meta inicial |
| --- | ---: |
| Cadastros válidos que concluem tenant e loja | Pelo menos 80% |
| Tempo mediano entre início do cadastro e loja apta para publicação | Até 20 minutos |
| Lojas publicadas com pelo menos 5 produtos | Pelo menos 70% |
| Falhas não recuperáveis no onboarding | Menos de 5% das tentativas válidas |

### 9.3 Valor para o consumidor

| Indicador | Meta inicial |
| --- | ---: |
| Sessões de vitrine com intenção que chegam à abertura do WhatsApp | Pelo menos 25% |
| Tentativas válidas de checkout que abrem o WhatsApp sem erro técnico | Pelo menos 95% |
| Interações principais entre produto e abertura do WhatsApp | No máximo 4 |

Uma “sessão com intenção” é aquela em que o consumidor adicionou pelo menos um produto ao carrinho. A abertura do WhatsApp não deve ser interpretada como mensagem enviada ou venda concluída.

### 9.4 Qualidade técnica

| Indicador | Meta inicial |
| --- | ---: |
| Disponibilidade mensal das vitrines e autenticação | Pelo menos 99% |
| Resposta p95 das consultas públicas sob carga definida | Até 2 segundos |
| Incidentes confirmados de acesso entre tenants | Zero |
| Webhooks duplicados que causam efeito financeiro duplicado | Zero |
| Pedidos duplicados pela mesma chave idempotente | Zero |
| Jornadas essenciais utilizáveis em mobile e desktop | 100% |
| Vulnerabilidades críticas conhecidas sem mitigação em produção | Zero |

### 9.5 Aceitação do MVP

O MVP estará apto para lançamento quando:

1. as quatro jornadas principais deste PRD funcionarem de ponta a ponta;
2. os requisitos funcionais priorizados para o MVP tiverem critérios verificáveis;
3. autenticação, isolamento multi-tenant, checkout e webhooks possuírem testes automatizados;
4. nenhuma falha crítica de segurança ou perda de dados permanecer aberta;
5. Termos de Uso e Política de Privacidade estiverem publicados e versionados;
6. logs, backups, monitoramento e procedimento de recuperação estiverem operacionais;
7. a interface essencial atender responsividade e acessibilidade definidas;
8. o fluxo deixar claro que o PedeAqui não processa a compra dos produtos nem confirma o envio pelo WhatsApp.

## 10. Riscos e dependências

| Risco ou dependência | Impacto | Tratamento esperado |
| --- | --- | --- |
| Catálogo desatualizado pelo lojista | Consumidor recebe informação incorreta | Gestão simples, disponibilidade manual e responsabilização contratual |
| Dependência do WhatsApp | Mudanças ou indisponibilidade afetam o contato | Uso de `wa.me`, mensagens transparentes e possibilidade de nova tentativa |
| Falha ou atraso do Stripe | Acesso pago pode não refletir a cobrança | Webhook idempotente, estado de processamento e reconciliação |
| Indisponibilidade do Supabase | Afeta autenticação e dados | Monitoramento, timeout, backup e comunicação de indisponibilidade |
| Inconsistência entre R2 e banco | Imagens órfãs ou quebradas | Confirmação de upload, compensação e rotina de limpeza |
| Vazamento entre tenants | Risco crítico de segurança e confiança | Autorização no backend, filtros por tenant, RLS e testes negativos |
| Crescimento acima da infraestrutura inicial | Queda de desempenho | Métricas, paginação, CDN e evolução gradual da VPS |
| Conteúdo ilegal ou proibido | Risco jurídico e de plataforma | Termos, moderação e auditoria |
| Baixa adesão ao onboarding | Reduz conversão | Fluxo curto, retomada, mensagens claras e medição de abandono |

## 11. Rastreabilidade

| Tema | Documento |
| --- | --- |
| Requisitos funcionais detalhados | [`../requirements/functional/functional-requirements.md`](../requirements/functional/functional-requirements.md) |
| Requisitos não funcionais | [`../requirements/non-functional/non-functional-requirements.md`](../requirements/non-functional/non-functional-requirements.md) |
| Casos de uso | [`../requirements/use-cases/`](../requirements/use-cases/) |
| Histórias de usuário | [`../requirements/user-stories/`](../requirements/user-stories/) |
| Edge cases | [`../requirements/edge-cases/`](../requirements/edge-cases/) |
| Telas | [`../screens/`](../screens/) |
| Diagramas e fluxos | [`../diagrams/`](../diagrams/) |
| Arquitetura e ADRs | [`../architeture/`](../architeture/) |
| Viabilidade | [`../business/viability/rvs.md`](../business/viability/rvs.md) |
| Roadmap | [`../business/roadmap/pruduct-roadmap.md`](../business/roadmap/pruduct-roadmap.md) |
| Riscos | [`../business/risks/risks-plan.md`](../business/risks/risks-plan.md) |

## 12. Governança do PRD

- O PRD define visão, público, escopo e sucesso do produto.
- Os RFs e RNFs detalham obrigações verificáveis e não devem contradizer este documento.
- ADRs podem escolher soluções técnicas, mas não reduzir o resultado de produto sem revisão do PRD.
- Registros de auditoria documentam divergências entre documentação e implementação; não substituem decisões de produto.
- Toda entrada ou retirada de escopo do MVP deve registrar motivo, impacto, responsável e documentos afetados.
- Métricas devem ser revisadas após o primeiro ciclo real de uso, sem reescrever retroativamente os resultados observados.
