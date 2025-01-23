document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('team');
    if (teamId) {
        document.getElementById('team-title').textContent = `Team ${teamId}`;
        document.getElementById('team-content').textContent = `Information about team ${teamId} goes here.`;
    }

    // Charger dynamiquement le contenu de navbar.html
    fetch('../pages/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;

        // Ajout du script pour le bouton hamburger après le chargement de la navbar
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav ul');

        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
      });

    // Charger dynamiquement le contenu de footer.html
    fetch('../pages/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-container').innerHTML = data;
      });

  
  
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
});
// Ajouter la fonction pour les anniversaires
async function checkBirthdays() {
  try {
      const response = await fetch('../data/joueurs.json');
      const data = await response.json();
      const today = new Date();
      const todayString = today.toLocaleDateString('fr-FR').split('/').slice(0, 2).join('/'); // "DD/MM"
      
      let birthdayPeople = [];
      
      // Parcourir toutes les équipes
      Object.values(data).forEach(team => {
          team.forEach(player => {
              if (player.dateNaissance && player.dateNaissance !== 'N/A') {
                  const birthDate = player.dateNaissance.split('/').slice(0, 2).join('/'); // "DD/MM"
                  if (birthDate === todayString) {
                      birthdayPeople.push(`${player.prenom} ${player.nom}`);
                  }
              }
          });
      });

      // Afficher les anniversaires
      const container = document.getElementById('birthday-container');
      if (birthdayPeople.length > 0) {
          container.innerHTML = `
              <h3 class="text-primary mb-3">🎂 Joyeux Anniversaire ! 🎂</h3>
              <p class="lead">Aujourd'hui, nous fêtons l'anniversaire de :</p>
              <p class="h4">${birthdayPeople.join(', ')}</p>
          `;
      } else {
          container.style.display = 'none';
      }
  } catch (error) {
      console.error('Erreur:', error);
  }
}

// Ajouter à l'événement DOMContentLoaded existant
document.addEventListener('DOMContentLoaded', function() {
  checkBirthdays();
});

// Ajout pour la gestion des équipes
document.addEventListener('DOMContentLoaded', function() {
  // ...existing code...

  // Gestion des équipes
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get('team');

  if (teamId && document.getElementById('team-title')) {
      loadTeamData(teamId);
  }
});

async function loadTeamData(teamId) {
  try {
      const response = await fetch('../data/joueurs.json');
      const data = await response.json();
      
      const category = Object.keys(data).find(cat => 
          cat.toLowerCase().includes(teamId.toLowerCase()));
          
      if (category) {
          document.getElementById('team-title').textContent = `Équipe ${category}`;
          displayPlayers(data[category]);
      }
  } catch (error) {
      console.error('Erreur:', error);
  }
}

function displayPlayers(players) {
  const tbody = document.getElementById('players-list');
  tbody.innerHTML = players.map(player => `
      <tr>
          <td>${player.nom}</td>
          <td>${player.prenom}</td>
      </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', async function() {
  await loadNavAndFooter();  // Attendre chargement navbar/footer
  await loadTeamData();      // Charger données équipe
});

async function loadTeamData() {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get('team');
  
  if (!teamId) return;

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
          // ...autres mappings...
      };

      const category = categoryMap[teamId];
      
      if (category && data[category]) {
          const titleElement = document.getElementById('team-title');
          const tbodyElement = document.getElementById('players-list');
          
          if (titleElement && tbodyElement) {
              titleElement.textContent = category;
              tbodyElement.innerHTML = data[category].map(player => `
                  <tr>
                      <td>${player.nom}</td>
                      <td>${player.prenom}</td>
                  </tr>
              `).join('');
          }
      }
  } catch (error) {
      console.error('Erreur:', error);
  }
}

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