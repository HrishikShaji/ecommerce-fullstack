import { ZodError, z } from "zod";

export type ValidationSchema<T> = z.ZodSchema<T>;
export const validatePayload = <T>({
  schema,
  inputs,
}: {
  schema: ValidationSchema<T>;
  inputs: T;
}) => {
  try {
    const isValidData = schema.parse(inputs);
    return isValidData;
  } catch (error) {
    if (error instanceof ZodError) {
      if (error.errors.length) {
        for (const value of error.errors) {
          throw new Error((value as { message: string }).message);
        }
      }
    }
    throw error;
  }
};

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
export const validateBillboardPayload = (inputs: BillboardPayload) =>
  validatePayload({ schema: billboardPayload, inputs: inputs });

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
export const validateUpdateBillboardPayload = (
  inputs: UpdateBillboardPayload,
) => validatePayload({ schema: updateBillboardPayload, inputs: inputs });
