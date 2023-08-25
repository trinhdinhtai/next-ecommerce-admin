"use client";

import { ChangeEvent, useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { billboardSchema } from "@/validators";
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
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/helpers/utils";
import Image from "next/image";

type BillboardFormInput = z.infer<typeof billboardSchema>;

interface BillboardFormProps {
  billboard: Billboard | null;
}

const BillboardForm = ({ billboard }: BillboardFormProps) => {
  const params = useParams();
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const toastMessage = billboard ? "Billboard updated." : "Billboard created.";
  const action = billboard ? "Save changes" : "Create";

  const form = useForm<BillboardFormInput>({
    resolver: zodResolver(billboardSchema),
    defaultValues: billboard ?? {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: BillboardFormInput) => {
    try {
      setIsLoading(true);

      // Upload image
      const blob = values.imageUrl;

      const hasImageChanged = isBase64Image(blob);

      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes?.[0]?.url) {
          values.imageUrl = imgRes[0].url;
        }
      }

      if (!billboard) {
        await axios.post(`/api/${params.storeId}/billboards`, values);
      } else {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          values
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() ?? "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  {billboard ? (
                    <div className="w-1/2 aspect-[21/9] relative rounded-xl">
                      <Image
                        fill
                        src={billboard.imageUrl}
                        alt="Billboard image"
                        className="object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Add billboard image"
                      disabled={isLoading}
                      className="file:text-blue-500"
                      onChange={(e) => handleImageChange(e, field.onChange)}
                    />
                  )}
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
