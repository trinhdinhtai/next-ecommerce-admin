"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { catchClerkError } from "@/lib/error"
import { resetPasswordSchema } from "@/lib/validations/auth"
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
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/input/password-input"

type FormInput = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordStep2Form() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      code: "",
    },
  })

  function onSubmit(data: FormInput) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const attemptFirstFactor = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: data.code,
          password: data.password,
        })

        if (attemptFirstFactor.status === "needs_second_factor") {
          // TODO: implement 2FA (requires clerk pro plan)
        } else if (attemptFirstFactor.status === "complete") {
          await setActive({
            session: attemptFirstFactor.createdSessionId,
          })
          router.push(`${window.location.origin}/`)
          toast.success("Password reset successfully.")
        } else {
          console.error(attemptFirstFactor)
        }
      } catch (err) {
        catchClerkError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="261002"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <Icons.Loading className="mr-2" aria-hidden="true" />}
          Reset password
          <span className="sr-only">Reset password</span>
        </Button>
      </form>
    </Form>
  )
}
