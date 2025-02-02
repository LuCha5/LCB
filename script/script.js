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
          fetch('../pages/navbar.html'),
          fetch('../pages/footer.html')
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
  document.querySelector('.dropdown').addEventListener('click', function() {
    this.classList.toggle('active');
});

  burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('menu-open');
      nav.classList.toggle('menu-closed');
  });

  handleMobileDropdowns();
}

function handleMobileDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a');
      const content = dropdown.querySelector('.dropdown-content');
      
      link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
              e.preventDefault();
              content.style.display = content.style.display === 'block' ? 'none' : 'block';
          }
      });
  });
}

// Gestion Anniversaires
async function checkBirthdays() {
  try {
      const response = await fetch('../data/joueurs.json');
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
                    <span>${birthday.name}</span>
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
      const response = await fetch('../data/joueurs.json');
      const data = await response.json();

      const categoryMap = {
          'U15': 'U15 Masculins',
          'U11': 'U11 Masculins',
          'U13': 'U13 MASCULINS',
          'U18': 'U18 Masculins',
          '3v3': 'BASKET 3X3',
          'loisirs': 'LOISIRS MIXTE'
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
        const response = await fetch('../data/joueurs.json');
        const data = await response.json();
        
        let totalHommes = 0;
        let totalFemmes = 0;
        let totaljoueurs = 230;

        Object.keys(data).forEach(category => {
            if (category.includes('M') || category.includes('Masculins')) {
                totalHommes += data[category].length;
            } else if (category.includes('F') || category.includes('Féminines')) {
                totalFemmes += data[category].length;
            }
        });

        document.getElementById('total-hommes').textContent = totalHommes;
        document.getElementById('total-femmes').textContent = totalFemmes;
        document.getElementById('total-joueurs').textContent = totaljoueurs;
    } catch (error) {
        console.error('Erreur chargement stats:', error);
    }
    total
}

document.addEventListener('DOMContentLoaded', async function() {
    // ...existing code...
    await loadClubStats();
});