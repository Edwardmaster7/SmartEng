import InputField from "./InputField";
import ButtonComponent from "./ButtonComponent";
import Modal from "./Modal";
import { useState } from "react";

function BuildingForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // form variables
  const [formData, setFormData] = useState({
    buildingName: "",
    name: "",
    phone: "",
    clientAddress: "",
    buildingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    buildingType: "",
    startForecast: "",
    projectedArea: "",
    builtArea: "",
    landArea: "",
  });

  const [submissions, setSubmissions] = useState(() => {
    const savedSubmissions = localStorage.getItem("@submissions");
    return savedSubmissions ? JSON.parse(savedSubmissions) : [];
  });

  const brazilianStates = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    console.log("handleSubmit");
    const newSubmissions = [...submissions, formData];
    setSubmissions(newSubmissions);
    localStorage.setItem("@submissions", JSON.stringify(newSubmissions));

    setFormData({
      buildingName: "",
      name: "",
      phone: "",
      clientAddress: "",
      buildingAddress: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      buildingType: "",
      startForecast: "",
      projectedArea: "",
      builtArea: "",
      landArea: "",
    });
  };

  const classes =
    "rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200 mb-4";

  return (
    <div className="max-h-full w-full">
      {/* <Header />
      <Main
        className={`px-4 pt-4 pb-8 align-center ${isModalOpen ? "blur-md" : ""}`}
      > */}

      <form
        className="mx-auto mb-4 max-w-prose animate-fade-in rounded-xl bg-violet-50 px-3 pb-8 pt-6 shadow-xl md:px-8 lg:px-6 dark:bg-indigo-900"
        onSubmit={handleSubmit}
      >
        <h1 className="pb-4 text-3xl font-semibold text-violet-950 dark:text-indigo-50">
          Nova Obra
        </h1>

        <InputField
          label="Obra"
          id="buildingName"
          type="text"
          placeholder="Nome da obra"
          className={classes}
          required
          value={formData.buildingName}
          onChange={handleChange}
        />

        <InputField
          label="Categoria"
          id="buildingType"
          type="text"
          placeholder="Tipo de obra"
          className={classes}
          required
          value={formData.buildingType}
          onChange={handleChange}
        />

        <InputField
          label="Endereço"
          id="buildingAddress"
          type="text"
          maxLength={100}
          placeholder="Endereço da obra"
          className={classes}
          required
          value={formData.buildingAddress}
          onChange={handleChange}
        />

        <InputField
          label="Previsão para início"
          id="startForecast"
          type="date"
          placeholder="DD/MM/YYYY"
          className={classes}
          value={formData.startForecast}
          onChange={handleChange}
        />

        <InputField
          label="Área projetada (m²)"
          id="projectedArea"
          type="number"
          placeholder="1200"
          className={classes}
          required
          value={formData.projectedArea}
          onChange={handleChange}
        />

        <InputField
          label="Área construída (m²)"
          id="builtArea"
          type="number"
          placeholder="800"
          className={classes}
          required
          value={formData.builtArea}
          onChange={handleChange}
        />

        <InputField
          label="Área do terreno (m²)"
          id="landArea"
          type="number"
          placeholder="2000"
          className={classes}
          required
          value={formData.landArea}
          onChange={handleChange}
        />
        <div className="flex items-center justify-between pt-2">
          <ButtonComponent
            id="submit"
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg bg-violet-600 px-4 py-2"
            content="Enviar"
          />
        </div>
      </form>
      {/* </Main> */}
      <Modal
        className="flex-col rounded-xl"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <h1 className="pt-3 text-2xl font-bold text-violet-50">
          Formulário enviado!
        </h1>
        <div className="flex justify-center">
          <ButtonComponent
            id="go-to-quote-button"
            className="mx-auto mt-4 rounded-lg bg-violet-900 px-4 py-2 text-white"
            onClick={() => (window.location.href = "/orcamento")}
          >
            Orçamento
          </ButtonComponent>
        </div>
      </Modal>
    </div>
  );
}

export default BuildingForm;
