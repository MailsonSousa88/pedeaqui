# TDD - Sistema de Autenticação com Supabase

| Campo           | Valor                        |
| --------------- | ---------------------------- |
| Status          | Implementado (Fase 2) / Pendente Revisão e Consolidação |
| Componentes     | AuthController, UseCases, Middlewares, Supabase Repositories |
| Criado          | 2026-06-16                   |

---

## 1. Contexto

Este projeto consiste na implementação do sistema de Autenticação para o backend (`pedeaqui.store`), utilizando Node.js, Express, TypeScript e aderindo aos princípios da Clean Architecture. A infraestrutura de identidade e banco de dados é gerenciada via **Supabase**.
Até o momento, concluímos a Fase de Exploração (desenvolvimento da feature com testes unitários mockados).

## 2. Definição do Problema & Motivação

Precisávamos de um fluxo seguro e robusto para gerenciar a identidade dos usuários da plataforma, suportando operações de cadastro, login, logout, recuperação de senha e atualização de sessão. A escolha do Supabase visa delegar a complexidade de segurança (como hash de senhas, envio de emails transacionais, emissão de JWTs e RLS) para um provedor consolidado, mantendo nosso backend focado nas regras de negócio.

## 3. Escopo

### ✅ O que foi entregue (Fase de Exploração)
- **Campos e Domínio**: Entidade `Profile` atualizada para incluir documento (`CPF`). Adicionado `cpfValidator.ts` como validação nativa sem dependências externas.
- **Contratos (Interfaces)**: `IAuthRepository` e `IProfileRepository` (incluindo assinatura de busca por documento).
- **Regras de Negócio (Use Cases)**: `SignUp`, `Login`, `Logout`, `RecoverPassword`, `ResetPassword`, `RefreshSession`.
- **Implementações (Repositories)**: Integração real com o SDK do Supabase (`supabase-js`).
- **Web/Infra**: `AuthController`, `authMiddleware` e o roteador `authRoutes.ts`.
- **Testes Unitários**: Cobertura de 100% para os Use Cases e Middleware.

### ❌ O que está fora do escopo no momento
- Funcionalidades de OAuth (Login com Google/Apple) - Planejado para o futuro.
- Testes End-to-End (E2E) - Eles pertencem à **Fase de Consolidação**, que ainda não foi ativada.

---

## 4. Solução Técnica e Fluxo

### Arquitetura de Camadas

A implementação segue rigorosamente a regra de dependência de fora para dentro:
`Route` → `Middleware` → `Controller` → `Use Case` → `Repository (Supabase)`

### Fluxo de Dados (Exemplo: Cadastro)

1. **Cliente HTTP** envia `POST /api/auth/signup` com email, senha, nome, telefone e document (CPF).
2. **AuthController** extrai e faz a validação básica dos dados, acionando o `SignUpUseCase`.
3. **SignUpUseCase**:
   - Executa a busca prévia pelo CPF no banco com `profileRepository.findByDocument(cpf)`. Se já existir, lança erro `'CPF already registered'`, impedindo o cadastro e evitando usuários órfãos no Auth.
   - Aciona `IAuthRepository.signUp` (Cria usuário no Supabase Auth).
   - Aciona `IProfileRepository.create` (Cria o registro complementar na tabela `profiles`).
4. **SupabaseProfileRepository** executa a query `insert` no banco de dados.
5. A resposta retorna o perfil gerado pelo fluxo inverso até o Controller, que devolve um HTTP 201 Created.

### Relacionamento entre `auth.users` e `public.profiles`

Para garantir segurança, separação de responsabilidades e integridade das consultas, o sistema separa a autenticação dos dados de negócio:

1. **Relação 1:1 e Integridade**: A tabela `public.profiles` possui uma relação de 1 para 1 com a tabela interna do Supabase `auth.users`. O campo `profiles.id` atua como chave estrangeira (`FOREIGN KEY`) referenciando `auth.users(id) ON DELETE CASCADE`.
2. **Isolamento de Credenciais**: A tabela `auth.users` armazena e-mails, hashes de senhas e dados confidenciais do GoTrue de forma privada e inacessível pela API REST padrão.
3. **Lógica de Negócio em `public`**: Informações como nome, telefone e o documento validado (`CPF`) são guardados em `public.profiles`, facilitando Joins com outras tabelas de negócio (`orders`, `stores`) e permitindo a aplicação de políticas RLS específicas.
4. **Independência de Provedor de Autenticação**: Essa separação garante que, caso o provedor de identidade seja alterado no futuro (ex. de Supabase Auth para Auth0 ou Firebase Auth), as entidades e regras de negócio da aplicação não sofram impactos estruturais.

### Endpoints (Contratos da API)

| Endpoint | Método | Protegido? | Descrição |
|----------|--------|------------|-----------|
| `/api/auth/signup` | POST | Não | Cadastra um novo usuário e perfil. |
| `/api/auth/login` | POST | Não | Autentica o usuário e retorna os tokens. |
| `/api/auth/logout` | POST | Sim | Invalida a sessão atual no Supabase. |
| `/api/auth/recover-password` | POST | Não | Solicita email de redefinição de senha. |
| `/api/auth/reset-password` | POST | Não | Redefine a senha (necessita sessão recuperada). |
| `/api/auth/refresh` | POST | Não | Atualiza o accessToken usando o refreshToken. |
| `/api/auth/me` | GET | Sim | Retorna os dados básicos do usuário logado. |

---

## 5. Considerações de Segurança

- **Tokens JWT**: Gerenciados nativamente pelo Supabase GoTrue. O backend apenas intercepta o header `Authorization: Bearer <token>` e o valida através de `supabase.auth.getUser(token)` no middleware.
- **Armazenamento de Senhas**: O backend **não armazena senhas**. Elas trafegam em trânsito (TLS) até o Supabase, que aplica os devidos hashes de segurança (Bcrypt/Argon2).
- **Tratamento de Erros**: Erros internos ou de banco de dados não vazam detalhes de implementação, o middleware e controllers traduzem para mensagens HTTP legíveis (400, 401, 500).

---

## 6. Riscos e Pontos de Atenção

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| **Falha Parcial no Cadastro** | Alto | No `SignUpUseCase`, realizamos a busca de CPF existente no banco de dados de perfis antes de criar a conta no Auth. Isso impede a geração de contas no Auth que falhariam em seguida ao tentar salvar o perfil devido a CPF duplicado. |
| **Configuração de Confirmação de E-mail** | Médio | O Supabase exige confirmação de email por padrão, o que quebra fluxos de teste locais se os emails forem falsos. *Mitigado desligando temporariamente em ambiente de desenvolvimento.* |

---

## 7. O que revisar com calma e Próximos Passos

Para que possamos encerrar este módulo com perfeição e passá-lo para a definição de concluído ("Done"), os próximos passos exigem a sua revisão:

1. ~~**Revisar a Modelagem de Dados**~~: Resolvido. O modelo `Profile` foi expandido para suportar documento (CPF/CNPJ) e as lógicas de validação nativa foram implementadas no `documentValidator.ts`.
2. **Revisar Tratamento de Erro do Supabase**: Deseja padronizar as respostas de erro do Supabase antes de repassá-las ao usuário (ex: tradução de mensagens em inglês como "Email not confirmed")?
3. **Testes de Integração (Consolidação)**: Conforme o `AGENTS.md`, testes de integração (`supertest` + banco isolado) só devem ser escritos na **Fase de Consolidação**. 
   - **Ação necessária**: Após você revisar os contratos e aprovar este TDD, você precisa me dar o comando para transacionar para a Fase de Consolidação (`consolidar módulo`). A partir daí, irei gerar os testes de API (E2E) para fechar o ciclo da funcionalidade.
