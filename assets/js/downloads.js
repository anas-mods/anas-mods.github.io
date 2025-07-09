/* 2025 Gabe Mods (https://gabemods.github.io/about), All Rights Reserved.
 */

document.addEventListener('DOMContentLoaded', () => {
    const downloadModal = document.getElementById('download-modal');
    const directDownloadButton = document.getElementById('direct-download-button');
    const telegramDownloadButton = document.getElementById('telegram-download-button');
    const closeDownloadModalButton = document.getElementById('close-download-modal');
    const cards = document.querySelectorAll('.card-container');
    const backdrop = document.getElementById('backdrop'); // This should match your HTML element ID

    function openDownloadModal(telegramUrl, directUrl) {
        if (!downloadModal || !backdrop) {
            console.error("Download modal or backdrop element not found.");
            return;
        }

        telegramDownloadButton.href = telegramUrl;
        directDownloadButton.href = directUrl;

        // Step 1: Manage backdrop (same as settings dialog)
        backdrop.classList.remove('hidden');
        requestAnimationFrame(() => {
            backdrop.classList.add('show');
        });

        // Step 2: Use showModal() for native dialog behavior (handles body overflow and default positioning)
        if (!downloadModal.open) { // Check if it's not already open
            downloadModal.showModal(); // Opens the dialog natively, positions it
            // Use requestAnimationFrame to ensure CSS applies for transition
            requestAnimationFrame(() => {
                downloadModal.classList.add('show'); // Apply the general 'dialog.show' class for animation
                downloadModal.classList.remove('hide'); // Ensure 'hide' is not present
            });
        }
    }

    function closeDownloadModal() {
        if (!downloadModal || !backdrop) {
            console.error("Download modal or backdrop element not found.");
            return;
        }

        // Step 1: Start CSS closing animation by removing 'show' and adding 'hide'
        downloadModal.classList.remove('show');
        downloadModal.classList.add('hide');

        // Step 2: Hide backdrop immediately for its animation
        backdrop.classList.remove('show');

        // Step 3: Use setTimeout to allow CSS transition to complete before calling close()
        // This matches the general dialog transition duration (0.3s = 300ms)
        setTimeout(() => {
            downloadModal.close(); // Natively closes the dialog (releases body overflow)
            backdrop.classList.add('hidden'); // Fully hide backdrop after animation
            downloadModal.classList.remove('hide'); // Clean up 'hide' class after dialog is truly closed
        }, 300); // Changed to 300ms to match your general dialog transition: opacity 0.3s ease-out, transform 0.3s ease-out
    }

    // --- Event Listeners ---

    // Card click to open download modal
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const telegramUrl = card.dataset.telegramUrl;
            const directUrl = card.dataset.directUrl;

            if (telegramUrl || directUrl) {
                openDownloadModal(telegramUrl, directUrl);
            } else {
                console.warn('No download URLs specified for this card.', card);
            }
        });
    });

    // Close button inside the download modal
    if (closeDownloadModalButton) {
        closeDownloadModalButton.addEventListener('click', () => {
            closeDownloadModal();
        });
    }

    // Click outside the download modal on the backdrop to close it
    if (backdrop) {
        backdrop.addEventListener('click', e => {
            // Only close if the click was directly on the backdrop and the download modal is currently open
            if (e.target === backdrop && downloadModal.hasAttribute('open')) {
                closeDownloadModal();
            }
        });
    }

    // Escape key press on the download modal (using native 'cancel' event)
    if (downloadModal) {
        downloadModal.addEventListener('cancel', e => {
            e.preventDefault(); // Prevent default browser cancel behavior
            closeDownloadModal();
        });
    }
});
