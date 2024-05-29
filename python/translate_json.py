import json
from deep_translator import GoogleTranslator

def traduzir_campos(data, target_language=None):
    """Traduz os campos de cada item no JSON usando a biblioteca deep_translator."""

    translator = GoogleTranslator(source='auto', target=target_language)  # Detectar idioma de origem automaticamente

    # Dicionário para armazenar as traduções dos campos
    traducoes = {}

    # Traduzir os campos do primeiro item
    for campo_original in list(data[0].keys()):
        try:
            campo_traduzido = translator.translate(campo_original)
            traducoes[campo_original] = campo_traduzido

            # Atualiza o campo apenas se a tradução for diferente do original
            if campo_traduzido != campo_original:
                data[0][campo_traduzido] = data[0].pop(campo_original)
                print(f"Traduzido '{campo_original}' para '{campo_traduzido}'")

        except Exception as e:  # Captura qualquer erro na tradução
            print(f"Erro ao traduzir '{campo_original}': {e}")
            traducoes[campo_original] = campo_original  # Mantém o original

    # Aplicar as traduções aos demais itens
    for item in data[1:]:
        for campo_original, campo_traduzido in traducoes.items():
            if campo_original in item:
                item[campo_traduzido] = item.pop(campo_original)

    return data

def translate_json(input_file, output_file_path, language=None):
    with open(input_file, "r", encoding="utf-8") as json_file:
        data = json.load(json_file)

    translated_data = traduzir_campos(data, target_language=language)

    json_data = json.dumps(translated_data, indent=4, ensure_ascii=False)
    
    with open(output_file_path, "w", encoding="utf-8") as json_file:
        json_file.write(json_data)
    
    print(f"\nJSON traduzido com sucesso! Salvo em: {output_file_path}")


input_file = "./sinapi_data.json"
output_file_path = "sinapi.json"
language = "en"

translate_json(input_file, output_file_path, language=language)