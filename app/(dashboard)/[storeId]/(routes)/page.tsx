import {
  getRecentSales,
  getSalesCount,
  getStockCount,
  getTotalRevenue,
} from "@/actions/dashboard";
import { getGraphRevenue } from "@/actions/graph";
import DashboardTabs from "@/components/DashboardTabs";
import DateRangePicker from "@/components/ui/date-range-picker";

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
    getRecentSales(params.storeId),
  ]);

  const totalRevenue = response[0];
  const salesCount = response[1];
  const stockCount = response[2];
  const graphRevenue = response[3];
  const recentSales = response[4];

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
      />
    </div>
  );
}
