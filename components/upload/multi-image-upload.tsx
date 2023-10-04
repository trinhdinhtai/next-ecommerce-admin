"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { Button } from "@/components/ui/button"

import "@uploadthing/react/styles.css"

import Image from "next/image"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { UploadFileResponse } from "uploadthing/client"

interface MultiImageUploadProps {
  disabled?: boolean
  onChange: (value: { url: string }[]) => void
  onRemove: (value: string) => void
  value: string[]
}

const MultiImageUpload = ({
  onChange,
  onRemove,
  value,
}: MultiImageUploadProps) => {
  const onClientUploadComplete = (res?: UploadFileResponse[]) => {
    const newImageUrls = res?.map((item) => ({ url: item.url })) ?? []
    onChange(newImageUrls)
    toast.success("Image uploaded!")
  }
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
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
            toast.error(`ERROR! ${error.message}`)
          }}
          className="dark: border-gray-700"
        />
      </div>
    </>
  )
}

export default MultiImageUpload
