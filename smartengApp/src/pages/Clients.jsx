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
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getData() {
    const response = await api.get("/clients");
    setData(response.data);
    console.log(response.data)
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
        CreatedAt: client.updated_at,
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
    ],
    [],
  );

  const navigate = useNavigate();

  // this method should get the respective Id from data
  const handleRowClick = (rowData, rowIndex) => {
    // pegar o nome do cliente na linha e comparar com data
    const client_id = data.find(
      (client) => client.name === rowData.Name,
    ).id;
    navigate(`/clientes/details/${client_id}`);
    console.log(rowData, rowIndex, client_id);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-screen">
      <Header />
      <Main
        className={`flex-col md:grid md:grid-cols-4 lg:grid-cols-6 lg:grid-rows-none p-4 md:p-8 gap-4 ${isModalOpen ? "backdrop-blur-md blur-sm" : ""}`}
      >
        <Container className="bg-violet-50 lg:row-span-2 col-span-5 lg:col-span-4 p-6">
          <h1 className="font-semibold text-3xl text-violet-950 dark:text-indigo-50 pb-2">
            Clientes
          </h1>
          <p className="pb-2 text-violet-700 dark:text-indigo-200">
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
        <Container className="lg:row-span-3 col-span-3 lg:col-span-2 overflow-auto max-h-96 lg:max-h-none bg-violet-50">
          <ClientForm />
        </Container>
        {/* <Container className="col-span-3 lg:col-span-2 overflow-auto max-h-96 bg-violet-50">
          <BuildingForm></BuildingForm>
        </Container> */}
      </Main>

    </div>
  );
}

export default Clients;
