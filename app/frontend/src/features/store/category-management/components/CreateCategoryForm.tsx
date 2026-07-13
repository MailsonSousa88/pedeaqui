import type { FormEvent } from 'react'
import { CirclePlus, Tags } from 'lucide-react'

import { PrimaryButton } from '../../../../shared/components/PrimaryButton'

type CreateCategoryFormProps = {
  errorMessage: string | null
  name: string
  onCreate: () => void
  onNameChange: (value: string) => void
}

export function CreateCategoryForm({
  errorMessage,
  name,
  onCreate,
  onNameChange,
}: CreateCategoryFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onCreate()
  }

  return (
    <form
      className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-[#111111]">Nova categoria</span>
        <span className="relative">
          <Tags
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
            size={16}
          />
          <input
            aria-invalid={Boolean(errorMessage)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm uppercase text-[#111111] placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
            maxLength={32}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Ex: Bebidas"
            value={name}
          />
        </span>
      </label>

      <PrimaryButton className="w-full sm:w-fit" type="submit">
        <CirclePlus aria-hidden="true" size={16} />
        Criar categoria
      </PrimaryButton>
    </form>
  )
}
