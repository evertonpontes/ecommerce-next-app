import { z } from "zod";

export const clientsFormSchema = z.object({
  name: z
    .string()
    .min(8, {
      message: "Name must be at least 8 characters long.",
    })
    .regex(new RegExp(/^[A-Za-z'\s]+$/), {
      message: "Invalid name format. Please enter a valid name.",
    }),
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});