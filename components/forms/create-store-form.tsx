"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { storeSchema } from "@/lib/validations/store"
import { useAction } from "@/hooks/use-action"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"
import { createStore } from "@/app/_actions/stores/create-store"

type CreateStoreFormInput = z.infer<typeof storeSchema>

const CreateStoreForm = () => {
  const { execute, isLoading } = useAction(createStore, {
    onSuccess: () => {
      toast.success("Store created")
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const form = useForm<CreateStoreFormInput>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onCreateStore = async (values: CreateStoreFormInput) => {
    execute(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateStore)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store name</FormLabel>
              <FormControl>
                <Input placeholder="GM Store" {...field} />
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
          Create store
        </LoadingButton>
      </form>
    </Form>
  )
}

export default CreateStoreForm
