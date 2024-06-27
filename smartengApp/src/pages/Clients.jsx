import Header from "../components/Header";
import Main from "../components/Main";
import Container from "../components/Container";
import TableComponent from "../components/Table/TableComponent";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { api } from "../services/api";

import BuildingForm from "../components/BuildingForm";
import ClientForm from "../components/ClientForm";
import Modal from "../components/Modal";
import ButtonComponent from "../components/ButtonComponent";

function Clients() {
  const [data, setData] = useState([]);

  async function getData() {
    const response = await api.get("/clients");
    setData(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const tableData = useMemo(
    () =>
      data.map((client) => ({
        Name: client.name,
        Email: client.email,
        Phone: client.phone,
        CreatedAt: client.created_at,
        CreatedBy: client.owner
      })),
    [data],
  );

  // COLUMNS
  const columns = useMemo(
    () => [
      {
        header: "Nome",
        accessorKey: "Name",
      },
      {
        header: "E-mail",
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
      {
        header: "Criado por",
        accessorKey: "CreatedBy",
      },
    ],
    [],
  );

  const navigate = useNavigate();

  // this method should get the respective Id from data
  const handleRowClick = (rowData, rowIndex) => {
    // pegar o nome do cliente na linha e comparar com data
    const client_id = data.find((client) => client.name === rowData.Name).id;
    navigate(`/clientes/details/${client_id}`);
    console.log(rowData, rowIndex, client_id);
  };

  return (
    <div className="h-screen w-full">
      <Header />
      <Main className="flex flex-col gap-4 px-2 py-8 md:grid md:grid-flow-col-dense md:p-8">
        <div className="col-span-2 sm:mx-auto mx-4 md:mx-0 md:grid grid-flow-col gap-4 md:grid-rows-2 2xl:grid-rows-3">
          <Container className="bg-violet-50 p-2 pt-4 contain-content md:row-start-1 md:p-6">
            <h1 className="px-2 pb-2 text-3xl font-semibold text-violet-950 dark:text-indigo-50">
              Clientes
            </h1>
            <p className="px-2 pb-2 text-violet-700 dark:text-indigo-200">
              Clique em um registro para visualizá-lo em detalhes...
            </p>
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
        </div>
        <div className="m-4 overflow-auto rounded-xl bg-transparent shadow-none contain-content md:m-0">
          <ClientForm />
        </div>

        {/* <Container className="col-span-3 lg:col-span-2 overflow-auto max-h-96 bg-violet-50">
          <BuildingForm></BuildingForm>
        </Container> */}
      </Main>
    </div>
  );
}

export default Clients;
