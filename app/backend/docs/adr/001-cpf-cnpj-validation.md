# ADR 001: Implementação de Validação de CPF e CNPJ Nativas

## Contexto e Problema

O sistema necessita receber um documento de identificação (CPF ou CNPJ) no momento do cadastro de novos usuários e empresas. O documento é um dado crucial e deve ser validado estrutural e algoritmicamente antes de ser aceito e salvo no banco de dados (CPF em `public.profiles.document` e CNPJ em `tenants.business_document`).

Tínhamos duas abordagens possíveis para essa validação:
1. Adicionar uma biblioteca externa (ex: `cpf-cnpj-validator`, amplamente utilizada na comunidade).
2. Implementar funções puras em TypeScript para validar as lógicas (cálculo de módulo 11).

O projeto é guiado pelas regras da Clean Architecture e pelas diretrizes do `AGENTS.md`, que limitam estritamente o uso de dependências pesadas e garantem que as lógicas de domínio (`Models`) não possuam acoplamento desnecessário com bibliotecas externas.

## Decisão

Optamos por **implementar a validação de CPF e CNPJ de forma nativa e pura em TypeScript**, localizada em `src/utils/cpfValidator.ts` e `src/utils/cnpjValidator.ts`. O módulo de domínio e os `Use Cases` utilizarão diretamente essas funções de utilidade internas.

### Consequências da Decisão

**Prós:**
- **Zero Dependências Extras:** Não adicionamos peso no `node_modules` nem riscos de segurança ou vulnerabilidades de bibliotecas de terceiros (supply chain attacks).
- **Adequação Arquitetural:** Mantém as regras corporativas (Entities/Models) completamente limpas e isoladas.
- **Performance:** Funções matemáticas simples otimizadas especificamente para a nossa necessidade, sem código não utilizado que frequentemente acompanha libs genéricas.
- **Maior Controle:** Permite ajustes refinados nas mensagens de erro e lógica de higienização de pontuação (`sanitizeDocument`) integradas às nossas próprias exceções de domínio.

**Contras:**
- **Manutenção de Código:** O algoritmo fica sob nossa responsabilidade de manutenção caso algum comportamento periférico (como mudanças nos padrões de documento do Brasil, que são extremamente raras) ocorra.
- **Custo Inicial:** Exigiu um pequeno esforço a mais para codificar as regras do Módulo 11 e escrever testes que provem sua eficácia.

## Status

**Aceita e Implementada** durante a Sprint de adição do Documento no Cadastro.
Testes unitários rigorosos (`__tests__/documentValidator.spec.ts`) foram incluídos, cobrindo casos válidos, inválidos e anomalias de entrada (como CPFs com dígitos idênticos `111.111.111-11`), mitigando completamente os contras da implementação manual.
