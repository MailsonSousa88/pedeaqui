# Template de Descrição de Tela

Use este template para documentar telas do PedeAqui a partir dos wireframes, protótipos ou telas finais.

## Identificação

**Nome da tela:**  
Nome claro da tela.

**Código da tela:**  
Exemplo: `SCREEN-AUTH-001`

**Link ou referência visual:**  
Link do Figma, imagem ou outra referência usada para descrever a tela.

**Status da tela:**  
`Rascunho`, `Em revisão`, `Aprovada`, `Alterada` ou `Removida`.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Exemplo: autenticação, onboarding do lojista, vitrine pública, carrinho, checkout, painel do lojista ou administração.

**Etapa do fluxo:**  
Descreva em que momento essa tela aparece.

**Tela anterior:**  
Tela ou ação que leva o usuário até aqui.

**Próxima tela esperada:**  
Tela ou ação esperada após a interação principal.

## Objetivo

**Descrição da tela:**  
Explique resumidamente o que a tela representa.

**Função principal:**  
Explique o que o usuário deve conseguir fazer nessa tela.

**Ator principal:**  
Cliente, lojista, administrador ou visitante.

**Atores secundários:**  
Liste se houver.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
Exemplo: `RF012`, `RF034`.

**Requisitos não funcionais relacionados:**  
Exemplo: `RNF0015`, `RNF0016`.

**Casos de uso relacionados:**  
Exemplo: `use-case-lojista-0001`.

**Edge cases relacionados:**  
Exemplo: `edge-case-checkout-0010-whatsapp-e-pedido`.

## Conteúdo da tela

**Título principal:**  
Texto principal exibido na tela.

**Subtítulo ou texto de apoio:**  
Texto que explica a ação ou orienta o usuário.

**Mensagens auxiliares:**  
Textos legais, instruções, alertas ou mensagens secundárias.

## Elementos de interface

### Header

- Logo:
- Texto auxiliar:
- Botão ou link de ação:
- Ícones:

### Card, seção ou área principal

- Tipo de container:
- Título:
- Subtítulo:
- Ícone principal:
- Conteúdo:

### Formulários

Liste os campos existentes na tela.

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Exemplo | Texto | Sim | `Digite...` | Regra de validação | Observação |

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Exemplo | Botão primário | Habilitado | Avança para a próxima etapa |

### Links

| Link | Destino ou ação | Observação |
| --- | --- | --- |
| Exemplo | Navega para outra tela | Observação |

## Estados da tela

**Estado inicial:**  
Como a tela aparece ao ser carregada.

**Estado de carregamento:**  
Como a tela se comporta enquanto espera resposta.

**Estado de erro:**  
Quais erros podem aparecer e onde.

**Estado de sucesso:**  
O que acontece quando a ação principal é concluída.

**Estado vazio:**  
Preencher apenas se a tela puder não ter dados.

## Validações

Liste as validações importantes da tela.

- Validação 1:
- Validação 2:
- Validação 3:

## Comportamento esperado

Descreva o fluxo de interação principal em passos.

1. O usuário acessa a tela.
2. O usuário preenche ou visualiza as informações necessárias.
3. O usuário executa a ação principal.
4. O sistema valida os dados.
5. O sistema avança, exibe erro ou mantém o usuário na tela.

## Design

**Layout:**  
Descreva a organização visual da tela.

**Cores principais:**  
Liste as cores de marca, fundo, texto e estados.

**Tipografia:**  
Descreva hierarquia de título, subtítulo, labels e botões.

**Espaçamentos:**  
Descreva espaçamentos importantes entre blocos, campos e ações.

**Componentes reutilizáveis:**  
Liste componentes que podem virar padrão do Design System.

**Ícones:**  
Liste os ícones presentes e sua função.

**Imagens ou ilustrações:**  
Informe se a tela usa imagens, banners, avatares ou elementos decorativos.

## Responsividade

**Desktop:**  
Descreva como a tela se comporta em telas maiores.

**Mobile:**  
Descreva como a tela deve se adaptar em telas menores.

**Pontos de atenção:**  
Liste riscos de quebra visual, sobreposição ou excesso de texto.

## Acessibilidade

- Campos possuem labels visíveis?
- Botões possuem texto claro?
- Ícones importantes possuem descrição ou texto de apoio?
- A tela depende apenas de cor para comunicar estado?
- O contraste entre texto e fundo é suficiente?

## Observações

Use esta seção para dúvidas, decisões pendentes ou pontos que precisam ser validados com o time.

---

# Exemplo Preenchido - Tela de Cadastro

## Identificação

**Nome da tela:**  
Cadastro de lojista

**Código da tela:**  
`SCREEN-AUTH-001`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, node `4:2`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Autenticação e cadastro do lojista.

**Etapa do fluxo:**  
Entrada de dados iniciais para criação da conta.

**Tela anterior:**  
Tela inicial, link de cadastro ou chamada para criar conta.

**Próxima tela esperada:**  
Validação de CPF/CNPJ, configuração da loja, escolha de plano ou próxima etapa definida pelo fluxo.

## Objetivo

**Descrição da tela:**  
Tela usada por novos lojistas que ainda não possuem conta no PedeAqui.

**Função principal:**  
Permitir que o lojista informe os dados necessários para criar sua conta.

**Ator principal:**  
Lojista.

## Conteúdo da tela

**Título principal:**  
`Crie sua conta`

**Subtítulo ou texto de apoio:**  
`Preencha os dados abaixo para criar sua conta no PedeAqui.`

**Mensagens auxiliares:**  
Texto legal informando concordância com `Termos de Uso` e `Política de Privacidade`.

## Elementos de interface

### Header

- Logo: `PedeAqui`
- Texto auxiliar: `Já tem uma conta?`
- Botão ou link de ação: `Entrar`
- Ícones: ícone de entrada no botão

### Card, seção ou área principal

- Tipo de container: card central branco com sombra suave
- Título: `Crie sua conta`
- Subtítulo: texto de apoio sobre preenchimento dos dados
- Ícone principal: ícone de criação de usuário
- Conteúdo: formulário de cadastro

### Formulários

| Campo | Tipo | Obrigatório | Placeholder | Validação | Observação |
| --- | --- | --- | --- | --- | --- |
| Nome completo | Texto | Sim | `Digite seu nome` | Não pode estar vazio | Identificação do lojista |
| E-mail | E-mail | Sim | `Digite seu e-mail` | Deve ser único e válido | Usado no login |
| Senha | Senha | Sim | `Digite sua senha` | Mínimo de 8 caracteres | Possui ação de mostrar/ocultar |
| CPF ou CNPJ | Texto | Sim | `Digite seu CPF ou CNPJ` | Deve ter formato válido | Deve ser validado antes de avançar |

### Botões e ações

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Cadastrar | Botão primário | Habilitado após preenchimento válido | Cria a conta ou envia dados para validação |
| Entrar | Botão secundário | Habilitado | Leva para a tela de login |

## Design

**Layout:**  
Header no topo, card centralizado e elementos decorativos sutis no fundo.

**Cores principais:**  
Vermelho da marca, branco, preto e cinza médio.

**Componentes reutilizáveis:**  
`AuthHeader`, `AuthCard`, `TextInput`, `PasswordInput`, `PrimaryButton`, `OutlineButton`, `LegalText`.

## Observações

Essa tela é diferente da tela de login. Cadastro é usado apenas por novos lojistas; lojistas já cadastrados devem usar a tela `Entrar`.
