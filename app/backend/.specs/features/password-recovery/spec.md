# Recuperação de Senha — Especificação

## Problema

O endpoint `POST /api/auth/recover-password` já solicita ao Supabase o envio de um e-mail, mas não informa uma URL de retorno. No ambiente local, o Supabase usa `http://127.0.0.1:3000` como `site_url`, que aponta para a API em vez do frontend. Além disso, a tela de recuperação existente no frontend é apenas visual: não tem rota pública nem integração com a API. Consequentemente, um lojista recebe o e-mail, mas não consegue concluir a redefinição da senha.

## Objetivos

- [ ] Permitir que um lojista solicite um link de recuperação e conclua a troca de senha sem acessar a API diretamente.
- [ ] Redirecionar links de recuperação para uma rota pública e real do frontend em cada ambiente.
- [ ] Garantir que a alteração de senha ocorra somente com um token de recuperação válido, sem manter sessão Supabase compartilhada no processo da API.
- [ ] Preservar a arquitetura atual: Route → Middleware → Controller → Use Case → Repository → Supabase.

## Fora de escopo

| Item | Motivo |
| --- | --- |
| Alterar e-mail do usuário | É outro fluxo de identidade do Supabase. |
| Recuperação por SMS, MFA ou perguntas de segurança | O produto usa recuperação por e-mail. |
| Personalização do template de e-mail | A entrega depende apenas do link e da URL de retorno; o template fica no Supabase. |
| Alterar a política global de senha do Supabase | A feature mantém a regra já aplicada pelo formulário: mínimo de 8 caracteres. |
| Recuperação para usuários não autenticados sem link válido | A troca de senha exige o token entregue pelo Supabase. |

---

## Histórias de usuário

### P1: Solicitar link de recuperação ⭐ MVP

**História:** Como lojista que esqueceu a senha, quero solicitar um link de recuperação pelo meu e-mail para voltar a acessar minha loja.

**Por que P1:** É o ponto de entrada do fluxo e já possui endpoint e interface iniciados, mas desconectados.

**Critérios de aceitação:**

1. **WHEN** o lojista acessar `/recuperar-senha` **THEN** o frontend **SHALL** exibir um formulário público para informar o e-mail e um retorno para `/login`.
2. **WHEN** o formulário receber um e-mail válido **THEN** o frontend **SHALL** chamar `POST /api/auth/recover-password` com `{ "email": string }` e apresentar a confirmação de envio sem expor se a conta existe.
3. **WHEN** o backend processar uma solicitação válida **THEN** ele **SHALL** chamar o Supabase com uma URL de retorno configurada para a rota `/recuperar-senha` do frontend do ambiente atual.
4. **WHEN** o e-mail ou a chamada falhar **THEN** o frontend **SHALL** manter o formulário disponível e apresentar uma mensagem acionável, sem avançar para a confirmação.
5. **WHEN** o link for gerado **THEN** sua URL de retorno **SHALL** estar permitida na configuração de Redirect URLs do projeto Supabase correspondente.

**Teste independente:** Em ambiente local, solicitar o link com um usuário de teste, abri-lo no Mailpit e confirmar que ele chega a `http://localhost:5173/recuperar-senha` — e não à porta da API.

---

### P1: Redefinir senha a partir do link ⭐ MVP

**História:** Como lojista que abriu um link de recuperação válido, quero definir e confirmar uma nova senha para voltar ao login.

**Por que P1:** Sem esta etapa, o e-mail é recebido, mas não resolve a perda de acesso.

**Critérios de aceitação:**

1. **WHEN** o Supabase redirecionar o navegador com um token de recuperação válido **THEN** a rota `/recuperar-senha` **SHALL** reconhecer o estado de recuperação e exibir o formulário de nova senha.
2. **WHEN** o lojista informar uma senha de pelo menos 8 caracteres e uma confirmação idêntica **THEN** o frontend **SHALL** enviar `POST /api/auth/reset-password` com `{ "password": string }` e `Authorization: Bearer <access_token>`.
3. **WHEN** o backend receber um token Bearer válido de recuperação **THEN** ele **SHALL** validá-lo com `authMiddleware` e atualizar a senha usando um cliente Supabase criado para aquele token, nunca o cliente Supabase global sem sessão.
4. **WHEN** a senha for alterada com sucesso **THEN** o frontend **SHALL** remover os tokens da URL, informar a conclusão e direcionar o lojista para `/login`.
5. **WHEN** o token estiver ausente, expirado ou inválido **THEN** o frontend **SHALL** impedir a submissão, explicar que o link não é mais válido e oferecer o reinício do fluxo.
6. **WHEN** a API receber `POST /api/auth/reset-password` sem um Bearer token válido **THEN** ela **SHALL** retornar `401` e não alterar nenhuma senha.
7. **WHEN** a senha for inválida ou a confirmação divergir **THEN** o frontend **SHALL** exibir a validação local e não fazer a chamada à API.

**Teste independente:** Solicitar um link, abrir a URL recebida, trocar a senha e autenticar em `POST /api/auth/login` com a nova credencial.

---

### P2: Configuração previsível entre ambientes

**História:** Como pessoa responsável pelo deploy, quero configurar explicitamente a URL de retorno da recuperação para que os links funcionem em desenvolvimento e produção.

**Por que P2:** O link não pode depender implicitamente do `site_url` padrão da API nem de uma URL local em produção.

**Critérios de aceitação:**

1. **WHEN** o backend iniciar **THEN** ele **SHALL** obter a URL de recuperação de uma configuração de ambiente dedicada, `PASSWORD_RECOVERY_REDIRECT_URL`.
2. **WHEN** o ambiente for local **THEN** `PASSWORD_RECOVERY_REDIRECT_URL` **SHALL** ser `http://localhost:5173/recuperar-senha` e `supabase/config.toml` **SHALL** permitir essa URL como `site_url` e Redirect URL.
3. **WHEN** o ambiente for publicado **THEN** a URL pública equivalente **SHALL** ser cadastrada em Authentication → URL Configuration do projeto Supabase hospedado; alterar apenas `supabase/config.toml` não é suficiente para a nuvem.
4. **WHEN** a URL configurada não estiver na allow-list do Supabase **THEN** a solicitação de recuperação **SHALL** falhar de forma identificável para configuração, sem enviar um link que leve à API.

**Teste independente:** Executar o fluxo em local e em um ambiente publicado, validando que cada e-mail aponta ao domínio frontend correto.

---

## Contratos públicos

| Interface | Estado após a feature |
| --- | --- |
| `POST /api/auth/recover-password` | Continua pública e recebe `{ email }`; usa `PASSWORD_RECOVERY_REDIRECT_URL` como `redirectTo`. |
| `POST /api/auth/reset-password` | Passa a exigir `Authorization: Bearer <access_token>`; recebe `{ password }`; retorna sucesso somente após atualização no Supabase. |
| `GET /recuperar-senha` | Nova rota pública do frontend para solicitação, confirmação de envio e redefinição a partir do fragmento do link. |
| `PASSWORD_RECOVERY_REDIRECT_URL` | Nova variável de ambiente do backend; URL absoluta exata da rota frontend de recuperação. |

## Casos de borda

- **WHEN** o usuário abrir `/recuperar-senha` sem fragmento de token **THEN** o sistema **SHALL** iniciar na solicitação de e-mail, e não no formulário de nova senha.
- **WHEN** o usuário abrir um link expirado ou já usado **THEN** o sistema **SHALL** solicitar um novo link; a senha atual permanece inalterada.
- **WHEN** o usuário recarregar a página antes de concluir a troca **THEN** o frontend **SHALL** voltar a avaliar o fragmento da URL e preservar o estado permitido pelo token, sem gravá-lo em `localStorage` ou `sessionStorage`.
- **WHEN** o usuário concluir a troca de senha **THEN** o fragmento com tokens **SHALL** ser removido via histórico do navegador antes da navegação para login.
- **WHEN** o mesmo e-mail for solicitado repetidamente **THEN** o sistema **SHALL** respeitar os limites de envio aplicados pelo Supabase e comunicar uma falha de tentativa sem revelar dados da conta.
- **WHEN** o Supabase rejeitar a nova senha por uma política configurada no projeto **THEN** a API **SHALL** propagar um erro seguro e o frontend **SHALL** manter o formulário para correção.

## Requisitos não funcionais

- Tokens de recuperação não podem ser enviados no corpo, registrados em logs ou persistidos pelo frontend; devem ser usados apenas no header `Authorization` da chamada de redefinição.
- A rota de redefinição deve usar cliente Supabase por requisição, seguindo o padrão já existente de `createAuthenticatedSupabaseClient(accessToken)` para leituras privadas.
- O fluxo deve manter a confirmação de senha e a regra mínima de 8 caracteres já presentes no frontend.
- A documentação de ambiente deve distinguir a configuração da CLI local (`supabase/config.toml`) da configuração do projeto hospedado no dashboard do Supabase.

## Rastreabilidade de requisitos

| ID | História | Requisito | Estado |
| --- | --- | --- | --- |
| PRESET-01 | P1 Solicitar link | Disponibilizar rota frontend e formulário integrado para solicitar recuperação. | Pendente |
| PRESET-02 | P1 Solicitar link | Enviar o link com `redirectTo` configurável e permitido no Supabase. | Pendente |
| PRESET-03 | P1 Redefinir senha | Consumir token do link e proteger a redefinição por Bearer token válido. | Pendente |
| PRESET-04 | P1 Redefinir senha | Atualizar senha em cliente Supabase autenticado por requisição. | Pendente |
| PRESET-05 | P1 Redefinir senha | Tratar sucesso, expiração, token inválido e validação de senha no frontend. | Pendente |
| PRESET-06 | P2 Configuração | Configurar URL local/publicada e allow-list do Supabase sem apontar para a API. | Pendente |
| PRESET-07 | Transversal | Evitar enumeração de contas e exposição/persistência de tokens de recuperação. | Pendente |

**Cobertura:** 7 requisitos; 7 aguardando design e tarefas.

## Critérios de sucesso

- [ ] Um lojista consegue ir de “Esqueci minha senha” até autenticar com uma nova senha, sem intervenção manual no Supabase.
- [ ] Links locais apontam para `localhost:5173/recuperar-senha`; links publicados apontam para o domínio frontend configurado, nunca para a porta da API.
- [ ] Um token inválido, expirado ou ausente não altera a senha e oferece uma forma clara de reiniciar o fluxo.
- [ ] Os testes de unidade modificados do módulo auth passam e o frontend passa em `npm run lint` e `npm run build`.
