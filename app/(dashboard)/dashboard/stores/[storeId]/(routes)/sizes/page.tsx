import SizesTable from "@/components/tables/Sizes";
import { prisma } from "@/lib/prismadb";
import { SizeColumn } from "@/types/columns";
import { format } from "date-fns";

interface ColorsPageProps {
  params: {
    storeId: string;
  };
}

const SizesPage = async ({ params }: ColorsPageProps) => {
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return <SizesTable data={formattedSizes} />;
};

export default SizesPage;
