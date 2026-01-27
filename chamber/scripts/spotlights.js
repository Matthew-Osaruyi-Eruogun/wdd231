const DATA_URL = 'data/members.json';

async function getSpotlights() {
    try {
        const spotlightsContainer = document.getElementById('spotlight-container');
        if (!spotlightsContainer) return;

        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Failed to fetch members');
        const members = await response.json();
        displaySpotlights(members, spotlightsContainer);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displaySpotlights(members, spotlightsContainer) {
    // Filter for Gold (3) and Silver (2) levels
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

    // Select top 3 and clear container
    const selectedSpotlights = goldAndSilver.slice(0, 3);
    spotlightsContainer.innerHTML = '';

    selectedSpotlights.forEach(member => {
        const card = document.createElement('article');
        card.classList.add('spotlight-card', 'card');

        const companyName = member.companyName || member.name;
        const levelDisplay = (member.membershipLevel === 3 || member.membershipLevel === 'Gold') ? 'Gold' : 'Silver';

        // Use fallbacks for image paths and URLs
        const imageSource = member.logoUrl || (member.imageFile ? `images/${member.imageFile}` : 'images/placeholder.webp');
        const siteUrl = member.websiteUrl || member.website || '#';

        card.innerHTML = `
            <h3>${companyName}</h3>
            <img src="${imageSource}" 
                 alt="${companyName} Logo" 
                 loading="lazy" 
                 width="150" 
                 height="100">
            <p><strong>Level:</strong> ${levelDisplay}</p>
            <hr>
            <p>📞 ${member.phone}</p>
            <p>📍 ${member.address}</p>
            <p><a href="${siteUrl}" 
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