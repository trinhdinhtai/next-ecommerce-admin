"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { billboardSchema } from "@/lib/validations"
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

import SingleImageUpload from "../upload/single-image-upload"

type BillboardFormInput = z.infer<typeof billboardSchema>

interface BillboardFormProps {
  billboard: Billboard | null
}

const BillboardForm = ({ billboard }: BillboardFormProps) => {
  const params = useParams()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const loadingMessage = billboard
    ? "Updating billboard ..."
    : "Creating billboard ..."
  const toastMessage = billboard ? "Billboard updated." : "Billboard created."
  const action = billboard ? "Save changes" : "Create"

  const form = useForm<BillboardFormInput>({
    resolver: zodResolver(billboardSchema),
    defaultValues: billboard ?? {
      label: "",
      imageUrl: "",
    },
  })

  const onSubmit = async (values: BillboardFormInput) => {
    toast.promise(onCreateBillboard(values), {
      loading: loadingMessage,
      success: toastMessage,
      error: "Something went wrong",
    })
  }

  const onCreateBillboard = async (values: BillboardFormInput) => {
    try {
      setIsLoading(true)

      if (!billboard) {
        await axios.post(`/api/${params.storeId}/billboards`, values)
      } else {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          values
        )
      }
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <SingleImageUpload
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    onRemove={(newValue) => field.onChange(newValue)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Billboard label"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default BillboardForm
