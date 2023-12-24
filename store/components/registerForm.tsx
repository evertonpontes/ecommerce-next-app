import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  UploadingDataContext,
  UploadingDataContextType,
} from "@/contexts/uploadingDataContext";
import { useContext, useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import PasswordInput from "./passwordInput";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import Link from "next/link";
import { SpinnerCircle } from "./spinners";
import { cn } from "@/lib/utils";
import { InputFormComponent } from "./inputFormComponent";

import { clientsFormSchema } from "@/lib/formSchemas";
import { dataURLToFormData } from "@/lib/convert";
import { Separator } from "./ui/separator";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const RegisterForm = () => {
  const router = useRouter();
  const { setUploadingData, isUploadingData } =
    useContext<UploadingDataContextType>(UploadingDataContext);
  const { toast } = useToast();

  const [disabledForm, setDisabledForm] = useState(false);

  useEffect(() => {
    if (isUploadingData) {
      setDisabledForm(true);
    } else {
      setDisabledForm(false);
    }
  }, [isUploadingData]);

  const form = useForm<z.infer<typeof clientsFormSchema>>({
    resolver: zodResolver(clientsFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clientsFormSchema>) {
    const data = { ...values };

    setUploadingData(true);
    const responseDB = await fetch("/api/client", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });

    if (responseDB.status !== 201) {
      setTimeout(() => setUploadingData(false), 0);
      toast({
        title: "Uh oh! Something went wrong.",
        description: responseDB.error,
      });
      return;
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return setTimeout(() => router.push("/"), 1000);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pb-4 md:pb-0">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <InputFormComponent placeholder="Your Name" {...field} />
                </FormControl>
                <FormDescription>Enter your fullname</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputFormComponent
                    placeholder="you@example.com"
                    {...field}
                  />
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
          <Button type="submit" disabled={disabledForm}>
            {!disabledForm ? (
              "Create new user"
            ) : (
              <div className="flex gap-2">
                <SpinnerCircle classColor="secondary" size="sm" />
                <p>Loading...</p>
              </div>
            )}
          </Button>
          <Link
            href={"/signin"}
            className={cn(
              "text-primary underline hover:text-primary/80 transition-colors",
              disabledForm &&
                "text-primary/50 hover:text-primary/50 cursor-not-allowed"
            )}
            onClick={disabledForm ? (e) => e.preventDefault() : () => {}}
          >
            Already have an account?
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
  );
};

export default RegisterForm;
