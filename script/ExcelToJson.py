import pandas as pd
import json
from datetime import datetime
import os

file_path = os.path.join(os.path.dirname(__file__), '../data/joueurs.ods')

try:
    df = pd.read_excel(file_path, engine='odf')
    print("Colonnes disponibles:", df.columns.tolist())
    
    joueurs_par_equipe = {}

    for index, row in df.iterrows():
        categorie = row['Catégorie']
        
        if categorie not in joueurs_par_equipe:
            joueurs_par_equipe[categorie] = []
        
        joueur = {
            "nom": str(row['Nom']).strip(),
            "prenom": str(row['Prenom']).strip(),
            "dateNaissance": row['Date de naissance'].strftime('%Y-%m-%d') if isinstance(row['Date de naissance'], datetime) else str(row['Date de naissance'])
        }
        
        joueurs_par_equipe[categorie].append(joueur)

    data_path = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(data_path, exist_ok=True)

    json_path = os.path.join(data_path, 'joueurs.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(joueurs_par_equipe, f, ensure_ascii=False, indent=2)

    print(f"Fichier JSON créé avec succès: {json_path}")

except Exception as e:
    print(f"Erreur: {str(e)}")