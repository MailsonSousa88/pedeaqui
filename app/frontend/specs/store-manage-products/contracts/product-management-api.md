# Contrato Frontend: Product Management API

## Objetivo

Registrar os contratos externos que a feature `store-manage-products` deve consumir sem alterar backend.

## Base

Fontes:

- `../../../../docs/records/backend/01-rotas-e-payloads.md`
- `../../../../docs/records/backend/02-banco-de-dados.md`
- `../../../../docs/records/backend/03-fluxos-principais.md`
- `../../../../docs/records/frontend/01-comunicacao-com-backend.md`

## Autenticacao

- `GET /api/products/store/:storeId` esta documentada como publica nos records.
- `PUT /api/products/:id`, `PATCH /api/products/:id/toggle-availability` e `DELETE /api/products/:id` sao acoes administrativas e devem receber token quando a autenticacao real estiver conectada.
- O frontend deve usar `apiClient` e passar `authToken` pelo service quando disponivel.

## Origem de `storeId`

A origem definitiva de `storeId` ainda nao esta conectada. A implementacao deve depender de uma entrada plugavel/substituivel e nao deve fixar id real, criar loja ou chamar backend de loja fora da task autorizada.

## Endpoints

### Listar produtos da loja

```txt
GET /api/products/store/:storeId
```

Uso:

- Carregar produtos exibidos no painel `Gerenciar produtos`.
- Aplicar busca e filtros no frontend enquanto os records nao documentarem query params.
- Trocar apenas o service se surgir rota administrativa protegida.

Resposta esperada conceitual:

```ts
type ManageProductListItem = {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  description?: string | null;
  priceCents: number;
  promoPriceCents?: number | null;
  promoEndsAt?: string | null;
  details?: Record<string, unknown> | null;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
};
```

### Atualizar produto

```txt
PUT /api/products/:id
```

Payload parcial:

```ts
type UpdateProductPayload = Partial<{
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number;
  promoPriceCents: number | null;
  promoEndsAt: string | null;
  details: Record<string, unknown>;
}>;
```

Regras:

- Produto precisa pertencer ao tenant autenticado.
- Categoria, se alterada, precisa pertencer a mesma loja e nao estar deletada.
- `priceCents` deve ser maior que zero.
- `promoPriceCents`, se enviado, deve ser maior que zero e menor que `priceCents`.
- `promoEndsAt` so deve existir com `promoPriceCents`.
- Nao enviar disponibilidade nesse payload; disponibilidade usa rota dedicada.
- Nao expor edicao livre de `details`.

### Alternar disponibilidade

```txt
PATCH /api/products/:id/toggle-availability
```

Payload:

```txt
Sem body.
```

Uso:

- Botao separado `Pausar` ou `Reativar` no card/lista do produto.
- Nao misturar com `Salvar alteracoes`.

### Remover produto

```txt
DELETE /api/products/:id
```

Uso:

- Soft delete apos confirmacao explicita.
- Produto removido deve sair da listagem apos sucesso.

## Mensagens de erro aprovadas

- Limite de plano atingido: `Voce atingiu o limite de produtos do seu plano. Remova produtos existentes ou revise seu plano antes de cadastrar novos itens.`
- Produto de outra loja/tenant: `Nao foi possivel alterar este produto porque ele pertence a outra loja.`
- Categoria invalida: `Esta categoria nao atende aos criterios da loja. Selecione uma categoria valida para continuar.`
- Categoria removida: `Esta categoria nao pode mais ser utilizada porque foi removida. Escolha outra categoria.`
- Falha de rede: `Nao foi possivel acessar o servidor agora. Verifique sua conexao e tente novamente.`

## Fora do contrato atual

- Upload real de imagens de produto.
- Persistencia de variacoes e opcoes.
- Estoque controlado.
- Edicao livre de `details`.
- Criacao ou descoberta definitiva da loja atual.
