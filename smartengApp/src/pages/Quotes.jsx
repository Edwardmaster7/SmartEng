import Main from "../components/Main";
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
  HiPencilAlt,
} from "react-icons/hi";
import Header from "../components/Header";

function Quote() {
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [stage, setStage] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [editingStage, setEditingStage] = useState(false);

  // Variables to store the retrieved data
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  // const [revisionDate, setRevisionDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [address, setAddress] = useState("");
  // const [BDI, setBDI] = useState(0);
  const [building, setBuilding] = useState("");
  // const [socialCharges, setSocialCharges] = useState(0);
  const [clientData, setClientData] = useState({
    client: "",
    phone: "",
    email: "",
    date: "",
    revisionDate: "",
    dueDate: "",
    address: "",
    BDI: 0,
    building: "",
    socialCharges: 0,
  });

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

  const handleAddRowGroup = () => {
    console.log("Handling add row group");
    const stages = localStorage.getItem("stages");
    const parsedStages = JSON.parse(stages);

    if (parsedStages.length > 0) {
      if (searchTerm) {
        // Check if the code already exists in the table
        const existingRow = data.find(
          (row) => row.Code === parseInt(searchTerm),
        );
        if (existingRow) {
          alert("Já existe um item com este código na tabela.");
          return;
        }
        if (isNaN(parseInt(searchTerm))) {
          alert("Por favor, insira um código válido.");
          return;
        }
        handleOpenModal2();
        console.log("Modal opened");
        while (isModal2Open) {
          // Check if the code already exists in the table
          const existingRow = data.find(
            (row) => row.Code === parseInt(searchTerm),
          );
          if (existingRow) {
            alert("Já existe um item com este código na tabela.");
            return;
          }
          if (isNaN(parseInt(searchTerm))) {
            alert("Por favor, insira um código válido.");
            return;
          }
        }
      } else {
        alert("Por favor, insira um código.");
      }
    } else {
      handleOpenModal();
    }
  };

  const handleAddRow = () => {
    console.log(`Handling add ${searchTerm}`);
    console.log(`selected stage: ${selectedStage} qty: ${itemQty}`);
    if (!selectedStage || !itemQty) {
      alert("Por favor, selecione uma etapa e insira uma quantidade.");
      return;
    }

    const stages = localStorage.getItem("stages");
    const parsedStages = JSON.parse(stages);

    if (parsedStages.length > 0) {
      if (searchTerm) {
        // Check if the code already exists in the table
        const existingRow = data.find(
          (row) => row.Code === parseInt(searchTerm),
        );
        const existingRowOnModal = modalData.find(
          (row) => row.Code === parseInt(searchTerm),
        );

        // console.log(existingRow);
        if (existingRow || existingRowOnModal) {
          alert("Já existe um item com este código na tabela.");
          return;
        }
        if (isNaN(parseInt(searchTerm))) {
          alert("Por favor, insira um código válido.");
          return;
        }

        const baseRow = base.find(
          (row) => row.COMPOSITION_CODE === parseInt(searchTerm),
        );

        if (baseRow) {
          const newRow = {
            Item:
              data.length > 0
                ? modalData.length + data.length + 1
                : modalData.length + 1,
            Base: "Sinapi",
            Code: baseRow.COMPOSITION_CODE,
            Description: baseRow.COMPOSITION_DESCRIPTION,
            Unit: baseRow.UNIT,
            Stage: selectedStage,
            Qtd: itemQty,
            VU_Material: baseRow.MATERIAL_COST,
            VU_MO: baseRow.LABOR_COST,
            Total: parseFloat(baseRow["TOTAL_COST"]) * itemQty,
          };
          // console.log(modalData.length)

          setModalData((prevModalData) => {
            const updatedModalData = [...prevModalData, newRow];
            console.log(`new modalData: ${updatedModalData}`);
            return updatedModalData;
          });

          console.log(`new modalData: ${modalData}`);
          // alert(`Code ${searchTerm} added successfully`);
          setSearchTerm(""); // Clear the input
          setItemQty(""); // Clear the quantity
        } else {
          alert("Este código não existe na base.");
        }
      } else {
        alert("Por favor, insira um código.");
      }
    } else {
      handleOpenModal();
    }
  };

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
    setData((prevData) => {
      const updatedData = [...prevData, ...modalData];
      console.log(updatedData); // This will log the updated data
      localStorage.setItem("quote-table-data", JSON.stringify(updatedData));
      return updatedData;
    });
    setModalData([]);
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
    retrieveSubmissions();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    if (editingStage) {
      setEditingStage(false);
      console.log(editingStage);
      handleOpenModal2();
    }
  };

  const handleOpenModal2 = () => {
    setIsModal2Open(true);
  };

  const handleCloseModal2 = () => {
    setIsModal2Open(false);
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

  const handleEditStage = () => {
    setEditingStage(true);
    handleCloseModal2();
    handleOpenModal();
  };

  const retrieveSubmissions = () => {
    const submissions = localStorage.getItem("submissions");
    if (submissions) {
      const parsedSubmissions = JSON.parse(submissions);
      if (parsedSubmissions.length > 0) {
        const latestSubmission =
          parsedSubmissions[parsedSubmissions.length - 1];
        // setClient(latestSubmission.name || "");
        // setPhone(latestSubmission.phone || "");
        // setEmail(latestSubmission.email || "");
        // setDueDate(latestSubmission.startForecast || "");
        // // setDueDate(latestSubmission.dueDate || "");
        // setAddress(latestSubmission.buildingAddress || "");
        // // setBDI(latestSubmission.BDI || 0);
        // setBuilding(latestSubmission.buildingType || "");
        // // setSocialCharges(latestSubmission.socialCharges || 0);

        const obj = {
          client: latestSubmission.name || "",
          phone: latestSubmission.phone || "",
          email: latestSubmission.email || "",
          date: latestSubmission.startForecast || "",
          // revisionDate: latestSubmission.dueDate || "",
          dueDate: latestSubmission.startForecast || "",
          address: latestSubmission.buildingAddress || "",
          BDI: latestSubmission.BDI || 0,
          building: latestSubmission.buildingType || "",
          // socialCharges: latestSubmission.socialCharges || 0,
        };
        setClientData(obj);
      }
    }
  };

  // const client = "John Smith";
  // const phone = "13 99555-1234";
  // const email = "john@example.com";
  // const date = "2023-05-01";
  const revisionDate = "2023-05-15";
  // const dueDate = "2024-05-10";
  // const address = "Av. Paulista, n.8543, Centro, São Paulo - SP";
  const BDI = 37;
  // const building = "Sobrado";
  const socialCharges = 84;
  const totalMaterialCost = useMemo(
    () => calculateFieldSum("VU_Material", data),
    [data],
  );

  const totalLaborCost = useMemo(
    () => calculateFieldSum("VU_MO", data),
    [data],
  );
  const totalItems = useMemo(() => calculateFieldSum("Item", data), [data]);
  const totalBuildingCost = useMemo(
    () => calculateFieldSum("Total", data),
    [data],
  );
  const socialLaws = totalLaborCost * (socialCharges / 100);
  const calcBDI = (totalBuildingCost + socialLaws) * (BDI / 100);
  const totalCost = totalBuildingCost + socialLaws + calcBDI;

  //styles
  const fieldClassName =
    "sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white dark:bg-indigo-500 p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit";

  return (
    <div className="w-full">
      <Header />
      <Main
        className={`align-center flex flex-col gap-3 p-4 pb-16 ${isModalOpen === true ? "blur-sm" : ""} ${isModal2Open === true ? "blur-sm" : ""}`}
      >
        <Container className="mx-auto contain-content">
          <div className="flex justify-center bg-indigo-600 p-2 dark:bg-indigo-700">
            <span className="font-medium text-indigo-50 dark:text-violet-50">
              Orçamento da Obra - Analítico
            </span>
          </div>
          <Container className="mx-auto max-h-28 overflow-auto rounded-t-none pb-2 pt-2 text-indigo-950 contain-content md:max-h-40 dark:text-violet-50">
            <div className="max-auto grid grid-cols-2 place-content-evenly gap-1 px-2 text-inherit sm:grid-cols-4">
              <Field fieldName="Cliente:" className={fieldClassName}>
                {clientData.client}
              </Field>
              <Field fieldName="Telefone:" className={fieldClassName}>
                {clientData.phone}
              </Field>
              <Field fieldName="Email:" className={fieldClassName}>
                {clientData.email}
              </Field>
              <Field fieldName="Data Revisão:" className={fieldClassName}>
                {revisionDate}
              </Field>

              <Field fieldName="Obra:" className={fieldClassName}>
                {clientData.building}
              </Field>
              <Field fieldName="Data de validade:" className={fieldClassName}>
                {clientData.dueDate}
              </Field>
              <Field fieldName="BDI:" className={fieldClassName}>
                {`${BDI}%`}
              </Field>

              <Field fieldName="Encargos Sociais:" className={fieldClassName}>
                {`${socialCharges}%`}
              </Field>
              <Field fieldName="Endereço:" className={fieldClassName}>
                {clientData.address}
              </Field>
            </div>
          </Container>
        </Container>

        <TableComponent
          data={data}
          columns={columns}
          hasAddButton={true}
          handleAddRow={handleAddRowGroup}
          handleDeleteRow={handleDeleteRow}
          inputValue={searchTerm}
          setInputValue={setSearchTerm}
          className="animate-fade-in"
        ></TableComponent>

        <div className="mx-auto sm:flex">
          <div
            className="
          "
          />
          <div className="sm:px-6" />

          <Container className="flex contain-content md:w-10/12 xl:mr-4">
            <div className="flex-col bg-indigo-600 p-2 dark:bg-indigo-700">
              <span className="font-medium text-indigo-50">Total</span>
            </div>
            <Container className="mx-auto max-h-dvh rounded-t-none pb-2 pt-2 text-indigo-950 sm:overflow-auto md:max-h-52 dark:text-violet-50">
              <div className="max-auto grid grid-cols-3 place-content-evenly gap-1 px-2 text-inherit sm:grid-cols-3">
                <Field fieldName="Mão de Obra:" className={fieldClassName}>
                  {`R$ ${formatFloat(totalLaborCost)}`}
                </Field>
                <Field fieldName="Material:" className={fieldClassName}>
                  {`R$ ${formatFloat(totalMaterialCost)}`}
                </Field>
                <Field fieldName="Total (obra):" className={fieldClassName}>
                  {`R$ ${formatFloat(totalBuildingCost)}`}
                </Field>
                <Field fieldName="Leis Sociais:" className={fieldClassName}>
                  {`R$ ${formatFloat(socialLaws)}`}
                </Field>
                <Field fieldName="BDI:" className={fieldClassName}>
                  {`R$ ${formatFloat(calcBDI)}`}
                </Field>
                <Field fieldName="Total:" className={fieldClassName}>
                  {`R$ ${formatFloat(totalCost)}`}
                </Field>
              </div>
            </Container>
          </Container>
        </div>
      </Main>
      <Modal
        id="add-stage"
        className="mx-8 min-w-96 animate-scale-up-center rounded-xl"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <h1
          className={`mb-4 pt-3 text-2xl font-bold text-violet-50 ${editingStage === true ? "hidden" : ""}`}
        >
          Para começar, adicione uma nova etapa...
        </h1>
        <h1
          className={`mb-4 pt-3 text-2xl font-bold text-violet-50 ${editingStage === false ? "hidden" : ""}`}
        >
          Editar etapas
        </h1>
        <div className="sticky flex-col gap-2">
          <HiPlusCircle
            id="add-stage-button"
            className="absolute right-2 top-2 text-2xl text-violet-900 hover:text-green-600"
            onClick={(e) => {
              e.stopPropagation();
              handleAddStage();
            }}
          />
          <InputField
            id="add-stage-input"
            className="mb-4 rounded-lg bg-violet-50 focus:outline-indigo-200 dark:bg-violet-100"
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
          columns={stageColumns}
          handleAddRow={handleAddStage}
          handleDeleteRow={handleDeleteStage}
          minRowsForPagination={8}
        ></TableComponent>
        <div className="flex">
          <ButtonComponent
            id="save-add-stages-modal-button"
            className={`ml-auto mt-4 rounded-lg bg-violet-900 px-4 py-2 text-white ${stage.length > 0 ? "" : "hidden"}`}
            onClick={(e) => {
              e.preventDefault();
              handleSaveStages();
              handleCloseModal();
            }}
          >
            Salvar
          </ButtonComponent>
        </div>
      </Modal>
      <Modal
        id="select-stage-qty"
        isOpen={isModal2Open}
        onClose={handleCloseModal2}
        className="mx-8 animate-scale-up-center rounded-xl"
      >
        <h1 className="mb-4 pt-3 text-2xl font-bold text-violet-50">
          Adcione novos itens e sua etapa
        </h1>
        <div className="sticky flex-col gap-2">
          <div className="mb-4 flex justify-normal gap-4">
            <div className="sticky">
              <InputField
                id="add-item-input"
                className="mb-2 rounded-lg bg-violet-50 focus:outline-indigo-200 dark:bg-violet-100"
                placeholder="Insira o código do item"
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <HiPlusCircle
                id="add-item-button"
                className="absolute right-2 top-3.5 text-2xl text-violet-900 hover:text-green-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddRow();
                }}
              />
            </div>
            <div className="flex gap-1">
              <InputField
                id="select-stage"
                className="rounded-lg bg-violet-50 focus:outline-indigo-200 dark:bg-violet-100"
                placeholder="Selecione a Etapa"
                type="select"
                value={selectedStage}
                options={stage.map((item) => ({
                  value: item.Stage,
                  label: item.Stage,
                }))}
                onChange={(e) => {
                  setSelectedStage(e.target.value);
                }}
              />
              <HiPencilAlt
                className="text-lg text-violet-50 hover:text-violet-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditStage();
                }}
              />
            </div>

            <InputField
              id="add-item-qty"
              className="max-w-32 rounded-lg bg-violet-50 focus:outline-indigo-200 dark:bg-violet-100"
              placeholder="Quantidade"
              type="number"
              value={itemQty}
              onChange={(e) => {
                setItemQty(e.target.value);
              }}
            />
          </div>
        </div>
        <TableComponent
          id="items-group"
          data={modalData}
          columns={columns}
          hasUtilityBar={false}
          minRowsForPagination={3}
          handleAddRow={handleAddRow}
          handleDeleteRow={(rowIndex) => {
            const newModalData = modalData.filter(
              (_, index) => index !== rowIndex,
            );
            setModalData(newModalData);
          }}
          inputValue={searchTerm}
          setInputValue={setSearchTerm}
          className=""
        ></TableComponent>
        <div className="flex">
          <ButtonComponent
            id="save-add-group-modal-button"
            className={`ml-auto mt-4 rounded-lg bg-violet-900 px-4 py-2 text-white ${modalData.length > 0 ? "" : "hidden"}`}
            onClick={(e) => {
              e.preventDefault();
              saveTable();
              handleCloseModal2();
            }}
          >
            Salvar
          </ButtonComponent>
        </div>
      </Modal>
    </div>
  );
}

export default Quote;

// Utility function to format float numbers
export const formatFloat = (value) => {
  if (value === null) return null;

  const floatValue = parseFloat(value);
  const formattedValue = floatValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue;
};

// Utility function to check if a value is numeric
export const isNumeric = (value) => {
  return !isNaN(value - parseFloat(value));
};

// Utility function to get sum of values of a field in a given data structure
export const calculateFieldSum = (field, data) => {
  if (data.length === 0) return 0;

  if (isNumeric(data[0][field])) {
    // Sum numeric fields
    if (field === "VU_Material" || field === "VU_MO") {
      return data.reduce(
        (sum, row) => sum + parseFloat(row[field]) * parseFloat(row["Qtd"]),
        0,
      );
    }

    return data.reduce((sum, row) => sum + parseFloat(row[field] || 0), 0);
  } else {
    // Count non-numeric fields
    return data.length;
  }
};
