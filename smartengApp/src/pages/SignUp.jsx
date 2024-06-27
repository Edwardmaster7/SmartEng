import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import { HiLockClosed, HiUser, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { api } from "../services/api";

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

    api
      .post("/users", data)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          return alert(
            `Ocorreu um erro no cadastro:\n${error.response.data.message}`,
          );
        } else {
          alert("Ocorreu um erro ao cadastrar o usuário...");
        }
        console.error(error);
      });
  }

  return (
    <div className="h-screen w-full">
      <Main className="justify-center gap-4 px-6 py-20">
        <Container className="mx-auto flex max-w-prose flex-col justify-center bg-violet-50 px-6 py-20 sm:px-10">
          <h1 className="mx-auto mb-9 font-sans text-4xl font-semibold text-violet-950 sm:text-5xl dark:text-indigo-50">
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
              className="rounded-xl py-3 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-300 dark:bg-indigo-100 dark:focus:outline-indigo-200"
              icon={<HiUser />}
            />
            <InputField
              type="email"
              name="email"
              label="Email"
              id="name"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl py-3 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-300 dark:bg-indigo-100 dark:focus:outline-indigo-200"
              icon={<HiMail />}
            />
            <InputField
              type="password"
              name="password"
              label="Senha"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl py-3 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-300 dark:bg-indigo-100 dark:focus:outline-indigo-200"
              icon={<HiLockClosed />}
            />

            <div className="flex w-full justify-center">
              <Link to="/" className="text-violet-500 dark:text-violet-300">
                Voltar para o login
              </Link>
            </div>
            <div>
              <ButtonComponent
                type="submit"
                alt="Salvar"
                onClick={handleSubmit}
                className="mt-3 rounded-lg bg-violet-600 px-4 py-2 text-white"
                content="Salvar"
              />
            </div>
          </form>
        </Container>
      </Main>
    </div>
  );
};

export default SignUp;
