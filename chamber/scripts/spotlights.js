const DATA_URL = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Failed to fetch members');
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlight-container');

    // Filter for Gold (3) and Silver (2) levels
    const goldAndSilver = members.filter(member =>
        member.membershipLevel === 'Gold' ||
        member.membershipLevel === 'Silver' ||
        member.membershipLevel === 3 ||
        member.membershipLevel === 2
    );

    // Randomize: Fisher-Yates Shuffle
    for (let i = goldAndSilver.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [goldAndSilver[i], goldAndSilver[j]] = [goldAndSilver[j], goldAndSilver[i]];
    }

    const selectedSpotlights = goldAndSilver.slice(0, 3);
    spotlightsContainer.innerHTML = '';

    selectedSpotlights.forEach(member => {
        const card = document.createElement('article');
        card.classList.add('spotlight-card', 'card');

        // Logic to display name if level is numeric
        const levelDisplay = (member.membershipLevel === 3 || member.membershipLevel === 'Gold') ? 'Gold' : 'Silver';

        card.innerHTML = `
            <h3>${member.companyName || member.name}</h3>
            <img src="${member.logoUrl || 'images/' + member.imageFile}" 
                 alt="${member.companyName || member.name} Logo" 
                 loading="lazy" width="150" height="100">
            <p><strong>Level:</strong> ${levelDisplay}</p>
            <hr>
            <p>📞 ${member.phone}</p>
            <p>📍 ${member.address}</p>
            <p><a href="${member.websiteUrl || member.website}" target="_blank" rel="noopener">
                Visit Website
            </a></p>
        `;
        spotlightsContainer.appendChild(card);
    });
}
getSpotlights();