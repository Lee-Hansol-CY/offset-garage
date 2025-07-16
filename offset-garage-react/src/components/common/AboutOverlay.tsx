'use client';

import React from 'react';

interface AboutOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const AboutOverlay: React.FC<AboutOverlayProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div id="about-overlay" className={isVisible ? '' : 'hidden'}>
      <div className="about-content">
        <button id="close-about-button" onClick={onClose}>(CLOSE)</button>
        <h2>About OFFSET GARAGE</h2>
        <p className="text-fs-18">**우리가게 정상영업 합니다**</p>
      </div>
    </div>
  );
};

export default AboutOverlay;
