document.addEventListener('DOMContentLoaded', () => {
    // 1. Set the hidden timestamp field upon page load
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Modal Functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-button');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                // Accessibility: Set focus to the close button so keyboard users can exit easily
                const closeBtn = modal.querySelector('.close-button');
                if (closeBtn) closeBtn.focus();
            }
        });
    });

    const closeModal = (modal) => {
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeModal(closeBtn.closest('.modal'));
        });
    });

    // Close on clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    // Accessibility: Close on Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) closeModal(openModal);
        }
    });
});