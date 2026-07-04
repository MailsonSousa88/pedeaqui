import { Building2, Hash, Home, MapPin } from 'lucide-react'
import type { ChangeEvent } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import {
  FormField,
  formFieldInputWithIconClassName,
} from './FormField'
import type { StorePreconfigurationFormValues } from '../types/storePreconfiguration'

type AddressStepProps = {
  disabled?: boolean
  errors: FieldErrors<StorePreconfigurationFormValues>
  register: UseFormRegister<StorePreconfigurationFormValues>
}

const describedBy = (fieldId: string, hasError: boolean) =>
  hasError ? `${fieldId}-hint ${fieldId}-error` : `${fieldId}-hint`

export function AddressStep({ disabled = false, errors, register }: AddressStepProps) {
  const stateRegistration = register('address.state')

  const handleStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
    void stateRegistration.onChange(event)
  }

  return (
    <section className="space-y-6" aria-labelledby="address-step-title">
      <div className="space-y-1">
        <h2 id="address-step-title" className="text-xl font-bold text-gray-950">
          Endereco da loja
        </h2>
        <p className="text-sm leading-6 text-gray-500">
          Informe o endereco completo da loja para concluir os dados minimos do pre-registro.
        </p>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            error={errors.address?.state?.message}
            hint="Informe o seu estado"
            htmlFor="state"
            icon={<MapPin aria-hidden="true" size={18} />}
            label="Estado"
            required
          >
            <input
              {...stateRegistration}
              aria-describedby={describedBy('state', Boolean(errors.address?.state))}
              aria-invalid={Boolean(errors.address?.state)}
              className={formFieldInputWithIconClassName}
              disabled={disabled}
              id="state"
              maxLength={2}
              onChange={handleStateChange}
              placeholder="Ex.: SP"
              type="text"
            />
          </FormField>

          <FormField
            error={errors.address?.city?.message}
            hint="Cidade onde a loja esta localizada."
            htmlFor="city"
            icon={<Building2 aria-hidden="true" size={18} />}
            label="Cidade"
            required
          >
            <input
              {...register('address.city')}
              aria-describedby={describedBy('city', Boolean(errors.address?.city))}
              aria-invalid={Boolean(errors.address?.city)}
              className={formFieldInputWithIconClassName}
              disabled={disabled}
              id="city"
              placeholder="Ex.: Sao Paulo"
              type="text"
            />
          </FormField>
        </div>

        <FormField
          error={errors.address?.neighborhood?.message}
          hint="Bairro usado para localizar a loja."
          htmlFor="neighborhood"
          icon={<Home aria-hidden="true" size={18} />}
          label="Bairro"
          required
        >
          <input
            {...register('address.neighborhood')}
            aria-describedby={describedBy('neighborhood', Boolean(errors.address?.neighborhood))}
            aria-invalid={Boolean(errors.address?.neighborhood)}
            className={formFieldInputWithIconClassName}
            disabled={disabled}
            id="neighborhood"
            placeholder="Ex.: Centro"
            type="text"
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-[1fr_160px]">
          <FormField
            error={errors.address?.street?.message}
            hint="Rua, avenida ou travessa da loja."
            htmlFor="street"
            icon={<MapPin aria-hidden="true" size={18} />}
            label="Rua"
            required
          >
            <input
              {...register('address.street')}
              aria-describedby={describedBy('street', Boolean(errors.address?.street))}
              aria-invalid={Boolean(errors.address?.street)}
              className={formFieldInputWithIconClassName}
              disabled={disabled}
              id="street"
              placeholder="Ex.: Rua das Flores"
              type="text"
            />
          </FormField>

          <FormField
            error={errors.address?.number?.message}
            hint="Numero do imovel."
            htmlFor="number"
            icon={<Hash aria-hidden="true" size={18} />}
            label="Numero"
            required
          >
            <input
              {...register('address.number')}
              aria-describedby={describedBy('number', Boolean(errors.address?.number))}
              aria-invalid={Boolean(errors.address?.number)}
              className={formFieldInputWithIconClassName}
              disabled={disabled}
              id="number"
              placeholder="120"
              type="text"
            />
          </FormField>
        </div>
      </div>
    </section>
  )
}
