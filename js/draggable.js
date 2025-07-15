// js/draggable.js
// This module handles the core dragging and collision logic.

function initializeDraggable(draggables) {
    let activeDraggable = null;
    let highestZ = draggables.length;
    // const MIN_OVERLAP = 50; // Minimum overlap allowed (50px) - Not used for drag collision anymore

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

        // No longer storing prevX/Y for collision logic, only for drag calculation
        // activeDraggable.dataset.prevX = initialBoxLeft;
        // activeDraggable.dataset.prevY = initialBoxTop;

        document.onmousemove = (e) => dragMove(e, initialMouseX, initialMouseY, initialBoxLeft, initialBoxTop);
        document.onmouseup = dragEnd;
    }

    function dragMove(e, initialMouseX, initialMouseY, initialBoxLeft, initialBoxTop) {
        if (!activeDraggable) return;

        // const currentX = activeDraggable.offsetLeft;
        // const currentY = activeDraggable.offsetTop;

        let newX = initialBoxLeft + (e.clientX - initialMouseX);
        let newY = initialBoxTop + (e.clientY - initialMouseY);

        // Clamp active draggable to viewport boundaries (20px padding)
        newX = Math.max(20, Math.min(newX, window.innerWidth - activeDraggable.offsetWidth - 20));
        newY = Math.max(20, Math.min(newY, window.innerHeight - activeDraggable.offsetHeight - 20));

        activeDraggable.style.left = `${newX}px`;
        activeDraggable.style.top = `${newY}px`;

        // No longer updating prevX/Y for collision logic
        // activeDraggable.dataset.prevX = currentX;
        // activeDraggable.dataset.prevY = currentY;

        // checkCollisions(); // Collision logic is now removed for free drag
    }

    function dragEnd() {
        if (!activeDraggable) return;
        activeDraggable.classList.remove('dragging');
        activeDraggable = null;
        document.onmousemove = null;
        document.onmouseup = null;
    }

    // All collision-related functions are removed as per new requirement
    // function getOverlap(...) { ... }
    // function resolveCollision(...) { ... }
    // function checkCollisions(...) { ... }

    // Expose initializeDraggable to the global scope or as a module export
    window.initializeDraggable = initializeDraggable;
}