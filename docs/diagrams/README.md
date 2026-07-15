# Diagramas do PedeAqui

Esta pasta centraliza os diagramas funcionais e técnicos do projeto.

## Organização

- [`flows/`](flows/): fluxos atuais dos atores, escritos em Mermaid.
- `use-case-*.puml`: fontes legadas dos diagramas de casos de uso em PlantUML.
- `dg-*.jpeg`: imagens legadas dos casos de uso.

Os fluxos Mermaid descrevem o comportamento existente na branch `development`, considerando conjuntamente frontend e backend. Eles não representam automaticamente todo o escopo normativo do PRD ou dos requisitos.

## Fluxos atuais

- [Fluxo do lojista](flows/flow-lojista.md)
- [Fluxo do consumidor](flows/flow-consumidor.md)
- [Fluxo do administrador](flows/flow-administrador.md)

## Convenções

- **Verde:** comportamento integrado entre interface e API.
- **Amarelo:** comportamento parcial, local ou simulado.
- **Vermelho:** comportamento indisponível ou sem integração.
- **Azul:** serviço externo ou persistência.

O termo oficial para quem visita as vitrines é **consumidor**. O termo “cliente” não deve ser usado como sinônimo desse ator nos novos diagramas.
