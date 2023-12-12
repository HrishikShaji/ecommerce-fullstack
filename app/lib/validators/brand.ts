import { z } from "zod";

export const brandPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
});

export type BrandPayload = z.infer<typeof brandPayload>;

export const updateBrandPayload = z.object({
  id: z.string({ required_error: "id required" }),
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
});

export type UpdateBrandPayload = z.infer<typeof updateBrandPayload>;
