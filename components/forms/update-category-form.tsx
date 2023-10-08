"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { updateCategoryAction } from "@/_actions/categories"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Category } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/error"
import { useUploadThing } from "@/lib/uploadthing"
import { getFileNameFromUrl } from "@/lib/utils"
import { categorySchema } from "@/lib/validations/category"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import LoadingButton from "@/components/ui/loading-button"
import ImageUploadDialog from "@/components/image-upload-dialog"
import { ZoomImage } from "@/components/zoom-image"

import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type CategoryFormInput = z.infer<typeof categorySchema>

interface UpdateCategoryFormProps {
  storeId: string
  category: Category
  billboards: Billboard[]
}

export default function UpdateCategoryForm({
  storeId,
  category,
  billboards,
}: UpdateCategoryFormProps) {
  const router = useRouter()

  const { isUploading, startUpload } = useUploadThing("imageUploader")
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  useEffect(() => {
    const file = new File([], getFileNameFromUrl(category.imageUrl), {
      type: "image",
    })

    const fileWithPreview = Object.assign(file, {
      preview: category.imageUrl,
    })

    setFiles([fileWithPreview])
  }, [category])

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      images: undefined,
      billboardId: category.billboardId ?? undefined,
    },
  })

  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values: CategoryFormInput) => {
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

      await updateCategoryAction({
        ...values,
        id: category.id,
        images: [...currentImages, ...uploadedImages],
        storeId,
      })

      toast.success("Category updated successfully.")
      router.push(`/dashboard/stores/${storeId}/categories`)
    } catch (error) {
      toast.error(catchError(error))
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
                      className="aspect-square w-40 shrink-0 rounded-md object-cover object-center"
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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <LoadingButton type="submit" isLoading={isSubmitting}>
            Update Category
          </LoadingButton>
        </form>
      </Form>
    </>
  )
}
