'use client';

import React from 'react';
import useDraggable from '../../hooks/useDraggable';

interface GuestbookEntryProps {
  id: string;
  content: string;
  ratio: string;
  initialLeft: number;
  initialTop: number;
  isLocalhost: boolean;
  onDelete: (id: string) => void;
}

const GuestbookEntry: React.FC<GuestbookEntryProps> = ({
  id,
  content,
  ratio,
  initialLeft,
  initialTop,
  isLocalhost,
  onDelete,
}) => {
  const { draggableRef, position, isDragging } = useDraggable<HTMLDivElement>({
    initialLeft,
    initialTop,
  });

  const boxClasses = `thumbnail-box guestbook-entry ${ratio} ${isDragging ? 'dragging' : ''}`;

  return (
    <div ref={draggableRef} className={boxClasses} style={{ left: `${position.left}px`, top: `${position.top}px` }}>
      {isLocalhost && (
        <button
          className="delete-button absolute top-2 right-2 text-red-500 text-fs-18 font-bold cursor-pointer z-10"
          onClick={() => onDelete(id)}
        >
          X
        </button>
      )}
      <div className="content text-only initial-padding">
        <p className="text-fs-18">{content}</p>
      </div>
    </div>
  );
};

export default GuestbookEntry;