document.addEventListener("DOMContentLoaded", () => {
    displayBudget();
    setupGallery();
});

// --- TASK 1: BUDGET RETRIEVAL ---
function displayBudget() {
    const data = JSON.parse(localStorage.getItem('asoEbiData')) || [];
    const display = document.getElementById('total-display');
    const list = document.getElementById('outfit-list');

    if (data.length === 0) {
        display.innerHTML = "<p>No outfits logged yet.</p>";
        return;
    }

    const totalInvestment = data.reduce((sum, item) => sum + item.total, 0);
    display.innerHTML = `<h3>Total Investment: ₦${totalInvestment.toLocaleString()}</h3>`;

    // Create simple list of entries
    list.innerHTML = data.map(item => `
        <div class="outfit-card">
            <p><strong>${item.name}</strong>: ₦${item.total} (${item.date})</p>
        </div>
    `).join('');
}

// --- TASK 2: LAZY LOADING GALLERY ---
const styleImages = [
    { src: "https://picsum.photos/600/800?random=31", alt: "Iro & Buba", loading: "eager" },
    { src: "https://picsum.photos/600/800?random=32", alt: "Agbada", loading: "eager" },
    { src: "https://picsum.photos/600/800?random=33", alt: "Ankara Style" },
    { src: "https://picsum.photos/600/800?random=34", alt: "Lace Design" }
];

function setupGallery() {
    const container = document.getElementById('gallery-container');

    styleImages.forEach(imgData => {
        const img = document.createElement('img');

        // Use native lazy loading for simplicity or Intersection Observer for the assignment requirement
        if (imgData.loading === "eager") {
            img.src = imgData.src;
        } else {
            img.dataset.src = imgData.src; // Store URL in data attribute
            img.classList.add('lazy');
            observer.observe(img);
        }

        img.alt = imgData.alt;
        container.appendChild(img);
    });
}

// Intersection Observer Logic
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Swap placeholder for real URL
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
}, { rootMargin: "0px 0px 200px 0px" }); // Start loading 200px before they scroll into view