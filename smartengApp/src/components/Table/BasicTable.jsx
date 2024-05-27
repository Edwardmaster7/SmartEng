import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import mdata from "./data.json";
import { useMemo } from "react";
import { Container } from "../Container";

export function BasicTable() {
    
    const data = useMemo(() => mdata, [])

    /**@type {import("@tanstack/react-table").ColumnDef<any>} */
    const columns = [
      {
        header: "Item",
        accessorKey: "Item",
      },
      {
        header: "Base",
        accessorKey: "Base",
      },
      {
        header: "Código",
        accessorKey: "Código",
      },
      {
        header: "Descrição",
        accessorKey: "Descrição",
      },
      {
        header: "Unidade",
        accessorKey: "Unidade",
      },
      {
        header: "Qtd.",
        accessorKey: "Qtd",
      },
      {
        header: "VU - Material",
        accessorKey: "VU-Material",
      },
      {
        header: "VU - M.O",
        accessorKey: "VU-MO",
      },
      {
        header: "Total",
        accessorKey: "Total",
      },
    ];

    const table = useReactTable( {
        data, columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
      <Container className="col-span-4 row-span-8 mx-auto gap-1 overflow-auto p-6">
        <table className="table-auto border border-slate-400 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-slate-300">
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border border-slate-300">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
}