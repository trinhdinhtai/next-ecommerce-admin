import ColorsTable from "@/components/tables/Colors";
import { prisma } from "@/lib/prismadb";
import { ColorColumn } from "@/types/columns";
import { format } from "date-fns";

interface ColorsPageProps {
  params: {
    storeId: string;
  };
}

const ColorsPage = async ({ params }: ColorsPageProps) => {
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return <ColorsTable data={formattedColors} />;
};

export default ColorsPage;
