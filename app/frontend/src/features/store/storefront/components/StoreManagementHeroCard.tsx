import { Pencil } from 'lucide-react'

import type {
  StorefrontCopyLinkStatus,
  StorefrontEditValues,
  StorefrontStore,
} from '../types/storefront'
import { StoreEditForm } from './StoreEditForm'
import { StoreHeroCard } from './StoreHeroCard'

type StoreManagementHeroCardProps = {
  canSharePublicLink: boolean
  copyLinkStatus: StorefrontCopyLinkStatus
  isEditing: boolean
  isLoading: boolean
  isSaving: boolean
  onCancelEditing: () => void
  onEdit: () => void
  onSave: (values: StorefrontEditValues) => Promise<boolean>
  onSharePublicLink: () => Promise<void>
  saveError: string | null
  store: StorefrontStore | null
}

export function StoreManagementHeroCard({
  canSharePublicLink,
  copyLinkStatus,
  isEditing,
  isLoading,
  isSaving,
  onCancelEditing,
  onEdit,
  onSave,
  onSharePublicLink,
  saveError,
  store,
}: StoreManagementHeroCardProps) {
  return (
    <div className="space-y-4">
      <StoreHeroCard
        canSharePublicLink={canSharePublicLink}
        copyLinkStatus={copyLinkStatus}
        isLoading={isLoading}
        onSharePublicLink={onSharePublicLink}
        store={store}
      />

      <section aria-label="Gestão da loja" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#111111]">Gestão da loja</h2>
            <p className="mt-1 text-sm text-[#6b7280]">Este espaço é visível somente ao proprietário autorizado.</p>
          </div>
          <button
            aria-pressed={isEditing}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-[#111111] hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isEditing || isLoading}
            onClick={onEdit}
            type="button"
          >
            <Pencil aria-hidden="true" size={18} />
            {isEditing ? 'Editando' : 'Editar loja'}
          </button>
        </div>

        {isEditing && store ? (
          <StoreEditForm
            errorMessage={saveError}
            isSaving={isSaving}
            onCancel={onCancelEditing}
            onSave={onSave}
            store={store}
          />
        ) : null}
      </section>
    </div>
  )
}
