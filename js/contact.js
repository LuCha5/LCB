document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Création du lien mailto
        const mailtoLink = `mailto:luonin.chatenet@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;

        // Ouvrir le client mail par défaut
        window.location.href = mailtoLink;

        // Réinitialiser le formulaire
        contactForm.reset();
    });
});