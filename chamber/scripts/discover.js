import { pointsOfInterest } from '../data/spots.mjs';

// --- Visitor Logic ---
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const lastVisit = localStorage.getItem('lastVisit');
const today = Date.now();
const messageElement = document.getElementById('visit-message-text');

if (messageElement) {
    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysDifference = Math.floor((today - Number(lastVisit)) / MS_PER_DAY);
        messageElement.textContent = daysDifference < 1
            ? "Back so soon! Awesome!"
            : `You last visited ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago.`;
    }
    localStorage.setItem('lastVisit', today.toString());
}

// --- Dynamic Gallery ---
const gallery = document.getElementById('poi-gallery');

if (gallery) {
    const fragment = document.createDocumentFragment();

    pointsOfInterest.forEach((spot, index) => {
        const card = document.createElement('section');
        card.className = 'poi-card card';

        card.innerHTML = `
            <h3>${spot.name}</h3>
            <div class="image-ratio-box">
                <img src="images/${spot.image}" 
                     alt="${spot.name}" 
                     width="400" height="267" 
                     loading="${index < 2 ? 'eager' : 'lazy'}">
            </div>
            <p><strong>${spot.address}</strong></p>
            <p>${spot.description}</p>
            <button aria-label="Learn more about ${spot.name}">Learn More</button>
        `;

        // Apply high priority to the first image in the DOM
        if (index === 0) {
            card.querySelector('img').setAttribute('fetchpriority', 'high');
        }

        fragment.appendChild(card);
    });

    gallery.appendChild(fragment);
}