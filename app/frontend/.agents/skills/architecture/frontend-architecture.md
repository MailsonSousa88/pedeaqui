---
name: frontend-architecture
description: >
  Arquitetura obrigatória do frontend do PedeAqui.
  Define estrutura de pastas, separação por features, camadas de
  responsabilidade e mapeamento de páginas para features.
  Sempre seguir em conjunto com frontend-design.md e page-home.md.
---

# Arquitetura Frontend — PedeAqui

A arquitetura combina **Feature-Based** com princípios de **Clean Architecture**
usando React. O sistema é organizado por funcionalidades do negócio (features)
com responsabilidades separadas em camadas bem definidas.

Objetivo: escalabilidade, manutenção fácil e código compreensível por qualquer
desenvolvedor que entre no projeto.

---

## Estrutura geral de pastas

```
src/
├── app/          ← configuração global
├── features/     ← funcionalidades do negócio
└── shared/       ← elementos reutilizáveis
```

---

## Camada `app/`

Configuração global da aplicação. Nunca colocar lógica de negócio aqui.

```
app/
├── routes/       ← definição de todas as rotas
├── providers/    ← providers globais (auth, tema, query client)
└── config/       ← variáveis e configurações gerais
```

**Responsabilidades:**
- Rotas: login, dashboard, loja, carrinho, produtos, pedidos
- Providers globais: autenticação, contexto de usuário, React Query
- Configurações gerais da aplicação (env, constantes globais)

**Regra:** nenhuma lógica de feature entra em `app/`. Apenas wiring.

---

## Camada `features/`

Cada pasta representa uma funcionalidade do negócio. Features são
**independentes entre si** — uma feature não importa de outra diretamente.
Dependências compartilhadas vão para `shared/`.

```
features/
├── auth/         ← login e cadastro
├── products/     ← produtos
├── orders/       ← pedidos e carrinho
└── store/        ← lojas
```

### Estrutura interna de cada feature

```
features/<nome>/
├── components/   ← interface visual da feature
├── hooks/        ← lógica de aplicação (React hooks)
├── services/     ← comunicação com o backend
└── types.ts      ← tipagem TypeScript da feature
```

**Regras de cada camada interna:**

| Camada | Responsabilidade | Pode importar de |
|---|---|---|
| `components/` | UI, eventos, renderização | `hooks/`, `shared/components/`, `shared/utils/` |
| `hooks/` | estado, efeitos, orquestração | `services/`, `shared/hooks/`, `shared/utils/` |
| `services/` | chamadas HTTP, mapeamento de dados | `shared/services/api.ts` |
| `types.ts` | interfaces e tipos da feature | nada interno |

---

## Mapeamento de páginas → features

### Login
```
features/auth/
├── components/LoginForm.tsx
├── hooks/useLogin.ts
└── services/authService.ts
```

### Cadastro
```
features/auth/
├── components/RegisterForm.tsx
├── hooks/useRegister.ts
└── services/authService.ts
```

### Página Inicial (Home / Landing)
```
features/store/
├── components/HomePage.tsx
├── hooks/useStore.ts
└── services/storeService.ts
```

### Carrinho
```
features/orders/
├── components/Cart.tsx
├── hooks/useCart.ts
└── services/orderService.ts
```

### Lojas
```
features/store/
├── components/StoreList.tsx
├── hooks/useStores.ts
└── services/storeService.ts
```

---

## Camada `shared/`

Elementos reutilizáveis sem vínculo com nenhuma feature específica.
Se um componente, hook ou função é usado por 2+ features, ele vai para `shared/`.

```
shared/
├── components/   ← Button, Input, Card, Modal, Badge…
├── hooks/        ← useDebounce, usePagination, useLocalStorage…
├── utils/        ← formatCurrency, formatDate, validators…
└── services/
    └── api.ts    ← configuração base do Axios/Fetch (baseURL, interceptors)
```

**Regras:**
- `shared/` nunca importa de `features/`
- `shared/components/` são os componentes do design system (seguir `frontend-design.md`)
- `api.ts` é a única configuração de HTTP — todos os `services/` das features importam daqui

---

## Regras de importação (obrigatórias)

```
✅ features/auth/components → shared/components
✅ features/auth/hooks      → features/auth/services
✅ features/auth/hooks      → shared/hooks
✅ features/auth/services   → shared/services/api.ts

❌ features/auth            → features/orders   (cross-feature import)
❌ shared                   → features/auth     (shared nunca conhece features)
❌ components               → services          (pular camada — sempre via hook)
```

---

## Padrão de nomenclatura

| Tipo | Padrão | Exemplo |
|---|---|---|
| Componente | PascalCase | `LoginForm.tsx` |
| Hook | camelCase com `use` | `useLogin.ts` |
| Service | camelCase com `Service` | `authService.ts` |
| Tipos | PascalCase no `types.ts` | `User`, `Order`, `Product` |
| Utilitário | camelCase | `formatCurrency.ts` |

---

## Exemplo: criando uma nova feature

Para adicionar uma feature de **notificações**:

```
features/notifications/
├── components/
│   ├── NotificationBell.tsx   ← ícone com contador
│   └── NotificationList.tsx   ← lista de notificações
├── hooks/
│   └── useNotifications.ts    ← busca e marca como lida
├── services/
│   └── notificationService.ts ← GET /notifications, PATCH /notifications/:id
└── types.ts                   ← interface Notification { id, title, read, ... }
```

---

## Integração com o Design System

Todos os componentes visuais das features usam a base de `shared/components/`,
que segue as regras definidas em `frontend-design.md`:

- Tailwind com tokens customizados (`#e30507`, `#111111`, `#f5f5f5`)
- shadcn/ui como base estrutural, sempre sobrescrito
- Framer Motion para microinterações
- Props padronizadas: `variant`, `size`, `responsive`

Componentes de feature nunca definem estilos próprios que dupliquem
o que já existe em `shared/components/`. Reutilizar sempre.
