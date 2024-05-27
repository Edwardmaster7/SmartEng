import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import mdata from "./data.json";
import { useMemo } from "react";
import Container from "../Container";
import { ButtonComponent } from "../ButtonComponent";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import React, { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon"; // Import Luxon

export function BasicTable() {
  const data = useMemo(() => mdata, []);

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [containerHeight, setContainerHeight] = useState("auto");
  const containerRef = useRef(null); // Ref to access the container DOM element

  useEffect(
    () => {
      if (containerRef.current) {
        // Calculate the height based on the content
        const contentHeight = containerRef.current.scrollHeight;
        setContainerHeight(`${contentHeight}px`);
      }
    },
    [
      /* dependencies that might change the content's height */
    ],
  );

  return (
    <Container className="mx-auto contain-content">
      <Container
        ref={containerRef}
        className="mx-auto overflow-auto p-0 shadow-none"
        style={{ height: containerHeight }}
      >
        <table className="">
          <thead className="mx-auto justify-center rounded-t-lg bg-indigo-600 p-2 text-white text-sm"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="">
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
      <div className="bottom-0 left-0 right-0 inline-flex w-full justify-between rounded-b bg-indigo-600">
        <ButtonComponent
          disabled={!table.getCanPreviousPage()}
          className="text-sm bg-indigo-500 px-1.5 py-1.5 font-normal disabled:invisible"
          onClick={() => table.setPageIndex(0)}
        >
          First page
        </ButtonComponent>
        <div className="flex gap-2">
          <ButtonComponent
            disabled={!table.getCanPreviousPage()}
            className="bg-indigo-500 px-1.5 text-xl font-normal disabled:hidden"
            onClick={() => table.previousPage()}
          >
            <HiChevronLeft />
          </ButtonComponent>
          <ButtonComponent
            disabled={!table.getCanNextPage()}
            className="bg-indigo-500 px-1.5 text-xl font-normal disabled:hidden"
            onClick={() => table.nextPage()}
          >
            <HiChevronRight />
          </ButtonComponent>
        </div>

        <ButtonComponent
          disabled={!table.getCanNextPage()}
          className="text-sm bg-indigo-500 px-1.5 py-1.5 font-normal disabled:invisible"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </ButtonComponent>
      </div>
    </Container>
  );
}
