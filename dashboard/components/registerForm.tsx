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
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ImageEditor from "./imageEditor";
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

import { employeesFormSchema } from "@/lib/formSchemas";
import { dataURLToFormData } from "@/lib/convert";

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

  const form = useForm<z.infer<typeof employeesFormSchema>>({
    resolver: zodResolver(employeesFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      number: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof employeesFormSchema>) {
    const croppedImage = values.image;

    if (!croppedImage) {
      const data = { ...values };

      setUploadingData(true);
      const responseDB = await fetch("/api/employee", {
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

    setUploadingData(true);

    const data = { ...values };

    data.image = "";

    const responseDB = await fetch("/api/employee", {
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

    const formData = await dataURLToFormData(croppedImage);

    const responseFile = await fetch(
      `/api/files?key=employees&name=${values.name}&cat=profile/picture`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    const employee = responseDB.body;

    await fetch(`/api/employee?id=${employee.id}`, {
      method: "PUT",
      body: JSON.stringify({ image: responseFile.downloadURL }),
    }).then((res) => {
      return res.json();
    });

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setTimeout(() => router.push("/"), 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pb-4 md:flex items-center gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageEditor field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
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
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      disabled={disabledForm}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select your gender</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number</FormLabel>
                <FormControl>
                  <InputFormComponent placeholder="1234567890" {...field} />
                </FormControl>
                <FormDescription>Enter your number</FormDescription>
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
      </form>
    </Form>
  );
};

export default RegisterForm;
