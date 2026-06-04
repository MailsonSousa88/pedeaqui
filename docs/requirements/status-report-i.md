# Status Report I (SRI)

**Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas  
**Disciplina:** Engenharia de Software  
**Período:** 2026.3  
**Professor:** Mayllon Veras  
**Alunos:** Francisco Mailson, Francisco de Cássio, Mateus de Araujo, Rikelry Monteiro, Vitor Lopes  
**Time:** Cloud Hive  

## Histórias de Usuário, Fluxos e Casos de Uso

Este documento registra o Status Report I do projeto PedeAqui, consolidando os épicos, histórias de usuário, fluxos principais, fluxos alternativos, fluxos de exceção e casos de uso iniciais da plataforma.

## Épicos

### Épico 1 - Jornada de Compra do Consumidor

Permitir que o consumidor navegue pelas lojas da plataforma, visualize produtos, organize itens no carrinho separados por loja e finalize seus pedidos sendo redirecionado ao WhatsApp do lojista, facilitando o contato direto para conclusão da compra.

### Épico 2 - Gestão de Loja pelo Lojista

Permitir que o lojista valide seu cadastro, contrate o serviço da plataforma, configure sua loja e gerencie seus produtos, garantindo que sua vitrine digital esteja sempre disponível e atualizada para os consumidores.

### Épico 3 - Administração e Monitoramento da Plataforma

Permitir que o administrador gerencie os usuários lojistas, modere os conteúdos publicados e monitore os logs e atividades do sistema, garantindo a segurança, organização e bom funcionamento da plataforma.

## Cenário Épico 1 - Jornada de Compra do Consumidor

### User Stories

1. Como consumidor, eu quero acessar uma loja e visualizar seus produtos para que eu possa conhecer o que o lojista oferece.
2. Como consumidor, eu quero navegar e buscar por diferentes lojas dentro da plataforma para que eu possa encontrar lojas do meu interesse.
3. Como consumidor, eu quero adicionar produtos ao carrinho, visualizar meus pedidos organizados por loja e finalizar cada pedido sendo redirecionado ao WhatsApp do lojista com uma mensagem personalizada para que eu possa concluir a compra diretamente com a loja.

### Fluxo Principal - Consumidor finaliza pedido por loja

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 1 | O consumidor acessa a página inicial e visualiza as lojas disponíveis. |
| 2 | O consumidor acessa uma loja e visualiza seus produtos. |
| 3 | O consumidor adiciona produtos ao carrinho. |
| 4 | O consumidor acessa o carrinho e visualiza os pedidos organizados por loja. |
| 5 | O consumidor seleciona o pedido da loja desejada. |
| 6 | O consumidor clica em "Finalizar pedido". |
| 7 | O sistema exibe a tela para preenchimento das informações do pedido. |
| 8 | O consumidor preenche as informações e confirma a finalização. |
| 9 | O sistema gera a mensagem personalizada e redireciona o consumidor para o WhatsApp do lojista. |

### Fluxo Alternativo - Remover produto do carrinho antes de finalizar

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 5a | A partir do passo 5, o consumidor remove um ou mais produtos da loja. |
| 5b | O sistema atualiza o card do pedido referente à loja com os produtos restantes. |
| 5c | O fluxo retorna ao passo 5 para que o consumidor possa finalizar o pedido. |

**Resumo:** Antes de finalizar o pedido, o consumidor pode remover um ou mais produtos. O sistema atualiza os itens removidos, garantindo que o pedido reflita a preferência do cliente.

### Fluxo de Exceção - Carrinho vazio ao finalizar pedido

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 6a | No passo 6, o sistema identifica que não existem produtos no card do pedido da loja. |
| 6b | O sistema não permite a finalização do pedido e bloqueia o botão "Finalizar pedido". |
| 6c | O fluxo retorna ao passo 4 para que o consumidor possa adicionar produtos ao carrinho. |

**Resumo:** Caso o carrinho esteja vazio, o sistema não permite que o usuário finalize o pedido, bloqueando o acesso à tela de finalização.

## Cenário Épico 2 - Gestão de Loja pelo Lojista

### User Stories

1. Como lojista, eu quero cadastrar e configurar as informações da minha loja para que eu possa disponibilizar meu negócio na plataforma.
2. Como lojista, eu quero gerenciar meus produtos, cadastrando, editando e removendo itens, para que minha vitrine esteja sempre atualizada para os consumidores.
3. Como lojista, eu quero contratar o plano lojista com um CPF ou CNPJ válido e acessar o painel da minha loja para que eu possa utilizar os recursos da plataforma de forma segura e oficial.

### Fluxo Principal - Lojista acessa a dashboard administrativa

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 1 | O lojista realiza login na plataforma. |
| 2 | O sistema valida as credenciais e permite o acesso. |
| 3 | O lojista acessa a dashboard administrativa da loja. |
| 4 | O sistema exibe informações da loja, produtos cadastrados e pedidos recebidos. |
| 5 | O lojista acessa a opção de gerenciamento de produtos. |
| 6 | O lojista cadastra, edita ou remove produtos da loja. |
| 7 | O sistema atualiza as informações dos produtos cadastrados. |
| 8 | O lojista acompanha pedidos realizados pelos consumidores. |
| 9 | O sistema atualiza o status dos pedidos e registra as ações realizadas pelo lojista. |

**Resumo:** O lojista acessa a área administrativa da plataforma para gerenciar produtos, acompanhar pedidos e atualizar informações da loja.

### Fluxo Alternativo - Editar informações da loja após cadastro

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 4a | A partir do passo 4, o lojista acessa a opção de editar informações da loja. |
| 4b | O sistema exibe os dados atuais da loja para edição. |
| 4c | O lojista altera as informações e salva. |
| 4d | O sistema atualiza os dados da loja. |
| 4e | O fluxo retorna ao passo 4 para que o lojista continue a gestão da loja. |

**Resumo:** O lojista pode editar as informações da sua loja a qualquer momento, garantindo que os dados estejam sempre atualizados.

### Fluxo de Exceção - CPF ou CNPJ inválido

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 3a | Durante o cadastro do lojista, o sistema identifica que o CPF/CNPJ informado é inválido. |
| 3b | O sistema impede o avanço do cadastro e exibe uma mensagem de erro solicitando a correção dos dados. |
| 3c | O fluxo retorna à etapa de preenchimento dos dados cadastrais para que o lojista corrija as informações. |

**Resumo:** Caso o CPF ou CNPJ informado seja inválido, o sistema bloqueia a continuidade do cadastro até que os dados sejam corrigidos corretamente.

## Cenário Épico 3 - Administração e Monitoramento da Plataforma

### User Stories

1. Como Admin, eu quero gerenciar os usuários lojistas, aprovando, bloqueando e editando contas, para que eu possa garantir que apenas lojistas válidos utilizem a plataforma.
2. Como Admin, eu quero moderar conteúdos das lojas e produtos publicados para que eu possa remover informações inadequadas ou fora das diretrizes da plataforma.
3. Como Admin, eu quero visualizar logs de acesso, atividades dos usuários e eventos da plataforma para que eu possa monitorar o funcionamento do sistema, identificar problemas e garantir a segurança da aplicação.

### Fluxo Principal - Administrador gerencia lojistas

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 1 | O Admin clica na aba "Lojistas" do menu lateral. |
| 2 | O sistema exibe a listagem de lojistas cadastrados. |
| 3 | O Admin utiliza busca ou filtros para localizar um lojista. |
| 4 | O Admin seleciona um lojista da lista. |
| 5 | O sistema exibe os detalhes da conta do lojista. |
| 6 | O Admin escolhe uma ação: aprovar, bloquear ou editar conta. |
| 7 | O sistema solicita confirmação da ação. |
| 8 | O Admin confirma a operação. |
| 9 | O sistema atualiza a loja e registra a ação realizada. |
| 10 | O sistema exibe a listagem de lojistas cadastrados. |

**Resumo:** O Admin acessa o painel administrativo para visualizar, buscar e gerenciar lojistas cadastrados. Ele pode aprovar, bloquear ou editar contas, enquanto o sistema registra todas as ações realizadas.

### Fluxo Alternativo - Administrador modera conteúdos

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 1a | O Admin clica na aba "Conteúdo" do menu lateral. |
| 1b | O sistema exibe a listagem de todos os produtos cadastrados. |
| 1c | O Admin utiliza busca ou filtros para localizar um produto ou tipo de produto. |
| 1d | O Admin escolhe uma ação: aprovar, bloquear produto ou voltar. |
| 1e | O Admin confirma a operação. |
| 1f | O sistema atualiza ou exclui o produto da loja a que ele pertence. |
| 1g | O sistema retorna para a tela que lista todos os produtos. |

**Resumo:** O Admin revisa produtos publicados pelos lojistas, podendo aprovar, remover ou suspender contas em casos de infração.

### Fluxo Alternativo - Administrador visualiza logs

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 1a | O Admin clica na aba "Logs" do menu lateral. |
| 1b | O sistema exibe a listagem de todos os logs de acesso no período de 6 meses. |
| 1c | O Admin utiliza busca ou filtros para localizar um log, por exemplo por data. |
| 1d | O Admin clica no log. |
| 1e | O Admin visualiza os detalhes do log. |
| 1f | O Admin clica em voltar. |
| 1g | O sistema retorna para a tela que lista todos os logs. |

**Resumo:** O Admin monitora eventos e atividades da plataforma por meio de logs e filtros de pesquisa. O sistema permite analisar detalhes dos eventos, registrar observações administrativas e acompanhar ocorrências críticas para auxiliar no controle e segurança da aplicação.

### Fluxo de Exceção - Administrador não executa ação sobre a loja

| Passo | Ação do ator / Resposta do sistema |
|-------|------------------------------------|
| 6a | A partir do passo 6, o Admin seleciona "Voltar". |
| 6b | O sistema atualiza os dados e retorna para a tela de detalhes do lojista. |

**Resumo:** O administrador pode optar por apenas visualizar os detalhes da loja para se informar, sem aprovar, editar ou bloquear nenhuma loja.


