# Typography

Escala tipográfica oficial para telas frontend.

| Elemento | Classes Tailwind | Uso |
| --- | --- | --- |
| Eyebrow | `text-xs font-bold uppercase tracking-widest text-[#e30507]` | Rótulo pequeno acima de títulos. |
| Título hero | `text-5xl md:text-6xl lg:text-7xl font-black leading-none` | Landing pages e primeira dobra comercial. |
| Título de tela | `text-2xl md:text-3xl font-bold text-[#111111] leading-tight` | Telas operacionais e formulários. |
| Título de seção | `text-xl md:text-2xl font-semibold text-[#111111] leading-tight` | Seções internas. |
| Título de card | `text-lg md:text-xl font-semibold text-[#111111] leading-snug` | Cards, modais e blocos compactos. |
| Subtítulo | `text-sm md:text-base text-gray-500 leading-relaxed` | Texto explicativo. |
| Corpo | `text-sm md:text-base text-gray-600 leading-relaxed` | Conteúdo geral. |
| Label | `text-sm font-semibold text-[#111111]` | Campos de formulário. |
| Texto auxiliar | `text-xs text-gray-400` | Legendas, hints e termos legais. |

## Regras

- Reservar `text-5xl+` para landing/hero, nunca para cards compactos.
- Telas operacionais devem priorizar leitura, densidade e clareza.
- Textos longos devem usar `leading-relaxed`.
- Não usar letter spacing negativo.
- Subtítulos centralizados devem ter largura limitada quando usados em landing/auth.
