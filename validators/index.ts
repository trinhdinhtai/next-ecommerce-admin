import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(1),
});

export const categorySchema = z.object({
  name: z.string().min(2),
  billboardId: z.string(),
});

export const billboardSchema = z.object({
  imageUrl: z.string().url().nonempty(),
  label: z.string().min(1),
});

export const productSchema = z.object({
  name: z.string().min(1),
  images: z
    .object({ url: z.string() })
    .array()
    .nonempty("Please add at least one image or update the existing one"),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export const colorSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: "Please fill in the correct color code format",
  }),
});

export const sizeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
