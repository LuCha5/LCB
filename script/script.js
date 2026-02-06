// Chargement initial
document.addEventListener('DOMContentLoaded', async function() {
  await loadNavAndFooter();
  initBurgerMenu();
  await checkBirthdays();
  handleTeamDisplay();
  initScrollHandler();
});

// Gestion Navbar et Footer
async function loadNavAndFooter() {
  try {
      const [navResponse, footerResponse] = await Promise.all([
          fetch('navbar.html'),
          fetch('footer.html')
      ]);

      const [navHtml, footerHtml] = await Promise.all([
          navResponse.text(),
          footerResponse.text()
      ]);

      document.getElementById('navbar-container').innerHTML = navHtml;
      document.getElementById('footer-container').innerHTML = footerHtml;
  } catch (error) {
      console.error('Erreur chargement nav/footer:', error);
  }
}

// Modification de la fonction initBurgerMenu
function initBurgerMenu() {
    const nav = document.querySelector('nav');
    
    const burger = document.createElement('div');
    burger.className = 'hamburger';
    burger.innerHTML = `
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    `;
    
    const container = nav.querySelector('.container');
    container.appendChild(burger);
    
    // Masquer la navbar par défaut sur mobile
    if (window.innerWidth <= 768) {
        nav.classList.add('menu-closed');
    }
  
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('menu-open');
        nav.classList.toggle('menu-closed');
    });
  }



// Gestion Anniversaires
async function checkBirthdays() {
  try {
      const response = await fetch('data/joueurs_2025.json');
      const data = await response.json();
      const today = new Date();
      const todayString = today.toLocaleDateString('fr-FR').split('/').slice(0, 2).join('/');
      
      let birthdayPeople = [];
      
      Object.values(data).forEach(team => {
          team.forEach(player => {
              if (player.dateNaissance && player.dateNaissance !== 'N/A') {
                  const birthDate = player.dateNaissance.split('/').slice(0, 2).join('/');
                  if (birthDate === todayString) {
                      birthdayPeople.push(`${player.prenom} ${player.nom}`);
                  }
              }
          });
      });

      displayBirthdays(birthdayPeople);
  } catch (error) {
      console.error('Erreur:', error);
  }
}

function displayBirthdays(birthdays) {
    const container = document.getElementById('birthday-container');
    const section = document.querySelector('.birthday-card').closest('section');

    if (!birthdays || birthdays.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    container.innerHTML = `
        <h3 class="text-center mb-3">Joyeux Anniversaire !</h3>
        <div class="birthday-list">
            ${birthdays.map(birthday => `
                <div class="birthday-item">
                    <i class="fas fa-birthday-cake"></i>
                    <span>${birthday}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Gestion Équipes
function handleTeamDisplay() {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get('team');
  
  if (teamId && document.getElementById('team-title')) {
      loadTeamData(teamId);
  }
}

async function loadTeamData(teamId) {
  try {
      const response = await fetch('data/joueurs_2025.json');
      const data = await response.json();

      const categoryMap = {
          'U15': 'U15M',
          'U11': 'U11M',
          'U13': 'U13M',
          'U18': 'U18M',
          'loisirs': 'Loisirs',
          'basket_decouverte': 'Basket découverte'
      };

      const category = categoryMap[teamId];
      if (category && data[category]) {
          displayTeam(category, data[category]);
      }
  } catch (error) {
      console.error('Erreur:', error);
  }
}

function displayTeam(category, players) {
  const titleElement = document.getElementById('team-title');
  const tbodyElement = document.getElementById('players-list');
  
  if (titleElement && tbodyElement) {
      titleElement.textContent = category;
      tbodyElement.innerHTML = players.map(player => `
          <tr>
              <td>${player.nom}</td>
              <td>${player.prenom}</td>
          </tr>
      `).join('');
  }
}

// Gestion Scroll
function initScrollHandler() {
  window.addEventListener('scroll', function() {
      const nav = document.querySelector('nav');
      const body = document.body;
      
      if (window.scrollY > 0) {
          nav.classList.add('scrolled');
          body.classList.add('scrolled');
      } else {
          nav.classList.remove('scrolled');
          body.classList.remove('scrolled');
      }
  });
}

async function loadClubStats() {
    try {
        // Charger les données depuis joueurs_2025.json
        const response = await fetch('data/joueurs_2025.json');
        const data = await response.json();
        
        // Compter les joueurs par sexe en analysant les prénoms ou les catégories
        let totalHommes = 0;
        let totalFemmes = 0;
        
        // Catégories masculines
        const categoriesMasculines = ['U9', 'U11M', 'U13M', 'U15M', 'U18M', 'DM2', 'DM3', 'RM3'];
        // Catégories féminines
        const categoriesFeminines = ['U11F', 'U13F', 'U15F', 'DF2'];
        // Catégories mixtes (Loisirs et Basket découverte) - on peut les compter à part ou approximer
        const categoriesMixtes = ['Loisirs', 'Basket découverte'];
        
        for (const [categorie, joueurs] of Object.entries(data)) {
            if (categoriesMasculines.includes(categorie)) {
                totalHommes += joueurs.length;
            } else if (categoriesFeminines.includes(categorie)) {
                totalFemmes += joueurs.length;
            } else if (categoriesMixtes.includes(categorie)) {
                // Pour les catégories mixtes, on peut faire une approximation ou compter séparément
                // Pour Basket découverte, ce sont principalement des femmes
                if (categorie === 'Basket découverte') {
                    totalFemmes += joueurs.length;
                } else {
                    // Pour Loisirs, on peut faire une approximation 50/50 ou compter manuellement
                    // Approximation: 2/3 hommes, 1/3 femmes pour les loisirs
                    totalHommes += Math.floor(joueurs.length * 0.7);
                    totalFemmes += Math.ceil(joueurs.length * 0.3);
                }
            }
        }
        
        const totaljoueurs = totalHommes + totalFemmes;
        
        // Mettre à jour les éléments HTML avec les statistiques
        document.getElementById('total-hommes').textContent = totalHommes;
        document.getElementById('total-femmes').textContent = totalFemmes;
        document.getElementById('total-joueurs').textContent = totaljoueurs;

        // Animation des compteurs
        animateValue('total-hommes', 0, totalHommes, 2000);
        animateValue('total-femmes', 0, totalFemmes, 2000);
        animateValue('total-joueurs', 0, totaljoueurs, 2000);
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
    }
}

// Fonction d'animation des compteurs
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', async function() {
    // ...existing code...
    await loadClubStats();
});