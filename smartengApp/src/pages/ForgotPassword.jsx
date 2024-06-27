import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import { HiLockClosed, HiUser, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="h-screen w-full">
      <Main className="justify-center gap-4 px-6 py-32">
        <Container className="mx-auto flex max-w-prose flex-col justify-center bg-violet-50 px-6 py-20 sm:px-10">
          <h1 className="mx-auto mb-9 font-sans text-4xl font-semibold text-violet-950 sm:text-5xl dark:text-indigo-50">
            Informe{" "}
            <span className="text-indigo-600 dark:text-violet-500">seu</span>{" "}
            email
          </h1>
          <form action="" className="flex flex-col gap-4">
            <InputField
              type="text"
              name="email"
              label="Email"
              id="email"
              className="rounded-xl py-3 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-300 dark:bg-indigo-100 dark:focus:outline-indigo-200"
              icon={<HiMail />}
            />
            <div className="flex w-full justify-center">
              <Link to="/" className="text-violet-500 dark:text-violet-300">
                Voltar para o login
              </Link>
            </div>
            <div>
              <ButtonComponent
                type="submit"
                to="#"
                alt="Enviar email de redefinição de senha"
                className="mt-3 rounded-lg bg-violet-600 px-4 py-2 text-white"
                content="Enviar email de redefinição de senha"
              />
            </div>
          </form>
        </Container>
      </Main>
    </div>
  );
};

export default ForgotPassword;
