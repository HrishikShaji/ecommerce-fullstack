import { z } from "zod";

export const variantPayload = z.object({
  sizeId: z
    .string({ required_error: "size is required" })
    .min(1, { message: "size is required" }),
  colorId: z
    .string({ required_error: "color is required" })
    .min(1, { message: "color is required" }),
  images: z
    .string({ required_error: "image is required" })
    .array()
    .min(1, { message: "must upload an image" }),
  price: z.coerce
    .number({ required_error: "price is required" })
    .min(1, { message: "price is required" }),
  stock: z.coerce
    .number({ required_error: "stock is required" })
    .min(1, { message: "stock is required" }),
  discount: z.coerce
    .number({ required_error: "discount is required" })
    .min(1, { message: "discount is required" }),
});

export type VariantPayload = z.infer<typeof variantPayload>;
