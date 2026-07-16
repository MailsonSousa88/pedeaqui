# ADR 002: Separação de Domínios - Identidade e Faturamento (Bounded Contexts)

**Status**: Aceito
**Data**: 2026-06-22

## Contexto

Com base nas refatorações de autenticação e contas, identificou-se a necessidade de separar a validação e o armazenamento de documentos (CPF e CNPJ). Anteriormente, a entidade `Tenant` armazenava um campo genérico `cpf_cnpj`. Isso gerava ambiguidade de domínio e misturava a identidade física do usuário com a identidade jurídica ou comercial da loja.

A separação de `Profile` e `Tenant` é um exemplo clássico de definição de limites linguísticos no Domain-Driven Design (DDD): a mesma pessoa física logada interage com o sistema de duas perspectivas de domínio diferentes.

## Decisão

Formalizamos os **Bounded Contexts** (Contextos Delimitados) utilizando os princípios do DDD.

## Domain: Identity & Access (Identidade)

**Type**: Generic Subdomain (em parte delegado ao Supabase) / Supporting Subdomain.

**Ubiquitous Language**: User, Profile, Autenticação, Senha, CPF, Telefone Pessoal, Sessão.

**Business Capability**: Identificar unicamente pessoas físicas que acessam a plataforma e gerenciar suas credenciais e dados pessoais intransferíveis.

**Key Concepts**:
- `Profile` (Entity) - Representa os dados físicos da pessoa (Nome, Telefone e o CPF).
- `auth.users` (Entity) - Representa o aspecto técnico de credenciais de login.
- `SignUpUseCase` (UseCase) - Orquestra a criação do usuário na infraestrutura e do seu perfil.

**Suggested Bounded Context**: `IdentityContext`
- **Linguistic boundary**: Aqui, o "Documento" refere-se estritamente ao documento de identidade civil da pessoa física (CPF). O usuário é visto como um *Indivíduo*.
- **Integration**: Atua como *Upstream* para os demais contextos. Ele fornece a identidade base que outros módulos utilizam.

---

## Domain: Commercial & Tenant Management (Lojista/Faturamento)

**Type**: Supporting Subdomain (vital para o SaaS).

**Ubiquitous Language**: Tenant, Loja/Entidade Comercial, Business Document (CNPJ), Billing Document, Assinatura, Plano, Limite de Armazenamento.

**Business Capability**: Gerenciar a relação comercial do SaaS (PedeAqui) com a entidade do lojista, cobrando assinaturas e exigindo documentação empresarial.

**Key Concepts**:
- `Tenant` (Entity) - A entidade comercial locatária da plataforma.
- `businessDocument` (Value/Property) - O CNPJ exclusivo do locatário.
- `Subscription` & `Plan` (Entities) - O contrato financeiro entre o locatário e o SaaS.
- `v_tenants_details` (View/Read Model) - Um modelo de leitura consolidado.

**Suggested Bounded Context**: `TenantManagementContext` (ou `BillingContext`)
- **Linguistic boundary**: Aqui, o "Documento" significa o *Documento de Faturamento*. O termo "Usuário" desaparece e surge o termo "Lojista" (Tenant).
- **Integration**: Ele consome dados do `IdentityContext`. Para faturar uma assinatura, ele exige um identificador fiscal.

---

## Consequências e Integração (Cross-Domain)

Para não poluir a entidade `Tenant` com o CPF (Identity) quando uma empresa não possui CNPJ, adotamos uma estratégia arquitetural no banco de dados e na aplicação:

| Contexto Consumidor (A) | Contexto Provedor (B) | Pattern de Integração | Explicação |
| -------- | -------- | ----------------------- | ----------------------- |
| TenantManagement | Identity | **Anti-Corruption Layer (ACL) / View** | O domínio de Faturamento precisa de um `billing_document`. Criamos uma camada de leitura (`v_tenants_details`) que traduz: "Se o Tenant não tem CNPJ, pegue o CPF do Profile e chame-o de `billing_document`". |

Essa decisão garante que cada domínio fale **estritamente a sua linguagem** (Profile = CPF; Tenant = CNPJ), mantendo o código mais protegido contra regras de negócio misturadas (o clássico *Big Ball of Mud*).

**Nota de Implementação Física**: Para refletir essa dependência no nível do banco de dados, a tabela `tenants` agora faz referência direta à tabela `profiles` via Foreign Key, não mais a `auth.users`. Isso garante a integridade estrutural: não pode existir um Tenant sem o correspondente Profile de identidade criado primeiro.
