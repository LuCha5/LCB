document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('team');
    if (teamId) {
        document.getElementById('team-title').textContent = `Team ${teamId}`;
        document.getElementById('team-content').textContent = `Information about team ${teamId} goes here.`;
    }
});