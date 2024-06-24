import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import { HiLockClosed, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

import { api } from "../services/api";
import { useNavigate } from "react-router-dom"; // Update this line

import { useAuth } from "../hooks/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use the new hook

  const { signIn } = useAuth()

  const handleSubmit = (e) => {
    signIn({ email, password })
  };

  return (
    <div className="w-full h-screen">
      <Main className="px-6 py-20 gap-4 justify-center">
        <Container className="max-w-prose mx-auto flex flex-col justify-center bg-violet-50 px-6 py-20 sm:px-10">
          <h1 className="text-5xl font-sans font-semibold mx-auto mb-9 text-center text-violet-950 dark:text-indigo-50">
            Bem-vindo <br />
            ao{" "}
            <span className="text-indigo-600 dark:text-violet-500">
              SmartEng
            </span>
            !
          </h1>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <InputField
              type="text"
              name="email"
              label="Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
              icon={<HiUser />}
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
            <Link
              to="/forgot"
              className="text-sm text-violet-500 dark:text-violet-300"
            >
              Esqueceu sua senha?
            </Link>
            <div className="w-full flex justify-center">
              <Link
                to="/register"
                className="text-violet-500 dark:text-violet-300"
              >
                Novo usuário? Crie uma conta
              </Link>
            </div>
            <div>
              <ButtonComponent
                type="submit"
                to="#"
                alt="Login"
                onClick={handleSubmit}
                className="bg-violet-600 text-white px-4 py-2 mt-4 rounded-lg"
                content="Login"
              />
            </div>
          </form>
        </Container>
      </Main>
    </div>
  );
};

export default SignIn;