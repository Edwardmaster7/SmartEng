import Main from "../components/Main";
import { Header } from "../components/Header";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import Container from "../components/Container";
import Field from "../components/Field";
import TableComponent from "../components/Table/TableComponent";
import Modal from "../components/Modal";
import tableData from "../components/Table/table-data.json";
import { useMemo, useState, useEffect } from "react";
import base from "../components/Table/sinapi.json";
import {
  HiXCircle,
  HiPlusCircle,
  HiSave,
  HiSearchCircle,
  HiChevronUp,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiCheckCircle,
} from "react-icons/hi";

function Quote() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      accessorKey: "Stage",
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
    console.log(`Handling add ${searchTerm}`);
    if (searchTerm) {
      const existingRow = data.find((row) => row.Code === parseInt(searchTerm));
      console.log(existingRow);
      if (existingRow) {
        alert("Já existe um ítem com este código na tabela.");
        return;
      }

      const baseRow = base.find(
        (row) => row.COMPOSITION_CODE === parseInt(searchTerm),
      );
      if (baseRow) {
        const newRow = {
          Item: data.length + 1,
          Base: "Sinapi",
          Code: baseRow.COMPOSITION_CODE,
          Description: baseRow.COMPOSITION_DESCRIPTION,
          Unit: baseRow.UNIT,
          Stage: baseRow.ITEM_TYPE,
          Qtd: baseRow.AMOUNT,
          VU_Material: baseRow.MATERIAL_COST,
          VU_MO: baseRow.LABOR_COST,
          Total: baseRow["TOTAL_COST"],
        };
        setData([...data, newRow]);
        localStorage.setItem(
          "quote-table-data",
          JSON.stringify([...data, newRow]),
        );
        alert(`Code ${searchTerm} added successfully`);
        setSearchTerm(""); // Clear the input
      } else {
        alert("Este código não existe na base.");
      }
    } else {
      alert("Por favor, insira um código.");
    }
  };

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("quote-table-data");
    const stages = localStorage.getItem("stages");

    if (!dadosSalvos) {
      localStorage.setItem("quote-table-data", JSON.stringify([]));
    } else {
      setData(JSON.parse(dadosSalvos));
    }

    if (!stages) {
      localStorage.setItem("stages", JSON.stringify([]));
      setIsModalOpen(true);
    } else {
      const parsedStages = JSON.parse(stages);
      setStage(parsedStages);
      if (parsedStages.length === 0) {
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleDeleteRow = (rowIndex) => {
    const confirmDelete = window.confirm(
      "Tem certeza que quer deletar essa linha?",
    );
    if (confirmDelete) {
      const newData = data.filter((_, index) => index !== rowIndex);
      setData(newData);
      localStorage.setItem("quote-table-data", JSON.stringify(newData));
    }
  };

  const saveTable = () => {
    console.log("Saving table...");
    console.log(data);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stage, setStage] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**@type {import("@tanstack/react-table").ColumnDef<any>} */
  const stageColumns = [
    {
      header: "",
      accessorKey: "Stage",
    },
  ];

  const handleAddStage = () => {
    if (inputValue) {
      const newStage = {
        Stage: inputValue,
      };
      setStage([...stage, newStage]);
      // localStorage.setItem("stages", JSON.stringify([...stage, newStage]));
      setInputValue(""); // Clear the input
    } else {
      alert("Por favor, insira uma etapa.");
    }
  };

  const handleDeleteStage = (rowIndex) => {
    const confirmDelete = window.confirm(
      "Tem certeza que quer deletar esta etapa?",
    );
    if (confirmDelete) {
      const newStage = stage.filter((_, index) => index !== rowIndex);
      setStage(newStage);
      // localStorage.setItem("stages", JSON.stringify(newStage));
    }
  };

  const handleSaveStages = () => {
    console.log("Saving stages...");
    localStorage.setItem("stages", JSON.stringify(stage));
    console.log(stage);
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
          handleAddRow={handleAddRow}
          handleDeleteRow={handleDeleteRow}
          inputValue={searchTerm}
          setInputValue={setSearchTerm}
        ></TableComponent>

        <Modal
          id="add-stage"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <h1 className="text-2xl font-bold pt-3 mb-4 text-violet-50">
            Para começar, adcione uma nova etapa...
          </h1>
          <div className="sticky flex-col gap-2">
            <HiPlusCircle
              id="add-stage-button"
              className="text-2xl text-violet-900 hover:text-green-600 absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation();
                handleAddStage();
              }}
            />
            <InputField
              id="add-stage-input"
              className="rounded-lg focus:outline-indigo-200"
              placeholder="Serviços iniciais"
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            ></InputField>
          </div>
          <TableComponent
            id="stages-list"
            data={stage}
            hasHeader={false}
            hasUtilityBar={false}
            hasPagination={false}
            columns={stageColumns}
            handleAddRow={handleAddStage}
            handleDeleteRow={handleDeleteStage}
          ></TableComponent>
          <div className="flex">
            <ButtonComponent
              className={`mt-4 ml-auto px-4 py-2 bg-violet-900 rounded-lg text-white ${stage.length > 0 ? "" : "hidden"}`}
              onClick={(e) => {
                e.preventDefault()
                handleSaveStages();
                handleCloseModal();
              }}
            >
              Salvar
            </ButtonComponent>
          </div>
        </Modal>
      </Main>
    </div>
  );
}

export default Quote;
