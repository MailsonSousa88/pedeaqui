# Auth Pages Pattern

Usado para login, cadastro e recuperação de senha do lojista.

## Estrutura

- Página com fundo `surface` (`#f5f5f5`).
- Header simples com logo real `/logoPedeAqui.jpeg`.
- Card centralizado com `max-w-md`, fundo branco, borda sutil e `rounded-2xl`.
- Ícone opcional em container `primary-soft`.
- Título curto, subtítulo explicativo e formulário.
- Links auxiliares abaixo ou próximos ao botão principal.

## Classes de Referência

```tsx
<div className="flex min-h-screen flex-col bg-[#f5f5f5]">
  <header className="flex items-center justify-between px-6 py-4 md:px-10">
    <img src="/logoPedeAqui.jpeg" alt="PedeAqui" className="h-10 w-auto object-contain" />
  </header>
  <main className="flex flex-1 items-center justify-center px-6 py-12">
    <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
      {/* formulário */}
    </section>
  </main>
</div>
```

## Regras

- Não adicionar login social sem requisito.
- Não misturar cadastro completo dentro de login.
- Erro de autenticação deve aparecer dentro do card.
- Ordem de foco deve funcionar por teclado.
- Não recriar a logo com texto ou ícone.
