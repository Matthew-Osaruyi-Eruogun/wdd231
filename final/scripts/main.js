/* main.js */
import { initVendorDirectory } from './vendordisplay.js';

/* Handle Navigation: Wayfinding and Responsive Menu */
function handleNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // 1. Improved Wayfinding Logic
    // Uses .includes() to handle sub-pages or parameters correctly
    const currentPath = window.location.pathname;

    links.forEach(link => {
           link.classList.remove('active');

        // Add active class if the href matches the current path
        // Default to home if path is empty or just '/'
        if (link.getAttribute('href') === currentPath.split('/').pop() ||
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 2. Responsive Menu Logic with Accessibility
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', !isExpanded);

      
        hamburger.classList.toggle('is-active');
    });

    // Close menu when a link is clicked (useful for mobile UX)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* This updates Footer Dates */
function setFooterYear() {
    const yearSpan = document.getElementById('currentyear');
    const lastModified = document.getElementById('lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
}

/* Simple Local Storage Greeting (Criterion Integration) */
function initWelcomeMessage() {
    const messageContainer = document.getElementById('local-storage-message');
    if (!messageContainer) return;

    const lastVisit = localStorage.getItem('last-visit');
    const now = Date.now();

    if (lastVisit) {
        const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSince > 0) {
            const welcomeP = document.createElement('p');
            welcomeP.textContent = `Welcome back! It's been ${daysSince} day(s) since your last visit.`;
            welcomeP.className = "storage-greeting";
            messageContainer.prepend(welcomeP);
        }
    }

    localStorage.setItem('last-visit', now);
}

/* Initialize */
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
    setFooterYear();
    initWelcomeMessage();

    
    if (document.body.id === 'vendors-page') {
        initVendorDirectory();
    }
});