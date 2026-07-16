# Clarify: checkout-review

## Perguntas

### Q1

Pergunta: Qual rota exata o botao `Voltar` deve usar?

Resposta: O botao `Voltar` deve ser removido desta tela por enquanto. Nao devemos enviar o lojista de volta diretamente para a tela de pre-registro da loja, pois esse retorno ainda exige uma decisao melhor de fluxo.

Impacto na spec: Remove a acao secundaria `Voltar` do escopo atual e simplifica a tela para manter apenas a acao principal.

### Q2

Pergunta: Qual rota ou comportamento deve ser usado quando nao existir plano selecionado no contexto?

Resposta: Se nao houver plano selecionado no contexto, o lojista nao pode prosseguir para pagamento.

Impacto na spec: A tela deve bloquear continuidade quando o plano nao estiver definido e nao deve renderizar dados inventados como se fossem contexto valido.

### Q3

Pergunta: Qual rota ou comportamento deve ser usado quando a loja ainda nao estiver pre-registrada ou validada?

Resposta: A tela de redirecionamento so deve ser acessivel apos o fluxo anterior estar concluido: cadastro realizado e pre-registro da loja aceito. Como as conexoes reais entre frontend, backend, loja e Stripe ainda nao estao finalizadas, a implementacao atual deve focar na tela visual e no preparo da logica, sem liberar funcionalidade real de pagamento.

Impacto na spec: A tela deve considerar como pre-condicao o fluxo anterior concluido, mas nesta entrega nao deve implementar validacao real de backend para essa regra.

### Q4

Pergunta: O redirecionamento para Stripe nesta primeira implementacao deve usar mock/local adapter ou ja existe contrato de endpoint esperado para criar a sessao?

Resposta: Nao deve acontecer redirecionamento real ainda. A implementacao deve deixar a estrutura preparada para conectar o endpoint/link de Stripe Checkout no futuro. Por enquanto, usar uma abordagem local/mock/adapter para isolar essa responsabilidade.

Impacto na spec: O service deve ser desacoplado e preparado para substituicao futura por endpoint real, sem inventar backend nem chamar Stripe diretamente nesta entrega.

### Q5

Pergunta: Qual deve ser o texto exato do estado de erro para falha ao criar sessao de pagamento?

Resposta: `Nao foi possivel realizar o redirecionamento para a plataforma de pagamento`

Impacto na spec: Define copy visivel ao usuario e estado de erro.

### Q6

Pergunta: O plano exibido deve vir de estado local/contexto temporario do onboarding ou de uma fonte mockada de planos enquanto nao houver backend?

Resposta: Por enquanto os planos existem apenas como contexto/casca no frontend. A ideia e preservar o ID do plano escolhido ate esta tela. Futuramente esse ID sera enviado ao backend para identificar o plano. Nesta entrega, considerar apenas o plano Basico.

Impacto na spec: A tela deve trabalhar com o conceito de `planId` selecionado e exibir o plano Basico como unico plano disponivel no MVP.

### Q7

Pergunta: O botao `Continuar para pagamento` deve navegar para uma URL externa real, para uma rota placeholder, ou apenas simular sucesso durante o MVP frontend?

Resposta: A rota/fluxo real deve ficar preparado, mas nao havera redirecionamento externo real nesta entrega porque Stripe Checkout e endpoint ainda nao estao configurados.

Impacto na spec: O botao deve acionar a logica preparada de pagamento, mas sem navegar para uma URL real enquanto nao existir integracao. Se nao houver redirecionamento disponivel, deve mostrar o erro definido na Q5.

## Decisoes Registradas

- Remover o botao `Voltar` da tela nesta entrega.
- Bloquear continuidade quando nao houver plano selecionado.
- Considerar que a tela depende de cadastro e pre-registro concluidos, mas sem implementar validacao real de backend nesta entrega.
- Preparar service/adapter para Stripe Checkout futuro, sem redirecionamento real agora.
- Usar a mensagem `Nao foi possivel realizar o redirecionamento para a plataforma de pagamento` quando nao houver redirecionamento disponivel.
- Trabalhar com `planId` como contexto do plano escolhido e exibir apenas o plano Basico no MVP.

## Pendencias

- Definir futuramente a rota de retorno caso o botao `Voltar` volte ao escopo.
- Conectar endpoint/link real de Stripe Checkout quando backend e Stripe estiverem prontos.
