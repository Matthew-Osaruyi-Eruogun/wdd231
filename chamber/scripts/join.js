document.addEventListener('DOMContentLoaded', () => {
    // 1. Set the hidden timestamp field upon page load
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        // Set the value to the current ISO date/time string
        timestampField.value = new Date().toISOString();
    }

    // 2. Modal Functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-button');

    // Function to open the modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent link from navigating
            const modalId = event.target.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                modal.focus(); // Focus on the modal for accessibility
            }
        });
    });

    // Function to close the modal using the close button
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Close modal when clicking outside (on the modal overlay itself)
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            event.target.setAttribute('aria-hidden', 'true');
        }
    });
});