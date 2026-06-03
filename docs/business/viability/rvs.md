**Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas  
**Disciplina:** Engenharia de Software  
**Período:** 2026.3  
**Professor:** Mayllon Veras  
**Alunos:** Francisco Mailson, Francisco de Cássio, Mateus de Araujo, Rikelry Monteiro, Vitor Lopes  
**Time:** Cloud Hive  
**Report:** I  
# Atividade Prática: Relatório de Viabilidade de Software
# (RVS)

## 1. Viabilidade técnica (Technical)

O sistema proposto é caracterizado por uma aplicação web de baixa complexidade arquitetural, composta essencialmente por um catálogo de produtos e redirecionamento do cliente para atendimento via **WhatsApp**. O formato dessa aplicação nos permite adotar uma
stack moderna, estável e que o time já possui um certo nível de domínio. Obviamente, ainda
existem nuances a serem tratadas em relação a alguns dos frameworks utilizados e,
possivelmente, novas ferramentas que poderão surgir à medida que o time desenvolve o
projeto.

Obs: este documento não é imutável, á medida que a organização do projeto acontece os artefatos tendem a mudar.

### Frontend
O frontend será desenvolvido inteiramente utilizando:

* React
* Tailwind CSS
* Vite
* Linguagem: Typescript
* Fetch API nativa (Comunicação)

A escolha dessas tecnologias está diretamente ligada à familiaridade que o time possui
com elas. Além disso, reduz a complexidade de utilizar frameworks e outras ferramentas com as quais não estamos acostumados. O uso exclusivo desses recursos garante estabilidade, reduz a dependência de bibliotecas externas e diminui a complexidade do projeto, principalmente por conta da utilização de uma API nativa para realizar a comunicação entre frontend e backend.

O Vite contribui para um ambiente de desenvolvimento rápido e eficiente, enquanto o
Tailwind CSS permite a construção ágil de interfaces modernas e adaptáveis a diferentes
dispositivos, o que facilita o trabalho da equipe.


### Backend
O backend será desenvolvido utilizando essas tecnologias:

* Node.js
* Express
* Supabase(PostgreSQL)
* Linguagem: Typescript

A utilização do Node.js permite a padronização da linguagem entre frontend e backend, reduzindo a curva de aprendizado e facilitando a manutenção do código. O Express oferece uma estrutura simples e eficiente para a criação das rotas da API e organização dos serviços da aplicação.

O Supabase foi adotado como solução Backend as a Service (BaaS), fornecendo integração com banco de dados PostgreSQL, autenticação e recursos de backend gerenciados, reduzindo significativamente a complexidade de infraestrutura e acelerando o desenvolvimento do sistema. O PostgreSQL foi escolhido por ser um banco de dados relacional robusto, confiável e amplamente utilizado em aplicações web modernas. Além disso, a equipe já possui familiaridade com esse SGBD por meio das disciplinas de Banco de Dados, o que reduz riscos técnicos e facilita a manutenção futura do projeto.


### Integração com serviços externos (Whatsapp)
A integração com o WhatsApp não utiliza APIs externas. No contexto do redirecionamento do cliente, será utilizado um encurtador de URL oficial do WhatsApp chamado `wa.me`. Essa abordagem elimina riscos relacionados à autenticação, custos de API, limitações de uso ou bloqueios por políticas de terceiros.
### Adequação da tecnologia ao problema
As tecnologias escolhidas são maduras, bem documentadas e adequadas ao porte do sistema, que não exige processamento intensivo, autenticação complexa ou integrações críticas. A arquitetura proposta (CRUD de produtos + catálogo digital) é simples, o que reduz significativamente os riscos técnicos.
### Conclusão da viabilidade tecnológica
Diante da escolha de tecnologias consolidadas, da baixa dependência de serviços externos e da simplicidade arquitetural, conclui-se que o projeto apresenta alta viabilidade técnica e baixo risco de implementação. O stack atual é mais do que suficiente para o desenvolvimento completo do sistema, principalmente por utilizarmos ferramentas modernas e amplamente utilizadas no mercado.


## 2. Viabilidade Econômica (Economic)

O projeto apresenta alta viabilidade econômica, principalmente por operar com uma infraestrutura enxuta, baixo custo operacional e utilização predominante de tecnologias gratuitas e open source.

O sistema **PedeAqui** caracteriza-se como uma vitrine virtual SaaS, cuja principal função é permitir que lojistas exponham seus produtos e redirecionem clientes para atendimento via WhatsApp. Essa proposta reduz significativamente a complexidade do sistema, eliminando a necessidade de serviços como gateways de pagamento, sistemas avançados de logística, geolocalização em tempo real ou infraestrutura robusta de processamento.

A arquitetura do projeto será organizada em formato de monorepositório utilizando **TurboRepo**, permitindo a separação das aplicações em frontend e backend dentro de uma única estrutura de desenvolvimento. Essa abordagem melhora a organização do código, facilita a manutenção e otimiza o fluxo de desenvolvimento da equipe.

O frontend será hospedado separadamente em uma plataforma especializada para aplicações web modernas, enquanto o backend será hospedado em uma VPS dedicada, reduzindo custos e permitindo melhor controle da infraestrutura da API. Atualmente, estima-se um custo aproximado de **R$44/mês** para hospedagem do backend em VPS. O domínio **pedeaqui.store** possui custo aproximado de **R$8 por 1 ano**, representando um investimento extremamente baixo para operação inicial do sistema.

No desenvolvimento serão utilizadas apenas tecnologias gratuitas e amplamente dominadas pela equipe, como React, Tailwind CSS, Vite, Node.js, Express, TypeScript e Supabase, eliminando custos com licenças de software ou ferramentas proprietárias. Além disso, a integração com o WhatsApp ocorre apenas por redirecionamento via `wa.me`, não gerando custos relacionados a APIs pagas ou envio automatizado de mensagens.

O modelo SaaS do sistema foi planejado com foco em acessibilidade para pequenos empreendedores. A assinatura mensal prevista será de **R$29,99 por lojista**, oferecendo baixo custo de entrada e potencial de escalabilidade para o negócio.


### 2.1 Custo estimado

| ITEM                            | VALOR           |
| ------------------------------- | --------------- |
| VPS Backend (R$44/mês)          | R$264 (6 meses) |
| Domínio `pedeaqui.store`        | R$8 (1 ano)     |
| Tecnologias (React, Node, etc.) | R$0             |
| APIs externas                   | R$0             |
| Hospedagem Frontend             | R$0*            |
| Total Infraestrutura Inicial    | R$272           |

> * O frontend será hospedado inicialmente em plataforma gratuita compatível com aplicações frontend modernas.

Não há custos com:

* APIs pagas;
* serviços de geolocalização;
* gateways de pagamento;
* infraestrutura avançada em nuvem;
* licenças de software;
* ferramentas proprietárias.

A infraestrutura do sistema foi planejada para manter o menor custo operacional possível durante a fase inicial do projeto, permitindo escalabilidade gradual conforme o crescimento da base de lojistas.


### 2.2 Benefícios gerados pelo sistema

O sistema entrega valor tanto para os lojistas quanto para o próprio modelo de negócio SaaS da plataforma **PedeAqui**.

#### Para o lojista (cliente do SaaS)

* Presença digital profissional sem necessidade de desenvolver um e-commerce completo;
* Organização centralizada do catálogo de produtos;
* Facilidade de atualização de produtos, imagens e preços;
* Redução do tempo gasto no atendimento inicial via WhatsApp;
* Melhor experiência para o cliente durante a visualização dos produtos;
* Maior visibilidade digital para pequenos empreendedores;
* Baixo custo mensal de utilização da plataforma;
* Facilidade de acesso e gerenciamento do catálogo.

#### Para o negócio PedeAqui (SaaS)

* Receita recorrente baseada em assinaturas mensais;
* Baixo custo operacional e de infraestrutura;
* Arquitetura escalável para crescimento gradual da plataforma;
* Modelo SaaS acessível para pequenos empreendedores;
* Facilidade de manutenção devido à simplicidade arquitetural do sistema;
* Potencial de crescimento com baixo investimento inicial.

O modelo de negócio foi projetado para oferecer uma solução acessível aos lojistas, com assinatura mensal prevista de **R$29,99**, mantendo baixo custo de entrada e viabilidade financeira tanto para os clientes quanto para a plataforma.

O sistema gera retorno financeiro por meio das assinaturas SaaS e, ao mesmo tempo, proporciona organização, praticidade e presença digital para os lojistas cadastrados.

### 2.3 TCO Simplificado — 6 Primeiros Meses

O TCO (Total Cost of Ownership) representa o custo total necessário para manter a operação inicial da plataforma durante os primeiros meses de funcionamento.

Como o projeto ainda se encontra em fase de desenvolvimento acadêmico e validação de produto, não há custo formal de contratação de software, desenvolvimento terceirizado ou equipe remunerada. Dessa forma, o TCO inicial considera apenas os custos reais de infraestrutura e operação da plataforma.

#### Custo de Infraestrutura (6 meses)

| ITEM                      | VALOR |
| ------------------------- | ----- |
| VPS Backend               | R$264 |
| Domínio `pedeaqui.store`  | R$8   |
| Hospedagem Frontend       | R$0   |
| Tecnologias e Ferramentas | R$0   |

**Total estimado em 6 meses**

➔ **R$272**

### 2.4 Análise do Retorno Dentro do TCO

Com o modelo SaaS previsto de **R$29,99/mês por lojista**, o retorno financeiro estimado para os primeiros 6 meses é:

| LOJISTAS | RECEITA EM 6 MESES |
| -------- | ------------------ |
| 10       | R$1.799,40         |
| 20       | R$3.598,80         |
| 30       | R$5.398,20         |

Mesmo com uma pequena quantidade inicial de clientes, o projeto já consegue cobrir integralmente os custos operacionais estimados para os primeiros meses de funcionamento.

### Conclusão da Viabilidade Econômica

O sistema apresenta custo operacional extremamente baixo, principalmente devido à utilização de tecnologias gratuitas, infraestrutura enxuta e arquitetura simplificada.

O modelo SaaS adotado permite escalabilidade gradual com investimento inicial reduzido, tornando o projeto economicamente viável mesmo durante sua fase inicial de validação.

Dessa forma, o projeto demonstra:

* Baixo custo operacional;
* Potencial de crescimento sustentável;
* Facilidade de manutenção da infraestrutura;
* Modelo de negócio acessível para pequenos empreendedores;
* Excelente viabilidade econômica para um MVP SaaS.

## 3. Viabilidade Legal (Legal)

Relatório de Viabilidade Legal: Vitrine Virtual “PedeAqui” SaaS

### 1. LGPD (Lei 13.709/2018)

**a) Análise de Conformidade:** O modelo de "coleta mínima" facilita a conformidade. Para
compradores não cadastrados, a base legal é **Execução de Contrato ou Procedimentos
Preliminares** (Art. 7º, V). Para compradores cadastrados, aplica-se o **Consentimento** (Art. 7º, I) ou **Legítimo Interesse** (Art. 7º, IX) para facilitar futuras compras.

**b) Riscos: Médio**. O risco reside na possível confusão de papéis entre a plataforma e o lojista.

**c) Recomendações:** * Implementar um _Check-box_ de aceite dos termos no primeiro pedido.
Estabelecer que a plataforma é **Operadora** e o Lojista é **Controlador** dos dados dos clientes finais.

**d) Normas:** Art. 5º, 7º e 15º da LGPD.


### 2. Marco Civil da Internet (Lei 12.965/2014)

**a) Análise de Conformidade:** A plataforma é um "Provedor de Aplicação". O projeto deve,
obrigatoriamente, registrar logs de acesso (IP, data e hora) de todos os usuários (administradores e
compradores).

**b) Riscos: Médio**. A ausência de logs impede a identificação de fraudadores ou usuários
mal-intencionados, gerando responsabilidade para a plataforma.

**c) Recomendações:** Manter logs de conexão por 6 meses em ambiente seguro e sigiloso.

**d) Normas:** Art. 15º do Marco Civil da Internet.
### 3. CDC (Lei 8.078/90) e Decreto do E-commerce (7.962/13)

**a) Análise de Conformidade:** Mesmo sendo apenas uma vitrine, o Decreto exige que as informações do fornecedor (Lojista) sejam claras. Como a plataforma é o "meio", ela deve forçar o lojista a exibir CNPJ/CPF e endereço.

**b) Riscos: Alto**. Se o lojista for anônimo, a plataforma pode ser responsabilizada solidariamente por danos ao consumidor (Teoria da Aparência).

**c) Recomendações:** Tornar obrigatório o preenchimento dos dados do lojista (Rodapé da vitrine) antes da publicação do catálogo.

**d) Normas:** Art. 2º do Decreto 7.962/2013; Art. 14 e 18 do CDC.
### 4. Uso da API do WhatsApp Business

**a) Análise de Conformidade:** O redirecionamento via link wa.me é uma prática padrão. Contudo, o conteúdo da mensagem pré-preenchida não deve violar as Políticas Comerciais da Meta (ex: venda de armas, medicamentos controlados).

**b) Riscos: Baixo**. O risco de banimento recai sobre o lojista, mas a plataforma deve alertar sobre as boas práticas.

**c) Recomendações:** Incluir nos Termos de Uso a proibição de uso da plataforma para produtos proibidos pelo WhatsApp.

**d) Normas:** Políticas de Mensagens Comerciais do WhatsApp.
### 6. Modelo SaaS e Responsabilidades Contratuais

**a) Análise de Conformidade:** É fundamental separar a responsabilidade do software
(disponibilidade, segurança) da responsabilidade do negócio (entrega do produto, qualidade).

**b) Riscos: Médio.** Risco de ser processado por falha na entrega do lojista.

**c) Recomendações:** Cláusula de **Exclusão de Responsabilidade por Transações Intermediadas**. Como o pagamento é externo, a plataforma deve declarar-se apenas como ferramenta tecnológica de anúncio.
 
**d) Normas:** Art. 18 e 19 do Marco Civil (Responsabilidade de Terceiros).
### Quadro-Resumo de Riscos
| Área        | Nível de Risco | Principal Causa           | Medida de Mitigação                         |
| ----------- | -------------- | ------------------------- | ------------------------------------------- |
| Consumidor  | Alto           | Anonimato do lojista      | Obrigatoriedade de dados de identificação   |
| Privacidade | Alto           | Geolocalização            | Consentimento explícito e descarte imediato |
| Dados       | Médio          | Definição de papéis LGPD  | Contrato de Operador vs Controlador         |
| Operacional | Baixo          | Redirecionamento WhatsApp | Termos de uso alinhados com a Meta          |

### Roadmap de Adequação Legal
### Fase 1: Pré-Lançamento (Prioridade Crítica)

1. **Redação dos Termos de Uso:** Focar na isenção de responsabilidade sobre a venda e entrega.
2. **Política de Privacidade:** Detalhar a finalidade da geolocalização e o fluxo de dados para o WhatsApp.
3. **Trava de Cadastro:** Impedir que o lojista publique a vitrine sem preencher os dados obrigatórios do CDC.
### Fase 2: Pós-Lançamento (Ajustes de Operação)

1. **Gestão de Logs:** Configurar a retenção automática de logs de acesso conforme o Marco Civil.
2. **Canal do Titular:** Criar um e-mail simples (ex: privacidade@vitrine.com) para atender solicitações de exclusão de dados.
### Fase 3: Escalonamento (Governança)

1. **Auditoria de APIs:** Revisar periodicamente se o fluxo do WhatsApp continua em conformidade com as atualizações da Meta.
2. **Relatório de Impacto (RIPD):** Caso a base de dados de geolocalização cresça, elaborar o Relatório de Impacto à Proteção de Dados Pessoais.

## 4. Viabilidade Operacional (Operational)

A viabilidade operacional avalia se um sistema pode ser efetivamente utilizado em seu contexto real, considerando facilidade de adoção, adequação aos processos existentes e impacto prático no dia a dia dos usuários. No projeto de um site para conectar clientes e empreendedores, o sucesso depende principalmente da usabilidade, aceitação e eficiência operacional.

O sistema proposto apresenta boa viabilidade operacional por ter sido concebido para atender a uma necessidade real de pequenos e médios empreendedores: divulgar produtos de forma organizada e atrativa, sem exigir um e-commerce completo. Como vitrine virtual, permite cadastro simples de produtos (nome, imagem, descrição, preço), reduzindo a sobrecarga operacional.

Para o cliente, o fluxo é direto: acessa o site, visualiza produtos, seleciona itens e é redirecionado ao WhatsApp do empreendedor. Esse modelo aproveita ferramentas já difundidas, diminuindo barreiras de uso. O sistema não substitui o atendimento humano, mas o organiza e potencializa.

A integração com o WhatsApp evita mudanças radicais de comportamento, favorecendo a
adoção. O empreendedor continua responsável pela negociação e fechamento da venda; o site atua como catálogo.

A simplicidade da interface é essencial: navegação objetiva, elementos claros, poucas etapas. Quanto mais direto, maior a eficiência operacional.

Para o empreendedor, o painel de administração deve ser simples, permitindo atualização de produtos sem conhecimento técnico. Caso contrário, o sistema perde utilidade prática.

Principais limitações:

* Dependência de o empreendedor manter os produtos atualizados.
* Necessidade de conexão estável com a internet.

Apesar disso, os benefícios superam os desafios: melhora a organização da oferta, facilita o
contato, amplia a visibilidade do negócio e complementa o atendimento humano, sem substituí-lo.

## 5. Viabilidade de Cronograma (Schedule)

A viabilidade de cronograma avalia se o sistema pode ser desenvolvido dentro do prazo previsto, considerando o escopo atual do projeto, sua complexidade técnica e a disponibilidade da equipe.

No contexto do sistema PedeAqui, estima-se um prazo de desenvolvimento de **2 meses** para a entrega do MVP funcional, compatível com o calendário acadêmico.

Essa estimativa mostra-se altamente viável devido à **redução significativa do escopo do sistema**. A aplicação consiste exclusivamente em:

* Cadastro e gerenciamento de produtos pelo lojista;
* Exibição do catálogo ao cliente;
* Exibição obrigatória dos dados do lojista (exigência legal);
* Redirecionamento do cliente para o WhatsApp via link wa.me.

O sistema **não possui mais** :

* Cálculo de frete;
* Geolocalização;
* Integrações com APIs externas;
* Processamento de pagamentos;
* Funcionalidades de alta complexidade.

Essa simplificação reduz drasticamente o esforço de desenvolvimento e os riscos técnicos.

Outro fator determinante é a familiaridade da equipe com as tecnologias adotadas (React, Node.js, PostgreSQL, Prisma e Tailwind CSS), o que reduz a curva de aprendizado e aumenta a produtividade.

### Funcionalidades críticas do MVP

Para garantir a entrega dentro do prazo, o foco inicial será:

1. Sistema de cadastro e login do lojista (SaaS);
2. Painel administrativo simples para cadastro de produtos;
3. Página pública do catálogo;
4. Exibição obrigatória das informações do lojista no rodapé;
5. Botão de redirecionamento para o WhatsApp.

Funcionalidades estéticas e melhorias secundárias poderão ser implementadas após o MVP.

### Análise de Risco no Cronograma

Com a remoção das partes mais complexas do sistema, os principais riscos deixam de ser técnicos e passam a ser apenas organizacionais (divisão de tarefas, testes e ajustes finais).

Não há dependência de serviços externos, APIs pagas ou configurações complexas de infraestrutura, o que torna o cronograma ainda mais seguro.

### Conclusão da Viabilidade de Cronograma

Considerando o escopo atual, a baixa complexidade do sistema, a experiência prévia da equipe com as tecnologias adotadas e a priorização clara das funcionalidades essenciais do MVP, conclui-se que o projeto apresenta **altíssima viabilidade de cronograma**.

O prazo de 2 meses não apenas é suficiente, como apresenta margem de segurança para testes, ajustes e refinamentos antes da entrega final.


## 6. Matriz de Riscos

| RISCO                                                           | PROBABILIDADE | IMPACTO | DESCRIÇÃO                                                                                                                                                                         |
| --------------------------------------------------------------- | ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desatualização do catálogo de produtos pelo empreendedor        | Alta          | Alto    | O sistema depende totalmente de o empreendedor manter os produtos, preços e imagens atualizados. Caso isso não ocorra, o catálogo perde credibilidade e utilidade para o cliente. |
| Dependência do WhatsApp (wa.me) para o fluxo de atendimento     | Médio         | Médio   | O fluxo principal do sistema depende do redirecionamento para o WhatsApp. Mudanças na política do serviço, bloqueios ou instabilidades podem afetar a comunicação com o cliente.  |
| Dificuldade do empreendedor em utilizar o painel administrativo | Média         | Médio   | Caso o painel não seja extremamente simples e intuitivo, o empreendedor pode ter dificuldade em cadastrar ou atualizar produtos, comprometendo a operação do sistema.             |
| Sobrecarga de atendimentos no whatsapp do empreendedor          | Média         | Alto    | O aumento da visibilidade pode gerar um volume de mensagens maior do que o empreendedor consegue atender, causando demora nas respostas e experiência negativa para o cliente.    |