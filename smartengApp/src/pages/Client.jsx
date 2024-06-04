import "/src/index.css";
import Main from "../components/Main";
import Form from "../components/Form";

function Client() {
  return (
    <div className="w-full h-screen">
      <Main className="grid pt-4 pb-16 grid-cols-3 sm:grid-cols-5 lg:grid-cols-4 align-center">
        <div></div>
        <Form className="col-span-1 sm:col-span-3 lg:col-span-2  xl:col-span-2 rounded-xl shadow-xl"></Form>
        <div></div>
      </Main>
    </div>
  );
}

export default Client;
