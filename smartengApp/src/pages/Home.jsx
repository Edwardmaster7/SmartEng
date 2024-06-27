import "/src/index.css";
import Container from "../components/Container";
import Main from "../components/Main";
import Header from "../components/Header";
import { useAuth } from "../hooks/auth";

function Home() {
  const { user } = useAuth();

  return (
    <div className="h-screen w-full">
      <Header />
      <Main className="flex-col gap-4 p-4 md:grid md:grid-cols-3 md:grid-rows-4 md:p-8">
        <Container className="col-span-2 row-span-2 bg-violet-50 p-6">
          <h1 className="text-3xl font-semibold text-violet-950 dark:text-indigo-50">
            Bom te ver de novo,{" "}
            <span className="text-violet-600 dark:text-violet-500">
              {user.name}
            </span>
            !
          </h1>
        </Container>
        <Container className="row-span-2 bg-violet-50"></Container>
        <Container className="row-span-2 bg-violet-50"></Container>
        <Container className="row-span-1 bg-violet-50"></Container>
      </Main>
    </div>
  );
}

export default Home;
