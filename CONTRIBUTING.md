# Como contribuir com o PedeAqui

Obrigado por contribuir com o PedeAqui. Este documento apresenta o processo oficial para planejar, implementar, revisar e integrar alterações no projeto.

As regras em [`docs/team/`](docs/team/) são **obrigatórias** para todas as pessoas contribuidoras. Este guia consolida o fluxo principal, mas não substitui os documentos normativos do time. Antes de iniciar um trabalho, consulte as diretrizes específicas relacionadas ao tipo de contribuição.

## Documentos obrigatórios do time

| Documento | Responsabilidade |
|---|---|
| [Workflow do time](docs/team/workflow.md) | Define o fluxo entre issues, branches, implementação, revisão e merge. |
| [Guia de issues](docs/team/issue-guidelines.md) | Define quando e como registrar tarefas, bugs, melhorias e decisões. |
| [Guia de branches](docs/team/branch-name-guidelines.md) | Define nomes, prefixos e escopo das branches de trabalho. |
| [Guia de commits](docs/team/commit-message-guidelines.md) | Define o padrão obrigatório das mensagens de commit. |
| [Guia de Pull Requests e Code Review](docs/team/code-review-guidelines.md) | Define abertura, revisão, aprovação e merge de Pull Requests. |
| [Guia de milestones](docs/team/milestone-guidelines.md) | Define a organização das entregas e a responsabilidade do Scrum Master. |

Em caso de dúvida ou aparente conflito entre regras, não presuma uma exceção: registre a dúvida e alinhe com o Scrum Master ou com a pessoa responsável antes de prosseguir.

## Princípios de contribuição

Toda contribuição deve:

- possuir objetivo e escopo claros;
- respeitar requisitos, regras de negócio, arquitetura e decisões já documentadas;
- manter frontend e backend dentro das respectivas responsabilidades arquiteturais;
- evitar alterações sem relação entre si no mesmo Pull Request;
- incluir ou atualizar testes quando necessário;
- atualizar a documentação afetada;
- preservar segurança, privacidade, isolamento multi-tenant e integridade dos dados;
- ser rastreável por meio de issue, milestone, branch, commits e Pull Request, conforme aplicável.

Alterações grandes devem ser divididas em entregas menores, coesas e revisáveis. Mudanças de escopo precisam ser comunicadas ao time.

## Fluxo oficial de trabalho

O fluxo padrão é:

```text
Issue planejada
    ↓
Milestone correspondente
    ↓
Branch criada a partir de development atualizada
    ↓
Implementação, testes e documentação
    ↓
Pull Request para development
    ↓
Revisão e aprovação
    ↓
Merge realizado pelo autor do PR
    ↓
Validação em development
    ↓
Pull Request autorizado de development para main
```

A branch `main` representa a versão estável do projeto. Alterações de trabalho não devem ser enviadas diretamente para ela. A branch `development` é o ambiente de integração e validação das entregas antes da promoção para `main`.

## 1. Registre e planeje o trabalho

Crie uma issue para:

- novas funcionalidades;
- correções de bugs;
- alterações de documentação;
- configuração, infraestrutura ou manutenção;
- discussões técnicas que exijam decisão;
- ajustes em requisitos, casos de uso, histórias de usuário ou regras de negócio;
- atividades pertencentes a uma milestone.

O título deve ser claro e objetivo. Não use títulos genéricos como `ajustes`, `bug`, `tarefa` ou `ver isso`.

Use a seguinte estrutura:

```md
## Objetivo

Descrever o que precisa ser feito.

## Contexto

Explicar por que essa tarefa existe.

## Critérios de aceite

- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

## Observações

Adicionar links, decisões, arquivos relacionados ou dependências.
```

Ao criar a issue:

- defina o responsável em `Assignees`, quando já conhecido;
- aplique labels coerentes de tipo (`feature`, `fix`, `docs`, `chore`, `refactor` ou `test`) e área (`frontend` ou `backend`);
- associe a milestone correspondente quando a tarefa fizer parte de uma entrega planejada;
- divida a issue caso seu escopo seja grande demais para acompanhamento e conclusão objetivos.

A criação e a manutenção de milestones são responsabilidade do **Scrum Master**. O padrão de nome é `M<número> - Nome da Entrega`, e cada issue ou PR deve estar associado a apenas uma milestone por vez.

## 2. Prepare a branch

Atualize `development` e crie a branch de trabalho a partir dela:

```bash
git switch development
git pull
git switch -c tipo/nome-da-alteracao
```

O padrão obrigatório é:

```text
tipo/nome-da-funcionalidade
```

Prefixos permitidos:

| Prefixo | Uso |
|---|---|
| `feature/` | Nova funcionalidade. |
| `fix/` | Correção de bug. |
| `docs/` | Documentação. |
| `refactor/` | Refatoração sem mudança intencional de comportamento. |
| `chore/` | Configuração, manutenção ou tarefa interna. |
| `test/` | Criação ou ajuste de testes. |

Use letras minúsculas, hífens entre palavras e nomes objetivos, sem espaços, acentos ou caracteres especiais.

Exemplos:

```text
feature/cadastro-produtos
fix/validacao-cpf-cnpj
docs/guia-contribuicao
test/login-lojista
```

## 3. Configure o ambiente

As instruções de instalação, variáveis de ambiente e execução local estão no [README](README.md#-executando-localmente).

Nunca envie ao repositório:

- arquivos `.env`;
- tokens, senhas ou chaves de API;
- credenciais de banco de dados;
- dados pessoais ou dados reais de usuários;
- arquivos gerados, caches ou dependências que não devam ser versionados.

Antes de modificar uma aplicação, leia também suas regras locais:

- [Regras do frontend](app/frontend/AGENTS.md)
- [Regras do backend](app/backend/AGENTS.md)

Esses documentos contêm restrições arquiteturais, critérios de teste e fluxos específicos de cada área.

## 4. Implemente com escopo controlado

Durante a implementação:

- trabalhe somente no escopo definido pela issue;
- não misture funcionalidade, refatoração e documentação sem necessidade técnica;
- reutilize padrões e abstrações existentes;
- não altere contratos entre frontend e backend sem alinhamento;
- trate autenticação, autorização, dados, pagamentos e infraestrutura como áreas sensíveis;
- revise requisitos e decisões arquiteturais antes de alterar comportamentos documentados;
- registre decisões relevantes no local apropriado.

A documentação deve ser atualizada quando houver mudanças em requisitos, casos de uso, histórias de usuário, fluxos, regras de negócio, arquitetura, stack, integrações externas ou processos do time.

## 5. Valide a alteração

Execute as verificações proporcionais à área modificada antes de abrir o Pull Request.

### Frontend

```bash
cd app/frontend
npm run lint
npm run build
```

Além dos comandos automatizados, valide os fluxos afetados, responsividade, acessibilidade e estados de carregamento, vazio e erro quando aplicáveis.

### Backend

```bash
cd app/backend
npm run build
npm test
npm run test:coverage
```

Testes de integração dependem do Supabase local configurado:

```bash
npm run test:integration
```

Respeite os critérios adicionais e as regras de cobertura definidos em [app/backend/AGENTS.md](app/backend/AGENTS.md). Se alguma validação não puder ser executada, explique o motivo e o impacto na descrição do Pull Request.

## 6. Faça commits rastreáveis

O formato obrigatório é:

```text
tipo: descrição objetiva da alteração
```

Tipos permitidos: `feat`, `fix`, `docs`, `chore`, `refactor` e `test`.

As mensagens devem ser escritas em português (pt-BR), ser objetivas e usar verbo no passado ou particípio.

Exemplos:

```text
feat: adicionado fluxo de cadastro de loja
fix: corrigida validação de CPF no cadastro
docs: adicionado guia de contribuição
test: adicionados testes para login do lojista
```

Evite commits genéricos, grandes demais ou compostos por alterações sem relação entre si.

## 7. Abra o Pull Request

Branches de trabalho devem abrir Pull Request para `development`. Apenas a promoção de uma versão validada deve seguir de `development` para `main`.

O título deve seguir:

```text
tipo(contexto): mensagem objetiva da alteração
```

Exemplo:

```text
feat(products): adiciona cadastro de produtos pelo lojista
```

Use a seguinte estrutura na descrição:

```md
## Objetivo

Descrever o objetivo do PR.

## Alterações realizadas

- Item 1
- Item 2
- Item 3

## Como validar

- Passo 1
- Passo 2
- Passo 3

## Issue relacionada

Closes #numero-da-issue

## Observações

Informar riscos, decisões, pendências ou pontos de atenção.
```

Antes de solicitar revisão:

- marque-se como responsável no campo `Assignees`;
- associe a mesma milestone da issue, quando aplicável;
- relacione a issue com `Closes`, `Fixes` ou `Resolves`;
- informe as áreas afetadas: documentação, frontend, backend, banco ou configuração;
- revise o próprio diff;
- confirme que branch e commits seguem os padrões;
- remova arquivos desnecessários;
- informe os testes e validações executados.

## 8. Revisão e aprovação

Todo Pull Request exige revisão efetiva:

- alterações comuns: no mínimo **2 pessoas revisoras**;
- alterações sensíveis ou complexas: no mínimo **4 pessoas revisoras**.

São sensíveis as mudanças em:

- arquitetura;
- banco de dados;
- autenticação ou autorização;
- pagamentos;
- deploy ou infraestrutura;
- regras de negócio críticas;
- documentos oficiais do projeto.

Comentários de revisão devem ser respeitosos, objetivos e acionáveis. Diferencie claramente bloqueios, sugestões e dúvidas. Um PR não deve ser aprovado enquanto houver comentários críticos pendentes, validações obrigatórias ausentes ou divergência relevante em relação ao escopo.

## 9. Merge e encerramento

O autor do Pull Request realiza o merge em `development` somente após:

- atingir a quantidade mínima de aprovações;
- resolver comentários críticos;
- responder ou tratar os apontamentos da revisão;
- confirmar as validações descritas no PR;
- garantir que a issue possa ser encerrada.

O merge de `development` para `main` deve ser realizado apenas pela pessoa responsável ou por alguém autorizado, depois que a versão estiver validada e estável.

Uma issue só deve ser fechada quando seus critérios de aceite estiverem atendidos, o PR aprovado estiver integrado e a documentação necessária estiver atualizada. Se perder a finalidade, a issue deve ser encerrada com justificativa clara.

## Checklist rápido da pessoa contribuidora

- [ ] Li as regras aplicáveis em `docs/team/`.
- [ ] O trabalho está descrito em uma issue adequada, quando aplicável.
- [ ] Issue e PR estão na milestone correta, quando planejados para uma entrega.
- [ ] Minha branch partiu de `development` atualizada e segue o padrão de nome.
- [ ] Mantive a alteração coesa e dentro do escopo.
- [ ] Respeitei as regras locais do frontend ou backend.
- [ ] Atualizei testes e documentação quando necessário.
- [ ] Executei e registrei as validações relevantes.
- [ ] Meus commits seguem o padrão obrigatório.
- [ ] Revisei meu próprio diff.
- [ ] O PR aponta para `development`, referencia a issue e segue o modelo do time.
- [ ] Solicitei a quantidade obrigatória de revisores.

Ao contribuir, você concorda em seguir este documento e todas as diretrizes oficiais mantidas em [`docs/team/`](docs/team/).
