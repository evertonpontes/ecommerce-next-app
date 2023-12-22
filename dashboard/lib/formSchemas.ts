import { z } from "zod";

export const employeesFormSchema = z.object({
  name: z
    .string()
    .min(8, {
      message: "Name must be at least 8 characters long.",
    })
    .regex(new RegExp(/^[A-Za-z'\s]+$/), {
      message: "Invalid name format. Please enter a valid name.",
    }),
  gender: z.enum(["female", "male", "other"]),
  image: z.string() || null,
  number: z
    .string()
    .regex(new RegExp(/^[0-9]+$/), {
      message: "Invalid number format. Please enter a valid number.",
    })
    .min(10, {
      message: "Invalid number format. Please enter a valid number.",
    }),
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});