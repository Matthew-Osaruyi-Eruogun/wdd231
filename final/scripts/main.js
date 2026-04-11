/* main.js */
import { initVendorDirectory } from './vendordisplay.js';

/**
 * 1. Improved Wayfinding & Menu Logic
 * Handles the hamburger menu and the 'active' class for nav links
 */
function handleNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Safety check: only proceed if these elements exist on the page
    if (!hamburger || !navLinks) return;

    // Wayfinding Logic
    const currentPath = window.location.pathname;
    links.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');

        // Check if the current path matches the link href
        if (currentPath.endsWith(linkHref) || (currentPath === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Responsive Menu Toggle
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('is-active');
    });

    // Close menu when a link is clicked (improves mobile UX)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * 2. Updates Footer Dates
 */
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

/**
 * 3. Local Storage Greeting
 */
function initWelcomeMessage() {
    const messageContainer = document.getElementById('local-storage-message');
    if (!messageContainer) return;

    const lastVisit = localStorage.getItem('last-visit');
    const now = Date.now();

    if (lastVisit) {
        const daysSince = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
        if (daysSince > 0) {
            const welcomeP = document.createElement('p');
            welcomeP.textContent = `Welcome back! It's been ${daysSince} day(s) since your last visit.`;
            welcomeP.className = "storage-greeting";
            messageContainer.prepend(welcomeP);
        }
    }

    localStorage.setItem('last-visit', now.toString());
}

/**
 * 4. Main Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
    setFooterYear();
    initWelcomeMessage();

    // Check if we are on the vendors page to load vendor data
    // Matches the <body id="vendors-page"> in your HTML
    if (document.getElementById('vendors-page')) {
        initVendorDirectory();
    }
});

