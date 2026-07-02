# UC-LJ-0001 - Tornar-se lojista e contratar plano

## Objetivo

Permitir que uma pessoa que conhece o PedeAqui como visitante ou consumidor decida criar uma loja na plataforma, escolha um plano, cadastre sua conta, preencha o pré-registro da loja, revise o plano escolhido, realize o pagamento pela Stripe e tenha acesso liberado para gerenciar sua loja.

## Ator principal

Lojista.

> Observação: o lojista também pode ser um consumidor da plataforma. Neste caso de uso, ele é uma pessoa que possui uma loja real, gostou da proposta do PedeAqui e decidiu criar uma loja digital no sistema.

## Atores secundários

- Stripe.
- Sistema de pagamento.
- Sistema de validação cadastral.

## Pré-condições

- O lojista deve acessar a plataforma pública do PedeAqui.
- A plataforma deve possuir ao menos um plano disponível para contratação.
- As telas públicas de Home, planos, cadastro, pré-registro da loja, revisão do plano e retorno da Stripe devem estar disponíveis.

## Pós-condições

- A conta do lojista é criada com status inicial pendente.
- O plano escolhido fica associado ao fluxo de onboarding.
- A loja inicial é pré-registrada, mas permanece indisponível publicamente até a confirmação do pagamento.
- O lojista é redirecionado para a Stripe para concluir o pagamento.
- Após pagamento confirmado por webhook, o lojista é ativado e pode acessar a área administrativa da loja.

## Gatilho

O lojista acessa o PedeAqui, vê a proposta da plataforma e decide contratar um plano para criar sua loja.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O lojista acessa a Home/Início do PedeAqui. |
| 2 | O sistema exibe informações institucionais, proposta econômica, benefícios e explicações sobre como vender pelo PedeAqui. |
| 3 | O lojista visualiza a seção de planos na Home ou acessa a tela de planos. |
| 4 | O sistema exibe os planos disponíveis, destacando o plano contratável no MVP. |
| 5 | O lojista escolhe um plano disponível. |
| 6 | O sistema direciona o lojista para a tela de cadastro, mantendo o plano escolhido no contexto do fluxo. |
| 7 | O lojista informa nome completo, e-mail, senha e CPF ou CNPJ. |
| 8 | O sistema valida os dados cadastrais e cria a conta com status `PENDENTE`. |
| 9 | O sistema direciona o lojista para a tela de pré-configuração/pré-registro da loja. |
| 10 | O lojista informa os dados iniciais da loja, como nome, contato, funcionamento e endereço. |
| 11 | O lojista revisa os dados da loja e finaliza o pré-registro. |
| 12 | O sistema valida os dados que dependem do backend, como e-mail, CPF/CNPJ, nome da loja, slug e plano selecionado. |
| 13 | O sistema direciona o lojista para a tela de revisão do plano escolhido. |
| 14 | O lojista confere plano, valor, benefícios e aviso de pagamento seguro. |
| 15 | O lojista confirma que deseja continuar para pagamento. |
| 16 | O sistema cria ou solicita a sessão de pagamento e redireciona o lojista para a Stripe. |
| 17 | O lojista conclui o pagamento no ambiente seguro da Stripe. |
| 18 | A Stripe redireciona o lojista de volta para o PedeAqui. |
| 19 | O sistema exibe a tela de retorno da Stripe com estado de sucesso, processamento ou falha. |
| 20 | Quando o webhook confirmar o pagamento, o sistema ativa o lojista e libera o acesso ao painel da loja. |

## Fluxos alternativos

### FA01 - Lojista já possui conta

| Passo | Ação |
|-------|------|
| 6a | O lojista percebe que já possui conta e escolhe `Entrar`. |
| 6b | O sistema direciona para a tela de login. |
| 6c | O lojista autentica com e-mail e senha. |
| 6d | Se possuir loja e assinatura ativa, o sistema direciona para o painel da loja. |
| 6e | Se ainda estiver pendente, o sistema direciona para a etapa pendente do onboarding. |

### FA02 - Lojista acessa diretamente a tela de login

| Passo | Ação |
|-------|------|
| 1a | O lojista acessa a tela de Login/Entrar pela Home ou por rota direta. |
| 1b | O lojista informa e-mail e senha. |
| 1c | O sistema valida as credenciais. |
| 1d | Se o lojista estiver ativo, o sistema libera o painel da loja. |
| 1e | Se o lojista estiver pendente, o sistema direciona para a etapa apropriada do onboarding. |

### FA03 - Lojista volta para revisar etapa anterior

| Passo | Ação |
|-------|------|
| 10a | Durante o pré-registro ou revisão do plano, o lojista escolhe voltar. |
| 10b | O sistema retorna para a etapa anterior preservando os dados já preenchidos quando possível. |
| 10c | O lojista corrige informações e continua o fluxo. |

### FA04 - Pagamento em processamento

| Passo | Ação |
|-------|------|
| 19a | A Stripe redireciona o lojista de volta, mas o webhook ainda não confirmou o pagamento. |
| 19b | O sistema exibe estado de processamento. |
| 19c | O lojista deve aguardar a confirmação ou tentar atualizar o status conforme comportamento definido pela tela. |

## Fluxos de exceção

### FE01 - Plano indisponível

| Passo | Ação |
|-------|------|
| 5a | O lojista tenta escolher um plano indisponível, futuro ou inativo. |
| 5b | O sistema impede o avanço. |
| 5c | O sistema informa que o plano não está disponível para contratação. |

### FE02 - Dados cadastrais inválidos ou duplicados

| Passo | Ação |
|-------|------|
| 8a | O sistema identifica e-mail duplicado, CPF/CNPJ inválido ou CPF/CNPJ já usado. |
| 8b | O sistema impede a criação ou o avanço da conta. |
| 8c | O sistema informa quais campos devem ser corrigidos. |

### FE03 - Dados da loja inválidos ou indisponíveis

| Passo | Ação |
|-------|------|
| 12a | O sistema identifica dados obrigatórios ausentes, nome de loja indisponível, slug já existente ou plano inválido. |
| 12b | O sistema impede o avanço para pagamento. |
| 12c | O lojista retorna para revisar os dados da loja. |

### FE04 - Falha ao criar sessão de pagamento

| Passo | Ação |
|-------|------|
| 16a | O sistema não consegue criar ou recuperar a sessão de pagamento. |
| 16b | O sistema exibe erro claro e mantém os dados do onboarding preservados. |
| 16c | O lojista pode tentar novamente ou voltar para revisar o fluxo. |

### FE05 - Pagamento cancelado ou recusado

| Passo | Ação |
|-------|------|
| 17a | O lojista cancela o pagamento ou a Stripe retorna falha. |
| 17b | O sistema mantém o lojista como `PENDENTE`. |
| 17c | O sistema permite retomar o pagamento sem liberar acesso administrativo completo. |

## Regras de negócio

- O fluxo de cadastro de lojista deve ser separado do fluxo de login.
- O login é usado por lojistas que já possuem conta.
- O cadastro é usado por novos lojistas que desejam contratar o PedeAqui.
- A escolha de plano deve acontecer antes ou no início do fluxo de cadastro, para que o sistema preserve o plano escolhido até a revisão de pagamento.
- O lojista pendente pode acessar apenas etapas necessárias do onboarding.
- O acesso ao painel administrativo completo depende de pagamento confirmado.
- A ativação do lojista deve ocorrer por confirmação de pagamento via webhook, não apenas pelo retorno visual da Stripe.
- A loja criada antes do pagamento não deve ficar pública até que o lojista esteja ativo.
- O PedeAqui não deve coletar dados de cartão ou PIX diretamente; pagamento ocorre no ambiente seguro da Stripe.

## Telas relacionadas

- `docs/screens/screen-home-0001.md`
- `docs/screens/screen-plans-0002.md`
- `docs/screens/screen-register-0003.md`
- `docs/screens/screen-login-0004.md`
- `docs/screens/screen-store-preconfiguration-0005.md`
- `docs/screens/screen-checkout-review-0007.md`
- `docs/screens/screen-stripe-return-0008.md`
- `docs/screens/screen-store-preregistration-validation-0009.md`

## Referências

- `RF011` - Login de lojista.
- `RF012` - Cadastro de lojista.
- `RF013` - Validação de CPF ou CNPJ.
- `RF014A` - Status pendente pós-cadastro.
- `RF014B` - Ativação via webhook de pagamento.
- `RF016` - Criação de loja.
- `RF017` - Atualização de dados da loja.
- `RF031` - Limite de produtos por plano.
- `RNF0003` - Segurança no sistema de pagamento.
- `RNF0009` - Autenticação em rotas privadas do lojista.
- `RNF0015` - Responsividade.
- Status Report I - Épico 2: Gestão de Loja pelo Lojista.
- User Story: "Como lojista, eu quero contratar o plano lojista com um CPF ou CNPJ válido..."
