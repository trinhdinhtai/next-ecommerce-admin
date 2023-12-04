"use client"

import { GraphData } from "@/_actions/graph"
import { useScopedI18n } from "@/i18n/client"
import { CreditCard, DollarSign, Package } from "lucide-react"

import { OrderColumn } from "@/types/columns"

import { OverviewChart } from "./charts/OverviewChart"
import RecentOrders from "./RecentOrders"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface DashboardTabsProps {
  totalRevenue: number
  salesCount: number
  stockCount: number
  graphRevenue: GraphData[]
  recentOrders: OrderColumn[]
}

const DashboardTabs = ({
  totalRevenue,
  salesCount,
  stockCount,
  graphRevenue,
  recentOrders,
}: DashboardTabsProps) => {
  const dashboardTabScope = useScopedI18n("dashboard.tabs")

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">
          {dashboardTabScope("overview.title")}
        </TabsTrigger>
        <TabsTrigger value="analytics" disabled>
          {dashboardTabScope("analytics")}
        </TabsTrigger>
        <TabsTrigger value="reports" disabled>
          {dashboardTabScope("reports")}
        </TabsTrigger>
        <TabsTrigger value="notifications" disabled>
          {dashboardTabScope("notifications")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {dashboardTabScope("overview.totalRevenue")}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardTabScope("overview.growRateByMonth", {
                  rate: "+20.1%",
                })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {dashboardTabScope("overview.sales")}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardTabScope("overview.growRateByMonth", {
                  rate: "+20.1%",
                })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {dashboardTabScope("overview.productInStock")}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stockCount}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardTabScope("overview.growRateByHour", {
                  rate: "201%",
                })}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>{dashboardTabScope("overview.title")}</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewChart data={graphRevenue} />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>
                {dashboardTabScope("overview.recentOrders.title")}
              </CardTitle>
              <CardDescription>
                {dashboardTabScope("overview.recentOrders.description", {
                  salesCount: 265,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrders recentOrders={recentOrders} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default DashboardTabs
