# Contract: store-preconfiguration-payload

## Objetivo

Documentar o payload preparado pela tela de pre-configuracao da loja antes da integracao real com backend.

Este contrato pertence somente a spec `store-preconfiguration`. Ele nao cria backend, nao altera rotas e nao substitui contratos oficiais futuros.

## Origem

- Feature: `store-preconfiguration`
- Screen: `docs/screens/screen-store-preconfiguration-0005.md`
- Proxima tela esperada: `docs/screens/screen-store-preregistration-validation-0009.md`
- Fonte tecnica complementar: `docs/records/frontend/02-logica-payload-pre-registro-lojista.md`

## Status da Integracao

- Endpoints futuros esperados: `POST /api/tenants` e `POST /api/stores`.
- Autenticacao futura: `Authorization: Bearer <accessToken>`.
- Responsabilidade atual do frontend: coletar, validar localmente e montar payload tipado.
- Responsabilidade futura do backend: validar regras finais, persistir dados, validar slug e retornar resultado oficial.

## Payload Esperado

```ts
type StorePreconfigurationPayload = {
  tenant: {
    document: string | null;
  };
  store: {
    slug: string;
    storeName: string;
    horarioAbertura: string;
    horarioFechamento: string;
    endereco: string;
    descricao: string | null;
    logoUrl: string | null;
  };
  source: {
    businessDocument: string | null;
    businessHours: {
      startDay: Weekday;
      endDay: Weekday;
      opensAt: string;
      closesAt: string;
    };
    address: {
      state: string;
      city: string;
      neighborhood: string;
      street: string;
      number: string;
    };
  };
};
```

## Campos

| Campo | Tipo | Obrigatorio | Origem na UI | Observacoes |
|---|---|---:|---|---|
| `tenant.document` | `string \| null` | Nao | CNPJ da loja | CNPJ sem mascara quando informado; `null` quando vazio. |
| `store.slug` | `string` | Sim | Nome da loja | Gerado tecnicamente a partir do nome; nao aparece na UI. |
| `store.storeName` | `string` | Sim | Nome da loja | Nome comercial revisado pelo lojista. |
| `store.horarioAbertura` | `string` | Sim | Horario de abertura | Formato `HH:mm`. |
| `store.horarioFechamento` | `string` | Sim | Horario de fechamento | Formato `HH:mm`; deve ser posterior a abertura. |
| `store.endereco` | `string` | Sim | Endereco | Endereco completo serializado a partir da etapa 2. |
| `store.descricao` | `string \| null` | Nao | Nao exibido | `null` enquanto nao houver campo na tela. |
| `store.logoUrl` | `string \| null` | Nao | Nao exibido | `null` enquanto nao houver upload de logo. |
| `source.businessDocument` | `string \| null` | Nao | CNPJ da loja | Mantido para rastrear o dado fiscal usado na montagem. |
| `source.businessHours` | `object` | Sim | Funcionamento | Mantem os valores estruturados do formulario. |
| `source.address` | `object` | Sim | Endereco | Mantem os valores estruturados do formulario. |

## Exemplo

```json
{
  "tenant": {
    "document": "11222333000181"
  },
  "store": {
    "slug": "mercadinho-central",
    "storeName": "Mercadinho Central",
    "horarioAbertura": "08:00",
    "horarioFechamento": "18:00",
    "endereco": "Rua das Flores, 120 - Centro, Sao Paulo - SP",
    "descricao": null,
    "logoUrl": null,
  },
  "source": {
    "businessDocument": "11222333000181",
    "businessHours": {
      "startDay": "monday",
      "endDay": "friday",
      "opensAt": "08:00",
      "closesAt": "18:00"
    },
    "address": {
      "state": "SP",
      "city": "Sao Paulo",
      "neighborhood": "Centro",
      "street": "Rua das Flores",
      "number": "120"
    }
  }
}
```

## Validacoes Locais

- Nome da loja e obrigatorio.
- CNPJ e opcional.
- CNPJ preenchido deve ter 14 digitos e ser valido.
- O payload temporário do pré-registro não recebe WhatsApp.
- Na integração de criação da loja, `whatsappNumber` deve ser derivado de `session.profile.phone`, preenchido anteriormente na tela de cadastro.
- Dias de funcionamento devem formar intervalo continuo.
- `opensAt` e `closesAt` devem usar formato `HH:mm`.
- `closesAt` deve ser posterior a `opensAt`.
- Funcionamento atravessando meia-noite, como `18:00` ate `02:00`, nao e aceito no MVP.
- Endereco completo e obrigatorio.
- Erros devem ser exibidos proximos aos campos correspondentes.

## Fora do Payload Desta Tela

Este payload nao deve conter:

- plano escolhido;
- preview de URL publica;
- dados de pagamento;
- dados da Stripe;
- status de ativacao da loja;
- imagem, logo, banner ou foto de perfil;
- produtos;
- categorias;
- dados de dashboard;
- validacao de posse ou confirmacao do numero de WhatsApp.

## Resultado Esperado do Service

```ts
type StorePreconfigurationResult =
  | {
      ok: true;
      payload: StorePreconfigurationPayload;
    }
  | {
      ok: false;
      message: string;
    };
```

Enquanto o fluxo autenticado completo nao estiver definido, o service pode retornar o payload preparado para a proxima etapa do fluxo sem vazar mensagens cruas da API para a interface.
