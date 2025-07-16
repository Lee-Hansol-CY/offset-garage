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
        <p className="text-fs-18">이곳은 OFFSET GARAGE의 소개글이 들어갈 자리입니다. 창의적인 아이디어를 아카이빙하고 공유하는 공간입니다. 이 웹사이트는 클린 아키텍처와 모듈화 원칙에 따라 설계되었습니다.</p>
        <p className="text-fs-18">This is a placeholder text for the 'About' section. OFFSET GARAGE is a space for archiving and sharing creative ideas. This website is designed with clean architecture and modular principles.</p>
      </div>
    </div>
  );
};

export default AboutOverlay;
