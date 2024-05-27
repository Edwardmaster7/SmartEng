import { Main } from "../components/Main";
import { Header } from "../components/Header";
import { InputField } from "../components/InputField";
import { ButtonComponent } from "../components/ButtonComponent";
import { Container } from "../components/Container";
import { Field } from "../components/Field";
import { BasicTable } from "../components/Table/BasicTable";

function Quote() {
    return (
      <div className="h-screen w-full">
        <Header />
        <Main className="align-center grid-rows-4 gap-3 p-3">
          <Container className="bg-indigo col-span-4 row-span-1 mx-auto overflow-auto rounded pb-2 pt-0 contain-content">
            <div className="mb-2 flex justify-center rounded-t-lg bg-indigo-600 p-2">
              <span className="font-medium text-indigo-50">
                Orçamento da Obra - Analítico
              </span>
            </div>

            <div className="max-auto grid grid-cols-2 place-content-evenly gap-1 px-2 sm:grid-cols-4">
              <Field
                fieldName="Cliente:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                John Doe
              </Field>
              <Field
                fieldName="Telefone:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                19 996958543
              </Field>
              <Field
                fieldName="Email:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                email@exemplo.com
              </Field>
              <Field
                fieldName="Data Revisão:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                22/05/2024
              </Field>

              <Field
                fieldName="Obra:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                John Doe
              </Field>
              <Field
                fieldName="Data de validade:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                John Doe
              </Field>
              <Field
                fieldName="BDI:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                37%
              </Field>

              <Field
                fieldName="Encargos Sociais:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                John Doe
              </Field>
              <Field
                fieldName="Endereço:"
                className="sm:text-md mt-0 min-h-1 min-w-min gap-0 rounded-md bg-white p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1"
              >
                Av. Paulista, n 8958 Estados unidios
              </Field>
            </div>
          </Container>

          <BasicTable></BasicTable>
        </Main>
      </div>
    );
}

export default Quote;