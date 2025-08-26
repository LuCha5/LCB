const championnatCategories = [
    { category: 'U9 Mixtes', url: 'team.html?team=U9Mi' },
    { category: 'U11 M', url: 'team.html?team=U11M' },
    { category: 'U11 F', url: 'team.html?team=U11F' },
    { category: 'U13 M', url: 'team.html?team=U13M' },
    { category: 'U13 F', url: 'team.html?team=U13F' },
    { category: 'U15 M', url: 'team.html?team=U15M' },
    { category: 'U15 F', url: 'team.html?team=U15F' },
    { category: 'U18 M', url: 'team.html?team=U18M' },
    { category: 'Seniors Compet DM2', url: 'team.html?team=Seniors_Compet_DM2' },
    { category: 'Seniors Compet DM3', url: 'team.html?team=Seniors_Compet_DM3' },
    { category: 'Seniors Compet RM3', url: 'team.html?team=Seniors_Compet_RM3' },
    { category: 'Seniors Compet PRF', url: 'team.html?team=Seniors_Compet_PRF' },
    { category: 'Loisirs mixtes', url: 'team.html?team=Loisirs' },
    { category: 'Remise en forme', url: 'team.html?team=Remise_en_forme' }
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