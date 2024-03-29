export type BillboardColumn = {
  id: string
  label: string
  imageUrl: string
  createdAt: string
}

export type CategoryColumn = {
  id: string
  name: string
  imageUrl: string
  billboardLabel?: string
  createdAt: string
}

export type ProductColumn = {
  id: string
  name: string
  images: string[]
  price: string
  inventory: number
  category: string
  size: string
  color: string
  createdAt: string
  isArchived: boolean
}

export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export type SizeColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export type OrderColumn = {
  id: string
  customerName: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string
}
