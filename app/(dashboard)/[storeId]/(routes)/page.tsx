import DashboardTabs from "@/components/DashboardTabs";
import DateRangePicker from "@/components/ui/date-range-picker";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <DateRangePicker />
      </div>
      <DashboardTabs />
    </div>
  );
}
