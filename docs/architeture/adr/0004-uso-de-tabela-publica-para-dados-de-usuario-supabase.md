# 0004 - Uso de Tabela Pública para Dados de Usuário no Supabase

## Status
Accepted

## Contexto

O PedeAqui utilizará PostgreSQL com instância gerenciada via Supabase, conforme definido na ADR 0003. Dentro desse contexto, a autenticação poderá ser apoiada pelo Supabase Auth, que mantém os usuários autenticados na tabela gerenciada `auth.users`.

A tabela `auth.users` é uma tabela oficial e gerenciada pelo Supabase. Porém, o schema `auth` não é exposto na API auto-gerada do Supabase por motivos de segurança. Portanto, dados de usuário que precisam ser acessados pela aplicação, por regras de negócio, pelo frontend ou por consultas controladas não devem depender de acesso direto à tabela `auth.users`.

Além disso, tabelas e objetos gerenciados internamente pelo Supabase podem mudar ao longo do tempo. A documentação oficial orienta que, ao referenciar tabelas gerenciadas como `auth.users`, sejam usadas apenas chaves primárias como referência de chave estrangeira.

O sistema também terá perfis e papéis próprios do domínio, como lojista, cliente e administrador. Esses dados não pertencem diretamente à autenticação, mas sim ao domínio da aplicação.

## Decisão

Adotamos uma tabela pública separada para armazenar dados complementares de usuário da aplicação.

A tabela padrão será:

```text
public.profiles
```

Essa tabela deve:

- utilizar o mesmo `id` do usuário autenticado;
- referenciar `auth.users(id)`;
- usar `on delete cascade` para manter integridade quando um usuário for removido;
- armazenar apenas dados de domínio da aplicação;
- manter regras de acesso por Row Level Security (RLS);
- ser usada pela aplicação para consultar e atualizar dados complementares do usuário.

Exemplo conceitual:

```sql
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  full_name text,
  document text,
  role text,
  created_at timestamp with time zone default now(),

  primary key (id)
);
```

A tabela `auth.users` deve continuar sendo tratada como fonte de identidade/autenticação, enquanto `public.profiles` será a fonte de dados de perfil e informações de negócio do PedeAqui.

O backend Express poderá consultar e manipular `public.profiles` conforme as regras de negócio do sistema. O frontend não deve acessar dados sensíveis diretamente sem políticas de segurança adequadas.

## Consequências

### Positivas

- Separação clara entre autenticação e dados de domínio.
- Redução de acoplamento com tabelas internas gerenciadas pelo Supabase.
- Melhor controle de permissões por RLS.
- Possibilidade de expor dados controlados pela API sem expor o schema `auth`.
- Facilidade para relacionar usuários a lojas, pedidos, perfis e regras próprias do PedeAqui.
- Maior aderência às recomendações oficiais do Supabase para acesso a dados de usuário via API.

### Negativas

- Necessidade de manter sincronização entre `auth.users` e `public.profiles`.
- Criação de uma tabela adicional no modelo de dados.
- Necessidade de políticas RLS bem definidas para evitar exposição indevida.
- Possibilidade de inconsistência caso o perfil não seja criado corretamente após o cadastro.

## Riscos

- Criar regras de autorização usando dados editáveis pelo próprio usuário.
- Expor dados sensíveis em `public.profiles` sem necessidade.
- Criar foreign keys para colunas não primárias de tabelas gerenciadas pelo Supabase.
- Esquecer de habilitar RLS em tabelas expostas pela API.
- Implementar trigger de criação de perfil de forma incorreta e bloquear o cadastro de novos usuários.
