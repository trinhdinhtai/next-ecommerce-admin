"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sizeSchema } from "@/validators";
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
import { Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

type SizeFormInput = z.infer<typeof sizeSchema>;

interface SizeFormProps {
  size: Size | null;
}

const SizeForm = ({ size }: SizeFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const loadingMessage = size ? "Updating size ..." : "Creating size ...";
  const toastMessage = size ? "Size updated." : "Size created.";
  const action = size ? "Save changes" : "Create";

  const form = useForm<SizeFormInput>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: size?.name || "",
      value: size?.value || "",
    },
  });

  const onSubmit = async (values: SizeFormInput) => {
    toast.promise(onCreateSize(values), {
      loading: loadingMessage,
      success: toastMessage,
      error: "Something went wrong",
    });
  };

  const onCreateSize = async (values: SizeFormInput) => {
    try {
      setIsLoading(true);
      if (!size) {
        await axios.post(`/api/${params.storeId}/sizes`, values);
      } else {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          values
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
