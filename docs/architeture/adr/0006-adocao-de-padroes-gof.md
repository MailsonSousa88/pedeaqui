# 0006 - Adoção de Padrões GoF para Fronteiras Externas e Finalização de Pedidos

## Status

Accepted

## Contexto

O PedeAqui depende de serviços externos para funcionalidades como armazenamento de imagens, pagamento, persistência de dados e comunicação com as lojas por meio do WhatsApp.

Caso os casos de uso ou rotas dependam diretamente das SDKs desses provedores, a lógica de negócio ficará acoplada a decisões de infraestrutura que podem mudar ao longo do projeto. Isso dificultaria a troca de serviços, aumentaria o impacto de mudanças externas e reduziria a testabilidade do sistema.

Além disso, o fluxo de finalização de pedido via WhatsApp concentra validações de produtos, preços, disponibilidade, estoque, criação do pedido e geração da mensagem para a loja. As regras de estoque podem variar conforme o modo configurado para cada produto e podem crescer no futuro.

Se essas variações forem implementadas por meio de condicionais extensos e os efeitos secundários forem mantidos dentro do mesmo fluxo, o código ficará mais difícil de manter, testar e evoluir durante o Spec-Driven Development.

## Decisão

Adotamos padrões de projeto GoF nos pontos críticos de acoplamento identificados no PedeAqui.

### Adapter e Factory nas fronteiras externas

As integrações externas serão acessadas por meio de interfaces internas, como contratos para armazenamento, pagamento e comunicação.

As implementações concretas dessas interfaces serão adapters localizados na camada de infraestrutura, isolando o core das SDKs e dos provedores utilizados.

Quando houver mais de uma implementação possível ou a escolha depender da configuração do ambiente, uma Factory será responsável por criar o adapter adequado. Os casos de uso não devem instanciar diretamente implementações de provedores externos.

O fluxo de criação e uso dos adapters seguirá a estrutura abaixo:

```text
+---------------------------------------------------+
|                     CLIENTE                       |
|                   Caso de Uso                     |
|            (Só conhece a Interface)               |
+---------------------------------------------------+
            |
            | 1. Solicita uma implementação
            v
+--------------------+
|      CRIAÇÃO       |
|  ProviderFactory   |
|     .create()      |
+--------------------+
            |
            | 2. Instancia e retorna
            v
+---------------------------+
|         ESTRUTURA         |
|                           |
| << Interface >>           |
| StorageProvider           |
|          ^                |
|          | implementa     |
|          |                |
| CloudflareR2Adapter       |
| (Traduz o contrato para   |
|  a SDK externa)           |
+---------------------------+
            |
            | 3. Executa a operação
            v
+---------------------------+
|       MUNDO EXTERNO       |
|          R2 SDK           |
+---------------------------+
```

Nesse fluxo, o caso de uso conhece apenas a interface interna. A Factory seleciona e cria a implementação concreta, enquanto o adapter traduz o contrato do sistema para a SDK externa.

### Strategy nas regras de estoque

O padrão Strategy será utilizado para separar as diferentes regras de estoque aplicadas durante a finalização do pedido.

Os modos de estoque livre e estoque controlado terão estratégias próprias, permitindo que o fluxo principal execute o comportamento correspondente sem concentrar todas as regras em blocos de `if/else`.

Novos modos de estoque poderão ser adicionados por meio de novas estratégias, sem alterar diretamente a lógica principal da finalização do pedido.

### Observer nos efeitos secundários

O padrão Observer será utilizado para tratar efeitos secundários independentes após a criação válida de um pedido, como auditoria, métricas e futuras notificações.

Validações, atualização obrigatória de estoque e criação do pedido continuarão fazendo parte do fluxo principal. O Observer será aplicado apenas às ações que possam ser desacopladas sem comprometer a consistência do pedido.

Os padrões serão utilizados somente onde houver necessidade real de variação ou desacoplamento, evitando abstrações desnecessárias.

## Consequências

### Positivas

* Redução do acoplamento entre regras de negócio e serviços externos.
* Facilidade para substituir provedores sem alterar os casos de uso.
* Maior testabilidade por meio de mocks e implementações alternativas.
* Regras de estoque organizadas em comportamentos independentes.
* Menor crescimento de condicionais no fluxo de finalização do pedido.
* Efeitos secundários desacoplados da criação do pedido.
* Contratos internos mais claros para o Spec-Driven Development.

### Negativas

* Aumento do número de interfaces, classes e arquivos.
* Maior complexidade inicial para um MVP.
* Necessidade de o time compreender e aplicar corretamente cada padrão.
* Risco de criar abstrações antes de existir necessidade real.
* Necessidade de manter os contratos internos alinhados com as implementações.

## Riscos

* Casos de uso acessarem diretamente SDKs externas, ignorando os adapters.
* Instanciação de implementações concretas fora das factories ou do ponto de composição.
* Aplicação de Strategy em regras simples que não apresentam variação real.
* Uso de Observer para operações que deveriam permanecer obrigatórias e transacionais.
* Criação excessiva de abstrações e aumento desnecessário da complexidade.
* Abandono parcial dos padrões durante períodos de pressão por entrega.