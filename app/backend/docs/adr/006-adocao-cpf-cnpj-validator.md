# ADR 006: Adocao de cpf-cnpj-validator para Validacao de Documentos

## Contexto e Problema

A ADR 001 definiu validacoes nativas de CPF e CNPJ para evitar dependencia externa no dominio. O projeto agora adota `cpf-cnpj-validator` em producao e em testes para reduzir manutencao manual dos algoritmos de modulo 11.

Como `Profile` e `Tenant` usam `src/utils/cpfValidator.ts` e `src/utils/cnpjValidator.ts`, substituir a implementacao interna desses utilitarios por uma biblioteca externa altera uma decisao arquitetural aceita e precisa ser tratada explicitamente.

## Decisao

Adotar `cpf-cnpj-validator` dentro dos utilitarios internos de validacao, preservando as APIs atuais:

- `sanitizeCPF(value: string): string`
- `isValidCPF(value: string): boolean`
- `sanitizeCNPJ(value: string): string`
- `isValidCNPJ(value: string): boolean`

O dominio continuara importando apenas os utilitarios internos. A biblioteca externa ficara encapsulada em `src/utils`, evitando que Models, Use Cases ou Repositories importem `cpf-cnpj-validator` diretamente. A mesma biblioteca tambem sera usada pelas factories de teste para gerar fixtures validas.

## Restricoes da Mudanca

- CPF continua sendo armazenado apenas com digitos.
- CNPJ continua sendo armazenado apenas com digitos.
- CNPJ alfanumerico suportado pela v2 da biblioteca fica fora do escopo deste ciclo.
- `isValidCNPJ` deve rejeitar documentos que, apos sanitizacao, nao tenham exatamente 14 digitos numericos.
- `cpf-cnpj-validator` deve ser dependencia de producao, pois passara a ser usada por codigo em `src/`.
- `@faker-js/faker` permanece como dependencia de desenvolvimento, usada apenas em testes.

## Alternativas Consideradas

1. Manter os validators nativos da ADR 001.
   - Pro: menor acoplamento externo.
   - Contra: mantem o projeto responsavel pelo algoritmo e pelos casos futuros.

2. Usar `cpf-cnpj-validator` apenas em testes.
   - Pro: melhora fixtures sem alterar producao.
   - Contra: producao e testes podem validar documentos com motores diferentes.

3. Aceitar CNPJ alfanumerico imediatamente.
   - Pro: alinha com o suporte da biblioteca.
   - Contra: muda contrato de dominio e persistencia alem do objetivo atual.

## Consequencias

**Pros**

- Reduz manutencao propria de algoritmos fiscais.
- Facilita geracao e validacao de fixtures realistas.
- Mantem a dependencia externa encapsulada fora das Entities.

**Contras**

- Reverte parcialmente a ADR 001.
- Introduz dependencia externa no caminho de validacao de dominio.
- Exige cuidado para nao aceitar CNPJ alfanumerico antes da decisao de produto/contrato.

## Status

Aceita em 2026-07-04. Substitui parcialmente a ADR 001: a politica de armazenamento continua numerica e sem mascara, mas o algoritmo de validacao passa a ser delegado a `cpf-cnpj-validator`.
