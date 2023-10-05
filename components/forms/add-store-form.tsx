"use client"

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

const AddStoreForm = () => {
  const router = useRouter()

  const form = useForm<UpdateStoreFormInput>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const {
    control,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: UpdateStoreFormInput) => {
    try {
      await axios.post(`/api/stores`, values)
      reset()
      toast.success("Store added successfully!")
      router.push("/dashboard/stores")
      router.refresh()
    } catch (error) {
      throw error
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

          <LoadingButton type="submit" isLoading={isSubmitting}>
            Create Store
          </LoadingButton>
        </form>
      </Form>
    </>
  )
}

export default AddStoreForm
