# Motion

Framer Motion é a biblioteca padrão para microinterações e transições do frontend.

## Usos Permitidos

- hover/tap de botões e cards clicáveis;
- entrada e saída de modais;
- feedback leve em elementos interativos;
- transições curtas entre estados de UI.

## Valores Base

- Hover em botão: `scale: 1.03`
- Tap em botão: `scale: 0.97`
- Elevação de card clicável: `y: -2`
- Duração padrão: `0.2s`
- Easing padrão: `easeOut`

## Regras

- Não usar animação em excesso.
- Não animar layout de forma que cause deslocamento inesperado.
- Não tornar informação dependente de animação.
- Respeitar `prefers-reduced-motion` em interações relevantes.
- Se Framer Motion ainda não estiver instalado, o `plan.md` deve registrar a dependência antes da implementação.
