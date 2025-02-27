document.addEventListener('DOMContentLoaded', () => {
    const rootStyle = getComputedStyle(document.documentElement);
    const isOpen = rootStyle.getPropertyValue('--inscriptions-ouvertes').trim();

    const openSection = document.querySelector('.inscriptions-ouvertes');
    const closeSection = document.querySelector('.inscriptions-fermees');

    if (isOpen === '1') {
        openSection.style.display = 'block';
        closeSection.style.display = 'none';
    } else {
        openSection.style.display = 'none';
        closeSection.style.display = 'block';
    }
});
