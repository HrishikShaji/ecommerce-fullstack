import { ZodError, z } from "zod";

export const billboardPayload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  image: z.string().array(),
});

export type BillboardPayload = z.infer<typeof billboardPayload>;
export const validateBillboardPayload = (inputs: BillboardPayload) => {
  try {
    const isValidData = billboardPayload.parse(inputs);
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
