import '/src/index.css';
import Container from '../components/Container';
import Main from '../components/Main';
import Header from '../components/Header';

function Home() {
  return (
    <div className="w-full h-screen">
      <Header />
      <Main className="flex-col md:grid md:grid-cols-3 md:grid-rows-2 p-4 md:p-8 gap-4">
        <Container className="mx-auto bg-indigo-100 min-h-64"></Container>
        <Container className="mx-auto bg-indigo-100 min-h-64"></Container>
        <Container className="mx-auto bg-indigo-100 min-h-64"></Container>
        <Container className="mx-auto bg-indigo-100 min-h-64"></Container>
        <Container className="mx-auto bg-indigo-100 min-h-64"></Container>
        <Container className="mx-auto bg-indigo-100 min-h-64"></Container>
      </Main>
    </div>
  );
}

export default Home;