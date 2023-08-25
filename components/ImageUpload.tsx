import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { UploadFileResponse } from "uploadthing/client";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: { url: string }[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const onClientUploadComplete = (res?: UploadFileResponse[]) => {
    const newImageUrls = res?.map((item) => ({ url: item.url })) ?? [];
    onChange(newImageUrls);
    toast.success("Image uploaded!");
  };
  return (
    <>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={onClientUploadComplete}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
          className="border-dashed py-4 w-[200px] h-[200px] border-2"
          appearance={{
            button({ isUploading }) {
              return isUploading
                ? "display:none"
                : "bg-primary text-secondary text-sm";
            },
          }}
        />
      </div>
    </>
  );
};

export default ImageUpload;
