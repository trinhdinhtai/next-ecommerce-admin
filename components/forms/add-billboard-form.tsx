"use client"

import { useState } from "react"
import Image from "next/image"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/error"
import { useUploadThing } from "@/lib/uploadthing"
import { isArrayOfFile } from "@/lib/utils"
import { billboardSchema } from "@/lib/validations/billboard"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/ui/loading-button"
import ImageUploadDialog from "@/components/image-upload-dialog"
import { ZoomImage } from "@/components/zoom-image"

type BillboardFormInput = z.infer<typeof billboardSchema>

interface AddBillboardFormProps {
  storeId: string
}

export default function AddBillboardForm({ storeId }: AddBillboardFormProps) {
  const { isUploading, startUpload } = useUploadThing("imageUploader")
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  const form = useForm<BillboardFormInput>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: "",
      images: "",
    },
  })

  const {
    control,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values: BillboardFormInput) => {
    try {
      if (!isArrayOfFile(values.images)) return

      const images = await startUpload(values.images).then((imagesResponse) => {
        const formattedImages = imagesResponse?.map((image) => ({
          id: image.key,
          name: image.key.split("_")[1] ?? image.key,
          url: image.url,
        }))
        return formattedImages ?? null
      })

      await axios.post(`/api/${storeId}/billboards`, {
        ...values,
        images,
      })

      reset()
      setFiles(null)
      toast.success("Billboard created successfully.")
    } catch (error) {
      catchError(error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem className="flex w-full flex-col gap-1.5">
            <FormLabel>Image</FormLabel>
            {files?.length ? (
              <div className="flex items-center gap-2">
                {files.map((file) => (
                  <ZoomImage key={file.name}>
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                      width={80}
                      height={80}
                    />
                  </ZoomImage>
                ))}
              </div>
            ) : null}
            <FormControl>
              <ImageUploadDialog
                setValue={form.setValue}
                name="images"
                maxFiles={1}
                maxSize={1024 * 1024 * 4}
                files={files}
                setFiles={setFiles}
                isUploading={isUploading}
                disabled={isSubmitting}
              />
            </FormControl>
            <UncontrolledFormMessage message={errors.images?.message} />
          </FormItem>

          <FormField
            control={control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Billboard label"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton type="submit" isLoading={isSubmitting}>
            Create Billboard
          </LoadingButton>
        </form>
      </Form>
    </>
  )
}
