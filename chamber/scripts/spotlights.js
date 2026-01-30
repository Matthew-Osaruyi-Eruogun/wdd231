const membersUrl = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Failed to load members data");
        const members = await response.json();

        // 1. Filter for Gold (3) and Silver (2) levels
        const eligibleMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

        // 2. Fisher-Yates Shuffle for true randomness
        for (let i = eligibleMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [eligibleMembers[i], eligibleMembers[j]] = [eligibleMembers[j], eligibleMembers[i]];
        }

        // 3. Select 2 to 3 members (per WDD 231 requirements)
        const spotlightMembers = eligibleMembers.slice(0, 3);

        displaySpotlights(spotlightMembers);
    } catch (error) {
        console.error("Error loading spotlights:", error);
        const container = document.querySelector('#spotlight-container');
        
        if (container) container.innerHTML = "<p>Discover our featured chamber members.</p>";
    }
}

function displaySpotlights(members) {
    const container = document.querySelector('#spotlight-container');
    if (!container) return;

    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement('section'); 
        card.classList.add('spotlight-card');

        const buttonText = member.websiteLabel || 'Visit Website';

        // Ensuring accessible image paths and alt text
        card.innerHTML = `
            <h3>${member.name}</h3>
            <div class="spotlight-logo">
                <img src="images/${member.imageFile}" 
                     alt="${member.name} Business Logo" 
                     width="150" 
                     height="100" 
                     loading="lazy">
            </div>
            <p class="motto"><em>"${member.motto}"</em></p>
            <hr>
            <div class="contact-info">
                <p><strong>Phone:</strong> ${member.phone}</p>
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