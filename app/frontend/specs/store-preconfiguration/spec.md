# Spec: store-preconfiguration

## Objetivo

Permitir que o lojista recém-cadastrado realize a pré-configuração inicial da sua loja em um formulário por etapas, informando dados de identidade, CNPJ opcional, funcionamento e endereço antes de seguir para a validação do pré-registro e, depois, para a revisão do plano e pagamento.

Esta tela existe para garantir que a loja possua informações mínimas antes da ativação do lojista e antes de qualquer publicação pública da vitrine.

## Fonte da Tela

- Screen: `../../docs/screens/screen-store-preconfiguration-0005.md`
- Flow: `merchant-flow`
- Posição no fluxo: após `screen-register-0003.md` e antes de `screen-store-preregistration-validation-0009.md`
- RFs/RNFs: `RF014A`, `RF016`, `RF017`, `RNF0004`, `RNF0015`, `RNF0016`, `RNF0018`
- Use cases: `use-case-lojista-0001`, `use-case-lojista-0002`
- User stories: `user-story-lojista-0001`, `user-story-lojista-0002`
- Edge cases: `edge-case-onboarding-0005-cadastro-incompleto-validacoes`

## Escopo

- Exibir tela mobile-first de pré-configuração da loja com 3 etapas.
- Coletar dados de identidade, CNPJ opcional e funcionamento da loja na etapa 1.
- Reutilizar o WhatsApp informado no cadastro do responsável, sem solicitar o mesmo dado novamente no pré-registro.
- Coletar endereço completo da loja na etapa 2.
- Exibir revisão dos dados preenchidos na etapa 3.
- Permitir avançar e voltar entre etapas sem perda acidental dos dados.
- Permitir editar uma etapa específica a partir da revisão.
- Preservar os dados preenchidos enquanto o lojista estiver navegando entre as 3 etapas desta tela.
- Validar campos obrigatórios, formatos e consistência básica antes de avançar.
- Indicar progresso do fluxo com indicador de etapa e barra de progresso.
- Ao finalizar, preparar o payload da loja e avançar para a tela de verificação do pré-registro.
- Registrar dependências de backend como contrato esperado, sem implementar backend nesta fase.

## Fora de Escopo

- Não implementar dashboard do lojista.
- Não implementar CRUD de produtos.
- Não implementar upload de logotipo, imagem de perfil, banner ou imagem de produto.
- Não publicar a loja publicamente.
- Não ativar lojista.
- Não processar pagamento.
- Não redirecionar para Stripe.
- Não exibir plano escolhido nesta tela.
- Não exibir, editar ou pré-visualizar slug da loja.
- Não criar, alterar ou assumir endpoint backend inexistente.
- Não validar disponibilidade real de nome de loja, slug, documento, e-mail ou plano no frontend como fonte final de verdade.
- Não implementar validação de posse ou confirmação do número de WhatsApp.

## Requisitos Funcionais

### RF-FE-001 - Exibir pré-configuração da loja em três etapas

Como lojista recém-cadastrado, quero preencher a configuração inicial da minha loja em etapas, para concluir o onboarding sem lidar com um formulário grande de uma vez.

Critérios de aceite:

- A tela deve exibir o título `Configure sua loja`.
- A tela deve exibir indicador textual de etapa: `Etapa 1 de 3`, `Etapa 2 de 3` ou `Etapa 3 de 3`.
- A tela deve exibir barra de progresso com 3 segmentos.
- A tela deve iniciar na etapa 1.
- A navegação entre etapas deve preservar os dados já preenchidos.
- A preservação dos dados deve durar apenas enquanto o lojista estiver neste fluxo de pré-configuração.

### RF-FE-002 - Coletar identidade, CNPJ e funcionamento da loja

Como lojista, quero informar os dados principais da minha loja, para que ela possa ser identificada e usada no fluxo de pedidos.

Critérios de aceite:

- A etapa 1 deve ter o título `Identidade da loja`.
- A etapa 1 deve conter os campos obrigatórios:
  - Nome da loja;
  - CNPJ da loja, opcional;
  - Dia inicial de funcionamento;
  - Dia final de funcionamento;
  - Horário de abertura;
  - Horário de fechamento.
- Cada campo deve possuir label visível e texto auxiliar curto.
- `Continuar` deve validar a etapa antes de avançar para endereço.
- `Voltar ao cadastro` deve retornar para a tela de cadastro ou ação equivalente definida no roteamento.
- O botão `Voltar ao cadastro` não deve retornar para Home, planos ou login.
- Esta etapa não deve exibir upload de imagem, logotipo, banner ou foto de perfil.
- Esta etapa não deve exibir plano escolhido, valor, slug ou prévia de URL pública.

### RF-FE-003 - Coletar endereço completo da loja

Como lojista, quero informar o endereço da minha loja, para que os dados mínimos da loja fiquem completos no onboarding.

Critérios de aceite:

- A etapa 2 deve ter o título `Endereço da loja`.
- A etapa 2 deve conter os campos obrigatórios:
  - Estado;
  - Cidade;
  - Bairro;
  - Rua;
  - Número residencial ou comercial.
- A etapa 2 não deve misturar dados de contato ou funcionamento.
- `Continuar` deve validar a etapa antes de avançar para revisão.
- `Voltar` deve retornar para a etapa 1 preservando os dados preenchidos.

### RF-FE-004 - Revisar dados antes de finalizar

Como lojista, quero revisar os dados preenchidos antes de finalizar, para corrigir informações sem perder o progresso.

Critérios de aceite:

- A etapa 3 deve ter o título `Revisão da loja`.
- A etapa 3 deve exibir bloco de revisão para `Identidade da loja`.
- A etapa 3 deve exibir bloco de revisão para `Endereço da loja`.
- Os blocos de revisão devem mostrar os dados preenchidos nas etapas anteriores.
- A revisão não deve permitir edição direta inline.
- Cada bloco deve possuir ação `Editar`, levando o lojista para a etapa correspondente.
- `Voltar` deve retornar para a etapa de endereço.
- `Finalizar` deve estar disponível quando os dados estiverem válidos.

### RF-FE-005 - Validar campos e exibir erros próximos ao campo

Como lojista, quero receber mensagens claras quando algum dado estiver incorreto, para corrigir o formulário sem adivinhação.

Critérios de aceite:

- Campo obrigatório vazio deve impedir avanço.
- CNPJ da loja deve ser opcional, mas deve possuir formato e dígitos válidos quando preenchido.
- O pré-registro não deve conter, validar ou exigir um segundo campo de WhatsApp.
- O contato usado na criação da loja deve vir do WhatsApp já validado e armazenado no cadastro do responsável.
- Dias de funcionamento devem ser preenchidos.
- Dias de funcionamento devem usar intervalo contínuo de dia inicial até dia final.
- Horários de abertura e fechamento devem ser preenchidos.
- Horário de fechamento deve ser posterior ao horário de abertura quando o atendimento ocorrer no mesmo dia.
- Funcionamento atravessando meia-noite, como `18:00` até `02:00`, não deve ser aceito no MVP.
- Estado, cidade, bairro, rua e número devem ser preenchidos.
- Erros devem aparecer próximos aos campos correspondentes.
- Mensagens de erro não devem depender apenas de cor.

### RF-FE-006 - Avançar para verificação do pré-registro

Como lojista, quero finalizar a pré-configuração após revisar os dados, para que o sistema valide o pré-registro antes do pagamento.

Critérios de aceite:

- Ao clicar em `Finalizar`, a tela deve preparar os dados da loja para a próxima etapa.
- O botão acionado deve indicar estado de carregamento e impedir múltiplos envios.
- Em sucesso, o fluxo deve avançar para `screen-store-preregistration-validation-0009.md`.
- Após sucesso e avanço do fluxo, os dados temporários desta tela podem ser descartados.
- Em erro de validação local, o lojista deve permanecer na etapa correspondente.
- Qualquer validação que dependa do backend deve ser tratada como dependência/contrato, não como regra definitiva desta tela.
- A implementação deve deixar o ponto de integração preparado para conexão futura com backend, sem inventar endpoint.

## Estados

- Inicial: etapa 1 aberta, indicador `Etapa 1 de 3`, barra de progresso no primeiro segmento e card `Identidade da loja`.
- Loading: ao avançar ou finalizar, o botão acionado indica processamento e bloqueia múltiplos envios.
- Erro: mensagens próximas aos campos quando houver campo obrigatório vazio, formato inválido ou inconsistência de horário/endereço.
- Sucesso: dados locais válidos e avanço para verificação do pré-registro.
- Vazio: não se aplica; todos os campos das etapas 1 e 2 são obrigatórios.

## Conteúdo da Tela

- Títulos:
  - `Configure sua loja`
  - `Identidade da loja`
  - `Endereço da loja`
  - `Revisão da loja`
- Campos:
  - Nome da loja;
  - CNPJ da loja;
  - Dia inicial de funcionamento;
  - Dia final de funcionamento;
  - Horário de abertura;
  - Horário de fechamento;
  - Estado;
  - Cidade;
  - Bairro;
  - Rua;
  - Número residencial ou comercial.
- Botões:
  - `Continuar`;
  - `Voltar ao cadastro`;
  - `Voltar`;
  - `Editar`;
  - `Finalizar`.
- Links:
  - Não há link obrigatório documentado para esta tela além das ações de navegação.
- Textos legais:
  - Não há texto legal específico documentado para esta tela.

## Contexto de Jornada

- Entrada esperada: lojista concluiu cadastro inicial e precisa configurar a primeira loja enquanto ainda está em onboarding/status pendente.
- Próximo passo: tela de verificação dos dados do pré-registro da loja.
- Plano escolhido: deve ser preservado em contexto, mas não exibido visualmente nesta tela.
- Slug: deve ser gerado/validado fora desta tela e não deve aparecer para o lojista neste momento.
- O que esta tela não deve resolver:
  - ativação do lojista;
  - pagamento;
  - publicação pública da loja;
  - validação final de disponibilidade no backend;
  - gestão de produtos;
  - edição completa da loja após ativação.

## Ambiguidades Para Clarify

- Nenhuma ambiguidade pendente para esta fase.
