# 0002 - Escolha do Estilo e Organização de Código

## Status
Accepted

## Contexto

O projeto PedeAqui possui múltiplos domínios de negócio (auth, produtos, pedidos, loja) e será desenvolvido por uma equipe com tempo limitado.

A arquitetura tradicional em camadas (controllers, services, repositories) poderia gerar forte acoplamento horizontal e dificultar a evolução independente de funcionalidades.

Além disso, mesmo utilizando Supabase como Backend-as-a-Service (BaaS), ainda existe a necessidade de organizar corretamente a lógica de negócio para evitar acoplamento com detalhes de infraestrutura (API, banco de dados, autenticação).

Portanto, o projeto precisa atender dois objetivos simultâneos:
- Organização eficiente do frontend
- Isolamento e testabilidade da lógica de negócio

## Decisão

Adotamos uma abordagem híbrida, combinando:

### 1. Frontend → Vertical Slice / Feature-Based Architecture

O frontend será organizado por domínio de negócio:

```
src/
 ├── features/
 │    ├── auth/
 │    ├── products/
 │    ├── orders/
 │
 ├── shared/
 ├── app/
```

Cada feature contém:
- Componentes (UI)
- Hooks
- Serviços (integração com Supabase)
- Tipos

Essa abordagem garante alta coesão e independência entre funcionalidades.

### 2. Lógica de Negócio → Clean Architecture

A lógica de negócio seguirá os princípios da Clean Architecture, sendo organizada em camadas internas:
- Domínio (Entities) → regras de negócio puras
- Casos de Uso (Use Cases) → fluxos da aplicação
- Infraestrutura (Services) → integração com Supabase
- Interface (UI) → React

Regra principal: Dependências sempre apontam para o núcleo (domínio)

Isso significa:
- O domínio não depende de React
- O domínio não depende de Supabase
- A lógica de negócio é isolada e testável

### 3. Integração entre as abordagens

Cada feature do frontend atua como ponto de entrada, enquanto:
- Chama casos de uso (use-cases)
- Que utilizam serviços (infraestrutura)
- Que acessam o Supabase

Essa integração permite manter:
- Organização por feature (macro)
- Organização por camadas (lógica interna)

## Consequências

### Positivas
- Alta coesão por funcionalidade (frontend)
- Forte desacoplamento da lógica de negócio (backend lógico)
- Alta testabilidade dos casos de uso
- Facilidade de manutenção e evolução
- Permite migração futura de BaaS para backend próprio
- Desenvolvimento paralelo entre membros

### Negativas
- Aumento da complexidade arquitetural
- Maior quantidade de arquivos (boilerplate)
- Overhead para um MVP simples
- Curva de aprendizado maior para o time

## Riscos
- Mistura incorreta entre camadas (quebra da Clean Architecture)
- Features acessando diretamente o Supabase sem passar por casos de uso
- Crescimento desorganizado da pasta shared
- Abandono parcial do padrão ao longo do projeto