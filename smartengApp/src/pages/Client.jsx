import "/src/index.css";
import Main from "../components/Main";
import { useState } from "react";
import Modal from "../components/Modal";
import ButtonComponent from "../components/ButtonComponent";
import InputField from "../components/InputField";

function Client() {
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
    const savedSubmissions = localStorage.getItem("submissions");
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
    setIsModalOpen(true);;
    const newSubmissions = [...submissions, formData];
    setSubmissions(newSubmissions);
    localStorage.setItem("submissions", JSON.stringify(newSubmissions));

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

  const classes = "mb-4 rounded-lg";
  return (
    <div className="w-full h-screen">
      <Main
        className={`grid pt-4 pb-16 grid-cols-3 sm:grid-cols-5 lg:grid-cols-4 align-center ${isModalOpen ? "blur-md" : ""}`}
      >
        <div></div>

        <form
          className="bg-indigo-100 dark:bg-indigo-900 px-4 md:px-8 pt-8 pb-8 mb-4 min-w-96 col-span-1 sm:col-span-3 lg:col-span-2  xl:col-span-2 rounded-xl shadow-xl"
          onSubmit={handleSubmit}
        >
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
            label="Nome"
            id="name"
            type="text"
            placeholder="Seu nome"
            className={classes}
            required
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            label="Telefone"
            id="phone"
            type="text"
            placeholder="(00) 00000-0000"
            className={classes}
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <InputField
            label="Endereço do cliente"
            id="clientAddress"
            type="text"
            placeholder="Endereço do cliente"
            className={classes}
            required
            value={formData.clientAddress}
            onChange={handleChange}
          />

          <InputField
            label="Endereço da obra"
            id="buildingAddress"
            type="text"
            placeholder="Endereço da obra"
            className={classes}
            required
            value={formData.buildingAddress}
            onChange={handleChange}
          />

          <InputField
            label="Cidade"
            id="city"
            type="text"
            placeholder="Cidade"
            className={classes}
            required
            value={formData.city}
            onChange={handleChange}
          />

          <InputField
            label="Estado"
            id="state"
            type="select"
            options={brazilianStates}
            placeholder="Selecione o estado"
            className={classes}
            required
            value={formData.state}
            onChange={handleChange}
          />

          <InputField
            label="CEP"
            id="zipCode"
            type="text"
            maxLength="11"
            placeholder="CEP"
            className={classes}
            required
            value={formData.zipCode}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="email@exemplo.com"
            className={classes}
            required
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Tipo de obra"
            id="buildingType"
            type="text"
            placeholder="Tipo de obra"
            className={classes}
            required
            value={formData.buildingType}
            onChange={handleChange}
          />

          <InputField
            label="Previsão para o início da obra"
            id="startForecast"
            type="date"
            placeholder="DD/MM/YYYY"
            className={classes}
            required
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
              className="bg-indigo-500 px-4 py-2"
              content="Enviar"
            />
          </div>
        </form>
        <div></div>
      </Main>
      <Modal
        className="flex-col"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <h1 className="text-2xl font-bold pt-3 text-violet-50">
          Formulário enviado!
        </h1>
        <div className="flex">
          <ButtonComponent
            id="go-to-quote-button"
            className="mt-4 mx-auto px-4 py-2 bg-violet-900 rounded-lg text-white"
            onClick={() => (window.location.href = "/orcamento")}
          >
            Orçamento
          </ButtonComponent>
        </div>
      </Modal>
    </div>
  );
}

export default Client;
