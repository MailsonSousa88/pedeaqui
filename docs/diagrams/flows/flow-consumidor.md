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
    productDetail --> addToCart["Adicionar ao carrinho"]

    classDef integrated fill:#dcfce7,stroke:#166534,color:#14532d;
    classDef partial fill:#fef3c7,stroke:#b45309,color:#78350f;
    classDef blocked fill:#fee2e2,stroke:#b91c1c,color:#7f1d1d;

    class publicUrl,getStore,getCatalog,storefront,search,selectProduct,productUrl,productDetail,addToCart integrated;
    class home,stores,localData partial;
    class genericRoute,missingStore blocked;
```

## Carrinho e finalização atual

```mermaid
flowchart TD
    start([Início]) --> cart["Abrir /market-cart"]
    cart --> loadCart["Carregar localStorage"]
    loadCart --> manage["Gerenciar itens por loja"]
    manage --> chooseStore["Selecionar loja"]
    chooseStore --> hasPhone{"Loja possui WhatsApp?"}
    hasPhone -->|Não| blocked["Botão bloqueado + aviso"]
    hasPhone -->|Sim| form["Preencher dados do pedido"]
    form --> validForm{"Campos válidos?"}
    validForm -->|Não| formError["Exibir erros"]
    formError --> form
    validForm -->|Sim| simulation["Exibir tela de carregamento"]
    simulation --> buildMessage["Montar mensagem formatada"]
    buildMessage --> clearStore["Limpar grupo da loja"]
    clearStore --> openWhatsApp["Abrir wa.me com mensagem"]
    openWhatsApp --> whatsappChat["Consumidor envia mensagem ao lojista"]

    classDef integrated fill:#dcfce7,stroke:#166534,color:#14532d;
    classDef partial fill:#fef3c7,stroke:#b45309,color:#78350f;
    classDef blocked fill:#fee2e2,stroke:#b91c1c,color:#7f1d1d;

    class cart,loadCart,manage,chooseStore,form,simulation,buildMessage,clearStore,openWhatsApp,whatsappChat integrated;
    class formError,blocked blocked;
```

## Limites atuais representados

- `GET /api/stores/public` existe no backend, mas a página geral de lojas ainda recebe `localStores` do frontend.
- A vitrine e o detalhe do produto funcionam quando o consumidor possui um slug válido.
- O detalhe do produto adiciona itens ao carrinho via localStorage.
- O carrinho inicia vazio quando não encontra dados locais.
- O checkout usa validação Zod e temporizadores visuais no navegador.
- Ao confirmar, o sistema monta a mensagem, limpa o carrinho da loja e abre `wa.me` com a mensagem pré-formatada.
- O PedeAqui não envia mensagens em nome do consumidor nem confirma que a mensagem foi enviada.
- Lojas sem WhatsApp cadastrado não permitem finalização do pedido.

