import { Building2, CalendarDays, Clock, Phone, Store } from 'lucide-react'
import type { MouseEvent } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import {
  FormField,
  formFieldInputWithIconClassName,
} from './FormField'
import type {
  StorePreconfigurationFormValues,
  WeekdayOption,
} from '../types/storePreconfiguration'

type IdentityStepProps = {
  disabled?: boolean
  errors: FieldErrors<StorePreconfigurationFormValues>
  register: UseFormRegister<StorePreconfigurationFormValues>
}

const weekdayOptions: WeekdayOption[] = [
  { value: 'monday', label: 'Segunda-feira' },
  { value: 'tuesday', label: 'Terca-feira' },
  { value: 'wednesday', label: 'Quarta-feira' },
  { value: 'thursday', label: 'Quinta-feira' },
  { value: 'friday', label: 'Sexta-feira' },
  { value: 'saturday', label: 'Sabado' },
  { value: 'sunday', label: 'Domingo' },
]

const describedBy = (fieldId: string, hasError: boolean) =>
  hasError ? `${fieldId}-hint ${fieldId}-error` : `${fieldId}-hint`

const openNativePicker = (event: MouseEvent<HTMLInputElement>) => {
  event.currentTarget.showPicker?.()
}

const formatCnpjInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 14)

  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

const formatWhatsappInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }

  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export function IdentityStep({ disabled = false, errors, register }: IdentityStepProps) {
  const businessDocumentRegistration = register('businessDocument')
  const whatsappNumberRegistration = register('whatsappNumber')

  return (
    <section className="space-y-6" aria-labelledby="identity-step-title">
      <div className="space-y-1">
        <h2 id="identity-step-title" className="text-xl font-semibold leading-tight text-[#111111] md:text-2xl">
          Identidade da loja
        </h2>
        <p className="text-sm leading-relaxed text-gray-500 md:text-base">
          Preencha os dados usados para identificar sua loja.
        </p>
      </div>

      <div className="grid gap-5">
        <FormField
          error={errors.storeName?.message}
          hint="Use o nome comercial conhecido pelos seus clientes."
          htmlFor="storeName"
          icon={<Store aria-hidden="true" size={18} />}
          label="Nome da loja"
          required
        >
          <input
            {...register('storeName')}
            aria-describedby={describedBy('storeName', Boolean(errors.storeName))}
            aria-invalid={Boolean(errors.storeName)}
            className={formFieldInputWithIconClassName}
            disabled={disabled}
            id="storeName"
            placeholder="Ex.: Mercadinho Central"
            type="text"
          />
        </FormField>

        <FormField
          error={errors.businessDocument?.message}
          hint="Opcional. Informe se sua loja usa CNPJ para faturamento."
          htmlFor="businessDocument"
          icon={<Building2 aria-hidden="true" size={18} />}
          label="CNPJ da loja"
        >
          <input
            {...businessDocumentRegistration}
            aria-describedby={describedBy('businessDocument', Boolean(errors.businessDocument))}
            aria-invalid={Boolean(errors.businessDocument)}
            className={formFieldInputWithIconClassName}
            disabled={disabled}
            id="businessDocument"
            inputMode="numeric"
            maxLength={18}
            onChange={(event) => {
              event.target.value = formatCnpjInput(event.target.value)
              return businessDocumentRegistration.onChange(event)
            }}
            placeholder="00.000.000/0000-00"
            type="text"
          />
        </FormField>

        <FormField
          error={errors.whatsappNumber?.message}
          hint="Esse numero sera usado para receber pedidos e mensagens."
          htmlFor="whatsappNumber"
          icon={<Phone aria-hidden="true" size={18} />}
          label="Numero de WhatsApp"
          required
        >
          <input
            {...whatsappNumberRegistration}
            aria-describedby={describedBy('whatsappNumber', Boolean(errors.whatsappNumber))}
            aria-invalid={Boolean(errors.whatsappNumber)}
            className={formFieldInputWithIconClassName}
            disabled={disabled}
            id="whatsappNumber"
            inputMode="numeric"
            maxLength={15}
            onChange={(event) => {
              event.target.value = formatWhatsappInput(event.target.value)
              return whatsappNumberRegistration.onChange(event)
            }}
            placeholder="(11) 91234-5678"
            type="tel"
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            error={errors.businessHours?.startDay?.message}
            hint="Inicio do intervalo semanal de atendimento."
            htmlFor="startDay"
            icon={<CalendarDays aria-hidden="true" size={18} />}
            label="Dia inicial de funcionamento"
            required
          >
            <select
              {...register('businessHours.startDay')}
              aria-describedby={describedBy('startDay', Boolean(errors.businessHours?.startDay))}
              aria-invalid={Boolean(errors.businessHours?.startDay)}
              className={formFieldInputWithIconClassName}
              disabled={disabled}
              id="startDay"
            >
              <option value="">Selecione</option>
              {weekdayOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            error={errors.businessHours?.endDay?.message}
            hint="Fim do intervalo semanal de atendimento."
            htmlFor="endDay"
            icon={<CalendarDays aria-hidden="true" size={18} />}
            label="Dia final de funcionamento"
            required
          >
            <select
              {...register('businessHours.endDay')}
              aria-describedby={describedBy('endDay', Boolean(errors.businessHours?.endDay))}
              aria-invalid={Boolean(errors.businessHours?.endDay)}
              className={formFieldInputWithIconClassName}
              disabled={disabled}
              id="endDay"
            >
              <option value="">Selecione</option>
              {weekdayOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            error={errors.businessHours?.opensAt?.message}
            hint="Horario em que a loja inicia atendimento."
            htmlFor="opensAt"
            icon={<Clock aria-hidden="true" size={18} />}
            label="Horario de abertura"
            required
          >
            <input
              {...register('businessHours.opensAt')}
              aria-describedby={describedBy('opensAt', Boolean(errors.businessHours?.opensAt))}
              aria-invalid={Boolean(errors.businessHours?.opensAt)}
              className={formFieldInputWithIconClassName}
              disabled={disabled}
              id="opensAt"
              onClick={openNativePicker}
              type="time"
            />
          </FormField>

          <FormField
            error={errors.businessHours?.closesAt?.message}
            hint="Atendimento atravessando meia-noite nao e aceito no MVP."
            htmlFor="closesAt"
            icon={<Clock aria-hidden="true" size={18} />}
            label="Horario de fechamento"
            required
          >
            <input
              {...register('businessHours.closesAt')}
              aria-describedby={describedBy('closesAt', Boolean(errors.businessHours?.closesAt))}
              aria-invalid={Boolean(errors.businessHours?.closesAt)}
              className={formFieldInputWithIconClassName}
              disabled={disabled}
              id="closesAt"
              onClick={openNativePicker}
              type="time"
            />
          </FormField>
        </div>
      </div>
    </section>
  )
}
