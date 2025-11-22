// --- FOOTER DATES ---
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// --- MOBILE NAVIGATION TOGGLE ---
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', nav.classList.contains('open'));
});

// --- MEMBER DIRECTORY LOGIC ---
const directoryContainer = document.getElementById('directory-container');
const gridButton = document.getElementById('grid-button');
const listButton = document.getElementById('list-button');

// Function to create a single member card/list item
const createMemberElement = (member) => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    // Display level badge (optional styling for Gold/Silver/Regular)
    const levelName = member.membershipLevel === 3 ? 'Gold' : member.membershipLevel === 2 ? 'Silver' : 'Basic';
    card.innerHTML = `
        <img src="images/${member.imageFile}" alt="${member.name} logo" loading="lazy">
        <h3 class="member-name">${member.name}</h3>
        <p class="member-level">Membership: ${levelName}</p>
        <p class="member-motto">${member.motto}</p>
        <hr>
        <p class="member-address">${member.address}</p>
        <p class="member-phone">${member.phone}</p>
        <a href="${member.website}" target="_blank" class="member-website">${member.website.replace('https://', '')}</a>
    `;
    return card;
};

// Function to fetch and display members
const displayMembers = async () => {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        directoryContainer.innerHTML = ''; // Clear existing content
        members.forEach(member => {
            directoryContainer.appendChild(createMemberElement(member));
        });
    } catch (error) {
        console.error('Error fetching member data:', error);
        directoryContainer.innerHTML = '<p>Sorry, the business directory is currently unavailable.</p>';
    }
};

// --- VIEW TOGGLE FUNCTIONALITY ---
const switchView = (view) => {
    // Update the class on the container
    directoryContainer.classList.remove('grid-view', 'list-view');
    directoryContainer.classList.add(`${view}-view`);

    // Update button visual state
    gridButton.classList.remove('view-active');
    listButton.classList.remove('view-active');
    if (view === 'grid') {
        gridButton.classList.add('view-active');
    } else {
        listButton.classList.add('view-active');
    }
};

// Event Listeners for the buttons
gridButton.addEventListener('click', () => switchView('grid'));
listButton.addEventListener('click', () => switchView('list'));

// Load members when the page loads
displayMembers();

        // Set the hidden timestamp field upon page load
        document.addEventListener('DOMContentLoaded', () => {
            const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        // Set the value to the current ISO date/time string
        timestampField.value = new Date().toISOString();
            }

    // Modal Functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-button');

            modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = event.target.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                modal.focus(); // Focus on the modal for accessibility
            }
        });
            });

            closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
            });

            // Close modal when clicking outside (optional but good practice)
            window.addEventListener('click', (event) => {
                if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        event.target.setAttribute('aria-hidden', 'true');
                }
            });
        });

        