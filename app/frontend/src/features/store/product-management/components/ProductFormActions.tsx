import { Save, X } from 'lucide-react'

import { PrimaryButton } from '../../../../shared/components/PrimaryButton'
import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import type { ProductFormActionHandlers } from '../types/productManagement'

export function ProductFormActions({
  onCancel,
  onSave,
  saveLabel = 'Salvar produto',
}: ProductFormActionHandlers) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
      <SecondaryButton onClick={onCancel} type="button">
        <X aria-hidden="true" size={16} />
        Cancelar
      </SecondaryButton>

      <PrimaryButton onClick={onSave} type="button">
        <Save aria-hidden="true" size={16} />
        {saveLabel}
      </PrimaryButton>
    </div>
  )
}
