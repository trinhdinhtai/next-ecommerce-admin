interface PageHeadingProps {
  title: string
  description?: string
}

const PageHeading = ({ title, description }: PageHeadingProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold capitalize tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default PageHeading
