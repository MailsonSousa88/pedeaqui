# Requisitos Não Funcionais

Este documento concentra os requisitos não funcionais do PedeAqui.

Requisitos não funcionais descrevem como o sistema deve se comportar em relação a segurança, desempenho, disponibilidade, usabilidade, privacidade, manutenção e operação.

## Padrão de escrita

Cada requisito não funcional deve seguir o formato:

```text
RNF-0001 - Nome do requisito
```

Campos recomendados:

- identificador;
- nome;
- descrição;
- categoria;
- prioridade;
- status;
- critério de verificação.

## Status possíveis

- `Proposto`;
- `Em discussão`;
- `Aprovado`;
- `Alterado`;
- `Removido`.

## Prioridades possíveis

- `Obrigatório`;
- `Importante`;
- `Desejável`.

## Requisitos

### RNF-0001 - Segurança na autenticação

**Categoria:** Segurança.

**Prioridade:** Obrigatório.

**Status:** Em discussão.

**Descrição:** O sistema deve proteger o processo de login, cadastro e recuperação de senha.

**Critério de verificação:**

- senhas não devem ser armazenadas em texto puro;
- rotas protegidas devem exigir autenticação;
- usuários não autenticados não devem acessar áreas restritas;
- erros de login não devem expor informações sensíveis.

### RNF-0002 - Controle de acesso por perfil

**Categoria:** Segurança.

**Prioridade:** Obrigatório.

**Status:** Em discussão.

**Descrição:** O sistema deve garantir que cada perfil acesse apenas os recursos permitidos.

**Critério de verificação:**

- clientes não devem acessar recursos de lojista;
- lojistas não devem acessar dados administrativos;
- um lojista não deve acessar dados de outra loja;
- administradores devem possuir permissões separadas dos demais perfis.

### RNF-0003 - Privacidade e LGPD

**Categoria:** Privacidade.

**Prioridade:** Obrigatório.

**Status:** Em discussão.

**Descrição:** O sistema deve tratar dados pessoais de acordo com princípios de privacidade e proteção de dados.

**Critério de verificação:**

- coletar apenas dados necessários para o funcionamento do sistema;
- proteger dados como CPF, CNPJ, e-mail e telefone;
- informar termos de uso e política de privacidade;
- evitar exposição indevida de dados pessoais em respostas da API.

### RNF-0004 - Desempenho das telas públicas

**Categoria:** Desempenho.

**Prioridade:** Importante.

**Status:** Proposto.

**Descrição:** As páginas públicas de loja e produtos devem carregar de forma rápida para consumidores.

**Critério de verificação:**

- páginas de loja devem carregar sem bloqueios desnecessários;
- imagens devem ser otimizadas para web;
- listagens de produtos devem evitar carregamento excessivo de dados;
- o frontend deve buscar apenas os dados necessários para a tela.

### RNF-0005 - Disponibilidade do sistema

**Categoria:** Operação.

**Prioridade:** Importante.

**Status:** Proposto.

**Descrição:** O sistema deve estar disponível para lojistas gerenciarem lojas e consumidores realizarem pedidos.

**Critério de verificação:**

- backend deve ser executado em ambiente estável;
- falhas devem ser registradas para análise;
- indisponibilidades devem ser tratadas com mensagens compreensíveis;
- serviços externos críticos devem ser monitorados quando possível.

### RNF-0006 - Responsividade

**Categoria:** Usabilidade.

**Prioridade:** Obrigatório.

**Status:** Em discussão.

**Descrição:** O sistema deve ser utilizável em dispositivos móveis e desktop.

**Critério de verificação:**

- telas devem se adaptar a larguras menores;
- botões e campos devem permanecer clicáveis em dispositivos móveis;
- textos não devem sobrepor outros elementos;
- cards e listas devem reorganizar o layout em telas pequenas.

### RNF-0007 - Acessibilidade inicial

**Categoria:** Usabilidade.

**Prioridade:** Importante.

**Status:** Proposto.

**Descrição:** A interface deve seguir boas práticas iniciais de acessibilidade.

**Critério de verificação:**

- campos devem possuir labels visíveis;
- botões devem ter texto claro;
- contraste entre texto e fundo deve ser adequado;
- ações importantes não devem depender apenas de cor.

### RNF-0008 - Armazenamento de imagens

**Categoria:** Infraestrutura.

**Prioridade:** Obrigatório.

**Status:** Em discussão.

**Descrição:** Imagens de lojas e produtos devem ser armazenadas fora do frontend, usando serviço apropriado para arquivos.

**Critério de verificação:**

- imagens não devem ser armazenadas diretamente no build do frontend;
- uploads devem ser enviados para armazenamento externo, como Cloudflare R2;
- o banco de dados deve armazenar referências das imagens;
- imagens removidas ou substituídas devem seguir regra definida pelo backend.

### RNF-0009 - Integração com pagamento

**Categoria:** Integração.

**Prioridade:** Obrigatório.

**Status:** Proposto.

**Descrição:** A ativação da conta do lojista deve depender da confirmação do pagamento pelo gateway escolhido.

**Critério de verificação:**

- pagamento pendente não deve liberar conta como lojista ativo;
- pagamento aprovado deve ativar a conta conforme regra do sistema;
- falhas de pagamento devem permitir nova tentativa;
- confirmações do gateway devem ser validadas pelo backend.

### RNF-0010 - Manutenibilidade

**Categoria:** Manutenção.

**Prioridade:** Importante.

**Status:** Proposto.

**Descrição:** O projeto deve ser organizado para facilitar manutenção, evolução e colaboração da equipe.

**Critério de verificação:**

- código deve seguir padrões definidos pelo time;
- commits e branches devem seguir os guias em `docs/team`;
- mudanças relevantes devem passar por pull request;
- documentação deve ser atualizada quando decisões importantes mudarem.

### RNF-0011 - Observabilidade mínima

**Categoria:** Operação.

**Prioridade:** Desejável.

**Status:** Proposto.

**Descrição:** O sistema deve permitir investigação básica de erros e falhas em produção.

**Critério de verificação:**

- erros relevantes devem ser registrados;
- logs não devem expor senhas ou dados sensíveis;
- falhas de integração devem ser rastreáveis;
- eventos críticos, como pagamento e criação de loja, devem ser acompanháveis.

### RNF-0012 - Backup e recuperação

**Categoria:** Operação.

**Prioridade:** Importante.

**Status:** Proposto.

**Descrição:** Dados importantes do sistema devem possuir estratégia de backup e recuperação.

**Critério de verificação:**

- banco de dados deve possuir política de backup;
- restauração deve ser possível em caso de falha crítica;
- arquivos enviados devem ter estratégia compatível com o armazenamento escolhido.

