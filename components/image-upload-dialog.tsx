import { useCallback, useEffect } from "react"
import { FileWithPreview } from "@/types"
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone"
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form"
import { toast } from "sonner"

import { cn, formatBytes } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import ImageUploadCard from "@/components/cards/image-upload-card"
import { Icons } from "@/components/icons"

interface ImageUploadDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName
  setValue: UseFormSetValue<TFieldValues>
  accept?: Accept
  maxSize?: number
  maxFiles?: number
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  isUploading?: boolean
  disabled?: boolean
}

export default function ImageUploadDialog<TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: ImageUploadDialogProps<TFieldValues>) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
        setFiles((prev) => [...(prev ?? []), fileWithPreview])
      })

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast.error(
              `File is too large. Max size is ${formatBytes(maxSize)}`
            )
            return
          }
          errors[0]?.message && toast.error(errors[0].message)
        })
      }
    },

    [maxSize, setFiles]
  )

  // Register files to react-hook-form
  useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  })

  // Revoke preview url when component unmounts
  useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getContent = () => {
    if (isUploading)
      return (
        <div className="group grid w-full place-items-center gap-1 sm:px-10">
          <Icons.upload
            className="h-9 w-9 animate-pulse text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      )

    if (isDragActive)
      return (
        <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
          <Icons.upload
            className={cn("h-8 w-8", isDragActive && "animate-bounce")}
            aria-hidden="true"
          />
          <p className="text-base font-medium">Drop the file here</p>
        </div>
      )

    return (
      <div className="grid place-items-center gap-1 sm:px-5">
        <Icons.upload
          className="h-8 w-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-2 text-base font-medium text-muted-foreground">
          Drag & drop file here, or click to select file
        </p>
        <p className="text-sm text-slate-500">
          Please upload file with size less than {formatBytes(maxSize)}
        </p>
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          Upload Images
          <span className="sr-only">Upload Images</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
          Upload your images
        </p>

        <div
          {...getRootProps()}
          className={cn(
            "group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isDragActive && "border-muted-foreground/50",
            disabled && "pointer-events-none opacity-60",
            className
          )}
          {...props}
        >
          <input {...getInputProps()} />
          {getContent()}
        </div>

        {maxFiles > 1 && (
          <p className="text-center text-sm font-medium text-muted-foreground">
            You can upload up to {maxFiles} files
          </p>
        )}

        {files?.length ? (
          <>
            <div className="grid gap-5">
              {files?.map((file, index) => (
                <ImageUploadCard
                  key={file.path}
                  index={index}
                  files={files}
                  setFiles={setFiles}
                  file={file}
                />
              ))}
            </div>

            {maxFiles > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="mt-2.5 w-full"
                onClick={() => setFiles(null)}
              >
                <Icons.trash className="mr-2 h-4 w-4" aria-hidden="true" />
                Remove All
                <span className="sr-only">Remove all</span>
              </Button>
            )}
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
