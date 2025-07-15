'use client';

import Image from 'next/image';
import React from 'react';

interface ThumbnailBoxProps {
  type: 'text' | 'image' | 'speech-bubble' | 'checklist';
  content: string | React.ReactNode; // Text content or JSX for complex content
  ratio: string; // e.g., 'ratio-1-1', 'ratio-16-9'
  initialLeft: number;
  initialTop: number;
  link?: string; // Optional link for the box
  imageUrl?: string; // Required for 'image' type
  altText?: string; // Required for 'image' type
  checklistItems?: { id: string; label: string; checked: boolean }[]; // Required for 'checklist' type
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
  checklistItems,
}) => {
  const boxClasses = `thumbnail-box draggable ${ratio} ${type === 'image' ? 'image-only' : ''} ${type === 'speech-bubble' ? 'speech-bubble' : ''} ${type === 'checklist' ? 'checklist-box-type' : ''}`;

  const renderContent = () => {
    switch (type) {
      case 'text':
      case 'speech-bubble':
        return (
          <div className="content text-only initial-padding">
            {typeof content === 'string' ? <p className="text-fs-36">{content}</p> : content}
          </div>
        );
      case 'image':
        return imageUrl && altText ? (
          <Image src={imageUrl} alt={altText} layout="fill" objectFit="cover" />
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
                    <input type="checkbox" id={item.id} checked={item.checked} readOnly />
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
    <div className={boxClasses} style={{ left: `${initialLeft}px`, top: `${initialTop}px` }} data-link={link}>
      {renderContent()}
    </div>
  );
};

export default ThumbnailBox;