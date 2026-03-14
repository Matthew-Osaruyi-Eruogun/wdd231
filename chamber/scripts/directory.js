/**
 * Directory Functionality for Benin City Chamber of Commerce
 * Matthew Osaruyi Eruogun - WDD 231
 */

const url = "data/members.json";
const display = document.querySelector("#directory-container");
const gridbutton = document.querySelector("#grid-button");
const listbutton = document.querySelector("#list-button");

// --- 1. Fetch JSON Data ---
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            console.error("HTTP-Error: " + response.status);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// --- 2. Display Members Function ---
const displayMembers = (members) => {
    display.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        // Create elements
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let portrait = document.createElement("img");
        let level = document.createElement("p");

        // Fill content
        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;

        website.textContent = "Visit Website";
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");

        // Note: images/ path relative to chamber/ directory
        portrait.setAttribute("src", `images/${member.image}`);
        portrait.setAttribute("alt", `Logo for ${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "150");

        level.textContent = `Membership: ${getMembershipLevel(member.membershipLevel)}`;
        level.className = "membership-level";

        // Append to card
        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        // Append card to container
        display.appendChild(card);
    });
};

// Helper function to convert level numbers to text
const getMembershipLevel = (level) => {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
};

// --- 3. Grid/List Toggle Logic ---
gridbutton.addEventListener("click", () => {
    // Add/Remove classes to the container
    display.classList.add("grid-view");
    display.classList.remove("list-view");

    // Manage active button state
    gridbutton.classList.add("view-active");
    listbutton.classList.remove("view-active");
});

listbutton.addEventListener("click", () => {
    // Add/Remove classes to the container
    display.classList.add("list-view");
    display.classList.remove("grid-view");

    // Manage active button state
    listbutton.classList.add("view-active");
    gridbutton.classList.remove("view-active");
});

// --- 4. Footer Date Logic ---
// Matches your IDs: #copyright-year and #last-modified
const yearSpan = document.querySelector("#copyright-year");
const lastModSpan = document.querySelector("#last-modified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = `Last Modification: ${document.lastModified}`;

// Initialize
getMembers();