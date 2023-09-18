import {
  getRecentOrders,
  getSalesCount,
  getStockCount,
  getTotalRevenue,
} from "@/actions/dashboard";
import { getGraphRevenue } from "@/actions/graph";
import DashboardTabs from "@/components/DashboardTabs";
import DateRangePicker from "@/components/ui/date-range-picker";
import { formatter } from "@/helpers/utils";
import { OrderColumn } from "@/types/columns";
import { format } from "date-fns";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const response = await Promise.all([
    getTotalRevenue(params.storeId),
    getSalesCount(params.storeId),
    getStockCount(params.storeId),
    getGraphRevenue(params.storeId),
    getRecentOrders(params.storeId),
  ]);

  const totalRevenue = response[0];
  const salesCount = response[1];
  const stockCount = response[2];
  const graphRevenue = response[3];
  const orderResponse = response[4];

  const recentOrders: OrderColumn[] = orderResponse.map((order) => ({
    id: order.id,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    customerName: order.customer?.name || "",
    phone: order.customer?.phone || "",
    address: order.customer?.address || "",
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <DateRangePicker />
      </div>
      <DashboardTabs
        totalRevenue={totalRevenue}
        salesCount={salesCount}
        stockCount={stockCount}
        graphRevenue={graphRevenue}
        recentOrders={recentOrders}
      />
    </div>
  );
}
