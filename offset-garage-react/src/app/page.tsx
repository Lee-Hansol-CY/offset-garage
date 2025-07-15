'use client';

import Image from 'next/image';
import { useState } from 'react';
import ThumbnailBox from '../components/artwork/ThumbnailBox';

export default function Home() {
  const [isAboutOverlayVisible, setIsAboutOverlayVisible] = useState(false);
  const [theme, setTheme] = useState('system'); // 'system', 'light', 'dark'
  const [isThemeDropdownVisible, setIsThemeDropdownVisible] = useState(false);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // TODO: Apply actual theme change to body class or CSS variables
    setIsThemeDropdownVisible(false);
  };

  const artworkData = [
    {
      type: 'text',
      content: 'LIFE HAS BECOME ONE BIG COMMERCIAL NOW FOR HAPPINESS',
      ratio: 'ratio-1-1',
      initialLeft: 50,
      initialTop: 50,
      link: 'artwork-page-1.html',
    },
    {
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=2070&auto=format&fit=crop',
      altText: 'Artwork example',
      ratio: 'ratio-16-9',
      initialLeft: 400,
      initialTop: 100,
      link: 'artwork-page-2.html',
    },
    {
      type: 'speech-bubble',
      content: 'I BELIEVE YOU OVERLOOKED MY TALENT',
      ratio: 'ratio-2-1',
      initialLeft: 150,
      initialTop: 300,
      link: 'artwork-page-3.html',
    },
    {
      type: 'checklist',
      content: (
        <>
          <p className="text-fs-18">WHAT YOU MISSED OUT ON</p>
          <p className="text-fs-18">WHAT YOU MISSED OUT ON</p>
        </>
      ),
      ratio: 'ratio-16-9',
      initialLeft: 700,
      initialTop: 200,
      link: 'artwork-page-4.html',
      checklistItems: [
        { id: 'cl-item1', label: 'Activity One', checked: false },
        { id: 'cl-item2', label: 'Activity Two', checked: false },
        { id: 'cl-item3', label: 'Activity Three', checked: true },
        { id: 'cl-item4', label: 'Activity Four', checked: false },
      ],
    },
    {
      type: 'text',
      content: (
        <>
          <p className="text-fs-36">HEY!</p>
          <p className="text-fs-36" style={{ transform: 'scaleY(-1)' }}>HEY!</p>
        </>
      ),
      ratio: 'ratio-4-3',
      initialLeft: 250,
      initialTop: 500,
      link: 'artwork-page-5.html',
    },
  ];

  return (
    <div className={theme === 'dark' ? 'dark-mode' : ''}>
      {/* Header */}
      <header className="site-header">
        <div className="header-left">
          <a href="/" className="logo-link">
            <div className="logo-box">
              <Image src="/images/logo.svg" alt="OFFSET GARAGE Logo" width={60} height={60} />
            </div>
          </a>
          <nav className="header-nav">
            <a href="/inkdrop" className="nav-button">Inkdrop</a>
            <button id="about-button" className="nav-button" onClick={() => setIsAboutOverlayVisible(true)}>About</button>
          </nav>
        </div>
        <div className="theme-switcher">
          <button
            id="theme-toggle-button"
            className="theme-button"
            onClick={() => setIsThemeDropdownVisible(!isThemeDropdownVisible)}
          >
            ({theme.toUpperCase()})
          </button>
          <div id="theme-dropdown" className={`theme-dropdown ${isThemeDropdownVisible ? '' : 'hidden'}`}>
            <button data-theme="system" onClick={() => handleThemeChange('system')}>SYSTEM</button>
            <button data-theme="light" onClick={() => handleThemeChange('light')}>LIGHT</button>
            <button data-theme="dark" onClick={() => handleThemeChange('dark')}>DARK</button>
          </div>
        </div>
      </header>

      {/* Main Artwork Grid */}
      <main id="art-grid">
        {artworkData.map((artwork, index) => (
          <ThumbnailBox key={index} {...artwork} />
        ))}
      </main>

      {/* About Overlay */}
      <div id="about-overlay" className={isAboutOverlayVisible ? '' : 'hidden'}>
        <div className="about-content">
          <button id="close-about-button" onClick={() => setIsAboutOverlayVisible(false)}>(CLOSE)</button>
          <h2>About OFFSET GARAGE</h2>
          <p className="text-fs-18">이곳은 OFFSET GARAGE의 소개글이 들어갈 자리입니다. 창의적인 아이디어를 아카이빙하고 공유하는 공간입니다. 이 웹사이트는 클린 아키텍처와 모듈화 원칙에 따라 설계되었습니다.</p>
          <p className="text-fs-18">This is a placeholder text for the 'About' section. OFFSET GARAGE is a space for archiving and sharing creative ideas. This website is designed with clean architecture and modular principles.</p>
        </div>
      </div>

      {/* Version Indicator */}
      <div id="version-indicator" className="ghost-button">
        v0.1 BETA
        <div className="info-box">
          <h4>Features</h4>
          <ul>
            <li>Draggable & Collidable Artwork Thumbnails</li>
            <li>Light/Dark/System Theme Toggle</li>
            <li>Responsive Broken Grid Layout</li>
            <li>About Page Overlay</li>
          </ul>
          <h4>Roadmap</h4>
          <ul>
            <li>Guestbook (Inkdrop) functionality</li>
            <li>Dynamic Artwork Content Management</li>
            <li>Enhanced Accessibility</li>
          </ul>
          <h4>Updates</h4>
          <ul>
            <li>2024-XX-XX: Initial UI Prototype</li>
            <li>2024-XX-XX: Improved Drag/Collision, UI refinements</li>
            <li>2024-XX-XX: Header layout, Speech bubble, Checkbox, No border-radius, Version indicator hover fix</li>
            <li>2024-XX-XX: Speech bubble random tail (L/R), checkbox size/alignment, separator full height, persistent push, version indicator alignment</li>
            <li>2024-XX-XX: Module separation (thumbnailManager), drag logic fix, initial placement non-overlap, theme dropdown style</li>
            <li>2024-XX-XX: Separator full height, checkbox central alignment/size, persistent push refined</li>
            <li>2024-XX-XX: Main page boxes visibility fix, improved initial placement margins</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer-bottom">
        <p className="text-fs-14">(C) 2025. OFFSET GARAGE. LEE HANSOL ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}