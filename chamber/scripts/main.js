// --- FOOTER DATES ---
const yearSpan = document.querySelector('#copyright-year') || document.querySelector('#currentyear');
const lastModifiedSpan = document.querySelector('#last-modified') || document.querySelector('#lastModified');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModifiedSpan) lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;

// --- MOBILE NAVIGATION TOGGLE ---
const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('.navigation');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', isOpen);
        // Toggle between hamburger (☰) and X (×)
        menuButton.innerHTML = isOpen ? '<span>&times;</span>' : '<span>&#9776;</span>';
    });
}

// --- DIRECTORY LOGIC ---
const directoryContainer = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

// Only run this if we are on the Directory page
if (directoryContainer) {
    const createMemberElement = (member, index) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        // Logic to handle both numeric (3, 2, 1) and string ("Gold", "Silver") levels
        let levelName = 'Basic';
        if (member.membershipLevel === 3 || member.membershipLevel === 'Gold') levelName = 'Gold';
        if (member.membershipLevel === 2 || member.membershipLevel === 'Silver') levelName = 'Silver';

        // Performance: Eager load the first 2 images to help LCP (Largest Contentful Paint)
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

    // View Toggle Listeners
    if (gridButton && listButton) {
        gridButton.addEventListener('click', () => {
            directoryContainer.classList.add('grid-view');
            directoryContainer.classList.remove('list-view');
            gridButton.classList.add('view-active');
            listButton.classList.remove('view-active');
        });

        listButton.addEventListener('click', () => {
            directoryContainer.classList.add('list-view');
            directoryContainer.classList.remove('grid-view');
            listButton.classList.add('view-active');
            gridButton.classList.remove('view-active');
        });
    }
}