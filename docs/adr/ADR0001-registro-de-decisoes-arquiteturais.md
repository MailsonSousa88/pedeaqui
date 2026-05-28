# 0001 - Registro de Decisões Arquiteturais

## Status
Accepted

## Contexto
    
Durante o desenvolvimento do MVP PedeAqui, identificamos a necessidade de registrar formalmente as decisões arquiteturais do projeto. Em ambientes ágeis, o código e os commits não são suficientes para explicar o contexto e os motivos por trás das escolhas técnicas.

Além disso, o time possui restrições de tempo (semestre acadêmico) e precisa garantir alinhamento e rastreabilidade das decisões ao longo da evolução do sistema.

## Decisão

Adotamos o padrão de Architecture Decision Records (ADR) como ferramenta oficial de governança técnica do projeto.

Os ADRs serão:
- Armazenados no repositório Git
- Escritos em formato Markdown
- Nomeados sequencialmente (0001, 0002, ...)
- Baseados no template de Michael Nygard (Status, Contexto, Decisão, Consequências)
- Toda decisão arquitetural relevante deverá ser registrada antes ou no momento da sua adoção.

## Consequências

### Positivas
- Melhoria na rastreabilidade das decisões técnicas
- Facilita onboarding de novos membros
- Reduz ambiguidades e retrabalho
- Cria histórico técnico do projeto

### Negativas
- Custo adicional de tempo para escrever e manter ADRs
- Possível desatualização se não houver disciplina do time
- Pode ser ignorado em momentos de pressão por entrega

## Riscos
- ADRs superficiais que não capturam os trade-offs reais
- Falta de padronização na escrita entre membros

