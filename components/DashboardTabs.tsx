"use client"

import { GraphData } from "@/_actions/graph"
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
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics" disabled>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" disabled>
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications" disabled>
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stockCount}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewChart data={graphRevenue} />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
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
