# Tela de Retorno do Pagamento

## Identificação

**Nome da tela:**  
Retorno do pagamento da assinatura

**Código da tela:**  
`SCREEN-CHECKOUT-008`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, nodes `14:11` e `15:15`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Onboarding do lojista, pagamento da assinatura e retorno após Stripe Checkout.

**Etapa do fluxo:**  
Tela exibida depois que o lojista sai da Stripe e retorna ao PedeAqui por uma URL de sucesso ou cancelamento.

**Tela anterior:**  
Stripe Checkout, acessado a partir da tela `Revisão do plano e redirecionamento para pagamento`.

**Próxima tela esperada:**  
Página da loja do lojista, nova tentativa de pagamento, saída do fluxo ou tela definida para usuários pendentes.

## Objetivo

**Descrição da tela:**  
Tela única com variações de estado usada para comunicar o resultado do retorno do Stripe Checkout. Ela pode exibir confirmação de pagamento, verificação em andamento ou falha/cancelamento.

**Função principal:**  
Informar ao lojista se a assinatura foi concluída com sucesso ou se o pagamento não foi finalizado, oferecendo ações adequadas para cada caso.

**Ator principal:**  
Lojista.

**Atores secundários:**  
Não definido.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF014A`, `RF014B`, `RF016`, `RF031`

**Requisitos não funcionais relacionados:**  
`RNF0003`, `RNF0010`, `RNF0018`

**Casos de uso relacionados:**  
`use-case-lojista-0001`

**Edge cases relacionados:**  
`edge-case-payment-0002-webhook-pagamento`, `edge-case-subscription-0001`, `edge-case-subscription-0003-inadimplencia-e-status`

## Comportamento com Stripe Checkout

O PedeAqui deve usar Stripe Checkout hospedado pela Stripe. Isso significa que o lojista não digita dados de pagamento dentro do site do PedeAqui.

O fluxo esperado é:

1. O lojista clica em `Continuar para pagamento`.
2. O backend cria uma `Checkout Session` da Stripe em modo de assinatura.
3. O sistema redireciona o lojista para a URL hospedada pela Stripe.
4. O lojista conclui, cancela ou abandona o pagamento na Stripe.
5. A Stripe redireciona o lojista para uma URL do PedeAqui:
   - `success_url`, quando o checkout foi concluído;
   - `cancel_url`, quando o lojista cancela ou retorna sem finalizar.
6. O backend recebe eventos da Stripe por webhook.
7. O status do lojista só deve ser alterado para ativo após confirmação válida do webhook.

**Regra importante:**  
A tela de sucesso não deve ser a única fonte de ativação da conta. O `success_url` melhora a experiência do lojista, mas a confirmação confiável do pagamento deve ocorrer no backend por webhook da Stripe.

## Conteúdo da tela

**Título principal:**  
Varia conforme o estado: `Pagamento concluído`, `Confirmando pagamento` ou `Pagamento não concluído`.

**Subtítulo ou texto de apoio:**  
Texto curto explicando o que aconteceu e qual ação o lojista pode tomar.

**Mensagens auxiliares:**  
Mensagens sobre Stripe, ambiente seguro, assinatura, plano e próxima ação.

## Variações da tela

### Estado de verificação

**Quando aparece:**  
Quando o lojista retorna pelo `success_url`, mas o sistema ainda está confirmando a sessão ou aguardando o processamento do webhook.

**Ícone principal:**  
Ícone de carregamento, escudo, relógio ou check em estado de processamento.

**Título:**  
`Confirmando pagamento`

**Mensagem:**  
`Estamos verificando sua assinatura. Isso pode levar alguns instantes.`

**Comportamento:**  
O sistema deve consultar o backend para verificar se a assinatura foi ativada. Enquanto isso, deve evitar mostrar acesso final à loja como se a confirmação já estivesse concluída.

**Ações:**  
Não é obrigatório exibir botão durante a verificação. Caso exista, deve ser discreto e não deve permitir ativação manual.

### Estado de sucesso

**Quando aparece:**  
Quando o pagamento foi confirmado e o lojista foi ativado com sucesso.

**Ícone principal:**  
Check verde dentro de círculo, com elementos visuais leves de celebração.

**Título:**  
`Pagamento concluído`

**Subtítulo:**  
`Seu plano foi ativado com sucesso.`

**Resumo exibido:**

| Informação | Valor esperado |
| --- | --- |
| Plano | `Plano Básico` |
| Cobrança | `Cobrança mensal` |
| Valor | `R$ 29,99/mês` |

**Aviso de segurança:**  
`Pagamento seguro. A confirmação do pagamento foi processada pela Stripe. Seus dados financeiros estão protegidos.`

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Entrar na minha loja | Botão primário vermelho | Habilitado | Leva o lojista para a página ou ambiente inicial da sua loja |

**Regra visual:**  
No estado de sucesso, não deve existir botão de voltar por enquanto.

### Estado de cancelamento ou erro

**Quando aparece:**  
Quando o lojista retorna pelo `cancel_url`, fecha/interrompe o checkout, decide não finalizar a compra, ocorre falha na Stripe ou o pagamento não é confirmado.

**Ícone principal:**  
Ícone de alerta, erro ou exclamação em vermelho.

**Título:**  
`Pagamento não concluído`

**Subtítulo:**  
`Sua assinatura não foi ativada.`

**Mensagem principal:**  
`Não foi possível concluir o pagamento da sua assinatura. Você pode tentar novamente ou sair do fluxo.`

**Casos cobertos por esta variação:**

- lojista clicou para voltar no Checkout da Stripe;
- lojista abandonou o pagamento;
- lojista decidiu não finalizar a assinatura;
- a Stripe retornou falha no checkout;
- a sessão expirou sem conclusão;
- o pagamento não foi confirmado pelo backend.

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Tentar novamente | Botão primário vermelho | Habilitado | Cria ou solicita uma nova tentativa de Checkout |
| Sair | Botão secundário com contorno vermelho | Habilitado | Sai do fluxo de pagamento sem ativar a assinatura |

**Regra visual:**  
`Tentar novamente` deve ser o botão de execução, com fundo vermelho e texto branco. `Sair` deve usar fundo branco, borda vermelha, texto vermelho e largura semelhante ao botão principal.

## Elementos de interface

### Header

- Logo: `PedeAqui`, posicionada no topo.
- Não deve ter botão de login, cadastro ou voltar no header.
- A ação deve ficar dentro do card, conforme o estado.

### Card principal

- Tipo de container: card central branco com sombra leve.
- Ícone principal: muda conforme o estado.
- Título e subtítulo: mudam conforme resultado.
- Conteúdo: resumo do plano, aviso de segurança ou mensagem de erro.
- Botões: mudam conforme estado.

### Ícones

- Sucesso: check verde, escudo com check ou equivalente.
- Verificação: carregamento, relógio, escudo ou check em processamento.
- Erro/cancelamento: alerta, exclamação, círculo vermelho ou equivalente.
- Segurança: escudo ou cadeado.
- Plano: loja, vitrine ou equivalente.

Quando não houver o ícone exato disponível, deve ser usado um ícone com sentido próximo.

## Estados da tela

**Estado inicial:**  
Depende da URL de retorno. Em `success_url`, o estado inicial recomendado é uma verificação curta antes de exibir sucesso. Em `cancel_url`, o estado inicial deve ser `Pagamento não concluído`.

**Estado de carregamento:**  
Exibido enquanto o sistema consulta o backend ou espera a confirmação do webhook. Deve informar que a assinatura está sendo verificada.

**Estado de erro:**  
Exibido quando o pagamento foi cancelado, falhou, expirou ou não foi confirmado.

**Estado de sucesso:**  
Exibido quando o backend confirma que a assinatura foi paga e o lojista foi ativado.

**Estado vazio:**  
Não se aplica.

## Validações

- O sucesso visual não deve ativar a conta sozinho.
- O backend deve validar o evento recebido da Stripe antes de alterar o status do lojista.
- Eventos de webhook devem ser validados por assinatura.
- A ativação deve ser idempotente para evitar ativação duplicada.
- O botão `Tentar novamente` deve criar uma nova tentativa de checkout ou reutilizar fluxo válido definido pelo backend.
- O botão `Sair` não deve ativar a assinatura.
- A tela deve lidar com retorno sem `session_id` exibindo estado de erro ou orientação segura.
- O plano exibido no sucesso deve corresponder ao plano realmente confirmado pelo backend.

## Comportamento esperado

1. O lojista sai da tela de revisão e é redirecionado para Stripe Checkout.
2. A Stripe processa o pagamento no ambiente próprio.
3. Se o checkout for concluído, a Stripe redireciona para `success_url`.
4. O PedeAqui exibe estado de verificação enquanto confirma a assinatura com o backend.
5. Se a assinatura estiver confirmada, a tela exibe `Pagamento concluído`.
6. O lojista clica em `Entrar na minha loja`.
7. Se o checkout for cancelado, abandonado ou falhar, a Stripe redireciona para `cancel_url`.
8. O PedeAqui exibe `Pagamento não concluído`.
9. O lojista pode clicar em `Tentar novamente` ou `Sair`.

## Design

**Layout:**  
Tela mobile-first, com logo no topo e card central. A mesma estrutura visual deve ser usada para sucesso, verificação e erro, mudando cores, ícones, mensagens e ações.

**Cores principais:**  
Vermelho da marca para botões de execução, ações principais e estados de erro. Verde para confirmação de sucesso. Branco para card e botões secundários. Preto para títulos. Cinza para textos auxiliares e bordas.

**Tipografia:**  
Título forte e direto. Mensagens curtas, objetivas e orientadas à ação. Valor e plano devem ter hierarquia clara no sucesso.

**Espaçamentos:**  
O card deve manter respiro entre ícone, título, mensagem, resumo/alerta e botões. Os botões devem ficar no final do card.

**Componentes reutilizáveis:**  
`PaymentReturnCard`, `PaymentStatusIcon`, `PlanSummary`, `SecurityNotice`, `ErrorNotice`, `PrimaryButton`, `OutlineButton`.

**Imagens ou ilustrações:**  
Não usar imagens externas. Usar apenas ícones, cards e elementos visuais sutis.

## Responsividade

**Desktop:**  
Card centralizado com largura controlada. A tela deve permanecer objetiva, sem esticar conteúdo em excesso.

**Mobile:**  
Mobile-first. Card deve ocupar quase toda a largura disponível com margens confortáveis. Botões devem ter área de toque confortável.

**Pontos de atenção:**  
Não misturar sucesso e erro na mesma visualização. Não exibir botão `Sair` no sucesso. Não exibir `Entrar na minha loja` no erro. Não pedir dados de pagamento dentro do PedeAqui.

## Acessibilidade

- Ícones devem ter texto equivalente.
- Cores de sucesso e erro não devem ser a única forma de comunicar estado.
- Botões devem ter texto claro.
- Mensagens devem explicar o que aconteceu e o que o lojista pode fazer.
- O contraste entre vermelho, verde, branco, preto e cinza deve ser validado.
- A tela deve ser navegável por teclado.

## Observações

O PedeAqui usa Stripe Checkout hospedado, não Stripe Elements. O pagamento acontece fora do site, no ambiente da Stripe.

O `success_url` e o `cancel_url` servem para experiência de retorno do usuário. A confirmação definitiva da assinatura deve depender do backend e do webhook da Stripe.

Referências oficiais usadas:

- Stripe Checkout permite redirecionar para uma página hospedada pela Stripe e receber o usuário de volta por URLs configuradas.
- A Stripe recomenda usar webhooks para confirmar pagamentos e executar ações críticas, pois o usuário pode não carregar a página de sucesso mesmo após pagar.
