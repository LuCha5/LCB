const championnatCategories = [
    { category: 'U7-U9 Mixtes', url: 'team.html?team=U7-U9 Mixtes' },
    { category: 'U11 M', url: 'team.html?team=U11 M' },
    { category: 'U11 F', url: 'team.html?team=U11 F' },
    { category: 'U13 M', url: 'team.html?team=U13 M' },
    { category: 'U13 F', url: 'team.html?team=U13 F' },
    { category: 'U15 M', url: 'team.html?team=U15 M' },
    { category: 'U18 M', url: 'team.html?team=U18 M' },
    { category: '3vs3', url: 'team.html?team=3vs3' },
    { category: 'Seniors Compet DM3', url: 'team.html?team=Seniors Compet DM3' },
    { category: 'Seniors Compet PRF', url: 'team.html?team=Seniors Compet PRF' }
];

const displayChampionnatCategories = () => {
    const championnatGrid = document.getElementById('championnat-grid');
    championnatGrid.innerHTML = '';
    
    championnatCategories.forEach(item => {
        const categoryButton = document.createElement('a');
        categoryButton.classList.add('category-button');
        categoryButton.href = item.url;
        categoryButton.target = '_blank';
        categoryButton.textContent = item.category;
        championnatGrid.appendChild(categoryButton);
    });
};

document.addEventListener('DOMContentLoaded', displayChampionnatCategories);