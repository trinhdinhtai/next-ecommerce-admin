"use client"

import { useState } from "react"
import Image from "next/image"
import { addCategoryAction } from "@/_actions/categories"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/error"
import { useUploadThing } from "@/lib/uploadthing"
import { isArrayOfFile } from "@/lib/utils"
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

interface AddCategoryFormProps {
  storeId: string
  billboards: Billboard[]
}

export default function AddCategoryForm({
  storeId,
  billboards,
}: AddCategoryFormProps) {
  const { isUploading, startUpload } = useUploadThing("imageUploader")
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      images: undefined,
      billboardId: "",
    },
  })

  const {
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values: CategoryFormInput) => {
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

      await addCategoryAction({
        ...values,
        images,
        storeId,
      })

      reset()
      setFiles(null)
      toast.success("Category created successfully.")
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
            Create Category
          </LoadingButton>
        </form>
      </Form>
    </>
  )
}
