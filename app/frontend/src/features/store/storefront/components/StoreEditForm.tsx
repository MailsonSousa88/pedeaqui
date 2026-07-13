import { zodResolver } from '@hookform/resolvers/zod'
import { Save, X } from 'lucide-react'
import type { ChangeEvent, ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { PrimaryButton } from '../../../../shared/components/PrimaryButton'
import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import { storefrontEditSchema } from '../schemas/storefrontSchema'
import type { StorefrontEditValues, StorefrontStore } from '../types/storefront'

type StoreEditFormProps = {
  errorMessage: string | null
  isSaving: boolean
  onCancel: () => void
  onSave: (values: StorefrontEditValues) => Promise<boolean>
  store: StorefrontStore
}

type EditFieldProps = {
  children: ReactNode
  error?: string
  label: string
}

const inputClassName =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507] disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200'

function EditField({ children, error, label }: EditFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111111]">
      {label}
      {children}
      {error ? (
        <span className="text-xs font-medium text-[#dc2626]" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}

const formatWhatsappInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
  }

  return digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}

const getEditableAddress = (store: StorefrontStore) => {
  const locationSuffix = `, ${store.city} - ${store.state}`

  return store.endereco.toLocaleLowerCase('pt-BR').endsWith(locationSuffix.toLocaleLowerCase('pt-BR'))
    ? store.endereco.slice(0, -locationSuffix.length)
    : store.endereco
}

export function StoreEditForm({
  errorMessage,
  isSaving,
  onCancel,
  onSave,
  store,
}: StoreEditFormProps) {
  const form = useForm<StorefrontEditValues>({
    resolver: zodResolver(storefrontEditSchema),
    defaultValues: {
      storeName: store.storeName,
      descricao: store.descricao ?? '',
      horarioAbertura: store.horarioAbertura ?? '',
      horarioFechamento: store.horarioFechamento ?? '',
      endereco: getEditableAddress(store),
      city: store.city,
      state: store.state,
      whatsappNumber: formatWhatsappInput(store.whatsappNumber),
    },
  })

  const stateRegistration = form.register('state')
  const whatsappRegistration = form.register('whatsappNumber')

  const handleStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
    void stateRegistration.onChange(event)
  }

  const handleWhatsappChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = formatWhatsappInput(event.target.value)
    void whatsappRegistration.onChange(event)
  }

  return (
    <form
      className="mt-6 space-y-5 border-t border-gray-100 pt-6"
      noValidate
      onSubmit={form.handleSubmit(async (values) => {
        await onSave(values)
      })}
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#e30507]">Editar vitrine</p>
        <h2 className="mt-2 text-xl font-semibold leading-tight text-[#111111]">
          Informações públicas da loja
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-500">
          Atualize apenas os dados que seus clientes precisam visualizar.
        </p>
      </div>

      <div className="grid gap-5">
        <EditField error={form.formState.errors.storeName?.message} label="Nome da loja">
          <input
            {...form.register('storeName')}
            aria-invalid={Boolean(form.formState.errors.storeName)}
            className={inputClassName}
            disabled={isSaving}
            type="text"
          />
        </EditField>

        <EditField error={form.formState.errors.descricao?.message} label="Descrição">
          <textarea
            {...form.register('descricao')}
            aria-invalid={Boolean(form.formState.errors.descricao)}
            className={`${inputClassName} min-h-28 resize-y`}
            disabled={isSaving}
            placeholder="Conte aos clientes o que torna sua loja especial."
          />
        </EditField>

        <div className="grid gap-5 sm:grid-cols-2">
          <EditField error={form.formState.errors.horarioAbertura?.message} label="Abertura">
            <input
              {...form.register('horarioAbertura')}
              aria-invalid={Boolean(form.formState.errors.horarioAbertura)}
              className={inputClassName}
              disabled={isSaving}
              type="time"
            />
          </EditField>

          <EditField error={form.formState.errors.horarioFechamento?.message} label="Fechamento">
            <input
              {...form.register('horarioFechamento')}
              aria-invalid={Boolean(form.formState.errors.horarioFechamento)}
              className={inputClassName}
              disabled={isSaving}
              type="time"
            />
          </EditField>
        </div>

        <EditField
          error={form.formState.errors.endereco?.message}
          label="Endereço (rua, número e bairro)"
        >
          <input
            {...form.register('endereco')}
            aria-invalid={Boolean(form.formState.errors.endereco)}
            className={inputClassName}
            disabled={isSaving}
            type="text"
          />
        </EditField>

        <div className="grid gap-5 sm:grid-cols-[1fr_120px]">
          <EditField error={form.formState.errors.city?.message} label="Cidade">
            <input
              {...form.register('city')}
              aria-invalid={Boolean(form.formState.errors.city)}
              className={inputClassName}
              disabled={isSaving}
              type="text"
            />
          </EditField>

          <EditField error={form.formState.errors.state?.message} label="UF">
            <input
              {...stateRegistration}
              aria-invalid={Boolean(form.formState.errors.state)}
              className={inputClassName}
              disabled={isSaving}
              maxLength={2}
              onChange={handleStateChange}
              type="text"
            />
          </EditField>
        </div>

        <EditField error={form.formState.errors.whatsappNumber?.message} label="WhatsApp">
          <input
            {...whatsappRegistration}
            aria-invalid={Boolean(form.formState.errors.whatsappNumber)}
            className={inputClassName}
            disabled={isSaving}
            inputMode="numeric"
            onChange={handleWhatsappChange}
            type="tel"
          />
        </EditField>
      </div>

      {errorMessage ? (
        <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-[#dc2626]" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
        <SecondaryButton disabled={isSaving} onClick={onCancel} type="button">
          <X aria-hidden="true" size={16} />
          Cancelar
        </SecondaryButton>
        <PrimaryButton disabled={isSaving || form.formState.isSubmitting} type="submit">
          <Save aria-hidden="true" size={16} />
          {isSaving ? 'Salvando...' : 'Salvar alterações'}
        </PrimaryButton>
      </div>
    </form>
  )
}
