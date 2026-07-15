# Roadmap de Produto — PedeAqui

> Horizonte do MVP: 2 meses · Plataforma SaaS de vitrine virtual para pequenos empreendedores
>
> Time: Cloud Hive · Disciplina: Engenharia de Software · Período: 2026.3

---

## Objetivo do roadmap

Este roadmap organiza a construção do PedeAqui durante os dois meses destinados ao MVP e registra a evolução prevista após sua validação. O objetivo do MVP é demonstrar o funcionamento dos fluxos essenciais do lojista, do consumidor e da administração da plataforma em ambiente controlado.

Integrações de cobrança, armazenamento de arquivos e infraestrutura pública continuam fazendo parte da evolução do produto, mas não são condições para validar o funcionamento do MVP.

## Estados utilizados

| Estado | Significado |
|--------|-------------|
| Concluído | Implementado e disponível no fluxo atual do projeto |
| Em finalização | Implementação iniciada ou parcialmente integrada ao fluxo principal |
| Pós-MVP | Evolução planejada após a validação funcional do MVP |

---

## Visão geral dos dois meses

| Fase | Período | Objetivo | Estado |
|------|---------|----------|--------|
| Fase 1 | Semanas 1–2 | Definição do produto, requisitos, arquitetura e ambiente de desenvolvimento | Concluído |
| Fase 2 | Semanas 3–4 | Autenticação, domínio multi-tenant e fluxo inicial do lojista | Concluído |
| Fase 3 | Semanas 5–6 | Loja, catálogo e integração entre frontend e backend | Concluído com limitações registradas |
| Fase 4 | Semanas 7–8 | Fluxos do consumidor e administrador, estabilização e validação do MVP | Em finalização |
| Evolução | Após o MVP | Cobrança real, imagens, infraestrutura pública e operação de produção | Pós-MVP |

---

## Fase 1 — Fundação do produto

**Semanas 1–2 · Concluído**

### Produto e documentação

- Definição do problema, proposta de valor e público-alvo.
- Levantamento dos requisitos funcionais e não funcionais.
- Definição inicial dos fluxos do lojista, consumidor e administrador.
- Registro das decisões arquiteturais, riscos, viabilidade e regras de colaboração da equipe.

### Base técnica

- Organização do monorepo com frontend e backend separados.
- Frontend desenvolvido com React, Vite, Tailwind CSS e TypeScript.
- Backend desenvolvido com Node.js, Express e TypeScript.
- Supabase adotado para autenticação e PostgreSQL gerenciado.
- Estrutura multi-tenant preparada para separar os dados de cada lojista.
- Convenções de branches, commits, pull requests e revisão de código estabelecidas.

---

## Fase 2 — Autenticação e entrada do lojista

**Semanas 3–4 · Concluído**

### Cadastro e autenticação

- Cadastro do lojista com validação dos dados obrigatórios, incluindo CPF.
- Autenticação e manutenção da sessão do usuário.
- Criação do perfil associado à identidade autenticada.
- Tratamento dos principais erros de cadastro e login.

### Onboarding e acesso inicial

- Seleção visual do plano e preenchimento da pré-configuração da loja.
- Criação do tenant e da loja após a autenticação.
- Ativação de um período gratuito controlado internamente pelo sistema.
- Acesso à loja criada sem cobrança financeira durante o MVP.

O período gratuito do MVP não representa uma assinatura processada pela Stripe. A seleção do plano ainda não participa da contratação financeira e será integrada ao fluxo de cobrança após o MVP.

---

## Fase 3 — Loja e catálogo

**Semanas 5–6 · Concluído com limitações registradas**

### Gestão do lojista

- Criação e atualização dos dados da loja.
- Endereço público exclusivo por meio de slug.
- Gestão de produtos e categorias conectada à API.
- Controle de disponibilidade dos produtos.
- Isolamento das operações pelo tenant autenticado.

### Catálogo público

- Consulta da loja pública por slug.
- Exibição dos produtos e categorias cadastrados.
- Pesquisa, filtros e visualização dos detalhes de um produto.
- Acesso público ao catálogo sem exigir conta do consumidor.

### Limitações aceitas no MVP

- O upload de imagens não depende do Cloudflare R2 nesta etapa.
- A gestão de variações e opções ainda não está totalmente conectada ao frontend.
- A recuperação do onboarding após determinados estados intermediários ainda precisa ser aprimorada.
- O funcionamento local e o ambiente controlado são suficientes para a validação funcional desta fase.

---

## Fase 4 — Fechamento e validação do MVP

**Semanas 7–8 · Em finalização**

### Fluxo do consumidor

- Substituir os dados demonstrativos da listagem geral por lojas obtidas da API.
- Integrar a inclusão de produtos reais da vitrine ao carrinho.
- Manter o carrinho temporário no navegador, sem exigir cadastro do consumidor.
- Validar os dados essenciais do pedido.
- Gerar a mensagem com os itens selecionados e abrir o contato com o lojista pelo `wa.me`.
- Manter a negociação, o pagamento dos produtos e a entrega fora da plataforma.

### Fluxo administrativo essencial

- Disponibilizar uma área administrativa separada do painel do lojista.
- Validar a autenticação e o papel do administrador antes de permitir ações protegidas.
- Oferecer a visibilidade operacional mínima necessária sobre lojistas e dados da plataforma.
- Restringir operações administrativas de acordo com as permissões definidas.

As funções avançadas de moderação, auditoria, relatórios e gestão operacional completa permanecem como evolução pós-MVP.

### Estabilização

- Validar os fluxos integrados do lojista, consumidor e administrador.
- Corrigir falhas que impeçam a demonstração das jornadas principais.
- Revisar mensagens de erro, responsividade e consistência visual.
- Manter requisitos, diagramas e documentação alinhados ao comportamento atual.
- Executar testes proporcionais aos fluxos críticos disponíveis no MVP.

## Critérios de conclusão do MVP

O MVP estará funcionalmente validado quando for possível demonstrar que:

1. o lojista consegue cadastrar-se, autenticar-se, criar sua loja e acessar sua vitrine;
2. o lojista consegue cadastrar e administrar produtos e categorias;
3. o consumidor consegue acessar uma loja pública e consultar produtos reais;
4. o consumidor consegue montar um pedido e iniciar o contato com o lojista pelo WhatsApp;
5. o administrador possui acesso protegido ao conjunto mínimo de operações administrativas;
6. os fluxos principais funcionam de forma integrada em um ambiente controlado.

---

## Evolução planejada após o MVP

### Cobrança SaaS com Stripe

- Conectar a seleção do plano do frontend à criação de uma sessão real do Stripe Checkout.
- Validar preços, planos e identidade do tenant no backend.
- Processar webhooks de forma segura e idempotente.
- Sincronizar os estados de assinatura, trial, pagamento, cancelamento e inadimplência.
- Impedir que a interface apresente uma ativação financeira antes da confirmação da Stripe.

### Imagens com Cloudflare R2

- Gerar URLs pré-assinadas no backend.
- Realizar upload direto do frontend para o R2.
- Confirmar o upload antes de associar a imagem ao produto.
- Tratar arquivos inválidos, imagens órfãs, exclusões e falhas de sincronização.

### Infraestrutura pública

- Contratar e configurar a VPS destinada ao backend.
- Publicar o frontend em plataforma apropriada, incluindo a possibilidade de Cloudflare Pages.
- Configurar domínio, HTTPS, variáveis de ambiente e políticas de CORS.
- Implantar pipeline de entrega, ambiente de validação e estratégia de rollback.
- Adicionar monitoramento de disponibilidade, erros, banco de dados e limites dos serviços utilizados.

### Administração e conformidade operacional

- Ampliar a gestão de lojistas, assinaturas e estados da plataforma.
- Implementar moderação de lojas e produtos.
- Disponibilizar consulta e filtros de auditoria.
- Consolidar a retenção segura de logs e os canais operacionais relacionados à privacidade.
- Revisar periodicamente o fluxo `wa.me` e as integrações de terceiros.

### Expansão do produto

- Personalização visual da vitrine com cores, logo e banner.
- Métricas de acesso e desempenho do catálogo para o lojista.
- Histórico e notificações de pedidos quando houver persistência desse domínio.
- Busca e filtros avançados.
- Avaliação de novas funcionalidades comerciais conforme a validação do produto.

---

## Matriz de riscos do cronograma

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Desatualização do catálogo pelo lojista | Alta | Alto | Interface simples; responsabilidade do lojista via Termos de Uso |
| Dependência do WhatsApp como canal principal | Média | Alto | Redirecionamento via `wa.me` (sem API paga); monitoramento de política Meta |
| Integração incompleta frontend–backend | Média | Médio | Monorepo TurboRepo; testes de integração na Fase 3 |
| Dependência de serviços terceiros gratuitos | Média | Médio | Monitoramento de limites do Supabase; plano de upgrade |
| Falhas de configuração na infraestrutura inicial | Baixa | Médio | Deploy antecipado na Fase 1; ambiente de staging |
| Escalabilidade limitada no MVP | Baixa | Médio | Arquitetura planejada para evolução incremental |

---

## Custo total estimado — 6 primeiros meses (TCO)

| Item | Valor |
|------|-------|
| VPS Backend (R$44/mês × 6) | R$264 |
| Domínio `pedeaqui.store` | R$8 |
| Hospedagem frontend | R$0 |
| Tecnologias (React, Node, Supabase, etc.) | R$0 |
| APIs externas | R$0 |
| **Total** | **R$272** |

---
