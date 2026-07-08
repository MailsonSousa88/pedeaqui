import { CalendarDays, Clock, Mail, Store } from 'lucide-react'
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

export function IdentityStep({ disabled = false, errors, register }: IdentityStepProps) {
  return (
    <section className="space-y-6" aria-labelledby="identity-step-title">
      <div className="space-y-1">
        <h2 id="identity-step-title" className="text-xl font-bold text-gray-950">
          Identidade da loja
        </h2>
        <p className="text-sm leading-6 text-gray-500">
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
          error={errors.contactEmail?.message}
          hint="Este e-mail sera usado como contato principal da loja."
          htmlFor="contactEmail"
          icon={<Mail aria-hidden="true" size={18} />}
          label="E-mail de contato"
          required
        >
          <input
            {...register('contactEmail')}
            aria-describedby={describedBy('contactEmail', Boolean(errors.contactEmail))}
            aria-invalid={Boolean(errors.contactEmail)}
            className={formFieldInputWithIconClassName}
            disabled={disabled}
            id="contactEmail"
            placeholder="contato@sualoja.com"
            type="email"
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
