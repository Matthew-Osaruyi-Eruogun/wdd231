import { initVendorDirectory } from './vendordisplay.js';

function handleNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
}

function initStyleModal() {
    const galleryItems = document.querySelectorAll('.style-card-item');
    const modal = document.querySelector('.modal');
    if (!modal) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const title = item.querySelector('h3').textContent;
            const desc = item.querySelector('p').textContent;

            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <div class="modal-details">
                        <h2>${title}</h2>
                        <p>${desc}</p>
                        <p><strong>Fabric:</strong> High-quality Aso-Ebi Grade</p>
                        <button class="cta-primary">Inquire for Group Order</button>
                    </div>
                </div>
            `;
            modal.classList.add('is-visible');

            modal.querySelector('.close-modal').onclick = () => modal.classList.remove('is-visible');
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('is-visible');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
    initStyleModal();
    if (document.getElementById('vendors-page')) {
        initVendorDirectory();
    }
});