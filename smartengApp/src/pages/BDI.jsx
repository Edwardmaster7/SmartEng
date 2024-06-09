import Field from "../components/Field"
import Main from "../components/Main"
import Container from "../components/Container"
import InputField from "../components/InputField"
import { useState, useEffect, useMemo } from "react";
import { calculateFieldSumByStages } from "./Stages";
import { formatFloat, calculateFieldSum } from "./Quote";

const BDI = () => {

  const [data, setData] = useState([]);
  const [BDI, setBDI] = useState(0);
  const [profit, setProfit] = useState(10);
  const [indirectExpenses, setIndirectExpenses] = useState([])
  const [taxes, setTaxes] = useState([])
  const [totalIndirectExpenses, setTotalIndirectExpenses] = useState(0)
  const [totalTaxes, setTotalTaxes] = useState(0)

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("quote-table-data");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      }
    };

    fetchData();
  }, []);

  // taxes percentage
  const COFINS = 0.03
  const PIS = 0.0065
  const CSLL = 0.0108
  const IRPJ = 0.0120
  const ISS = 0.05

  

  const socialCharges = 84;
  const totalMaterialCost = useMemo(
    () => calculateFieldSum("VU_Material", data),
    [data],
  );

  const totalLaborCost = useMemo(
    () => calculateFieldSum("VU_MO", data),
    [data],
  );
  const totalItems = useMemo(() => calculateFieldSum("Item", data), [data]);
  const totalBuildingCost = useMemo(
    () => calculateFieldSum("Total", data),
    [data],
  );
  const socialLaws = totalLaborCost * (socialCharges / 100);
  const calcBDI = (totalBuildingCost + socialLaws) * (BDI / 100);
  const totalCost = totalBuildingCost + socialLaws + calcBDI;

  const initialCost = totalBuildingCost + socialLaws

  return (
    <div className="w-full">
      <Main className="pt-8 pb-16 h-auto text-indigo-950 dark:text-violet-50">
        <Container className="mx-auto py-8 px-24 bg-indigo-50">
          <div className="rounded-l-2xl contain-content">
            <table className="w-full text-left text-sm text-violet-500 dark:text-violet-200">
              <tbody>
                <tr>
                  <td className="px-6 text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                    FATOR BDI
                  </td>
                  <td className="border-t px-6 py-4">3,00%</td>
                </tr>
                <tr>
                  <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                    BDI
                  </td>
                  <td className="border-t px-6 py-4">3,00%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
        <Container className="mx-auto py-8 px-20 bg-indigo-50 mt-4">
          <div className="">
            <div className="flex flex-row flex-wrap contain-content place-content-center gap-4 mb-4 text-xl">
              <label className="font-semibold text-inherit ">
                Custo inicial da obra
              </label>
              <span className="text-inherit opacity-80">
                R$ {formatFloat(initialCost)}
              </span>
            </div>
            <div className="flex flex-row flex-wrap rounded-xl contain-content place-content-center gap-4">
              <table className="w-full text-left text-sm text-violet-500 dark:text-violet-200">
                <thead className="text-xs text-indigo-950 uppercase bg-white dark:bg-violet-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Custos e despesas indiretas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Porcentagem
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-t px-6 py-4">
                      Administração Central
                    </td>
                    <td className="border-t px-6 py-4">100%</td>
                    <td className="border-t px-6 py-4">R$ 13.301,71</td>
                  </tr>
                  <tr>
                    <td className="border-t px-6 py-4">
                      Riscos e contigenciamento
                    </td>
                    <td className="border-t px-6 py-4">100%</td>
                    <td className="border-t px-6 py-4">R$ 6.650,85</td>
                  </tr>
                  <tr>
                    <td className="border-t px-6 py-4">
                      Custo Financeiro (empréstimo)
                    </td>
                    <td className="border-t px-6 py-4">100%</td>
                    <td className="border-t px-6 py-4">R$ 6.650,85</td>
                  </tr>
                  <tr className="text-xs font-semibold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                    <td className="border-t px-6 py-4">
                      Total de Despesas Indiretas
                    </td>
                    <td className="border-t px-6 py-4">8%</td>
                    <td className="border-t px-6 py-4">R$ 26.603,41</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-row flex-wrap contain-content place-content-center text-xl">
                <p className="font-semibold text-inherit">
                  Impostos federais, municipais e lucro presumido
                </p>
              </div>

              <table className="w-full text-left text-sm text-violet-500 dark:text-violet-200">
                <tbody>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                      COFINS
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(COFINS * 100)}%
                    </td>
                    <td className="border-t px-6 py-4">R$ 13.301,71</td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                      PIS
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(PIS * 100)}%
                    </td>
                    <td className="border-t px-6 py-4">R$ 6.650,85</td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                      ISS
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(ISS * 100)}%
                    </td>
                    <td className="border-t px-6 py-4">R$ 6.650,85</td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                      IRPJ
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(IRPJ * 100)}%
                    </td>
                    <td className="border-t px-6 py-4">R$ 6.650,85</td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                      CSLL
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(CSLL * 100)}%
                    </td>
                    <td className="border-t px-6 py-4">R$ 6.650,85</td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                      LUCRO
                    </td>
                    <td className="border-t px-6 py-4">{profit}%</td>
                    <td className="border-t px-6 py-4">
                      R$ 
                    </td>
                  </tr>
                  <tr className="text-xs font-semibold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                    <td className="border-t px-6 py-4">Total</td>
                    <td className="border-t px-6 py-4">
                      2{formatFloat(totalTaxes + profit)}%
                    </td>
                    <td className="border-t px-6 py-4">R$ 26.603,41</td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full text-left text-sm text-violet-500 dark:text-violet-200 mt-4">
                <tbody>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                      Valor bruto
                    </td>
                    <td className="border-t px-6 py-4">R$ 26.603,41</td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                      Valor de venda
                    </td>
                    <td className="border-t px-6 py-4">R$ 26.603,41</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Main>
    </div>
  );
}
export default BDI