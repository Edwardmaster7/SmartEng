import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import { HiLockClosed, HiUser, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
      <div className="w-full h-screen">
        <Main className="px-6 py-20 gap-4 justify-center">
          <div></div>
          <Container className="max-w-prose mx-auto flex flex-col justify-center bg-violet-50 px-6 py-20 sm:px-10">
            <h1 className="text-4xl sm:text-5xl font-sans font-semibold mx-auto mb-9 text-violet-950 dark:text-indigo-50">
              Crie{" "}
              <span className="text-indigo-600 dark:text-violet-500">sua</span>{" "}
              conta
            </h1>
            <form action="" className="flex flex-col gap-4">
              <InputField
                type="text"
                name="text"
                label="Username"
                id="username"
                className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
                icon={<HiUser />}
              />
              <InputField
                type="text"
                name="email"
                label="Email"
                id="username"
                className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
                icon={<HiMail />}
              />
              <InputField
                type="password"
                name="password"
                label="Senha"
                id="password"
                className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
                icon={<HiLockClosed />}
              />

              <div className="w-full flex justify-center">
                <Link to="/" className="text-violet-500 dark:text-violet-300">
                  Voltar para o login
                </Link>
              </div>

              <ButtonComponent
                to="/"
                type="submit"
                alt="Salvar"
                className="bg-violet-600 text-white px-4 py-2 mt-3 rounded-lg"
                content="Salvar"
              />
            </form>
          </Container>
          <div></div>
        </Main>
      </div>
    );
}

export default SignUp;