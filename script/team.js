document.addEventListener('DOMContentLoaded', async function() {
    console.log("Team.js chargé");

    const categoryMapping = {
        'U9Mi': ['U7 /U9 M(2)', 'U9 M(1)', 'U7 /U9 Filles'],
        'U11M': ['U11 Masculins'],
        'U11F': ['U11 Féminines'],
        'U13M': ['U13 MASCULINS'],
        'U13F': ['U13 Féminines'],
        'U15M': ['U15 Masculins'],
        'U15F': ['U15 Féminines'],
        'U18M': ['U18 Masculins'],
        'Seniors_Compet_DF2': ['SENIORS FEMININES'],
        'Seniors_Compet_DM3': ['SENIORS DM2'],
        'Seniors_Compet_DM3': ['SENIORS DM3'],
        'Seniors_Compet_RM3': ['SENIORS RM3'],
        '3vs3': ['BASKET 3X3'],
        'Loisirs': ['LOISIRS MIXTE'],
        'Remise_en_forme': ['BASKET REMISE EN FORME']

    };

    //lien a update plus tard
    const ffbbLinks = {
        'U11M': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000005013406', //y a 2x sur ffbb
        'U11F': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000005096801', //y a 2x sur ffbb
        'U13M': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000005013443',
        'U13F': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000005013267',
        'U15M': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000005019242',
        'U18M': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000005013481',
        'Seniors_Compet_DF2': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000005101608',  //y a 2x sur ffbb
        'Seniors_Compet_DM3': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000004969233',
        'Seniors_Compet_RM3': 'https://competitions.ffbb.com/ligues/occ/comites/0034/clubs/occ0034025/equipes/200000005101897'
    };

    async function fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    function createSection(title, isCoach = false) {
        const section = document.createElement('tr');
        section.className = isCoach ? 'coach-row' : (title.toLowerCase().replace(' ', '-') + '-row');
        const cell = document.createElement('td');
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        cell.appendChild(titleElement);
        section.appendChild(cell);
        return { section, cell };
    }

    function displayMember(member, container) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = `${member.prenom} ${member.nom}`;
        row.appendChild(cell);
        container.appendChild(row);
    }

    function displayTeamMembers(tbody, coaches, players) {
        // Afficher les entraîneurs
        if (coaches.length > 0) {
            coaches.forEach(coach => {
                const row = document.createElement('tr');
                row.className = 'coach-row';
                const cell = document.createElement('td');
                cell.textContent = `${coach.prenom} ${coach.nom}`;
                const coachLabel = document.createElement('span');
                coachLabel.className = 'coach-label';
                coachLabel.textContent = ` (${coach.role})`;
                cell.appendChild(coachLabel);
                row.appendChild(cell);
                tbody.appendChild(row);
            });
        }

        // Afficher les joueurs
        if (players.length > 0) {
            const { section: playerSection } = createSection('Joueurs');
            tbody.appendChild(playerSection);
            players.forEach(player => displayMember(player, tbody));
        }
    }

    // Nouvelle fonction de filtrage des entraîneurs
    function getCoachesForCategory(entraineurs, categoryId) {
        // Conversion des IDs spéciaux
        const mappedId = categoryId === 'U9Mi' ? 'U7 U9' : 
                        categoryId === 'Seniors_Compet_DF2' ? 'DF2' :
                        categoryId === 'Seniors_Compet_DM2' ? 'DM2' :
                        categoryId === 'Seniors_Compet_DM3' ? 'DM3' :
                        categoryId === 'Seniors_Compet_RM3' ? 'RM3' :
                        categoryId;

        const category = entraineurs[mappedId];
        if (!category) return [];

        const mainCoaches = (category.Coach || []).map(name => {
            const [prenom, nom] = name.split(' ');
            return { prenom, nom, role: 'Coach' };
        });

        const assistants = (category.Assistant || []).map(name => {
            const [prenom, nom] = name.split(' ');
            return { prenom, nom, role: 'Assistant' };
        });

        return [...mainCoaches, ...assistants];
    }

    async function init() {
        try {
            const params = new URLSearchParams(window.location.search);
            const teamId = params.get('team');
            console.log("Team ID:", teamId);

            if (!teamId) return;

            // Création du conteneur pour le bouton FFBB
            const ffbbContainer = document.createElement('div');
            ffbbContainer.className = 'text-center mb-4';
            const ffbbLink = document.createElement('a');
            ffbbLink.id = 'ffbb-link';
            ffbbLink.href = '#';
            ffbbLink.className = 'btn btn-success';
            ffbbLink.target = '_blank';
            ffbbLink.textContent = 'Voir le classement FFBB';
            ffbbContainer.appendChild(ffbbLink);

            // Vérifier et afficher l'image de l'équipe
            const imageContainer = document.createElement('div');
            imageContainer.className = 'team-image-container';
            const imagePath = `assets/equipes/${teamId}.jpg`;

            // Obtenir la référence du conteneur principal
            const teamContent = document.getElementById('team-content');

            try {
                const imageResponse = await fetch(imagePath);
                if (imageResponse.ok) {
                    const teamImage = document.createElement('img');
                    teamImage.src = imagePath;
                    teamImage.alt = `Photo équipe ${teamId}`;
                    teamImage.className = 'team-image';
                    imageContainer.appendChild(teamImage);
                    
                    // Insérer l'image avant le conteneur principal
                    teamContent.parentNode.insertBefore(imageContainer, teamContent);
                }
            } catch (error) {
                console.log('Pas d\'image pour cette équipe');
            }

            // Insérer le bouton FFBB au début de teamContent
            teamContent.insertBefore(ffbbContainer, teamContent.firstChild);

            const [dataJoueurs, dataEntraineurs] = await Promise.all([
                fetchData('data/joueurs.json'),
                fetchData('data/entraineurs.json')
            ]);

            const categories = categoryMapping[teamId] || [];
            if (categories.length === 0) return;

            // Mise à jour du titre
            document.getElementById('team-title').textContent = `Équipe ${teamId.replace(/_/g, ' ')}`;
            
            const tbody = document.getElementById('player-list');
            tbody.innerHTML = '';

            // Gestion du lien FFBB
            if (ffbbLinks[teamId]) {
                ffbbLink.href = ffbbLinks[teamId];
            } else {
                ffbbContainer.style.display = 'none'; // Cache le bouton si pas de lien FFBB
            }

            // Traitement spécial pour U7-U9Mi
            if (teamId === 'U9Mi') {
                const allCoaches = new Set();
                const allPlayers = new Set();

                categories.forEach(category => {
                    // Utilisation de la nouvelle fonction pour les entraîneurs
                    getCoachesForCategory(dataEntraineurs, teamId)
                        .forEach(coach => allCoaches.add(JSON.stringify(coach)));

                    // Collecter les joueurs
                    if (dataJoueurs[category]) {
                        dataJoueurs[category].forEach(player => 
                            allPlayers.add(JSON.stringify(player)));
                    }
                });

                displayTeamMembers(
                    tbody,
                    Array.from(allCoaches).map(c => JSON.parse(c)),
                    Array.from(allPlayers).map(p => JSON.parse(p))
                );
            } else {
                // Traitement normal pour les autres catégories
                const coaches = getCoachesForCategory(dataEntraineurs, teamId);
                categories.forEach(category => {
                    const players = dataJoueurs[category] || [];
                    displayTeamMembers(tbody, coaches, players);
                });
            }

        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    }

    init();
});