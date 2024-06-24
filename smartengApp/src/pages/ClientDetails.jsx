import Main from "../components/Main"
import Container from "../components/Container"
import Header from "../components/Header"
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";


function ClientDetails() {
  return (
    <div className="w-full h-screen">
      <Main className="px-6 py-20 gap-4 justify-center">
        <Container className="max-w-prose mx-auto flex flex-col justify-center bg-violet-50 px-6 py-20 sm:px-10">
          <Link to="/" className="absolute z-10 left-9 top-9">
            <HiArrowLeft className="text-3xl text-violet-800 dark:text-violet-200 dark:hover:text-violet-50 hover:text-violet-400 hover:cursor-pointer" />
          </Link>

          <h1>Client Details</h1>
        </Container>
      </Main>
    </div>
  );
}

export default ClientDetails