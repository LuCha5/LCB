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
  
  burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('menu-open');
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

function displayBirthdays(birthdayPeople) {
  const container = document.getElementById('birthday-container');
  if (!container) return;

  if (birthdayPeople.length > 0) {
      container.innerHTML = `
          <h3 class="text-primary mb-3">🎂 Joyeux Anniversaire ! 🎂</h3>
          <p class="lead">Aujourd'hui, nous fêtons l'anniversaire de :</p>
          <p class="h4">${birthdayPeople.join(', ')}</p>
      `;
  } else {
      container.style.display = 'none';
  }
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
              <td>${player.dateNaissance}</td>
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