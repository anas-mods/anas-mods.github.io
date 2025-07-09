/* 2025 Gabe Mods (https://gabemods.github.io/about), All Rights Reserved. 
 */

document.addEventListener('DOMContentLoaded', () => {
    const downloadModal = document.getElementById('download-modal');
    const directDownloadButton = document.getElementById('direct-download-button');
    const telegramDownloadButton = document.getElementById('telegram-download-button');
    const closeDownloadModalButton = document.getElementById('close-download-modal');
    const cards = document.querySelectorAll('.card-container');
    
    function openDownloadModal(telegramUrl, directUrl) {
        
        telegramDownloadButton.href = telegramUrl;
        directDownloadButton.href = directUrl;
        
        if (downloadModal) {
            
            downloadModal.classList.remove('hide');
            
            downloadModal.setAttribute('open', '');
            
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    downloadModal.classList.add('show');
                });
            });
        }
    }
    
    function closeDownloadModal() {
        if (downloadModal) {
            downloadModal.classList.remove('show');
            downloadModal.classList.add('hide');
            
            downloadModal.addEventListener('transitionend', function handler(event) {
                
                if (event.propertyName === 'opacity' || event.propertyName === 'transform') {
                    
                    if (parseFloat(getComputedStyle(downloadModal).opacity) < 0.1) {
                        downloadModal.removeAttribute('open');
                        downloadModal.classList.remove('hide');
                        downloadModal.removeEventListener('transitionend', handler);
                    }
                }
            }, { once: true });
        }
    }
    
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
    
    if (closeDownloadModalButton) {
        closeDownloadModalButton.addEventListener('click', () => {
            closeDownloadModal();
        });
    }
    
    if (downloadModal) {
        downloadModal.addEventListener('cancel', (event) => {
            event.preventDefault();
            closeDownloadModal();
        });
    }
    
    const body = document.body;
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
                if (downloadModal.hasAttribute('open')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            }
        }
    });
    if (downloadModal) {
        observer.observe(downloadModal, { attributes: true, attributeFilter: ['open'] });
    }
});