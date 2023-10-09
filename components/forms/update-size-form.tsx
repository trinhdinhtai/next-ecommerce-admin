"use client"

import { useRouter } from "next/navigation"
import { updateSizeAction } from "@/_actions/sizes"
import { zodResolver } from "@hookform/resolvers/zod"
import { Size } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/error"
import { sizeSchema } from "@/lib/validations"
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

type SizeFormInput = z.infer<typeof sizeSchema>

interface UpdateSizeFormProps {
  storeId: string
  size: Size
}

export default function UpdateSizeForm({ storeId, size }: UpdateSizeFormProps) {
  const router = useRouter()

  const form = useForm<SizeFormInput>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: size.name,
      value: size.value,
    },
  })

  const {
    control,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: SizeFormInput) => {
    try {
      await updateSizeAction({
        ...values,
        id: size.id,
        storeId,
      })

      toast.success("Size updated successfully.")
      router.push(`/dashboard/stores/${storeId}/sizes`)
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
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Size value"
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
