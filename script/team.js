document.addEventListener('DOMContentLoaded', async function() {
    console.log("Team.js chargé");
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('team');
    console.log("Team ID:", teamId);

    const categoryMapping = {
        'U7-U9Mi': ['U7 /U9 M(2)', 'U9 M(1)', 'U7 /U9 Filles'],
        'U11M': ['U11 Masculins'],
        'U11F': ['U11 Féminines'],
        'U13M': ['   U13 MASCULINS'],
        'U13F': ['U13 Féminines'],
        'U15M': ['U15 Masculins'],
        'U18M': ['U18 Masculins'],
        'Seniors_Compet_PRF': ['SENIORS FEMININES'],
        'Seniors_Compet_DM3': ['SENIORS DM3'],
        'Seniors_Compet_RM3': ['SENIORS RM3']
    };

    if (teamId) {
        try {
            const response = await fetch('../data/joueurs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Données chargées:", data);

            const categories = categoryMapping[teamId] || [];
            if (categories.length > 0) {
                document.getElementById('team-title').textContent = `Équipe ${teamId.replace(/_/g, ' ')}`;
                
                let allPlayers = [];
                categories.forEach(category => {
                    if (data[category]) {
                        allPlayers = allPlayers.concat(data[category]);
                    }
                });

                // Trier les joueurs par nom
                allPlayers.sort((a, b) => a.nom.localeCompare(b.nom));

                // Créer le tableau
                const table = document.createElement('table');
                table.className = 'player-table';

                // En-tête du tableau
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const headerCell = document.createElement('th');
                headerCell.textContent = 'Joueur';
                headerRow.appendChild(headerCell);
                thead.appendChild(headerRow);
                table.appendChild(thead);

                const tbody = document.getElementById('player-list');
                tbody.innerHTML = ''; // Vider avant d'ajouter les nouvelles lignes
                allPlayers.forEach(player => {
                    const row = document.createElement('tr');
                    const cell = document.createElement('td');
                    cell.textContent = `${player.prenom} ${player.nom}`;
                    row.appendChild(cell);
                    tbody.appendChild(row);
                });
                
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    }
});


