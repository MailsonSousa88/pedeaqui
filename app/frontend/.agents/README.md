# .agents — PedeAqui

Pasta de configuração de agentes de IA para o projeto PedeAqui.
Funciona com qualquer agente compatível com arquivos de instrução em Markdown.

---

## Estrutura

```
.agents/
├── README.md                        ← este arquivo
│
├── skills/                          ← regras reutilizáveis (lidas em conjunto)
│   ├── design/
│   │   └── frontend-design.md       ← tokens, logo, componentes, animações
│   ├── architecture/
│   │   └── frontend-architecture.md ← estrutura de pastas, features, camadas
│   └── pages/
│       └── page-home.md             ← estrutura da landing page
│
└── agents/                          ← agentes prontos por função
    ├── frontend-dev.md              ← agente para criar e editar telas
    ├── design-reviewer.md           ← agente para revisar design e consistência
    └── new-screen.md                ← template de prompt para nova tela
```

---

## Como usar

### No Kiro
Coloque a pasta `.agents/` na raiz do projeto.
O Kiro detecta automaticamente os arquivos em `skills/` e os aplica como contexto.

Para referenciar uma skill específica num prompt:
```
Crie a tela de Login seguindo .agents/skills/design/frontend-design.md
e .agents/skills/architecture/frontend-architecture.md
```

### No Cursor / Claude Code
Referencie os arquivos diretamente no prompt ou configure como "rules" no settings do editor.

---

## Regra de ouro

Toda tela criada no projeto deve seguir obrigatoriamente:
1. `skills/design/frontend-design.md` — visual e componentes
2. `skills/architecture/frontend-architecture.md` — onde criar os arquivos
3. `skills/pages/<page>.md` — se existir uma skill específica para a página

---

## Adicionando novas skills

Ao criar uma nova tela recorrente (ex: dashboard, pedidos), documente em `skills/pages/`.
Siga o mesmo formato do `page-home.md`: seções, estrutura de componentes e checklist final.
