/* 2025 Gabe Mods (https://gabemods.github.io/about), All Rights Reserved.
 */

document.getElementById("current-year").textContent = new Date().getFullYear();

const imageTitleContainer = document.querySelector('.image-title-container');
const textTitleContainer = document.querySelector('.text-title-container');

function toggleTitle() {
  imageTitleContainer.classList.toggle('hidden');
  textTitleContainer.classList.toggle('hidden');
}

imageTitleContainer.addEventListener('click', toggleTitle);
textTitleContainer.addEventListener('click', toggleTitle);

document.addEventListener('DOMContentLoaded', () => {
    const toastNotification = document.getElementById('toast-notification');

    if (toastNotification) {
        function showToast(message, duration = 4000) {
            toastNotification.textContent = message;
            toastNotification.classList.add('show');

            setTimeout(() => {
                toastNotification.classList.remove('show');
            }, duration);
        }

        showToast("Tap the site title to change between text and logo");
    } else {
        console.warn("Toast notification element not found. Toast messages will not appear.");
    }
});