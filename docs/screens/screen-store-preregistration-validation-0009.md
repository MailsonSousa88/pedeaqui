# Tela de Verificação do Pré-registro da Loja

## Identificação

**Nome da tela:**  
Verificação dos dados do pré-registro da loja

**Código da tela:**  
`SCREEN-STORE-009`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, nodes `185:78` e `185:82`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Onboarding do lojista, validação do pré-registro da loja e preparação para checkout.

**Etapa do fluxo:**  
Tela exibida após a etapa 3 da pré-configuração da loja, quando o lojista confirma os dados revisados e o frontend envia o payload ao backend para validação.

**Tela anterior:**  
Tela de Pré-configuração da Loja, etapa `Revisão da loja`.

**Próxima tela esperada:**  
Tela de Revisão e Redirecionamento para Pagamento, quando a validação for aprovada.

## Objetivo

**Descrição da tela:**  
Tela intermediária usada para verificar, junto ao backend, se os dados do cadastro do lojista e da loja podem ser usados para continuar o onboarding.

**Função principal:**  
Validar no backend informações que o frontend não consegue confirmar sozinho, como dados já existentes no banco de dados.

**Ator principal:**  
Lojista.

**Atores secundários:**  
Não definido.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF012`, `RF013`, `RF016`, `RF017`

**Requisitos não funcionais relacionados:**  
`RNF0004`, `RNF0010`, `RNF0018`

**Casos de uso relacionados:**  
`use-case-lojista-0001`

**Edge cases relacionados:**  
`edge-case-onboarding-0005-cadastro-incompleto-validacoes`

## Conteúdo da tela

**Título principal:**  
Varia conforme o estado: `Validando dados`, `Dados validados` ou `Não foi possível validar`.

**Subtítulo ou texto de apoio:**  
Texto curto explicando se o sistema está verificando, se a validação foi aprovada ou se existem dados que precisam ser revisados.

**Mensagens auxiliares:**  
Mensagens sobre validação de cadastro, loja, plano e possíveis conflitos encontrados no backend.

## Estados da tela

### Estado de carregamento

**Quando aparece:**  
Imediatamente após o lojista confirmar a etapa 3 da pré-configuração da loja.

**Objetivo:**  
Indicar que o frontend enviou o payload ao backend e está aguardando o resultado da validação.

**Ícone principal:**  
Círculo de carregamento, spinner ou animação circular em vermelho.

**Título:**  
`Validando dados`

**Subtítulo:**  
`Estamos verificando as informações da sua loja.`

**Mensagem auxiliar:**  
`Isso pode levar alguns instantes.`

**Comportamento de tempo:**  
O frontend pode exibir uma animação de carregamento por até 10 segundos enquanto aguarda a resposta do backend. Esse tempo é uma decisão visual de experiência, não uma regra de negócio. Se o backend responder antes, a tela deve mudar imediatamente para sucesso ou erro. Se o backend não responder dentro do tempo esperado, o sistema deve exibir estado de erro técnico ou permitir nova tentativa.

**Ações:**  
Não exibir botões durante a validação, para evitar múltiplos envios e estados inconsistentes.

### Estado de sucesso

**Quando aparece:**  
Quando o backend confirma que os dados enviados podem seguir para o checkout.

**Ícone principal:**  
Check verde dentro de círculo suave verde claro.

**Título:**  
`Dados validados`

**Subtítulo:**  
`As informações da sua loja foram verificadas com sucesso.`

**Texto auxiliar:**  
`Agora você pode seguir para a revisão do plano e pagamento.`

**Bloco informativo:**  
Exibir uma lista curta com ícones de check:

- `Cadastro do lojista validado`
- `Dados da loja disponíveis`
- `Plano selecionado confirmado`

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Continuar para checkout | Botão primário vermelho | Habilitado | Leva para a tela de Revisão e Redirecionamento para Pagamento |

### Estado de erro

**Quando aparece:**  
Quando o backend identifica conflito ou invalidade que o frontend não conseguiria detectar sozinho.

**Ícone principal:**  
Alerta ou exclamação vermelho dentro de círculo vermelho claro.

**Título:**  
`Não foi possível validar`

**Subtítulo:**  
`Encontramos dados que precisam ser revisados antes de continuar.`

**Bloco de erros:**  
Exibir um card interno com borda vermelha suave e título `Revise os dados abaixo`.

**Possíveis erros exibidos:**

- `CPF/CNPJ já cadastrado.`
- `E-mail já vinculado a uma conta.`
- `Nome da loja indisponível.`
- `Link da loja já existente.`
- `Plano selecionado indisponível.`

**Texto auxiliar:**  
`Volte para a revisão e edite os campos indicados antes de continuar.`

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Editar dados | Botão primário vermelho | Habilitado | Retorna para a etapa 3 da pré-configuração da loja mantendo os dados preenchidos |
| Sair | Botão secundário com contorno vermelho | Habilitado | Sai do fluxo sem iniciar checkout e sem ativar assinatura |

## Payload validado pelo backend

O payload enviado ao backend deve representar os dados já revisados pelo lojista. Ele pode conter:

- dados do cadastro do lojista;
- CPF ou CNPJ;
- plano escolhido;
- nome da loja;
- e-mail de contato da loja;
- WhatsApp da loja;
- dias e horários de funcionamento;
- endereço da loja;
- slug ou dados usados para gerar o slug.

O frontend pode fazer validações de formato e preenchimento, mas não deve assumir disponibilidade de dados que dependem do banco.

## Validações esperadas no backend

- E-mail já cadastrado.
- CPF/CNPJ já cadastrado.
- Nome da loja já usado.
- Slug já existente.
- Plano inexistente ou inativo.
- Dados obrigatórios ausentes ou inconsistentes.

## Comportamento esperado

1. O lojista conclui a etapa 3 da pré-configuração da loja.
2. O frontend envia o payload ao backend.
3. A tela exibe estado de carregamento com animação circular.
4. O frontend aguarda a resposta do backend, podendo manter a animação por até 10 segundos.
5. Se o backend aprovar os dados, a tela exibe o estado `Dados validados`.
6. O lojista clica em `Continuar para checkout`.
7. Se o backend retornar erro, a tela exibe o estado `Não foi possível validar`.
8. O lojista clica em `Editar dados` para voltar à etapa 3 e corrigir os campos indicados.
9. O lojista pode clicar em `Sair` para abandonar o fluxo sem iniciar pagamento.

## Design

**Layout:**  
Tela mobile-first com logo no topo e card central. A mesma estrutura visual deve ser usada para carregamento, sucesso e erro, alterando ícone, título, mensagem e ações.

**Cores principais:**  
Vermelho da marca para ações principais, ícones de erro, bordas de erro e botões. Verde apenas para confirmação de sucesso. Branco para card e botões secundários. Preto para títulos. Cinza para textos auxiliares.

**Tipografia:**  
Título forte e direto. Subtítulo curto. Lista de sucesso ou erro com leitura rápida.

**Espaçamentos:**  
O card deve manter respiro entre ícone, título, subtítulo, lista e botões. Botões devem ficar no final do card.

**Componentes reutilizáveis:**  
`ValidationStatusCard`, `LoadingIndicator`, `StatusIcon`, `ValidationResultList`, `ErrorList`, `PrimaryButton`, `OutlineButton`.

**Ícones:**  
Carregamento circular para validação, check para sucesso, alerta para erro, pequenos checks ou alertas nas listas.

Quando não houver o ícone exato disponível, deve ser usado um ícone com sentido próximo.

## Responsividade

**Desktop:**  
Card centralizado com largura controlada. A tela deve continuar objetiva e não deve esticar as listas em excesso.

**Mobile:**  
Mobile-first. Card ocupa quase toda a largura disponível com margens confortáveis. Botões devem ter área de toque adequada.

**Pontos de atenção:**  
Não misturar sucesso e erro na mesma visualização. Não exibir `Continuar para checkout` no estado de erro. Não exibir `Editar dados` no estado de sucesso.

## Acessibilidade

- Ícones devem ter texto equivalente.
- Cores de sucesso e erro não devem ser a única forma de comunicar estado.
- Animação de carregamento deve ter texto informativo.
- Botões devem ter texto claro.
- Lista de erros deve ser legível e associada aos campos que precisam ser corrigidos.
- Contraste entre vermelho, verde, branco, preto e cinza deve ser validado.
- A tela deve ser navegável por teclado.

## Observações

Esta tela existe para evitar que o lojista chegue ao checkout com dados que o backend não pode aceitar. O pagamento não deve ser iniciado antes dessa validação.

Essa validação não substitui validações futuras do backend. Ela apenas cria uma barreira antes do checkout para reduzir conflitos como documento duplicado, e-mail já usado ou loja com nome/slug indisponível.
