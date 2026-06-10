# Instruções para Agentes de IA

Este arquivo define as restrições arquiteturais e fluxos de trabalho que devem ser respeitados ao gerar código ou modificar este repositório. O projeto é uma API REST orientada pela Clean Architecture que deve aplicar conceitos do SOLID.

## 1. Funcionamento do Sistema e Fluxos de Dados
- **Stack:** Node.js, Express, TypeScript, Jest, Supertest.
- **Infraestrutura de Dados e Auth:** Supabase.
- **Ciclo de Vida da Requisição:** `Route` -> `Middleware de Autenticação` -> `Controller` -> `Use Case` -> `Repository` -> `Supabase`.

## Visão Geral
Este projeto é uma API REST desenvolvida com foco em manutenibilidade, testabilidade e separação de responsabilidades, adotando os princípios da **Clean Architecture**. A infraestrutura de dados e identidade é gerenciada através do **Supabase**, responsável pelo banco de dados e pela autenticação.

## Padrão Arquitetural
A arquitetura foi desenhada para isolar as regras de negócio de detalhes de infraestrutura (como o framework web e o banco de dados). A comunicação entre as camadas ocorre sempre de fora para dentro, garantindo que o núcleo da aplicação (Models/Entities) não dependa de bibliotecas externas.

# Documentação de Arquitetura

### Camadas Principais

1. **Routes (Infraestrutura/Framework)**
   - Responsável por definir os endpoints da API REST.
   - Intercepta as requisições HTTP, aplica middlewares (como a verificação de token do Supabase) e direciona para o Controller correspondente.
   - *Regra:* Não deve conter nenhuma lógica de negócio.

2. **Controllers (Adaptadores de Interface)**
   - Atuam como intermediários entre o mundo externo (HTTP) e os casos de uso da aplicação.
   - Responsáveis por extrair dados da requisição (body, params, query), repassá-los para a camada de serviço/use cases e formatar a resposta HTTP (status code e payload).

3. **Use Cases / Services (Regras de Negócio da Aplicação)**
   - Contêm a lógica de negócio específica de cada operação (ex: "Criar Usuário", "Processar Pagamento").
   - Orquestram o fluxo de dados utilizando os Repositórios e os Models.
   - *Regra:* Não sabem se a requisição veio de uma API REST, CLI ou gRPC.

4. **Models / Entities (Regras de Negócio Corporativas)**
   - Representam os objetos de domínio fundamentais e suas regras intrínsecas (ex: validações de estado de uma entidade).
   - Livres de qualquer dependência externa ou de banco de dados.

5. **Repositories (Acesso a Dados)**
   - Interfaces que definem os contratos de acesso aos dados.
   - A implementação real interage com o cliente do **Supabase** para persistência e recuperação de informações no banco de dados.

## Estrutura de Diretórios

```text
src/
├── config/              # Configurações globais e variáveis de ambiente
├── infra/               
│   └── supabase/        # Inicialização do cliente Supabase e integrações
├── middlewares/         # Middlewares da API (ex: authMiddleware do Supabase)
├── models/              # Entidades de domínio e tipagens estruturais
├── repositories/        # Contratos (interfaces) e implementações de acesso a banco
├── useCases/            # Lógica de negócio da aplicação (Serviços)
├── controllers/         # Tratamento de requisições e respostas HTTP
├── routes/              # Definição de rotas da API REST
└── app.ts               # Ponto de entrada e configuração do servidor HTTP
```

## 2. Decisões de Design e Restrições Estruturais

- **Routes:** Apenas declaram endpoints e anexam middlewares. Proibido adicionar lógica condicional de negócios aqui.

- **Controllers (Adaptadores):** Extraem parâmetros do request (body, params), injetam nos Use Cases e formatam o HTTP Status e o payload de resposta. Não interagem de forma alguma com o banco de dados.

- **Use Cases (Lógica de Negócio):** Orquestram o núcleo da aplicação. Livres de dependências HTTP (Express) e do SDK do Supabase. Utilizam injeção de dependência para receber as interfaces dos Repositories.

- **Repositories:** A única camada autorizada a importar o `supabase-js` para queries. Recuperam os dados do banco e os mapeiam para as Entities/Models do domínio.

- **Models/Entities:** Tipagens e lógicas estruturais puras em TypeScript. Nenhuma dependência externa.

## 3. Fluxos de Trabalho e Gatilhos Obrigatórios

### 3.1 Fases de Desenvolvimento

O desenvolvimento é dividido em duas fases sequenciais. A fase ativa inicial é sempre a de exploração.

---

**FASE DE EXPLORAÇÃO**

Prioriza velocidade de entrega. Contratos de API e modelos de dados ainda podem mudar.

Regras:
- Testes unitários de Use Cases são **obrigatórios** a cada criação ou modificação
- Testes unitários de Controllers e Routes são **opcionais**
- Testes de integração e ponta a ponta são **proibidos** nesta fase (não gerar, não bloquear)

---

**FASE DE CONSOLIDAÇÃO**

Ativada apenas quando contratos de API e modelos de dados estiverem estabilizados.

Regras:
- Testes de integração ponta a ponta (supertest + banco isolado) são **obrigatórios**
- A cobertura de 95% nos Use Cases deve ser atingida antes de encerrar qualquer módulo
- Nenhuma rota ou Use Case pode ser entregue sem validação de integração completa

**Transição de fase:**
A mudança para consolidação exige comando explícito do usuário (`consolidar módulo` ou equivalente).
O agente deve **solicitar confirmação antes de alterar** `consolidacao_fase` e não prosseguir sem ela.

---

### 3.2 Gatilhos de Ação

**Gatilho: ADR obrigatório**
Antes de codificar qualquer implementação que:
- Adicione uma dependência pesada ao projeto
- Altere o fluxo de autenticação JWT do Supabase
- Viole o isolamento de camadas definido na arquitetura

O agente deve **parar**, criar um documento em `docs/adr/` com o cenário, a proposta de mudança e as alternativas consideradas, e aguardar aprovação humana.

---

**Gatilho: Testes unitários (Fase de Exploração)**
Para cada Use Case criado ou modificado, o teste unitário correspondente é gerado no mesmo ciclo.

Escopo do teste:
- Validar a lógica de aplicação do fluxo (sequência, condições, coordenação)
- Usar mocks para todos os Repositories (sem acesso real ao Supabase)
- Cobrir o caminho feliz e os casos de erro que alterariam o design

O teste **não** precisa cobrir todas as variações de input nesta fase.

---

**Gatilho: Testes de integração (Fase de Consolidação)**
Quando `consolidacao_fase = true`, cada rota estabilizada exige teste ponta a ponta com `supertest` e banco isolado, validando o contrato completo de request/response.

---

**Gatilho: Análise de regressão**
Antes de iniciar qualquer alteração, executar a suíte existente.
Se qualquer modificação causar falha em teste consolidado de Use Case:
1. Interromper geração de código imediatamente
2. Identificar a causa
3. Restabelecer o comportamento **ou** abrir ADR propondo a mudança intencional

Regressão em Use Case consolidado nunca é ignorada silenciosamente.

---

### 4. Métricas e Cobertura de Testes

| Camada | Métrica | Quando se aplica |
|---|---|---|
| Use Cases | 95% (Lines, Statements, Branches, Functions) | Inegociável — bloqueia entrega em qualquer fase |
| Global | 80% | Meta direcional — não bloqueia entrega na fase exploratória |

**Verificação obrigatória antes de encerrar qualquer tarefa:**
```bash
jest --coverage
```

O agente deve ler o relatório gerado, isolar os números da pasta de Use Cases e confirmar que a regra de 95% está sendo respeitada. Entregas que reduzam a cobertura atual de Use Cases são **rejeitadas automaticamente**.

## 5. Definição de Concluído ("Done")
- O código TypeScript compila sem erros.
- A regra de dependência de fora para dentro da Clean Architecture foi mantida intacta.
- Os testes unitários das regras de negócio passam com sucesso.
- Teste de integração de feature completas
- 

