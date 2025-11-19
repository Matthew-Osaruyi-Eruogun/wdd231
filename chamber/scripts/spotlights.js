const DATA_URL = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(DATA_URL);
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights');
    const goldAndSilver = members.filter(member =>
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
    );

    // 1. Shuffle the array to ensure randomization
    for (let i = goldAndSilver.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [goldAndSilver[i], goldAndSilver[j]] = [goldAndSilver[j], goldAndSilver[i]];
    }

    // 2. Select the first two or three (let's use 3)
    const selectedSpotlights = goldAndSilver.slice(0, 3);

    // Clear the placeholder title and replace it with the actual cards
    spotlightsContainer.innerHTML = '<h2>Member Spotlights ✨</h2>';

    selectedSpotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <h3>${member.companyName}</h3>
            <img src="${member.logoUrl}" alt="${member.companyName} Logo" loading="lazy">
            <p>Membership: ${member.membershipLevel}</p>
            <hr>
            <p>📞 ${member.phone}</p>
            <p>🏠 ${member.address}</p>
            <p><a href="${member.websiteUrl}" target="_blank">${member.websiteUrl.replace('http://', '').replace('https://', '')}</a></p>
        `;
        spotlightsContainer.appendChild(card);
    });
}

getSpotlights();