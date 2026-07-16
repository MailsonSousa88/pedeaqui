# 0008 - Orquestração do Monorepositório com Turborepo

## Status

Accepted

## Contexto

O PedeAqui mantém duas aplicações Node.js independentes no mesmo repositório:

- `app/frontend`, com React, Vite e proxy local de `/api` para `http://localhost:3000`;
- `app/backend`, com Express e Supabase.

O PRD já define essa estrutura como monorepositório, e o estudo de viabilidade prevê o uso de Turborepo. Entretanto, os comandos ainda precisam ser executados separadamente em cada aplicação, sem uma entrada comum para desenvolvimento, build e validações.

A adoção deve preservar os scripts locais atuais. Em especial, o Turborepo não deve substituir o servidor do Vite, alterar sua porta nem interferir no proxy utilizado pelo frontend.

## Decisão

Adotar Turborepo na raiz do repositório, usando npm workspaces para descobrir `app/frontend` e `app/backend`.

A raiz passa a conter:

- `package.json` privado com os workspaces e scripts de orquestração;
- `package-lock.json` para fixar a versão local do Turbo;
- `turbo.json` com as tarefas compartilhadas;
- cache local `.turbo` ignorado pelo Git.

Os scripts de cada aplicação continuam sendo a fonte de verdade. O Turbo apenas os executa no diretório correto:

```text
npm run dev
  -> app/backend: npm run dev
  -> app/frontend: npm run dev
```

O frontend continua usando o `vite.config.ts` existente. Assim, permanece em `http://localhost:5173` e encaminha `/api` para `http://localhost:3000` durante o desenvolvimento local.

As tarefas persistentes de desenvolvimento não usam cache. Testes também não usam cache porque podem depender do estado local do Supabase. Builds podem armazenar somente `dist/**`, considerando arquivos `.env*` e `VITE_API_URL` na invalidação do cache.

Não será configurado cache remoto nesta decisão. Nenhum segredo, arquivo `.env` ou credencial será incluído no repositório.

## Consequências

### Positivas

- Um único comando inicia frontend e backend.
- Builds e validações podem ser executados de forma coordenada.
- Os comandos locais existentes continuam disponíveis.
- O proxy do Vite e as portas atuais permanecem inalterados.
- A versão do Turbo fica fixada para todas as pessoas contribuidoras.
- A estrutura fica alinhada ao PRD e ao estudo de viabilidade.

### Negativas

- A raiz passa a ser também um projeto npm.
- O time precisa manter os scripts dos workspaces compatíveis com as tarefas do Turbo.
- Alterações de dependências exigem atenção ao lockfile da raiz e aos fluxos locais ainda existentes.

## Riscos

- Executar duas instâncias do backend ou do frontend e causar conflito de porta.
- Cachear testes dependentes de banco e obter resultados incorretos.
- Alterar o `vite.config.ts` sem necessidade e quebrar o proxy local.
- Adicionar variáveis sensíveis ao `turbo.json` ou ao repositório.

## Regras de Implementação

- O Turbo não substitui Vite, Express ou Supabase CLI.
- `dev` deve permanecer sem cache e como tarefa persistente.
- Testes de integração devem continuar dependendo do Supabase local preparado.
- O proxy `/api` do Vite não deve ser alterado por esta configuração.
- Scripts individuais dentro de `app/frontend` e `app/backend` devem continuar funcionando.
- Cache remoto só poderá ser adotado em decisão posterior, com política explícita de ambiente e segredos.
