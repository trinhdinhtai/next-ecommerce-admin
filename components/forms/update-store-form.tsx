"use client"

import { useRouter } from "next/navigation"
import { useScopedI18n } from "@/i18n/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { storeSchema } from "@/lib/validations/store"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import LoadingButton from "../ui/loading-button"
import { Textarea } from "../ui/textarea"

type UpdateStoreFormInput = z.infer<typeof storeSchema>

interface UpdateStoreFormProps {
  store: Store
}

const UpdateStoreForm = ({ store }: UpdateStoreFormProps) => {
  const formScope = useScopedI18n("form")
  const buttonScope = useScopedI18n("button")
  const router = useRouter()

  const form = useForm<UpdateStoreFormInput>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store.name,
      description: store.description,
    },
  })

  const {
    control,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: UpdateStoreFormInput) => {
    try {
      await axios.patch(`/api/${store.id}`, values)
      toast.success("Store updated successfully!")
      router.refresh()
    } catch (error) {
      throw error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formScope("label.name")}</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder={formScope("placeholder.storeName")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formScope("label.description")}</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder={formScope("placeholder.storeDescription")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <LoadingButton type="submit" isLoading={isSubmitting}>
            {buttonScope("updateStore")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}

export default UpdateStoreForm
