// --- 1. FOOTER DATES & FORMATTING ---
const yearSpan = document.querySelector('#copyright-year');
const lastModifiedSpan = document.querySelector('#last-modified');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    const lastMod = new Date(document.lastModified);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).format(lastMod);

    lastModifiedSpan.textContent = `Last Modification: ${formattedDate}`;
}

// --- 2. MOBILE NAVIGATION TOGGLE ---
const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('.navigation');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', isOpen);
        menuButton.setAttribute('aria-label', isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu');
        // Clean innerHTML toggle
        menuButton.innerHTML = isOpen ? '<span>&times;</span>' : '<span>&#9776;</span>';
    });
}

// --- 3. DIRECTORY LOGIC ---
const directoryContainer = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

if (directoryContainer) {
    const createMemberElement = (member, index) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        // Membership Level Logic
        let levelName = 'Basic';
        if (member.membershipLevel === 3 || member.membershipLevel === 'Gold') levelName = 'Gold';
        else if (member.membershipLevel === 2 || member.membershipLevel === 'Silver') levelName = 'Silver';

        // LCP Optimization: First 2 images load fast, others lazy load
        const loadingStrategy = index < 2 ? 'eager' : 'lazy';
        const fetchPriority = index < 2 ? 'high' : 'auto';
        const companyName = member.name || member.companyName || "Chamber Member";

        card.innerHTML = `
            <img src="images/${member.imageFile || 'placeholder.webp'}" 
                 alt="${companyName} logo" 
                 loading="${loadingStrategy}" 
                 fetchpriority="${fetchPriority}"
                 width="200" 
                 height="150"
                 style="object-fit: contain;">
            <h3>${companyName}</h3>
            <p class="membership-badge"><strong>${levelName} Member</strong></p>
            <p class="motto"><em>${member.motto || 'Building Edo State together'}</em></p>
            <hr>
            <div class="contact-info">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" 
                      target="_blank" 
                      rel="noopener" 
                      aria-label="Visit the official website of ${companyName}">Visit Website</a></p>
            </div>
        `;
        return card;
    };

    const displayMembers = async () => {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Could not load member data.');
            const members = await response.json();

            directoryContainer.innerHTML = '';
            members.forEach((member, index) => {
                directoryContainer.appendChild(createMemberElement(member, index));
            });
        } catch (error) {
            console.error('Error loading members:', error);
            directoryContainer.innerHTML = '<p class="error">The member directory is currently unavailable.</p>';
        }
    };

    displayMembers();

    if (gridButton && listButton) {
        gridButton.addEventListener('click', () => {
            directoryContainer.className = 'grid-view';
            gridButton.classList.add('view-active');
            listButton.classList.remove('view-active');
        });

        listButton.addEventListener('click', () => {
            directoryContainer.className = 'list-view';
            listButton.classList.add('view-active');
            gridButton.classList.remove('view-active');
        });
    }
}