---
name: frontend-design
description: >
  Design system completo do PedeAqui. Define tokens visuais, logo padrão,
  componentes, espaçamentos, tipografia, botões, formulários e regras de layout.
  Obrigatório para TODAS as telas do projeto.
---

# Design System — PedeAqui

Atue como design lead de um produto SaaS comercial brasileiro. Cada decisão
de cor, tipo e layout deve ser deliberada. Nenhuma tela pode parecer genérica
ou gerada por padrão — toda interface deve comunicar a identidade do PedeAqui.

---

## Logo (OBRIGATÓRIO EM TODAS AS TELAS)

A logo do PedeAqui está em `public/logoPedeAqui.jpeg`.

**Regras de uso:**

```tsx
// SEMPRE usar a imagem real — nunca recriar a logo com texto/ícone
<img
  src="/logoPedeAqui.jpeg"
  alt="PedeAqui"
  className="h-8 w-auto object-contain"
/>
```

- Usar em: navbar, header de autenticação, footer, telas de onboarding
- Altura padrão: `h-8` (32px) no navbar e footer — `h-10` (40px) em headers de auth
- Nunca distorcer proporção: sempre `object-contain` e `w-auto`
- Nunca recriar a logo com texto "Pede**Aqui**" ou ícone de sacola — usar sempre a imagem
- Fundo ao redor da logo deve ser sempre branco ou claro para garantir legibilidade

---

## Tokens de design

### Cores

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#e30507` | Botões primários, links, destaques, ícones ativos |
| `primary-soft` | `#fff0f0` | Fundo de ícones circulares, badges suaves |
| `primary-hover` | `#b80406` | Hover de botões primários |
| `foreground` | `#111111` | Títulos e textos principais |
| `text-secondary` | `#6b7280` | Subtítulos, descrições, placeholders |
| `text-inverse` | `#ffffff` | Texto sobre fundo vermelho |
| `background` | `#ffffff` | Fundo principal das telas |
| `surface` | `#f5f5f5` | Fundo de seções alternadas, inputs |
| `border` | `#e5e7eb` | Bordas de cards, inputs, divisores |
| `border-brand` | `#e30507` | Borda de cards ativos, inputs em foco |
| `disabled-bg` | `#f3f4f6` | Fundo de botões/cards desabilitados |
| `disabled-text` | `#9ca3af` | Texto de estados desabilitados |
| `success` | `#16a34a` | Badges "Disponível agora", confirmações |
| `success-soft` | `#f0fdf4` | Fundo de badges de sucesso |

> Vermelho (`#e30507`) é cor de ação e identidade — não usar em blocos de texto
> corrido, fundos extensos ou estados de erro sem distinção visual clara.

### Border radius

| Uso | Classe Tailwind |
|---|---|
| Botões e inputs | `rounded-xl` (12px) |
| Cards | `rounded-2xl` (16px) |
| Badges e pills | `rounded-full` |
| Ícones circulares | `rounded-xl` |

### Sombras

| Uso | Classe Tailwind |
|---|---|
| Card padrão | `shadow-sm` |
| Card em destaque | `shadow-xl shadow-red-100` |
| Navbar (ao rolar) | `shadow-sm` |
| Modal | `shadow-2xl` |

---

## Container global (OBRIGATÓRIO)

**Todo conteúdo de toda tela deve estar dentro de um container centralizado.**

```tsx
// Wrapper padrão — usar em TODAS as seções
<div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
  {/* conteúdo */}
</div>
```

- Nunca deixar conteúdo colado nas bordas da tela
- Nunca usar `w-full` sem `max-w` em conteúdo principal
- Seções de fundo colorido podem ser full-width, mas o conteúdo interno sempre tem `max-w-6xl mx-auto`

```tsx
// Exemplo correto de seção com fundo
<section className="bg-[#f5f5f5] py-24">
  <div className="max-w-6xl mx-auto px-6 md:px-10">
    {/* conteúdo centralizado */}
  </div>
</section>
```

---

## Tipografia

### Escala

| Elemento | Classes Tailwind |
|---|---|
| Eyebrow (label de seção) | `text-xs font-bold uppercase tracking-widest text-[#e30507]` |
| Título hero | `text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight` |
| Título de seção | `text-4xl md:text-5xl font-black text-[#111111]` |
| Título de card | `text-xl md:text-2xl font-black text-[#111111]` |
| Subtítulo de seção | `text-lg text-gray-500 font-normal leading-relaxed` |
| Corpo | `text-sm md:text-base text-gray-600 leading-relaxed` |
| Label de campo | `text-sm font-semibold text-[#111111]` |
| Texto auxiliar / legal | `text-xs text-gray-400` |

### Regras
- Títulos: sempre `leading-tight` ou `leading-none`
- Corpo e subtítulos: sempre `leading-relaxed`
- Nunca usar fonte menor que `text-5xl` para o título principal do hero no desktop
- Palavra-chave de destaque no título: `text-[#e30507]` com mesma fonte/peso
- Subtítulos de seção: `max-w-xl mx-auto text-center` quando centralizados

---

## Espaçamentos

### Seções de página
- Padding vertical desktop: `py-24 md:py-32` (nunca menos que `py-16`)
- Padding vertical mobile: `py-14`
- Nunca duas seções coladas sem padding

### Componentes internos
- Gap entre campos de formulário: `gap-4`
- Gap entre botões: `gap-3 md:gap-4`
- Gap entre cards em grid: `gap-6`
- Padding interno de cards: `p-6 md:p-8`
- Padding interno de inputs: `px-4 py-3`

### Cabeçalhos de seção
```tsx
<div className="text-center mb-14">
  <p className="text-xs font-bold uppercase tracking-widest text-[#e30507] mb-3">
    Eyebrow
  </p>
  <h2 className="text-4xl md:text-5xl font-black text-[#111111]">
    Título da Seção
  </h2>
  <p className="text-lg text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
    Subtítulo explicativo em uma ou duas linhas.
  </p>
</div>
```

---

## Navbar

```tsx
<nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 h-16">
  <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
    {/* Logo — SEMPRE usar a imagem real */}
    <img src="/logoPedeAqui.jpeg" alt="PedeAqui" className="h-8 w-auto object-contain" />

    {/* Links — desktop */}
    <div className="hidden md:flex items-center gap-8">
      <a className="text-sm font-medium text-gray-600 hover:text-[#e30507] transition-colors">
        Planos
      </a>
      {/* ... */}
    </div>

    {/* CTA */}
    <button className="bg-[#e30507] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#b80406] transition-colors">
      Começar grátis
    </button>
  </div>
</nav>
```

---

## Botões

### Primário (vermelho)
```tsx
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
  className="bg-[#e30507] text-white px-8 py-4 rounded-xl font-semibold text-base
             hover:bg-[#b80406] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  Ação principal
</motion.button>
```

### Secundário (outline)
```tsx
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="border-2 border-[#111111] text-[#111111] px-8 py-4 rounded-xl font-semibold
             text-base hover:bg-[#111111] hover:text-white transition-all"
>
  Ação secundária
</motion.button>
```

### Outline vermelho (header de auth)
```tsx
<button className="border border-[#e30507] text-[#e30507] px-4 py-2 rounded-xl
                   text-sm font-semibold hover:bg-[#e30507] hover:text-white transition-all">
  Entrar
</button>
```

### Desabilitado ("Em breve")
```tsx
<button
  disabled
  className="w-full bg-[#f3f4f6] text-[#9ca3af] py-4 rounded-xl font-semibold
             text-base cursor-not-allowed"
>
  Em breve
</button>
```

### Tamanhos
| Size | Classes |
|---|---|
| `sm` | `px-4 py-2 text-sm rounded-lg` |
| `md` | `px-6 py-3 text-sm rounded-xl` |
| `lg` | `px-8 py-4 text-base rounded-xl` |
| `full` | adicionar `w-full` |

---

## Formulários

### Input padrão
```tsx
<div className="flex flex-col gap-1.5">
  <label className="text-sm font-semibold text-[#111111]">
    Nome completo
  </label>
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]">
      {/* ícone Lucide */}
    </span>
    <input
      type="text"
      placeholder="Seu nome"
      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm
                 text-[#111111] placeholder:text-gray-400 bg-white
                 focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:border-transparent
                 transition-all"
    />
  </div>
</div>
```

### Input de senha
```tsx
<div className="relative">
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]">
    <Lock size={16} />
  </span>
  <input
    type={showPassword ? "text" : "password"}
    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl text-sm ..."
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
  >
    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
</div>
```

### Estados de validação
- **Foco**: `ring-2 ring-[#e30507] border-transparent`
- **Erro**: `border-red-400 ring-2 ring-red-200` + mensagem `text-xs text-red-500 mt-1`
- **Válido**: `border-green-400`
- **Desabilitado**: `bg-gray-50 text-gray-400 cursor-not-allowed`

> Estado de erro usa vermelho mais claro que o brand para não confundir com identidade visual.

---

## Cards

### Card padrão
```tsx
<div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm
                hover:shadow-md transition-shadow duration-300">
  {/* conteúdo */}
</div>
```

### Card de destaque (plano ativo, feature principal)
```tsx
<div className="bg-white border-2 border-[#e30507] rounded-2xl p-8 shadow-xl shadow-red-100
                relative">
  {/* Badge "Mais popular" */}
  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
    <span className="bg-[#e30507] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
      Mais popular
    </span>
  </div>
  {/* conteúdo */}
</div>
```

### Card inativo / desabilitado
```tsx
<div className="bg-white border border-gray-200 rounded-2xl p-8 opacity-60">
  {/* conteúdo em tons de cinza */}
</div>
```

### Ícone de card
```tsx
// Ativo
<div className="bg-[#fff0f0] p-3 rounded-xl w-12 h-12 flex items-center justify-center text-[#e30507]">
  <ShoppingBag size={22} />
</div>

// Inativo
<div className="bg-gray-100 p-3 rounded-xl w-12 h-12 flex items-center justify-center text-gray-400">
  <Diamond size={22} />
</div>
```

---

## Animações (Framer Motion)

### Microinterações padrão
```tsx
// Botões e cards clicáveis
whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.97 }}
transition={{ duration: 0.2, ease: "easeOut" }}

// Cards de listagem
whileHover={{ y: -2, shadow: "lg" }}
transition={{ duration: 0.2 }}
```

### Entrada de elementos ao rolar (stagger)
```tsx
// Container
<motion.div
  variants={{
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {/* Cada filho */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    }}
  />
</motion.div>
```

### Transições de página / carrossel
```tsx
initial={{ opacity: 0, x: 40 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -40 }}
transition={{ duration: 0.35, ease: "easeInOut" }}
```

**Regras:**
- Nunca empilhar mais de 2 animações simultâneas no mesmo elemento
- Respeitar `prefers-reduced-motion` com `useReducedMotion()` do Framer
- Duração máxima: 0.4s para microinterações, 0.6s para transições de página

---

## Badges e Selos

```tsx
// Disponível agora
<span className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
  <CheckCircle size={12} /> Disponível agora
</span>

// Em breve
<span className="flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
  <Clock size={12} /> Em breve
</span>

// Promoção
<span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
  <Tag size={12} /> Em promoção
</span>
```

---

## Responsividade

Mobile First — sempre. Breakpoints Tailwind: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).

| Contexto | Mobile | Tablet (md) | Desktop (lg) |
|---|---|---|---|
| Grid de cards | 1 coluna | 2 colunas | 3–4 colunas |
| Título hero | `text-4xl` | `text-5xl` | `text-6xl lg:text-7xl` |
| Padding seção | `py-14 px-6` | `py-20 px-10` | `py-28 px-16` |
| Navbar | hamburger | completo | completo |
| Formulário | largura total | `max-w-md` | `max-w-md` |

---

## Layout de autenticação

```tsx
// Estrutura padrão para login e cadastro
<div className="min-h-screen bg-[#f5f5f5] flex flex-col">
  {/* Header */}
  <header className="flex items-center justify-between px-6 md:px-10 py-4">
    <img src="/logoPedeAqui.jpeg" alt="PedeAqui" className="h-10 w-auto object-contain" />
    <div className="flex items-center gap-3 text-sm text-gray-500">
      <span>Já tem uma conta?</span>
      <button className="border border-[#e30507] text-[#e30507] px-4 py-2 rounded-xl
                         text-sm font-semibold hover:bg-[#e30507] hover:text-white transition-all">
        Entrar
      </button>
    </div>
  </header>

  {/* Card central */}
  <main className="flex-1 flex items-center justify-center px-6 py-12">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 w-full max-w-md">
      {/* Ícone circular */}
      <div className="bg-[#fff0f0] w-14 h-14 rounded-xl flex items-center justify-center text-[#e30507] mb-6 mx-auto">
        <UserPlus size={26} />
      </div>
      {/* Título */}
      <h1 className="text-2xl font-black text-[#111111] text-center mb-2">
        Crie sua <span className="text-[#e30507]">conta</span>
      </h1>
      {/* Subtítulo */}
      <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
        Preencha os dados abaixo para criar sua conta no{" "}
        <span className="text-[#e30507] font-semibold">PedeAqui</span>.
      </p>
      {/* Formulário */}
      <form className="flex flex-col gap-4">
        {/* campos */}
      </form>
    </div>
  </main>

  {/* Elemento decorativo — fundo */}
  {/* Shape orgânico vermelho sutil no canto inferior esquerdo via absolute */}
</div>
```

---

## Navegação mobile (bottom nav)

```tsx
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
  <div className="flex items-center justify-around py-3 px-4 max-w-lg mx-auto">
    {/* Item ativo */}
    <button className="flex flex-col items-center gap-1 text-[#e30507]">
      <Home size={22} />
      <span className="text-xs font-semibold">Início</span>
    </button>
    {/* Item inativo */}
    <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
      <Store size={22} />
      <span className="text-xs font-medium">Lojas</span>
    </button>
  </div>
</nav>
```

---

## Footer

```tsx
<footer className="bg-[#111111] text-gray-400">
  <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <img src="/logoPedeAqui.jpeg" alt="PedeAqui"
           className="h-8 w-auto object-contain brightness-0 invert" />
      <div className="flex items-center gap-6 text-sm">
        <a className="hover:text-white transition-colors">Termos de Uso</a>
        <a className="hover:text-white transition-colors">Privacidade</a>
        <a className="hover:text-white transition-colors">Suporte</a>
      </div>
      <p className="text-xs">© 2025 PedeAqui. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>
```

> No footer escuro: aplicar `brightness-0 invert` na logo para versão branca.

---

## Proibições absolutas

- ❌ Recriar a logo com texto ou ícone — sempre usar `/logoPedeAqui.jpeg`
- ❌ Conteúdo sem `max-w` e `mx-auto` — nunca full-width sem container
- ❌ Seções com menos de `py-16` de padding vertical
- ❌ Tailwind sem customização de tokens (cores fora da paleta)
- ❌ Aparência padrão do shadcn/ui sem sobrescrever
- ❌ Animações em excesso (máximo 2 simultâneas por elemento)
- ❌ Vermelho em blocos extensos de texto ou estado de erro sem distinção
- ❌ Grid de produtos no mobile (usar lista vertical)
- ❌ Categoria dentro de card de produto
- ❌ Componentes não reutilizáveis com estilo duplicado

---

## Processo de trabalho (dois passes)

**Passe 1 — Planejar:**
Antes de qualquer código, definir: estrutura de layout, hierarquia de elementos,
quais tokens serão usados, qual é o elemento visual de destaque da tela.

**Passe 2 — Construir e revisar:**
Construir seguindo o plano. Antes de finalizar, checar:
- O container global está aplicado em todas as seções?
- A logo está usando a imagem real?
- Os espaçamentos respeitam a escala definida?
- A tela funciona no mobile?
