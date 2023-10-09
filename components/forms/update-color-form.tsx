"use client"

import { useRouter } from "next/navigation"
import { updateColorAction } from "@/_actions/colors"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/error"
import { colorSchema } from "@/lib/validations"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/ui/loading-button"

type SizeFormInput = z.infer<typeof colorSchema>

interface UUpdateColorFormProps {
  storeId: string
  color: Color
}

export default function UpdateColorForm({
  storeId,
  color,
}: UUpdateColorFormProps) {
  const router = useRouter()

  const form = useForm<SizeFormInput>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: color.name,
      value: color.value,
    },
  })

  const {
    control,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: SizeFormInput) => {
    try {
      await updateColorAction({
        ...values,
        id: color.id,
        storeId,
      })

      toast.success("Color updated successfully.")
      router.push(`/dashboard/stores/${storeId}/colors`)
    } catch (error) {
      toast.error(catchError(error))
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-10">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Hex color"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <LoadingButton type="submit" isLoading={isSubmitting}>
            Update Size
          </LoadingButton>
        </form>
      </Form>
    </>
  )
}
