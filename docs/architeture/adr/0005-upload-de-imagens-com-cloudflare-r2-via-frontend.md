# 0005 - Estratégia de Upload de Imagens com Cloudflare R2 via Frontend

## Status

Accepted

## Contexto

O projeto PedeAqui necessita de um mecanismo eficiente para upload de imagens de produtos.

Inicialmente, o fluxo tradicional consistiria em enviar a imagem do frontend para o backend, que então realizaria o upload para o serviço de armazenamento (Cloudflare R2). No entanto, essa abordagem apresenta problemas arquiteturais relevantes:

* Criação de um "double hop" (salto duplo), onde o arquivo trafega duas vezes (cliente → backend → R2)
* Aumento desnecessário do tempo de upload e consumo de rede
* Sobrecarga de CPU e memória do servidor ao manipular arquivos binários
* Manutenção de conexões HTTP longas, impactando escalabilidade

Além disso, o fluxo tradicional acopla o backend a uma responsabilidade que não faz parte do seu domínio principal (transferência de arquivos), violando princípios de separação de responsabilidades .

Com base no guia técnico fornecido, identificou-se que o padrão de **Presigned URLs** permite resolver esses problemas, mantendo segurança e escalabilidade.

## Decisão

Adotar a estratégia de **upload direto do frontend para o Cloudflare R2 utilizando Presigned URLs**, com o backend atuando apenas como orquestrador de segurança.

### Fluxo definido

1. Frontend realiza validações locais do arquivo (tipo, tamanho, formato)

2. Frontend solicita ao backend uma URL pré-assinada (Presigned URL)

3. Backend valida:

   * autenticação do usuário
   * permissões da loja
   * limites de armazenamento

4. Backend gera e retorna:

   * URL de upload (temporária)
   * URL pública final do arquivo
   
5. Frontend realiza upload direto via HTTP PUT para o Cloudflare R2

6. Após sucesso (200 OK), frontend confirma a operação para o backend

7. Backend persiste a referência da imagem no banco de dados

### Regras técnicas importantes

* O upload deve ser feito via **PUT com corpo binário (File/Blob)**, sem uso de multipart/form-data
* O header **Content-Type** deve corresponder exatamente ao MIME type enviado na requisição inicial
* A URL gerada deve possuir expiração curta (5–15 minutos) por segurança
* O backend nunca manipula diretamente o arquivo

### Responsabilidades

#### Frontend

* Validação inicial de arquivos (tipo, tamanho, preview)
* Solicitação de URL assinada
* Upload direto para o R2
* Controle de estado de UI (loading, progresso)
* Confirmação final ao backend

#### Backend

* Autenticação e autorização
* Validação de quota de armazenamento
* Geração da Presigned URL
* Persistência da URL pública no banco

#### Cloudflare R2

* Armazenamento físico dos arquivos
* Entrega via CDN

## Consequências

### Positivas

* Eliminação do double hop, reduzindo latência e consumo de rede
* Redução significativa da carga no backend
* Melhor escalabilidade (upload não depende da API)
* Separação clara de responsabilidades (Clean Architecture)
* Melhor experiência do usuário (upload mais rápido)
* Possibilidade de uso eficiente de CDN para entrega de imagens

### Negativas

* Maior complexidade no frontend (gerenciamento do fluxo de upload)
* Necessidade de controle rigoroso de headers e requisições HTTP
* Implementação adicional para geração de URLs assinadas no backend
* Debug mais complexo (envolve frontend, backend e R2)

### Riscos

* Uploads inválidos se validações do frontend não forem bem implementadas
* Problemas de sincronização (upload feito mas não confirmado ao backend)
* Exposição indevida caso URLs não expirem corretamente
* Falhas no fluxo podem gerar inconsistência entre banco e armazenamento

### Trade-off Arquitetural

Optamos por maior complexidade no frontend em troca de:

* escalabilidade do sistema
* redução de custo de infraestrutura
* melhor performance geral

Essa decisão prioriza eficiência e crescimento futuro em detrimento da simplicidade inicial do fluxo tradicional.