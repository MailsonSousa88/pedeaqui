# Button

Botoes devem usar Tailwind para estilo e Framer Motion para microinteracoes quando a dependencia estiver disponivel.

Este componente e normativo para o Spec Driven Development do frontend. Ao criar ou alterar qualquer botao, siga as variantes abaixo antes de inventar classes novas.

## Contrato Obrigatorio

### Primary

Use para a acao principal da tela, formulario ou modal.

- Normal: fundo `#e30507`, texto branco, sem borda aparente.
- Hover: fundo `#b80406`, texto branco.
- Focus: ring vermelho `#e30507`.
- Exemplos: `Salvar produto`, `Salvar alteracoes`, `Confirmar`, `Entrar`, `Cadastrar`.

```tsx
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e30507] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b80406] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
>
  Acao principal
</motion.button>
```

### Secondary Outline

Use para voltar, cancelar, limpar filtros, editar, navegar, fechar ou qualquer acao auxiliar.

- Normal: fundo branco, borda soft `gray-300`, texto `#111111`.
- Hover: fundo branco, sem fill, borda `#e30507`, texto `#e30507`.
- Focus: ring vermelho `#e30507`.
- Exemplos: `Cancelar`, `Voltar para cards`, `Limpar filtros`, `Editar`.

```tsx
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
>
  Acao secundaria
</motion.button>
```

### Destructive

Use para acoes destrutivas. A acao destrutiva pode ser outline ou preenchida quando for confirmacao final.

- Acao destrutiva comum: fundo branco, borda vermelha suave, texto `#dc2626`, hover sem fill agressivo.
- Confirmacao destrutiva final: fundo `#dc2626`, texto branco, hover `red-700`.
- Exemplos: `Remover`, `Confirmar remocao`.

```tsx
<button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dc2626]/30 bg-white px-5 py-3 text-sm font-semibold text-[#dc2626] transition-all hover:border-[#dc2626] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:ring-offset-2">
  Remover
</button>
```

### Disabled

```tsx
<button
  disabled
  className="w-full cursor-not-allowed rounded-xl bg-[#f3f4f6] py-3 text-sm font-semibold text-[#9ca3af]"
>
  Em breve
</button>
```

## Tamanhos

| Tamanho | Classes | Uso |
| --- | --- | --- |
| `sm` | `px-4 py-2 text-sm rounded-lg` | Acoes compactas. |
| `md` | `px-5 py-3 text-sm rounded-xl` | Formularios, filtros e modais. |
| `lg` | `px-8 py-4 text-base rounded-xl` | CTAs de landing/hero. |
| `full` | adicionar `w-full` | Mobile e formularios. |

## Proibido

- Nao usar `hover:bg-[#111111]`, `hover:bg-black`, `hover:bg-slate-*` ou qualquer fill escuro em botoes operacionais.
- Nao usar `hover:text-white` em botoes outline.
- Nao usar borda preta como padrao de botao secundario. Use `border-gray-300`.
- Nao usar `#111111` como cor de hover, borda de hover ou ring de foco para botoes.
- Nao preencher botoes secundarios com `#fff0f0` no hover. O hover secundario muda apenas borda e texto para vermelho.
- Nao transformar acao secundaria em botao primario para chamar atencao.

## Regras

- O design do botao `Cancelar` e a referencia oficial para botoes secundarios.
- O design do botao `Salvar produto` e a referencia oficial para botoes primarios.
- Botao em loading deve exibir feedback e bloquear multiplos cliques.
- Acao destrutiva deve ser visualmente distinta.
- Botoes devem ter foco visivel.
- Nao usar Framer Motion em botao desabilitado.
