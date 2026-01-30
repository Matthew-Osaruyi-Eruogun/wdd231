const membersUrl = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();

        // 1. Filter for Gold (3) and Silver (2) members only
        const eligibleMembers = members.filter(m => m.membershipLevel >= 2);

        // 2. Fisher-Yates Shuffle for unbiased randomness
        for (let i = eligibleMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [eligibleMembers[i], eligibleMembers[j]] = [eligibleMembers[j], eligibleMembers[i]];
        }

        // 3. Select top 2 or 3 (depending on your layout needs)
        const spotlightMembers = eligibleMembers.slice(0, 3);

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

        // Logic to use the specific websiteLabel from JSON or default to "Visit Site"
        const buttonText = member.websiteLabel || 'Visit Site';

        card.innerHTML = `
            <h3>${member.name}</h3>
            <div class="spotlight-logo">
                <img src="images/${member.imageFile}" 
                     alt="${member.name} Logo" 
                     width="150" 
                     height="100" 
                     loading="lazy">
            </div>
            <p class="motto">"${member.motto}"</p>
            <hr>
            <p class="phone">${member.phone}</p>
            <p class="website-link">
                <a href="${member.website}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   aria-label="Visit ${member.name} website">
                   ${buttonText}
                </a>
            </p>
        `;
        container.appendChild(card);
    });
}

getSpotlights();