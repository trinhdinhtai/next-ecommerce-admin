import { getBillboardsByStoreId } from "@/actions/billboards";
import BillboardsTable from "@/components/tables/Billboards";
import { BillboardColumn } from "@/types/columns";
import { format } from "date-fns";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

const BillboardsPage = async ({ params }: BillboardsPageProps) => {
  const billboards = await getBillboardsByStoreId(params.storeId);

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      imageUrl: billboard.imageUrl,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    })
  );

  return <BillboardsTable data={formattedBillboards} />;
};

export default BillboardsPage;
