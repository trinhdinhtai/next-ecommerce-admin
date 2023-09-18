"use client";

import PageHeading from "@/components/PageHeading";
import DataTable from "@/components/ui/data-table";
import { OrderColumn } from "@/types/columns";
import { orderColumns } from "./columnDef/order";

interface OrderTableProps {
  data: OrderColumn[];
}

const OrdersTable = ({ data }: OrderTableProps) => {
  return (
    <div>
      <PageHeading title="Sizes" description="Manage sizes for your store" />
      <DataTable columns={orderColumns} data={data} searchKey="products" />
    </div>
  );
};

export default OrdersTable;
