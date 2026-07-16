# Plan: Lista de Lojas

## Resumo Técnico

Implementar, em fase futura, a tela frontend da Lista de Lojas em React e TypeScript, dentro do domínio `store`. A feature exibirá uma coleção local de lojas, permitirá pesquisa progressiva por prefixo do nome e exporá a intenção de seleção da loja sem implementar a futura vitrine pública ou qualquer navegação definitiva.

A composição seguirá a referência `specs/store-list/assets/tela-lista-lojas.png`, a `spec.md`, as decisões de `clarify.md` e os módulos necessários do Design System. Não haverá backend, endpoint, cliente HTTP, persistência, autenticação ou nova dependência.

## Flow Context

- Flow: `consumer-flow`.
- Posição: após a Home pública e antes da futura vitrine pública da loja.
- Entrada: consumidor escolhe explorar lojas a partir da plataforma ou acessa diretamente a listagem.
- Saída/próximo passo: intenção de abrir a futura vitrine pública da loja selecionada.
- Restrições derivadas do fluxo:
  - permitir navegação visual pela lista mesmo sem pesquisa;
  - representar apenas lojas fornecidas pela fonte local desta versão;
  - não exigir login do consumidor;
  - não implementar slug, validação de disponibilidade remota ou vitrine pública;
  - card e **Ver loja** devem emitir a mesma seleção uma única vez;
  - **Explorar** não terá destino definitivo nesta etapa;
  - estados vazio, resultado vazio, carregamento e erro devem possuir apresentação prevista, sem integração remota.

## Scope Lock

Target: frontend da feature Lista de Lojas.

### Paths permitidos na implementação futura

- `app/frontend/src/features/store/store-list/**`.
- `app/frontend/src/App.tsx`, somente para compor `StoreListPage`, sem roteamento.
- `app/frontend/specs/store-list/plan.md`, somente nesta fase.
- `app/frontend/specs/store-list/tasks.md`, somente quando a fase TASKS for iniciada explicitamente.

### Recursos somente para leitura

- `app/frontend/specs/store-list/spec.md`.
- `app/frontend/specs/store-list/clarify.md`.
- `app/frontend/specs/store-list/assets/tela-lista-lojas.png`.
- `app/frontend/public/logoPedeAqui.jpeg`.
- módulos do Design System citados neste plano.

### Paths e ações proibidos

- `app/backend/**`, `database/**`, `supabase/**` e migrations.
- outras features em `app/frontend/src/features/**` e `app/frontend/specs/**`.
- `app/frontend/src/shared/**`, salvo revisão explícita do plano.
- `app/frontend/src/main.tsx`, `app/frontend/src/index.css` e `app/frontend/src/App.css`.
- `app/frontend/package.json` e arquivos de lock.
- alteração, duplicação ou recriação da logo e da referência visual.
- endpoints, URLs, chamadas HTTP, cliente de API, autenticação ou persistência.
- router, rota, slug ou implementação da vitrine pública.
- paginação, categorias, favoritos, geolocalização, carrinho ou filtros adicionais.

### Scope Lock funcional

- Implementar somente header sticky, título, texto de apoio, pesquisa por prefixo, lista de cards e os estados definidos na spec.
- Usar a coleção local como fonte explícita desta versão, sem apresentá-la como resposta de backend.
- Manter **Explorar** e a seleção de loja como intenções frontend, sem destino inventado.
- Não criar comportamento além de `spec.md` e `clarify.md`.
- Qualquer necessidade fora desses paths ou comportamentos exige revisão do plano antes da implementação.

## Arquitetura

A feature seguirá a organização oficial por domínio:

```text
src/features/store/store-list/
├── components/
├── data/
├── hooks/
├── pages/
├── services/
└── types/
```

Não serão necessárias as pastas `schemas/` ou `styles/`: não há formulário sujeito a schema e Tailwind é suficiente para os estilos previstos.

### Separação de responsabilidades

- `pages/`: compor header, conteúdo e estados da tela.
- `components/`: renderizar header, campo de pesquisa, lista, card e feedbacks visuais.
- `hooks/`: manter o termo pesquisado, normalizar a entrada e derivar a coleção filtrada.
- `data/`: fornecer a coleção local desta versão, separada da apresentação e sem simular uma API.
- `types/`: declarar o modelo interno da loja, estados da lista e callbacks da feature.
- `services/`: registrar somente o contrato assíncrono tipado da integração futura e seu estado controlado de indisponibilidade, sem request ou consumo na versão atual.

### Fluxo interno planejado

1. `App` compõe `StoreListPage` sem adicionar roteamento.
2. `StoreListPage` recebe o estado completo da tela, os callbacks de intenção e a disponibilidade própria da ação **Explorar**.
3. `StoreSearchField`, no papel de SearchBar, emite o texto digitado por `onSearchChange`.
4. `StoreListPage` encaminha `onSearchChange` ao handler exposto por `useStoreList`.
5. `useStoreList` atualiza o termo local, propaga o evento externo `onSearchChange` uma única vez e deriva a lista visível.
6. A normalização remove espaços externos e converte o texto para comparação sem diferença entre maiúsculas e minúsculas.
7. A filtragem usa correspondência pelo início do nome com todo o prefixo digitado; novos caracteres refinam o resultado.
8. `StoreListContent` considera explicitamente `initial`, `loading`, `success`, `empty` e `error`; em `empty`, diferencia lista sem lojas de pesquisa sem correspondências.
9. `StoreCard` encaminha clique ou teclado para uma única função de seleção.
10. **Ver loja** encaminha o mesmo identificador e impede que o evento também acione o card.
11. O service futuro não participa desse fluxo e não será importado pelos componentes ou pelo hook nesta versão.

## Componentes Planejados

### `StoreListPage`

- Compor o landmark principal, `StoreListHeader`, apresentação da tela, `StoreSearchField` e `StoreListContent`.
- Receber e considerar explicitamente os estados `initial`, `loading`, `success`, `empty` e `error` antes de delegar a apresentação a `StoreListContent`.
- Receber a disponibilidade de **Explorar** separadamente da disponibilidade de seleção das lojas.
- Centralizar o conteúdo com largura máxima e espaçamento responsivo.
- Não conhecer endpoint, transporte ou formato remoto.

### `StoreListHeader`

- Renderizar a logo oficial `/logoPedeAqui.jpeg` e o sub-botão **Explorar**.
- Permanecer sticky durante toda a rolagem, com fundo sólido, z-index adequado e espaço de layout que evite sobreposição.
- Emitir apenas `onExplore`; não navegar diretamente.
- Receber um estado próprio `isExploreAvailable`; quando falso, apresentar **Explorar** como disabled e não emitir ação.
- Não reutilizar `StoreSummary.isSelectable`, que controla exclusivamente a seleção de cada loja.

### `StoreSearchField`

- Renderizar label acessível, ícone de lupa e placeholder **Pesquisar lojas**.
- Manter o valor controlado pelo hook e emitir cada alteração do termo pela prop `onSearchChange`.
- Seguir o fluxo `StoreSearchField (SearchBar) → onSearchChange → useStoreList → atualização da lista filtrada`; o hook também propaga a saída externa de pesquisa uma única vez.
- Não usar React Hook Form ou Zod, pois é um filtro local sem submissão ou validação.

### `StoreListContent`

- Selecionar a apresentação adequada para `initial`, `loading`, `success`, `empty` ou `error`.
- No estado `empty`, distinguir a ausência de lojas da ausência de correspondências para o termo pesquisado.
- Manter a estrutura estável durante carregamento.
- Anunciar alterações de resultado e feedbacks relevantes para tecnologias assistivas.

### `StoreList`

- Renderizar a coleção em estrutura semântica de lista.
- Preservar a ordem recebida e fornecer chave pelo identificador estável.

### `StoreCard`

- Exibir imagem ou fallback, nome, descrição e sub-botão **Ver loja**.
- Tornar toda a área do card acionável por clique, Enter e Espaço, com foco visível.
- Usar o mesmo callback de seleção para card e botão, garantindo emissão única.
- Aplicar no hover borda vermelha, leve elevação, cursor pointer e transição suave.
- Usar nome acessível contextual em **Ver loja**.

### `StoreListFeedback`

- Apresentar mensagens de carregamento, erro, lista vazia e resultado vazio.
- Expor nova tentativa somente quando houver callback disponível.
- Permitir limpar a pesquisa no resultado vazio sem criar ação remota.

## Hook

### `useStoreList`

- Receber a coleção de lojas e manter somente o estado local do termo pesquisado.
- Expor um handler de pesquisa usado como `onSearchChange` de `StoreSearchField`.
- Ao receber uma alteração, atualizar o termo local, recalcular a lista filtrada e propagar o callback externo `onSearchChange(term)` uma única vez.
- Aplicar `trim()` ao termo e comparação sem distinção entre maiúsculas e minúsculas.
- Filtrar com correspondência por prefixo do nome completo normalizado.
- Refinar os resultados a cada alteração do texto.
- Restaurar a coleção completa quando o termo normalizado estiver vazio.
- Expor termo, alteração, limpeza, lojas visíveis e indicação de resultado vazio.
- Não chamar service, não navegar e não manter estado remoto.

## Dados Locais

### `localStores.ts`

- Declarar a coleção exibida nesta versão de acordo com a referência e o contrato `StoreSummary`.
- Manter identificadores estáveis, nome, descrição e referência opcional de imagem.
- Não representar os dados como resposta de API, não adicionar latência artificial e não inventar campos de backend.
- Permanecer substituível por uma fonte integrada futuramente sem alterar os componentes de apresentação.

## Tipos e Contratos

### Modelo interno

`StoreSummary` conterá somente:

- `id`: identificador único e estável;
- `name`: nome da loja;
- `description`: descrição curta;
- `imageSrc`: referência opcional da imagem;
- `imageAlt`: alternativa opcional quando a imagem acrescentar informação;
- `isSelectable`: disponibilidade da ação.

### Estado da lista

O estado de apresentação será uma união discriminada com as situações `initial`, `loading`, `success`, `empty` e `error`.

- `initial`: estrutura da tela disponível antes da apresentação da lista;
- `loading`: carregamento com estrutura visual estável;
- `success`: coleção com lojas pronta para pesquisa e apresentação;
- `empty`: ausência de conteúdo, discriminada pelo motivo `list` ou `search`;
- `error`: falha acompanhada das informações necessárias à apresentação e eventual nova tentativa.

`StoreListPage` receberá esse estado completo. A filtragem poderá produzir `empty` com motivo `search`, enquanto uma coleção sem lojas produzirá `empty` com motivo `list`.

### Saídas da feature

- `onSearchChange(term)`: emitido por `StoreSearchField`, processado por `useStoreList` e propagado externamente uma única vez após a atualização do termo local.
- `onExplore()`: intenção de explorar.
- `onSelectStore(storeId)`: seleção de loja pelo card ou por **Ver loja**.
- `onRetry()`: nova tentativa quando houver erro e callback disponível.

Card e **Ver loja** devem encaminhar exatamente um `storeId` para a mesma saída.

### Disponibilidade das ações

- `isExploreAvailable`: controla somente **Explorar** e não depende da coleção nem de `StoreSummary.isSelectable`.
- `StoreSummary.isSelectable`: controla somente o card e **Ver loja** da respectiva loja.
- As duas disponibilidades são independentes e não podem ser derivadas uma da outra.

## Service Futuro

### `storeListService.ts`

- Declarar uma função assíncrona tipada para futura obtenção das lojas.
- Retornar, nesta etapa, apenas um resultado controlado `unavailable` ou `notImplemented`, conforme o contrato interno definido em `types/`.
- Incluir TODO explícito condicionando a implementação à existência de contrato oficial de backend.
- Não declarar endpoint, URL, método HTTP, payload de transporte, cliente, mock ou latência simulada.
- Não ser importado pela página, pelo hook ou pelos componentes desta versão.

## Arquivos Planejados

| Path | Operação futura | Finalidade |
| --- | --- | --- |
| `app/frontend/src/App.tsx` | Alterar | Compor `StoreListPage` como tela atual, sem roteamento. |
| `app/frontend/src/features/store/store-list/pages/StoreListPage.tsx` | Criar | Composição principal e seleção dos estados da tela. |
| `app/frontend/src/features/store/store-list/components/StoreListHeader.tsx` | Criar | Header sticky, logo e intenção **Explorar**. |
| `app/frontend/src/features/store/store-list/components/StoreSearchField.tsx` | Criar | Pesquisa controlada com ícone de lupa. |
| `app/frontend/src/features/store/store-list/components/StoreListContent.tsx` | Criar | Orquestração visual dos estados da lista. |
| `app/frontend/src/features/store/store-list/components/StoreList.tsx` | Criar | Lista semântica dos cards. |
| `app/frontend/src/features/store/store-list/components/StoreCard.tsx` | Criar | Card integralmente acionável e sub-botão **Ver loja**. |
| `app/frontend/src/features/store/store-list/components/StoreListFeedback.tsx` | Criar | Loading, erro e estados vazios acessíveis. |
| `app/frontend/src/features/store/store-list/hooks/useStoreList.ts` | Criar | Estado e filtragem progressiva por prefixo. |
| `app/frontend/src/features/store/store-list/data/localStores.ts` | Criar | Fonte local substituível desta versão. |
| `app/frontend/src/features/store/store-list/types/storeList.ts` | Criar | Modelo, estados, callbacks e contrato futuro. |
| `app/frontend/src/features/store/store-list/services/storeListService.ts` | Criar | Fronteira assíncrona tipada futura, sem HTTP. |

Não há arquivos planejados em `shared/`, `schemas/`, `styles/`, backend ou contratos externos.

## Design System Necessário

- foundations:
  - `.specify/design-system/foundations/colors.md`: `primary`, `foreground`, `text-secondary`, `background`, `border`, `border-brand`, `disabled-bg` e `disabled-text`.
  - `.specify/design-system/foundations/typography.md`: título, subtítulo, nome e descrição de loja.
  - `.specify/design-system/foundations/spacing.md`: container, gaps, padding e áreas de toque.
  - `.specify/design-system/foundations/radius.md`: campo, sub-botões, imagens e cards.
  - `.specify/design-system/foundations/shadows.md`: sombra padrão e leve elevação dos cards.
  - `.specify/design-system/foundations/motion.md`: transições curtas e respeito à redução de movimento.
- components:
  - `.specify/design-system/components/button.md`: base de foco, active e disabled, sobrescrita pela decisão específica dos sub-botões.
  - `.specify/design-system/components/input.md`: estrutura acessível do campo com ícone.
  - `.specify/design-system/components/card.md`: card de listagem e elevação discreta.
- patterns:
  - `.specify/design-system/patterns/empty-error-loading-states.md`: feedbacks da lista.
- motion:
  - transições CSS/Tailwind serão suficientes;
  - o hover de **Explorar** e **Ver loja** alterará somente a borda para `primary`, mantendo fundo, texto e ícones nas cores padrão;
  - cards poderão alterar borda, sombra e deslocamento mínimo, respeitando `prefers-reduced-motion`.

Em qualquer divergência, as decisões específicas de `spec.md` e `clarify.md` prevalecem sobre exemplos genéricos do Design System.

## Estratégia de Estilo

- Tailwind no TSX:
  - layout, sticky header, largura máxima, tipografia, espaçamento, bordas, sombras, radius, estados interativos, foco e responsividade;
  - transições suaves dos sub-botões e cards;
  - truncamento ou reorganização responsiva para textos longos.
- CSS Modules em `styles/`: não previstos.
- Motivo para não usar CSS Module: a tela não exige pseudo-elementos, keyframes, seletores complexos ou decoração que comprometa a legibilidade das classes utilitárias.
- CSS global necessário: não.

## Comportamento dos Sub-botões

As regras de **Explorar** e **Ver loja** são mais específicas que as variantes genéricas do Design System:

- padrão: fundo branco, borda `border`, texto e ícones nas cores padrão;
- hover: somente a borda muda para `primary`, com transição suave;
- focus: indicador visível e contrastante, independente do hover;
- active: feedback de pressionamento sem substituir as cores definidas;
- disabled: aparência atenuada, ausência de hover/active e nenhuma emissão de ação.

Não será aplicado preenchimento vermelho, texto branco ou ícone branco no hover desses controles.

## Contratos e Dependências

- Backend: inexistente e fora do escopo.
- Fonte atual: coleção local tipada e explicitamente substituível.
- Service: contrato assíncrono futuro sem integração e sem consumo atual.
- Navegação: callbacks de intenção, sem router ou destino.
- Referência visual: `specs/store-list/assets/tela-lista-lojas.png`, somente para comparação.
- Logo: `/logoPedeAqui.jpeg`, consumida do asset público existente e sem alteração.
- Contrato externo em `specs/store-list/contracts/`: não necessário enquanto não houver API oficial.

## Dependências de Biblioteca

- Framer Motion: já instalada, mas não necessária para esta versão; as transições previstas são simples e serão resolvidas com Tailwind/CSS.
- Lucide React: já instalada; usar lupa, bússola, seta e fallback visual quando aplicável.
- React Hook Form: não usar; a pesquisa é um campo controlado sem submissão.
- Zod: não usar; não há payload ou validação de formulário.
- Novas dependências: nenhuma.

## ADR

- ADR necessária: não.
- Motivo: a feature aplica a arquitetura existente por domínio, a stack instalada e contratos locais, sem alterar organização oficial, autenticação, dependência estrutural ou contrato global.
- Caminho do rascunho: não se aplica.
- Status: não necessária.

## Validação

Na futura implementação, executar:

- `npm run lint`.
- `npm run build`.
- comparação visual em desktop e mobile com `specs/store-list/assets/tela-lista-lojas.png`.
- verificação de ausência de rolagem horizontal e de sobreposição pelo header sticky.
- verificação da pesquisa com `c`, `ca` e `cac`, incluindo caixa diferente e espaços externos.
- verificação de restauração da lista completa ao limpar o campo.
- verificação dos estados `initial`, `loading`, `success`, `empty` por lista, `empty` por pesquisa e `error`, além de imagem ausente e ação indisponível.
- verificação de que `isExploreAvailable` controla somente **Explorar**, independentemente de `StoreSummary.isSelectable`.
- verificação do fluxo `StoreSearchField (SearchBar) → onSearchChange → useStoreList → atualização da lista filtrada`, com uma única propagação externa por alteração.
- verificação de clique em toda a área do card e acionamento por Enter e Espaço.
- verificação de que card e **Ver loja** emitem uma única seleção equivalente.
- verificação de foco visível, ordem de tabulação, nomes acessíveis contextuais e anúncios de resultado.
- verificação visual dos sub-botões em padrão, hover, focus, active e disabled.
- verificação negativa de que o hover dos sub-botões não altera fundo, texto ou ícones.
- verificação negativa de ausência de request HTTP, endpoint, navegação, router e importação do service futuro.
- confirmação de que nenhuma alteração ocorreu fora do Scope Lock.

## Riscos

- Um card clicável contendo **Ver loja** pode disparar duas vezes por propagação; a implementação deve centralizar o callback e controlar explicitamente o evento do botão.
- Tornar card e botão acessíveis pode gerar dois focos equivalentes; ambos são exigidos e devem possuir nomes claros e ordem previsível.
- A regra de prefixo pode ser implementada incorretamente como busca por ocorrência; os checks devem confirmar `startsWith` sobre termo e nome normalizados.
- O header sticky pode ocultar conteúdo se houver posicionamento absoluto ou compensação indevida; deve permanecer no fluxo normal.
- Exemplos genéricos do componente de botão sugerem mudança de fundo no hover, mas a decisão específica desta feature permite somente alteração da borda.
- Imagens locais específicas das lojas podem não existir; o fallback deve preservar dimensões e identificação sem criar novos assets fora do escopo.
- A fronteira de service futuro pode ser confundida com autorização para mock ou HTTP; ela deve permanecer tipada, controlada e sem consumo.

## Critérios para a fase TASKS

A futura fase TASKS deverá:

- decompor a implementação em unidades pequenas, ordenadas e verificáveis;
- iniciar por tipos, dados locais e fronteira futura antes da composição visual;
- separar filtragem, componentes, estados, integração no `App` e validação final;
- indicar paths permitidos e proibidos em cada task;
- associar cada task às decisões de `spec.md`, `clarify.md` e deste plano;
- incluir checks objetivos de pesquisa, interação única, acessibilidade, responsividade, lint e build;
- não criar backend, HTTP, roteamento, novos assets ou dependências;
- não iniciar implementação durante a própria fase TASKS.

## Fora do Plano

- Código React, TypeScript ou CSS nesta fase.
- Criação de `tasks.md` ou `analyze.md` nesta fase.
- Backend, API, persistência, autenticação ou geolocalização.
- Navegação real para **Explorar** ou para a vitrine pública.
- Alteração da vitrine pública já existente.
- Novos filtros, ordenação, paginação, categorias, favoritos ou carrinho.
