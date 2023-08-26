export type BillboardColumn = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel?: string;
  createdAt: string;
};

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
};
