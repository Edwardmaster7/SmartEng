import Main from "../components/Main";
import Container from "../components/Container";
import ButtonComponent from "../components/ButtonComponent";

const NotFound = () => {
  return (
    <Main className="px-6 py-32 gap-4 justify-center">
      <Container className="animate-fade-in max-w-prose relative mx-auto flex flex-col justify-center bg-violet-50 px-6 pt-8 pb-20 sm:px-10">
        <h1 className="text-4xl sm:text-8xl font-sans font-semibold mx-auto mb-9 text-violet-950 dark:text-indigo-50">
          404
        </h1>
        <h2 className="text-4xl sm:text-5xl font-sans font-semibold mx-auto mb-9 text-violet-950 dark:text-indigo-50">
          Página{" "}
          <span className="text-indigo-600 dark:text-violet-500">não</span>{" "}
          encontrada
        </h2>
        <div className="flex items-center justify-center">
         
        <ButtonComponent
          id="submit"
          type="submit"
          to="/"
          className="bg-violet-600 rounded-lg px-4 py-2"
          content="Voltar para Home"
        />
        </div>
      </Container>
    </Main>
  );
};

export default NotFound;