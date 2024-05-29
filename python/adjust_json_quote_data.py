import json
from deep_translator import GoogleTranslator

def traduzir_campos(data, target_language="en"):
    """Traduz os campos de cada item no JSON usando a biblioteca deep_translator."""

    translator = GoogleTranslator(source='auto', target=target_language)  # Detectar idioma de origem automaticamente

    for item in data:
        for campo_original in list(item.keys()):  # Iterar sobre uma cópia das chaves para evitar problemas ao modificar o dicionário
            try:
                campo_traduzido = translator.translate(campo_original)

                # Atualiza o campo apenas se a tradução for diferente do original
                if campo_traduzido != campo_original:
                    item[campo_traduzido] = item.pop(campo_original)
                    print(f"Traduzido '{campo_original}' para '{campo_traduzido}'")

            except Exception as e:  # Captura qualquer erro na tradução
                print(f"Erro ao traduzir '{campo_original}': {e}")
                # Opcional: Você pode definir um valor padrão para o campo traduzido
                # item[campo_original] = campo_original  # Mantém o original
            
    return data

def encontrar_maior_x(dados):
  """Encontra o maior valor 'x' em itens do tipo 'x.0' nos dados."""
  maior_x = 0
  for item in dados:
    item_str = str(item["Item"])  # Converter o valor 'Item' para string
    if item_str.endswith(".0"):  # Verificar se é um item do tipo 'x.0'
      x = int(float(item_str))  # Converter para inteiro (tratando possíveis floats)
      maior_x = max(maior_x, x)  # Atualizar o maior_x se necessário
  print(f"maior índice {maior_x}")
  return maior_x


def transformar_json(data, language=None):

    x = encontrar_maior_x(data)  # Encontrar o maior valor 'x'

    for i in range(x):
        # 1. Remover item x.0
        data = [item for item in data if item["Item"] != x]

        # 2. Adicionar campo "Categoria" (correção completa)
        descricao_x = next((item["Descrição"] for item in dados if item["Item"] == x), None)  # Obter descrição do item x
        if descricao_x:
            for item in data:
                item_int = int(item["Item"])  # Obter a parte inteira do item
                if item_int == x:  # Verificar se a parte inteira do item é igual a x
                    item["Categoria"] = descricao_x
        x = x - 1

    # 3. Renumerar itens
    for i, item in enumerate(data):
        item["Item"] = i + 1

    # 4. Traduzir campos (chamando o método traduzir_campos)
    data = traduzir_campos(data, target_language=language)
    return data

# Carregar os dados JSON
with open('../smartengApp/src/components/Table/data.json', 'r', encoding='utf-8') as f:
    dados = json.load(f)

# Realizar as transformações
dados_transformados = transformar_json(dados, language="en")

# Salvar os dados transformados
with open('dados_transformados.json', 'w', encoding='utf-8') as f:
    json.dump(dados_transformados, f, indent=4, ensure_ascii=False)  # indent=4 para melhor formatação
