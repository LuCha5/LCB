// Animation au scroll pour la timeline
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function showVisibleItems() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }
    
    // Vérifier au chargement initial
    showVisibleItems();
    
    // Vérifier au scroll
    window.addEventListener('scroll', showVisibleItems);
});
