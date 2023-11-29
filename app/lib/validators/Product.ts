import {  z } from "zod";

export const productPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  categoryId: z
    .string({ required_error: "category is required" })
    .min(1, { message: "category is required" }),
  billboardId: z
    .string({ required_error: "billboard is required" })
    .min(1, { message: "billboard is required" }),
  sizeId: z
    .string({ required_error: "size is required" })
    .min(1, { message: "size is required" }),
  colorId: z
    .string({ required_error: "color is required" })
    .min(1, { message: "color is required" }),
});

export type ProductPayload = z.infer<typeof productPayload>;

export const updateProductPayload = z.object({
  id: z.string({ required_error: "id required" }),
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  categoryId: z
    .string({ required_error: "category is required" })
    .min(1, { message: "category is required" }),
  billboardId: z
    .string({ required_error: "billboard is required" })
    .min(1, { message: "billboard is required" }),
  sizeId: z
    .string({ required_error: "size is required" })
    .min(1, { message: "size is required" }),
  colorId: z
    .string({ required_error: "color is required" })
    .min(1, { message: "color is required" }),
});

export type UpdateProductPayload = z.infer<typeof updateProductPayload>;
