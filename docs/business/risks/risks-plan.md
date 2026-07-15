# Plano de Gerenciamento de Riscos — PedeAqui

**Projeto:** PedeAqui — Plataforma SaaS de Vitrine Virtual  
**Time:** Cloud Hive  
**Disciplina:** Engenharia de Software · Período: 2026.3  
**Versão:** 1.0  

> Este documento é uma extensão e aprofundamento da Matriz de Riscos presente no RVS.  
> Incorpora riscos técnicos, operacionais, legais, econômicos e de produto identificados  
> a partir da análise integral dos artefatos do projeto (RVS + PRD + Roadmap).

---

## 1. Metodologia

Cada risco é classificado segundo dois eixos:

- **Probabilidade:** Alta · Média · Baixa
- **Impacto:** Alto · Médio · Baixo

A combinação dos dois eixos gera um **Nível de Exposição** que orienta a prioridade de resposta:

| Probabilidade \ Impacto | Alto | Médio | Baixo |
|-------------------------|------|-------|-------|
| **Alta** | 🔴 Crítico | 🟠 Elevado | 🟡 Moderado |
| **Média** | 🟠 Elevado | 🟡 Moderado | 🟢 Baixo |
| **Baixa** | 🟡 Moderado | 🟢 Baixo | 🟢 Baixo |

A resposta ao risco segue uma das quatro estratégias padrão:

- **Mitigar** — reduzir probabilidade ou impacto com ações preventivas
- **Aceitar** — reconhecer o risco e monitorar sem ação imediata
- **Transferir** — deslocar a responsabilidade (contrato, termos, seguro)
- **Evitar** — remover a causa do risco do escopo do projeto

---

## 2. Catálogo de Riscos

Os riscos estão agrupados por categoria para facilitar a atribuição de responsabilidades e o acompanhamento ao longo do ciclo de vida do projeto.

---

### 2.1 Riscos de Produto

#### R01 — Desatualização do catálogo de produtos pelo lojista
| Atributo | Valor |
|----------|-------|
| Probabilidade | Alta |
| Impacto | Alto |
| Exposição | 🔴 Crítico |
| Estratégia | Mitigar |

**Descrição:** O sistema depende diretamente do lojista manter produtos, preços e imagens atualizados. Informações desatualizadas comprometem a credibilidade da plataforma e prejudicam a experiência do cliente final.

**Causa raiz:** O modelo SaaS da plataforma não processa pedidos nem integra estoque — toda a responsabilidade de atualização recai sobre o lojista.

**Plano de resposta:**
- Desenvolver painel administrativo com UX simples e ações rápidas de edição
- Implementar indicadores visuais de "última atualização" no catálogo público
- Incluir cláusula contratual nos Termos de Uso responsabilizando o lojista pela acurácia das informações
- Avaliar, em versões futuras, alertas automáticos por e-mail ou WhatsApp para lojistas inativos

---

#### R02 — Baixa adoção inicial pelos lojistas
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Alto |
| Exposição | 🟠 Elevado |
| Estratégia | Mitigar |

**Descrição:** O modelo SaaS depende de uma base mínima de lojistas para cobrir os custos operacionais (breakeven em 10 lojistas). Uma adoção abaixo do esperado nos primeiros meses inviabiliza o retorno financeiro durante a fase de validação.

**Causa raiz:** O PedeAqui é um produto novo sem histórico de mercado. O público-alvo (pequenos empreendedores) pode apresentar resistência à adoção de novas ferramentas digitais ou não enxergar valor suficiente na proposta inicial.

**Plano de resposta:**
- Definir estratégia de onboarding simples com material de apoio ao lojista
- Oferecer período de teste gratuito ou preço reduzido para os primeiros cadastros
- Priorizar o desenvolvimento de uma experiência de cadastro rápida (menos de 10 minutos para a vitrine estar no ar)
- Monitorar churn e coletar feedback ativo dos primeiros lojistas

---

#### R03 — Dificuldade de utilização do painel administrativo
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Médio |
| Exposição | 🟡 Moderado |
| Estratégia | Mitigar |

**Descrição:** Se o painel administrativo não for suficientemente intuitivo, lojistas com baixo letramento digital podem ter dificuldades no gerenciamento do catálogo, gerando abandono da plataforma ou sobrecarga de suporte.

**Plano de resposta:**
- Aplicar princípios de UX simplificado desde o design inicial (número mínimo de etapas por ação)
- Realizar testes de usabilidade com ao menos um usuário representativo do público-alvo antes do lançamento
- Documentar um guia rápido de uso disponível dentro da própria plataforma

---

#### R04 — Sobrecarga de mensagens no WhatsApp do lojista
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Médio |
| Exposição | 🟡 Moderado |
| Estratégia | Aceitar / Mitigar |

**Descrição:** O aumento de visibilidade gerado pela vitrine pode elevar o volume de mensagens recebidas pelo lojista, dificultando o atendimento ágil e gerando frustração nos clientes.

**Causa raiz:** O modelo de atendimento é inteiramente dependente da capacidade humana do lojista de responder mensagens — não há automação no MVP.

**Plano de resposta:**
- Orientar lojistas, no onboarding, sobre boas práticas de atendimento via WhatsApp Business
- Avaliar, em versões futuras, integração com recursos de respostas automáticas ou catálogo nativo do WhatsApp Business
- Aceitar o risco no contexto do MVP, pois o crescimento de mensagens representa, ao mesmo tempo, validação do produto

---

### 2.2 Riscos Técnicos

#### R05 — Integração incompleta entre frontend e backend
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Médio |
| Exposição | 🟡 Moderado |
| Estratégia | Mitigar |

**Descrição:** O projeto utiliza arquitetura separada em frontend e backend dentro de um monorepositório. Falhas de contrato de API (tipos, rotas, payloads) podem gerar bugs difíceis de rastrear e atrasos no cronograma.

**Plano de resposta:**
- Definir e documentar o contrato da API REST antes de iniciar o desenvolvimento paralelo
- Utilizar TypeScript em ambos os lados para garantir consistência de tipos
- Implementar testes de integração cobrindo os fluxos críticos (auth, CRUD de produtos, catálogo público) na Fase 3 do Roadmap
- Adotar revisão de código cruzada entre membros da equipe de frontend e backend

---

#### R06 — Falhas de configuração na infraestrutura inicial
| Atributo | Valor |
|----------|-------|
| Probabilidade | Baixa |
| Impacto | Médio |
| Exposição | 🟢 Baixo |
| Estratégia | Mitigar |

**Descrição:** Problemas de configuração da VPS, domínio ou ambiente backend podem causar indisponibilidade durante as fases iniciais, comprometendo testes e o lançamento.

**Plano de resposta:**
- Provisionar e validar o ambiente de infraestrutura ainda na Fase 1 do Roadmap, antes do início do desenvolvimento
- Manter documentação do processo de configuração para facilitar reprodução e recuperação
- Configurar ambiente de staging separado do ambiente de produção

---

#### R07 — Escalabilidade limitada na infraestrutura inicial
| Atributo | Valor |
|----------|-------|
| Probabilidade | Baixa |
| Impacto | Médio |
| Exposição | 🟢 Baixo |
| Estratégia | Aceitar / Mitigar |

**Descrição:** A infraestrutura enxuta do MVP (VPS única + plano gratuito do Supabase) pode não suportar crescimento acelerado da base de lojistas e acessos simultâneos ao catálogo.

**Plano de resposta:**
- Aceitar o risco para o MVP, dado que a probabilidade de crescimento acelerado na fase inicial é baixa
- Definir thresholds de monitoramento (ex.: uso de CPU, conexões simultâneas, limite de requisições no Supabase) que disparem o processo de upgrade
- Planejar arquitetura de evolução gradual: upgrade de VPS → múltiplas instâncias → CDN para assets estáticos

---

#### R08 — Vazamento ou perda de dados dos lojistas
| Atributo | Valor |
|----------|-------|
| Probabilidade | Baixa |
| Impacto | Alto |
| Exposição | 🟡 Moderado |
| Estratégia | Mitigar / Transferir |

**Descrição:** Exposição indevida de dados cadastrais dos lojistas (CNPJ, e-mail, telefone) ou de dados dos clientes finais por falha de segurança na API ou no banco de dados.

**Causa raiz:** Configuração inadequada de permissões no Supabase (Row Level Security), ausência de validação de inputs ou exposição de variáveis de ambiente.

**Plano de resposta:**
- Habilitar e configurar **Row Level Security (RLS)** no Supabase para todas as tabelas com dados sensíveis
- Nunca expor chaves de serviço do Supabase no frontend — utilizar exclusivamente a chave pública anon
- Validar e sanitizar todos os inputs no backend antes de operações no banco
- Armazenar variáveis de ambiente em arquivo `.env` fora do controle de versão (`.gitignore`)
- Transferir parte do risco via Termos de Uso: plataforma como Operadora, lojista como Controlador (LGPD)

---

#### R09 — Indisponibilidade ou mudanças no Supabase (serviço terceiro)
| Atributo | Valor |
|----------|-------|
| Probabilidade | Baixa |
| Impacto | Alto |
| Exposição | 🟡 Moderado |
| Estratégia | Aceitar / Mitigar |

**Descrição:** O Supabase é o ponto central de dados, autenticação e storage do sistema. Indisponibilidade do serviço, mudanças nos limites do plano gratuito ou descontinuação de features impactam diretamente toda a plataforma.

**Plano de resposta:**
- Monitorar ativamente o status do Supabase (status.supabase.com) e comunicados de mudança de plano
- Manter backups periódicos do banco PostgreSQL exportados para fora do Supabase
- Aceitar o risco no curto prazo, dado que o Supabase é uma plataforma madura e amplamente adotada
- Em caso de crescimento significativo, avaliar migração para PostgreSQL autogerenciado na VPS

---

### 2.3 Riscos Legais e de Conformidade

#### R10 — Lojista anônimo e responsabilidade solidária (CDC)
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Alto |
| Exposição | 🟠 Elevado |
| Estratégia | Evitar / Transferir |

**Descrição:** Se um lojista publicar sua vitrine sem identificação suficiente (CNPJ/CPF, endereço), a plataforma pode ser responsabilizada solidariamente por danos ao consumidor com base na Teoria da Aparência (Art. 14 e 18 do CDC; Art. 2º do Decreto 7.962/2013).

**Plano de resposta:**
- **Evitar:** implementar trava técnica que impede a publicação do catálogo enquanto os dados obrigatórios não estiverem preenchidos
- Incluir validação de formato de CNPJ/CPF no cadastro
- Exibir obrigatoriamente os dados do lojista no rodapé de cada vitrine publicada
- Transferir responsabilidade via Termos de Uso: lojista se compromete com a veracidade dos dados fornecidos

---

#### R11 — Não conformidade com a LGPD (coleta de dados sem consentimento)
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Alto |
| Exposição | 🟠 Elevado |
| Estratégia | Mitigar / Transferir |

**Descrição:** A ausência de mecanismos claros de consentimento (checkboxes, política de privacidade acessível) pode configurar violação da LGPD, expondo a plataforma a sanções da ANPD e processos de titulares de dados.

**Plano de resposta:**
- Implementar checkbox de aceite dos Termos de Uso e Política de Privacidade no primeiro acesso do lojista e do comprador
- Disponibilizar Política de Privacidade em linguagem acessível com link visível em todas as páginas
- Criar canal do titular (`privacidade@pedeaqui.store`) para atender solicitações de acesso, correção e exclusão de dados
- Documentar o contrato entre Operadora (plataforma) e Controlador (lojista) como exige o Art. 39 da LGPD

---

#### R12 — Ausência de logs de acesso (Marco Civil da Internet)
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Médio |
| Exposição | 🟡 Moderado |
| Estratégia | Evitar |

**Descrição:** A plataforma é um Provedor de Aplicação obrigado por lei a registrar e manter logs de acesso (IP, data, hora) por 6 meses. A ausência desses registros gera responsabilidade legal e impede a identificação de usuários mal-intencionados (Art. 15 do Marco Civil — Lei 12.965/2014).

**Plano de resposta:**
- Implementar middleware de logging no backend (Express) que registre IP, timestamp e rota acessada em todas as requisições autenticadas
- Configurar retenção automática de 6 meses com rotação de logs
- Armazenar logs em local seguro, separado do banco de dados principal

---

#### R13 — Uso indevido da plataforma para produtos proibidos pelo WhatsApp
| Atributo | Valor |
|----------|-------|
| Probabilidade | Baixa |
| Impacto | Médio |
| Exposição | 🟢 Baixo |
| Estratégia | Transferir |

**Descrição:** Um lojista pode utilizar a plataforma para anunciar produtos que violam as Políticas Comerciais da Meta (armas, medicamentos controlados, produtos ilegais), expondo a plataforma a banimentos e danos reputacionais.

**Plano de resposta:**
- Incluir cláusula explícita nos Termos de Uso proibindo o uso da plataforma para produtos vedados pelo WhatsApp e por legislação vigente
- Implementar, em versões futuras, mecanismo de denúncia de vitrines
- Transferir a responsabilidade primária ao lojista via Termos de Uso

---

### 2.4 Riscos Econômicos e de Negócio

#### R14 — Inadimplência ou churn elevado de lojistas
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Alto |
| Exposição | 🟠 Elevado |
| Estratégia | Mitigar |

**Descrição:** O modelo SaaS de receita recorrente é altamente sensível ao churn. A perda de lojistas — por inadimplência, insatisfação ou migração para concorrentes — pode inviabilizar o projeto rapidamente dado o baixo custo de entrada (R$29,99/mês) e a base inicial pequena.

**Plano de resposta:**
- Monitorar indicadores de engajamento (frequência de acesso ao painel, produtos atualizados, vitrines ativas)
- Implementar política de suspensão automática de vitrine em caso de inadimplência após período de carência
- Coletar feedback ativo dos lojistas nos primeiros 60 dias de uso para identificar motivos de cancelamento
- Avaliar planos diferenciados (ex.: plano básico com limite de produtos) para reduzir barreira de permanência

---

#### R15 — Surgimento de concorrentes ou soluções gratuitas equivalentes
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Médio |
| Exposição | 🟡 Moderado |
| Estratégia | Aceitar / Mitigar |

**Descrição:** O mercado de ferramentas digitais para pequenos empreendedores é dinâmico. Plataformas como Instagram Shopping, catálogo nativo do WhatsApp Business ou novos concorrentes SaaS podem reduzir a percepção de valor do PedeAqui.

**Plano de resposta:**
- Manter o diferencial de simplicidade e preço acessível como posicionamento central
- Acompanhar movimentos do mercado e evoluir o produto com base em feedback real dos usuários
- Aceitar o risco no contexto do MVP: o objetivo nesta fase é validar o produto, não dominar o mercado

---

#### R16 — Custo de infraestrutura acima do previsto
| Atributo | Valor |
|----------|-------|
| Probabilidade | Baixa |
| Impacto | Médio |
| Exposição | 🟢 Baixo |
| Estratégia | Aceitar |

**Descrição:** Variações cambiais, reajuste de preços da VPS ou necessidade de upgrade de infraestrutura antes do previsto podem elevar os custos operacionais acima dos R$272 estimados para os primeiros 6 meses.

**Plano de resposta:**
- Revisar custos mensalmente e manter reserva de contingência equivalente a 1 mês de infraestrutura
- Aceitar o risco dado que o TCO é extremamente baixo e o impacto de variações é absorvível com poucos lojistas ativos

---

### 2.5 Riscos de Equipe e Cronograma

#### R17 — Atraso no desenvolvimento por indisponibilidade de membros
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Médio |
| Exposição | 🟡 Moderado |
| Estratégia | Mitigar |

**Descrição:** O projeto é desenvolvido por uma equipe acadêmica de 5 pessoas com outras obrigações (outras disciplinas, trabalho, vida pessoal). A indisponibilidade temporária de um ou mais membros pode comprometer o cronograma de 8 semanas.

**Plano de resposta:**
- Definir responsabilidades individuais claras desde o início (ownership por módulo)
- Utilizar ferramenta de gestão de tarefas visível para toda a equipe
- Priorizar as funcionalidades críticas do MVP nas primeiras semanas — funcionalidades secundárias ficam para o backlog
- Manter documentação mínima do código para facilitar a continuidade por outros membros

---

#### R18 — Curva de aprendizado em tecnologias parcialmente novas
| Atributo | Valor |
|----------|-------|
| Probabilidade | Média |
| Impacto | Baixo |
| Exposição | 🟢 Baixo |
| Estratégia | Aceitar / Mitigar |

**Descrição:** Embora o time possua familiaridade com a stack principal, nuances de algumas ferramentas — como configurações avançadas do Supabase (RLS, Storage), TurboRepo ou deploy em VPS — podem gerar pequenos atrasos pontuais.

**Plano de resposta:**
- Reservar tempo de spike técnico na Fase 1 para experimentação e aprendizado das ferramentas menos conhecidas
- Utilizar documentação oficial e comunidades ativas de cada tecnologia
- Aceitar o risco: a stack foi escolhida exatamente por ser familiar à equipe, minimizando este vetor

---

## 3. Resumo executivo dos riscos

| ID | Risco | Probabilidade | Impacto | Exposição |
|----|-------|--------------|---------|-----------|
| R01 | Desatualização do catálogo pelo lojista | Alta | Alto | 🔴 Crítico |
| R02 | Baixa adoção inicial pelos lojistas | Média | Alto | 🟠 Elevado |
| R10 | Lojista anônimo — responsabilidade CDC | Média | Alto | 🟠 Elevado |
| R11 | Não conformidade com a LGPD | Média | Alto | 🟠 Elevado |
| R14 | Inadimplência ou churn elevado | Média | Alto | 🟠 Elevado |
| R05 | Integração incompleta frontend–backend | Média | Médio | 🟡 Moderado |
| R03 | Dificuldade de uso do painel admin | Média | Médio | 🟡 Moderado |
| R04 | Sobrecarga de mensagens no WhatsApp | Média | Médio | 🟡 Moderado |
| R08 | Vazamento ou perda de dados | Baixa | Alto | 🟡 Moderado |
| R09 | Indisponibilidade do Supabase | Baixa | Alto | 🟡 Moderado |
| R12 | Ausência de logs (Marco Civil) | Média | Médio | 🟡 Moderado |
| R15 | Surgimento de concorrentes | Média | Médio | 🟡 Moderado |
| R17 | Atraso por indisponibilidade da equipe | Média | Médio | 🟡 Moderado |
| R06 | Falhas na infraestrutura inicial | Baixa | Médio | 🟢 Baixo |
| R07 | Escalabilidade limitada no MVP | Baixa | Médio | 🟢 Baixo |
| R13 | Uso indevido para produtos proibidos | Baixa | Médio | 🟢 Baixo |
| R16 | Custo de infraestrutura acima do previsto | Baixa | Médio | 🟢 Baixo |
| R18 | Curva de aprendizado técnico | Média | Baixo | 🟢 Baixo |

---

## 4. Ações prioritárias por fase do Roadmap

### Fase 1 — Pré-desenvolvimento (sem. 1)
- [ ] Habilitar RLS no Supabase e configurar permissões por tabela **(R08)**
- [ ] Redigir Termos de Uso e Política de Privacidade **(R10, R11, R13)**
- [ ] Configurar `.gitignore` para variáveis de ambiente e chaves de API **(R08)**

### Fase 2 — Core MVP (sem. 2)
- [ ] Implementar trava de cadastro obrigatório de dados CDC antes da publicação **(R10)**
- [ ] Implementar checkbox de aceite LGPD no primeiro acesso **(R11)**
- [ ] Aplicar validação e sanitização de inputs no backend **(R08)**
- [ ] Definir e documentar contrato da API antes do desenvolvimento paralelo **(R05)**

### Fase 3 — Legal, infra e validação (sem. 3-4)
- [ ] Configurar middleware de logging com retenção de 6 meses **(R12)**
- [ ] Criar canal do titular (`privacidade@pedeaqui.store`) **(R11)**
- [ ] Executar testes de integração nos fluxos críticos **(R05)**
- [ ] Definir thresholds de monitoramento de infraestrutura **(R07, R09)**

### Fase 4 — Pós-lançamento (sem. 5)
- [ ] Monitorar churn e engajamento dos lojistas **(R14)**
- [ ] Coletar feedback ativo dos primeiros usuários **(R02, R03)**
- [ ] Revisar conformidade do fluxo `wa.me` com políticas da Meta **(R13)**
- [ ] Avaliar upgrade de infraestrutura conforme crescimento **(R07)**

---

*Documento vivo — deve ser revisado a cada entrega de fase e sempre que novos riscos forem identificados.*
