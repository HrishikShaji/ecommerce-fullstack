import { ZodError, z } from "zod";

export const colorPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  hexCode: z.string().optional(),
});

export type ColorPayload = z.infer<typeof colorPayload>;
export const validateColorPayload = (inputs: ColorPayload) => {
  try {
    const isValidData = colorPayload.parse(inputs);
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
