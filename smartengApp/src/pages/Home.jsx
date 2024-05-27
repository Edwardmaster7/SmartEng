import '/src/index.css';
import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { Main } from '../components/Main';


function Home() {
  const route = (e) => {
    e.preventDefault();
    // Implement your routing logic here
  };

  return (
    <div className="w-full h-screen">
        <Header route={route}></Header>
        <Main className='grid-cols-3 grid-rows-2 p-8 gap-4'>
          <Container className="mx-auto bg-indigo-100"></Container>
          <Container className="mx-auto bg-indigo-100"></Container>
          <Container className="mx-auto bg-indigo-100"></Container>
          <Container className="mx-auto bg-indigo-100"></Container>
          <Container className="mx-auto bg-indigo-100"></Container>
          <Container className="mx-auto bg-indigo-100"></Container>
        </Main>
    </div>
  );
}

export default Home;