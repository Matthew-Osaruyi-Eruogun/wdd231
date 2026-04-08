/* summary.js */

// 1. Define the Observer FIRST to avoid hoisting issues
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Swap data-src to real src
            img.classList.remove('lazy');
            observer.unobserve(img); // Stop watching once loaded
        }
    });
}, { rootMargin: "0px 0px 200px 0px" });

// 2. Data for the gallery
const styleImages = [
    { src: "https://picsum.photos/600/800?random=31", alt: "Iro & Buba", loading: "eager" },
    { src: "https://picsum.photos/600/800?random=32", alt: "Agbada", loading: "eager" },
    { src: "https://picsum.photos/600/800?random=33", alt: "Ankara Style" },
    { src: "https://picsum.photos/600/800?random=34", alt: "Lace Design" }
];

// --- TASK 1: BUDGET RETRIEVAL (Criterion 9 - Local Storage) ---
function displayBudget() {
    const data = JSON.parse(localStorage.getItem('asoEbiData')) || [];
    const display = document.getElementById('total-display');
    const list = document.getElementById('outfit-list');

    // Safety check: only run if elements exist on current page
    if (!display || !list) return;

    if (data.length === 0) {
        display.innerHTML = "<p>No outfits logged yet.</p>";
        return;
    }

    // Array Method: Reduce (Criterion 11)
    const totalInvestment = data.reduce((sum, item) => sum + item.total, 0);
    display.innerHTML = `<h3>Total Investment: ₦${totalInvestment.toLocaleString()}</h3>`;

    // Array Method: Map (Criterion 11)
    list.innerHTML = data.map(item => `
        <div class="outfit-card">
            <p><strong>${item.name}</strong>: ₦${item.total.toLocaleString()} (${item.date})</p>
        </div>
    `).join('');
}

// --- TASK 2: LAZY LOADING (Criterion 12 - Performance) ---
function setupGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return; // Safety check

    styleImages.forEach(imgData => {
        const img = document.createElement('img');
        img.alt = imgData.alt;

        if (imgData.loading === "eager") {
            img.src = imgData.src;
        } else {
            // Intersection Observer setup
            img.dataset.src = imgData.src;
            img.classList.add('lazy');
            img.src = "images/placeholder.png"; // Use a tiny placeholder image
            observer.observe(img);
        }

        container.appendChild(img);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayBudget();
    setupGallery();
});