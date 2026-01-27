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

    // Filter for Gold and Silver only
    const goldAndSilver = members.filter(member =>
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
    );

    // Randomize: Fisher-Yates Shuffle
    for (let i = goldAndSilver.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [goldAndSilver[i], goldAndSilver[j]] = [goldAndSilver[j], goldAndSilver[i]];
    }

    // Select 3 members
    const selectedSpotlights = goldAndSilver.slice(0, 3);

    spotlightsContainer.innerHTML = '';

    selectedSpotlights.forEach(member => {
        const card = document.createElement('article'); 
        card.classList.add('spotlight-card', 'card');

        card.innerHTML = `
            <h3>${member.companyName}</h3>
            <img src="${member.logoUrl}" 
                 alt="${member.companyName} Logo" 
                 loading="lazy" 
                 width="150" 
                 height="100">
            <p><strong>Level:</strong> ${member.membershipLevel}</p>
            <hr>
            <p>📞 ${member.phone}</p>
            <p>📍 ${member.address}</p>
            <p><a href="${member.websiteUrl}" target="_blank" aria-label="Visit ${member.companyName} website">
                ${member.websiteUrl.replace('https://', '').replace('http://', '')}
            </a></p>
        `;
        spotlightsContainer.appendChild(card);
    });
}

getSpotlights();