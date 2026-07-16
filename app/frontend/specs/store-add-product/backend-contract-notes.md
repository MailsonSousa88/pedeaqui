# Notas Para Retomada do Contrato Backend

Esta nota registra o estado atual da tela de adicionar produto antes da integracao real com backend.

A decisao atual e preservar a tela visualmente como esta. A UI esta aprovada e nao deve ser redesenhada apenas por causa do contrato backend. Quando o backend definir endpoint/DTO final, a integracao deve ser feita por adapter e services, mantendo os componentes visuais o mais estaveis possivel.

## Compatibilidades Ja Identificadas

- `name` corresponde a `products.name`.
- `description` corresponde a `products.description`.
- `priceCents` corresponde a `products.price_cents` e deve ser enviado em centavos.
- `categoryId` corresponde a `products.category_id` e pode ser `null`.
- `available` corresponde a `products.available`.
- `promoPriceCents` corresponde a `products.promo_price_cents`.
- `promoEndsAt` corresponde a `products.promo_ends_at`.
- `variations[].label` corresponde a `product_variations.label`.
- `variations[].options[].value` corresponde a `variation_options.value`.
- `variations[].options[].priceModifierCents` corresponde a `variation_options.price_modifier_cents`.

## Pendencias Antes de Conectar

- Confirmar se `promotionEnabled` deve existir no payload ou se promocao sera inferida por `promoPriceCents`.
- `featured`, `stockMode` e `initialStockQuantity` não fazem parte do contrato atual e não devem ser enviados.
- Confirmar fluxo de imagens: a UI usa placeholders, mas backend espera registros em `product_images` com `r2Key`, `url`, `sizeBytes`, `mimeType` e `sortOrder`.
- Confirmar fluxo de categoria inline: categoria nova deve provavelmente ser criada em `categories` antes de associar `categoryId` ao produto.
- Confirmar uso de `details`, pois `products.details` existe como `JSONB`, mas ainda nao esta representado no payload frontend.
- Confirmar envio de `sortOrder` para variacoes e opcoes.

## Recomendacao de Integracao Futura

- Criar um adapter `toCreateProductPayload(formValues)` quando o endpoint existir.
- Separar a integracao em etapas: produto base, categoria, imagens e variacoes.
- Manter `Salvar produto` sem chamada real ate existir contrato backend aprovado.
- Nao alterar a UI visual antes de validar o DTO final do backend.
