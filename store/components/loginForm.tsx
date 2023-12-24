"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PasswordInput from "@/components/passwordInput";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res);
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOAuth(provider: string) {
    try {
      const res = await signIn(provider, {
        callbackUrl: "/".replace("#_=_", ""),
      });

      if (res?.error) {
        console.log(res);
        toast({
          title: "Uh oh! Something went wrong.",
          description: res.error,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Enter your email address</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput field={field} />
                    </FormControl>
                    <FormDescription>Enter your password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Button type="submit">Login</Button>
              <Link
                href={"/signup"}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Don&apos;t have an account?
              </Link>
            </div>
            <div className="p-4">
              <Separator className="mb-4" />
              <div className="flex flex-col text-center gap-2">
                <span>or</span>
                <Button
                  type="button"
                  className="flex gap-2"
                  onClick={() => handleOAuth("google")}
                >
                  <FaGoogle size="1.2rem" />
                  <span className="font-bold">Google</span>
                </Button>
                <Button
                  type="button"
                  className="flex gap-2"
                  onClick={() => handleOAuth("facebook")}
                >
                  <FaFacebook size="1.2rem" />
                  <span className="font-bold">Facebook</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
