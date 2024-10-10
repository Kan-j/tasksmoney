"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const LoginForm = () => {
  // State to manage loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/"
      });

    } catch (err) {
      // Catch any unexpected errors and display a generic error message
      setError("An error occurred while trying to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-72 sm:w-80 md:w-96">
      <section className="flex flex-col items-start gap-4 mb-5">
        <h3 className="font-bold text-4xl">Welcome Back 👋</h3>
      </section>

      <h2 className="text-lg text-gray-500 mb-8">
        Today is a new day. It's your day. You shape it. 
        Sign in to start earning money.
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}

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
                  <Input placeholder="At least 6 characters" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-700 mt-6 mb-3 text-white"
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <h1 className="text-gray-500 text-center">
            Don't have an account?
            <Link href={'/register'} className="text-blue-500 ml-4">Sign Up</Link>
          </h1>
        </form>
      </Form>
    </section>
  )
}
