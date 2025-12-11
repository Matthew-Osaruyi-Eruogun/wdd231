// main.js

/**
 * ES Module: Manages the Hamburger Menu functionality
 */
function handleNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;

        // DOM Manipulation: Toggle the 'open' class for visual display
        navLinks.classList.toggle('open');

        // DOM Manipulation: Update ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });
}

/**
 * Sets the current year dynamically in the footer.
 */
function setFooterYear() {
    // DOM Manipulation: Update content
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Main application initializer.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aso-Ebi Thread: App Initialized');
    handleNavigation();
    setFooterYear();

    // Placeholder for asynchronous data loading on other pages
    // if (document.body.id === 'vendors-page') {
    //     import('./vendorDisplay.js').then(module => {
    //         module.initVendorDirectory();
    //     });
    // }
});