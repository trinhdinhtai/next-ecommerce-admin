import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { FileWithPreview } from "@/types"
import Cropper, { ReactCropperElement } from "react-cropper"

import "cropperjs/dist/cropper.css"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

interface ImageUploadCardProps {
  index: number
  file: FileWithPreview
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
}

export default function ImageUploadCard({
  index,
  file,
  files,
  setFiles,
}: ImageUploadCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cropData, setCropData] = useState<string | null>(null)
  const cropperRef = useRef<ReactCropperElement>(null)

  const onCrop = useCallback(() => {
    if (!files || !cropperRef.current) return

    const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas()
    setCropData(croppedCanvas.toDataURL())

    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        console.error("Blob creation failed")
        return
      }
      const croppedImage = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      })

      const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
        preview: URL.createObjectURL(croppedImage),
        path: file.name,
      }) satisfies FileWithPreview

      const newFiles = files.map((file, fileIndex) =>
        fileIndex === index ? croppedFileWithPathAndPreview : file
      )
      setFiles(newFiles)
    })
  }, [file.name, file.type, files, index, setFiles])

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        onCrop()
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [onCrop])

  return (
    <div className="relative flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <Image
          src={cropData ?? file.preview}
          alt={file.name}
          className="h-10 w-10 shrink-0 rounded-md object-cover"
          width={40}
          height={40}
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
            {file.name}
          </p>
          <p className="text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file.type.startsWith("image") && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <Icons.crop className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Crop image</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
                Crop image
              </p>
              <div className="mt-8 grid place-items-center space-y-5">
                <Cropper
                  ref={cropperRef}
                  className="h-[450px] w-[450px] object-cover"
                  zoomTo={0.5}
                  initialAspectRatio={1 / 1}
                  preview=".img-preview"
                  src={file.preview}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    aria-label="Crop image"
                    type="button"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      onCrop()
                      setIsOpen(false)
                    }}
                  >
                    <Icons.crop
                      className="mr-2 h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Crop image
                  </Button>
                  <Button
                    aria-label="Reset crop"
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      cropperRef.current?.cropper.reset()
                      setCropData(null)
                    }}
                  >
                    <Icons.reset
                      className="mr-2 h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Reset crop
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => {
            if (!files) return
            setFiles(files.filter((_, cropIndex) => cropIndex !== index))
          }}
        >
          <Icons.cross2 className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  )
}
