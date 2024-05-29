import { InputField } from "./InputField.jsx"
import { ButtonComponent } from "./ButtonComponent.jsx";

export function Form({className}) {

    const brazilianStates = [
        { value: "AC", label: "Acre" },
        { value: "AL", label: "Alagoas" },
        { value: "AP", label: "Amapá" },
        { value: "AM", label: "Amazonas" },
        { value: "BA", label: "Bahia" },
        { value: "CE", label: "Ceará" },
        { value: "DF", label: "Distrito Federal" },
        { value: "ES", label: "Espírito Santo" },
        { value: "GO", label: "Goiás" },
        { value: "MA", label: "Maranhão" },
        { value: "MT", label: "Mato Grosso" },
        { value: "MS", label: "Mato Grosso do Sul" },
        { value: "MG", label: "Minas Gerais" },
        { value: "PA", label: "Pará" },
        { value: "PB", label: "Paraíba" },
        { value: "PR", label: "Paraná" },
        { value: "PE", label: "Pernambuco" },
        { value: "PI", label: "Piauí" },
        { value: "RJ", label: "Rio de Janeiro" },
        { value: "RN", label: "Rio Grande do Norte" },
        { value: "RS", label: "Rio Grande do Sul" },
        { value: "RO", label: "Rondônia" },
        { value: "RR", label: "Roraima" },
        { value: "SC", label: "Santa Catarina" },
        { value: "SP", label: "São Paulo" },
        { value: "SE", label: "Sergipe" },
        { value: "TO", label: "Tocantins" },
    ];

    const doctType = [ { value: "CPF", label: "CPF" }, { value: "CNPJ", label: "CNPJ" } ]

    return (
        <form className={`bg-indigo-50 shadow-md rounded px-4 md:px-8 pt-8 pb-8 mb-4 min-w-96 ${className}`}>

            <InputField label="Obra" id="obra" type="text" placeholder="Nome da obra" className="mb-4" required/>
            
            <InputField label="Nome" id="nome" type="text" placeholder="Seu nome" className="mb-4" required/>
    
            <InputField label="Telefone"  id="telefone" type="tel" placeholder="(00) 00000-0000" className="mb-4" required/>

            <InputField label="Endereço do cliente" id="endereco-cliente" type="textarea" rows="3" maxlength="150" placeholder="Endereço do cliente" className="mb-4" required/>
    
            <InputField label="Endereço do cliente" id="endereco-obra" type="textarea" rows="3" placeholder="Endereço da obra" className="mb-4" required/>
    
            <InputField label="Cidade" id="cidade" type="text" placeholder="Cidade" className="mb-4" required/>
    
            <InputField label="Estado" id="estado" type="select" options={brazilianStates} placeholder="Selecione o estado" className="mb-4" required/>

            <InputField label="CEP" id="cep" type="text" maxLength="11" placeholder="CEP" className="mb-4" required/>
    
            <InputField label="Email" id="email" type="email" placeholder="email@exemplo.com" className="mb-4" required/>
    
            <InputField label="Tipo de obra" id="tipo-obra" type="text" placeholder="Tipo de obra" className="mb-4" required/>
    
            <InputField label="Previsão para o início da obra" id="previsao-inicio" type="date" placeholder="DD/MM/YYYY" className="mb-4" required/>
    
            <InputField label="Área projetada (m²)" id="area-projetada" type="number" placeholder="1200" className="mb-4" required/>
    
            <InputField label="Área construída (m²)" id="area-construida" type="number" placeholder="800" className="mb-4" required/>
    
            <InputField label="Área do terreno (m²)" id="area-terreno" type="number" placeholder="2000" className="mb-4" required/>
    
            <div className="flex items-center justify-between pt-2">
                <ButtonComponent className="bg-indigo-500 px-4 py-2" content="Enviar"/>
            </div>
        </form>
    )
}