import { Column } from "@tanstack/react-table";
import xlsx, { IJsonSheet } from "json-as-xlsx";

interface ExportExcelButtonProps<TData> {
  fileName?: string;
  rowsData: TData[];
  columns: Column<TData, unknown>[];
}

export function downloadToExcel<TData>({
  fileName = "ExportData",
  rowsData,
  columns: tableColumns,
}: ExportExcelButtonProps<TData>) {
  const excelColumns = tableColumns.map((column) => ({
    label: convertToNaturalFieldName(column.id),
    value: column.id,
  }));
  const columns: IJsonSheet[] = [
    {
      sheet: "Sheet 1",
      columns: [{ label: "ID", value: "id" }, ...excelColumns],
      // @ts-ignore
      content: rowsData,
    },
  ];

  const settings = {
    fileName,
  };

  xlsx(columns, settings);
}

function convertToNaturalFieldName(jsonFieldName: string): string {
  const words = jsonFieldName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[_\s]+/);
  const naturalFieldName = words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

  return naturalFieldName;
}
