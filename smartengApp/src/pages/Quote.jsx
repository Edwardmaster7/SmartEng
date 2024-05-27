import { Main } from "../components/Main";
import { Header } from "../components/Header";
import { InputField } from "../components/InputField";
import { ButtonComponent } from "../components/ButtonComponent";
import { Container } from "../components/Container";
import { Field } from "../components/Field";


function Quote() {
    return (
        <div className="w-full h-screen">
            <Header />
            <Main className="p-3 grid-rows-4 align-center gap-3">      
            
                <Container className="bg-indigo pt-0 pb-2 mx-auto row-span-1 col-span-4 rounded contain-content overflow-auto">
                    <div className="bg-indigo-600 rounded-t-lg flex justify-center p-2 mb-2"><span className="text-indigo-50 font-medium">Orçamento da Obra - Analítico</span></div>

                    <div className="grid sm:grid-cols-4 px-2 gap-1 place-content-evenly max-auto grid-cols-2">
                        <Field fieldName="Cliente:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">John Doe</Field>
                        <Field fieldName="Telefone:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">19 996958543</Field>
                        <Field fieldName="Email:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">email@exemplo.com</Field>
                        <Field fieldName="Data Revisão:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">22/05/2024</Field>
                        
                        <Field fieldName="Obra:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">John Doe</Field>
                        <Field fieldName="Data de validade:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">John Doe</Field>
                        <Field fieldName="BDI:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">37%</Field>
                        
                        <Field fieldName="Encargos Sociais:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">John Doe</Field>
                        <Field fieldName="Endereço:" className="min-h-1 sm:text-md mt-0 sm:gap-1 bg-white rounded-md p-1 shadow-md text-sm gap-0 min-w-min lg:flex-row lg:gap-1">Av. Paulista, n 8958 Estados unidios</Field>
                    </div>
                </Container>
                    
                <Container className="p-6 mx-auto col-span-4 gap-1 row-span-8">
                         
                </Container>
            </Main>
        </div>
    )
}

export default Quote;