import OrdersTable from "@/components/tables/Orders";
import { formatter } from "@/helpers/utils";
import { prisma } from "@/lib/prismadb";
import { OrderColumn } from "@/types/columns";
import { format } from "date-fns";

interface OrdersPageProps {
  params: {
    storeId: string;
  };
}

const OrdersPage = async ({ params }: OrdersPageProps) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return <OrdersTable data={formattedOrders} />;
};

export default OrdersPage;
