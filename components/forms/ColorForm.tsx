"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { colorSchema } from "@/validators";
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
import { Color } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

type ColorFormInput = z.infer<typeof colorSchema>;

interface ColorFormProps {
  color: Color | null;
}

const ColorForm = ({ color }: ColorFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const loadingMessage = color ? "Updating color ..." : "Creating color ...";
  const toastMessage = color ? "Color updated." : "Color created.";
  const action = color ? "Save changes" : "Create";

  const form = useForm<ColorFormInput>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: color?.name || "",
      value: color?.value || "",
    },
  });

  const onSubmit = async (values: ColorFormInput) => {
    toast.promise(onCreateColor(values), {
      loading: loadingMessage,
      success: toastMessage,
      error: "Something went wrong",
    });
  };

  const onCreateColor = async (values: ColorFormInput) => {
    try {
      setIsLoading(true);
      if (!color) {
        await axios.post(`/api/${params.storeId}/colors`, values);
      } else {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          values
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
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
                      placeholder="Color name"
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
                  <FormLabel>Color code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Color hex code"
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

export default ColorForm;