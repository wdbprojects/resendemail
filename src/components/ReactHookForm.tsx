"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FormDataSchema } from "@/lib/schema";
import { sendEmail } from "@/app/_actions";
import { toast } from "sonner";

type Inputs = z.infer<typeof FormDataSchema>;

const ReactHookForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(true);

  const form = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });

  type Inputs = z.infer<typeof FormDataSchema>;

  const onSubmit = async (data: z.infer<typeof FormDataSchema>) => {
    const result: any = await sendEmail(data);

    if (result?.data) {
      toast.success("Email sent successfully!");
      form.reset();
      return;
    } else if (result?.error) {
      toast.error("Something went wrong");
      return;
    }
  };

  useEffect(() => {
    setIsSubmitting(form.formState.isSubmitting);
  }, [form.formState.isSubmitting]);

  return (
    <div className="block w-full max-w-[600px] border mx-auto py-8 px-12 bg-slate-100 rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="only letters"
                      className="bg-white"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email format"
                      className="bg-white"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your message here"
                      className="bg-white"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                form.reset();
              }}
            >
              Reset Form
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReactHookForm;
