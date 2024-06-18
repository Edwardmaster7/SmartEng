import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import { HiLockClosed, HiUser, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // Perform the signUp logic here (e.g., send a request to the server to create a new user)
    try {
      // Example: Send a POST request to a server-side endpoint to create a new user
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // If the signUp was successful, navigate to the desired route
        navigate("/");
      } else {
        // If the signUp failed, show an error message to the user
        alert("Failed to create an account. Please try again.");
      }
    } catch (error) {
      // If there was an error during the signUp process, show an error message to the user
      alert(
        "An error occurred while creating an account. Please try again later.",
      );
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <Main className="px-6 py-20 gap-4 justify-center">
        <Container className="max-w-prose mx-auto flex flex-col justify-center bg-violet-50 px-6 py-20 sm:px-10">
          <h1 className="text-4xl sm:text-5xl font-sans font-semibold mx-auto mb-9 text-violet-950 dark:text-indigo-50">
            Crie{" "}
            <span className="text-indigo-600 dark:text-violet-500">sua</span>{" "}
            conta
          </h1>
          <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              type="text"
              name="username"
              label="Nome"
              id="username"
              className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
              icon={<HiUser />}
            />
            <InputField
              type="text"
              name="email"
              label="Email"
              id="name"
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
      </Main>
    </div>
  );
}

export default SignUp;