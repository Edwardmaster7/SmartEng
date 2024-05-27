import pandas as pd

def excel_to_json(excel_file_path, json_file_path, sheet_name=None):
    """Converts an Excel file to JSON, handling UTF-8 characters.

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

    # Ensure proper encoding when writing JSON
    json_data = df.to_json(orient="records", indent=4, force_ascii=False)  
    
    # Open the file using UTF-8 encoding
    with open(json_file_path, "w", encoding="utf-8") as json_file:
        json_file.write(json_data)

    print(f"Conversion successful! JSON file saved to: {json_file_path}")

# Example usage:
excel_file_path = "./Tabela_valores.xlsx"
json_file_path = "./output_data.json"

# To convert a specific sheet:
# excel_to_json(excel_file_path, json_file_path, sheet_name="Sheet1") 

# To convert all sheets:
excel_to_json(excel_file_path, json_file_path)
