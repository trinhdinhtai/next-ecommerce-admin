"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { Button } from "@/components/ui/button"

import "@uploadthing/react/styles.css"

import Image from "next/image"
import { Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { UploadFileResponse } from "uploadthing/client"

interface SingleImageUploadProps {
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string
}

const SingleImageUpload = ({
  onChange,
  onRemove,
  value,
}: SingleImageUploadProps) => {
  const onClientUploadComplete = (res?: UploadFileResponse[]) => {
    const newImageUrl = res?.[0].url || ""
    onChange(newImageUrl)
    toast.success("Image uploaded!")
  }
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value && (
          <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove("")}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={value} />
          </div>
        )}

        {!value && (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={onClientUploadComplete}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`)
            }}
            className="dark: border-gray-700"
          />
        )}
      </div>
    </>
  )
}

export default SingleImageUpload
