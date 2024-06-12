import { useState, useMemo, useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  HiXCircle,
  HiPlusCircle,
  HiSave,
  HiSearchCircle,
  HiChevronUp,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import Container from "../Container";
import InputField from "../InputField";
import ButtonComponent from "../ButtonComponent";


/**
 * TableComponent component for displaying tables in the quote page.
 * @param {Object} props - Component props.
 * @param {string} props.id - Table ID.
 * @param {Array} props.data - Table data.
 * @param {Array} props.columns - Table columns.
 * @param {boolean} props.hasHeader - Indicates whether the table has a header.
 * @param {boolean} props.hasUtilityBar - Indicates whether the table has a utility bar.
 * @param {function} props.handleAddRow - Event handler for adding rows to the table.
 * @param {function} props.handleDeleteRow - Event handler for deleting rows from the table.
 * @param {string} props.inputValue - Input value for filtering table rows.
 * @param {function} props.setInputValue - Event handler for updating the input value.
 * @returns {JSX.Element} - TableComponent component for displaying tables in the quote page.
 */
const TableComponent = ({
  data,
  columns,
  hasHeader,
  hasUtilityBar,
  hasAddButton,
  hasRemoveRowButton,
  hasPagination,
  handleAddRow,
  inputValue,
  setInputValue,
  handleDeleteRow,
  handleSaveTable,
  minRowsForPagination,
  className,
}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableColumns = useMemo(
    () => [
      ...columns,
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          <HiXCircle
            className={`text-red-500 dark:text-red-700 rounded-full p-0 dark:bg-red-200 dark:hover:bg-red-400 cursor-pointer text-xl mx-2 hover:animate-pulse ${hasRemoveRowButton === false ? "hidden" : ""}`}
            onClick={() => handleDeleteRow(row.index)}
          />
        ),
      },
    ],
    [columns, handleDeleteRow],
  );

  const table = useReactTable({
    data: data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: (minRowsForPagination ? minRowsForPagination : 10), //custom default page size
      }
    },
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
    <Container className={`mx-auto contain-content bg-indigo-700 ${className}`}>
      <Container
        ref={containerRef}
        className="p-0 rounded-b-none shadow-none overflow-auto"
        style={{ height: containerHeight }}
      >
        <div
          className={`top-0 z-10 p-2 flex align-middle gap-2 bg-indigo-700 dark:bg-indigo-800 w-full ${hasUtilityBar === false ? "hidden" : ""}`}
        >
          <InputField
            id="search-box"
            placeholder={`${hasAddButton === false ? "Pesquise..." : "Pesquise ou adicione linhas"}`}
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
              className="bg-indigo-500 m-0 p-1 size-auto flex justify-center align-middle rounded-lg shadow-md shadow-indigo-700 dark:shadow-none"
              onClick={(e) => {
                e.preventDefault();
                setGlobalFilter(inputValue);
              }}
            >
              <HiSearchCircle className="text-3xl" />
            </ButtonComponent>
            <ButtonComponent
              id="add-button"
              className={`bg-indigo-500 m-0 p-1 size-auto flex justify-center align-middle rounded-lg shadow-md shadow-indigo-700 dark:shadow-none ${hasAddButton === false ? "hidden" : ""}`}
              onClick={handleAddRow}
            >
              <HiPlusCircle className="text-3xl" />
            </ButtonComponent>
            <ButtonComponent
              id="save-button"
              className="bg-indigo-500 m-0 p-1 size-auto flex justify-center align-middle rounded-lg shadow-md shadow-indigo-700 dark:shadow-none"
              onClick={handleSaveTable}
            >
              <HiSave className="text-3xl" />
            </ButtonComponent>
          </div>
        </div>
        <table
          className={`w-full ${data.length > 0 ? "min-h-20 xl:min-h-56" : ""}`}
        >
          <thead
            className={`mx-auto justify-center rounded-t-lg text-white dark:text-violet-50 text-sm shadow-indigo-700 dark:shadow-none ${hasHeader === false ? "hidden" : ""}`}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="sticky top-0 z-10 bg-indigo-600 dark:bg-indigo-700"
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
                className={`border-none ${
                  row.index % 2 === 0 ? "bg-indigo-100 dark:bg-indigo-400" : "bg-indigo-200 dark:bg-indigo-500"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`text-indigo-950 dark:text-indigo-50 font-sans text-center text-sm font-medium p-2`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <div
        className={`bottom-0 left-0 right-0 inline-flex w-full justify-between rounded-b bg-indigo-600 dark:bg-indigo-800 ${hasPagination === false ? "hidden" : ""}`}
      >
        <ButtonComponent
          disabled={!table.getCanPreviousPage()}
          className="text-sm bg-indigo-500 dark:bg-indigo-600 py-2 px-4 font-normal disabled:invisible"
          onClick={() => table.setPageIndex(0)}
        >
          First page
        </ButtonComponent>
        <div className="flex gap-2">
          <ButtonComponent
            disabled={!table.getCanPreviousPage()}
            className="bg-indigo-500 dark:bg-indigo-600 py-2 px-1.5 text-xl font-normal disabled:hidden"
            onClick={() => table.previousPage()}
          >
            <HiChevronLeft />
          </ButtonComponent>
          <ButtonComponent
            disabled={!table.getCanNextPage()}
            className="bg-indigo-500 dark:bg-indigo-600 py-2 px-1.5 text-xl font-normal disabled:hidden"
            onClick={() => table.nextPage()}
          >
            <HiChevronRight />
          </ButtonComponent>
        </div>

        <ButtonComponent
          disabled={!table.getCanNextPage()}
          className="text-sm bg-indigo-500 dark:bg-indigo-600 py-2 px-4 font-normal disabled:invisible"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </ButtonComponent>
      </div>
    </Container>
  );
};

export default TableComponent;
