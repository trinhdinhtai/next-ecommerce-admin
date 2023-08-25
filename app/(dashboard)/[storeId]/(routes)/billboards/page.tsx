import BillboardsContent from "@/components/BillboardsContent";
import { prisma } from "@/lib/prismadb";
import { BillboardColumn } from "@/types/columns";
import { format } from "date-fns";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      imageUrl: billboard.imageUrl,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    })
  );

  return <BillboardsContent data={formattedBillboards} />;
};

export default BillboardsPage;
