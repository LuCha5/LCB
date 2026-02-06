import pandas as pd
import json
from datetime import datetime
import os

def format_date(date_str):
    if pd.isna(date_str):
        return None
    try:
        # Si la date est déjà au format datetime
        if isinstance(date_str, datetime):
            return date_str.strftime('%d/%m/%Y')
        
        date_str = str(date_str).strip()
        
        # Essayer différents formats de date
        for fmt in ['%Y-%m-%d %H:%M:%S', '%d/%m/%Y', '%Y-%m-%d']:
            try:
                date_obj = datetime.strptime(date_str, fmt)
                return date_obj.strftime('%d/%m/%Y')
            except ValueError:
                continue
        
        return date_str
    except:
        return None

file_path = os.path.join(os.path.dirname(__file__), '../data/LICENSES_2025.xlsx')

try:
    # Lire le fichier Excel
    df = pd.read_excel(file_path)
    print("Colonnes disponibles:", df.columns.tolist())
    
    joueurs_par_equipe = {}

    for index, row in df.iterrows():
        # Ignorer les lignes où le nom est vide
        if pd.isna(row['NOM']) or str(row['NOM']).strip() == '':
            continue
            
        # Extraire la catégorie depuis la colonne 'Unnamed: 4'
        categorie = str(row['Unnamed: 4']).strip() if not pd.isna(row['Unnamed: 4']) else None
        
        if categorie is None or categorie == '':
            continue
        
        if categorie not in joueurs_par_equipe:
            joueurs_par_equipe[categorie] = []
        
        date_naissance = format_date(row['NAISSANCE'])
        
        joueur = {
            "nom": str(row['NOM']).strip(),
            "prenom": str(row['PRENOM']).strip(),
            "dateNaissance": date_naissance if date_naissance else "N/A"
        }
        
        joueurs_par_equipe[categorie].append(joueur)

    # Trier les catégories
    joueurs_par_equipe = dict(sorted(joueurs_par_equipe.items()))

    data_path = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(data_path, exist_ok=True)

    json_path = os.path.join(data_path, 'joueurs.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(joueurs_par_equipe, f, ensure_ascii=False, indent=2)

    print(f"Fichier JSON créé avec succès: {json_path}")

except Exception as e:
    print(f"Erreur: {str(e)}")