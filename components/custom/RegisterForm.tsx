"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {  toast } from 'sonner'
// Define the schema using Zod
const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  referralCode: z.string().min(3), // Referral code is optional
});

export const RegisterForm = () => {
  const router = useRouter(); // For programmatic navigation after success
  const [error, setError] = useState<string | null>(null); // To handle error messages
  const [loading, setLoading] = useState<boolean>(false); // To handle the loading state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      referralCode: '', // Default empty value for referral code
    },
  });

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true); // Set loading state
    setError(null); // Reset error

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          referralCode: values.referralCode, // Send referral code with the registration request
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Something went wrong")
        throw new Error(data.message || "Failed to register");
      }
      toast.success('Your account has been successfully created')

      // If successful, redirect to login or dashboard, depending on your logic
      // router.push("/login");
      form.reset()
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
      setError(err.message || "Something went wrong"); // Set the error message
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <section className="w-72 sm:w-80 md:w-96 my-6">
      <section className="flex flex-col items-start gap-4 mb-5">
        <h3 className="font-bold text-4xl">Hello there 👋</h3>
      </section>

      <h2 className="text-lg text-gray-500  mb-8">
        Create a new account with us today, and start earning money.
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Eg. Johnny" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="At least 6 characters"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referralCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Referral Code </FormLabel>
                <FormControl>
                  <Input placeholder="Enter referral code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-mainColor hover:bg-mainColorOnHover mt-6 mb-3 text-white"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          {/* Login Redirect */}
          <h1 className="text-gray-500 text-center">
            Have an account?
            <Link href={"/login"} className="text-blue-500 ml-4">
              Sign In
            </Link>
          </h1>
        </form>
      </Form>
    </section>
  );
};
