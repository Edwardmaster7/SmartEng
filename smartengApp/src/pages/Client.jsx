import '/src/index.css';
import Main from '../components/Main';
import Form from '../components/Form';


function Client() {
  return (
    <div className="w-full h-screen">
      <Main className='grid pt-4 pb-16 sm:grid-cols-4 align-center'>
          <div></div>
          <Form className="sm:col-span-2 rounded-lg shadow-xl"></Form>
          <div></div>
      </Main>
    </div>
  );
}

export default Client;