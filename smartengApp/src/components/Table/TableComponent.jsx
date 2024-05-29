import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineSearchCircle,
  HiSave,
  HiPlusCircle,
  HiXCircle,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";

import Container from "../Container";
import { ButtonComponent } from "../ButtonComponent";
import { InputField } from "../InputField";

import React, { useMemo, useEffect, useRef, useState } from "react";

/**
 * TableComponent is a React component that renders a table with pagination,
 * search, and delete row functionalities.
 *
 * @param {Array} data - The data to be displayed in the table.
 * @param {Array} columns - The column definitions for the table.
 * @returns {JSX.Element} The rendered table component.
 */
export function TableComponent({ data, columns }) {
  // State to manage the table data
  const [tableData, setTableData] = useState(data);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(""); // State for the global search box
  const [filterColumn, setFilterColumn] = useState(columns[0].id); // Default to filtering the first column

  /**
   * Handles the deletion of a row from the table.
   *
   * @param {number} rowIndex - The index of the row to be deleted.
   */
  const handleDeleteRow = (rowIndex) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?",
    );
    if (confirmDelete) {
      setTableData((prevData) =>
        prevData.filter((_, index) => index !== rowIndex),
      );
    }
  };

  // Memorized column definitions including the delete column
  const tableColumns = useMemo(
    () => [
      ...columns,
      {
        id: "delete",
        header: "Delete",
        cell: ({ row }) => (
          <HiXCircle
            className="text-red-500 cursor-pointer text-xl"
            onClick={() => handleDeleteRow(row.index)}
          />
        ),
      },
    ],
    [columns],
  );

  // Initialize the table instance with data and column definitions
  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      columnFilters: columnFilters,
      globalFilter: globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onFilterChange: setColumnFilters,
    onSortingChange: setSorting,
  });
  
  // Update columnFilters state when the global search box changes
  useEffect(() => {
    if (globalFilter) {
      setColumnFilters([
        {
          id: filterColumn,
          value: globalFilter,
        },
      ]);
    } else {
      setColumnFilters([]);
    }
  }, [globalFilter, filterColumn]);

  // State to manage the container height
  const [containerHeight, setContainerHeight] = useState("auto");
  const containerRef = useRef(null); // Ref to access the container DOM element

  // Effect to calculate and set the container height based on content
  useEffect(() => {
    if (containerRef.current) {
      const contentHeight = containerRef.current.scrollHeight;
      setContainerHeight(`${contentHeight}px`);
    }
  }, [tableData]);

  return (
    <Container className="mx-auto contain-content bg-indigo-700">
      <Container
        ref={containerRef}
        className="p-0 shadow-none overflow-auto"
        style={{ height: containerHeight }}
      >
        <div className="top-0 z-10 p-2 flex align-middle gap-2 bg-indigo-700">
          <InputField
            id="search-box"
            placeholder="Search or add a new row"
            nolabel={true}
            className="my-0 rounded-lg shadow-md shadow-indigo-700 text-indigo-950 focus:outline-indigo-300"
            value={globalFilter} // Valor da caixa de pesquisa
            onChange={(e) => setGlobalFilter(e.target.value)} // Lidar com a alteração do valor da caixa de pesquisa
          />
          <InputField
            id="column-filter"
            type="select"
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
            className="my-0 mt-0 rounded-lg shadow-md shadow-indigo-700 text-indigo-950 focus:outline-indigo-300"
            placeholder="Select a column"
            options={columns.map((column) => ({
              value: column.id,
              label: column.header,
            }))}
          />
          <div className="flex">
            <ButtonComponent
              id="add-button"
              className="bg-indigo-500 m-0 p-1 flex justify-center align-middle rounded-lg shadow-md shadow-indigo-700"
            >
              <HiPlusCircle className="text-3xl"></HiPlusCircle>
            </ButtonComponent>
          </div>
        </div>
        <table className="w-full min-h-48 md:min-h-56">
          <thead className="mx-auto justify-center rounded-t-lg text-white text-sm shadow-indigo-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="sticky top-0 z-10 bg-indigo-600"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-1.5"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="inline-flex justify-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {
                          { asc: <HiChevronUp />, desc: <HiChevronDown /> }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`border ${
                  row.index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-200"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`text-indigo-950 font-sans text-center text-sm font-medium`}
                  >
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
          className="text-sm bg-indigo-500 py-2 px-4 font-normal disabled:invisible"
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
          className="text-sm bg-indigo-500 py-2 px-4 font-normal disabled:invisible"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </ButtonComponent>
      </div>
    </Container>
  );
}