document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('team');
    if (teamId) {
        document.getElementById('team-title').textContent = `Team ${teamId}`;
        document.getElementById('team-content').textContent = `Information about team ${teamId} goes here.`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('team');
    if (teamId) {
        document.getElementById('team-title').textContent = `Team ${teamId}`;
    }

    // Ajout du script pour le bouton hamburger
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
});