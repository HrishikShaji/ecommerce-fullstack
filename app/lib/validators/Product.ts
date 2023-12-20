import { z } from "zod";

export const productPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(30, { message: "must be less than 30 charaters" }),
  slug: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(30, { message: "must be less than 30 charaters" }),
  categoryId: z
    .string({ required_error: "category is required" })
    .min(1, { message: "category is required" }),
  billboardId: z
    .string({ required_error: "billboard is required" })
    .min(1, { message: "billboard is required" }),
  brandId: z
    .string()
    .min(1, { message: "must be more than 1 characters" })
    .max(30, { message: "must be less than 30 charaters" }),
  variants: z.array(z.object({})),
});

export type ProductPayload = z.infer<typeof productPayload>;

export const updateProductPayload = z.object({
  id: z.string({ required_error: "id required" }),
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(30, { message: "must be less than 30 charaters" }),
  slug: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(30, { message: "must be less than 30 charaters" }),
  categoryId: z
    .string({ required_error: "category is required" })
    .min(1, { message: "category is required" }),
  billboardId: z
    .string({ required_error: "billboard is required" })
    .min(1, { message: "billboard is required" }),
  brandId: z
    .string()
    .min(1, { message: "must be more than 1 characters" })
    .max(30, { message: "must be less than 30 charaters" }),
  variants: z.array(z.object({})),
});

export type UpdateProductPayload = z.infer<typeof updateProductPayload>;
