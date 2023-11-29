import { z } from "zod";

export const billboardPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 characters" }),
  images: z
    .string({ required_error: "image is required" })
    .array()
    .min(1, { message: "must upload an image" }),
});

export type BillboardPayload = z.infer<typeof billboardPayload>;

export const updateBillboardPayload = z.object({
  id: z.string({ required_error: "id is required" }),
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 characters" }),
  images: z
    .string({ required_error: "image is required" })
    .array()
    .min(1, { message: "must upload an image" }),
});

export type UpdateBillboardPayload = z.infer<typeof updateBillboardPayload>;
