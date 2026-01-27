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

    const goldAndSilver = members.filter(member =>
        member.membershipLevel === 'Gold' ||
        member.membershipLevel === 'Silver' ||
        member.membershipLevel === 3 ||
        member.membershipLevel === 2
    );

    for (let i = goldAndSilver.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [goldAndSilver[i], goldAndSilver[j]] = [goldAndSilver[j], goldAndSilver[i]];
    }

    const selectedSpotlights = goldAndSilver.slice(0, 3);
    spotlightsContainer.innerHTML = '';

    selectedSpotlights.forEach(member => {
        const card = document.createElement('article');
        card.classList.add('spotlight-card', 'card');

        const companyName = member.companyName || member.name;
        const levelDisplay = (member.membershipLevel === 3 || member.membershipLevel === 'Gold') ? 'Gold' : 'Silver';

        card.innerHTML = `
            <h3>${companyName}</h3>
            <img src="${member.logoUrl || 'images/' + member.imageFile}" 
                 alt="${companyName} Logo" 
                 loading="lazy" width="150" height="100">
            <p><strong>Level:</strong> ${levelDisplay}</p>
            <hr>
            <p>📞 ${member.phone}</p>
            <p>📍 ${member.address}</p>
            <p><a href="${member.websiteUrl || member.website}" 
                  target="_blank" 
                  rel="noopener" 
                  aria-label="Visit ${companyName} website">
                Visit Website
            </a></p>
        `;
        spotlightsContainer.appendChild(card);
    });
}
getSpotlights();