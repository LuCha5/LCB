document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Création du lien mailto
        const mailtoLink = `mailto:lecresbasket@yahoo.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;

        // Ouvrir le client mail par défaut
        window.location.href = mailtoLink;

        // Réinitialiser le formulaire
        contactForm.reset();
    });
});