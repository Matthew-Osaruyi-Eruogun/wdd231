// chamber/scripts/discover.js

import { pointsOfInterest } from '../data/spots.mjs';

// --- A. Visitor Message Logic (localStorage) ---

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const lastVisit = Number(localStorage.getItem('lastVisit'));
const today = Date.now();
const messageElement = document.getElementById('visit-message-text');

let message = "";

if (isNaN(lastVisit) || lastVisit === 0) {
    // 1. First Visit
    message = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifferenceMs = today - lastVisit;
    const daysDifference = Math.floor(timeDifferenceMs / MS_PER_DAY); // Use floor for full days passed

    if (daysDifference < 1) {
        // 2. Less than a day
        message = "Back so soon! Awesome!";
    } else {
        // 3. More than a day
        const dayText = daysDifference === 1 ? "day" : "days";
        message = `You last visited ${daysDifference} ${dayText} ago.`;
    }
}

// Display the message
messageElement.textContent = message;

// Update the stored date for the *next* visit
localStorage.setItem('lastVisit', today);


// --- B. Dynamic Card Creation (Updated for CLS Fix) ---

const gallery = document.getElementById('poi-gallery');

pointsOfInterest.forEach((spot, index) => {
    const card = document.createElement('section');
    card.classList.add('poi-card');
    // Assign a unique class for grid-area targeting
    card.classList.add(`poi-card-${index + 1}`);

    // H2 for Title
    const title = document.createElement('h2');
    title.textContent = spot.name;

    // Figure and Image
    const figure = document.createElement('figure');

    // 💡 CLS FIX: Create the container for the aspect ratio trick
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-ratio-box');

    const img = document.createElement('img');
    img.setAttribute('src', `images/${spot.image}`);
    img.setAttribute('alt', `Photo of ${spot.name}`);
    img.setAttribute('loading', 'lazy');



    imageContainer.appendChild(img);
    figure.appendChild(imageContainer); // Figure now holds the container

    // Address
    const address = document.createElement('address');
    address.textContent = spot.address;

    // Description
    const description = document.createElement('p');
    description.textContent = spot.description;

    // Button
    const button = document.createElement('button');
    button.textContent = "Learn More";

    card.append(title, figure, address, description, button);
    gallery.appendChild(card);
});