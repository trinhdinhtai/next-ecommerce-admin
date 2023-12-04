interface LocaleFlagProps {
  locale: string
}

export default function LocaleFlag({ locale }: LocaleFlagProps) {
  switch (locale) {
    case "en":
      return <span className="fi fi-gb mr-2" />
    case "vi":
      return <span className="fi fi-vn mr-2" />
    case "ja":
      return <span className="fi fi-jp mr-2" />
    default:
      return null
  }
}
