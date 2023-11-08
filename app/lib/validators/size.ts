import { ZodError, z } from "zod";

const sizePayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
});

export type SizePayload = z.infer<typeof sizePayload>;
export const validateSizePayload = (inputs: SizePayload) => {
  try {
    const isValidData = sizePayload.parse(inputs);
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
