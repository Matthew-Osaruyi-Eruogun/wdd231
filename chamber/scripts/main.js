// --- FOOTER DATES ---
const yearSpan = document.querySelector('#copyright-year') || document.querySelector('#currentyear');
const lastModifiedSpan = document.querySelector('#last-modified') || document.querySelector('#lastModified');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
// document.lastModified returns the full date/time string from the server
if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

// --- MOBILE NAVIGATION TOGGLE ---
const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('.navigation');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', isOpen);

        // Accessibility: Update the label for screen readers
        menuButton.setAttribute('aria-label', isOpen ? 'Close Menu' : 'Open Menu');

        // Toggle between hamburger (☰) and X (×)
        menuButton.innerHTML = isOpen ? '<span>&times;</span>' : '<span>&#9776;</span>';
    });
}

// --- DIRECTORY LOGIC ---
const directoryContainer = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

if (directoryContainer) {
    const createMemberElement = (member, index) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        let levelName = 'Basic';
        if (member.membershipLevel === 3 || member.membershipLevel === 'Gold') levelName = 'Gold';
        if (member.membershipLevel === 2 || member.membershipLevel === 'Silver') levelName = 'Silver';

        // LCP Optimization: Eager load the first 2 images
        const loadingStrategy = index < 2 ? 'eager' : 'lazy';

        card.innerHTML = `
            <img src="images/${member.imageFile || member.logoUrl.split('/').pop()}" 
                 alt="${member.name || member.companyName} logo" 
                 loading="${loadingStrategy}" 
                 width="200" 
                 height="150">
            <h3>${member.name || member.companyName}</h3>
            <p><strong>${levelName} Member</strong></p>
            <p><em>${member.motto || 'Community Partner'}</em></p>
            <hr>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website || member.websiteUrl}" target="_blank" rel="noopener">Visit Website</a></p>
        `;
        return card;
    };

    const displayMembers = async () => {
        try {
            // Updated to look for data folder in common chamber paths
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Data fetch failed');
            const members = await response.json();

            directoryContainer.innerHTML = '';
            members.forEach((member, index) => {
                directoryContainer.appendChild(createMemberElement(member, index));
            });
        } catch (error) {
            console.error('Error loading members:', error);
            directoryContainer.innerHTML = '<p>Unable to load member directory at this time.</p>';
        }
    };

    displayMembers();

    if (gridButton && listButton) {
        gridButton.addEventListener('click', () => {
            directoryContainer.classList.replace('list-view', 'grid-view');
            gridButton.classList.add('view-active');
            listButton.classList.remove('view-active');
        });

        listButton.addEventListener('click', () => {
            directoryContainer.classList.replace('grid-view', 'list-view');
            listButton.classList.add('view-active');
            gridButton.classList.remove('view-active');
        });
    }
}