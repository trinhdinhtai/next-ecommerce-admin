import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableLoadingProps {
  columnCount: number
  rowCount?: number
  isNewRowCreatable?: boolean
  isRowsDeletable?: boolean
  searchableFieldCount?: number
  filterableFieldCount?: number
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 5,
  searchableFieldCount = 1,
  filterableFieldCount = 1,
}: DataTableLoadingProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {searchableFieldCount > 0
            ? Array.from({ length: searchableFieldCount }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-[150px] lg:w-[250px]" />
              ))
            : null}
          {filterableFieldCount > 0
            ? Array.from({ length: filterableFieldCount }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-[70px] border-dashed" />
              ))
            : null}
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="min-w-[640px]">
          <TableHeader>
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, rowIndex) => (
                  <TableCell key={rowIndex}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
        <div className="flex-1">
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="hidden h-8 w-8 lg:block" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="hidden h-8 w-8 lg:block" />
          </div>
        </div>
      </div>
    </div>
  )
}
