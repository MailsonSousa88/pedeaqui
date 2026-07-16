# Programa de Privacidade e Adequação à LGPD — PedeAqui

| Metadado | Informação |
| --- | --- |
| Versão | 0.1.0 |
| Status | Documento interno de governança do MVP |
| Última revisão | 15 de julho de 2026 |
| Responsável atual | Equipe Cloud Hive |
| Próxima revisão | Antes de qualquer disponibilização pública |

> Este documento não substitui parecer jurídico, Relatório de Impacto à Proteção de Dados Pessoais (RIPD) ou contrato entre agentes de tratamento. Ele organiza as decisões, evidências e pendências necessárias para que os documentos públicos reflitam o funcionamento real do PedeAqui.

## 1. Objetivos

O programa tem como objetivos:

- aplicar privacidade desde a concepção e por padrão;
- manter inventário das operações de tratamento;
- definir papéis e responsabilidades por operação;
- documentar finalidades e bases legais;
- reduzir coleta, exposição e retenção desnecessárias;
- permitir o exercício dos direitos dos titulares;
- controlar fornecedores e transferências;
- responder a incidentes; e
- impedir a publicação de afirmações legais incompatíveis com a implementação.

## 2. Escopo

O programa abrange:

- frontend, backend, banco de dados e autenticação;
- dados armazenados no navegador;
- cadastro e jornada do lojista;
- vitrine e jornada do consumidor;
- administração da plataforma;
- suporte, segurança, logs e auditoria; e
- integrações atuais e planejadas.

## 3. Princípios operacionais

Toda funcionalidade que trate dados pessoais deve observar:

1. **finalidade:** objetivo legítimo, específico e informado;
2. **adequação:** compatibilidade entre o uso e a finalidade apresentada;
3. **necessidade:** coleta do mínimo de dados;
4. **livre acesso e transparência:** informação clara sobre o tratamento;
5. **qualidade:** correção e atualização proporcionais à finalidade;
6. **segurança e prevenção:** proteção contra acessos e incidentes;
7. **não discriminação:** vedação de usos discriminatórios; e
8. **responsabilização:** evidências verificáveis das medidas adotadas.

## 4. Governança e papéis

### 4.1 Responsável legal pela plataforma

Antes da operação pública, deve ser identificada a pessoa física ou jurídica que responderá pelo PedeAqui. A equipe de desenvolvimento não deve ser apresentada individualmente como agente de tratamento quando atuar sob a direção da organização responsável.

### 4.2 Encarregado ou canal equivalente

Deve ser avaliada a obrigação de indicar encarregado à luz do porte e das atividades efetivamente realizadas. Mesmo em eventual hipótese de dispensa, deverá existir canal de comunicação com os titulares.

### 4.3 Responsáveis internos

| Função | Responsabilidade mínima |
| --- | --- |
| Liderança do produto | Aprovar finalidades, escopo e mudanças materiais |
| Backend | Autorizações, isolamento, retenção, logs, auditoria e integrações |
| Frontend | Transparência na interface, coleta mínima e controle do armazenamento local |
| Documentação | Versionamento e coerência entre produto, requisitos e avisos legais |
| Revisão jurídica | Validar textos, papéis, bases, contratos e obrigações antes da produção |

## 5. Mapa de agentes de tratamento

A qualificação é feita por operação e deve ser confirmada contratualmente.

| Operação | Papel provável do PedeAqui | Papel provável do lojista | Observação |
| --- | --- | --- | --- |
| Conta e autenticação do lojista | Controlador | Titular ou representante | PedeAqui define finalidade e regras da conta |
| Gestão do tenant e trial | Controlador | Titular ou contratante | Relacionada à prestação do SaaS |
| Publicação da vitrine | Controlador da plataforma; possível operador de conteúdo em aspectos definidos pelo lojista | Controlador do conteúdo comercial | Papéis podem coexistir por finalidades diferentes |
| Preparação do contato do consumidor | Operador quando atuar apenas sob finalidade comercial do lojista; controlador para segurança própria | Controlador da negociação e atendimento | Deve ser confirmado pelo desenho final do pedido |
| Segurança e prevenção a fraude | Controlador | Controlador de seus próprios registros, se houver | Cada parte responde pelas decisões próprias |
| Assinatura SaaS futura | Controlador | Titular ou representante | Stripe terá papel definido por contrato e operação |
| Armazenamento de imagens futuro | Controlador ou operador conforme o conteúdo e a finalidade | Controlador do conteúdo publicado | Cloudflare deverá ser avaliada como fornecedora |

Uma cláusula contratual não corrige uma qualificação incompatível com a prática. Mudanças de fluxo exigem nova avaliação.

## 6. Registro das operações de tratamento

### 6.1 Cadastro e autenticação

| Campo | Registro |
| --- | --- |
| Titular | Lojista ou representante |
| Dados | Nome, e-mail, telefone, CPF, credenciais protegidas e identificadores de sessão |
| Finalidade | Criar conta, autenticar, impedir duplicidade e prestar o serviço |
| Base prevista | Procedimentos preliminares e execução de contrato; obrigação legal quando aplicável |
| Sistemas | Frontend, backend, Supabase Auth e `profiles` |
| Compartilhamento | Supabase |
| Retenção | Relação ativa e período posterior justificado |
| Riscos | Exposição de CPF, sequestro de sessão, enumeração de contas e erro de autorização |
| Controles mínimos | Criptografia em trânsito, acesso restrito, mensagens seguras e revogação de sessão |

### 6.2 Tenant e loja

| Campo | Registro |
| --- | --- |
| Titular | Lojista ou representante |
| Dados | CPF ou CNPJ, nome, endereço, cidade, UF, WhatsApp e horário |
| Finalidade | Identificar o negócio, criar a vitrine e permitir contato |
| Base prevista | Execução de contrato e obrigação legal aplicável à oferta eletrônica |
| Sistemas | Backend, PostgreSQL/Supabase e frontend público |
| Compartilhamento | Visitantes da vitrine nos limites de publicidade definidos |
| Retenção | Enquanto a loja estiver ativa e período posterior justificado |
| Riscos | Exposição indevida de endereço residencial ou CPF |
| Controles mínimos | Separação entre campos privados e públicos, prévia clara e edição segura |

### 6.3 Carrinho e pedido preparado

| Campo | Registro |
| --- | --- |
| Titular | Consumidor |
| Dados | Nome, endereço, forma de pagamento pretendida, observação, itens e quantidades |
| Finalidade | Preparar o contato e a negociação com uma loja escolhida |
| Base prevista | Procedimentos preliminares a pedido do titular; execução da relação com o lojista quando aplicável |
| Sistemas atuais | `localStorage` e estado do frontend |
| Sistemas planejados | Backend para revalidação e registro idempotente do pedido preparado |
| Compartilhamento | Lojista e WhatsApp quando o consumidor prosseguir |
| Retenção | Mínima; descarte após finalidade e prazo automático ainda deve ser implementado |
| Riscos | Persistência em dispositivo compartilhado e envio excessivo de dados ao WhatsApp |
| Controles mínimos | Aviso contextual, revisão antes do envio, limpeza visível e proibição de dados sensíveis |

### 6.4 Logs, segurança e auditoria

| Campo | Registro |
| --- | --- |
| Titular | Visitante, consumidor, lojista ou administrador |
| Dados | Data, hora, IP, porta lógica quando aplicável, rota normalizada, status, duração, correlação e identidade disponível |
| Finalidade | Segurança, diagnóstico, investigação e cumprimento legal |
| Base prevista | Obrigação legal; legítimo interesse sujeito a avaliação; exercício regular de direitos |
| Retenção | 6 meses para registros de acesso quando o art. 15 do Marco Civil for aplicável; demais logs conforme matriz específica |
| Riscos | Registro de tokens, documentos, corpos de requisição ou dados de pagamento |
| Controles mínimos | Lista de exclusão de campos, acesso restrito, integridade e descarte automatizado |

### 6.5 Aceites e solicitações de titulares

| Campo | Registro |
| --- | --- |
| Titular | Lojista, consumidor ou solicitante |
| Dados | Contexto, documento, versão, data, finalidade, solicitação e evidência mínima de identidade |
| Finalidade | Demonstrar ciência, registrar consentimento quando aplicável e atender direitos |
| Base prevista | Execução de contrato, obrigação legal, exercício regular de direitos ou consentimento específico |
| Retenção | Pelo período necessário à comprovação e ao atendimento |
| Riscos | Aceite genérico, ausência de versão e coleta excessiva para autenticar o pedido |
| Controles mínimos | Registro versionado, linguagem granular, protocolo e trilha de atendimento |

## 7. Estado de adequação do MVP

| Controle | Estado | Evidência ou lacuna |
| --- | --- | --- |
| Autenticação do lojista | Parcialmente implementado | Supabase Auth e sessão existem; controles de produção ainda devem ser validados |
| Validação de CPF e unicidade | Implementado no fluxo principal | Backend valida o documento e consulta o perfil |
| Isolamento por tenant | Parcialmente implementado | Regras existem, mas exigem auditoria completa das rotas e políticas RLS |
| Aceite versionado dos documentos legais | Não concluído | Interface contém mensagem legal, mas falta registro de versão, data e finalidade |
| Canal de direitos do titular | Não definido | Identidade e contato do responsável ainda pendentes |
| Retenção e descarte | Não concluído | Requisitos existem; automações e prazos técnicos precisam ser implementados |
| Carrinho e dados do consumidor | Parcialmente implementado | Dados ficam no `localStorage`; limpeza e prazo automático são insuficientes |
| Logs de acesso por 6 meses | Não confirmado | Modelo e requisito existem, mas operação segura e retenção precisam de validação |
| Autorização administrativa | Não concluído | Rotas administrativas ainda não validam integralmente o papel do administrador |
| Stripe | Pós-MVP | Backend possui componentes, mas não há jornada financeira completa no frontend |
| Cloudflare R2 | Pós-MVP | Estratégia definida; upload integrado ainda não existe |
| Produção e HTTPS | Pós-MVP | VPS, frontend público e domínio ainda não foram implantados |
| Resposta a incidentes | Não concluído | Processo, responsáveis e canais precisam ser formalizados |

## 8. Plano de ação

### 8.1 Bloqueadores antes de qualquer publicação pública

- [ ] Identificar formalmente o responsável legal pelo PedeAqui.
- [ ] Definir canal funcional de suporte e privacidade.
- [ ] Avaliar e indicar encarregado ou documentar eventual dispensa aplicável.
- [ ] Submeter Termos e Política a revisão jurídica.
- [ ] Registrar aceite por documento, versão, usuário, data e finalidade.
- [ ] Diferenciar ciência contratual de consentimento específico.
- [ ] Definir quais dados do lojista serão públicos e impedir exposição desnecessária de CPF ou endereço residencial.
- [ ] Revisar todas as autorizações do backend e políticas RLS.
- [ ] Remover tokens, senhas, documentos completos e corpos sensíveis dos logs.
- [ ] Implementar canal e procedimento para direitos dos titulares.
- [ ] Definir retenção técnica e descarte para cada categoria.
- [ ] Implementar HTTPS e gestão segura de segredos no ambiente publicado.
- [ ] Formalizar resposta a incidentes e comunicação interna.

### 8.2 Fechamento funcional do MVP

- [ ] Exibir aviso de privacidade no formulário do consumidor.
- [ ] Informar que o WhatsApp é externo e que abrir o aplicativo não confirma a compra.
- [ ] Permitir limpar carrinho e dados do formulário de forma visível.
- [ ] Eliminar dados locais após a finalidade ou aplicar expiração automática.
- [ ] Garantir que a mensagem contenha apenas dados necessários.
- [ ] Proteger a área administrativa por papel validado no backend.
- [ ] Registrar ações administrativas críticas sem conteúdo sensível.

### 8.3 Antes da integração com Stripe

- [ ] Revisar contrato, termos, privacidade e transferência internacional do fornecedor.
- [ ] Coletar no PedeAqui somente identificadores financeiros necessários.
- [ ] Não registrar dados completos de cartão.
- [ ] Validar assinatura de webhook, idempotência e reconciliação.
- [ ] Definir retenção de eventos financeiros e obrigações fiscais.
- [ ] Atualizar os documentos antes de ativar a cobrança.

### 8.4 Antes da integração com Cloudflare R2

- [ ] Revisar contrato, localização e mecanismos de transferência do fornecedor.
- [ ] Definir tipos, tamanhos e finalidade das imagens.
- [ ] Remover metadados desnecessários quando tecnicamente possível.
- [ ] Validar autorização para gerar URL pré-assinada.
- [ ] Implementar descarte de imagens substituídas e objetos órfãos.
- [ ] Atualizar a Política antes do primeiro upload real.

## 9. Política inicial de retenção

| Categoria | Prazo ou critério inicial | Responsável por confirmar | Automação necessária |
| --- | --- | --- | --- |
| Perfis e tenants | Relação ativa mais período legal ou defensivo documentado | Produto e jurídico | Bloqueio, anonimização e exclusão |
| Loja e catálogo | Enquanto publicados; período posterior para disputas quando necessário | Produto e jurídico | Exclusão lógica e descarte final |
| Carrinho local | Até conclusão, limpeza ou expiração curta a definir | Frontend e produto | TTL e botão de limpeza |
| Dados do pedido preparado | Menor prazo compatível com contato e suporte | Produto, lojista e jurídico | Expiração e anonimização |
| Aceites | Período necessário para demonstrar validade | Jurídico | Arquivo por versão e descarte |
| Logs de acesso | 6 meses quando aplicável | Segurança e jurídico | Rotação e eliminação segura |
| Auditoria crítica | Prazo proporcional ao risco e à defesa de direitos | Segurança e jurídico | Arquivo íntegro e acesso restrito |
| Dados financeiros futuros | Obrigações contratuais, fiscais e antifraude | Financeiro e jurídico | Retenção por categoria |
| Imagens | Enquanto vinculadas e necessárias | Produto e backend | Compensação e limpeza de órfãos |
| Solicitações de titulares | Até atendimento e comprovação pelo prazo aplicável | Privacidade e jurídico | Protocolo, restrição e descarte |

Nenhum prazo indefinido deve ser usado por conveniência técnica.

## 10. Processo de direitos do titular

O processo deverá seguir estas etapas:

1. receber a solicitação e gerar protocolo;
2. identificar o controlador responsável pela operação;
3. verificar a identidade com o mínimo de dados necessário;
4. classificar o direito solicitado;
5. localizar dados e sistemas envolvidos;
6. avaliar exceções legais e necessidade de preservação;
7. executar a medida aprovada;
8. responder em linguagem clara; e
9. registrar evidências do atendimento e do descarte posterior.

Quando o lojista for o controlador, o PedeAqui deverá encaminhar ou auxiliar a solicitação conforme o contrato, sem criar barreiras ao titular.

## 11. Processo de incidente de segurança

O procedimento mínimo deverá contemplar:

1. detecção e registro do evento;
2. contenção sem destruição de evidências;
3. identificação dos sistemas, dados e titulares afetados;
4. avaliação de probabilidade e gravidade do risco ou dano;
5. correção da causa e recuperação segura;
6. decisão documentada sobre comunicação à ANPD e aos titulares;
7. cooperação entre PedeAqui, lojista e fornecedores; e
8. revisão posterior de controles e documentação.

Credenciais expostas devem ser revogadas imediatamente. Comunicações não devem divulgar detalhes que ampliem o risco.

## 12. Avaliação de fornecedores

Antes de contratar ou ativar qualquer fornecedor que trate dados pessoais, registrar:

- serviço e finalidade;
- categorias de dados e titulares;
- papel do fornecedor;
- localização e transferências;
- subcontratados relevantes;
- retenção e descarte;
- segurança e resposta a incidentes;
- apoio aos direitos dos titulares;
- possibilidade de exportação e encerramento; e
- cláusulas de proteção de dados.

## 13. Gatilhos para avaliação de impacto

Deve-se avaliar a necessidade de RIPD ou análise equivalente antes de implementar:

- geolocalização precisa ou acompanhamento contínuo;
- perfil de consumidor ou publicidade comportamental;
- decisões automatizadas com efeito relevante;
- tratamento em larga escala;
- dados sensíveis;
- biometria;
- monitoramento sistemático;
- integração de múltiplas bases; ou
- tecnologia que possa gerar alto risco aos titulares.

## 14. Controle documental

Termos de Uso e Política de Privacidade devem:

- possuir versão, data, status e histórico;
- refletir somente integrações ativas;
- ser revisados após mudança material de fluxo ou fornecedor;
- permanecer acessíveis antes do aceite;
- permitir prova da versão aceita; e
- distinguir pendências internas de informações apresentadas ao público.

## 15. Referências oficiais

- [Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-norma-pl.html)
- [Lei nº 12.965/2014 — Marco Civil da Internet](https://www2.camara.leg.br/legin/fed/lei/2014/lei-12965-23-abril-2014-778630-norma-pl.html)
- [Lei nº 8.078/1990 — Código de Defesa do Consumidor](https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-norma-pl.html)
- [Decreto nº 7.962/2013 — Comércio eletrônico](https://www2.camara.leg.br/legin/fed/decret/2013/decreto-7962-15-marco-2013-775557-norma-pe.html)
- [Guia da ANPD sobre agentes de tratamento e encarregado](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-para-definicoes-dos-agentes-de-tratamento-de-dados-pessoais-e-do-encarregado)
- [Página da ANPD para titulares de dados](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1)
- [Orientação da ANPD sobre atuação do encarregado](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-lanca-guia-sobre-atuacao-do-encarregado)
- [Regulamento e orientações da ANPD sobre transferência internacional](https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados)
- [Orientações da ANPD sobre comunicação de incidente de segurança](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis)

## 16. Histórico de versões

| Versão | Data | Alteração |
| --- | --- | --- |
| 0.1.0 | 15/07/2026 | Inventário inicial, análise de lacunas e plano de adequação do MVP |
