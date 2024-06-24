import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import { HiLockClosed, HiUser, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { api } from "../services/api"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function handleSubmit() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }

    const data = { name, email, password };

    console.log(data);

    api.post("/users", data)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch( error =>{
        if (error.response) {
          return alert(`Ocorreu um erro no cadastro:\n${error.response.data.message}`);
        } else {
          alert("Ocorreu um erro ao cadastrar o usuário...");
        }
        console.error(error);
      });
  }

  return (
    <div className="w-full h-screen">
      <Main className="px-6 py-20 gap-4 justify-center">
        <Container className="max-w-prose mx-auto flex flex-col justify-center bg-violet-50 px-6 py-20 sm:px-10">
          <h1 className="text-4xl sm:text-5xl font-sans font-semibold mx-auto mb-9 text-violet-950 dark:text-indigo-50">
            Crie{" "}
            <span className="text-indigo-600 dark:text-violet-500">sua</span>{" "}
            conta
          </h1>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <InputField
              type="text"
              name="username"
              label="Nome"
              id="username"
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
              icon={<HiUser />}
            />
            <InputField
              type="email"
              name="email"
              label="Email"
              id="name"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
              icon={<HiMail />}
            />
            <InputField
              type="password"
              name="password"
              label="Senha"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
              icon={<HiLockClosed />}
            />

            <div className="w-full flex justify-center">
              <Link to="/" className="text-violet-500 dark:text-violet-300">
                Voltar para o login
              </Link>
            </div>
            <div>
              <ButtonComponent
                type="submit"
                alt="Salvar"
                onClick={handleSubmit}
                className="bg-violet-600 text-white px-4 py-2 mt-3 rounded-lg"
                content="Salvar"
              />
            </div>
          </form>
        </Container>
      </Main>
    </div>
  );
}

export default SignUp;