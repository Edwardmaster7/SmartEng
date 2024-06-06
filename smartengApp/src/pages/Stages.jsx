import { useState, useEffect, useMemo } from "react";
import TableComponent from "../components/Table/TableComponent"; // Adjust the import path as necessary
import Main from "../components/Main";

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

  // Utility function to check if a value is numeric
  const isNumeric = (value) => {
    return !isNaN(value - parseFloat(value));
  };

  const calculateField = (field, stage) => {
    if (data.length === 0) return 0;

    const stageItems = data.filter((item) => item.Stage === stage);

    if (stageItems.length === 0) {
      return 0
    };

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

  const calculateFieldWithoutStage = (field) => {
    if (data.length === 0) return 0;

    if (isNumeric(data[0][field])) {
      // Sum numeric fields
      if (field === "VU_Material" || field === "VU_MO") {
        return data.reduce(
          (sum, row) => sum + parseFloat(row[field]) * parseFloat(row["Qtd"]),
          0,
        );
      }

      return data.reduce((sum, row) => sum + parseFloat(row[field] || 0), 0);
    } else {
      // Count non-numeric fields
      return data.length;
    }
  }

  const BDI = 37;
  const socialCharges = 84;
  const totalMaterialCost = useMemo(
    () => calculateFieldWithoutStage("VU_Material"),
    [data],
  );

  const totalLaborCost = useMemo(() => calculateFieldWithoutStage("VU_MO"), [data]);
  const totalItems = useMemo(() => calculateFieldWithoutStage("Item"), [data]);
  const totalBuildingCost = useMemo(() => calculateFieldWithoutStage("Total"), [data]);
  const socialLaws = totalLaborCost * (socialCharges / 100);
  const calcBDI = (totalBuildingCost + socialLaws) * (BDI / 100);
  const totalCost = totalBuildingCost + socialLaws + calcBDI;

  const processedData = useMemo(() => {
    const stages = [...new Set(data.map((item) => item.Stage))];
    return stages.map((stage) => {
      return {
        Stage: stage,
        MO: calculateField("VU_MO", stage),
        Material: calculateField("VU_Material", stage),
        LS: calculateField("VU_MO", stage) * (socialCharges / 100),
        BDI:
          (BDI / 100) *
          (calculateField("Total", stage) +
            calculateField("VU_MO", stage) * (socialCharges / 100)),
        Total:
          calculateField("VU_MO", stage) * (socialCharges / 100) +
          (BDI / 100) *
            (calculateField("Total", stage) +
              calculateField("VU_MO", stage) * (socialCharges / 100)) +
          calculateField("VU_MO", stage) +
          calculateField("VU_Material", stage),
        TotalPerc: ((calculateField("VU_MO", stage) * (socialCharges / 100) +
          (BDI / 100) *
            (calculateField("Total", stage) +
              calculateField("VU_MO", stage) * (socialCharges / 100)) +
          calculateField("VU_MO", stage) +
          calculateField("VU_Material", stage)) / totalCost) * 100,
      };
    });
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
        cell: ({ getValue }) => getValue().toFixed(2),
      },
      {
        header: "Material",
        accessorKey: "Material",
        cell: ({ getValue }) => getValue().toFixed(2),
      },
      {
        header: "L.S.",
        accessorKey: "LS",
        cell: ({ getValue }) => getValue().toFixed(2),
      },
      {
        header: "BDI",
        accessorKey: "BDI",
        cell: ({ getValue }) => getValue().toFixed(2),
      },
      {
        header: "Total",
        accessorKey: "Total",
        cell: ({ getValue }) => getValue().toFixed(2),
      },
      {
        header: "% do Total",
        accessorKey: "TotalPerc",
        cell: ({ getValue }) => getValue().toFixed(2),
      },
    ],
    [],
  );

  console.log(
    `totalCost: ${totalCost} totalFor Serviços Iniciais: ${calculateField("Total", "SERVIÇOS INICIAIS")}`,
  );
  
  return (
    <div className="w-full">
      <Main className="pt-8 pb-16 h-auto">
        <TableComponent
          data={processedData}
          columns={columns}
          hasHeader={true}
          hasUtilityBar={false}
          hasPagination={false}
          hasRemoveRowButton={false}
        />
      </Main>
    </div>
  );
}

export default Stages;