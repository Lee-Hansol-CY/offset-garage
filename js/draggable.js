// js/draggable.js
// This module handles the core dragging and collision logic.

function initializeDraggable(draggables) {
    let activeDraggable = null;
    let highestZ = draggables.length;
    const MIN_OVERLAP = 50; // Minimum overlap allowed (50px)

    draggables.forEach(draggable => {
        draggable.addEventListener('mousedown', dragStart);
    });

    function dragStart(e) {
        // Prevent dragging if interacting with specific elements inside the box
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.tagName === 'A') {
            return;
        }

        e.preventDefault();
        activeDraggable = e.currentTarget;
        activeDraggable.classList.add('dragging');

        // Bring to top
        highestZ++;
        activeDraggable.style.zIndex = highestZ;

        // Use offsetLeft/Top as they are relative to the offsetParent (#art-grid)
        // This is crucial for correct drag behavior when elements have been previously pushed
        let initialMouseX = e.clientX;
        let initialMouseY = e.clientY;
        let initialBoxLeft = activeDraggable.offsetLeft;
        let initialBoxTop = activeDraggable.offsetTop;

        document.onmousemove = (e) => dragMove(e, initialMouseX, initialMouseY, initialBoxLeft, initialBoxTop);
        document.onmouseup = dragEnd;
    }

    function dragMove(e, initialMouseX, initialMouseY, initialBoxLeft, initialBoxTop) {
        if (!activeDraggable) return;

        let newX = initialBoxLeft + (e.clientX - initialMouseX);
        let newY = initialBoxTop + (e.clientY - initialMouseY);

        // Clamp active draggable to viewport boundaries (20px padding)
        newX = Math.max(20, Math.min(newX, window.innerWidth - activeDraggable.offsetWidth - 20));
        newY = Math.max(20, Math.min(newY, window.innerHeight - activeDraggable.offsetHeight - 20));

        activeDraggable.style.left = `${newX}px`;
        activeDraggable.style.top = `${newY}px`;

        checkCollisions();
    }

    function dragEnd() {
        if (!activeDraggable) return;
        activeDraggable.classList.remove('dragging');
        activeDraggable = null;
        document.onmousemove = null;
        document.onmouseup = null;
    }

    function checkCollisions() {
        // Get current positions using offsetLeft/Top for consistency with setting positions
        const activeLeft = activeDraggable.offsetLeft;
        const activeTop = activeDraggable.offsetTop;
        const activeRight = activeLeft + activeDraggable.offsetWidth;
        const activeBottom = activeTop + activeDraggable.offsetHeight;

        draggables.forEach(other => {
            if (other === activeDraggable) return;

            const otherLeft = other.offsetLeft;
            const otherTop = other.offsetTop;
            const otherRight = otherLeft + other.offsetWidth;
            const otherBottom = otherTop + other.offsetHeight;

            // Calculate current overlap
            const overlapX = Math.max(0, Math.min(activeRight, otherRight) - Math.max(activeLeft, otherLeft));
            const overlapY = Math.max(0, Math.min(activeBottom, otherBottom) - Math.max(activeTop, otherTop));

            let pushX = 0;
            let pushY = 0;

            // Determine if there's an overlap that needs resolution (greater than MIN_OVERLAP)
            const needsPushX = overlapX > MIN_OVERLAP;
            const needsPushY = overlapY > MIN_OVERLAP;

            if (needsPushX && needsPushY) {
                // Calculate excess overlap on both axes
                const excessOverlapX = overlapX - MIN_OVERLAP;
                const excessOverlapY = overlapY - MIN_OVERLAP;

                // Determine direction based on active draggable's center relative to other's center
                const activeCenterX = activeLeft + activeDraggable.offsetWidth / 2;
                const activeCenterY = activeTop + activeDraggable.offsetHeight / 2;
                const otherCenterX = otherLeft + other.offsetWidth / 2;
                const otherCenterY = otherTop + other.offsetHeight / 2;

                // Prioritize pushing along the axis with the smaller *excess* overlap
                // This means moving the least amount to resolve the collision on one axis.
                if (excessOverlapX < excessOverlapY) {
                    // Push horizontally
                    pushX = (activeCenterX < otherCenterX) ? excessOverlapX : -excessOverlapX;
                } else {
                    // Push vertically
                    pushY = (activeCenterY < otherCenterY) ? excessOverlapY : -excessOverlapY;
                }
            } else if (needsPushX) {
                // Only needs horizontal push
                const excessOverlapX = overlapX - MIN_OVERLAP;
                const activeCenterX = activeLeft + activeDraggable.offsetWidth / 2;
                const otherCenterX = otherLeft + other.offsetWidth / 2;
                pushX = (activeCenterX < otherCenterX) ? excessOverlapX : -excessOverlapX;
            } else if (needsPushY) {
                // Only needs vertical push
                const excessOverlapY = overlapY - MIN_OVERLAP;
                const activeCenterY = activeTop + activeDraggable.offsetHeight / 2;
                const otherCenterY = otherTop + other.offsetHeight / 2;
                pushY = (activeCenterY < otherCenterY) ? excessOverlapY : -excessOverlapY;
            }
            
            // Apply push directly to left/top of the other element
            // This ensures the pushed box stays in its new position
            let newOtherLeft = otherLeft + pushX;
            let newOtherTop = otherTop + pushY;

            // Clamp pushed box to viewport boundaries (20px padding)
            newOtherLeft = Math.max(20, Math.min(newOtherLeft, window.innerWidth - other.offsetWidth - 20));
            newOtherTop = Math.max(20, Math.min(newOtherTop, window.innerHeight - other.offsetHeight - 20));

            other.style.left = `${newOtherLeft}px`;
            other.style.top = `${newOtherTop}px`;
            other.style.transform = 'translate(0, 0)'; // Ensure no lingering transform
        });
    }

    // Expose initializeDraggable to the global scope or as a module export
    window.initializeDraggable = initializeDraggable;
}