const championnatCategories = [
    { category: 'U7-U9 Mixtes', url: 'team.html?team=U7-U9Mi' },
    { category: 'U11 M', url: 'team.html?team=U11M' },
    { category: 'U11 F', url: 'team.html?team=U11F' },
    { category: 'U13 M', url: 'team.html?team=U13M' },
    { category: 'U13 F', url: 'team.html?team=U13F' },
    { category: 'U15 M', url: 'team.html?team=U15M' },
    { category: 'U18 M', url: 'team.html?team=U18M' },
    { category: '3x3', url: 'team.html?team=3vs3' },  // Modifier l'URL pour correspondre à la clé dans categoryMapping
    { category: 'Seniors Compet DM3', url: 'team.html?team=Seniors_Compet_DM3' },
    { category: 'Seniors Compet RM3', url: 'team.html?team=Seniors_Compet_RM3' },
    { category: 'Seniors Compet PRF', url: 'team.html?team=Seniors_Compet_PRF' }
];

const displayChampionnatCategories = () => {
    const championnatGrid = document.getElementById('championnat-grid');
    championnatGrid.innerHTML = '';
    
    championnatCategories.forEach(item => {
        const categoryButton = document.createElement('button'); // Changé en button
        categoryButton.classList.add('category-button');
        categoryButton.textContent = item.category;
        categoryButton.addEventListener('click', (e) => {
            e.preventDefault();
            const teamId = item.url.split('=')[1]; // Récupère l'ID de l'équipe depuis l'URL
            window.location.href = `team.html?team=${teamId}`; // Navigation simple vers la page de l'équipe
        });
        championnatGrid.appendChild(categoryButton);
    });
};

document.addEventListener('DOMContentLoaded', displayChampionnatCategories);