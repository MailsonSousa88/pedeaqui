# Fluxo atual do consumidor

## Escopo

Os diagramas descrevem somente o que o consumidor consegue executar no frontend atual. O ator não precisa de conta. A vitrine pública por slug está conectada ao backend, enquanto a listagem geral, a inclusão no carrinho e a finalização pelo WhatsApp ainda possuem limitações explícitas.

## Descoberta da loja e visualização do produto

```mermaid
flowchart TD
    start([Início]) --> entry{"Forma de entrada?"}

    entry -->|Página inicial| home["Abrir página inicial"]
    home --> stores["Abrir lista de lojas"]
    stores --> localData["Exibir localStores"]
    localData --> genericRoute["Abrir /storefront sem slug"]
    genericRoute --> missingStore["Nenhuma loja selecionada"]

    entry -->|Link público| publicUrl["Abrir /lojas/:slug"]
    publicUrl --> getStore["GET /api/stores/:slug"]
    getStore --> availableStore{"Loja disponível?"}
    availableStore -->|Não| storeError["Exibir indisponibilidade"]
    availableStore -->|Sim| getCatalog["Carregar produtos e categorias"]
    getCatalog --> storefront["Exibir vitrine"]
    storefront --> search["Pesquisar e filtrar"]
    search --> selectProduct["Selecionar produto"]
    selectProduct --> productUrl["Abrir detalhe"]
    productUrl --> validateProduct{"Produto pertence à loja?"}
    validateProduct -->|Não| productError["Exibir indisponibilidade"]
    validateProduct -->|Sim| productDetail["Exibir produto e quantidade"]
    productDetail --> addDisabled["Adicionar ao carrinho desabilitado"]

    classDef integrated fill:#dcfce7,stroke:#166534,color:#14532d;
    classDef partial fill:#fef3c7,stroke:#b45309,color:#78350f;
    classDef blocked fill:#fee2e2,stroke:#b91c1c,color:#7f1d1d;

    class publicUrl,getStore,getCatalog,storefront,search,selectProduct,productUrl,productDetail integrated;
    class home,stores,localData partial;
    class genericRoute,missingStore,addDisabled blocked;
```

## Carrinho e finalização atual

```mermaid
flowchart TD
    start([Início]) --> cart["Abrir /market-cart"]
    cart --> loadCart["Carregar localStorage ou seed"]
    loadCart --> manage["Gerenciar itens por loja"]
    manage --> chooseStore["Selecionar loja"]
    chooseStore --> form["Preencher dados do pedido"]
    form --> validForm{"Campos válidos?"}
    validForm -->|Não| formError["Exibir erros"]
    formError --> form
    validForm -->|Sim| simulation["Executar temporizadores"]
    simulation --> clearStore["Limpar grupo da loja"]
    clearStore --> success["Exibir resumo local"]
    success --> noOrder["Sem pedido no backend"]
    noOrder --> noWhatsapp["Sem abertura do WhatsApp"]

    classDef partial fill:#fef3c7,stroke:#b45309,color:#78350f;
    classDef blocked fill:#fee2e2,stroke:#b91c1c,color:#7f1d1d;

    class cart,loadCart,manage,chooseStore,form,simulation,clearStore,success partial;
    class formError,noOrder,noWhatsapp blocked;
```

## Limites atuais representados

- `GET /api/stores/public` existe no backend, mas a página geral de lojas ainda recebe `localStores` do frontend.
- A vitrine e o detalhe do produto funcionam quando o consumidor possui um slug válido.
- O detalhe do produto não adiciona itens ao carrinho porque a ação está desabilitada.
- O carrinho inicia com dados demonstrativos quando não encontra dados locais.
- O checkout usa apenas validação e temporizadores no navegador.
- Não existe rota de pedido no backend nem redirecionamento atual para `wa.me`.
