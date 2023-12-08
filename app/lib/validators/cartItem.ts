import { z } from "zod";

export const cartItemPayload = z.object({
  productId: z
    .string({ required_error: "product is required" })
    .min(1, { message: "productId is required" }),
});

export type CartItemPayload = z.infer<typeof cartItemPayload>;

export const cartItemAddPayload = z.object({
  productId: z
    .string({ required_error: "product is required" })
    .min(1, { message: "productId is required" }),
  cartId: z
    .string({ required_error: "cart is required" })
    .min(1, { message: "cartId is required" }),
});

export type CartItemAddPayload = z.infer<typeof cartItemAddPayload>;
