// gallery.js

/**
 * REQUIRED: Modal Dialog Logic.
 * Handles opening and closing the style details modal using DOM Manipulation and Event Handling.
 */
function setupModalLogic() {
    // Select elements using appropriate methods (querySelector, querySelectorAll)
    const modal = document.getElementById('style-modal');
    const closeButton = document.querySelector('.close-button');
    const styleCards = document.querySelectorAll('.style-card-item');

    // Attach click listeners to gallery cards
    styleCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card);
        });
    });

    // Attach event listener to close button
    closeButton.addEventListener('click', closeModal);

    // Attach event listener to modal overlay (close when clicking outside)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Attach event listener for keyboard accessibility (close on ESC key)
    document.addEventListener('keydown', (e) => {
        // Checks if modal is open (!modal.getAttribute('aria-hidden'))
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });
}

/**
 * Opens the modal and populates it with data from the clicked card.
 * @param {HTMLElement} card - The style card element that was clicked.
 */
function openModal(card) {
    const modal = document.getElementById('style-modal');

    // DOM Manipulation: Modifying element properties/content (Using data attributes from HTML)
    document.getElementById('modal-image').src = card.getAttribute('data-img');
    document.getElementById('modal-image').alt = card.getAttribute('data-title');
    document.getElementById('modal-title').textContent = card.getAttribute('data-title');
    document.getElementById('modal-fabric').textContent = card.getAttribute('data-fabric');
    document.getElementById('modal-designer').textContent = card.getAttribute('data-designer');

    // Display the modal and update accessibility attributes
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');

    // Optional: Focus the close button for better keyboard navigation
    document.querySelector('.close-button').focus();
}

/**
 * Closes the modal and updates accessibility attributes.
 */
function closeModal() {
    const modal = document.getElementById('style-modal');

    // DOM Manipulation: Modifying element style/class
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
}

// Initialize the modal setup when the script loads
setupModalLogic();