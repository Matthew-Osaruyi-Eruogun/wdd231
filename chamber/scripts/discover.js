// chamber/scripts/discover.js
import { pointsOfInterest } from '../data/spots.mjs';

// --- A. Visitor Message Logic ---
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const lastVisit = localStorage.getItem('lastVisit');
const today = Date.now();
const messageElement = document.getElementById('visit-message-text');

if (messageElement) {
    let message = "";
    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const daysDifference = Math.floor((today - Number(lastVisit)) / MS_PER_DAY);
        if (daysDifference < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago.`;
        }
    }
    messageElement.textContent = message;
    localStorage.setItem('lastVisit', today.toString());
}

// --- B. Dynamic Card Creation ---
const gallery = document.getElementById('poi-gallery');

if (gallery) {
    // Create a fragment to minimize reflows/paints
    const fragment = document.createDocumentFragment();

    pointsOfInterest.forEach((spot, index) => {
        const card = document.createElement('section');
        card.className = `poi-card poi-card-${index + 1}`;

        const title = document.createElement('h3');
        title.textContent = spot.name;

        const figure = document.createElement('figure');
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-ratio-box');

        const img = document.createElement('img');
        img.src = `images/${spot.image}`;
        img.alt = `Photo of ${spot.name}`;

        // Explicit dimensions to prevent Layout Shift (CLS)
        img.width = 400;
        img.height = 267;

        // Optimization: Priority loading for the first two items (Above the Fold)
        if (index < 2) {
            img.loading = 'eager';
            img.fetchPriority = 'high'; // Correct JS camelCase property
        } else {
            img.loading = 'lazy';
        }

        imageContainer.appendChild(img);
        figure.appendChild(imageContainer);

        const address = document.createElement('address');
        address.textContent = spot.address;

        const description = document.createElement('p');
        description.textContent = spot.description;

        const button = document.createElement('button');
        button.textContent = "Learn More";
        button.classList.add('member-link'); // Reusing existing card button styles
        button.setAttribute('aria-label', `Learn more about ${spot.name}`);

        card.append(title, figure, address, description, button);
        fragment.appendChild(card);
    });

    // Single DOM append for better performance
    gallery.appendChild(fragment);
}