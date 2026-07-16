# Card

Cards agrupam informação, ações relacionadas ou itens de listagem.

## Variantes

### Standard

```tsx
<div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
  {/* conteúdo */}
</div>
```

### Featured

Usado para plano recomendado ou produto em destaque.

```tsx
<div className="relative rounded-2xl border-2 border-[#e30507] bg-white p-8 shadow-xl shadow-red-100">
  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
    <span className="whitespace-nowrap rounded-full bg-[#e30507] px-4 py-1.5 text-xs font-bold text-white">
      Mais popular
    </span>
  </div>
</div>
```

### Disabled

```tsx
<div className="rounded-2xl border border-gray-200 bg-white p-8 opacity-60">
  {/* conteúdo */}
</div>
```

## Icon Container

```tsx
<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0f0] p-3 text-[#e30507]">
  {/* <ShoppingBag size={22} /> */}
</div>
```

## Regras

- Não aninhar card dentro de card.
- Não usar card decorativo para cada seção da página sem necessidade.
- Cards de formulário devem ter largura e padding responsivos.
- Cards clicáveis podem usar Framer Motion com `whileHover={{ y: -2 }}`.
