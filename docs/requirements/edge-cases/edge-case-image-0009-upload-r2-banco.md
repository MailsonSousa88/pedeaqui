# Edge Case Image 0009 - Inconsistência entre upload no R2 e registro no banco

## Origem

Levantamento de edge cases a partir dos requisitos de upload de imagens e armazenamento externo.

## Contexto

O sistema deve armazenar imagens em serviço externo, como Cloudflare R2, e manter no banco apenas referências como URL, chave do objeto e metadados.

## Situação fora do caminho feliz

Podem ocorrer situações como:

- upload no R2 funciona, mas gravação no banco falha;
- banco grava URL, mas upload no R2 falha;
- imagem é removida do produto, mas continua ocupando espaço no R2;
- lojista excede limite de armazenamento de fotos;
- arquivo inválido passa pela extensão, mas não pelo MIME real.

## Risco

Sem tratamento adequado, o sistema pode:

- deixar arquivos órfãos no R2;
- exibir imagem quebrada na vitrine;
- cobrar armazenamento incorreto;
- permitir upload malicioso ou inválido;
- ultrapassar limite de armazenamento do tenant.

## Comportamento esperado

O sistema deve:

1. Validar arquivo antes do upload.
2. Confirmar upload antes de gravar referência definitiva no banco.
3. Tratar falha de banco após upload com compensação ou limpeza.
4. Remover ou marcar imagens substituídas conforme regra definida.
5. Controlar uso de armazenamento por tenant.

## Critérios de validação

- Upload inválido deve retornar HTTP 422.
- Banco não deve apontar para imagem inexistente no R2.
- Falha após upload não deve deixar arquivo órfão sem rastreio.
- Remoção de imagem deve atualizar banco e armazenamento conforme regra definida.
- Limite de armazenamento do tenant deve ser respeitado.

## Decisões pendentes

O time ainda precisa decidir:

- como será feita a limpeza de imagens órfãs;
- se remoção será imediata ou assíncrona;
- qual limite de imagens e tamanho por tipo de imagem;
- se imagens serão convertidas para WebP;
- se haverá compressão com biblioteca como Sharp;
- como será calculado o uso de `photo_storage_limit`.

## Observação

Esse edge case envolve consistência entre banco e storage. O banco não deve ser tratado como se guardasse a imagem; ele guarda a referência.
