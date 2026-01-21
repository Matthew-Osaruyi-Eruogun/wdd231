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
        menuButton.innerHTML = isOpen ? '&#10006;' : '&#9776;';
    });
}

// --- MEMBER DIRECTORY LOGIC ---
const directoryContainer = document.getElementById('directory-container');
const gridButton = document.getElementById('grid-button');
const listButton = document.getElementById('list-button');

/**
 * Creates a member card section */
const createMemberElement = (member, index) => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    const levelName = member.membershipLevel === 3 ? 'Gold' : member.membershipLevel === 2 ? 'Silver' : 'Basic';


    const isFirst = index === 0;
    const loadingStrategy = isFirst ? 'eager' : 'lazy';
    const priority = isFirst ? 'fetchpriority="high"' : '';

    card.innerHTML = `
        <img src="images/${member.imageFile}" 
             alt="${member.name} official logo" 
             loading="${loadingStrategy}" 
             ${priority}
             width="200" 
             height="150">
        <h3 class="member-name">${member.name}</h3>
        <p class="member-level">Membership: <strong>${levelName}</strong></p>
        <p class="member-motto"><em>${member.motto}</em></p>
        <hr>
        <p class="member-address">${member.address}</p>
        <p class="member-phone">${member.phone}</p>
        <a href="${member.website}" 
           target="_blank" 
           rel="noopener" 
           class="member-website" 
           aria-label="Visit ${member.name} website">
           ${member.website.replace('https://', '').replace('http://', '')}
        </a>
    `;
    return card;
};

const displayMembers = async () => {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const members = await response.json();

        if (directoryContainer) {
            directoryContainer.innerHTML = '';
                members.forEach((member, index) => {
                directoryContainer.appendChild(createMemberElement(member, index));
            });
        }
    } catch (error) {
        console.error('Error fetching member data:', error);
        if (directoryContainer) {
            directoryContainer.innerHTML = '<p class="error-msg">Sorry, the business directory is currently unavailable.</p>';
        }
    }
};

// --- VIEW TOGGLE FUNCTIONALITY ---
const switchView = (view) => {
    if (directoryContainer && gridButton && listButton) {
        directoryContainer.classList.remove('grid-view', 'list-view');
        directoryContainer.classList.add(`${view}-view`);

        if (view === 'grid') {
            gridButton.classList.add('view-active');
            listButton.classList.remove('view-active');
            gridButton.setAttribute('aria-pressed', 'true');
            listButton.setAttribute('aria-pressed', 'false');
        } else {
            listButton.classList.add('view-active');
            gridButton.classList.remove('view-active');
            listButton.setAttribute('aria-pressed', 'true');
            gridButton.setAttribute('aria-pressed', 'false');
        }
    }
};

// Initialize Directory
if (gridButton && listButton) {
    gridButton.addEventListener('click', () => switchView('grid'));
    listButton.addEventListener('click', () => switchView('list'));
    displayMembers();
}

// --- FORM & MODAL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-button');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                // Check if browser supports showModal(), otherwise fallback to display block
                if (typeof modal.showModal === "function") {
                    modal.showModal();
                }
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                if (typeof modal.close === "function") {
                    modal.close();
                }
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });
});