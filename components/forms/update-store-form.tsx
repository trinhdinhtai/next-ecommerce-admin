"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleDeleteStore = async () => {
    setIsDeleting(true)

    try {
      await axios.delete(`/api/${store.id}`)
      toast.success("Store deleted successfully!")
      router.refresh()
      router.push("/dashboard/stores")
    } catch (error) {
      throw error
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Type store name here."
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Type store description here."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <LoadingButton type="submit" isLoading={isSubmitting}>
              Update store
            </LoadingButton>

            <LoadingButton
              type="submit"
              variant="destructive"
              isLoading={isDeleting}
              onClick={handleDeleteStore}
            >
              Delete store
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  )
}

export default UpdateStoreForm
