# Plan: Cadastro de lojista

## Resumo Técnico

Implementar, em uma fase posterior, a primeira versão exclusivamente frontend da tela de cadastro de lojista. A tela 
será organizada como uma feature isolada, com composição de página, componentes de apresentação, estado local de 
formulário e schema centralizado de validação. Não haverá comunicação HTTP, autenticação, persistência, 
redirecionamento ou estado de sucesso remoto.

A referência visual oficial orientará hierarquia, proporções, composição, cores e elementos decorativos. A `spec.md` 
permanece como fonte de verdade funcional e prevalece sobre a imagem em qualquer conflito.

## Fontes e Precedência

1. `specs/register/spec.md`: fonte de verdade funcional.
2. `specs/register/clarify.md`: decisões que encerraram ambiguidades.
3. `specs/register/assets/Tela-cadastro.png`: referência oficial para aspectos visuais.
4. `.specify/design-system/`: padrões e tokens técnicos de apresentação.
5. `public/logoPedeAqui.jpeg`: logo oficial confirmado para esta feature.

Nenhum comportamento sugerido apenas pela imagem deve ser implementado se não estiver previsto na spec. Isso se aplica 
especialmente a navegação, autenticação, envio real e controles adicionais.

## Objetivo da Implementação

- Substituir a tela demonstrativa do scaffold pela interface de cadastro.
- Reproduzir a estrutura visual da referência oficial de forma responsiva e acessível.
- Exibir exatamente os quatro campos definidos: `Nome completo`, `E-mail`, `Senha` e `CPF ou CNPJ`.
- Executar somente validações locais de obrigatoriedade, formato de e-mail e mínimo de 8 caracteres para senha.
- Manter a alternativa de entrada e os textos legais como elementos visuais sem navegação.
- Preservar separação clara entre composição, apresentação, estado do formulário e validação.

## Flow Context

- Flow: `merchant-flow`.
- Posição: interface inicial de cadastro do lojista dentro do onboarding.
- Entrada: acesso direto à tela de cadastro.
- Saída/próximo passo: não definido nesta versão.
- Restrições derivadas do fluxo:
  - não redirecionar após validação;
  - não autenticar nem persistir dados;
  - não acessar etapas de plano, configuração de loja, pagamento ou dashboard;
  - não transformar a alternativa visual `Entrar` em navegação;
  - não implementar validação de CPF/CNPJ prevista em etapas futuras do fluxo.

## Scope Lock

Target: Frontend.

### Paths permitidos para a implementação futura

- `app/frontend/src/App.tsx`
- `app/frontend/src/App.css`
- `app/frontend/src/index.css`
- `app/frontend/src/features/register/`
- `app/frontend/package.json`
- `app/frontend/package-lock.json`
- `app/frontend/specs/register/plan.md`
- `app/frontend/specs/register/tasks.md`, somente quando a fase `tasks` for explicitamente iniciada

### Recursos somente para leitura

- `app/frontend/specs/register/spec.md`
- `app/frontend/specs/register/clarify.md`
- `app/frontend/specs/register/assets/Tela-cadastro.png`
- `app/frontend/public/logoPedeAqui.jpeg`

### Paths e ações proibidos

- `app/backend/`
- `database/`, `supabase/` e migrations
- outras features em `app/frontend/specs/`
- endpoints, services HTTP, autenticação ou contratos backend
- alteração ou recriação do logo oficial
- criação de fluxo de login, rota, redirecionamento ou navegação
- criação de regras de CPF/CNPJ, complexidade adicional de senha ou confirmação de senha

## Arquitetura da Feature

A feature seguirá organização por domínio em `src/features/register`, mantendo o `App.tsx` apenas como ponto de 
composição da tela enquanto não houver roteamento definido.

```text
App
└── RegisterPage
    ├── RegisterHeader
    │   ├── logo oficial
    │   └── alternativa visual de entrada
    └── RegisterCard
        ├── apresentação da tela
        ├── RegisterForm
        │   └── RegisterField × 4
        └── RegisterLegalNotice

RegisterForm
├── useRegisterForm
└── registerSchema
```

### Separação de responsabilidades

- A página define layout e composição, sem conhecer detalhes das regras dos campos.
- Os componentes renderizam conteúdo e estados recebidos, sem acessar API.
- O hook concentra a integração do formulário, o disparo da validação local e a exposição dos erros.
- O schema contém toda a regra de validação, evitando duplicação nos componentes.
- O CSS Module concentra apenas elementos decorativos difíceis de expressar com clareza por classes utilitárias.
- Não haverá camada `services/`, pois não existe comunicação externa neste escopo.
- Não haverá DTO ou contrato remoto. O tipo dos valores do formulário será derivado do schema, sem criar abstração 
adicional.

## Estrutura Lógica da Tela

1. Header branco:
   - logo oficial alinhado ao início;
   - texto `Já tem uma conta?`;
   - elemento visual `Entrar`, com aparência de ação secundária e sem navegação.
2. Área principal sobre fundo `surface`:
   - decoração vermelha e padrão pontilhado sem significado semântico;
   - card centralizado e responsivo.
3. Apresentação do card:
   - ícone de cadastro dentro de container `primary-soft`;
   - título e subtítulo conforme a referência visual;
   - destaque de marca em vermelho sem alterar o conteúdo funcional.
4. Formulário:
   - campos na ordem definida pela spec;
   - labels sempre visíveis;
   - ícones de apoio visuais;
   - botão principal `Cadastrar`.
5. Aviso legal:
   - texto com `Termos de Uso` e `Política de Privacidade` destacados visualmente;
   - uso de elementos não navegáveis.

Em telas menores, o card deve ocupar a largura disponível com margens seguras, o header deve preservar leitura e os 
elementos decorativos devem reduzir ou sair da área útil sem provocar rolagem horizontal.

## Organização dos Componentes

| Unidade | Responsabilidade |
| --- | --- |
| `RegisterPage` | Compor header, área principal, card e decoração da página; definir landmarks semânticos. |
| `RegisterHeader` | Renderizar `/logoPedeAqui.jpeg`, a pergunta para usuário já cadastrado e a alternativa visual 
`Entrar`, sem evento de navegação. |
| `RegisterCard` | Agrupar ícone de contexto, título, subtítulo, formulário e aviso legal. |
| `RegisterForm` | Renderizar os quatro campos e o botão de submit local; conectar controles e mensagens ao hook. |
| `RegisterField` | Padronizar label, ícone, input, associação acessível e mensagem de erro dos campos. |
| `RegisterLegalNotice` | Renderizar os textos legais destacados sem usar links ou handlers. |
| `useRegisterForm` | Configurar React Hook Form, aplicar o schema e impedir qualquer efeito externo após uma 
submissão local válida. |
| `registerSchema` | Definir as regras únicas de obrigatoriedade, e-mail e senha. |

`RegisterField` deve abstrair somente a estrutura realmente repetida pelos quatro campos. Conteúdo específico, tipo de 
input, autocomplete e ícone continuam explícitos na configuração de cada campo.

## Fluxo Entre os Componentes

1. `App` renderiza `RegisterPage`.
2. `RegisterPage` compõe `RegisterHeader` e `RegisterCard`.
3. `RegisterForm` obtém registros, erros e handler local por meio de `useRegisterForm`.
4. `useRegisterForm` usa `registerSchema` como fonte única das regras.
5. Cada `RegisterField` recebe apenas propriedades de apresentação e integração do campo.
6. Ao acionar `Cadastrar`, o formulário valida os dados localmente.
7. Em caso de erro, a mensagem é apresentada junto ao campo correspondente.
8. Em caso de dados válidos, nenhum request, redirecionamento, mensagem de sucesso ou mudança de etapa é executado.
9. `Entrar`, `Termos de Uso` e `Política de Privacidade` não emitem eventos de navegação.

## Estratégia de Validação Local

O formulário usará React Hook Form para controle e Zod como fonte única de validação, integrados por um resolver 
compatível.

| Campo | Regra |
| --- | --- |
| `Nome completo` | Obrigatório após remoção de espaços externos; sem outras regras. |
| `E-mail` | Obrigatório e com formato válido de e-mail. |
| `Senha` | Obrigatória e com mínimo de 8 caracteres; sem exigência de maiúscula, número, símbolo ou confirmação. |
| `CPF ou CNPJ` | Obrigatório após remoção de espaços externos; sem máscara, identificação do documento, tamanho ou 
dígitos verificadores. |

Diretrizes:

- validar inicialmente no submit local;
- após um erro, permitir revalidação do campo durante a correção;
- manter mensagens próximas aos controles e associadas com `aria-describedby`;
- usar `role="alert"` para mensagens dinâmicas quando apropriado;
- não duplicar regras em JSX, hook e schema;
- não manter, enviar ou registrar os valores fora do estado do formulário.

## Estados da Interface

| Estado | Comportamento visual |
| --- | --- |
| Inicial | Campos vazios, labels e placeholders visíveis, sem mensagens de erro. |
| Validação local | O submit local solicita a verificação dos quatro campos sem estado de loading. |
| Campo obrigatório ausente | Campo correspondente recebe estado de erro e mensagem próxima. |
| E-mail inválido | Campo de e-mail recebe estado de erro de formato. |
| Senha curta | Campo de senha informa o mínimo de 8 caracteres. |
| Formulário localmente válido | A interface permanece na mesma tela, sem sucesso, request ou redirecionamento. |

Não serão criados estados de envio, loading, erro remoto, duplicidade, autenticação ou sucesso pós-cadastro.

## Arquivos Planejados

| Path | Operação futura | Finalidade |
| --- | --- | --- |
| `app/frontend/src/App.tsx` | Alterar | Remover o conteúdo demonstrativo e compor `RegisterPage`. |
| `app/frontend/src/App.css` | Remover | Eliminar estilos específicos do scaffold que não serão reutilizados. |
| `app/frontend/src/index.css` | Alterar | Manter Tailwind e somente reset/base global necessários à página. |
| `app/frontend/src/features/register/pages/RegisterPage.tsx` | Criar | Compor a página e seus landmarks. |
| `app/frontend/src/features/register/components/RegisterHeader.tsx` | Criar | Renderizar logo e alternativa visual de 
entrada. |
| `app/frontend/src/features/register/components/RegisterCard.tsx` | Criar | Agrupar apresentação, formulário e aviso 
legal. |
| `app/frontend/src/features/register/components/RegisterForm.tsx` | Criar | Renderizar e conectar o formulário 
local. |
| `app/frontend/src/features/register/components/RegisterField.tsx` | Criar | Padronizar os quatro campos e seus 
erros. |
| `app/frontend/src/features/register/components/RegisterLegalNotice.tsx` | Criar | Renderizar referências legais não 
navegáveis. |
| `app/frontend/src/features/register/hooks/useRegisterForm.ts` | Criar | Orquestrar formulário e submissão 
exclusivamente local. |

| `app/frontend/src/features/register/schemas/registerSchema.ts` | Criar | Centralizar regras e inferir o tipo dos 
valores. |
| `app/frontend/src/features/register/styles/RegisterPage.module.css` | Criar | Implementar formas e pontilhados 
decorativos da referência. |
| `app/frontend/package.json` | Alterar | Declarar bibliotecas previstas e ainda ausentes. |
| `app/frontend/package-lock.json` | Alterar | Registrar versões resolvidas das dependências. |

Não estão planejados arquivos em `services/`, `types/`, `contracts/`, backend ou Supabase.

## Design System Necessário

### Foundations

- `.specify/design-system/foundations/colors.md`
- `.specify/design-system/foundations/typography.md`
- `.specify/design-system/foundations/spacing.md`
- `.specify/design-system/foundations/radius.md`
- `.specify/design-system/foundations/shadows.md`
- `.specify/design-system/foundations/motion.md`

### Components

- `.specify/design-system/components/button.md`
- `.specify/design-system/components/input.md`
- `.specify/design-system/components/form-field.md`
- `.specify/design-system/components/card.md`

### Patterns

- `.specify/design-system/patterns/auth-pages.md`

## Motion

A feature utilizará Framer Motion para microinterações discretas, mantendo a fidelidade à referência visual e respeitando a especificação funcional.

As animações deverão ser leves, rápidas e não alterar o comportamento da interface.

Aplicações previstas:

- animação de entrada do card de cadastro;
- efeito de hover e tap no botão "Cadastrar";
- transição suave das mensagens de validação;
- aparição discreta dos elementos principais da página.

Não serão implementadas animações que modifiquem o fluxo funcional da tela ou adicionem estados não previstos na `spec.
md`.

## Estratégia de Estilo

- Tailwind no TSX: layout, responsividade, cores, tipografia, espaçamento, bordas, foco, estados de erro e dimensões 
principais.
- CSS Modules em `styles/`: formas vermelhas, padrões pontilhados e pseudo-elementos decorativos da referência visual.
- Motivo para CSS Module: os elementos decorativos exigem pseudo-elementos, posicionamento, recorte e regras 
responsivas que reduziriam a legibilidade do TSX.
- CSS global: apenas import do Tailwind, reset mínimo, altura/base do documento e remoção dos estilos demonstrativos 
do scaffold.
- As decorações devem usar `pointer-events: none`, ficar fora da árvore semântica e nunca cobrir campos ou foco.
- Não serão criadas novas cores fora dos tokens. Variações sutis da referência devem ser mapeadas para `primary`, 
`primary-soft`, `surface`, `border`, `foreground` e `text-secondary`.

## Recursos Utilizados

### Referência visual

- Arquivo: `app/frontend/specs/register/assets/Tela-cadastro.png`.
- Uso: consulta de hierarquia, proporções, alinhamento, composição, ícones e decoração.
- O arquivo não será importado para renderizar a tela nem alterado pela implementação.

### Logo oficial

- Arquivo: `app/frontend/public/logoPedeAqui.jpeg`.
- Caminho público esperado: `/logoPedeAqui.jpeg`.
- Uso: imagem no header, com texto alternativo `PedeAqui` e proporção preservada.
- A logo não será recriada com texto, Lucide, SVG manual ou composição de elementos.

### Ícones

- Lucide React será usado para os ícones semânticos de cadastro, usuário, e-mail, senha, documento e entrada.
- Ícones meramente decorativos devem usar `aria-hidden="true"`.
- O controle de revelar senha sugerido visualmente pela referência não será implementado, pois esse comportamento não 
está definido na spec.

## Contratos e Dependências Externas

- Backend: nenhum.
- API: nenhuma.
- Supabase/autenticação: nenhuma.
- Contratos frontend-backend: nenhum.
- Rotas e router: não serão adicionados.
- Assets externos ou download em runtime: nenhum.

## Dependências de Biblioteca

| Biblioteca | Situação | Uso planejado |
|------------|----------|---------------|
| React, React DOM, Vite e Tailwind CSS | Já instaladas | Base da aplicação e estilos utilitários. |
| React Hook Form | Adicionar na implementação | Estado e ciclo de validação do formulário. |
| Zod | Adicionar na implementação | Schema único de validação e inferência de tipo. |
| `@hookform/resolvers` | Adicionar na implementação | Integrar Zod ao React Hook Form. |
| Lucide React | Adicionar na implementação | Ícones da interface. |
| Framer Motion | Adicionar na implementação | Microinterações, animações de entrada e transições suaves. |

As adições previstas já seguem a stack oficial e não introduzem uma decisão arquitetural nova.

## ADR

- ADR necessária: não.
- Motivo: a solução usa organização por feature, bibliotecas e padrões já previstos pelo frontend; não altera 
autenticação, contratos globais, arquitetura oficial ou decisões estruturais.
- Status: não necessária.

## Validação da Implementação Futura

- Executar `npm run lint`.
- Executar `npm run build`.
- Conferir visualmente a tela em largura desktop contra `Tela-cadastro.png`.
- Conferir responsividade em viewport móvel sem rolagem horizontal ou sobreposição decorativa.
- Verificar ordem de foco, labels, foco visível e associação das mensagens de erro.
- Confirmar os quatro campos e a ausência de `Confirmar senha`.
- Confirmar as validações locais previstas e a ausência de validação específica de CPF/CNPJ.
- Confirmar que o submit válido não gera request, loading, sucesso ou redirecionamento.
- Confirmar que `Entrar`, `Termos de Uso` e `Política de Privacidade` não navegam.
- Confirmar que nenhuma alteração ocorreu fora do `Scope Lock`.

## Critérios para a Fase `tasks`

A fase `tasks` deverá:

- decompor a implementação em unidades pequenas, ordenadas e verificáveis;
- começar pela preparação das dependências e remoção controlada do scaffold;
- separar estrutura da página, formulário, validação, decoração e validação final;
- informar paths permitidos e proibidos em cada task;
- associar cada task a requisitos e decisões de `spec.md` e `clarify.md`;
- definir checks objetivos de lint, build, validação local, acessibilidade e fidelidade visual;
- não incluir backend, API, autenticação, roteamento ou navegação;
- não alterar `spec.md`, `clarify.md`, a referência visual ou a logo;
- não marcar uma task como concluída antes dos checks correspondentes;
- respeitar dependências entre tasks sem iniciar implementação durante a própria fase `tasks`.

## Riscos e Mitigações

- Caminho genérico de logo diferente: a documentação genérica menciona outro nome de arquivo, mas o recurso confirmado 
e existente para esta feature é `public/logoPedeAqui.jpeg`. As tasks devem usar somente `/logoPedeAqui.jpeg` e não 
duplicar o asset.
- Referência predominantemente desktop: aplicar o pattern de auth e os tokens responsivos do design system, 
preservando conteúdo e hierarquia em mobile sem inventar novos blocos.
- Elementos com aparência clicável, mas sem navegação: renderizar `Entrar` e textos legais com semântica não 
interativa, evitando links vazios ou handlers sem efeito.
- Submit válido sem continuidade: manter a ausência de feedback de sucesso porque qualquer fluxo posterior está 
explicitamente fora do escopo.
- Decoração complexa: isolá-la no CSS Module e reduzi-la em telas estreitas para não competir com formulário, 
acessibilidade ou desempenho.

## Fora do Plano

- Código React ou CSS nesta fase.
- Criação de `tasks.md` nesta fase.
- Integração, autenticação, persistência ou chamadas HTTP.
- Navegação para login, termos ou política de privacidade.
- Toggle de visibilidade de senha.
- Validação, máscara ou identificação de CPF/CNPJ.
- Confirmação de senha, login social ou recuperação de senha.
- Estados de loading, erro remoto ou sucesso pós-cadastro.
