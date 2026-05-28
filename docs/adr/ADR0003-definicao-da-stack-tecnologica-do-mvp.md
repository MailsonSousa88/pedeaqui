# 0003 - Definição da Stack Tecnológica do MVP

## Status
Accepted

## Contexto

O projeto PedeAqui necessita de um backend próprio para gerenciar regras de negócio, autenticação, persistência de dados e comunicação com o frontend.

Diferentemente de uma abordagem baseada em Backend-as-a-Service (BaaS), optou-se por maior controle sobre a lógica da aplicação, permitindo maior flexibilidade e aderência a boas práticas arquiteturais.

O time possui familiaridade com JavaScript/TypeScript e frameworks modernos do ecossistema web, além da necessidade de entregar um MVP funcional dentro de um prazo limitado.

## Decisão

Definimos a seguinte stack para o backend:

- **Arquitetura**: API REST
- **Runtime / Framework**: Next.js (API Routes / Route Handlers)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL (instância gerenciada via Supabase)
- **Comunicação**: HTTP (REST)

O Next.js será utilizado não apenas para o frontend, mas também como camada de backend, centralizando a aplicação e reduzindo a necessidade de múltiplos serviços.

O banco de dados PostgreSQL será acessado diretamente pelo backend, sem uso de funcionalidades de BaaS.

## Consequências

### Positivas
- Controle total sobre regras de negócio
- Possibilidade de aplicar arquiteturas como Clean Architecture
- Flexibilidade para implementar lógica complexa
- Redução de vendor lock-in (uso do Supabase apenas como banco)
- Unificação de frontend e backend no mesmo ecossistema (Next.js)
- Tipagem forte com TypeScript em toda a aplicação

### Negativas
- Maior esforço de desenvolvimento comparado ao uso de BaaS
- Necessidade de implementar autenticação manualmente
- Responsabilidade por validação, segurança e regras de negócio
- Maior complexidade de código e manutenção

## Riscos
- Sobrecarga do Next.js ao acumular responsabilidades de frontend e backend
- Implementação incorreta de segurança (ex: autenticação, autorização)
- Performance limitada em cenários de alta carga
- Necessidade futura de separar backend em serviço independente (microserviço)