import { useState, useRef, useEffect, useCallback } from 'react';

interface DraggableOptions {
  initialLeft: number;
  initialTop: number;
  excludeTags?: string[];
}

export default function useDraggable<T extends HTMLElement>(options: DraggableOptions) {
  const { initialLeft, initialTop, excludeTags = [] } = options;

  // Manage the actual position state within the hook
  const [position, setPosition] = useState({ left: initialLeft, top: initialTop });
  const [isDragging, setIsDragging] = useState(false);
  const dragOccurred = useRef(false);

  const draggableRef = useRef<T>(null);
  const animationFrameRef = useRef<number | null>(null);

  const dragState = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    // These will be relative to the element's current position, not absolute
    currentTranslateX: initialLeft, // Initialize with initialLeft
    currentTranslateY: initialTop,  // Initialize with initialTop
  });

  // Function to parse current transform values
  const getTranslateValues = useCallback((element: HTMLElement) => {
    const style = window.getComputedStyle(element);
    const transform = style.transform || style.webkitTransform;

    let mat = transform.match(/^matrix\((.+)\)$/);
    if (mat) {
      return {
        x: parseFloat(mat[1].split(', ')[4]),
        y: parseFloat(mat[1].split(', ')[5])
      };
    }

    mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
      return {
        x: parseFloat(mat[1].split(', ')[12]),
        y: parseFloat(mat[1].split(', ')[13])
      };
    }
    return { x: 0, y: 0 };
  }, []);

  const updateElementTransform = useCallback(() => {
    if (!draggableRef.current) return;

    const { currentTranslateX, currentTranslateY } = dragState.current;
    draggableRef.current.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px)`;
    animationFrameRef.current = null;
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.current.isDown) return;

    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragOccurred.current = true;
    }

    // Calculate new translate values based on the initial position of the element
    // and the mouse movement from the start of the drag.
    // The `position` state holds the *last committed* position.
    dragState.current.currentTranslateX = position.left + dx;
    dragState.current.currentTranslateY = position.top + dy;

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateElementTransform);
    }
  }, [position.left, position.top, updateElementTransform]); // Depend on position state

  const onMouseUp = useCallback(() => {
    dragState.current.isDown = false;
    setIsDragging(false);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Commit the final dragged position to the state
    setPosition({
      left: dragState.current.currentTranslateX,
      top: dragState.current.currentTranslateY,
    });

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [onMouseMove]);

  const onMouseDown = useCallback((e: MouseEvent) => {
    const element = draggableRef.current;
    if (!element) return;

    const target = e.target as HTMLElement;
    console.log('onMouseDown triggered on:', target.tagName); // Debugging line

    // Temporarily remove conditions to debug if any part of the element is clickable
    // if (element.contains(target) && !excludeTags.includes(target.tagName)) {
      e.preventDefault();
      e.stopPropagation();

      dragState.current.isDown = true;
      dragState.current.startX = e.clientX;
      dragState.current.startY = e.clientY;

      dragOccurred.current = false;
      setIsDragging(true);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    // }
  }, [onMouseMove, onMouseUp]); // excludeTags and getTranslateValues removed from dependencies for this test

  useEffect(() => {
    const element = draggableRef.current;
    if (element) {
      element.style.position = 'absolute';
      // Set the element's transform based on the internal `position` state
      element.style.transform = `translate(${position.left}px, ${position.top}px)`;

      element.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', onMouseDown);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onMouseDown, onMouseMove, onMouseUp, position.left, position.top]); // Depend on position state

  return { draggableRef, position, isDragging, dragOccurred };
}
