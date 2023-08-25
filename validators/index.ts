import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(1),
});

export const categorySchema = z.object({
  name: z.string().min(2),
  storeId: z.string().min(1),
});

export const billboardSchema = z.object({
  imageUrl: z.string().url().nonempty(),
  label: z.string().min(1),
});

export const productSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
