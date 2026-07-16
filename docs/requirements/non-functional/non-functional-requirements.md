# Requisitos Não Funcionais

## Finalidade e interpretação

Este documento define os atributos obrigatórios de segurança, qualidade, privacidade, desempenho e operação do PedeAqui. Os requisitos são normativos mesmo quando a implementação correspondente ainda não estiver concluída. Exigências necessárias a uma plataforma SaaS não devem ser removidas apenas para refletir uma limitação temporária do código.

Os identificadores `RNFxxxx` são permanentes. Os requisitos estão agrupados por atributo de qualidade e, por isso, os identificadores não aparecem necessariamente em ordem numérica. Todos os ambientes publicados devem aplicar estes controles de forma compatível com seu risco; exceções temporárias devem ser documentadas, aprovadas e acompanhadas de prazo de correção.

## Segurança e controle de acesso

### [RNF0001] – Autorização por tipo de usuário e estado da conta

O sistema deve autorizar cada operação conforme a identidade, o tipo de usuário, o papel administrativo, o estado do tenant e o direito de uso vigente.

> **Critérios de aceitação:** A autenticação válida, sozinha, não concede acesso. Operações de lojista devem exigir vínculo com tenant apto; operações administrativas devem consultar cadastro de administrador ativo e seu papel. Ausência ou invalidade de autenticação deve retornar HTTP 401; identidade válida sem permissão deve retornar HTTP 403.

### [RNF0002] – Isolamento multi-tenant

O sistema deve impedir leitura, alteração ou inferência de dados entre tenants.

> **Critérios de aceitação:** O identificador efetivo do tenant deve derivar da identidade autenticada e de seu vínculo persistido, nunca ser aceito como autoridade a partir do payload. Toda consulta privada deve filtrar pelo tenant. Recursos existentes de outro tenant devem retornar HTTP 403 quando sua existência já for conhecida com segurança, ou resposta indistinguível de inexistência quando necessário para evitar enumeração. Políticas RLS devem atuar como defesa adicional.

### [RNF0003] – Segurança dos webhooks e pagamentos

O sistema deve verificar autenticidade, integridade, origem e repetição dos eventos do Stripe.

> **Critérios de aceitação:** A assinatura deve ser validada com o segredo do endpoint e o corpo bruto por meio do mecanismo oficial do Stripe. Eventos inválidos devem retornar HTTP 400 e não produzir efeitos. O sistema deve persistir o identificador único do evento, aceitar reentregas com segurança e impedir regressão causada por evento fora de ordem.

### [RNF0004] – Contrato padronizado de erros

O sistema deve retornar erros previsíveis, seguros e legíveis por máquina.

> **Critérios de aceitação:** Erros da API devem seguir o formato abaixo, omitindo `fields` quando não aplicável. Códigos técnicos devem ser estáveis; mensagens internas, stack traces, segredos e detalhes do provedor não podem ser expostos ao cliente.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos.",
    "fields": [
      { "field": "document", "message": "CPF inválido." }
    ]
  }
}
```

> Dados inválidos devem retornar HTTP 422; conflito de unicidade ou estado, HTTP 409; autenticação ausente ou inválida, HTTP 401; autorização insuficiente, HTTP 403; recurso público indisponível ou inexistente, HTTP 404; limitação de requisições, HTTP 429.

### [RNF0005] – Logs de acesso

O sistema deve registrar os acessos necessários à segurança, operação e conformidade.

> **Critérios de aceitação:** Cada registro deve conter data e hora em UTC, IP tratado conforme a política de privacidade, método, rota normalizada, status HTTP, duração, identificador de correlação e identidade ou tenant quando disponíveis. Senhas, tokens, cookies, documentos completos, dados de pagamento e corpos sensíveis não podem ser registrados.

### [RNF0006] – Armazenamento protegido dos logs

O sistema deve manter logs de produção fora do armazenamento efêmero da aplicação e protegidos contra alteração indevida.

> **Critérios de aceitação:** O serviço de logs deve possuir controle de acesso próprio, criptografia em trânsito e em repouso, separação por ambiente e trilha de consulta. Lojistas e consumidores não podem consultar logs operacionais internos.

### [RNF0007] – Retenção de logs

O sistema deve conservar registros de acesso pelo prazo legal e eliminar ou anonimizar dados ao fim da finalidade.

> **Critérios de aceitação:** Logs de acesso exigidos para o provedor de aplicação devem ser mantidos por 6 meses em ambiente controlado. Retenção superior deve possuir justificativa documentada. Exclusões devem respeitar preservação legal, incidentes e ordens válidas.

### [RNF0008] – Proteção contra abuso

O sistema deve limitar requisições e tentativas abusivas nas rotas públicas e de autenticação.

> **Critérios de aceitação:** Como limite inicial, rotas públicas devem aceitar no máximo 200 requisições por IP em janela móvel de 60 segundos. Rotas de login, recuperação, cadastro, checkout e emissão de URL de upload devem possuir limites mais restritivos por IP e identidade. Excesso deve retornar HTTP 429 com `Retry-After`, sem bloquear permanentemente usuários legítimos.

### [RNF0009] – Autenticação das rotas privadas

O sistema deve validar a sessão em toda requisição privada.

> **Critérios de aceitação:** O `access token` deve ser enviado em `Authorization: Bearer {token}`, validado quanto a assinatura, expiração e usuário e nunca aceito por query string. Nenhuma rota privada deve depender somente de proteção visual do frontend.

### [RNF0010] – Proteção dos dados em trânsito

Toda comunicação publicada deve utilizar HTTPS.

> **Critérios de aceitação:** Devem ser aceitos TLS 1.2 ou superior e certificados válidos. HTTP deve redirecionar para HTTPS antes de receber dados sensíveis. HSTS deve ser habilitado em produção quando toda a cadeia estiver preparada. Integrações com Supabase, Stripe e R2 também devem usar TLS.

### [RNF0023] – Gestão de segredos e configuração sensível

O sistema deve manter segredos fora do código-fonte e dos artefatos públicos.

> **Critérios de aceitação:** Chaves do Supabase, Stripe e R2, segredos de webhook e credenciais de banco devem vir de armazenamento seguro por ambiente. Segredos não podem aparecer em commits, logs, respostas ou bundles do frontend. Chaves expostas devem ser revogadas e rotacionadas.

### [RNF0024] – Segurança de sessão

O sistema deve reduzir o impacto de roubo, reutilização ou fixação de sessão.

> **Critérios de aceitação:** `Access tokens` devem ter duração curta; mecanismos de renovação devem expirar, ser revogáveis e ter rotação quando suportada. Logout e alteração de senha devem revogar as sessões aplicáveis. Tokens não devem ser armazenados em local acessível a scripts quando houver alternativa segura para o modelo de implantação.

### [RNF0025] – Política de credenciais

O sistema deve exigir credenciais compatíveis com o risco da conta.

> **Critérios de aceitação:** Senha deve possuir pelo menos 8 caracteres e ser rejeitada quando conhecida como fraca ou comprometida, quando esse recurso estiver disponível. O sistema não deve truncar senhas silenciosamente. Administradores devem usar autenticação multifator; lojistas devem poder habilitá-la na evolução do serviço.

### [RNF0026] – Proteções da aplicação web

O sistema deve mitigar vulnerabilidades web comuns.

> **Critérios de aceitação:** Produção deve aplicar CORS restrito às origens autorizadas, headers de segurança, validação de entrada, saída escapada e proteção contra XSS, injeção, enumeração, path traversal e requisições forjadas conforme o mecanismo de sessão. Conteúdo fornecido por lojistas não pode ser interpretado como HTML executável.

### [RNF0027] – Privilégio mínimo

Serviços e usuários internos devem possuir somente as permissões necessárias.

> **Critérios de aceitação:** A chave de serviço do Supabase e credenciais administrativas não podem ser enviadas ao frontend. Políticas RLS devem permanecer habilitadas nas tabelas expostas. Papéis `super_admin`, `support` e `finance` devem ter permissões distintas e verificadas no backend.

## Desempenho, escalabilidade e disponibilidade

### [RNF0011] – Tempo de resposta da API

O sistema deve manter tempo de resposta adequado nas operações principais.

> **Critérios de aceitação:** Sob carga de 100 requisições simultâneas em ambiente equivalente ao de produção, 95% das consultas de lojas e produtos devem responder em até 2 segundos, desconsiderando a transferência direta de arquivos ao R2. Operações de escrita comuns devem responder em até 3 segundos, salvo dependência externa explicitamente indicada ao usuário.

### [RNF0012] – Paginação e limites de resposta

Listagens devem ser paginadas para evitar respostas excessivas.

> **Critérios de aceitação:** O limite padrão e máximo deve ser 20 registros por página para lojas, produtos, categorias, pedidos, tenants e logs, salvo contrato específico documentado. A resposta deve informar `page`, `limit`, `total` e os itens. Parâmetros inválidos devem retornar HTTP 422.

### [RNF0013] – Disponibilidade do serviço

O sistema deve manter disponibilidade mensal mínima para as jornadas essenciais.

> **Critérios de aceitação:** Vitrines públicas e autenticação devem alcançar pelo menos 99% de disponibilidade mensal, excluídas manutenções programadas comunicadas previamente. Dependências externas devem possuir timeout e tratamento de indisponibilidade sem travar indefinidamente a requisição.

### [RNF0028] – Escalabilidade dos uploads

O backend não deve atuar como retransmissor do conteúdo binário das imagens.

> **Critérios de aceitação:** O fluxo deve usar URL pré-assinada e upload direto do navegador ao R2. A API deve manipular apenas autorização, metadados e confirmação. URLs de upload devem expirar entre 5 e 15 minutos e ser restritas à chave, método e tipo previstos.

### [RNF0029] – Otimização da entrega de imagens

Imagens públicas devem ser entregues de forma eficiente.

> **Critérios de aceitação:** A entrega deve usar CDN ou capacidade equivalente do R2, dimensões adequadas ao contexto, carregamento tardio fora da área inicial e cache versionado. A interface deve fornecer fallback quando a imagem estiver ausente ou indisponível.

### [RNF0030] – Resiliência a serviços externos

Falhas de Supabase, Stripe, R2 ou WhatsApp não devem produzir estados falsos ou inconsistentes.

> **Critérios de aceitação:** Chamadas devem possuir timeout, erros traduzidos e repetição somente quando segura. Retentativas de escrita devem usar idempotência. O sistema deve diferenciar falha temporária de rejeição de negócio e nunca confirmar pagamento, upload ou envio de mensagem sem evidência correspondente.

## Usabilidade, acessibilidade e compatibilidade

### [RNF0014] – Facilidade de contato com o lojista

O consumidor deve conseguir iniciar o contato pelo WhatsApp com baixo esforço.

> **Critérios de aceitação:** A partir da página do produto, um consumidor com item válido deve alcançar a abertura do WhatsApp em no máximo 4 interações principais, sem contar preenchimento de campos. Erros devem indicar como prosseguir e preservar os dados já informados quando seguro.

### [RNF0015] – Responsividade

O sistema deve ser utilizável em dispositivos móveis e desktop.

> **Critérios de aceitação:** Telas devem funcionar sem sobreposição ou rolagem horizontal indevida a partir de 320 px de largura. Ações principais devem permanecer acessíveis por toque e teclado. Layouts devem adaptar navegação, cards, formulários e diálogos sem perda funcional.

### [RNF0016] – Acessibilidade

As jornadas essenciais devem atender às WCAG 2.2 no nível AA.

> **Critérios de aceitação:** Controles devem possuir nome acessível, foco visível, ordem de teclado lógica, labels e mensagens de erro associadas. Contraste deve atender ao nível AA. Informação não pode depender somente de cor. Imagens informativas devem possuir texto alternativo; animações devem respeitar preferência por movimento reduzido.

### [RNF0031] – Compatibilidade com navegadores

O frontend deve funcionar nos navegadores suportados pelo produto.

> **Critérios de aceitação:** Devem ser suportadas as duas versões estáveis mais recentes de Chrome, Edge, Firefox e Safari, incluindo navegadores móveis equivalentes. Recursos progressivos, como Web Share API, devem possuir fallback funcional.

### [RNF0032] – Consistência de interface e mensagens

O sistema deve usar padrões visuais e terminologia consistentes.

> **Critérios de aceitação:** Estados de carregamento, vazio, erro, sucesso, confirmação e ação destrutiva devem seguir componentes compartilhados. Mensagens ao usuário devem estar em português claro e não expor textos técnicos do backend. `Loja`, `lojista`, `consumidor`, `plano`, `assinatura` e `pedido` devem manter significado uniforme.

### [RNF0033] – Descoberta e compartilhamento das vitrines

Páginas públicas devem ser compreensíveis por mecanismos de busca e pré-visualizações sociais.

> **Critérios de aceitação:** Cada vitrine e produto público deve possuir título, descrição, URL canônica e metadados sociais baseados em dados reais. Conteúdo inexistente, inativo ou excluído não deve ser indexado como disponível.

## Integridade de dados e regras críticas

### [RNF0017] – Representação monetária em centavos

Valores monetários devem ser armazenados e processados como inteiros em centavos de real.

> **Critérios de aceitação:** Banco, domínio e integrações internas devem evitar ponto flutuante para cálculos financeiros. Conversão para reais deve ocorrer apenas na apresentação ou nos limites de integração. Modificadores de variação não podem resultar em preço final menor ou igual a zero.

### [RNF0018] – Validação server-side

Toda regra crítica deve ser validada pelo backend.

> **Critérios de aceitação:** Identidade, CPF/CNPJ, unicidade, tenant, papel, estado da conta, assinatura, limites, preço, promoção, disponibilidade, categoria, upload e checkout não podem depender apenas do frontend ou do banco. Constraints e RLS complementam, mas não substituem mensagens de domínio controladas.

### [RNF0019] – Consistência do checkout e do pedido

O sistema deve evitar pedidos parciais, duplicados ou calculados com dados locais não confiáveis.

> **Critérios de aceitação:** Validação de todos os itens e criação do pedido devem ocorrer de forma atômica. Qualquer item inválido deve cancelar a operação inteira até confirmação explícita de uma nova composição. Repetição da mesma solicitação deve retornar o mesmo resultado ou impedir duplicidade por chave idempotente.

### [RNF0034] – Integridade referencial e exclusão lógica

Relacionamentos entre tenant, loja, categoria, produto, imagem, variação e pedido devem permanecer consistentes.

> **Critérios de aceitação:** Produto e categoria devem pertencer à mesma loja e tenant; registros filhos não podem escapar do isolamento. Exclusão lógica deve retirar o conteúdo das consultas normais e públicas sem apagar imediatamente evidências e dependências. Restauração deve recuperar somente registros afetados pela mesma operação quando aplicável.

### [RNF0035] – Datas, horários e ordenação de eventos

O sistema deve tratar datas de forma inequívoca.

> **Critérios de aceitação:** Instantes devem ser persistidos em UTC e convertidos para o fuso da interface. Horários comerciais devem estar associados à regra local da loja. Webhooks, auditoria, promoções, trial e assinaturas devem comparar instantes normalizados e tolerar reentrega fora de ordem sem regressão indevida.

## Arquivos e imagens

### [RNF0020] – Armazenamento externo de imagens

Imagens de produtos e lojas devem ser armazenadas no Cloudflare R2, fora do build do frontend e do banco relacional.

> **Critérios de aceitação:** O banco deve guardar chave do objeto, URL ou referência derivável, tamanho, MIME, ordem e vínculo de domínio. O frontend não pode possuir credenciais permanentes do R2. O backend deve ser o orquestrador de autorização e quota.

### [RNF0021] – Validação segura de uploads

O sistema deve validar arquivos antes de autorizá-los e antes de confirmá-los.

> **Critérios de aceitação:** Devem ser aceitos inicialmente JPEG e PNG; outros formatos exigem decisão documentada. Extensão, MIME declarado, assinatura real do arquivo, tamanho, conteúdo vazio e quota devem ser verificados em camadas apropriadas. Nome e caminho do objeto devem ser gerados pelo sistema. Arquivo inválido deve retornar HTTP 422.

### [RNF0022] – Padronização e consistência das imagens

O sistema deve aplicar regras uniformes de dimensões, orientação, compressão e exibição.

> **Critérios de aceitação:** Limites devem ser configurados por tipo de imagem e divulgados na interface. Metadados desnecessários devem ser removidos quando houver processamento. Falha depois do upload deve deixar o objeto rastreável para compensação; o banco não pode apontar para arquivo inexistente. Objetos órfãos devem ser identificados e removidos por rotina segura.

## Privacidade, conformidade e auditoria

### [RNF0036] – Minimização e finalidade dos dados pessoais

O sistema deve coletar somente dados necessários e utilizá-los para finalidades informadas.

> **Critérios de aceitação:** CPF/CNPJ, contato, endereço e dados do consumidor devem ter finalidade e base legal documentadas. Dados informados apenas para compor a mensagem ao WhatsApp não devem ser retidos indefinidamente. O sistema deve distinguir as responsabilidades do PedeAqui e do lojista no tratamento dos dados.

### [RNF0037] – Privacidade desde a concepção

Novas funcionalidades devem avaliar impacto de privacidade antes da coleta ou exposição de dados.

> **Critérios de aceitação:** Valores padrão devem privilegiar menor exposição. Dados pessoais não devem aparecer em URLs, analytics ou logs sem necessidade. Funcionalidades de geolocalização, perfil de consumidor ou marketing exigem avaliação específica, transparência e consentimento quando aplicável.

### [RNF0038] – Auditoria de ações críticas

O sistema deve manter trilha de auditoria íntegra para ações administrativas, financeiras e de segurança.

> **Critérios de aceitação:** Cada evento deve registrar ator, papel, tenant afetado, ação, alvo, resultado, data, correlação e resumo seguro da mudança. Suspensão, reativação, moderação, gestão de planos, cancelamento, alteração de assinatura e gestão de administradores são obrigatoriamente auditáveis. O ator da ação não pode alterar ou excluir o próprio registro.

### [RNF0039] – Retenção e descarte de dados

O sistema deve aplicar uma política documentada de retenção e descarte por categoria de dado.

> **Critérios de aceitação:** Perfis, tenants, lojas, produtos, pedidos, imagens, consentimentos, logs e eventos financeiros devem possuir prazos e fundamentos próprios. Exclusão solicitada não pode remover dados sujeitos a obrigação legal ou prevenção de fraude, mas deve restringir seu uso. Encerrado o prazo, os dados devem ser eliminados ou anonimizados de forma verificável.

## Operação, recuperação e qualidade de software

### [RNF0040] – Monitoramento e correlação

O sistema deve permitir detectar e investigar falhas de produção.

> **Critérios de aceitação:** Devem existir health check, logs estruturados, identificador de correlação e métricas para latência, erros, saturação, autenticação, webhooks e uploads. Alertas críticos não devem conter dados sensíveis e devem indicar serviço, ambiente e janela temporal.

### [RNF0041] – Backup e recuperação

Dados persistentes devem possuir cópias de segurança e procedimento de restauração testado.

> **Critérios de aceitação:** Para o MVP publicado, o objetivo de perda máxima de dados deve ser de 24 horas (`RPO ≤ 24 h`) e o objetivo de recuperação de 8 horas (`RTO ≤ 8 h`). Restaurações devem ser testadas periodicamente em ambiente isolado. Backups devem ser criptografados e ter acesso restrito.

### [RNF0042] – Separação de ambientes

Desenvolvimento, teste e produção devem possuir configurações e dados separados.

> **Critérios de aceitação:** Cada ambiente deve usar projetos, chaves, endpoints, webhooks e buckets próprios quando aplicável. Dados pessoais reais não devem ser copiados para teste sem anonimização. O frontend deve obter a API publicada por configuração explícita, sem URL fictícia de fallback.

### [RNF0043] – Qualidade e verificabilidade

Alterações devem ser verificáveis por automação proporcional ao risco.

> **Critérios de aceitação:** Build e análise estática devem passar antes do merge. Regras de domínio, autorização, isolamento, pagamento, checkout e upload devem possuir testes unitários; fluxos entre API, banco e provedores devem possuir testes de integração controlados. Correções de defeitos devem incluir teste de regressão quando tecnicamente viável.

### [RNF0044] – Manutenibilidade arquitetural

O código deve preservar as decisões arquiteturais aceitas do projeto.

> **Critérios de aceitação:** O frontend deve permanecer organizado por feature e consumir a API pelo cliente HTTP compartilhado por meio dos services. Componentes não devem acessar diretamente Supabase ou regras de backend. O backend deve manter regras nos casos de uso, dependências de infraestrutura atrás de contratos e domínio sem acoplamento aos frameworks sempre que aplicável.

### [RNF0045] – Evolução compatível dos contratos

Mudanças nos contratos da API e nos dados devem ser controladas.

> **Critérios de aceitação:** Rotas, payloads, erros e eventos devem ser documentados. Mudanças incompatíveis exigem versionamento ou migração coordenada entre frontend e backend. Migrações de banco devem ser reproduzíveis, ordenadas e não podem depender de edição manual não registrada.

### [RNF0046] – Dependências e vulnerabilidades

O sistema deve controlar riscos introduzidos por bibliotecas e serviços terceiros.

> **Critérios de aceitação:** Dependências devem possuir versões bloqueadas por lockfile, atualizações revisadas e verificação automatizada de vulnerabilidades conhecidas. Vulnerabilidade crítica explorável não pode permanecer em produção sem mitigação documentada e prazo emergencial de correção.
