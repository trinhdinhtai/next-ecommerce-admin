"use client"

import { useState } from "react"
import Image from "next/image"
import { addBillboardAction } from "@/_actions/billboards"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/error"
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
import { OurFileRouter } from "@/app/api/uploadthing/core"

type BillboardFormInput = z.infer<typeof billboardSchema>

interface AddBillboardFormProps {
  storeId: string
}

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export default function AddBillboardForm({ storeId }: AddBillboardFormProps) {
  const { isUploading, startUpload } = useUploadThing("imageUploader")
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  const form = useForm<BillboardFormInput>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: "",
      images: undefined,
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
      console.log("file: add-billboard-form.tsx:66 ~ images ~ images:", images)

      // await addBillboardAction({
      //   ...values,
      //   images,
      //   storeId,
      // })

      reset()
      setFiles(null)
      toast.success("Billboard created successfully.")
    } catch (error) {
      toast.error(catchError(error))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem className="flex flex-col gap-1.5">
          <FormLabel>Image</FormLabel>
          {files?.length ? (
            <div className="flex items-center gap-2">
              {files.map((file) => (
                <ZoomImage key={file.name}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="aspect-[24/9] w-60 shrink-0 rounded-md object-cover object-center"
                    width={240}
                    height={90}
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
  )
}
