import { Separator } from "@/components/ui/separator";

interface PageHeadingProps {
  title: string;
  description?: string;
}

const PageHeading = ({ title, description }: PageHeadingProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-3">{description}</p>
      <Separator />
    </div>
  );
};

export default PageHeading;
