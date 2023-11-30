"use client";

import { FormEvent, useState } from "react";
import { CategoryPayload, categoryPayload } from "../lib/validators/category";
import { useMutation } from "@tanstack/react-query";
import { ZodError, z } from "zod";

const payload = z.object({
  name: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
  email: z
    .string()
    .min(3, { message: "must be more than 3 characters" })
    .max(15, { message: "must be less than 15 charaters" }),
});

type Payload = z.infer<typeof payload>;
const Page = () => {
  const [formData, setFormData] = useState<Payload>({ name: "", email: "" });
  const [errors, setErrors] = useState<Payload>({ name: "", email: "" });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validatedData = payload.safeParse(formData);
    if (!validatedData.success) {
      console.log(validatedData.error.errors);
      validatedData.error.errors.map((error) =>
        setErrors((prev) => ({
          ...prev,
          [error.path[0]]: error.message,
        })),
      );
      return;
    }
    setErrors({ name: "", email: "" });
  };
  console.log(errors);

  return (
    <div className="flex justify-center items-center h-screen w-full text-white">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={formData.name}
            placeholder="name..."
            className="text-black"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          {errors.name && <h1 className="text-red-500">{errors.name}</h1>}
        </div>
        <div>
          <input
            value={formData.email}
            placeholder="email..."
            className="text-black"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          {errors.email && <h1 className="text-red-500">{errors.email}</h1>}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Page;

{
  /*  

  const {
    mutate: add,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const body = await response.json();
        const error = body.message instanceof ZodError;
        console.log(error);
        throw new Error(body);
      }
      return response;
    },
    onError: (error) => {
      throw error;
    },
  });
*/
}