import json
from datetime import datetime
import os

def normalize_date(date_str):
    try:
        if isinstance(date_str, str):
            if 'nan' in date_str.lower():
                return 'N/A'
            try:
                date_obj = datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                try:
                    date_obj = datetime.strptime(date_str, '%d/%m/%Y')
                except ValueError:
                    try:
                        date_obj = datetime.strptime(date_str.replace('-', ''), '%d/%m/%Y')
                    except ValueError:
                        return 'N/A'
            return date_obj.strftime('%d/%m/%Y')  # Changé de %y à %Y
        return 'N/A'
    except:
        return 'N/A'

def normalize_json_dates():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        input_path = os.path.join(current_dir, '..', 'data', 'joueurs.json')
        
        if not os.path.exists(input_path):
            raise FileNotFoundError(f"Fichier non trouvé: {input_path}")

        with open(input_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for categorie in data:
            for joueur in data[categorie]:
                joueur['dateNaissance'] = normalize_date(joueur['dateNaissance'])

        with open(input_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print("Dates normalisées avec succès")

    except Exception as e:
        print(f"Erreur: {str(e)}")

if __name__ == "__main__":
    normalize_json_dates()