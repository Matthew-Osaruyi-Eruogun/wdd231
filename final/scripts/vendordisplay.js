// vendorDisplay.js

/**
 * Global variable to hold all vendors loaded from the JSON file.
 * This is necessary for implementing the filtering without re-fetching data.
 */
let allVendors = [];

/**
 * Renders the list of vendors onto the DOM.
 * @param {Array<Object>} vendors - The list of vendors to display.
 */
function displayVendors(vendors) {
    const vendorList = document.getElementById('vendor-list');
    vendorList.innerHTML = ''; // Clear previous content (including 'Loading...')

    if (vendors.length === 0) {
        vendorList.innerHTML = '<p class="no-results">No vendors match your current filter selection.</p>';
        return;
    }

    vendors.forEach(vendor => {
        // Required Dynamic Content Generation (min 4 distinct data properties/values)
        // 1. Name, 2. Type, 3. Location, 4. Rating (plus Specialties shown below)

        // Use Template Literals for efficient string construction
        const vendorCard = document.createElement('div');
        vendorCard.classList.add('vendor-card');
        vendorCard.setAttribute('data-id', vendor.id); // For Local Storage tracking

        vendorCard.innerHTML = `
            <img src="${vendor.logo_url || 'images/logo-placeholder.png'}" alt="${vendor.name} logo" class="vendor-logo" loading="lazy">
            <h3>${vendor.name}</h3>
            <p class="vendor-type">${vendor.type}</p>
            <p class="vendor-location">Location: <strong>${vendor.location}</strong></p>
            <p class="vendor-rating">Rating: ${'⭐'.repeat(Math.round(vendor.rating))} (${vendor.rating})</p>
            <p class="vendor-specialties">Specializes in: ${vendor.specialties.join(', ')}</p>
            <button class="cta-secondary view-profile" data-vendor-name="${vendor.name}" data-vendor-id="${vendor.id}">View Profile</button>
        `;

        vendorList.appendChild(vendorCard);
    });

    // Attach event listeners for Local Storage Tracking
    document.querySelectorAll('.view-profile').forEach(button => {
        button.addEventListener('click', handleProfileClick);
    });
}


/**
 * REQUIRED: Data Fetching with Asynchronous functionality and try...catch.
 * Retrieves vendor data from the local JSON file.
 */
async function getVendorData() {
    const vendorList = document.getElementById('vendor-list');
    vendorList.innerHTML = '<p id="loading-message">Loading vendor data...</p>';

    try {
        // Fetch API asynchronous request
        const response = await fetch('data/vendors.json');

        if (!response.ok) {
            // Robust Error Handling for failed response (e.g., 404)
            throw new Error(`HTTP error! status: ${response.status} - Could not retrieve data.`);
        }

        const data = await response.json(); // Handle the response by parsing JSON
        allVendors = data.vendors; // Store all vendors globally

        displayVendors(allVendors);

    } catch (error) {
        // Try...Catch block for error handling
        console.error('Failed to fetch or process vendor data:', error);
        vendorList.innerHTML = '<p class="error-message">Error loading vendor directory. Please check the network connection.</p>';
    }
}


/**
 * REQUIRED: Array Method (Filter).
 * Filters the global vendor list based on the selected type.
 */
function filterVendors(event) {
    const selectedType = event.target.value;

    if (selectedType === 'all') {
        displayVendors(allVendors); // Show all if 'all' is selected
    } else {
        // Use the Array.prototype.filter() method
        const filteredVendors = allVendors.filter(vendor =>
            vendor.type === selectedType
        );
        displayVendors(filteredVendors);
    }
}


/**
 * REQUIRED: Local Storage Implementation.
 * Saves the last viewed vendor ID and Name to localStorage.
 */
function handleProfileClick(event) {
    const vendorName = event.target.getAttribute('data-vendor-name');
    const vendorId = event.target.getAttribute('data-vendor-id');

    // Persist data client-side
    localStorage.setItem('lastVendorId', vendorId);
    localStorage.setItem('lastVendorName', vendorName);

    // Optional: Simulate viewing the profile
    alert(`Navigating to the profile of ${vendorName} (ID: ${vendorId}).`);
    // In a real app, this would navigate to a detailed vendor page
}

/**
 * Initializes the vendor directory page logic.
 * Called when the vendors.html page loads.
 */
export function initVendorDirectory() {
    // 1. Load Data
    getVendorData();

    // 2. Attach Array Method Event Listener
    const filterSelect = document.getElementById('vendor-type');
    if (filterSelect) {
        // DOM Manipulation and Event Handling: Attaching the filter logic
        filterSelect.addEventListener('change', filterVendors);
    }
}

// Call the initialization function when the script loads
initVendorDirectory();