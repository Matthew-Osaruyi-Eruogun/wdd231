document.addEventListener('DOMContentLoaded', () => {
    // 1. Set the hidden timestamp field upon page load
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        // Formats as YYYY-MM-DDTHH:mm:ss.sssZ
        timestampField.value = new Date().toISOString();
    }

    // 2. Modal Functionality using <dialog> element
    // Selects the 'Learn More' buttons
    const modalTriggers = document.querySelectorAll('.modal-open');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-target');
            const modal = document.getElementById(modalId);

            if (modal) {
                // .showModal() is the native method for <dialog> tags
                modal.showModal();
            }
        });
    });

    // Handle closing the modals
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal if user clicks the backdrop (outside the dialog box)
    const dialogs = document.querySelectorAll('dialog');
    dialogs.forEach(dialog => {
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });
});