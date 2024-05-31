import { useState, useMemo, useEffect, useRef } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { HiXCircle, HiPlusCircle, HiSave, HiSearchCircle, HiChevronUp, HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Container from "../Container";
import InputField from "../InputField";
import ButtonComponent from "../ButtonComponent";

const TableComponent = ({ data, columns, handleRowFunction, inputValue, setInputValue, setTableData, handleDeleteRow }) => {
  
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleAddRow = () => {
    console.log("Add row")
    handleRowFunction();
  };

  const tableColumns = useMemo(
    () => [
      ...columns,
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          <HiXCircle
            className="text-red-500 cursor-pointer text-xl mx-2"
            onClick={() => handleDeleteRow(row.index)}
          />
        ),
      },
    ],
    [columns, handleDeleteRow]
  );

  const table = useReactTable({
    data: data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const [containerHeight, setContainerHeight] = useState("auto");
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const contentHeight = containerRef.current.scrollHeight;
      setContainerHeight(`${contentHeight}px`);
    }
  }, [data]);

  return (
    <Container className="mx-auto contain-content bg-indigo-700">
      <Container
        ref={containerRef}
        className="p-0 shadow-none overflow-auto"
        style={{ height: containerHeight }}
      >
        <div className="top-0 z-10 p-2 flex align-middle gap-2 bg-indigo-700 w-full">
          <InputField
            id="search-box"
            placeholder="Search or add a new row"
            nolabel={true}
            className="my-0 rounded-lg shadow-md shadow-indigo-700 text-indigo-950 focus:outline-indigo-300"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onFocus={(e) => {
              e.target.select();
              setGlobalFilter();
            }}
          />

          <div className="flex gap-2">
            <ButtonComponent
              id="search-button"
              className="bg-indigo-500 m-0 p-1 size-auto flex justify-center align-middle rounded-lg shadow-md shadow-indigo-700"
              onClick={(e) => {
                e.preventDefault();
                setGlobalFilter(inputValue);
              }}
            >
              <HiSearchCircle className="text-3xl" />
            </ButtonComponent>
            <ButtonComponent
              id="add-button"
              className="bg-indigo-500 m-0 p-1 size-auto flex justify-center align-middle rounded-lg shadow-md shadow-indigo-700"
              onClick={handleAddRow}
            >
              <HiPlusCircle className="text-3xl" />
            </ButtonComponent>
            <ButtonComponent
              id="save-button"
              className="bg-indigo-500 m-0 p-1 size-auto flex justify-center align-middle rounded-lg shadow-md shadow-indigo-700"
            >
              <HiSave className="text-3xl" />
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
                    className={`text-indigo-950 font-sans text-center text-sm font-medium px-2`}
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

export default TableComponent;