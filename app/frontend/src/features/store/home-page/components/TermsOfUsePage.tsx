/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppRoute } from '../../../../app/routes/types';
import { LegalDocumentPage } from './LegalDocumentPage';

const TERMS_OF_USE_CONTENT = String.raw`# Termos de Uso do PedeAqui

| Metadado | Informação |
| --- | --- |
| Versão | 0.1.0 |
| Status | Minuta para validação do MVP |
| Última revisão | 15 de julho de 2026 |
| Vigência | Condicionada à publicação da versão aprovada |
| Responsável pelo produto | PedeAqui — equipe Cloud Hive |

> **Aviso de publicação:** esta minuta documenta as regras pretendidas para o PedeAqui, mas não deve ser apresentada como contrato vigente antes da identificação formal do fornecedor da plataforma, da definição dos canais oficiais e da revisão jurídica. Campos e controles pendentes estão consolidados no [Plano de adequação à LGPD](lgpd.md).

## 1. Objeto e alcance

Estes Termos regulam o uso do PedeAqui, plataforma de software como serviço que permite a pequenos empreendedores criar uma vitrine virtual, administrar produtos e receber contatos de consumidores pelo WhatsApp.

O PedeAqui fornece infraestrutura de catálogo e preparação do contato. Salvo indicação expressa em funcionalidade futura:

- não vende os produtos anunciados pelos lojistas;
- não recebe o pagamento dos produtos;
- não define preço, estoque, entrega, troca ou garantia dos produtos;
- não transporta mercadorias;
- não representa o consumidor ou o lojista na negociação; e
- não confirma que uma mensagem foi enviada, recebida ou respondida no WhatsApp.

O pagamento de eventual assinatura SaaS do lojista é diferente do pagamento dos produtos anunciados na vitrine.

## 2. Definições

Para estes Termos:

- **PedeAqui**: plataforma tecnológica de vitrine virtual e contato comercial;
- **lojista**: pessoa física ou jurídica responsável por uma loja e por seu catálogo;
- **consumidor**: pessoa que consulta uma vitrine ou prepara um contato com o lojista;
- **tenant**: espaço lógico que isola a conta e os dados de um lojista;
- **loja**: vitrine pública vinculada a um único tenant;
- **conteúdo**: dados, textos, imagens, marcas, preços e demais materiais inseridos pelo lojista;
- **pedido preparado**: conjunto de itens e dados organizados para iniciar contato com o lojista, sem confirmação de compra; e
- **serviço externo**: sistema operado por terceiro, como Supabase, WhatsApp, Stripe ou Cloudflare.

## 3. Aceitação e capacidade

O cadastro e o uso de funcionalidades reservadas ao lojista dependem da leitura e aceitação da versão vigente destes Termos e da Política de Privacidade.

Ao aceitar, o usuário declara que:

- possui capacidade para praticar os atos necessários ao uso da plataforma;
- representa validamente o negócio informado, quando agir em nome de pessoa jurídica;
- forneceu informações verdadeiras, atuais e completas; e
- compreendeu a diferença entre aceitar estes Termos e autorizar tratamentos de dados que dependam de consentimento específico.

A aceitação dos Termos não substitui consentimentos específicos exigidos pela legislação e não autoriza usos incompatíveis com as finalidades informadas na Política de Privacidade.

## 4. Conta, credenciais e segurança

O lojista é responsável por proteger suas credenciais e por não compartilhar sua sessão com pessoas não autorizadas. Deve comunicar suspeitas de acesso indevido pelo canal oficial que será divulgado antes da operação pública.

O PedeAqui poderá exigir confirmação de identidade, redefinição de senha ou nova autenticação quando houver indício de risco. A plataforma não solicitará senha completa por e-mail, mensagem ou atendimento.

Cada perfil poderá estar associado a, no máximo, um tenant, e cada tenant poderá possuir, no máximo, uma loja no escopo inicial do produto.

## 5. Cadastro e informações do lojista

O lojista deve manter corretos os dados necessários à identificação, ao contato e ao atendimento do consumidor. Conforme sua natureza e a legislação aplicável, poderão ser exigidos:

- nome ou nome empresarial;
- CPF ou CNPJ;
- endereço físico e eletrônico;
- telefone ou WhatsApp;
- informações da loja e horários de atendimento; e
- demais dados necessários à oferta clara dos produtos.

A plataforma poderá impedir ou limitar a publicação quando faltarem informações obrigatórias, houver inconsistência documental ou não existir direito de uso vigente.

O lojista responde pela veracidade e atualização de suas informações, sem prejuízo das responsabilidades legais que possam caber ao PedeAqui por seus próprios atos.

## 6. Período gratuito e futura assinatura SaaS

Durante o MVP, o PedeAqui poderá conceder um período gratuito controlado internamente. Esse acesso:

- não representa cobrança realizada pela Stripe;
- não cria, por si só, uma assinatura paga;
- pode possuir duração e limites informados na interface; e
- poderá ser encerrado ou convertido somente mediante comunicação clara e ação válida do lojista.

Quando a cobrança recorrente estiver disponível, preço, periodicidade, renovação, cancelamento e consequências da inadimplência deverão ser apresentados antes da contratação. Nenhuma cobrança deverá ser presumida a partir do simples cadastro ou do uso do trial.

## 7. Regras do catálogo e das ofertas

O lojista é responsável pelo conteúdo que publica e deve:

- descrever produtos de forma clara, correta e não enganosa;
- informar preço, condições, disponibilidade, características e riscos relevantes;
- manter atualizadas as informações da loja e do catálogo;
- possuir direitos sobre textos, imagens, marcas e demais materiais enviados;
- cumprir obrigações fiscais, comerciais, sanitárias e consumeristas aplicáveis à sua atividade;
- honrar as condições oferecidas ao consumidor; e
- oferecer atendimento adequado para dúvidas, cancelamentos, trocas e reclamações.

É proibido publicar ou negociar, por meio da plataforma:

- conteúdo ilícito, fraudulento, discriminatório ou que viole direitos de terceiros;
- produtos cuja comercialização seja proibida ou dependa de autorização não demonstrada;
- material que explore sexualmente crianças ou adolescentes;
- armas, drogas ilícitas, dados pessoais comercializados irregularmente ou itens de origem criminosa;
- conteúdo malicioso destinado a comprometer a plataforma ou seus usuários; e
- itens incompatíveis com as regras legais ou com as políticas obrigatórias dos serviços externos utilizados no fluxo.

A lista não é exaustiva. Restrições adicionais deverão ser comunicadas de forma acessível.

## 8. Jornada do consumidor e WhatsApp

O consumidor poderá consultar lojas e produtos sem criar uma conta. Quando o fluxo de pedido estiver disponível, os itens serão organizados para uma única loja e os dados informados poderão ser usados para compor uma mensagem ao lojista.

Antes da abertura do WhatsApp, a interface deverá informar que:

- o pedido ainda não constitui compra confirmada;
- abrir o aplicativo não confirma o envio ou o recebimento da mensagem;
- preços e disponibilidade devem ser confirmados com o lojista;
- pagamento, entrega, troca e pós-venda ocorrem diretamente entre consumidor e lojista; e
- o WhatsApp possui termos e práticas de privacidade próprios.

O consumidor deve revisar a mensagem antes de enviá-la e evitar incluir dados desnecessários ou sensíveis.

## 9. Responsabilidades do lojista perante o consumidor

O lojista é o fornecedor dos produtos apresentados em sua vitrine e permanece responsável, conforme aplicável, por:

- identificação e informações obrigatórias da oferta;
- qualidade, segurança, origem e legalidade dos produtos;
- cumprimento do preço e das condições divulgadas;
- emissão de documentos fiscais quando exigida;
- atendimento, entrega, garantia, troca, devolução e direito de arrependimento; e
- tratamento dos dados pessoais recebidos para atender o consumidor.

Estes Termos não afastam direitos assegurados pelo Código de Defesa do Consumidor nem excluem responsabilidades que a lei atribua ao PedeAqui.

## 10. Privacidade e proteção de dados

O tratamento de dados pessoais é descrito na [Política de Privacidade](privacy-policy.md). Os papéis de controlador e operador variam conforme a operação efetivamente realizada:

- o PedeAqui tende a atuar como controlador dos dados necessários à conta, segurança, administração e futura assinatura SaaS;
- o lojista tende a atuar como controlador dos dados do consumidor utilizados para negociação, entrega e atendimento;
- o PedeAqui poderá atuar como operador ao tratar dados do pedido exclusivamente segundo a finalidade definida pelo lojista; e
- cada parte poderá responder como controladora por decisões próprias de tratamento.

O lojista deverá usar os dados recebidos somente para finalidades legítimas, adotar medidas de segurança e atender os direitos dos titulares sob sua responsabilidade.

## 11. Propriedade intelectual

O software, a identidade visual e os materiais próprios do PedeAqui são protegidos pela legislação aplicável. O uso da plataforma não transfere ao usuário qualquer direito além da licença limitada necessária para utilizar as funcionalidades disponíveis.

O lojista mantém os direitos que possuir sobre seu conteúdo e concede ao PedeAqui licença não exclusiva, limitada, revogável e pelo período necessário para hospedar, processar, adaptar tecnicamente e exibir esse conteúdo na prestação do serviço.

O lojista deve remover ou regularizar conteúdo que viole direitos de terceiros. Comunicações fundamentadas sobre propriedade intelectual serão analisadas pelo canal oficial da plataforma.

## 12. Moderação, suspensão e remoção

O PedeAqui poderá restringir conteúdo ou acesso quando houver:

- violação destes Termos ou da legislação;
- risco à segurança da plataforma ou de terceiros;
- suspeita fundamentada de fraude;
- ordem de autoridade competente;
- uso abusivo de recursos; ou
- encerramento do direito de uso após as regras de tolerância aplicáveis.

Sempre que juridicamente e tecnicamente possível, o lojista será informado sobre o motivo e poderá contestar a medida. Situações urgentes poderão exigir ação imediata para reduzir danos.

## 13. Disponibilidade e evolução do serviço

O PedeAqui poderá passar por manutenção, correções e evolução. Durante a validação do MVP, algumas funções descritas no planejamento do produto podem ainda não estar disponíveis ou funcionar apenas em ambiente controlado.

Mudanças relevantes que reduzam direitos, criem cobrança ou alterem o tratamento de dados deverão ser comunicadas com antecedência razoável e, quando necessário, dependerão de nova aceitação.

## 14. Limites de responsabilidade

Dentro dos limites permitidos pela legislação, o PedeAqui não responde por atos exclusivos do lojista, do consumidor ou de serviços externos fora de seu controle, incluindo o conteúdo da oferta, a negociação, o pagamento do produto, a entrega ou o uso do WhatsApp.

Essa previsão não exclui responsabilidade por falha própria da plataforma, violação de dever legal, tratamento irregular de dados ou qualquer hipótese em que a exclusão seja proibida.

Nenhuma disposição destes Termos limita direitos indisponíveis ou garantias do consumidor.

## 15. Encerramento da conta

O lojista poderá solicitar o encerramento da conta pelo canal que será divulgado antes da operação pública. O encerramento:

- não elimina obrigações já constituídas;
- não determina exclusão imediata de dados sujeitos a dever legal, prevenção à fraude ou exercício regular de direitos;
- deve retirar a loja de circulação após o processamento da solicitação; e
- observará os prazos e critérios da Política de Privacidade.

## 16. Comunicações e suporte

Antes da publicação, o PedeAqui deverá divulgar, em local de fácil acesso:

- identificação formal do responsável pela plataforma;
- endereço de contato;
- canal de suporte;
- canal de privacidade e proteção de dados; e
- procedimento para denúncias, contestações e solicitações de titulares.

Enquanto esses dados não forem definidos, esta minuta permanece sem vigência externa.

## 17. Lei aplicável e solução de conflitos

Estes Termos serão interpretados de acordo com a legislação brasileira. As partes devem buscar solução direta pelos canais oficiais antes de recorrer a outros meios, sem impedir o acesso aos órgãos de defesa do consumidor, à ANPD ou ao Poder Judiciário.

Será competente o foro determinado pela legislação aplicável, preservado o direito do consumidor de utilizar o foro de seu domicílio quando cabível.

## 18. Referências normativas

- [Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-norma-pl.html)
- [Lei nº 12.965/2014 — Marco Civil da Internet](https://www2.camara.leg.br/legin/fed/lei/2014/lei-12965-23-abril-2014-778630-norma-pl.html)
- [Lei nº 8.078/1990 — Código de Defesa do Consumidor](https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-norma-pl.html)
- [Decreto nº 7.962/2013 — Comércio eletrônico](https://www2.camara.leg.br/legin/fed/decret/2013/decreto-7962-15-marco-2013-775557-norma-pe.html)
- [Guia da ANPD sobre agentes de tratamento e encarregado](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-para-definicoes-dos-agentes-de-tratamento-de-dados-pessoais-e-do-encarregado)

## 19. Histórico de versões

| Versão | Data | Alteração |
| --- | --- | --- |
| 0.1.0 | 15/07/2026 | Primeira minuta alinhada ao escopo e ao estado do MVP |`;

type TermsOfUsePageProps = {
  onNavigate: (route: AppRoute, planId?: number) => void;
};

export function TermsOfUsePage({ onNavigate }: TermsOfUsePageProps) {
  return <LegalDocumentPage content={TERMS_OF_USE_CONTENT} onNavigate={onNavigate} />;
}
