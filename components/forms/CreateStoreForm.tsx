"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { createStoreSchema } from "@/lib/validations"
import { useCreateStoreModal } from "@/hooks/use-create-store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type CreateStoreFormInput = z.infer<typeof createStoreSchema>

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
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  })

  const onCreateStore = async (values: CreateStoreFormInput) => {
    createStore(values, {
      onSuccess: (data) => {
        router.push(`/${data.store.id}`)
        toast.success("Store created successfully!")
        onClose()
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
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </Form>
  )
}

export default CreateStoreForm
