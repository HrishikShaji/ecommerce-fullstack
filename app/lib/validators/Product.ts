import { ZodError, z } from "zod";

export const productPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  categoryId: z.string({ required_error: "category is required" }),
  billboardId: z.string({ required_error: "billboard is required" }),
  sizeId: z.string({ required_error: "size is required" }),
  colorId: z.string({ required_error: "color is required" }),
});

export type ProductPayload = z.infer<typeof productPayload>;
export const validateProductPayload = (inputs: ProductPayload) => {
  try {
    const isValidData = productPayload.parse(inputs);
    return isValidData;
  } catch (error) {
    if (error instanceof ZodError) {
      if (Object.keys(error.errors).length) {
        for (const [_key, value] of Object.entries(error.errors)) {
          throw new Error((value as { message: string }).message);
        }
      }
    }
    throw error;
  }
};
