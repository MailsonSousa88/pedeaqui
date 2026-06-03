# Roadmap — PedeAqui

> MVP em 2 meses · Plataforma SaaS de vitrine virtual para pequenos empreendedores  
> Time: Cloud Hive · Disciplina: Engenharia de Software · Período: 2026.3

---

## Visão geral do cronograma

| Fase | Descrição | Período |
|------|-----------|---------|
| Fase 1 | Pré-desenvolvimento | Semanas 1 |
| Fase 2 | Desenvolvimento core — MVP | Semanas 2 |
| Fase 3 | Legal, infra e validação | Semana 3-4 |
| Fase 4 | Lançamento & pós-MVP | 5 |

---

## Fase 1 — Pré-desenvolvimento
**Semana 1**

Cobre os pré-requisitos que desbloqueiam o desenvolvimento: ambiente configurado, infraestrutura provisionada e documentos legais redigidos antes de qualquer código de produto.

### Setup do monorepo
- Configurar **TurboRepo** com workspaces separados para frontend e backend
- Frontend: React + Vite + Tailwind CSS + TypeScript
- Backend: Node.js + Express + TypeScript
- Definir convenções de código, lint e estrutura de pastas

### Infraestrutura inicial
- Provisionar VPS para o backend (~R$44/mês)
- Registrar domínio `pedeaqui.store` (~R$8/ano)
- Configurar pipeline básico de deploy (frontend em plataforma gratuita, backend na VPS)
- Estimar custo total de infraestrutura para os primeiros 6 meses: **R$272**

### Supabase & banco de dados
- Criar projeto no Supabase (BaaS com PostgreSQL gerenciado)
- Modelar schema inicial: tabelas de lojistas, produtos e categorias
- Habilitar módulo de autenticação do Supabase

### Documentação legal (prioridade crítica)
- Redigir **Termos de Uso** com foco em isenção de responsabilidade sobre vendas e entregas (Art. 18 e 19 do Marco Civil)
- Redigir **Política de Privacidade** detalhando finalidade dos dados e fluxo para o WhatsApp (LGPD — Art. 5º, 7º e 15º)
- Definir formalmente: plataforma = **Operadora**, lojista = **Controlador** dos dados dos clientes finais

---

## Fase 2 — Desenvolvimento core — MVP
**Semana 2**

Núcleo do produto: as funcionalidades essenciais que validam a proposta de valor da plataforma.

### Autenticação do lojista
- Cadastro, login e recuperação de senha via Supabase Auth
- **Trava de cadastro obrigatória (CDC):** lojista não pode publicar a vitrine sem preencher CNPJ/CPF e endereço (Art. 2º do Decreto 7.962/2013)
- Checkbox de aceite dos Termos de Uso e Política de Privacidade no primeiro acesso

### Gestão de produtos
- CRUD completo de produtos: nome, descrição, imagem, preço e categoria
- Painel administrativo simples e intuitivo, acessível sem conhecimento técnico
- Upload de imagens com armazenamento via Supabase Storage

### Catálogo público
- Página pública da vitrine do lojista com URL única
- Listagem e visualização de produtos disponíveis
- Exibição obrigatória das informações do lojista no rodapé (CNPJ/CPF, endereço — conformidade CDC)

### Carrinho + redirecionamento WhatsApp
- Seleção de produtos pelo cliente (carrinho de pedidos)
- Redirecionamento via `wa.me` com mensagem pré-preenchida contendo os itens selecionados
- Sem gateway de pagamento no MVP — transação ocorre fora da plataforma

### API REST (backend)
- Rotas Express para produtos, lojistas e catálogo
- Comunicação com o frontend via Fetch API nativa
- Validações e tratamento de erros nas rotas principais

### Painel administrativo da plataforma
- Área interna para gestão de lojistas cadastrados
- Visibilidade operacional básica da plataforma (lojistas ativos, produtos cadastrados)

---

## Fase 3 — Legal, infra e validação
**Semanas 3-4**

Fechamento dos requisitos legais operacionais e testes de integração antes do deploy em produção.

### Conformidade com o Marco Civil (Lei 12.965/2014)
- Configurar retenção automática de **logs de acesso por 6 meses** (IP, data e hora de todos os usuários)
- Armazenar logs em ambiente seguro e sigiloso (Art. 15 do Marco Civil)

### Conformidade com a LGPD (Lei 13.709/2018)
- Implementar checkbox de aceite dos termos no primeiro pedido do comprador
- Criar canal do titular: e-mail `privacidade@pedeaqui.store` para atender solicitações de exclusão de dados

### Testes & QA
- Testes de integração entre frontend e backend
- Validação do fluxo completo: cadastro → produto → catálogo público → carrinho → redirecionamento WhatsApp
- Ajustes finais de usabilidade, responsividade e performance

---

## Fase 4 — Lançamento & pós-MVP
**Semana 5**

Deploy em produção, início da aquisição de lojistas e operação contínua com melhoria iterativa.

### Lançamento do MVP
- Deploy em produção com domínio `pedeaqui.store` ativo
- Início da aquisição dos primeiros lojistas
- Meta mínima para cobrir o TCO: **10 lojistas** (receita de R$1.799,40 em 6 meses vs custo de R$272)

### Assinatura SaaS
- Implementar cobrança recorrente de **R$29,99/mês por lojista**
- Modelo de receita escalável: 10 lojistas → R$1.799 | 20 → R$3.598 | 30 → R$5.398 (em 6 meses)

### Monitoramento de infraestrutura
- Acompanhar disponibilidade da VPS e integridade do banco de dados
- Monitorar limites do plano gratuito do Supabase conforme crescimento da base
- Avaliar upgrade de infraestrutura em caso de crescimento acelerado

### Auditoria de conformidade (recorrente)
- Revisar periodicamente o fluxo `wa.me` conforme atualizações das Políticas Comerciais da Meta
- Caso a base de dados de geolocalização seja adicionada futuramente: elaborar **RIPD** (Relatório de Impacto à Proteção de Dados Pessoais)

### Melhorias iterativas (backlog pós-MVP)
- Busca avançada e filtros por categoria no catálogo
- Personalização visual da vitrine (cores, logo, banner)
- Notificações e histórico de pedidos
- Métricas de acesso ao catálogo para o lojista
- Avaliação de funcionalidades de e-commerce completo conforme validação do produto

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