# Contrato frontend: gerenciamento de categorias

## Objetivo

Registrar os contratos externos consumidos pela feature `store-categories` para listar, editar e remover categorias existentes da loja, mantendo a criação exclusivamente no cadastro de produto.

## Fonte

- `docs/records/backend/01-rotas-e-payloads.md`, revisado contra a branch `development` em 16/07/2026.
- Evoluções de categorias reais e da issue #51 registradas em `spec.md`, `clarify.md`, `plan.md` e `tasks.md` desta feature.

## Autenticação e contexto

- A leitura é pública.
- Edição e remoção exigem `Authorization: Bearer <accessToken>`.
- O `storeId` deve vir da loja real carregada no contexto de gestão.
- IDs de loja e categoria não podem ser fixos ou derivados de mocks.

## Listar categorias

```http
GET /api/categories/store/:storeId
Accept: application/json
```

- Sem body e sem Bearer token.
- Lista categorias não excluídas da loja.
- A ordenação é feita pelo backend por `sortOrder`.
- A RLS pública exige tenant ativo e loja ativa e não excluída.
- O registro de rotas não detalha um DTO completo de resposta; a feature não deve inventar campos.

Campos mínimos consumidos:

```ts
type ManagedCategoryDto = {
  id: string
  storeId: string
  name: string
  description?: string | null
  sortOrder: number
}
```

O contador de produtos por categoria não faz parte do contrato documentado desta rota. Ele é derivado pela composição com a listagem pública de produtos descrita a seguir.

## Carregar produtos para os contadores

```http
GET /api/products/store/:storeId
Accept: application/json
```

- Sem body e sem Bearer token.
- Retorna somente produtos publicamente visíveis da loja.
- A feature consome apenas os campos necessários para calcular os contadores:

```ts
type CategoryCountProductDto = {
  id: string
  categoryId: string
}
```

Composição:

- o contador de uma categoria específica é a quantidade de produtos retornados cujo `categoryId` corresponde ao ID da categoria;
- o contador de `Todos` é a quantidade total de produtos retornados;
- o resultado representa somente produtos públicos devolvidos por essa rota, não um total administrativo de produtos indisponíveis ou excluídos;
- o frontend não deve fixar contadores nem criar produtos mockados para completar a informação.

## Editar categoria

```http
PUT /api/categories/:id
Authorization: Bearer <accessToken>
Content-Type: application/json
```

Payload parcial:

```ts
type UpdateCategoryRequest = Partial<{
  name: string
  description: string
  sortOrder: number
}>
```

Exemplo:

```json
{
  "name": "Bebidas geladas",
  "description": "Nova descrição",
  "sortOrder": 2
}
```

A categoria deve pertencer à loja do tenant autenticado. A interface atual edita o nome; `description` e `sortOrder` só devem ser enviados quando houver controles aprovados para esses campos.

## Remover categoria

```http
DELETE /api/categories/:id
Authorization: Bearer <accessToken>
```

- Sem body.
- Executa soft delete.
- A categoria deve pertencer ao tenant autenticado.
- A loja não pode ficar sem categoria ativa.
- Categoria com produtos ativos vinculados não pode ser removida.

Conflitos documentados:

```text
409 Conflict: A loja deve possuir pelo menos uma categoria ativa.
409 Conflict: Remova ou inative os produtos desta categoria antes de exclui-la.
```

A categoria sistêmica `Todos` deve permanecer protegida pela interface. O backend continua sendo a autoridade final sobre a remoção.

## Criação de categoria

`POST /api/categories` existe no backend, mas não é consumido pela tela de gerenciamento. A criação pertence exclusivamente ao fluxo inline da spec `store-add-product`.

Esta feature não deve reintroduzir formulário, botão, handler ou service de criação.

## Falhas e estados

- Falha de listagem: exibir estado de erro com nova tentativa.
- Falha de edição: preservar o valor anterior e manter a ação disponível para nova tentativa.
- Conflito de remoção: traduzir a regra para linguagem compreensível sem expor SQL, RLS ou stack trace.
- Falha de rede ou autorização: não aplicar mutação otimista definitiva antes da confirmação da API.

## Limitações conhecidas

- Não existe endpoint agregado de contador de produtos por categoria; a tela deriva a contagem pela listagem pública de produtos.
- Não existe operação específica de reordenação; `sortOrder` é atualizado pelo `PUT` parcial.
- A documentação registra que alguns repositórios usam cliente global com anon key mesmo após o middleware validar o token. O frontend deve enviar o Bearer token normalmente e tratar eventual falha de RLS sem tentar contorná-la.
- Nenhuma alteração de backend, banco, Supabase ou RLS é autorizada por este contrato.
