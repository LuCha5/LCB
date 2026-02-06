import pandas as pd
import json
from datetime import datetime
import os

def format_date(date_str):
    """Formate la date au format DD/MM/YYYY"""
    if pd.isna(date_str):
        return "N/A"
    try:
        # Si la date est déjà au format datetime
        if isinstance(date_str, datetime):
            return date_str.strftime('%d/%m/%Y')
        
        date_str = str(date_str).strip()
        
        # Essayer différents formats de date
        for fmt in ['%Y-%m-%d %H:%M:%S', '%d/%m/%Y', '%Y-%m-%d', '%m/%d/%Y']:
            try:
                date_obj = datetime.strptime(date_str, fmt)
                return date_obj.strftime('%d/%m/%Y')
            except ValueError:
                continue
        
        return date_str
    except:
        return "N/A"

def process_excel_2025(file_path):
    """Traite le fichier Excel 2025 avec plusieurs feuilles"""
    try:
        # Lire toutes les feuilles du fichier Excel
        excel_file = pd.ExcelFile(file_path)
        print(f"Feuilles trouvées dans le fichier: {excel_file.sheet_names}")
        
        joueurs_par_equipe = {}
        entraineurs_par_equipe = {}
        
        for sheet_name in excel_file.sheet_names:
            # Ignorer la feuille STAFF et BUREAU
            if sheet_name.strip().upper() in ['STAFF ET BUREAU', 'STAFF et BUREAU']:
                print(f"\nIgnore la feuille: {sheet_name}")
                continue
                
            print(f"\nTraitement de la feuille: {sheet_name}")
            
            # Lire la feuille
            df = pd.read_excel(file_path, sheet_name=sheet_name)
            print(f"Colonnes dans {sheet_name}: {df.columns.tolist()}")
            
            # La catégorie est le nom de la feuille
            categorie = sheet_name.strip()
            joueurs_par_equipe[categorie] = []
            
            # Initialiser la structure pour les entraîneurs
            entraineurs_par_equipe[categorie] = {
                "Coach": [],
                "Assistant": []
            }
            
            # Chercher les entraîneurs dans les colonnes "Unnamed" (ils apparaissent souvent dans les premières lignes)
            # Parcourir toutes les colonnes et lignes pour trouver "Entraineurs :" ou "Entraîneurs :"
            for col in df.columns:
                for index, val in df[col].items():
                    if pd.notna(val):
                        val_str = str(val).strip()
                        # Si on trouve "Entraineurs :" ou "Entraîneurs :", chercher les noms dans les colonnes suivantes
                        if 'ENTRAINEUR' in val_str.upper() and ':' in val_str:
                            # Chercher les noms d'entraîneurs dans les colonnes à droite et lignes suivantes
                            col_idx = df.columns.get_loc(col)
                            # Vérifier la colonne suivante pour le premier entraîneur
                            if col_idx + 1 < len(df.columns):
                                next_col = df.columns[col_idx + 1]
                                # Parcourir les lignes à partir de la ligne actuelle
                                for i in range(index, min(index + 10, len(df))):
                                    coach_name = df.iloc[i][next_col]
                                    if pd.notna(coach_name) and str(coach_name).strip() != '':
                                        coach_name_clean = str(coach_name).strip()
                                        if coach_name_clean not in entraineurs_par_equipe[categorie]["Coach"]:
                                            entraineurs_par_equipe[categorie]["Coach"].append(coach_name_clean)
                                            print(f"  Entraîneur trouvé: {coach_name_clean}")
            
            # Traiter chaque ligne de la feuille pour les joueurs
            for index, row in df.iterrows():
                # Chercher les colonnes NOM, PRENOM, DATE DE NAISSANCE
                nom = None
                prenom = None
                date_naissance = None
                
                # Identifier les colonnes (gérer différentes variantes de noms)
                for col in df.columns:
                    col_upper = str(col).upper().strip()
                    if 'NOM' in col_upper and nom is None:
                        nom = row[col]
                    elif 'PRENOM' in col_upper or 'PRÉNOM' in col_upper:
                        prenom = row[col]
                    elif 'NAISSANCE' in col_upper or 'DATE' in col_upper:
                        date_naissance = row[col]
                
                # Ignorer les lignes où le nom est vide
                if pd.isna(nom) or str(nom).strip() == '':
                    continue
                
                # C'est un joueur
                joueur = {
                    "nom": str(nom).strip() if not pd.isna(nom) else "",
                    "prenom": str(prenom).strip() if not pd.isna(prenom) else "",
                    "dateNaissance": format_date(date_naissance)
                }
                joueurs_par_equipe[categorie].append(joueur)
            
            print(f"Nombre de joueurs dans {categorie}: {len(joueurs_par_equipe[categorie])}")
            print(f"Nombre d'entraîneurs dans {categorie}: {len(entraineurs_par_equipe[categorie]['Coach'])}")
        
        # Trier les catégories
        joueurs_par_equipe = dict(sorted(joueurs_par_equipe.items()))
        entraineurs_par_equipe = dict(sorted(entraineurs_par_equipe.items()))
        
        return joueurs_par_equipe, entraineurs_par_equipe
        
    except Exception as e:
        print(f"Erreur lors du traitement du fichier: {str(e)}")
        return None, None

# Chemin vers le fichier Excel 2025
file_path = os.path.join(os.path.dirname(__file__), '../data/LICENSES_2025.xlsx')

# Vérifier si le fichier existe
if not os.path.exists(file_path):
    print(f"Le fichier {file_path} n'existe pas.")
    print("Veuillez placer le fichier Excel 2025 dans le dossier data/ avec le nom 'LICENSES_2025.xlsx'")
else:
    print(f"Traitement du fichier: {file_path}")
    
    # Traiter le fichier Excel
    joueurs_par_equipe, entraineurs_par_equipe = process_excel_2025(file_path)
    
    if joueurs_par_equipe:
        # Créer le dossier data s'il n'existe pas
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data')
        os.makedirs(data_path, exist_ok=True)

        # Sauvegarder les joueurs en JSON
        json_path = os.path.join(data_path, 'joueurs_2025.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(joueurs_par_equipe, f, ensure_ascii=False, indent=2)

        print(f"\n✅ Fichier joueurs JSON créé avec succès: {json_path}")
        print(f"Nombre total de catégories: {len(joueurs_par_equipe)}")
        
        # Afficher un résumé des joueurs
        total_joueurs = sum(len(joueurs) for joueurs in joueurs_par_equipe.values())
        print(f"Nombre total de joueurs: {total_joueurs}")
        
        print("\nRésumé par catégorie:")
        for categorie, joueurs in joueurs_par_equipe.items():
            print(f"  - {categorie}: {len(joueurs)} joueurs")
        
        # Sauvegarder les entraîneurs en JSON
        if entraineurs_par_equipe:
            entraineurs_json_path = os.path.join(data_path, 'entraineurs.json')
            with open(entraineurs_json_path, 'w', encoding='utf-8') as f:
                json.dump(entraineurs_par_equipe, f, ensure_ascii=False, indent=2)
            
            print(f"\n✅ Fichier entraîneurs JSON créé avec succès: {entraineurs_json_path}")
            
            # Afficher un résumé des entraîneurs
            print("\nRésumé des entraîneurs par catégorie:")
            for categorie, entraineurs in entraineurs_par_equipe.items():
                nb_coaches = len(entraineurs['Coach'])
                nb_assistants = len(entraineurs['Assistant'])
                if nb_coaches > 0 or nb_assistants > 0:
                    print(f"  - {categorie}: {nb_coaches} coach(es), {nb_assistants} assistant(s)")
    else:
        print("❌ Échec du traitement du fichier Excel")