# Contrato frontend - Storefront

## Leitura pública

`GET /api/stores/:slug`

Retorna a loja pública com `id`, `tenantId`, `slug`, `storeName`, horários, endereço, `city`, `state`, descrição, `logoUrl`, WhatsApp, status e timestamps.

Para o consumidor, HTTP 404 representa loja inexistente ou indisponível. O frontend não deve distinguir nem expor se a causa foi loja inativa, tenant suspenso, exclusão lógica ou ausência de direito de uso.

O contrato atual não documenta identificação legal, e-mail público, banner ou situação calculada de funcionamento. Esses dados permanecem ausentes até evolução coordenada do contrato.

## Catálogo público atual

- `GET /api/products/store/:storeId`
- `GET /api/categories/store/:storeId`

Nesta entrega, os endpoints retornam coleções sem parâmetros documentados de paginação, busca, faixa de preço ou ordenação. O frontend pode combinar esses controles em memória e apresentar no máximo 20 produtos por página, sem tratar essa solução como paginação server-side.

Imagens de produto não estão documentadas no contrato atual e devem usar fallback quando não houver URL explícita na resposta.

## Atualização do proprietário

`PUT /api/stores/:id`

Header obrigatório: `Authorization: Bearer <accessToken>`.

Payload parcial suportado nesta fase:

```json
{
  "storeName": "Minha loja",
  "horarioAbertura": "08:00",
  "horarioFechamento": "18:00",
  "endereco": "Rua Exemplo, 123",
  "city": "Sao Paulo",
  "state": "SP",
  "descricao": "Descricao publica",
  "whatsappNumber": "11999999999"
}
```

E-mail, banner e upload de imagem não pertencem a este contrato.

A mutação só pode ser acionada no contexto `/storefront/:slug/manage`. A rota pública consumer não deve renderizar ou disparar essa operação.
