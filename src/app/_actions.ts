"use server";
import { z } from "zod";
import { Resend } from "resend";
import { ContactFormSchema, FormDataSchema } from "@/lib/schema";
import ContactFormEmail from "@/emails/contact-form-email";

type Inputs = z.infer<typeof ContactFormSchema>;

export async function addEntry(data: Inputs) {
  const result = FormDataSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

type ContactFormInputs = z.infer<typeof ContactFormSchema>;
const resend = new Resend(process.env.RESEND_API_KEY);

/* export const sendEmail = async (data: ContactFormInputs) => {
  const result = ContactFormSchema.safeParse(data);
  console.log(result);
  const { username, email, message } = result.data;
  try {
    const data = await resend.emails.send({
      from: "WDB Portfolio <onboarding@resend.com>",
      to: ["ronyortizop@gmail.com"],
      subject: "Contact form submission",
      text: `Name: ${username}\nEmail: ${email}\nMessage: ${message}`,
    });
    if (result.success) {
      return { success: true, data: data };
    } else if (result.error) {
      return { success: false, error: result.error.format() };
    }
  } catch (error) {
    return { success: false, error: error };
  }
}; */

export const sendEmail = async (formData: ContactFormInputs) => {
  const username = formData.username;
  const email = formData.email;
  const message = formData.message;
  let data;
  try {
    data = await resend.emails.send({
      from: "WDB Portfolio <onboarding@resend.dev>",
      to: "ronyortizop@gmail.com",
      subject: `Email from ${username} sent from WDB Portfolio`,
      reply_to: email as string,
      text: `Name: ${username}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ username, email, message }),
    });
  } catch (err: any) {
    return { error: `Failed to send email. Error: ${err.message}` };
  }
  return data;
};
