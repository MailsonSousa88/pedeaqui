# Spec: checkout-review

## Objetivo

Permitir que o lojista revise o plano escolhido no onboarding, entenda os beneficios e a seguranca do pagamento, e acione uma logica preparada para futuro redirecionamento ao ambiente seguro da Stripe, sem que o PedeAqui colete dados financeiros diretamente.

## Fonte da Tela

- Screen: `../../docs/screens/screen-checkout-review-0007.md`
- Flow: `merchant-flow`
- Posicao no fluxo: apos cadastro do lojista, pre-configuracao da loja e validacao/revisao dos dados obrigatorios; antes do redirecionamento para Stripe.
- RFs/RNFs: `RF014A`, `RF014B`, `RF016`, `RF031`, `RNF0003`, `RNF0010`, `RNF0015`, `RNF0016`, `RNF0018`
- Use cases: `docs/requirements/use-cases/lojista/use-case-lojista-0001.md`
- User stories: `docs/requirements/user-stories/lojista/user-story-lojista-0003.md`
- Edge cases: `edge-case-payment-0002-webhook-pagamento`, `edge-case-subscription-0001`, `edge-case-subscription-0003-inadimplencia-e-status`

## Escopo

- Exibir a revisao do plano selecionado pelo lojista.
- Exibir nome, valor, periodo de cobranca e beneficios do plano.
- Exibir metodos de pagamento aceitos de forma informativa.
- Informar que o pagamento sera processado com seguranca pela Stripe.
- Permitir iniciar a logica preparada para redirecionamento de pagamento externo.
- Tratar estado de carregamento ao preparar o redirecionamento.
- Tratar erro quando nao for possivel iniciar o pagamento.

## Fora de Escopo

- Coletar dados de cartao, PIX ou qualquer dado financeiro dentro do PedeAqui.
- Ativar o lojista nesta tela.
- Confirmar pagamento apenas pelo clique no botao ou pelo retorno visual da Stripe.
- Implementar webhook, backend, endpoints, banco de dados ou regras de assinatura.
- Alterar o plano selecionado nesta tela.
- Exibir dashboard, CRUD de produtos, login, cadastro ou pre-registro da loja.
- Tornar a loja publica antes da confirmacao de pagamento.
- Exibir botao `Voltar` nesta entrega.
- Redirecionar de fato para Stripe enquanto Stripe Checkout e endpoint real nao estiverem configurados.

## Requisitos Funcionais

### RF-FE-001

Como lojista em onboarding, quero visualizar o plano selecionado, para confirmar que estou pagando pelo plano correto antes de sair para a Stripe.

Criterios de aceite:

- A tela deve exibir `Plano Basico`.
- A tela deve exibir `R$ 29,99/mes` enquanto esse for o valor aprovado para o MVP.
- A tela deve exibir o badge `Cobranca mensal`.
- O valor exibido deve representar dado de configuracao/contrato do fluxo, nao digitacao manual do usuario.

### RF-FE-002

Como lojista, quero ver os beneficios incluidos no plano, para entender o que sera liberado apos a ativacao.

Criterios de aceite:

- A tela deve listar os beneficios: `Criar loja no PedeAqui`, `Cadastrar produtos`, `Receber pedidos dos clientes` e `Gerenciar pedidos recebidos`.
- Os beneficios devem ser escaneaveis e acompanhados por icones ou marcadores acessiveis.

### RF-FE-003

Como lojista, quero entender que o pagamento ocorre em ambiente seguro, para confiar no redirecionamento para Stripe.

Criterios de aceite:

- A tela deve informar que o pagamento e processado pela Stripe.
- A tela deve informar que dados financeiros nao sao armazenados pelo PedeAqui.
- A tela nao deve solicitar cartao, chave PIX, dados bancarios ou comprovante.

### RF-FE-004

Como lojista, quero continuar para pagamento, para iniciar a etapa de contratacao do plano quando a integracao estiver disponivel.

Criterios de aceite:

- O botao principal deve usar o texto `Continuar para pagamento`.
- Ao clicar, a tela deve entrar em estado de carregamento e impedir multiplos cliques.
- A estrutura deve ficar preparada para redirecionar para a Stripe quando o endpoint/link real existir.
- Nesta entrega, nao deve ocorrer redirecionamento externo real.
- Se nao houver redirecionamento disponivel, a tela deve exibir `Nao foi possivel realizar o redirecionamento para a plataforma de pagamento` e manter o lojista na revisao.

### RF-FE-005

Como sistema, quero bloquear continuidade quando nao houver plano selecionado, para impedir pagamento sem contexto minimo.

Criterios de aceite:

- A tela deve depender de um `planId` selecionado no fluxo.
- Se nao houver plano selecionado, a tela nao deve permitir continuar para pagamento.
- A tela nao deve inventar plano ou valor quando o contexto estiver ausente.

### RF-FE-006

Como sistema, quero impedir interpretacoes erradas sobre ativacao, para garantir que a conta so seja liberada apos confirmacao segura.

Criterios de aceite:

- A tela deve comunicar que o pagamento sera concluido no ambiente seguro da Stripe quando a integracao estiver disponivel.
- A tela nao deve dizer que a loja ja esta ativa.
- A ativacao deve permanecer dependente de webhook valido, conforme `RF014B` e `RNF0003`.

## Estados

- Inicial: header com logo, badge `Plano selecionado`, card central com plano, beneficios, metodos de pagamento, aviso de seguranca e botoes.
- Loading: apos clique em `Continuar para pagamento`, o botao principal indica processamento e nao aceita novo clique.
- Erro: mensagem `Nao foi possivel realizar o redirecionamento para a plataforma de pagamento` quando nao houver redirecionamento disponivel.
- Sucesso: preparado para redirecionamento futuro ao ambiente seguro da Stripe; sem navegacao externa real nesta entrega.
- Vazio: nao se aplica; se nao houver plano selecionado ou contexto de onboarding, a tela deve tratar como erro de fluxo.

## Conteudo da Tela

- Titulos: `Finalize sua ativacao`
- Campos: nenhum campo editavel.
- Botoes: `Continuar para pagamento`.
- Links: nenhum link obrigatorio definido na screen.
- Textos legais: aviso de pagamento seguro, Stripe como processador e nao armazenamento de dados financeiros pelo PedeAqui.
- Badge: `Plano selecionado`.
- Mensagem abaixo do botao: `Voce sera redirecionado para o ambiente seguro da Stripe para concluir o pagamento.`

## Contexto de Jornada

- Entrada esperada: lojista com cadastro iniciado, status pendente, `planId` escolhido e loja pre-registrada/validada no onboarding.
- Proximo passo: acionar logica preparada de criacao/obtencao de sessao de pagamento; redirecionamento real para Stripe fica pendente de integracao futura.
- O que esta tela nao deve resolver: pagamento interno, webhook, ativacao, painel administrativo, alteracao de plano, validacao profunda de backend ou coleta de dados financeiros.

## Ambiguidades Para Clarify

- A rota de retorno deve ser definida futuramente caso o botao `Voltar` volte ao escopo.
- O endpoint/link real de Stripe Checkout deve ser conectado futuramente quando backend e Stripe estiverem prontos.
