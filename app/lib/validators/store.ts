import { z } from "zod";

export const storePayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 characters" }),
});

export type StorePayload = z.infer<typeof storePayload>;

export const updateStorePayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 characters" }),
});

export type UpdateStorePayload = z.infer<typeof updateStorePayload>;
