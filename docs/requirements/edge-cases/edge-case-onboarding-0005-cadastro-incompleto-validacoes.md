# Edge Case Onboarding 0005 - Cadastro incompleto e validações iniciais

## Origem

Levantamento de edge cases a partir dos requisitos de cadastro, login, CPF/CNPJ, configuração mínima da loja e pagamento.

## Contexto

O fluxo do lojista envolve cadastro, validação de documento, configuração mínima da loja, escolha de plano e pagamento.

## Situação fora do caminho feliz

Podem ocorrer situações como:

- lojista cadastra a conta e abandona antes do pagamento;
- lojista informa CPF/CNPJ válido no formato, mas já usado por outro tenant;
- lojista tenta pagar sem loja configurada corretamente;
- usuário já cadastrado tenta usar o fluxo de cadastro novamente em vez de login.

## Risco

Sem tratamento claro, o sistema pode:

- criar contas pendentes abandonadas;
- permitir documentos duplicados;
- permitir pagamento sem loja minimamente configurada;
- gerar erros recorrentes de e-mail duplicado.

## Comportamento esperado

O sistema deve:

1. Impedir cadastro com e-mail duplicado.
2. Impedir CPF/CNPJ duplicado.
3. Manter contas incompletas em estado pendente.
4. Não publicar loja antes de cumprir requisitos mínimos.
5. Direcionar usuário já cadastrado para login.

## Critérios de validação

- E-mail duplicado deve retornar HTTP 409.
- CPF/CNPJ inválido deve retornar HTTP 422.
- CPF/CNPJ já usado deve bloquear o cadastro ou avanço do fluxo.
- Conta sem pagamento aprovado não deve virar lojista ativo.

## Decisões pendentes

O time ainda precisa decidir:

- por quanto tempo contas pendentes serão mantidas;
- se contas pendentes poderão retomar o fluxo depois;
- qual tela será usada para retomar cadastro incompleto;
- se CPF/CNPJ duplicado retorna HTTP 409 ou 422.

## Observação

Esse edge case se limita ao fluxo funcional de cadastro e validações iniciais do lojista.
