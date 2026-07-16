# Badge

Badges indicam status curto, destaque, categoria ou disponibilidade.

## Variantes

### Success

```tsx
<span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
  <CheckCircle size={12} /> Disponível agora
</span>
```

### Neutral

```tsx
<span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-400">
  <Clock size={12} /> Em breve
</span>
```

### Promo

```tsx
<span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
  <Tag size={12} /> Em promoção
</span>
```

## Regras

- Texto curto.
- Cor semântica.
- Formato sempre pill: `rounded-full`.
- Padding padrão: `px-3 py-1`.
- Não usar badge como botão.
