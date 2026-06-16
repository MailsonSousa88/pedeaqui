# Padrões de Código

- Use TypeScript rigoroso. Nunca utilize `any`, prefira `unknown` ou crie tipos genéricos.
- Utilize Arrow Functions para callbacks e funções anônimas, exceto quando for necessário um this dinâmico, uso como construtor ou comportamento específico de funções tradicionais.
- O padrão de nomenclatura para interfaces é começar com a letra 'I' (ex: `IUserRepository`).
- As respostas de erro da API devem sempre seguir a estrutura: `{ error: true, message: string, code: number }`.
- Evite aninhamento profundo de `if/else` (Early Return pattern).
- Para tratamento de erros em chamadas do Supabase, sempre encapsule em blocos try/catch e logue o erro antes de repassar.

# Sobre documentação

**CRITICAL** Leia apenas os documentos relevantes para realiza a tarefa que você foi designado

