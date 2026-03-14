/** * Directory Functionality for Chamber of Commerce
 * Matthew Osaruyi Eruogun - WDD 231
 */

const url = "data/members.json";
const cards = document.querySelector("#cards-container"); // Ensure your HTML has an element with this ID
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

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
    cards.innerHTML = ""; 

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

        portrait.setAttribute("src", `images/${member.image}`); // Assumes images are in chamber/images/
        portrait.setAttribute("alt", `Logo for ${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "150");

        // Add class for membership level styling
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
        cards.appendChild(card);
    });
};

// Helper function to convert level numbers to text
const getMembershipLevel = (level) => {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
};

// --- 3. Grid/List Toggle Logic ---
gridButton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

// --- 4. Footer Date Logic ---
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Initialize
getMembers();