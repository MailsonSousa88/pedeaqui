import {
  type ManageProductListItem,
  type ProductManagementActionState,
} from '../types/productManagement'
import { ManagedProductCard } from './ManagedProductCard'

type ManagedProductListProps = {
  action: ProductManagementActionState
  onEditProduct: (product: ManageProductListItem) => void
  onRemoveProduct: (product: ManageProductListItem) => void
  onToggleAvailability: (product: ManageProductListItem) => void
  products: ManageProductListItem[]
}

export function ManagedProductList({
  action,
  onEditProduct,
  onRemoveProduct,
  onToggleAvailability,
  products,
}: ManagedProductListProps) {
  return (
    <div className="flex flex-col gap-3" role="list">
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ManagedProductCard
            action={action}
            onEditProduct={onEditProduct}
            onRemoveProduct={onRemoveProduct}
            onToggleAvailability={onToggleAvailability}
            product={product}
          />
        </div>
      ))}
    </div>
  )
}
