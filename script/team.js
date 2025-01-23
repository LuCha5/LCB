document.addEventListener('DOMContentLoaded', async function() {
    console.log("Team.js chargé");
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('team');
    console.log("Team ID:", teamId);

    if (teamId) {
        try {
            const response = await fetch('../data/joueurs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Données chargées:", data);

            // Trouver la catégorie correspondante
            const category = Object.keys(data).find(cat => 
                cat.toLowerCase().includes(teamId.toLowerCase()));
            console.log("Catégorie trouvée:", category);

            if (category) {
                document.getElementById('team-title').textContent = `Équipe ${category}`;
                const players = data[category];
                
                const tbody = document.getElementById('players-list');
                tbody.innerHTML = players.map(player => `
                    <tr>
                        <td>${player.nom}</td>
                        <td>${player.prenom}</td>
                    </tr>
                `).join('');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }
});