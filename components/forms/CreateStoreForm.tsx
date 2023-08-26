"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createStoreSchema } from "@/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

type CreateStoreFormInput = z.infer<typeof createStoreSchema>;

const CreateStoreForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateStoreFormInput>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: CreateStoreFormInput) => {
    toast.promise(onCreateStore(values), {
      loading: "Creating store...",
      success: "Store created successfully",
      error: "Something went wrong",
    });
  };

  const onCreateStore = async (values: CreateStoreFormInput) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
  );
};

export default CreateStoreForm;
