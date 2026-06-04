# 0003 - Definição da Stack Tecnológica do MVP

## Status
Accepted

## Contexto

O projeto PedeAqui necessita de um backend próprio para gerenciar regras de negócio, autenticação, persistência de dados e comunicação com o frontend.

O MVP será desenvolvido em uma estrutura separada entre frontend e backend, mantendo uma API REST dedicada para concentrar as regras de negócio, validações, integração com banco de dados e comunicação com serviços externos quando necessário.

O time possui familiaridade com JavaScript/TypeScript e com o ecossistema Node.js, além da necessidade de entregar um MVP funcional dentro de um prazo limitado. Por esse motivo, a stack deve priorizar simplicidade, produtividade, previsibilidade e facilidade de manutenção.

## Decisão

Definimos a seguinte stack para o backend:

- **Arquitetura:** API REST
- **Runtime:** Node.js
- **Framework:** Express
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL, com instância gerenciada via Supabase
- **Comunicação:** HTTP (REST)

O Express será utilizado como framework principal do backend por oferecer uma estrutura simples, madura e adequada ao escopo do MVP.

O frontend continuará separado do backend, consumindo a API REST por meio de requisições HTTP. Essa separação facilita a divisão de responsabilidades entre as camadas da aplicação e permite que o backend evolua de forma independente.

O Supabase será utilizado como infraestrutura gerenciada para PostgreSQL e, conforme necessidade do MVP, poderá apoiar autenticação e armazenamento, mantendo o backend Express como ponto central das regras de negócio.

## Consequências

### Positivas

- Stack simples e familiar para o time.
- Backend dedicado para regras de negócio e validações.
- Separação clara entre frontend e backend.
- Facilidade para organizar rotas, middlewares e serviços.
- Boa aderência ao modelo de API REST planejado para o MVP.
- Tipagem forte com TypeScript em toda a aplicação.
- Possibilidade de evoluir o backend sem acoplar a aplicação a um framework fullstack.

### Negativas

- Necessidade de manter frontend e backend como aplicações separadas.
- Maior responsabilidade sobre configuração de rotas, middlewares, autenticação e segurança.
- Necessidade de documentar contratos da API para evitar divergências entre frontend e backend.
- Possível aumento de configuração inicial em comparação com soluções fullstack integradas.

## Riscos

- Integração incompleta entre frontend e backend por falta de alinhamento nos contratos da API.
- Implementação incorreta de autenticação, autorização ou validação de dados.
- Crescimento desorganizado das rotas e serviços caso não haja padrão de organização.
- Necessidade futura de revisar a arquitetura caso o volume de acessos ou regras de negócio cresça significativamente.
