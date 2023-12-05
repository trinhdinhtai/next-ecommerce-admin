"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { StoreFormValues, storeSchema } from "@/lib/validations/store"
import { useAction } from "@/hooks/use-action"
import { createStore } from "@/app/_actions/stores/create-store"

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
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const { execute, isLoading } = useAction(createStore, {
    onSuccess: ({ name }) => {
      form.reset()
      toast.success(`Store ${name} created successfully.`)
      router.push("/dashboard/stores")
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = async (values: UpdateStoreFormInput) => {
    execute(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Type store name here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Type store description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" isLoading={isLoading}>
          Create Store
        </LoadingButton>
      </form>
    </Form>
  )
}

export default AddStoreForm
