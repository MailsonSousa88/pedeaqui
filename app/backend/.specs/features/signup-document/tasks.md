# Signup Document - Estado atual de tarefas

## Concluido no baseline atual
- [x] Campo `document` no signup.
- [x] Sanitizacao e validacao de CPF.
- [x] Bloqueio de CPF duplicado antes do Supabase Auth signup.
- [x] Persistencia de CPF em `profiles.document`.
- [x] Testes unitarios de signup/profile/validators existentes.

## Gaps reais nao implementados
- [ ] Constraint de banco para CPF exatamente 11 digitos e obrigatorio para novos cadastros.
- [ ] Compensacao se a persistencia do profile falhar apos criacao do usuario Auth.

## Fora desta rodada
- Suporte de CNPJ no signup.
- Alteracao de migrations ou regras de banco.
