
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

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
import { Eye, EyeOff, Loader2, Lock, Mail, XCircle } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required"),
})

type FormFields = z.infer<typeof formSchema>

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
      redirect: true,
    })
    setIsLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">

      {/* Background glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl"></div>

      <div className="w-full max-w-md">

        <div className="rounded-3xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="space-y-4 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl
              bg-gradient-to-br from-blue-600 to-indigo-600
              text-white shadow-lg">
              <Lock size={28} />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome Back
            </h1>

            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Sign in to continue
            </p>
          </div>

          {/* Form */}
          <div className="px-8 pb-10">

            {searchParams.get("error") && (
              <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                <XCircle className="mt-0.5 h-5 w-5" />
                <span>{searchParams.get("error")}</span>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-500">
                        Email Address
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-4 top-4 size-4 text-slate-400" />
                          <Input
                            placeholder="name@example.com"
                            className="h-12 rounded-xl border-slate-200 bg-white/80 pl-11
                              focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>

                      <div className="flex justify-between">
                        <FormLabel className="text-xs font-semibold text-slate-500">
                          Password
                        </FormLabel>

                        <Link
                          href="/forgot-password"
                          className="text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Forgot?
                        </Link>
                      </div>

                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-4 top-4 size-4 text-slate-400" />

                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-12 rounded-xl border-slate-200 bg-white/80 pl-11 pr-11
                              focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-slate-400 hover:text-blue-600"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-14 w-full rounded-2xl
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    text-lg font-bold tracking-wide
                    shadow-lg transition-all
                    hover:scale-[1.02]
                    active:scale-95"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-5 animate-spin" />
                      Authenticating...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>

              </form>
            </Form>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="ml-1 font-semibold text-blue-600 hover:underline"
              >
                Create one
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
