import Main from "../components/Main";
import Container from "../components/Container";
import Header from "../components/Header";
import { HiArrowLeft, HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import InputField from "../components/InputField";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import ButtonComponent from "../components/ButtonComponent";
import { useAuth } from "../hooks/auth";

function BuildingDetails() {
  // const [submissions, setSubmissions] = useState(() => {
  //   const savedSubmissions = localStorage.getItem("@submissions");
  //   return savedSubmissions ? JSON.parse(savedSubmissions) : [];
  // });

  const { user } = useAuth();

  const [building, setBuilding] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [values, setValues] = useState([]);

  async function getData() {
    const urlParts = window.location.pathname.split("/");
    const id = urlParts[urlParts.length - 1];
    try {
      const response = await api.get("/buildings/" + id);

      setBuilding(response.data);
    } catch (error) {
      alert(
        "Ocorreu um erro ao carregar os dados da obra...\n" + error.message,
      );
      console.log(error);
    }
  }

  async function handleUpdate(updatedData) {
    try {
    //   console.log(building.id);
      const updatedValues = {
        name: updatedData[0].value,
        category: updatedData[1].value,
        client: updatedData[2].value,
        projected_area: updatedData[3].value,
        built_area: updatedData[4].value,
        land_area: updatedData[5].value,
        address: updatedData[6].value,
        zip_code: updatedData[7].value,
        city: updatedData[8].value,
        state: updatedData[9].value,
      };
    //   console.log(updatedValues);

      await api.put("/buildings/" + building.id, updatedValues);
      // alert("Cliente atualizado com sucesso!");
    } catch (error) {
      alert("Ocorreu um erro ao atualizar a obra...\n" + error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    getData();

    if (building) {
      setInitialState([
        { fieldName: "Nome", value: building.name },
        { fieldName: "Categoria", value: building.category },
        { fieldName: "Cliente", value: building.client },
        { fieldName: "Área projetada", value: building.projected_area },
        { fieldName: "Área construída", value: building.built_area },
        { fieldName: "Área do terreno", value: building.land_area },
        { fieldName: "Endereço", value: building.address },
        { fieldName: "CEP", value: building.zip_code },
        { fieldName: "Cidade", value: building.city },
        { fieldName: "Estado", value: building.state },
        { fieldName: "Criado por", value: building.owner },
        { fieldName: "Criado em", value: building.created_at },
        {
          fieldName: "Atualizado por",
          value: building.updated_by ? building.updater : "Ninguém",
        },
        { fieldName: "Atualizado em", value: building.updated_at },
      ]);
    }
    setValues(initialState);
  }, [building]);

  const handleChange = (index, newValue) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], value: newValue };
      handleUpdate(updatedValues);
      return updatedValues;
    });
  };

  const handleDelete = () => {
    if (user.id === building.owner_id) {
      try {
        api.delete("/buildings/" + building.id);
        alert("Obra deletada com sucesso!");
        window.location.href = "/obras";
      } catch (error) {
        alert("Ocorreu um erro ao deletar a obra...\n" + error.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen w-full">
      <Main className={`gap-4 py-20 md:px-20`}>
        <Container className="relative mx-auto flex flex-col bg-violet-50 px-6 py-20 sm:px-10">
          <Link to="/obras" className="absolute left-9 top-9 z-10">
            <HiArrowLeft className="text-3xl text-violet-800 hover:cursor-pointer hover:text-violet-400 dark:text-violet-200 dark:hover:text-violet-50" />
          </Link>

          <h1 className="mx-auto text-4xl font-semibold text-violet-950 dark:text-indigo-50">
            Detalhes da Obra
          </h1>
          <div className="grid grid-cols-2 gap-2 pt-10 md:grid-cols-4">
            {values.map((field, index) => (
              <div
                key={index}
                className={`overflow-auto ${field.fieldName === "Endereço" ? "col-span-2" : ""}`}
              >
                <Field
                  fieldName={field.fieldName}
                  children={field.value}
                  onSubmit={handleChange}
                  index={index}
                  editable={
                    field.fieldName === "Criado por" ||
                    field.fieldName === "Criado em" ||
                    field.fieldName === "Atualizado por" ||
                    field.fieldName === "Atualizado em"
                      ? false
                      : true
                  }
                  className="p-1"
                />
              </div>
            ))}
          </div>
          <div
            className={`flex items-center justify-between pt-16 ${user.id !== building.owner_id ? "hidden" : ""}`}
          >
            <ButtonComponent
              id="delete"
              type="delete"
              onClick={handleDelete}
              className="rounded-lg bg-violet-600 px-4 py-2"
              content="Deletar obra"
            />
          </div>
        </Container>
      </Main>
    </div>
  );
}

export default BuildingDetails;
