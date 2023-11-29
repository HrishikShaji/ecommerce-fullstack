import {  z } from "zod";

export const categoryPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  parentId: z.string().optional(),
});

export type CategoryPayload = z.infer<typeof categoryPayload>;

export const updateCategoryPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  id: z.string({ required_error: "id required" }),
});

export type UpdateCategoryPayload = z.infer<typeof updateCategoryPayload>;
