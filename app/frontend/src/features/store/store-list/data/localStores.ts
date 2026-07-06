import type { StoreSummary } from '../types/storeList'

export const localStores = [
  {
    id: 'burgao-house',
    name: 'Burgão House',
    description: 'Hambúrgueres artesanais.',
    isSelectable: true,
  },
  {
    id: 'pizzaria-bella',
    name: 'Pizzaria Bella',
    description: 'Pizzas artesanais feitas com amor.',
    isSelectable: true,
  },
  {
    id: 'padaria-doce-pao',
    name: 'Padaria Doce Pão',
    description: 'Pães fresquinhos e doces irresistíveis.',
    isSelectable: true,
  },
  {
    id: 'acai-express',
    name: 'Açaí Express',
    description: 'Açaís, sorvetes e acompanhamentos.',
    isSelectable: true,
  },
  {
    id: 'cacau-show',
    name: 'Cacau Show',
    description: 'Chocolates, presentes e sabores especiais.',
    isSelectable: true,
  },
  {
    id: 'calcados-do-chico',
    name: 'Calçados do Chico',
    description: 'Calçados para todos os estilos.',
    isSelectable: true,
  },
  {
    id: 'mercado-primavera',
    name: 'Mercado Primavera',
    description: 'Produtos frescos e itens para o dia a dia.',
    isSelectable: true,
  },
  {
    id: 'farmacia-saude',
    name: 'Farmácia Saúde',
    description: 'Cuidados, higiene e bem-estar.',
    isSelectable: true,
  },
  {
    id: 'pet-amigo',
    name: 'Pet Amigo',
    description: 'Produtos e cuidados para seu pet.',
    isSelectable: true,
  },
] satisfies readonly StoreSummary[]
