/* Créer la table players si elle n'existe pas déjà */
CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    position TEXT,
    number INTEGER,
    role TEXT
);

/* Insérer des données dans la table players */
INSERT INTO players (first_name, last_name, position, number, role) VALUES ('John', 'Doe', 'Forward', 10, 'Captain');
INSERT INTO players (first_name, last_name, position, number, role) VALUES ('Jane', 'Smith', 'Midfielder', 8, 'Vice-Captain');
INSERT INTO players (first_name, last_name, position, number, role) VALUES ('Alice', 'Johnson', 'Defender', 5, 'Player');
INSERT INTO players (first_name, last_name, position, number, role) VALUES ('Bob', 'Brown', 'Goalkeeper', 1, 'Player');