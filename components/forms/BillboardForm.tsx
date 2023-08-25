"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  billboardSchema,
  categorySchema,
  createStoreSchema,
} from "@/validators";
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
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

type BillboardFormInput = z.infer<typeof billboardSchema>;

interface BillboardFormProps {
  billboard: Billboard | null;
}

const BillboardForm = ({ billboard }: BillboardFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const toastMessage = billboard ? "Billboard updated." : "Billboard created.";
  const action = billboard ? "Save changes" : "Create";

  const form = useForm<BillboardFormInput>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: BillboardFormInput) => {
    try {
      setIsLoading(true);
      if (!billboard) {
        await axios.post(`/api/${params.storeId}/categories`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Billboard label"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
