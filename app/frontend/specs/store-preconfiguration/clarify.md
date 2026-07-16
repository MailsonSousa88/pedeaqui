# Clarify: store-preconfiguration

## Perguntas

### Q1

Pergunta: Qual rota exata deve ser usada ao clicar em `Voltar ao cadastro`?

Resposta: A tela de pré-registro vem depois do cadastro realizado. O botão `Voltar ao cadastro`, exibido na primeira etapa, deve retornar para a tela/primeira etapa de cadastro do lojista. Caso a rota técnica exata não esteja clara durante o plano ou implementação, perguntar novamente antes de codar a navegação final.

Impacto na spec: A ação `Voltar ao cadastro` não deve voltar para Home, planos ou login. Ela deve retornar para o fluxo de cadastro do lojista.

### Q2

Pergunta: O plano escolhido deve aparecer visualmente nesta tela ou apenas ser preservado em contexto para etapas posteriores?

Resposta: O plano escolhido não deve aparecer nesta tela. Ele só aparece depois que o pré-registro for concluído, na tela de revisão do plano. Nesta tela, o plano deve apenas ser preservado em contexto para as próximas etapas.

Impacto na spec: Não exibir card, resumo, badge, preço ou nome do plano na pré-configuração da loja.

### Q3

Pergunta: O slug da loja será gerado nesta tela, na tela de verificação ou apenas no backend?

Resposta: O slug não será mostrado nesta tela. A geração deve ficar a cargo do backend ou etapa posterior de validação. A tela de pré-configuração não deve exibir campo, preview ou confirmação de slug.

Impacto na spec: Não adicionar campo de slug nem prévia de URL pública.

### Q4

Pergunta: O campo de WhatsApp deve aceitar máscara brasileira fixa ou formato internacional?

Resposta: O campo deve aceitar máscara brasileira fixa. A interface deve permitir que o lojista digite o número sem se preocupar com `+55`.

Impacto na spec: Usar máscara de telefone brasileira para WhatsApp e não exigir digitação manual de prefixo internacional.

### Q5

Pergunta: Os seletores de dia devem aceitar apenas intervalo contínuo ou futuramente múltiplos dias separados?

Resposta: Manter o formato de intervalo contínuo: `De <dia da semana>` até `<dia da semana>`, por exemplo `De Segunda-feira Até Sexta-feira`.

Impacto na spec: Não implementar múltiplos dias avulsos nesta tela.

### Q6

Pergunta: Como tratar funcionamento que atravessa a meia-noite?

Resposta: Não permitir no MVP. A loja deve informar abertura e fechamento no mesmo dia. Exemplo: `18:00` até `02:00` deve ser inválido.

Impacto na spec: O horário de fechamento deve ser posterior ao horário de abertura. Funcionamento atravessando meia-noite fica fora de escopo nesta tela/MVP.

### Q7

Pergunta: A navegação entre etapas deve persistir dados apenas em estado local ou também em storage temporário?

Resposta: Os dados devem ser preservados somente enquanto o lojista estiver na tela de pré-registro durante as 3 etapas. O lojista deve poder avançar, voltar e revisar sem digitar tudo novamente. Depois que a etapa 3 for concluída com sucesso e os dados forem encaminhados para a próxima etapa/backend, essas informações não precisam mais ser preservadas.

Impacto na spec: Preservar estado durante a vida da tela/fluxo de pré-configuração. Não transformar isso em persistência permanente.

### Q8

Pergunta: Ao finalizar, esta tela deve chamar algum endpoint diretamente ou apenas navegar para a tela de verificação, que fará a chamada?

Resposta: Os endpoints ainda não devem ser assumidos como prontos. A implementação deve deixar a lógica preparada como um plug/conector para quando o backend estiver pronto, facilitando a conexão futura. O foco desta tela é coletar, validar localmente, montar o payload e encaminhar o fluxo sem implementar backend.

Impacto na spec: Criar contrato/limite claro para payload e serviço frontend no plano, mas não inventar endpoint backend nem acoplar a tela a uma implementação real inexistente.

## Decisões Registradas

- Atualização de 15/07/2026: o WhatsApp pertence exclusivamente ao cadastro principal (`register`) e não deve ser solicitado novamente na pré-configuração da loja.
- A decisão anterior sobre máscara de WhatsApp nesta tela está superada.
- O payload temporário do pré-registro não contém `whatsappNumber`; a criação da loja reutiliza `session.profile.phone` como `whatsappNumber` no limite de integração com `/api/stores`.

- `Voltar ao cadastro` retorna ao fluxo/tela de cadastro do lojista, não para Home, planos ou login.
- O plano escolhido deve ser preservado em contexto, mas não aparece visualmente nesta tela.
- Slug não aparece e não é editado nesta tela.
- WhatsApp usa máscara brasileira e não exige digitação manual de `+55`.
- Dias de funcionamento usam intervalo contínuo de dia inicial até dia final.
- Funcionamento atravessando meia-noite não será suportado no MVP.
- Dados do formulário devem ser preservados apenas durante o fluxo local das 3 etapas.
- Finalização deve preparar payload e limite de integração, sem inventar backend.

## Pendências

- Nenhuma pendência aberta para esta fase.
