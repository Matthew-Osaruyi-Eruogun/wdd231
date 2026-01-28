const membersUrl = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();

        // Filter for Gold (3) and Silver (2) members only
        const eligibleMembers = members.filter(m => m.membershipLevel >= 2);

        // Shuffle the array
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

        // Select top 3
        const spotlightMembers = shuffled.slice(0, 3);

        displaySpotlights(spotlightMembers);
    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector('#spotlight-container');
    if (!container) return;

    container.innerHTML = ""; // Clear existing

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.imageFile}" alt="${member.name} Logo" width="150" height="100" loading="lazy">
            <p>"${member.motto}"</p>
            <hr>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Site</a></p>
        `;
        container.appendChild(card);
    });
}

getSpotlights();