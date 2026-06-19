import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Hash,
  Info,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Navigation,
  Store,
} from "lucide-react";
import type { ReactNode } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { useStoreSetupForm } from "../hooks/useStoreSetupForm";
import type { StoreSetupFormData } from "../schemas/storeSetupSchema";
import "./StoreContactForm.css";

export type StoreSetupStep = 1 | 2 | 3;

type StoreContactFormProps = {
  onBack: () => void;
  onNext: () => void;
  step: StoreSetupStep;
};

type FormFieldProps = {
  error?: string;
  helper?: string;
  icon: ReactNode;
  label: string;
  name: keyof StoreSetupFormData;
  placeholder: string;
  register: UseFormRegister<StoreSetupFormData>;
};

const ADDRESS_FIELDS: Array<keyof StoreSetupFormData> = [
  "state",
  "city",
  "district",
  "street",
  "number",
];

const CONTACT_FIELDS: Array<keyof StoreSetupFormData> = [
  "storeName",
  "whatsapp",
  "email",
  "startDay",
  "endDay",
  "openAt",
  "closeAt",
];

const WEEK_DAYS = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];
const HOURS = [
  "05:00",
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
  "23:00",
  "00:00",
];

function FormField({
  error,
  helper,
  icon,
  label,
  name,
  placeholder,
  register,
}: FormFieldProps) {
  return (
    <div
      className={
        error
          ? "store-contact-form__field store-contact-form__field--invalid"
          : "store-contact-form__field"
      }
    >
      <label>
        {label}
        <strong> *</strong>
      </label>
      <div className="store-contact-form__input">
        <span className="store-contact-form__input-icon" aria-hidden="true">
          {icon}
        </span>
        <input
          placeholder={placeholder}
          type="text"
          {...register(name)}
        />
      </div>
      {error ? <p className="store-contact-form__error">{error}</p> : null}
      {helper ? <p>{helper}</p> : null}
    </div>
  );
}

function SelectField({
  error,
  icon,
  label,
  name,
  options,
  register,
}: {
  error?: string;
  icon: ReactNode;
  label: string;
  name: keyof StoreSetupFormData;
  options: string[];
  register: UseFormRegister<StoreSetupFormData>;
}) {
  return (
    <div
      className={
        error
          ? "store-contact-form__field store-contact-form__field--invalid"
          : "store-contact-form__field"
      }
    >
      <label>
        {label}
        <strong> *</strong>
      </label>
      <div className="store-contact-form__input">
        <span className="store-contact-form__input-icon" aria-hidden="true">
          {icon}
        </span>
        <select {...register(name)}>
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
      {error ? <p className="store-contact-form__error">{error}</p> : null}
    </div>
  );
}

function AddressFields({
  errors,
  register,
}: {
  errors: FieldErrors<StoreSetupFormData>;
  register: UseFormRegister<StoreSetupFormData>;
}) {
  return (
    <>
      <div className="store-contact-form__grid store-contact-form__grid--two">
        <FormField
          helper="Digite o nome do seu estado."
          error={errors.state?.message}
          icon={<Map size={24} strokeWidth={2.2} />}
          label="Estado"
          name="state"
          placeholder="Ex: SP"
          register={register}
        />
        <FormField
          helper="Digite o nome da sua cidade."
          error={errors.city?.message}
          icon={<Building2 size={24} strokeWidth={2.2} />}
          label="Cidade"
          name="city"
          placeholder="Ex: São Paulo"
          register={register}
        />
      </div>

      <div className="store-contact-form__grid store-contact-form__grid--two">
        <FormField
          helper="Digite o nome do seu bairro localizado."
          error={errors.district?.message}
          icon={<Navigation size={24} strokeWidth={2.2} />}
          label="Bairro"
          name="district"
          placeholder="Ex: Centro"
          register={register}
        />
        <FormField
          helper="Digite o nome da sua rua."
          error={errors.street?.message}
          icon={<MapPin size={24} strokeWidth={2.2} />}
          label="Rua"
          name="street"
          placeholder="Ex: Rua das Flores"
          register={register}
        />
      </div>

      <div className="store-contact-form__grid store-contact-form__grid--two">
        <FormField
          helper="Digite o número do seu estabelecimento."
          error={errors.number?.message}
          icon={<Hash size={24} strokeWidth={2.2} />}
          label="Número"
          name="number"
          placeholder="Ex: 123"
          register={register}
        />
      </div>
    </>
  );
}

function ContactFields({
  errors,
  register,
}: {
  errors: FieldErrors<StoreSetupFormData>;
  register: UseFormRegister<StoreSetupFormData>;
}) {
  return (
    <>
      <FormField
        helper="Esse nome será exibido na vitrine pública da sua loja."
        error={errors.storeName?.message}
        icon={<Store size={24} strokeWidth={2.2} />}
        label="Nome da loja"
        name="storeName"
        placeholder="Ex: Sabor do Chef"
        register={register}
      />

      <div className="store-contact-form__grid store-contact-form__grid--two">
        <FormField
          helper="Digite o seu número de whatsapp válido."
          error={errors.whatsapp?.message}
          icon={<MessageCircle size={24} strokeWidth={2.2} />}
          label="WhatsApp da loja"
          name="whatsapp"
          placeholder="(11) 91234-5678"
          register={register}
        />

        <FormField
          helper="Digite o e-mail de contato da sua loja."
          error={errors.email?.message}
          icon={<Mail size={24} strokeWidth={2.2} />}
          label="E-mail de contato"
          name="email"
          placeholder="exemplo@email.com"
          register={register}
        />
      </div>

      <div className="store-contact-form__schedule">
        <div className="store-contact-form__schedule-title">
          <CalendarDays size={24} strokeWidth={2.2} />
          <span>Funcionamento</span>
        </div>

        <div className="store-contact-form__range">
          <SelectField
            icon={<CalendarDays size={24} strokeWidth={2.2} />}
            error={errors.startDay?.message}
            label="De"
            name="startDay"
            options={WEEK_DAYS}
            register={register}
          />
          <SelectField
            icon={<CalendarDays size={24} strokeWidth={2.2} />}
            error={errors.endDay?.message}
            label="Até"
            name="endDay"
            options={WEEK_DAYS}
            register={register}
          />
        </div>
      </div>

      <div className="store-contact-form__range">
        <SelectField
          icon={<Clock3 size={24} strokeWidth={2.2} />}
          error={errors.openAt?.message}
          label="Abre às"
          name="openAt"
          options={HOURS}
          register={register}
        />
        <SelectField
          icon={<Clock3 size={24} strokeWidth={2.2} />}
          error={errors.closeAt?.message}
          label="Fecha às"
          name="closeAt"
          options={HOURS}
          register={register}
        />
      </div>
    </>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="store-contact-form__review-item">
      <span>{label}</span>
      <strong>{value || "Não informado"}</strong>
    </div>
  );
}

function ReviewFields({ formData }: { formData: StoreSetupFormData }) {
  return (
    <div className="store-contact-form__review">
      <section className="store-contact-form__review-group">
        <h3>Endereço</h3>
        <ReviewItem label="Estado" value={formData.state} />
        <ReviewItem label="Cidade" value={formData.city} />
        <ReviewItem label="Bairro" value={formData.district} />
        <ReviewItem label="Rua" value={formData.street} />
        <ReviewItem label="Número" value={formData.number} />
      </section>

      <section className="store-contact-form__review-group">
        <h3>Contato e funcionamento</h3>
        <ReviewItem label="Nome da loja" value={formData.storeName} />
        <ReviewItem label="WhatsApp" value={formData.whatsapp} />
        <ReviewItem label="E-mail" value={formData.email} />
        <ReviewItem
          label="Dias"
          value={
            formData.startDay || formData.endDay
              ? `${formData.startDay || "Não informado"} até ${
                  formData.endDay || "Não informado"
                }`
              : ""
          }
        />
        <ReviewItem
          label="Horário"
          value={
            formData.openAt || formData.closeAt
              ? `${formData.openAt || "Não informado"} às ${
                  formData.closeAt || "Não informado"
                }`
              : ""
          }
        />
      </section>
    </div>
  );
}

const STEP_META: Record<
  StoreSetupStep,
  { icon: ReactNode; note?: string; title: string }
> = {
  1: {
    icon: <MapPin size={24} strokeWidth={2.2} />,
    title: "Endereço da loja",
  },
  2: {
    icon: <MessageCircle size={24} strokeWidth={2.2} />,
    title: "Contato e atendimento",
  },
  3: {
    icon: <Info size={24} strokeWidth={2.2} />,
    note: "Confira as informações antes de seguir para os planos.",
    title: "Revisar informações",
  },
};

export function StoreContactForm({ onBack, onNext, step }: StoreContactFormProps) {
  const meta = STEP_META[step];
  const {
    formState: { errors },
    handleSubmit,
    register,
    trigger,
    watch,
  } = useStoreSetupForm();
  const formData = watch();

  async function handlePrimaryAction() {
    if (step === 1) {
      const isAddressValid = await trigger(ADDRESS_FIELDS, { shouldFocus: true });

      if (isAddressValid) {
        onNext();
      }

      return;
    }

    if (step === 2) {
      const isContactValid = await trigger(CONTACT_FIELDS, { shouldFocus: true });

      if (isContactValid) {
        onNext();
      }

      return;
    }

    void handleSubmit((data) => {
      console.log("Dados prontos para enviar ao backend:", data);
    })();
  }

  return (
    <form className="store-contact-form" aria-label="Configuração inicial da loja">
      <section className="store-contact-form__card">
        <header className="store-contact-form__title">
          <span aria-hidden="true">{meta.icon}</span>
          <h2>{meta.title}</h2>
        </header>

        <div className="store-contact-form__card-body">
          <div className="store-contact-form__fields">
            {step === 1 ? (
              <AddressFields errors={errors} register={register} />
            ) : null}
            {step === 2 ? (
              <ContactFields errors={errors} register={register} />
            ) : null}
            {step === 3 ? <ReviewFields formData={formData} /> : null}
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
          onClick={handlePrimaryAction}
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
