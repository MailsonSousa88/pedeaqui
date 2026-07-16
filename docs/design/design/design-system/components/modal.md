# Modal

Modal é composto por backdrop, caixa central e ação de fechamento. Deve usar Framer Motion para entrada/saída quando a dependência estiver disponível.

## Estrutura

```tsx
<AnimatePresence>
  {isOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:p-8"
      >
        {/* conteúdo */}
      </motion.div>
    </div>
  )}
</AnimatePresence>
```

## Regras

- Modal deve ter título claro, botão de fechar e fechamento por Escape quando possível.
- Backdrop deve impedir interação com conteúdo atrás.
- Conteúdo deve caber no mobile com scroll interno quando necessário.
- Ao abrir modal, travar scroll do fundo quando a implementação permitir.
- Duração de animação deve ficar por volta de `0.2s`.
