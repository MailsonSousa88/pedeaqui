# UC-LJ-0002 - Configurar e manter dados da loja

## Objetivo

Permitir que o lojista ativo cadastre, revise e atualize as informações da sua loja para manter a vitrine digital correta e disponível ao consumidor.

## Ator principal

Lojista.

## Atores secundários

Consumidor.

## Pré-condições

- O lojista deve estar autenticado.
- O lojista deve possuir conta ativa ou estar em uma etapa permitida do onboarding.
- O lojista deve possuir uma loja vinculada a sua conta ou estar criando a primeira loja durante o onboarding.

## Pós-condições

- A loja fica cadastrada ou atualizada.
- As informações da loja ficam disponíveis para exibição pública quando a loja e o lojista estiverem ativos.
- Alterações relevantes podem refletir na vitrine pública da loja.

## Gatilho

O lojista acessa a etapa de pré-configuração da loja durante o onboarding ou acessa a configuração da loja pelo painel administrativo.

## Fluxo principal

| Passo | Ação |
|-------|------|
| 1 | O lojista acessa a configuração da loja durante o onboarding ou pelo painel administrativo. |
| 2 | O sistema exibe os dados atuais da loja quando existirem. |
| 3 | O lojista informa ou altera identidade da loja, e-mail de contato, WhatsApp, funcionamento e endereço. |
| 4 | O lojista revisa os dados informados. |
| 5 | O lojista salva ou finaliza a configuração. |
| 6 | O sistema valida preenchimento, formatos e regras que dependem do backend. |
| 7 | O sistema registra ou atualiza os dados da loja. |
| 8 | O sistema direciona o lojista para a próxima etapa do onboarding ou retorna para o painel da loja. |

## Fluxos alternativos

### FA01 - Pré-configuração da primeira loja durante onboarding

| Passo | Ação |
|-------|------|
| 1a | O lojista conclui o cadastro inicial e acessa a tela de pré-configuração da loja. |
| 1b | O sistema exibe o formulário por etapas. |
| 1c | O lojista preenche identidade, contato, funcionamento e endereço. |
| 1d | O lojista revisa os dados. |
| 1e | O sistema valida os dados e direciona para revisão do plano e pagamento. |

### FA02 - Editar informações da loja após ativação

| Passo | Ação |
|-------|------|
| 1a | A partir da dashboard, o lojista acessa a opção de editar informações da loja. |
| 1b | O sistema exibe os dados atuais da loja para edição. |
| 1c | O lojista altera as informações desejadas. |
| 1d | O lojista salva as alterações. |
| 1e | O sistema atualiza os dados da loja. |
| 1f | O fluxo retorna para a dashboard da loja. |

### FA03 - Lojista retorna para corrigir etapa anterior

| Passo | Ação |
|-------|------|
| 4a | O lojista identifica que uma informação está incorreta durante a revisão. |
| 4b | O lojista seleciona editar a etapa correspondente. |
| 4c | O sistema retorna para a etapa escolhida mantendo os dados já preenchidos. |
| 4d | O lojista corrige os dados e revisa novamente. |

## Fluxos de exceção

### FE01 - Dados obrigatórios ausentes

| Passo | Ação |
|-------|------|
| 6a | O sistema identifica ausência de dados obrigatórios. |
| 6b | O sistema impede o salvamento ou avanço. |
| 6c | O sistema informa quais campos devem ser corrigidos. |
| 6d | O fluxo retorna para a etapa correspondente. |

### FE02 - Dados indisponíveis no backend

| Passo | Ação |
|-------|------|
| 6a | O sistema identifica conflito de dados, como nome de loja já usado ou slug já existente. |
| 6b | O sistema impede o avanço. |
| 6c | O lojista deve alterar os campos indicados. |

### FE03 - Loja ou lojista sem permissão de alteração

| Passo | Ação |
|-------|------|
| 1a | O lojista tenta alterar dados de loja que não pertence à sua conta ou está fora do estado permitido. |
| 1b | O sistema bloqueia a operação. |
| 1c | O sistema retorna erro de permissão ou indisponibilidade. |

## Regras de negócio

- Cada lojista deve possuir no máximo uma loja no MVP, conforme regra atual de criação de loja.
- A primeira loja pode ser criada durante o onboarding antes da confirmação de pagamento.
- Loja criada antes do pagamento não deve ficar pública até a ativação do lojista.
- A loja deve possuir dados mínimos de identificação e contato.
- Informações públicas da loja devem ser mantidas atualizadas pelo lojista.
- Alterações salvas devem refletir na vitrine pública quando a loja estiver ativa.
- O frontend pode validar formato e preenchimento, mas disponibilidade e permissão devem ser validadas no backend.

## Telas relacionadas

- `docs/screens/screen-store-preconfiguration-0005.md`
- `docs/screens/screen-store-preregistration-validation-0009.md`
- Futuras telas de dashboard/configuração da loja.

## Referências

- `RF016` - Criação de loja.
- `RF017` - Atualização de dados da loja.
- `RF018A` - Desativação da loja.
- `RF018B` - Ativação da loja.
- `RNF0002` - Isolamento de dados entre lojas.
- `RNF0009` - Autenticação em rotas privadas do lojista.
- `RNF0018` - Validação server-side de regras críticas.
- Status Report I - Fluxo Alternativo: Editar informações da loja após cadastro.
- User Story: "Como lojista, eu quero cadastrar e configurar as informações da minha loja..."
