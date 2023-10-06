"use client"

import { useState, useTransition } from "react"
import { useParams, useRouter } from "next/navigation"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useUploadThing } from "@/lib/uploadthing"
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
import ImageUploadDialog from "@/components/image-upload-dialog"

type BillboardFormInput = z.infer<typeof billboardSchema>

interface BillboardFormProps {
  billboard: Billboard | null
}

const BillboardForm = ({ billboard }: BillboardFormProps) => {
  const params = useParams()
  const router = useRouter()

  const { isUploading, startUpload } = useUploadThing("imageUploader")

  const [isPending, startTransition] = useTransition()

  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
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

  const { control, setValue } = form

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
          <FormItem className="flex w-full flex-col gap-2">
            <FormLabel>Image</FormLabel>
            <FormControl>
              <ImageUploadDialog
                setValue={setValue}
                name="imageUrl"
                maxFiles={3}
                maxSize={1024 * 1024 * 4}
                files={files}
                setFiles={setFiles}
                isUploading={isUploading}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={control}
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
