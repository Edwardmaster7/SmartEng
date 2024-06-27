import Main from "../components/Main"
import Container from "../components/Container"
import Header from "../components/Header"
import { HiArrowLeft, HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import Field from "../components/Field";
import InputField from "../components/InputField";
import { useState, useEffect } from "react";
import { api } from "../services/api"
import ButtonComponent from "../components/ButtonComponent";
import { useAuth } from "../hooks/auth";

function ClientDetails() {
  // const [submissions, setSubmissions] = useState(() => {
  //   const savedSubmissions = localStorage.getItem("@submissions");
  //   return savedSubmissions ? JSON.parse(savedSubmissions) : [];
  // });
  
  const { user } = useAuth();

  const [client, setClient] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [values, setValues] = useState([]);
  const [users, setUsers] = useState([]);

  async function getData() {
    const urlParts = window.location.pathname.split("/");
    const id = urlParts[urlParts.length - 1];
    try {   
      const response = await api.get("/clients/" + id);

      setClient(response.data);

    } catch (error) {
      alert("Ocorreu um erro ao carregar os dados do cliente...\n" + error.message);
      console.log(error);
    }
  }

  async function handleUpdate(updatedData) {
    try {
      console.log(client.id)
      const updatedValues = {
        name: updatedData[0].value,
        phone: updatedData[1].value,
        email: updatedData[2].value,
        city: updatedData[3].value,
        state: updatedData[4].value,
        address: updatedData[5].value,
      };
      console.log(updatedValues)
      
      await api.put("/clients/" + client.id, updatedValues);
      // alert("Cliente atualizado com sucesso!");
    } catch (error) {
      alert("Ocorreu um erro ao atualizar o cliente...\n" + error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    getData();

    if (client) {

      setInitialState([
        { fieldName: "Nome", value: client.name },
        { fieldName: "Phone", value: client.phone },
        { fieldName: "Email", value: client.email },
        { fieldName: "Cidade", value: client.city },
        { fieldName: "Estado", value: client.state },
        { fieldName: "Endereço", value: client.address },
        { fieldName: "Criado por", value: client.owner },
        { fieldName: "Criado em", value: client.created_at },
        {
          fieldName: "Atualizado por",
          value: client.updated_by ? client.updater : "Ninguém",
        },
        { fieldName: "Atualizado em", value: client.updated_at },
      ]);

      
    }
    setValues(initialState);
   }, [client]);

  const handleChange = (index, newValue) => {
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], value: newValue };
      handleUpdate(updatedValues);
      return updatedValues;
    });
  };

  const handleDelete = () => {
    if (user.id === client.owner_id) {
      try {
        api.delete("/clients/" + client.id);
        alert("Cliente deletado com sucesso!");
        window.location.href = "/clientes";
      } catch (error) {
        alert("Ocorreu um erro ao deletar o cliente...\n" + error.message);
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full h-screen">
      <Main className={`px-20 py-20 gap-4 justify-center`}>
        <Container className="mx-auto flex flex-col relative bg-violet-50 px-6 py-20 sm:px-10">
          <Link to="/clientes" className="absolute z-10 left-9 top-9">
            <HiArrowLeft className="text-3xl text-violet-800 dark:text-violet-200 dark:hover:text-violet-50 hover:text-violet-400 hover:cursor-pointer" />
          </Link>

          <h1 className="font-semibold text-4xl text-violet-950 dark:text-indigo-50 mx-auto">
            Detalhes do Cliente
          </h1>
          <div className="grid grid-cols-4 gap-2 pt-10">
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
            className={`flex items-center justify-between pt-16 ${user.id !== client.owner_id ? "hidden" : ""}`}
          >
            <ButtonComponent
              id="delete"
              type="delete"
              onClick={handleDelete}
              className="bg-violet-600 rounded-lg px-4 py-2"
              content="Deletar cliente"
            />
          </div>
        </Container>
      </Main>
    </div>
  );
}

export default ClientDetails