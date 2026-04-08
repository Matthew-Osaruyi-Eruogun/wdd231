/* vendordisplay.js */
let allVendors = [];

// Dynamic Content Generation using Template Literals (Criterion 11)
function displayVendors(vendors) {
    const vendorList = document.getElementById('vendor-list');
    vendorList.innerHTML = vendors.map(vendor => `
        <div class="vendor-card">
            <img src="${vendor.logo_url || 'images/placeholder.png'}" alt="${vendor.name}" loading="lazy">
            <h3>${vendor.name}</h3>
            <p class="vendor-type">Type: ${vendor.type}</p>
            <p class="vendor-location">📍 ${vendor.location}</p>
            <p class="vendor-rating">Rating: ${'⭐'.repeat(Math.round(vendor.rating))}</p>
            <button class="view-profile" data-id="${vendor.id}">View Details</button>
        </div>
    `).join('');
}

// Data Fetching with Try/Catch (Criterion 12)
async function getVendorData() {
    try {
        const response = await fetch('data/vendors.json');
        if (!response.ok) throw new Error('Data fetch failed');
        const data = await response.json();
        allVendors = data.vendors;
        displayVendors(allVendors);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('vendor-list').innerHTML = '<p>Unable to load vendors.</p>';
    }
}

// Array Methods: Filter (Criterion 11)
function setupFilter() {
    const filterSelect = document.getElementById('vendor-type');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const filtered = e.target.value === 'all'
                ? allVendors
                : allVendors.filter(v => v.type === e.target.value);
            displayVendors(filtered);
        });
    }
}

export function initVendorDirectory() {
    getVendorData();
    setupFilter();
}