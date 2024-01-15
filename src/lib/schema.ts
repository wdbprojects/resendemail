import { z } from "zod";

export const FormDataSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email must be in the right format" }),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .min(6, { message: "Message must be at least 6 characters long" }),
});

export const ContactFormSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email must be in the right format" }),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .min(4, { message: "Message must be at least 4 characters long" }),
});
