import { z } from "zod";

export default function generatePasswordSchema() {
  const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(20, { message: "Password must be maximum 20 characters." })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Please include an upper case character.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Please include a lowercase character.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Please include a number.",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Please include at least one special character",
    });

  return passwordSchema;
}
