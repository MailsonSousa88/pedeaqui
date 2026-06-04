# US-LJ-0003 - Contratar plano lojista

## Épico

Épico 2 - Gestão de Loja pelo Lojista.

## Ator

Lojista.

## História de usuário

Como lojista, eu quero contratar o plano lojista com um CPF ou CNPJ válido e acessar o painel da minha loja para que eu possa utilizar os recursos da plataforma de forma segura e oficial.

## Valor para o usuário

Permite que o lojista formalize sua entrada na plataforma e tenha acesso aos recursos de gestão da vitrine.

## Critérios de aceitação

- Dado que o lojista inicia a contratação, quando informar CPF ou CNPJ, então o sistema deve validar o documento.
- Dado que o CPF ou CNPJ seja válido, quando o lojista escolher um plano, então o sistema deve permitir a continuidade da contratação.
- Dado que o CPF ou CNPJ seja inválido, quando o lojista tentar avançar, então o sistema deve bloquear o processo e solicitar correção.
- Dado que a contratação seja confirmada, quando o processo terminar, então o sistema deve liberar o acesso ao painel da loja.

## Prioridade

Alta.

## Dependências

- Planos disponíveis para contratação.
- Validação de CPF/CNPJ.

## Referências

- Status Report I - Cenário Épico 2.
- Caso de uso: [UC-LJ-0001 - Contratar plano lojista](../use-cases/lojista/use-case-lojista-0001.md).


