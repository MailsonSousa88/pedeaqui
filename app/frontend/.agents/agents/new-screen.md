# Template: Nova Tela — PedeAqui

Copie e preencha este template quando for pedir uma nova tela ao agente.

---

## Template de prompt

```
Crie a tela de [NOME DA TELA].

Feature: [nome da feature — ex: auth, orders, store, products]
Rota: /[rota — ex: /login, /pedidos, /produtos]
Arquivo principal: features/[feature]/components/[NomeDaTela].tsx

O que a tela deve ter:
- [descreva o elemento 1]
- [descreva o elemento 2]
- [descreva o elemento 3]

Seguir obrigatoriamente:
- .agents/skills/design/frontend-design.md
- .agents/skills/architecture/frontend-architecture.md
```

---

## Exemplos preenchidos

### Tela de Login
```
Crie a tela de Login.

Feature: auth
Rota: /login
Arquivo principal: features/auth/components/LoginForm.tsx

O que a tela deve ter:
- Logo do PedeAqui no header
- Card centralizado com campo de e-mail e senha
- Link "Esqueci minha senha"
- Botão primário "Entrar"
- Link para cadastro abaixo do botão

Seguir obrigatoriamente:
- .agents/skills/design/frontend-design.md
- .agents/skills/architecture/frontend-architecture.md
```

### Tela de Pedidos
```
Crie a tela de Pedidos.

Feature: orders
Rota: /pedidos
Arquivo principal: features/orders/components/OrderList.tsx

O que a tela deve ter:
- Lista vertical de pedidos recebidos
- Card de pedido com: número, cliente, itens resumidos, valor total, status
- Status com badge colorido: Novo (azul), Em preparo (amarelo), Entregue (verde), Cancelado (vermelho claro)
- Filtro de status no topo (chips/pills horizontais)
- Card clicável que abre detalhe do pedido

Seguir obrigatoriamente:
- .agents/skills/design/frontend-design.md
- .agents/skills/architecture/frontend-architecture.md
```

### Tela de Produtos
```
Crie a tela de Produtos.

Feature: products
Rota: /produtos
Arquivo principal: features/products/components/ProductList.tsx

O que a tela deve ter:
- Lista vertical de produtos da loja
- Card de produto com: imagem pequena, nome, descrição curta, preço, selo de promoção quando houver
- Chips de categoria horizontais para filtrar
- Campo de busca + botão filtrar
- Botão flutuante "Adicionar produto" no canto inferior direito

Seguir obrigatoriamente:
- .agents/skills/design/frontend-design.md
- .agents/skills/architecture/frontend-architecture.md
```

---

## Dicas

- Quanto mais detalhe no "O que a tela deve ter", menos o agente inventa por conta própria
- Se a tela tiver uma skill de página específica em `.agents/skills/pages/`, adicione ela ao prompt
- Para ajustes visuais após geração, use o agente `design-reviewer.md` para identificar o que corrigir
