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

function Buildings() {
  const [data, setData] = useState([]);

  async function getData() {
    const response = await api.get("/buildings");
    setData(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const tableData = useMemo(
    () =>
      data.map((building) => ({
        name: building.name,
        category: building.category,
        client: building.client,
        where: `${building.city + "-" + building.state}`,
        startForecast: building.start_forecast,
        projectedArea: `${building.projected_area + " m²"}`,
        builtArea: `${building.built_area + " m²"}`,
        landArea: `${building.land_area + " m²"}`,
      })),
    [data],
  );

  // COLUMNS
  const columns = useMemo(
    () => [
      {
        header: "Nome",
        accessorKey: "name",
      },
      {
        header: "Categoria",
        accessorKey: "category",
      },
      {
        header: "Cliente",
        accessorKey: "client",
      },
      {
        header: "Onde",
        accessorKey: "where",
      },
      {
        header: "Previsão de início",
        accessorKey: "startForecast",
      },
      {
        header: "Projetado",
        accessorKey: "projectedArea",
      },
      {
        header: "Área construída",
        accessorKey: "builtArea",
      },
      {
        header: "Terreno",
        accessorKey: "landArea",
      }
    ],
    [],
  );

  const navigate = useNavigate();

  // this method should get the respective Id from data
  const handleRowClick = (rowData, rowIndex) => {
    // pegar o nome do cliente na linha e comparar com data
    const building_id = data.find((building) => building.name === rowData.name).id;
    navigate(`/obras/details/${building_id}`);
    console.log(rowData, rowIndex, building_id);
  };

  return (
    <div className="h-screen w-full">
      <Header />
      <Main className="flex flex-col gap-4 px-2 py-8 md:grid md:grid-flow-col-dense md:p-8">
        <div className="col-span-2 mx-4 grid-flow-col gap-4 sm:mx-auto md:mx-0 md:grid md:grid-rows-2 2xl:grid-rows-3">
          <Container className="bg-violet-50 p-2 pt-4 contain-content md:row-start-1 md:p-6">
            <h1 className="px-2 pb-2 text-3xl font-semibold text-violet-950 dark:text-indigo-50">
              Obras
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
          <BuildingForm />
        </div>
      </Main>
    </div>
  );
}

export default Buildings;
