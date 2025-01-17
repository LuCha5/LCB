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
});