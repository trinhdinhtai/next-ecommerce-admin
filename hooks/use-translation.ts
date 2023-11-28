import { useRouter } from "next/router"

export const useTranslation = () => {
  const { locale } = useRouter()

  return { locale }
}
