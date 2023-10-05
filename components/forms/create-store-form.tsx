"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { storeSchema } from "@/lib/validations/store"
import { useCreateStoreModal } from "@/hooks/use-create-store"
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

type CreateStoreFormInput = z.infer<typeof storeSchema>

const CreateStoreForm = () => {
  const router = useRouter()
  const { onClose } = useCreateStoreModal()
  const { mutate: createStore, isLoading } = useMutation({
    mutationFn: async (values: CreateStoreFormInput) => {
      const response = await axios.post("/api/stores", values)
      return response.data
    },
  })

  const { setIsFirstCreate } = useCreateStoreModal()

  const form = useForm<CreateStoreFormInput>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onCreateStore = async (values: CreateStoreFormInput) => {
    createStore(values, {
      onSuccess: (data) => {
        toast.success("Store created successfully!")
        onClose()
        router.refresh()
        router.push(`/dashboard/stores/${data.store.id}`)
        setIsFirstCreate(data.isFirstStore)
      },
      onError: (error) => {
        console.error(error)
        toast.error("Something went wrong!")
      },
    })
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
