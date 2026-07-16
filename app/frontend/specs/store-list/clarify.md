# Clarify: Lista de Lojas

## Status

Fase `clarify` concluída. A fase `plan` não foi iniciada.

## Perguntas e Respostas

### Q1 — Referência visual

**Pergunta:** Qual referência deve orientar a estrutura visual da tela?

**Resposta:** A referência visual oficial da tela Lista de Lojas foi aprovada e servirá como base para o planejamento (`plan`) e para a implementação (`implement`).

**Impacto na spec:** A composição visual deverá seguir a referência oficial, preservando os requisitos funcionais definidos em `spec.md`.

---

### Q2 — Pesquisa de lojas

**Pergunta:** Como deve funcionar a pesquisa nesta primeira versão?

**Resposta:** A pesquisa será realizada pelo nome da loja e exibirá apenas as lojas cujo nome inicia com o texto digitado.

Exemplos:
- `c` → Cacau Show, Calçados do Chico.
- `ca` → Cacau Show, Calçados do Chico.
- `cac` → Cacau Show.

**Impacto na spec:** A pesquisa será realizada localmente, refinando os resultados conforme a digitação, ignorando diferenças entre letras maiúsculas, minúsculas e espaços nas extremidades.

---

### Q3 — Seleção da loja

**Pergunta:** O usuário poderá clicar apenas no botão **Ver loja**?

**Resposta:** Não. Todo o card da loja será clicável e executará exatamente a mesma ação do botão **Ver loja**.

**Impacto na spec:** O card torna-se um componente interativo completo, sem áreas mortas e sem duplicidade de ações.

---

### Q4 — Comportamento dos sub-botões

**Pergunta:** Como devem funcionar os botões **Explorar** e **Ver loja**?

**Resposta:** Ambos terão fundo branco e borda cinza-clara no estado padrão. No hover, apenas a borda mudará para o vermelho institucional do PedeAqui, com transição suave.

**Impacto na spec:** O comportamento visual dos sub-botões foi padronizado conforme o Design System do PedeAqui.

---

### Q5 — Navegação

**Pergunta:** O que acontece ao selecionar uma loja?

**Resposta:** Nesta etapa será registrada apenas a intenção de navegação para a futura vitrine pública da loja, sem implementação de rotas ou redirecionamentos.

**Impacto na spec:** A tela permanece frontend-only e desacoplada da navegação definitiva.

---

### Q6 — Origem dos dados

**Pergunta:** De onde virão as lojas nesta primeira versão?

**Resposta:** As lojas serão fornecidas por uma fonte local da aplicação, preparada para futura substituição por integração com backend.

**Impacto na spec:** A camada de apresentação permanecerá desacoplada da origem dos dados.

## Decisões Registradas

- A feature pertence à jornada do consumidor e será implementada exclusivamente no frontend.
- Não haverá backend, persistência, endpoints nem chamadas HTTP nesta etapa.
- O header será sticky, terá fundo sólido, acompanhará toda a rolagem e não deverá sobrepor o conteúdo.
- A tela apresentará a lista de lojas cadastradas por meio de dados locais ou fonte frontend substituível.
- Cada card de loja será clicável em toda a sua área, sem áreas mortas.
- O clique no card e o acionamento de **Ver loja** produzirão uma única ação equivalente de seleção da respectiva loja, sem disparo duplicado.
- A seleção de uma loja representará apenas a intenção de acesso à futura vitrine pública; a navegação definitiva não será implementada nesta etapa.
- A pesquisa será realizada pelo nome da loja e exibirá apenas lojas cujo nome inicia com o texto digitado.
- A correspondência ignorará diferenças entre letras maiúsculas e minúsculas e espaços nas extremidades.
- A continuidade da digitação refinará os resultados conforme o prefixo informado.
- Quando nenhuma loja corresponder ao texto digitado, será exibido o estado de resultado vazio; ao limpar o campo, a lista completa será restaurada.
- Apenas os sub-botões **Explorar** e **Ver loja** terão fundo branco e borda cinza-clara no estado padrão.
- No hover desses sub-botões, apenas a borda mudará para o vermelho institucional do PedeAqui, com transição suave.
- Os sub-botões também terão estados `focus`, `active` e `disabled` conforme definido em `spec.md`.
- O destino definitivo de **Explorar** permanecerá para uma etapa futura.
- A pasta `services/` ficará preparada para futura integração com backend, contendo funções assíncronas tipadas, sem endpoints ou chamadas HTTP reais nesta etapa.
- Os estados de carregamento, sucesso, lista vazia, resultado de busca vazio, erro, imagem indisponível e ação indisponível permanecem conforme `spec.md`.

## Pendências

Não existem pendências para esta etapa.

A fase `clarify` está concluída.

Os destinos definitivos de **Explorar** e da vitrine pública permanecem fora do escopo desta etapa e serão definidos futuramente.