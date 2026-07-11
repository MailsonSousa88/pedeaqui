# Colors

Tokens oficiais do PedeAqui para consistencia visual da interface.

| Token | Valor | Uso |
| --- | --- | --- |
| `primary` | `#e30507` | Vermelho de marca: acoes principais, links ativos, destaques e icones de acao. |
| `primary-hover` | `#b80406` | Hover/ativo de botoes primarios. |
| `primary-soft` | `#fff0f0` | Fundo suave para badges, icones, cards clicaveis e destaques leves. Nao usar como fill de hover para botoes secundarios. |
| `foreground` | `#111111` | Titulos, labels e textos de alto contraste. Nao usar como fill, borda de hover ou ring de foco de botoes. |
| `text-secondary` | `#6b7280` | Subtitulos, descricoes e placeholders. |
| `text-inverse` | `#ffffff` | Texto sobre fundos escuros ou vermelhos. |
| `background` | `#ffffff` | Fundo principal e containers brancos. |
| `surface` | `#f5f5f5` | Fundo alternado e areas de formulario. |
| `border` | `#e5e7eb` | Divisorias e bordas padrao. |
| `border-soft` | `gray-300` | Borda padrao para botoes secundarios/outline em repouso. |
| `border-brand` | `#e30507` | Foco, hover de outline ou card ativo. |
| `disabled-bg` | `#f3f4f6` | Fundo de elementos desabilitados. |
| `disabled-text` | `#9ca3af` | Texto desabilitado. |
| `success` | `#16a34a` | Mensagem, badge ou status de sucesso. |
| `success-soft` | `#f0fdf4` | Fundo sutil de sucesso. |
| `danger` | `#dc2626` | Erros e acoes destrutivas. |

## Contrato de Interacao de Botoes

| Tipo | Normal | Hover | Proibido |
| --- | --- | --- | --- |
| Primario | `bg-[#e30507] text-white` | `hover:bg-[#b80406] text-white` | Hover sem feedback ou hover escuro/preto. |
| Secundario/outline | `bg-white border-gray-300 text-[#111111]` | `hover:border-[#e30507] hover:text-[#e30507]` mantendo `bg-white` | `hover:bg-[#111111]`, `hover:text-white`, `hover:bg-[#fff0f0]`, borda preta. |
| Destrutivo outline | `bg-white border-[#dc2626]/30 text-[#dc2626]` | `hover:border-[#dc2626]` mantendo `bg-white` | Hover preto ou hover que confunda com acao primaria. |
| Destrutivo final | `bg-[#dc2626] text-white` | `hover:bg-red-700 text-white` | Usar como acao secundaria comum. |

## Regras

- Vermelho `primary` deve ser usado como cor de acao e marca.
- Nao usar vermelho em blocos extensos de fundo ou texto corrido.
- Erros devem usar tons semanticos de erro, sem confundir com a identidade da marca.
- Preto/foreground `#111111` e tons escuros nao podem ser usados como fill, hover, borda de hover ou ring de foco de botoes operacionais.
- Botoes primarios usam `primary` no normal e `primary-hover` no hover.
- Botoes secundarios/outline usam fundo branco, borda soft (`gray-300`) e hover apenas com borda/texto `primary`, sem preenchimento.
- O hover de botao secundario nao deve usar `primary-soft`; esse token fica para badges, icones, cards clicaveis e destaques leves.
- Novas cores so podem aparecer se forem registradas neste arquivo ou justificadas no `plan.md`.
