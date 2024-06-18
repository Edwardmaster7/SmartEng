import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import { HiLockClosed, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom"; // Update this line

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use the new hook

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Get the form data
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the login is successful, redirect to the home page
        navigate("/"); // Use navigate instead of history.push
      } else {
        // If the login fails, show an error message
        alert("Invalid username or password");
      }
    } catch (error) {
      // Handle any network errors
      console.error("Error:", error);
      alert(
        "An error occurred while processing your request. Please try again later.",
      );
    }
  };

  return (
    <div className="w-full h-screen">
      <Main className="px-6 py-20 gap-4 justify-center">
        <div></div>
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
              name="username"
              label="Nome ou Email"
              id="username"
              className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
              icon={<HiUser />}
            />

            <InputField
              type="password"
              name="password"
              label="Senha"
              id="password"
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

            <ButtonComponent
              type="submit"
              to="#"
              alt="Login"
              className="bg-violet-600 text-white px-4 py-2 mt-4 rounded-lg"
              content="Login"
            />
          </form>
        </Container>
        <div></div>
      </Main>
    </div>
  );
};

export default SignIn;