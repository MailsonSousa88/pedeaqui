# Spec: Lista de Lojas

## Identificação

- Feature: Lista de Lojas
- Referência visual: `specs/store-list/assets/tela-lista-lojas.png`
- Camada: frontend-only
- Jornada: consumidor
- Fase: SPECIFY

## Contexto

A tela apresenta ao consumidor as lojas cadastradas no PedeAqui. Nesta etapa não há backend, consumo de API nem vitrine pública disponível. Os dados usados pela interface devem ser fornecidos localmente por uma fonte substituível, preservando o contrato previsto para integração futura.

## Objetivo

Permitir que o consumidor visualize e pesquise lojas cadastradas e manifeste a intenção de acessar uma loja. Futuramente, a seleção de um card ou do botão **Ver loja** levará à vitrine pública correspondente.

## Fluxo

1. O consumidor acessa a Lista de Lojas.
2. A tela exibe o cabeçalho, a busca e a relação de lojas disponíveis.
3. O consumidor pode pesquisar pelo nome da loja.
4. O consumidor seleciona o card de uma loja ou seu botão **Ver loja**.
5. As duas formas de seleção disparam a mesma intenção de navegação para a futura vitrine pública da loja.
6. O botão **Explorar** representa o acesso à área de exploração; seu destino efetivo será definido em etapa futura.

## Elementos da interface

- Header sticky com:
  - marca PedeAqui à esquerda;
  - botão **Explorar**, com ícone, à direita.
- Conteúdo principal com:
  - título **Lojas**;
  - texto de apoio **Encontre lojas perto de você.**;
  - campo de pesquisa com ícone de lupa e placeholder **Pesquisar lojas**;
  - lista de cards de lojas.
- Cada card contém:
  - imagem ou logotipo da loja;
  - nome da loja;
  - descrição curta;
  - botão **Ver loja** com indicador visual de avanço.

## Comportamentos

### Header

- Deve permanecer visível durante toda a rolagem por meio de posicionamento sticky.
- Deve possuir fundo sólido e z-index suficiente para permanecer acima do conteúdo rolável.
- O layout deve reservar o espaço ocupado pelo header, evitando que ele sobreponha ou oculte o conteúdo principal.

### Pesquisa

- O campo de pesquisa deve possuir ícone de lupa à esquerda.
- A pesquisa deve filtrar as lojas pelo nome.
- Nesta versão, devem ser exibidas apenas as lojas cujo nome começa com o texto digitado.
- A filtragem deve ignorar diferenças entre letras maiúsculas e minúsculas e espaços no início e no fim.
- À medida que o usuário continuar digitando, os resultados devem ser refinados de acordo com o prefixo informado.
- Exemplos:
  - `c` → Cacau Show, Calçados do Chico.
  - `ca` → Cacau Show, Calçados do Chico.
  - `cac` → Cacau Show.
- Se nenhuma loja corresponder ao texto digitado, deve ser exibido o estado de resultado vazio.
- Ao limpar o campo de pesquisa, a lista completa deve ser restaurada.

### Sub-botões

Estas regras se aplicam apenas aos botões **Explorar** e **Ver loja**:

- Padrão: fundo branco, borda cinza-clara e cursor pointer.
- Hover: apenas a borda muda para o vermelho institucional do PedeAqui, com transição suave; o fundo permanece branco e o texto e os ícones permanecem nas cores padrão.
- Focus: foco visível, com contorno de contraste adequado e sem depender apenas da mudança de cor.
- Active: feedback visual de pressionamento, preservando contraste e legibilidade.
- Disabled: aparência visualmente atenuada, sem hover ou active, sem cursor pointer e sem disparar ação.

### Cards das lojas

- O card inteiro deve ser clicável e executar exatamente a mesma ação do botão **Ver loja** da respectiva loja.
- A ativação do botão **Ver loja** não deve provocar disparo duplicado da ação do card.
- Hover: borda vermelha, leve elevação, cursor pointer e transição suave.
- O card deve poder ser acionado por teclado, com foco visível e comportamento equivalente ao clique.
- Enquanto a vitrine pública não existir, a interface deve apenas expor a intenção de seleção conforme o contrato frontend, sem criar uma navegação ou destino fictício.
- O card não deve possuir áreas mortas; qualquer região clicável deve executar a ação principal da loja.

## Estados

- Inicial: estrutura da tela disponível antes da apresentação da lista.
- Carregando: indicador de carregamento (skeleton ou loading) mantendo a estrutura da tela estável.
- Sucesso com dados: cards renderizados na ordem recebida.
- Resultado de busca vazio: mensagem informando que nenhuma loja corresponde à pesquisa, com possibilidade de limpar ou alterar o termo.
- Lista vazia: mensagem informando que ainda não há lojas disponíveis.
- Erro: mensagem clara de falha ao obter as lojas e opção de tentar novamente quando houver um serviço integrado.
- Imagem ausente ou inválida: substituição por fallback visual, preservando dimensões e identificação textual da loja.
- Ação indisponível: controles relacionados devem usar o estado disabled e não disparar eventos.

## Responsividade

- A tela deve funcionar de dispositivos móveis a telas amplas, sem rolagem horizontal.
- O conteúdo deve permanecer centralizado e com largura máxima adequada em telas maiores.
- Em telas estreitas, margens e espaçamentos podem ser reduzidos, mantendo áreas de toque adequadas.
- O card deve preservar a hierarquia entre imagem, nome, descrição e ação; textos longos não podem sobrepor o botão nem romper o layout.
- O header deve manter marca e botão **Explorar** visíveis sem sobreposição.

## Acessibilidade

- Usar estrutura semântica para header, conteúdo principal, busca e lista de lojas.
- Associar um nome acessível ao campo de pesquisa, mesmo que o rótulo visual não seja exibido.
- Tratar ícones decorativos como não anunciáveis; ícones funcionais devem ter alternativa acessível.
- Cada ação **Ver loja** deve ter nome acessível contextual, por exemplo, “Ver loja Burgão House”.
- Cards interativos e botões devem ser alcançáveis e acionáveis por teclado, com ordem de foco previsível.
- O foco deve permanecer sempre visível, inclusive no card e nos sub-botões.
- Mudanças no total de resultados da pesquisa e mensagens de vazio ou erro devem ser anunciadas por tecnologia assistiva sem deslocar o foco indevidamente.
- Texto, bordas, foco e estados interativos devem atender contraste adequado; hover não pode ser o único meio de comunicar uma ação.
- Áreas clicáveis devem ter tamanho confortável para interação por toque.

## Contrato frontend

- Entrada da tela:
  - coleção de lojas;
  - estado de carregamento;
  - informação de erro, quando aplicável;
  - disponibilidade das ações **Explorar** e **Ver loja**.
- Dados mínimos de cada loja:
  - identificador único e estável;
  - nome;
  - descrição curta;
  - referência da imagem ou logotipo, opcional;
  - texto alternativo da imagem, quando ela transmitir informação adicional;
  - disponibilidade para seleção.
- Saídas da tela:
  - alteração do termo de pesquisa;
  - solicitação para explorar;
  - seleção de uma loja, sempre com seu identificador;
  - solicitação de nova tentativa após erro.
- A seleção pelo card e por **Ver loja** deve produzir uma única saída equivalente.
- O componente de apresentação não deve conhecer endpoint, cliente HTTP ou formato de transporte.

## Services futuros

- Prever uma função assíncrona tipada responsável por obter a coleção de lojas e retornar dados compatíveis com o contrato frontend.
- A função futura deve representar explicitamente sucesso e falha, permitindo à tela controlar os estados de carregamento, dados, vazio e erro.
- A implementação do serviço, o mecanismo de transporte e o mapeamento de resposta devem ficar isolados da apresentação.
- Nenhum endpoint, URL, chamada HTTP ou formato de API é definido nesta fase.
- Enquanto não houver backend disponível, a implementação poderá retornar um estado controlado como unavailable ou notImplemented.

## Navegação

### Tela anterior
- Home do consumidor.

### Tela atual
- Lista de Lojas.

### Próxima tela
- Vitrine Pública da Loja (implementação futura).

### Navegação esperada
- O botão "Explorar" seguirá para o fluxo de exploração (a definir futuramente).
- Ao clicar em um card ou no botão "Ver loja", o usuário deverá acessar futuramente a vitrine pública da loja correspondente.
- Nesta fase, apenas a intenção de navegação é especificada, sem implementação.

## Fora de escopo

- Backend, banco de dados ou persistência.
- Definição ou consumo de endpoints e chamadas HTTP.
- Autenticação, localização, geolocalização ou ordenação por proximidade.
- Cadastro, edição ou exclusão de lojas.
- Implementação da vitrine pública e da navegação definitiva para ela.
- Definição do destino definitivo do botão **Explorar**.
- Paginação, favoritos, categorias, filtros avançados e carrinho.
- Código de implementação, `plan.md`, `tasks.md`, `clarify.md` e `analyze.md`.
