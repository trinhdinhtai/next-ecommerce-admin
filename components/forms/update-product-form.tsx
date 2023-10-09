"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { updateProductAction } from "@/_actions/products"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Color, Product, Size } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/error"
import { useUploadThing } from "@/lib/uploadthing"
import { getFileNameFromUrl } from "@/lib/utils"
import { productSchema } from "@/lib/validations/product"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ImageUploadDialog from "@/components/image-upload-dialog"
import { ZoomImage } from "@/components/zoom-image"

import LoadingButton from "../ui/loading-button"

export type ProductFormInput = z.infer<typeof productSchema>

interface UpdateProductFormProps {
  storeId: string
  product: Product & {
    images?: {
      url: string
    }[]
  }
  categories: Category[]
  colors: Color[]
  sizes: Size[]
}

export default function UpdateProductForm({
  storeId,
  product,
  categories,
  colors,
  sizes,
}: UpdateProductFormProps) {
  const router = useRouter()
  const { isUploading, startUpload } = useUploadThing("imageUploader")
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  useEffect(() => {
    if (product?.images?.length) {
      setFiles(
        product.images.map((image) => {
          const file = new File([], getFileNameFromUrl(image.url), {
            type: "image",
          })
          const fileWithPreview = Object.assign(file, {
            preview: image.url,
          })

          return fileWithPreview
        })
      )
    }
  }, [product])

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...product,
      price: parseFloat(String(product?.price)),
    },
  })

  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values: ProductFormInput) => {
    try {
      let productImages = null
      if (files?.length) {
        const currentImages = files
          .filter((image) => !image.size)
          .map((image) => ({
            id: image.name,
            name: image.name,
            url: image.preview,
          }))

        const targetImages = files?.filter((image) => image.size)

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

        productImages = [...currentImages, ...uploadedImages]
      }

      await updateProductAction({
        ...values,
        id: product.id,
        storeId,
        images: productImages,
      })

      toast.success("Product updated successfully.")
      router.push(`/dashboard/stores/${storeId}/products`)
    } catch (error) {
      toast.error(catchError(error))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
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
              setValue={setValue}
              name="images"
              maxFiles={4}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isSubmitting}
            />
          </FormControl>
          <UncontrolledFormMessage message={errors.images?.message} />
        </FormItem>

        <div className="gap-8 md:grid md:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Product name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    placeholder="9.99"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Inventory</FormLabel>
            <FormControl>
              <Input
                type="number"
                disabled={isSubmitting}
                placeholder="Type product inventory here."
                {...form.register("inventory", {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
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
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="gap-8 md:grid md:grid-cols-2">
          <FormField
            control={control}
            name="colorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
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
                        placeholder="Select a color"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
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
                        placeholder="Select a size"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size.id} value={size.id}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="isArchived"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>
                    This product will not appear anywhere in the store.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <LoadingButton type="submit" isLoading={isSubmitting}>
          Update Product
        </LoadingButton>
      </form>
    </Form>
  )
}
