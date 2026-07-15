# Input

Campos de entrada devem ser claros, acessíveis e integrados com React Hook Form + Zod quando houver formulário.

## Input Com Ícone

```tsx
<div className="flex flex-col gap-1.5">
  <label className="text-sm font-semibold text-[#111111]">Nome completo</label>
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]">
      {/* <User size={16} /> */}
    </span>
    <input
      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
      placeholder="Seu nome"
    />
  </div>
</div>
```

## Input de Senha

Campos de senha devem permitir alternar visibilidade quando isso melhorar a usabilidade.

```tsx
<button
  type="button"
  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
>
  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
</button>
```

## Estados

- Foco: `ring-2 ring-[#e30507] border-transparent`
- Erro: `border-red-400 ring-2 ring-red-200`
- Sucesso: `border-green-400`
- Desabilitado: `bg-gray-50 text-gray-400 cursor-not-allowed`

## Regras

- Todo input precisa de label.
- Mensagens de erro devem ficar próximas ao campo.
- Erro dinâmico deve usar `role="alert"` quando apropriado.
- Placeholder deve usar `placeholder:text-gray-400`.
- Campos obrigatórios devem ser validados por schema.
