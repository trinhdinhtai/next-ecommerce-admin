import PageHeading from "@/components/PageHeading";
import SizeForm from "@/components/forms/SideForm";
import { prisma } from "@/lib/prismadb";

interface SizeIdPageProps {
  params: {
    sizeId: string;
  };
}

const SizeIdPage = async ({ params }: SizeIdPageProps) => {
  const size = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <>
      <PageHeading
        title={size ? size.name : "Add Size"}
        description={size ? "Edit category" : "Add a new size"}
      />
      <SizeForm size={size} />
    </>
  );
};

export default SizeIdPage;
