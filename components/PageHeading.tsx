interface PageHeadingProps {
  tittle: string;
}

const PageHeading = ({ tittle }: PageHeadingProps) => {
  return <p className="text-2xl font-semibold">{tittle}</p>;
};

export default PageHeading;
