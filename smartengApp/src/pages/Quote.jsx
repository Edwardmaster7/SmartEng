import { Main } from "../components/Main";
import { Header } from "../components/Header";
import { InputField } from "../components/InputField";
import { ButtonComponent } from "../components/ButtonComponent";
import Container from "../components/Container";
import { Field } from "../components/Field";
import { TableComponent } from "../components/Table/TableComponent";
import mdata from "../components/Table/updated_data.json";
import { useMemo } from "react";

function Quote() {
  const data = useMemo(() => mdata, []);

  // Utility function to format float numbers
  const formatFloat = (value) => {
    // Check if value is null or undefined, return null in that case
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
      header: "Categoria",
      accessorKey: "Category",
    },
    {
      header: "Qtd.",
      accessorKey: "Qtd",
    },
    {
      header: "VU - Material",
      accessorKey: "VU-Material",
      cell: ({ getValue }) => formatFloat(getValue()), // Apply custom cell renderer
    },
    {
      header: "VU - M.O",
      accessorKey: "VU-MO",
      cell: ({ getValue }) => formatFloat(getValue()), // Apply custom cell renderer
    },
    {
      header: "Total",
      accessorKey: "Total",
      cell: ({ getValue }) => formatFloat(getValue()), // Apply custom cell renderer
    },
  ];

  return (
    <div className="h-screen">
      <Header />
      <Main className="align-center flex flex-col gap-3 p-4 pb-16">
        <Container className="mx-auto contain-content">
          <div className="flex justify-center rounded-t-lg bg-indigo-600 p-2">
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

        <TableComponent data={mdata} columns={columns}></TableComponent>
      </Main>
    </div>
  );
}

export default Quote;
