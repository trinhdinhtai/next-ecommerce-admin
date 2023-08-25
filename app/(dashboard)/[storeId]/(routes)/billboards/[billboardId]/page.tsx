import PageHeading from "@/components/PageHeading";
import BillboardForm from "@/components/forms/BillboardForm";
import { prisma } from "@/lib/prismadb";

interface BillboardIdPageProps {
  params: {
    storeId: string;
    billboardId: string;
  };
}

const BillboardIdPage = async ({ params }: BillboardIdPageProps) => {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
      storeId: params.storeId,
    },
  });
  return (
    <>
      <PageHeading
        title={billboard ? billboard.label : "Add Billboard"}
        description={billboard ? "Edit billboard" : "Add a new billboard"}
      />
      <BillboardForm billboard={billboard} />
    </>
  );
};

export default BillboardIdPage;
