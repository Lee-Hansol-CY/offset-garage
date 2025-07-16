'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import useDraggable from '../../hooks/useDraggable';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ThumbnailBoxProps {
  type: 'text' | 'image' | 'speech-bubble' | 'checklist';
  content?: string | React.ReactNode; // Text content or JSX for complex content
  ratio: string; // e.g., 'ratio-1-1', 'ratio-16-9'
  initialLeft: number;
  initialTop: number;
  link?: string; // Optional link for the box
  imageUrl?: string; // Required for 'image' type
  altText?: string; // Required for 'image' type
  checklistItems?: ChecklistItem[]; // Required for 'checklist' type
}

const ThumbnailBox: React.FC<ThumbnailBoxProps> = ({
  type,
  content,
  ratio,
  initialLeft,
  initialTop,
  link,
  imageUrl,
  altText,
  checklistItems: initialChecklistItems, // Rename to avoid conflict with state
}) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(initialChecklistItems || []); // State for checklist items

  const { draggableRef, position, isDragging, dragOccurred } = useDraggable<HTMLDivElement>({
    initialLeft,
    initialTop,
    excludeTags: ['INPUT', 'LABEL', 'A'],
  });

  const boxClasses = `thumbnail-box ${ratio} ${type === 'image' ? 'image-only relative' : ''} ${type === 'speech-bubble' ? 'speech-bubble' : ''} ${type === 'checklist' ? 'checklist-box-type' : ''} ${isDragging ? 'dragging' : ''} touch-none select-none pointer-events-all`;

  const handleCheckboxChange = (id: string) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClick = () => {
    if (dragOccurred.current) {
      // If a drag occurred, prevent the click event from triggering navigation
      return;
    }
    if (link) {
      window.location.href = link;
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'text':
      case 'speech-bubble':
        return (
          <div className="content text-only initial-padding">
            {typeof content === 'string' ? <p className="text-fs-36 pointer-events-auto" draggable="false">{content}</p> : content}
          </div>
        );
      case 'image':
        return imageUrl && altText ? (
          <Image src={imageUrl} alt={altText} fill className="object-cover" />
        ) : null;
      case 'checklist':
        return (
          <div className="content checklist-layout">
            <div className="checklist-text-area">
              {typeof content === 'string' ? <p className="text-fs-18">{content}</p> : content}
            </div>
            <div className="separator"></div>
            <div className="checklist-items-area">
              <ul>
                {checklistItems?.map((item) => (
                  <li key={item.id}>
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(item.id)} // Add onChange handler
                    />
                    <label htmlFor={item.id} className="custom-checkbox text-fs-18">{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={draggableRef} 
      className={boxClasses} 
      onMouseUp={(e) => {
        // Prevent click if a drag occurred
        if (dragOccurred.current) {
          e.stopPropagation(); // Stop event propagation to prevent parent click handlers
          return;
        }
        // If no drag occurred and link exists, navigate
        if (link) {
          window.location.href = link;
        }
      }}
    >
      {renderContent()}
    </div>
  );
};

export default ThumbnailBox;