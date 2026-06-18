import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Hash,
  Info,
  Link,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Navigation,
  Store,
} from "lucide-react";
import type { ReactNode } from "react";
import "./StoreContactForm.css";

export type StoreSetupStep = 1 | 2 | 3;

type StoreContactFormProps = {
  onBack: () => void;
  onNext: () => void;
  step: StoreSetupStep;
};

type FormFieldProps = {
  helper?: string;
  icon: ReactNode;
  label: string;
  optional?: boolean;
  placeholder: string;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
};

const WEEK_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const HOURS = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

function FormField({
  helper,
  icon,
  label,
  optional = false,
  placeholder,
  readOnly = false,
  required,
  value,
}: FormFieldProps) {
  const isRequired = required ?? !optional;

  return (
    <div className="store-contact-form__field">
      <label>
        {label}
        {optional ? <span> (opcional)</span> : null}
        {isRequired ? <strong> *</strong> : null}
      </label>
      <div className="store-contact-form__input">
        <span className="store-contact-form__input-icon" aria-hidden="true">
          {icon}
        </span>
        <input
          placeholder={placeholder}
          readOnly={readOnly}
          type="text"
          value={value}
        />
      </div>
      {helper ? <p>{helper}</p> : null}
    </div>
  );
}

function SelectField({
  icon,
  label,
  options,
}: {
  icon: ReactNode;
  label: string;
  options: string[];
}) {
  return (
    <div className="store-contact-form__field">
      <label>
        {label}
        <strong> *</strong>
      </label>
      <div className="store-contact-form__input">
        <span className="store-contact-form__input-icon" aria-hidden="true">
          {icon}
        </span>
        <select defaultValue="">
          <option disabled value="">
            Selecione
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function StepOneFields() {
  return (
    <>
      <FormField
        helper="Esse nome será exibido na vitrine pública da sua loja."
        icon={<Store size={24} strokeWidth={2.2} />}
        label="Nome da loja"
        placeholder="Ex: Sabor do Chef"
      />

      <FormField
        helper="Prévia do endereço público gerado a partir do nome da loja."
        icon={<Link size={24} strokeWidth={2.2} />}
        label="Link público da loja"
        placeholder="pedeaqui.store/sabor-do-chef"
        readOnly
        required={false}
        value="pedeaqui.store/sabor-do-chef"
      />
    </>
  );
}

function StepTwoFields() {
  return (
    <>
      <div className="store-contact-form__grid store-contact-form__grid--two">
        <FormField
          helper="Digite o nome do seu estado."
          icon={<Map size={24} strokeWidth={2.2} />}
          label="Estado"
          placeholder="Ex: SP"
        />
        <FormField
          helper="Digite o nome da sua cidade."
          icon={<Building2 size={24} strokeWidth={2.2} />}
          label="Cidade"
          placeholder="Ex: São Paulo"
        />
      </div>

      <div className="store-contact-form__grid store-contact-form__grid--two">
        <FormField
          helper="Digite o nome do seu bairro localizado."
          icon={<Navigation size={24} strokeWidth={2.2} />}
          label="Bairro"
          placeholder="Ex: Centro"
        />
        <FormField
          helper="Digite o nome da sua rua."
          icon={<MapPin size={24} strokeWidth={2.2} />}
          label="Rua"
          placeholder="Ex: Rua das Flores"
        />
      </div>

      <div className="store-contact-form__grid store-contact-form__grid--two">
        <FormField
          helper="Digite o número do seu estabelecimento."
          icon={<Hash size={24} strokeWidth={2.2} />}
          label="Número"
          placeholder="Ex: 123"
        />
      </div>
    </>
  );
}

function StepThreeFields() {
  return (
    <>
      <div className="store-contact-form__grid store-contact-form__grid--two">
        <FormField
          helper="Digite o seu número de whatsapp válido."
          icon={<MessageCircle size={24} strokeWidth={2.2} />}
          label="WhatsApp da loja"
          placeholder="(11) 91234-5678"
        />

        <FormField
          helper="Digite o e-mail de contato da sua loja."
          icon={<Mail size={24} strokeWidth={2.2} />}
          label="E-mail de contato"
          optional
          placeholder="exemplo@email.com"
        />
      </div>

      <div className="store-contact-form__schedule">
        <div className="store-contact-form__schedule-title">
          <CalendarDays size={24} strokeWidth={2.2} />
          <span>Dias de funcionamento</span>
        </div>
        <div className="store-contact-form__days" aria-label="Dias de funcionamento">
          {WEEK_DAYS.map((day) => (
            <button key={day} type="button">
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="store-contact-form__grid store-contact-form__grid--two">
        <SelectField
          icon={<Clock3 size={24} strokeWidth={2.2} />}
          label="Abre às"
          options={HOURS}
        />
        <SelectField
          icon={<Clock3 size={24} strokeWidth={2.2} />}
          label="Fecha às"
          options={HOURS}
        />
      </div>
    </>
  );
}

const STEP_META: Record<
  StoreSetupStep,
  { icon: ReactNode; note?: string; title: string }
> = {
  1: {
    icon: <Store size={28} strokeWidth={2.2} />,
    title: "Dados da loja",
  },
  2: {
    icon: <MapPin size={28} strokeWidth={2.2} />,
    title: "Endereço da loja",
  },
  3: {
    icon: <MessageCircle size={28} strokeWidth={2.2} />,
    note: "Essas informações poderão ser alteradas sempre que precisar.",
    title: "Contato e atendimento",
  },
};

export function StoreContactForm({ onBack, onNext, step }: StoreContactFormProps) {
  const meta = STEP_META[step];

  return (
    <form className="store-contact-form" aria-label="Configuração inicial da loja">
      <section className="store-contact-form__card">
        <header className="store-contact-form__title">
          <span aria-hidden="true">{meta.icon}</span>
          <h2>{meta.title}</h2>
        </header>

        <div className="store-contact-form__card-body">
          <div className="store-contact-form__fields">
            {step === 1 ? <StepOneFields /> : null}
            {step === 2 ? <StepTwoFields /> : null}
            {step === 3 ? <StepThreeFields /> : null}
          </div>
          {meta.note ? (
            <div className="store-contact-form__note">
              <Info size={18} strokeWidth={2.1} />
              <p>{meta.note}</p>
            </div>
          ) : null}
        </div>
      </section>

      <div className="store-contact-form__actions">
        <button
          className="store-contact-form__button store-contact-form__button--primary"
          onClick={onNext}
          type="button"
        >
          <span>{step === 3 ? "Finalizar" : "Continuar"}</span>
          <ArrowRight size={30} strokeWidth={2.2} />
        </button>

        <button
          className="store-contact-form__button store-contact-form__button--secondary"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={28} strokeWidth={2.2} />
          <span>{step === 1 ? "Voltar ao cadastro" : "Voltar"}</span>
        </button>
      </div>
    </form>
  );
}
