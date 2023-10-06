import { FileWithPreview } from "@/types"

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
  return <div>ImageUploadCard</div>
}
