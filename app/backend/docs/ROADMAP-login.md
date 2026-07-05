# login-ROADMAP: Fluxo de Validação e Arquitetura de Autenticação

Este documento detalha o fluxo de validação local das funcionalidades da feature de `auth` e descreve a arquitetura de Clean Architecture adotada no backend do projeto PedeAqui.

---

## 1. Fluxo de Validação (Ambiente Local)

Para validar a integridade do sistema de login e perfis localmente conectado ao Supabase CLI, siga os seguintes passos de verificação:

### Passo A: Executar Teste de Integração Ponta a Ponta
O script de verificação simula um cliente HTTP executando o fluxo completo de autenticação contra o backend Express e a instância local do Supabase:
```bash
npx ts-node src/scripts/verifyAuth.ts
```
**Operações do script:**
1. **Signup (`POST /api/auth/signup`)**: Cria um novo usuário e perfil de teste vinculados.
2. **Login (`POST /api/auth/login`)**: Autentica o usuário e extrai o `accessToken`.
3. **Get Me (`GET /api/auth/me`)**: Envia o token obtido no cabeçalho `Authorization: Bearer <token>` para validar a rota protegida e o funcionamento do middleware.

### Passo B: Executar Testes Unitários com Jest
Garante o funcionamento e a cobertura mínima obrigatória (>= 95% para os Use Cases) do núcleo da aplicação:
```bash
npm run test
```

### Passo C: Validar Row Level Security (RLS) da tabela `plans`
Certifique-se de que a proteção RLS está ativa e configurada no Supabase local:
```sql
SELECT policyname, tablename, cmd, qual FROM pg_policies WHERE tablename = 'plans';
```
*Esperado:* A presença das políticas de segurança `plans_read_all` (leitura de planos ativos pública) e `plans_admin_modify` (modificações restritas aos administradores).

---

## 2. Visão Geral da Arquitetura (Clean Architecture & SOLID)

A arquitetura do backend é baseada em camadas independentes, onde as dependências fluem sempre de fora para dentro. O núcleo da aplicação (Use Cases e Models) não conhece detalhes de infraestrutura (como Express ou Supabase).

```text
  [Mundo Externo / HTTP]
            │
            ▼
┌──────────────────────────┐
│          Routes          │  <-- Express (src/routes/authRoutes.ts)
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│      Controllers         │  <-- Adapta HTTP/JSON (src/controllers/AuthController.ts)
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│       Use Cases          │  <-- Lógica pura de Negócio (src/useCases/auth/)
└───────────┬──────────────┘
            │
  (Injeção de Dependência)
            ▼
┌──────────────────────────┐
│      Repositories        │  <-- Interfaces (src/repositories/IAuthRepository.ts)
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│      Supabase SDK        │  <-- Infraestrutura de persistência (src/repositories/supabase/)
└──────────────────────────┘
```

### Detalhamento das Camadas

#### A. Camada de Infraestrutura e Rotas (Camada Externa)
- **[app.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/app.ts)**: Ponto de entrada que inicializa a aplicação Express.
- **[authRoutes.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/routes/authRoutes.ts)**: Declara os endpoints e associa middlewares e controllers.
- **[authMiddleware.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/middlewares/authMiddleware.ts)**: Middleware de rota protegida que intercepta a requisição, extrai o Bearer token JWT, valida o token contra o Supabase (`supabase.auth.getUser()`) e anexa as informações do usuário ao contexto da requisição (`req.user`).

#### B. Camada de Adaptadores de Interface (Controllers)
- **[AuthController.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/controllers/AuthController.ts)**: Controladores responsáveis por extrair dados do HTTP Request (`body`, `headers`, `params`), invocar os Use Cases apropriados e retornar a resposta JSON com o status HTTP correspondente. Não contém lógica de banco de dados nem regras de negócio direta.

#### C. Camada de Casos de Uso (Use Cases / Regras de Negócio)
- **Use Cases** (ex: **[LoginUseCase.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/useCases/auth/LoginUseCase.ts)**): Contém a lógica pura de negócio.
- **Injeção de Dependência**: O Use Case depende apenas das interfaces dos repositórios (definidas no construtor). Isso facilita testes unitários com mocks de forma 100% isolada e veloz.

#### D. Camada de Acesso a Dados (Repositories)
- **[IAuthRepository.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/repositories/IAuthRepository.ts)**: Interface (contrato) que define quais assinaturas de métodos a aplicação reconhece.
- **[SupabaseAuthRepository.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/repositories/supabase/SupabaseAuthRepository.ts)**: A classe concreta que de fato utiliza o SDK do Supabase para operações de cadastro, login, logout, redefinição de senha e rotação de refresh token.

#### E. Camada de Modelos de Domínio (Models)
- **[Profile.ts](file:///home/Vitor/Projetos/pedeaqui/app/backend/src/models/Profile.ts)**: Contratos TypeScript e entidades de representação do domínio. Livre de qualquer dependência externa ou de banco de dados.
