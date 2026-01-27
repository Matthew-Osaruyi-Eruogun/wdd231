// --- FOOTER DATES ---
const yearSpan = document.getElementById('copyright-year');
const lastModifiedSpan = document.getElementById('last-modified');

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

// --- MOBILE NAVIGATION TOGGLE ---
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', isOpen);
        // Using text labels or accessible icons
        menuButton.innerHTML = isOpen ? '<span>&times;</span>' : '<span>&#9776;</span>';
    });
}

// --- SHARED DIRECTORY LOGIC ---

const directoryContainer = document.getElementById('directory-container');
const gridButton = document.getElementById('grid-button');
const listButton = document.getElementById('list-button');

const createMemberElement = (member, index) => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    // Matches JSON levels (adjust if your JSON uses strings)
    const levelName = member.membershipLevel === 3 ? 'Gold' :
        member.membershipLevel === 2 ? 'Silver' : 'Basic';

    // Performance: Eager load the first 2 images, lazy load the rest
    const loadingStrategy = index < 2 ? 'eager' : 'lazy';

    card.innerHTML = `
        <img src="images/${member.imageFile}" 
             alt="${member.name} logo" 
             loading="${loadingStrategy}" 
             width="200" 
             height="150">
        <h3>${member.name}</h3>
        <p><strong>${levelName} Member</strong></p>
        <p><em>${member.motto}</em></p>
        <hr>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener" aria-label="Visit ${member.name} website">
            ${member.website.replace('https://', '').replace('http://', '')}
        </a>
    `;
    return card;
};

// --- INITIALIZATION ---
if (directoryContainer) {
    const displayMembers = async () => {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json();
            directoryContainer.innerHTML = '';
            members.forEach((member, index) => {
                directoryContainer.appendChild(createMemberElement(member, index));
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    displayMembers();
}

// --- VIEW TOGGLES ---
if (gridButton && listButton) {
    gridButton.addEventListener('click', () => {
        directoryContainer.classList.add('grid-view');
        directoryContainer.classList.remove('list-view');
    });
    listButton.addEventListener('click', () => {
        directoryContainer.classList.add('list-view');
        directoryContainer.classList.remove('grid-view');
    });
}