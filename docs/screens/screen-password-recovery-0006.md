# Tela de Recuperação de Senha

## Identificação

**Nome da tela:**  
Recuperação de senha do lojista

**Código da tela:**  
`SCREEN-AUTH-006`

**Link ou referência visual:**  
Figma `pedeaqui wireframes`, node `175:55`.

**Status da tela:**  
Em revisão.

## Contexto no fluxo

**Fluxo ao qual pertence:**  
Autenticação e recuperação de acesso do lojista.

**Etapa do fluxo:**  
Fluxo acessado a partir da tela de Login, pelo link `Esqueci minha senha`.

**Tela anterior:**  
Tela de Login.

**Próxima tela esperada:**  
Tela de Login após envio do link, redefinição concluída ou retorno manual do lojista.

## Objetivo

**Descrição da tela:**  
Tela em etapas usada para recuperar o acesso do lojista por meio de um link enviado por e-mail.

**Função principal:**  
Permitir que o lojista solicite um link de recuperação, seja orientado a verificar o e-mail e redefina a senha usando o link recebido.

**Ator principal:**  
Lojista.

**Atores secundários:**  
Usuário já cadastrado que esqueceu a senha ou teve a sessão expirada e não lembra as credenciais.

## Regras e requisitos relacionados

**Requisitos funcionais relacionados:**  
`RF015`

**Requisitos não funcionais relacionados:**  
`RNF0004`, `RNF0015`, `RNF0016`

**Casos de uso relacionados:**  
`use-case-lojista-0001`

**Edge cases relacionados:**  
Não definido nesta etapa.

## Conteúdo da tela

**Título principal:**  
Varia conforme a etapa: `Recuperar senha`, `Verifique seu e-mail`, `Criar nova senha`, `Link expirado` ou `Senha redefinida`.

**Subtítulo ou texto de apoio:**  
Texto curto explicando a ação atual do fluxo.

**Mensagens auxiliares:**  
Mensagens sobre validade do link, verificação do e-mail, spam/lixo eletrônico, erro de link expirado e sucesso da redefinição.

## Estrutura do fluxo

### Indicador de etapas

O fluxo deve exibir um indicador no topo com 3 etapas:

1. `Solicitar link`
2. `E-mail enviado`
3. `Redefinir senha`

As etapas devem ser representadas por bolinhas numeradas. A etapa atual e as etapas concluídas devem aparecer em vermelho, com número branco. Etapas futuras devem aparecer em cinza. As linhas entre as bolinhas devem acompanhar o progresso.

O indicador não deve depender apenas da cor para comunicar avanço; os números e labels devem permanecer visíveis.

### Etapa 1 de 3 - Solicitar link

**Objetivo da etapa:**  
Permitir que o lojista informe o e-mail da conta para receber um link de redefinição de senha.

**Título do card:**  
`Recuperar senha`

**Subtítulo:**  
`Digite seu e-mail para receber um link de redefinição de senha.`

**Campo obrigatório:**

| Campo | Tipo | Obrigatório | Placeholder | Validação | Descrição abaixo do campo |
| --- | --- | --- | --- | --- | --- |
| E-mail | E-mail | Sim | `Digite seu e-mail` | Deve possuir formato válido | `Enviaremos um link válido por 1 hora para este e-mail.` |

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Enviar link de recuperação | Botão primário vermelho | Habilitado após e-mail válido | Solicita envio do link de redefinição |
| Voltar para login | Botão secundário com contorno vermelho | Habilitado | Retorna para a tela de Login |

### Etapa 2 de 3 - E-mail enviado

**Objetivo da etapa:**  
Informar que o link foi enviado e orientar o lojista a continuar pelo e-mail.

**Título do card:**  
`Verifique seu e-mail`

**Subtítulo:**  
`Enviamos um link de redefinição para o e-mail informado.`

**Conteúdo informativo:**

- Caixa informativa com ícone de envelope e texto: `Clique no link recebido para continuar a redefinição da sua senha.`
- Linha informativa com ícone de relógio e texto: `O link é válido por 1 hora.`
- Linha informativa com ícone de escudo, alerta ou equivalente e texto: `Verifique também sua caixa de spam ou lixo eletrônico.`

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Voltar para login | Botão secundário com contorno vermelho | Habilitado | Retorna para a tela de Login |
| Enviar novamente | Link textual vermelho | Habilitado após regra de reenvio definida | Solicita um novo envio do link |

**Regra visual importante:**  
`Voltar para login` deve aparecer antes de `Enviar novamente`. `Voltar para login` deve ser botão com fundo branco, texto vermelho e borda vermelha. `Enviar novamente` deve ser apenas link textual, sem borda e sem fundo.

### Etapa 3 de 3 - Redefinir senha

**Objetivo da etapa:**  
Permitir que o lojista crie uma nova senha após acessar o link recebido por e-mail.

**Título do card:**  
`Criar nova senha`

**Subtítulo:**  
`Digite e confirme sua nova senha para acessar sua conta.`

**Campos obrigatórios:**

| Campo | Tipo | Obrigatório | Placeholder | Validação | Descrição abaixo do campo |
| --- | --- | --- | --- | --- | --- |
| Nova senha | Senha | Sim | `Digite sua nova senha` | Mínimo de 8 caracteres | `A senha deve ter no mínimo 8 caracteres.` |
| Confirmar senha | Senha | Sim | `Confirme sua nova senha` | Deve ser igual à nova senha | `Repita a senha para confirmar.` |

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Redefinir senha | Botão primário vermelho | Habilitado após preenchimento válido | Altera a senha do lojista |
| Voltar para login | Botão secundário com contorno vermelho | Habilitado | Retorna para a tela de Login |

### Estado de erro - Link expirado ou utilizado

**Quando aparece:**  
Quando o lojista acessa um link expirado ou já utilizado.

**Título do card:**  
`Link expirado`

**Mensagem:**  
`Este link expirou ou já foi utilizado. Solicite um novo link para continuar.`

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Solicitar novo link | Botão primário vermelho | Habilitado | Retorna para a etapa 1 ou solicita novo link |
| Voltar para login | Botão secundário com contorno vermelho | Habilitado | Retorna para a tela de Login |

### Estado de sucesso - Senha redefinida

**Quando aparece:**  
Após a senha ser alterada com sucesso.

**Título do card:**  
`Senha redefinida`

**Mensagem:**  
`Sua senha foi alterada com sucesso. Agora você já pode entrar na sua conta.`

**Botões e ações:**

| Elemento | Tipo | Estado inicial | Ação esperada |
| --- | --- | --- | --- |
| Entrar | Botão primário vermelho | Habilitado | Leva para a tela de Login |

## Elementos de interface

### Header

- Logo: `PedeAqui`, posicionada no canto superior esquerdo.
- Texto auxiliar: não deve exibir `Lembrou sua senha?`.
- Botão no topo: não deve exibir botão `Entrar` no header.
- A navegação de retorno deve acontecer pelos botões dentro do card.

### Card, seção ou área principal

- Tipo de container: card central branco com sombra leve.
- Borda: suave.
- Ícone principal: muda conforme a etapa.
- Conteúdo: formulário ou conteúdo informativo da etapa atual.
- Botões: posicionados ao final do card, respeitando a hierarquia de cada etapa.

### Ícones

- Etapa 1: envelope, cadeado aberto, chave ou equivalente de recuperação.
- Etapa 2: envelope com check ou equivalente de e-mail enviado.
- Etapa 3: cadeado, chave ou equivalente de nova senha.
- Erro: alerta, link quebrado ou equivalente.
- Sucesso: check ou escudo com check.
- Inputs de senha: cadeado e botão de olho para mostrar ou ocultar a senha.

Quando não houver o ícone exato disponível, deve ser usado um ícone com sentido próximo.

## Estados da tela

**Estado inicial:**  
Etapa 1 aberta, com campo de e-mail vazio, botão de envio aguardando e-mail válido e botão `Voltar para login`.

**Estado de carregamento:**  
Botões acionados devem indicar processamento, como `Enviando...` ou `Redefinindo...`, e impedir múltiplos envios.

**Estado de erro:**  
Erros devem aparecer próximos ao campo relacionado ou no card quando forem erros do link. Exemplos: e-mail inválido, senha curta, senhas diferentes, link expirado ou link já utilizado.

**Estado de sucesso:**  
Após solicitação do link, o fluxo avança para `E-mail enviado`. Após redefinição da senha, o card exibe `Senha redefinida`.

**Estado vazio:**  
Não se aplica.

## Validações

- E-mail deve possuir formato válido.
- A solicitação de recuperação não deve exigir código de verificação.
- O link enviado por e-mail deve ser válido por 1 hora.
- Link expirado ou já utilizado não deve alterar a senha.
- Nova senha deve possuir no mínimo 8 caracteres.
- Confirmação de senha deve ser igual à nova senha.
- O formulário não deve permitir múltiplos envios durante carregamento.

## Comportamento esperado

1. O lojista acessa `Esqueci minha senha` pela tela de Login.
2. O sistema exibe a etapa 1.
3. O lojista informa o e-mail e solicita o link.
4. O sistema envia o link e exibe a etapa 2.
5. O lojista acessa o link recebido no e-mail.
6. O sistema valida o link.
7. Se o link estiver válido, o sistema exibe a etapa 3.
8. O lojista informa e confirma a nova senha.
9. O sistema valida os campos e altera a senha.
10. O sistema exibe o estado de sucesso e oferece o botão `Entrar`.

## Design

**Layout:**  
Fluxo mobile-first, com logo no topo, indicador de etapas e card central. O layout deve seguir a mesma linguagem das telas de Login e Cadastro.

**Cores principais:**  
Vermelho da marca para bolinhas ativas, linhas concluídas, ícones, botões primários, links e destaques de texto. Branco para card e botões secundários. Preto para títulos. Cinza para textos auxiliares, bordas neutras, etapas futuras e placeholders.

**Tipografia:**  
Título forte e direto, com uma palavra em vermelho quando fizer sentido. Subtítulo menor e explicativo. Labels e textos auxiliares legíveis.

**Espaçamentos:**  
O indicador de etapas deve ter respiro suficiente antes do card. O card deve manter bom espaçamento entre ícone, título, subtítulo, campos, mensagens e ações.

**Componentes reutilizáveis:**  
`AuthHeader`, `RecoveryStepIndicator`, `AuthCard`, `EmailInput`, `PasswordInput`, `InfoBox`, `PrimaryButton`, `OutlineButton`, `TextLink`, `StatusMessage`.

**Imagens ou ilustrações:**  
Não usar imagens externas. Usar apenas ícones e elementos decorativos sutis, mantendo foco no fluxo.

## Responsividade

**Desktop:**  
Card centralizado com largura controlada. O indicador de etapas pode ocupar largura maior, mas sem ficar exagerado. A tela não deve parecer vazia nem esticar demais os campos.

**Mobile:**  
Mobile-first. Card ocupa quase toda a largura disponível com margens confortáveis. Indicador de etapas deve caber sem quebrar os labels. Botões devem ter área de toque adequada.

**Pontos de atenção:**  
Não misturar formulário, erro e sucesso na mesma tela. Cada estado deve aparecer separadamente. O botão `Voltar para login` deve manter contorno vermelho. O link `Enviar novamente` não deve virar botão com borda.

## Acessibilidade

- Todos os campos devem possuir label visível ou acessível.
- Ícones não devem substituir textos.
- O indicador de etapas deve possuir texto além da cor.
- Botões devem possuir texto claro.
- Links devem ter foco visível.
- Mensagens de erro devem ser associadas aos campos correspondentes.
- O botão de olho deve ter descrição acessível, como `Mostrar senha` ou `Ocultar senha`.
- O contraste entre vermelho, branco, preto e cinza deve ser validado.

## Observações

O MVP usa recuperação por link enviado por e-mail. Não deve existir campo de código de verificação neste fluxo.

A wireframe de referência representa principalmente a etapa `E-mail enviado`; a documentação registra também as etapas e estados necessários para o fluxo completo de recuperação de senha.
