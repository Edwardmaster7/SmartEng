import pandas as pd

def substituir_se_condicoes(valor, tipo):
    if pd.isna(valor):  # Verifica se o valor é nulo (pd.NA)
        return valor
    elif "/" in str(valor) and str(valor) != "None":
        if (tipo == "int"):
            return int(str(valor).replace("/", ""))
        elif (tipo == "float"):
            return float(str(valor).replace("/", ""))
        elif (tipo == "string" or tipo == "str"):
            return str(valor).replace("/", "_")
    else:
        return valor

def remover_barra_codigo(df, nome_coluna, tipo):
    df[nome_coluna] = df[nome_coluna].apply(lambda x: substituir_se_condicoes(x, tipo))
    return df

def excel_to_json(excel_file_path, json_file_path, sheet_name=None):
    """Converts an Excel file to JSON, handling UTF-8 characters and replacing spaces with underscores in column names.

    Args:
        excel_file_path: Path to the input Excel file.
        json_file_path: Path to save the output JSON file.
        sheet_name: Name of the sheet to convert (optional).
                    If not provided, all sheets will be converted.
    """

    # Read Excel with explicit encoding for UTF-8
    if sheet_name:
        df = pd.read_excel(excel_file_path, sheet_name=sheet_name, encoding="utf-8")
    else:
        xls = pd.ExcelFile(excel_file_path)
        df = pd.concat([pd.read_excel(xls, sheet_name=name) for name in xls.sheet_names])

    # Replace spaces with underscores in column names
    df.columns = df.columns.str.replace(' ', '_')

    # Apply the function to handle the "CÓDIGO_COMPOSIÇÃO" column
    df = remover_barra_codigo(df, "CÓDIGO_COMPOSIÇÃO", tipo="int")

    # Replace NaN with a placeholder and convert to integer
    df["CÓDIGO_COMPOSIÇÃO"] = df["CÓDIGO_COMPOSIÇÃO"].fillna(-1).astype(int)

    # Optionally, replace the placeholder back with None
    df["CÓDIGO_COMPOSIÇÃO"] = df["CÓDIGO_COMPOSIÇÃO"].replace(-1, None)

    print(df["CÓDIGO_COMPOSIÇÃO"])

    # Ensure proper encoding when writing JSON
    json_data = df.to_json(orient="records", indent=4, force_ascii=False)  
    
    # Open the file using UTF-8 encoding
    with open(json_file_path, "w", encoding="utf-8") as json_file:
        json_file.write(json_data)

    print(f"Conversion successful! JSON file saved to: {json_file_path}")

# Example usage:
excel_file_path = "./Tabela_SINAPI.xlsx"
json_file_path = "./sinapi_data.json"
sheet_name = None  # or specify the sheet name if needed
excel_to_json(excel_file_path, json_file_path, sheet_name)