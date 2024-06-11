import { useState, useEffect, useMemo } from "react";
import TableComponent from "../components/Table/TableComponent"; // Adjust the import path as necessary
import Main from "../components/Main";
import Container from "../components/Container";
import Field from "../components/Field";
import { isNumeric, formatFloat, calculateFieldSum } from "./Quote";

function Stages() {
  const [data, setData] = useState([]);

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

  const BDI = 37;
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

  const processedData = useMemo(() => {
    const stages = [...new Set(data.map((item) => item.Stage))];
    const columnSummaries = {
      MO: 0,
      Material: 0,
      LS: 0,
      BDI: 0,
      Total: 0,
      TotalPerc: 0,
    };

    const calcMO = (stage) => calculateFieldSumByStages("VU_MO", stage, data);
    
    const calcMaterial = (stage) =>
      calculateFieldSumByStages("VU_Material", stage, data);

    const calcSocialLaws = (stage) =>
      calculateFieldSumByStages("VU_MO", stage, data) * (socialCharges / 100);

    const calcBDI = (stage) =>
      (calculateFieldSumByStages("Total", stage, data) + calcSocialLaws(stage)) *
      (BDI / 100);

    const calcTotal = (stage) => calcBDI(stage) + calcMO(stage) + calcMaterial(stage) + calcSocialLaws(stage);

    const stageData = stages.map((stage) => {
      const stageObj = {
        Stage: stage,
        MO: calcMO(stage),
        Material: calcMaterial(stage),
        LS: calcSocialLaws(stage),
        BDI: calcBDI(stage),
        Total:
          calcTotal(stage),
        TotalPerc:
          (calcTotal(stage) / totalCost) * 100,
      };

      // Update column summaries
      columnSummaries.MO += stageObj.MO;
      columnSummaries.Material += stageObj.Material;
      columnSummaries.LS += stageObj.LS;
      columnSummaries.BDI += stageObj.BDI;
      columnSummaries.Total += stageObj.Total;
      columnSummaries.TotalPerc += stageObj.TotalPerc;

      return stageObj;
    });

    return { stageData, columnSummaries };
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "Etapa",
        accessorKey: "Stage",
      },
      {
        header: "M.O.",
        accessorKey: "MO",
        cell: ({ getValue }) => formatFloat(getValue()),
      },
      {
        header: "Material",
        accessorKey: "Material",
        cell: ({ getValue }) => formatFloat(getValue()),
      },
      {
        header: "L.S.",
        accessorKey: "LS",
        cell: ({ getValue }) => formatFloat(getValue()),
      },
      {
        header: "BDI",
        accessorKey: "BDI",
        cell: ({ getValue }) => formatFloat(getValue()),
      },
      {
        header: "Total",
        accessorKey: "Total",
        cell: ({ getValue }) => formatFloat(getValue()),
      },
      {
        header: "% do Total",
        accessorKey: "TotalPerc",
        cell: ({ getValue }) => formatFloat(getValue()),
      },
    ],
    [],
  );

  const fieldClassName = "sm:text-md mt-0 min-h-1 gap-0 rounded-md bg-white dark:bg-indigo-500 p-1 text-sm shadow-md sm:gap-1 lg:flex-row lg:gap-1 text-inherit"

  return (
    <div className="w-full">
      <Main className="pt-8 pb-16 h-auto ">
        <TableComponent
          data={processedData.stageData}
          columns={columns}
          hasHeader={true}
          hasUtilityBar={false}
          hasPagination={false}
          hasRemoveRowButton={false}
        />
        <Container className="flex mt-4 contain-content mx-auto">
          <div className="flex-col bg-indigo-600 dark:bg-indigo-700 p-2">
            <span className="font-medium text-indigo-50">Total</span>
          </div>
          <Container className="mx-auto sm:overflow-auto md:max-h-52 rounded-t-none pb-2 pt-2 max-h-dvh text-indigo-950 dark:text-violet-50">
            <div className="max-auto grid grid-cols-3 place-content-evenly gap-1 px-2 sm:grid-cols-6 text-inherit">
              <Field fieldName="M.O.:" className={fieldClassName}>
                {`R$ ${formatFloat(processedData.columnSummaries.MO)}`}
              </Field>
              <Field fieldName="Material:" className={fieldClassName}>
                {`R$ ${formatFloat(processedData.columnSummaries.Material)}`}
              </Field>
              <Field fieldName="Leis Sociais:" className={fieldClassName}>
                {`R$ ${formatFloat(processedData.columnSummaries.LS)}`}
              </Field>
              <Field fieldName="BDI:" className={fieldClassName}>
                {`R$ ${formatFloat(processedData.columnSummaries.BDI)}`}
              </Field>
              <Field fieldName="Total:" className={fieldClassName}>
                {`R$ ${formatFloat(totalCost)}`}
              </Field>
              <Field fieldName="% do Total:" className={fieldClassName}>
                {`R$ ${formatFloat(processedData.columnSummaries.TotalPerc)}`}
              </Field>
            </div>
          </Container>
        </Container>
        <Container className="flex mt-4 contain-content mx-auto w-6/12">
          <div className="flex-col bg-indigo-600 dark:bg-indigo-700 p-2">
            <span className="font-medium text-indigo-50">Insights</span>
          </div>
          <Container className="mx-auto sm:overflow-auto md:max-h-52 rounded-t-none pb-2 pt-2 max-h-dvh text-indigo-950 dark:text-violet-50">
            <div className="max-auto grid grid-cols-2 place-content-evenly gap-1 px-2 text-inherit">
              <Field fieldName="Mão de Obra:" className={fieldClassName}>
                {`${formatFloat(((processedData.columnSummaries.MO + processedData.columnSummaries.LS + processedData.columnSummaries.BDI) / processedData.columnSummaries.Total) * 100)}%`}
              </Field>
              <Field fieldName="Material:" className={fieldClassName}>
                {`${formatFloat((processedData.columnSummaries.Material / processedData.columnSummaries.Total) * 100)}%`}
              </Field>
            </div>
          </Container>
        </Container>
      </Main>
    </div>
  );
}

export default Stages;

export const calculateFieldSumByStages = (field, stage, data) => {
  if (data.length === 0) return 0;

  const stageItems = data.filter((item) => item.Stage === stage);

  if (stageItems.length === 0) {
    return 0;
  }

  if (isNumeric(stageItems[0][field])) {
    // Sum numeric fields
    if (field === "VU_Material" || field === "VU_MO") {
      return stageItems.reduce(
        (sum, row) => sum + parseFloat(row[field]) * parseFloat(row["Qtd"]),
        0,
      );
    }
    return stageItems.reduce(
      (sum, row) => sum + parseFloat(row[field] || 0),
      0,
    );
  } else {
    // Count non-numeric fields
    return stageItems.length;
  }
};