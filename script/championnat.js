const championnatCategories = [
    { category: 'U7-U9 Mixtes', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: 'U11 M', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: 'U11 F', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: 'U13 M', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: 'U13 F', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: 'U15 M', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: 'U18 M', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: '3vs3', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: 'Seniors Compet DM3', url: 'https://resultats.ffbb.com/championnat/...' },
    { category: 'Seniors Compet PRF', url: 'https://resultats.ffbb.com/championnat/...' }
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