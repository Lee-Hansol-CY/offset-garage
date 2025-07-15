// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // About Overlay logic
    const aboutButton = document.getElementById('about-button');
    const closeAboutButton = document.getElementById('close-about-button');
    const aboutOverlay = document.getElementById('about-overlay');

    // CRITICAL FIX: Ensure About overlay is hidden on page load
    // This explicitly adds the 'hidden' class, ensuring it's not visible initially.
    if (aboutOverlay) {
        aboutOverlay.classList.add('hidden');
    }

    if (aboutButton) {
        aboutButton.addEventListener('click', () => {
            if (aboutOverlay) {
                aboutOverlay.classList.remove('hidden');
            }
        });
    }

    if (closeAboutButton) {
        closeAboutButton.addEventListener('click', () => {
            if (aboutOverlay) {
                aboutOverlay.classList.add('hidden');
            }
        });
    }

    // Initialize thumbnails based on the current page
    if (document.body.id === 'main-page') { // Add id="main-page" to body in index.html
        initializeThumbnails('art-grid', true); // Enable dragging for main page
    } else if (document.body.id === 'inkdrop-page') { // Add id="inkdrop-page" to body in inkdrop.html
        initializeThumbnails('guestbook-grid', false); // Disable dragging for guestbook page
    } else {
        console.warn("Body ID not set. Thumbnails might not initialize correctly.");
    }

    // Make thumbnail boxes clickable to navigate (only on main page where applicable)
    // Guestbook entries are specifically not clickable
    if (document.body.id === 'main-page') {
        const thumbnailBoxes = document.querySelectorAll('.thumbnail-box:not(.guestbook-entry)'); // Exclude guestbook-entry if any overlap
        thumbnailBoxes.forEach(box => {
            box.addEventListener('click', (e) => {
                // This is a simple check to prevent navigation during a drag
                if (box.classList.contains('dragging')) {
                    return;
                }
                // Ensure click on internal form elements or links doesn't trigger box navigation
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.tagName === 'A') {
                    return;
                }

                const link = box.dataset.link;
                if (link) {
                    console.log(`Navigating to ${link}...`);
                    // window.location.href = link; // Uncomment to enable navigation
                }
            });
        });
    }
});