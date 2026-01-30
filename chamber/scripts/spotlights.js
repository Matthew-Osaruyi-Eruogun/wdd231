const membersUrl = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Failed to load members data");
        const members = await response.json();

        // 1. Filter for Gold (3) and Silver (2) levels
        const eligibleMembers = members.filter(m => m.membershipLevel >= 2);

        // 2. Fisher-Yates Shuffle
        for (let i = eligibleMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [eligibleMembers[i], eligibleMembers[j]] = [eligibleMembers[j], eligibleMembers[i]];
        }

        // 3. Select top 3 members
        const spotlightMembers = eligibleMembers.slice(0, 3);

        displaySpotlights(spotlightMembers);
    } catch (error) {
        console.error("Error loading spotlights:", error);
        const container = document.querySelector('#spotlight-container');
        if (container) container.innerHTML = "<p>Member spotlights are currently unavailable.</p>";
    }
}

function displaySpotlights(members) {
    const container = document.querySelector('#spotlight-container');
    if (!container) return;

    container.innerHTML = ""; // Clear the loading state

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        const buttonText = member.websiteLabel || 'Visit Website';

        card.innerHTML = `
            <h3>${member.name}</h3>
            <div class="spotlight-logo">
                <img src="images/${member.imageFile}" 
                     alt="${member.name} Company Logo" 
                     width="150" 
                     height="100" 
                     loading="lazy">
            </div>
            <p class="motto"><em>"${member.motto}"</em></p>
            <hr>
            <div class="contact-info">
                <p>${member.phone}</p>
                <a href="${member.website}" 
                   target="_blank" 
                   rel="noopener" 
                   class="member-link"
                   aria-label="Visit ${member.name} website">
                   ${buttonText}
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

getSpotlights();