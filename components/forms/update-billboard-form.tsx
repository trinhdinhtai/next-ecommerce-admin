"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { updateBillboardAction } from "@/_actions/billboards"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/error"
import { useUploadThing } from "@/lib/uploadthing"
import { getFileNameFromUrl, isArrayOfFile } from "@/lib/utils"
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

interface BillboardFormProps {
  storeId: string
  billboard: Billboard
}

const UpdateBillboardForm = ({ storeId, billboard }: BillboardFormProps) => {
  const router = useRouter()

  const { isUploading, startUpload } = useUploadThing("imageUploader")

  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  useEffect(() => {
    const file = new File([], getFileNameFromUrl(billboard.imageUrl), {
      type: "image",
    })

    const fileWithPreview = Object.assign(file, {
      preview: billboard.imageUrl,
    })

    setFiles([fileWithPreview])
  }, [billboard])

  const form = useForm<BillboardFormInput>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: billboard.label,
      images: undefined,
    },
  })

  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values: BillboardFormInput) => {
    try {
      if (!files?.length) return

      const currentImages = files
        .filter((image) => !image.size)
        .map((image) => ({
          id: image.name,
          name: image.name,
          url: image.preview,
        }))

      const targetImages = files.filter((image) => image.size)

      const uploadedImages = await startUpload(targetImages).then(
        (imagesResponse) => {
          const formattedImages = imagesResponse?.map((image) => ({
            id: image.key,
            name: image.key.split("_")[1] ?? image.key,
            url: image.url,
          }))
          return formattedImages ?? null
        }
      )

      if (!uploadedImages) {
        toast.error("Image upload failed")
        return
      }

      await updateBillboardAction({
        ...values,
        id: billboard.id,
        storeId: billboard.storeId,
        images: [...currentImages, ...uploadedImages],
      })

      toast.success("Billboard updated successfully.")
      router.push(`/dashboard/stores/${storeId}/billboards`)
    } catch (error) {
      catchError(error)
    }
  }

  return (
    <>
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
                setValue={setValue}
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
            Update Billboard
          </LoadingButton>
        </form>
      </Form>
    </>
  )
}

export default UpdateBillboardForm
