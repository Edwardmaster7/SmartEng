import Main from "../components/Main";
import { Header } from "../components/Header";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import Container from "../components/Container";
import Field from "../components/Field";
import TableComponent from "../components/Table/TableComponent";
import mdata from "../components/Table/updated_data.json";
import { useMemo, useState } from "react";
import base from "../components/Table/sinapi.json";

function Quote() {
  const [data, setData] = useState(mdata);
  const [inputValue, setInputValue] = useState("");

  // Utility function to format float numbers
  const formatFloat = (value) => {
    return value === null ? null : parseFloat(value).toFixed(2);
  };

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
      accessorKey: "Code",
    },
    {
      header: "Descrição",
      accessorKey: "Description",
      size: 300,
    },
    {
      header: "Unidade",
      accessorKey: "Unit",
    },
    {
      header: "Etapa",
      accessorKey: "Category",
    },
    {
      header: "Qtd.",
      accessorKey: "Qtd",
    },
    {
      header: "VU Material",
      accessorKey: "VU_Material",
      cell: ({ getValue }) => formatFloat(getValue()), // Apply custom cell renderer
    },
    {
      header: "VU M.O.",
      accessorKey: "VU_MO",
      cell: ({ getValue }) => formatFloat(getValue()), // Apply custom cell renderer
    },
    {
      header: "Total",
      accessorKey: "Total",
      cell: ({ getValue }) => formatFloat(getValue()), // Apply custom cell renderer
    },
  ];

  const handleAddRow = () => {
    console.log(`Handling add ${inputValue}`);
    if (inputValue) {
      const existingRow = data.find((row) => row.Code === parseInt(inputValue));
      console.log(existingRow);
      if (existingRow) {
        alert("This code already exists in the table.");
        return;
      }

      const baseRow = base.find(
        (row) => row.COMPOSITION_CODE === parseInt(inputValue),
      );
      if (baseRow) {
        const newRow = {
          Item: data.length + 1,
          Base: "Sinapi",
          Code: baseRow.COMPOSITION_CODE,
          Description: baseRow.COMPOSITION_DESCRIPTION,
          Unit: baseRow.UNIT,
          Category: baseRow.ITEM_TYPE,
          Qtd: baseRow.AMOUNT,
          VU_Material: baseRow.MATERIAL_COST,
          VU_MO: baseRow.LABOR_COST,
          Total: baseRow["TOTAL_COST"],
        };
        setData([...data, newRow]);
        alert(`Code ${inputValue} added successfully`);
        setInputValue(""); // Clear the input
      } else {
        alert("This code does not exist in the base data.");
      }
    } else {
      alert("Please enter a code.");
    }
  };

  const handleDeleteRow = (rowIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this row?");
    if (confirmDelete) {
      setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
    }
  };

  return (
    <div className="h-screen">
      <Header />
      <Main className="align-center flex flex-col gap-3 p-4 pb-16">
        <Container className="mx-auto contain-content">
          <div className="flex justify-center bg-indigo-600 p-2">
            <span className="font-medium text-indigo-50">
              Orçamento da Obra - Analítico
            </span>
          </div>
          <Container className="mx-auto overflow-auto max-h-28 md:max-h-40 rounded-t-none pb-2 pt-2 contain-content text-indigo-950">
            <div className="max-auto grid grid-cols-2 place-content-evenly gap-1 px-2 sm:grid-cols-4 text-inherit">
              <Field
                fieldName="Cliente:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                John Doe
              </Field>
              <Field
                fieldName="Telefone:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                19 996958543
              </Field>
              <Field
                fieldName="Email:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                email@exemplo.com
              </Field>
              <Field
                fieldName="Data Revisão:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                22/05/2024
              </Field>

              <Field
                fieldName="Obra:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                John Doe
              </Field>
              <Field
                fieldName="Data de validade:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                John Doe
              </Field>
              <Field
                fieldName="BDI:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                37%
              </Field>

              <Field
                fieldName="Encargos Sociais:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                John Doe
              </Field>
              <Field
                fieldName="Endereço:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"
              >
                Av. Paulista, n 8958 Estados unidios
              </Field>
            </div>
          </Container>
        </Container>

        <TableComponent
          data={data}
          columns={columns}
          setTableData={setData} // Pass the state updater function
          handleRowFunction={handleAddRow}
          handleDeleteRow={handleDeleteRow} // Pass the delete row function
          inputValue={inputValue}
          setInputValue={setInputValue}
        ></TableComponent>
        {/* <div class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute bg-violet-600 p-6 rounded-xl shadow-2xl">
            <h1 class="text-2xl font-bold mb-4 text-violet-50">Para começar, adcione uma nova etapa</h1>
            <InputField className="rounded-lg focus:outline-indigo-200" placeholder=""></InputField>
          </div>
        </div> */}
      </Main>
    </div>
  );
}

export default Quote;