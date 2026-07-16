# Clarify: Recuperacao de senha

## Status

Fase `clarify` concluida.

Este documento registra as ambiguidades reais encontradas em `specs/forgot-password/spec.md` que poderiam impactar a implementacao futura e as decisoes aplicadas nesta fase.

## Perguntas

### Q1

Pergunta: Como a interface deve tratar a etapa `Redefinir senha`, considerando que nao havera navegacao real, link real, token real ou rota nesta etapa?

Resposta: A etapa `Redefinir senha` permanece estruturada na feature como uma etapa futura, reservada para acesso pelo link real de recuperacao do Supabase. Ela nao e aberta por acao local.

Justificativa: O fluxo continua frontend-only para a solicitacao e confirmacao inicial, sem backend, sem envio real de e-mail, sem token, sem rota e sem navegacao real para a etapa de reset. A integracao futura depende do token/sessao do Supabase recebido via link real.

Impacto na implementacao: A etapa `E-mail enviado` nao deve conter acao secundaria para abrir localmente `Redefinir senha`. O stepper permanece nao interativo, nao deve existir rota, query string, hash, token, `localStorage`, backend ou abertura local da etapa reset.

### Q2

Pergunta: Qual regra deve ser usada para mascarar o e-mail exibido na etapa `E-mail enviado`?

Resposta: O requisito de exibir o e-mail mascarado foi removido de `specs/forgot-password/spec.md`.

Justificativa: A referencia visual nao exige essa funcionalidade e ela nao agrega valor nesta primeira versao. A implementacao deve apenas exibir a mensagem informativa prevista na tela.

Impacto na implementacao: Nao deve ser criada funcao de mascara de e-mail, regra de exibicao parcial do endereco, tratamento de e-mails curtos ou teste especifico para mascaramento. A etapa `E-mail enviado` deve exibir somente a mensagem informativa definida na spec.

## Decisoes Registradas

- A etapa `Redefinir senha` fica reservada para acesso futuro pelo link real de recuperacao do Supabase.
- A etapa `reset` nao deve ser aberta por simulacao local, sem criar rota, token, link real, backend, persistencia ou navegacao real.
- O requisito de exibir e-mail mascarado foi removido da especificacao.
- A etapa `E-mail enviado` deve exibir apenas a mensagem informativa prevista na tela.
- A acao `Voltar para login` deve navegar para a tela de Login por meio de callback centralizado em `App.tsx`, sem criar rota adicional fora da camada central existente.

## Pendencias

Nao existem pendencias funcionais em aberto para esta fase.

Nao existem mais ambiguidades que impecam a elaboracao de `plan.md`.

## Itens ja definidos pela spec

- A feature pertence ao dominio Auth.
- O escopo e frontend-only.
- Nao havera backend, envio real de e-mail, token real, autenticacao, persistencia ou navegacao real.
- A etapa inicial e `Solicitar link`.
- `Enviar link de recuperacao` pode avancar localmente para `E-mail enviado` quando o e-mail for localmente valido.
- `Enviar novamente` nao executa reenvio real nem integracao remota.
- `Redefinir senha` executa somente validacoes locais.
- `Voltar para login` permanece sem navegacao real, e nao ha botao superior com `ArrowLeft` nesta versao.
- A nova senha exige somente minimo de 8 caracteres.
- A confirmacao de senha deve ser igual a nova senha.
