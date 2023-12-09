import { z } from "zod";

export const orderPayload = z.object({
  productIds: z
    .array(z.string())
    .min(1, { message: "atleast one productId is needed" }),
});

export type OrderPayload = z.infer<typeof orderPayload>;
