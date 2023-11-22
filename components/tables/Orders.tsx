"use client"

import { OrderColumn } from "@/types/columns"
import DataTable from "@/components/ui/data-table"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"

import { orderColumns } from "./columnDef/order"

interface OrderTableProps {
  data: OrderColumn[]
}

const OrdersTable = ({ data }: OrderTableProps) => {
  return (
    <Shell>
      <PageHeading title="Orders" description="Manage orders for your store" />
      <DataTable columns={orderColumns} data={data} />
    </Shell>
  )
}

export default OrdersTable
