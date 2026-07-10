import { CheckCircle2, MapPin, Pencil, Store } from 'lucide-react'

import type {
  StorePreconfigurationFormValues,
  StorePreconfigurationStep,
  Weekday,
} from '../types/storePreconfiguration'

type ReviewStepProps = {
  onEdit: (step: StorePreconfigurationStep) => void
  values: StorePreconfigurationFormValues
}

const weekdayLabels: Record<Weekday, string> = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
  sunday: 'Domingo',
}

const formatWeekday = (weekday: Weekday | '') => {
  if (!weekday) {
    return 'Não informado'
  }

  return weekdayLabels[weekday]
}

const formatValue = (value: string) => value || 'Não informado'

type ReviewBlockProps = {
  children: React.ReactNode
  icon: React.ReactNode
  onEdit: () => void
  title: string
}

function ReviewBlock({ children, icon, onEdit, title }: ReviewBlockProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-red-50 text-red-600">
            {icon}
          </span>
          <h3 className="text-base font-bold text-gray-950">{title}</h3>
        </div>

        <button
          aria-label={`Editar ${title}`}
          className="inline-flex items-center gap-2 rounded-full border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          onClick={onEdit}
          type="button"
        >
          <Pencil aria-hidden="true" size={14} />
          Editar
        </button>
      </div>

      <dl className="grid gap-3 text-sm">{children}</dl>
    </article>
  )
}

type ReviewItemProps = {
  label: string
  value: string
}

function ReviewItem({ label, value }: ReviewItemProps) {
  return (
    <div className="grid gap-1 border-t border-gray-100 pt-3 first:border-t-0 first:pt-0">
      <dt className="text-xs font-semibold uppercase tracking-normal text-gray-400">{label}</dt>
      <dd className="text-sm font-medium text-gray-900">{value}</dd>
    </div>
  )
}

export function ReviewStep({ onEdit, values }: ReviewStepProps) {
  return (
    <section className="space-y-6" aria-labelledby="review-step-title">
      <div className="space-y-1">
        <h2 id="review-step-title" className="text-xl font-bold text-gray-950">
          Revisão da loja
        </h2>
        <p className="text-sm leading-6 text-gray-500">
          Confira os dados preenchidos antes de finalizar o pré-registro.
        </p>
      </div>

      <div className="grid gap-5">
        <ReviewBlock
          icon={<Store aria-hidden="true" size={18} />}
          onEdit={() => onEdit(1)}
          title="Identidade da loja"
        >
          <ReviewItem label="Nome da loja" value={formatValue(values.storeName)} />
          <ReviewItem label="CNPJ da loja" value={formatValue(values.businessDocument)} />
          <ReviewItem label="WhatsApp" value={formatValue(values.whatsappNumber)} />
          <ReviewItem
            label="Dias de funcionamento"
            value={`${formatWeekday(values.businessHours.startDay)} até ${formatWeekday(
              values.businessHours.endDay,
            )}`}
          />
          <ReviewItem
            label="Horário de funcionamento"
            value={`${formatValue(values.businessHours.opensAt)} até ${formatValue(
              values.businessHours.closesAt,
            )}`}
          />
        </ReviewBlock>

        <ReviewBlock
          icon={<MapPin aria-hidden="true" size={18} />}
          onEdit={() => onEdit(2)}
          title="Endereço da loja"
        >
          <ReviewItem label="Estado" value={formatValue(values.address.state)} />
          <ReviewItem label="Cidade" value={formatValue(values.address.city)} />
          <ReviewItem label="Bairro" value={formatValue(values.address.neighborhood)} />
          <ReviewItem label="Rua" value={formatValue(values.address.street)} />
          <ReviewItem label="Número" value={formatValue(values.address.number)} />
        </ReviewBlock>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-green-800">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
        <p>Suas informações estão seguras e protegidas com criptografia avançada.</p>
      </div>
    </section>
  )
}
