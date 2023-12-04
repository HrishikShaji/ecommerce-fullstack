import { z } from "zod";

export const colorPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  hexCode: z
    .string({ required_error: "HexCode ise Required" })
    .min(1, { message: "HexCode is Required" }),
});

export type ColorPayload = z.infer<typeof colorPayload>;

export const updateColorPayload = z.object({
  id: z.string({ required_error: "id required" }),
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  hexCode: z
    .string({ required_error: "HexCode ise Required" })
    .min(1, { message: "HexCode is Required" }),
});

export type UpdateColorPayload = z.infer<typeof updateColorPayload>;
