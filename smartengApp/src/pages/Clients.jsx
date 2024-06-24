import Header from "../components/Header";
import Main from "../components/Main";
import Container from "../components/Container";
import TableComponent from "../components/Table/TableComponent";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import ClientForm from "../components/ClientForm";

function Clients() {
  const [data, setData] = useState({
    client: "",
    phone: "",
    email: "",
    revisionDate: "",
    dueDate: "",
    address: "",
  });

  // useEffect(() => {
  //   fetch("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  // COLUMNS

  const tableData = useMemo(
    () => [
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
      {
        Name: "Eduardo Batista",
        Email: "eduardoobatista2002@hotmail.com",
        Phone: "(11) 99999-9999",
        CreatedAt: "2023-05-01",
      },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        header: "Nome",
        accessorKey: "Name",
      },
      {
        header: "Email",
        accessorKey: "Email",
      },
      {
        header: "Telefone",
        accessorKey: "Phone",
      },
      {
        header: "Criado em",
        accessorKey: "CreatedAt",
      },
    ],
    [],
  );

  const navigate = useNavigate();

  const handleRowClick = (rowData, rowIndex) => {
    console.log(rowData, rowIndex);
    navigate(`/clientes/details/${rowIndex}`);
  };

  return (
    <div className="w-full h-screen">
      <Header />
      <Main className="flex-col md:grid md:grid-cols-4 lg:grid-cols-6 lg:grid-rows-none p-4 md:p-8 gap-4">
        <Container className="bg-violet-50 lg:row-span-2 col-span-5 lg:col-span-4 p-6">
          <h1 className="font-semibold text-3xl text-violet-950 dark:text-indigo-50 pb-4">
            Clientes
          </h1>
          <TableComponent
            data={tableData}
            columns={columns}
            hasHeader={true}
            hasUtilityBar={false}
            hasPagination={true}
            hasRemoveRowButton={false}
            handleRowClick={handleRowClick}
          />
        </Container>

        <Container className="lg:row-span-3 col-span-3 lg:col-span-2 overflow-auto max-h-96 lg:max-h-none">
          <ClientForm></ClientForm>
        </Container>
      </Main>
    </div>
  );
}

export default Clients;
