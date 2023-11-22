import { ZodError, z } from "zod";

export const categoryPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  parentId: z.string().optional(),
});

export type CategoryPayload = z.infer<typeof categoryPayload>;
export const validateCategoryPayload = (inputs: CategoryPayload) => {
  try {
    const isValidData = categoryPayload.parse(inputs);
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
