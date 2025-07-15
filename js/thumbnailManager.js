// js/thumbnailManager.js
// This module manages the initial layout and specific design aspects of thumbnails.

// Make initializeThumbnails a global function or exposed through a module pattern
// so it can be called from main.js or guestbook.js
window.initializeThumbnails = function(containerId, enableDragging = true) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }
    const draggables = Array.from(container.querySelectorAll('.thumbnail-box'));
    const MIN_OVERLAP = 50; // Should match the value in draggable.js
    const MAX_INITIAL_PLACEMENT_ATTEMPTS = 100;

    // Define safe margins for initial placement, accounting for fixed header/footer/version indicator
    const SAFE_LEFT_MARGIN = 20;
    const SAFE_RIGHT_MARGIN = 20;
    const SAFE_TOP_MARGIN = 100; // Approx: Header (20px top + 60px logo height) + some buffer
    const SAFE_BOTTOM_MARGIN = 70; // Approx: Footer (34px) + Version Indicator (32px + 20px bottom) + some buffer

    draggables.forEach((draggable, index) => {
        let attempts = 0;
        let foundPosition = false;

        do {
            // Calculate available space for random positioning within safe margins
            const availableWidth = window.innerWidth - SAFE_LEFT_MARGIN - SAFE_RIGHT_MARGIN - draggable.offsetWidth;
            const availableHeight = window.innerHeight - SAFE_TOP_MARGIN - SAFE_BOTTOM_MARGIN - draggable.offsetHeight;

            // Generate random positions within the available space
            // Ensure minimum 20px from left/right and safe margins from top/bottom
            let randomX = Math.random() * availableWidth + SAFE_LEFT_MARGIN;
            let randomY = Math.random() * availableHeight + SAFE_TOP_MARGIN;
            
            // Clamp to ensure it doesn't go off screen due to precision or small box size
            randomX = Math.max(SAFE_LEFT_MARGIN, Math.min(randomX, window.innerWidth - draggable.offsetWidth - SAFE_RIGHT_MARGIN));
            randomY = Math.max(SAFE_TOP_MARGIN, Math.min(randomY, window.innerHeight - draggable.offsetHeight - SAFE_BOTTOM_MARGIN));


            draggable.style.left = `${randomX}px`;
            draggable.style.top = `${randomY}px`;

            let overlaps = false;
            // Check against already placed draggables (up to current index)
            // Use offsetLeft/Top for comparison as they reflect the current DOM position
            const currentDraggableLeft = draggable.offsetLeft;
            const currentDraggableTop = draggable.offsetTop;
            const currentDraggableRight = currentDraggableLeft + draggable.offsetWidth;
            const currentDraggableBottom = currentDraggableTop + draggable.offsetHeight;


            for (let i = 0; i < index; i++) {
                const other = draggables[i];
                const otherLeft = other.offsetLeft;
                const otherTop = other.offsetTop;
                const otherRight = otherLeft + other.offsetWidth;
                const otherBottom = otherTop + other.offsetHeight;

                // Calculate overlap
                const overlapX = Math.max(0, Math.min(currentDraggableRight, otherRight) - Math.max(currentDraggableLeft, otherLeft));
                const overlapY = Math.max(0, Math.min(currentDraggableBottom, otherBottom) - Math.max(currentDraggableTop, otherTop));

                if (overlapX > MIN_OVERLAP || overlapY > MIN_OVERLAP) { // If either X or Y overlap more than MIN_OVERLAP
                    overlaps = true;
                    break; // Overlaps, try new position
                }
            }

            if (!overlaps) {
                foundPosition = true;
            }
            attempts++;
        } while (!foundPosition && attempts < MAX_INITIAL_PLACEMENT_ATTEMPTS);

        draggable.style.zIndex = Math.floor(Math.random() * draggables.length); // Assign initial z-index

        // Speech bubble tail random position (Left or Right only, with precise margin)
        if (draggable.classList.contains('speech-bubble')) {
            const isLeft = Math.random() < 0.5; // True for left, false for right
            const tailBaseWidth = 30; // 15px (border-left) + 15px (border-right) from CSS
            const tailHalfWidth = tailBaseWidth / 2; // 15px

            let tailPositionPercentage;

            if (isLeft) {
                // Tail's center should be 'tailBaseWidth' (30px) from the left edge of the box,
                // plus the 'tailHalfWidth' (15px) to position the center of the tail.
                const targetPixelPosition = tailBaseWidth + tailHalfWidth; // 30px + 15px = 45px from left
                tailPositionPercentage = (targetPixelPosition / draggable.offsetWidth) * 100;
            } else {
                // Tail's center should be 'tailBaseWidth' (30px) from the right edge of the box,
                // plus the 'tailHalfWidth' (15px) to position the center of the tail.
                const targetPixelPosition = draggable.offsetWidth - (tailBaseWidth + tailHalfWidth); // box.width - 45px from left
                tailPositionPercentage = (targetPixelPosition / draggable.offsetWidth) * 100;
            }
            draggable.style.setProperty('--tail-left', `${tailPositionPercentage}%`);
        }
    });

    // Only initialize draggable functionality if enableDragging is true
    if (enableDragging && typeof window.initializeDraggable === 'function') {
        window.initializeDraggable(draggables);
    } else if (enableDragging) {
        console.error("draggable.js is not loaded or initializeDraggable is not exposed. Dragging will not work.");
    }
    // If not enabling dragging, we don't need to log an error.
};