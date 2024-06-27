import Main from "../components/Main";
import Container from "../components/Container";
import ButtonComponent from "../components/ButtonComponent";

const NotFound = () => {
  return (
    <Main className="justify-center gap-4 px-6 py-32">
      <Container className="relative mx-auto flex max-w-prose animate-fade-in flex-col justify-center bg-violet-50 px-6 pb-20 pt-8 sm:px-10">
        <h1 className="mx-auto mb-9 font-sans text-4xl font-semibold text-violet-950 sm:text-8xl dark:text-indigo-50">
          404
        </h1>
        <h2 className="mx-auto mb-9 font-sans text-4xl font-semibold text-violet-950 sm:text-5xl dark:text-indigo-50">
          Página{" "}
          <span className="text-indigo-600 dark:text-violet-500">não</span>{" "}
          encontrada
        </h2>
        <div className="flex items-center justify-center">
          <ButtonComponent
            id="submit"
            type="submit"
            to="/"
            className="rounded-lg bg-violet-600 px-4 py-2"
            content="Voltar para Home"
          />
        </div>
      </Container>
    </Main>
  );
};

export default NotFound;
