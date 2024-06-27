import Field from "../components/Field"
import Main from "../components/Main"
import Container from "../components/Container"
import InputField from "../components/InputField"
import { useState, useEffect, useMemo, useCallback } from "react"
import { calculateFieldSumByStages } from "./Stages"
import { formatFloat, calculateFieldSum } from "./Quotes"
import Header from "../components/Header"

const BDI = () => {
  const [data, setData] = useState([])
  const [BDI, setBDI] = useState(0)
  const [BDIFactor, setBDIFactor] = useState(0)
  const [profitPercent, setprofitPercent] = useState(10)
  const [profit, setProfit] = useState(10)
  const [indirectExpenses, setIndirectExpenses] = useState({
    centralAdmin: 0,
    riskAndContigency: 0,
    loan: 0,
  })
  const [indirectExpensesPerc, setIndirectExpensesPerc] = useState({
    centralAdminPerc: 4,
    riskAndContigencyPerc: 2,
    loanPerc: 2,
  })
  const [taxes, setTaxes] = useState({
    COFINS: 3,
    PIS: 0.65,
    CSLL: 1.08,
    IRPJ: 1.2,
    ISS: 5,
  })
  const [totalIndirectExpenses, setTotalIndirectExpenses] = useState(0)
  const [taxValue, setTaxValue] = useState({
    COFINS: 0,
    PIS: 0,
    CSLL: 0,
    IRPJ: 0,
    ISS: 0,
  })
  const [totalTaxes, setTotalTaxes] = useState(0)
  const [totalTaxesValue, setTotalTaxesValue] = useState(0)

  const socialCharges = 84
  const totalMaterialCost = useMemo(
    () => calculateFieldSum("VU_Material", data),
    [data],
  )

  const totalLaborCost = useMemo(
    () => calculateFieldSum("VU_MO", data),
    [data],
  )
  const totalItems = useMemo(() => calculateFieldSum("Item", data), [data])
  const totalBuildingCost = useMemo(
    () => calculateFieldSum("Total", data),
    [data],
  )
  const socialLaws = totalLaborCost * (socialCharges / 100)

  const initialCost = totalBuildingCost + socialLaws

  const revenueValue =
    (totalIndirectExpenses + initialCost) /
    (1 - (totalTaxes + profitPercent) / 100)

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("quote-table-data")
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
      }
    }

    fetchData()
  }, [])

  const calculateIndirectExpenses = useCallback(() => {
    const { centralAdminPerc, riskAndContigencyPerc, loanPerc } =
      indirectExpensesPerc
    const centralAdmin = initialCost * (centralAdminPerc / 100)
    const riskAndContigency = initialCost * (riskAndContigencyPerc / 100)
    const loan = initialCost * (loanPerc / 100)

    const obj = {
      centralAdmin,
      riskAndContigency,
      loan,
    }

    setIndirectExpenses(obj)
  }, [initialCost, indirectExpensesPerc])

  const calculateTotalIndirectExpenses = useCallback(() => {
    const { centralAdmin, riskAndContigency, loan } = indirectExpenses
    const total = centralAdmin + riskAndContigency + loan
    setTotalIndirectExpenses(total)

    return total
  }, [indirectExpenses])

  const calculateTaxes = useCallback(() => {
    const { COFINS, PIS, CSLL, IRPJ, ISS } = taxes
    const valueCOFINS = initialCost * (COFINS / 100)
    const valuePIS = initialCost * (PIS / 100)
    const valueCSLL = initialCost * (CSLL / 100)
    const valueIRPJ = initialCost * (IRPJ / 100)
    const valueISS = initialCost * (ISS / 100)

    const totalTaxesValue =
      valueCOFINS + valuePIS + valueCSLL + valueIRPJ + valueISS
    setTotalTaxesValue(totalTaxesValue)
    setTotalTaxes(COFINS + PIS + CSLL + IRPJ + ISS)

    const obj = {
      COFINS: valueCOFINS,
      PIS: valuePIS,
      CSLL: valueCSLL,
      IRPJ: valueIRPJ,
      ISS: valueISS,
    }

    setTaxValue(obj)
  }, [taxes, initialCost])

  const calculateProfit = useCallback(() => {
    const value = initialCost * (profitPercent / 100)
    setProfit(value)
  }, [initialCost, profitPercent])

  const calculateBDI = useCallback(() => {
    const value = revenueValue / initialCost
    setBDIFactor(value)
    setBDI((value - 1) * 100)
  })

  useEffect(() => {
    calculateIndirectExpenses()
  }, [calculateIndirectExpenses, initialCost, indirectExpensesPerc])

  useEffect(() => {
    calculateTotalIndirectExpenses()
  }, [calculateTotalIndirectExpenses, indirectExpenses])

  useEffect(() => {
    calculateTaxes()
  }, [calculateTaxes, taxes, initialCost])

  useEffect(() => {
    calculateProfit()
  }, [calculateProfit, initialCost, profitPercent])

  useEffect(() => {
    calculateBDI()
  }, [calculateBDI, revenueValue, initialCost])

  return (
    <div className="w-full">
      <Header />
      <Main className="pt-8 pb-16 h-auto text-indigo-950 dark:text-violet-50">
        <Container className="mx-auto py-8 px-24 bg-violet-50">
          <div className="rounded-l-2xl contain-content">
            <table className="w-full text-left text-sm text-violet-500 dark:text-violet-200">
              <tbody>
                <tr>
                  <td className="px-6 text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                    FATOR BDI
                  </td>
                  <td className="border-t px-6 py-4">
                    {formatFloat(BDIFactor)}%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                    BDI
                  </td>
                  <td className="border-t px-6 py-4">{formatFloat(BDI)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
        <Container className="mx-auto py-8 px-20 bg-violet-50 mt-4">
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
                    <td className="border-t px-6 py-4">
                      {formatFloat(indirectExpensesPerc.centralAdminPerc)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(indirectExpenses.centralAdmin)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t px-6 py-4">
                      Riscos e contigenciamento
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(indirectExpensesPerc.riskAndContigencyPerc)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(indirectExpenses.riskAndContigency)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t px-6 py-4">
                      Custo Financeiro (empréstimo)
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(indirectExpensesPerc.loanPerc)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(indirectExpenses.loan)}
                    </td>
                  </tr>
                  <tr className="text-xs font-semibold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                    <td className="border-t px-6 py-4">
                      Total de Despesas Indiretas
                    </td>
                    <td className="border-t px-6 py-4">8%</td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(totalIndirectExpenses)}
                    </td>
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
                      {formatFloat(taxes.COFINS)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(taxValue.COFINS)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                      PIS
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(taxes.PIS)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(taxValue.PIS)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                      ISS
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(taxes.ISS)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(taxValue.ISS)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                      IRPJ
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(taxes.IRPJ)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(taxValue.IRPJ)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                      CSLL
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(taxes.CSLL)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(taxValue.CSLL)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                      LUCRO
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(profitPercent)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(profit)}
                    </td>
                  </tr>
                  <tr className="text-xs font-semibold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                    <td className="border-t px-6 py-4">
                      Total (Imposto mais Lucro)
                    </td>
                    <td className="border-t px-6 py-4">
                      {formatFloat(totalTaxes + profitPercent)}%
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(profit + totalTaxesValue)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full text-left text-sm text-violet-500 dark:text-violet-200 mt-4">
                <tbody>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-white dark:bg-violet-200">
                      Valor bruto
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(totalIndirectExpenses + initialCost)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 border-t text-xs font-bold text-indigo-950 uppercase bg-violet-100 dark:bg-violet-300">
                      Valor de venda
                    </td>
                    <td className="border-t px-6 py-4">
                      R$ {formatFloat(revenueValue)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Main>
    </div>
  )
}
export default BDI
