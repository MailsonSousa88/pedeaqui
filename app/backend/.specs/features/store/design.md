# Store - Design atual / Autoritativo

## Autoridade
- `src/routes/store.routes.ts`
- `src/controllers/store/StoreController.ts`
- `src/useCases/store/*`
- `src/repositories/supabase/SupabaseStoreRepository.ts`
- `src/repositories/supabase/SupabaseSubscriptionRepository.ts`
- `src/repositories/supabase/SupabaseCategoryRepository.ts`
- `src/models/Store.ts`
- `src/models/Category.ts`

## Camadas Confirmadas
- Route aplica auth nas operacoes de lojista e deixa leitura por slug publica.
- `StoreController` instancia repositories Supabase e use cases.
- Use cases aplicam ownership, assinatura ativa, unicidade por tenant/slug e soft delete.
- Repository Supabase filtra registros com `deleted_at IS NULL` nas buscas.
- `Store` valida slug e nome obrigatorios.

## Fluxos Confirmados
- Criar store: auth -> controller injeta tenantId -> verifica assinatura ativa -> verifica loja existente -> verifica slug -> cria store -> cria categoria `Todos`.
- Atualizar store: busca por id nao deletado -> valida tenant -> opcionalmente valida novo slug -> atualiza campos.
- Toggle: busca por id -> valida tenant -> atualiza `active`.
- Soft delete: busca por id -> valida tenant -> seta `deletedAt` e `active=false`.
- Public get by slug: busca por slug nao deletado -> ajusta resposta para `active=false` fora do horario.

## Decisoes Confirmadas
- O backend assume uma loja por tenant.
- Categoria padrao e criada no fluxo de store para sustentar produto com categoria obrigatoria.
- Indisponibilidade manual ou por horario e representada no payload, nao por status HTTP especifico.

## Gaps Reais
- Falta transacao envolvendo store e categoria padrao.
- Contrato de horarios da aplicacao contradiz o schema atual.
- A cascata de soft delete e uma regra de banco, nao coberta diretamente por use case.
