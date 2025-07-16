'use client';

import Image from 'next/image';
import { useState } from 'react';
import ThumbnailBox from '../components/artwork/ThumbnailBox';
import Header from '../components/common/Header';
import AboutOverlay from '../components/common/AboutOverlay';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import useThumbnailPlacement from '../hooks/useThumbnailPlacement';
import { artworkData } from '../lib/artworkData'; // Import real artwork data

export default function Home() {
  const [isAboutOverlayVisible, setIsAboutOverlayVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  const thumbnailPositions = useThumbnailPlacement(artworkData);

  return (
    <div>
      {/* Header */}
      <Header onAboutClick={() => setIsAboutOverlayVisible(true)} />

      {/* Main Artwork Grid */}
      <main id="art-grid">
        {artworkData.map((artwork) => {
          const position = thumbnailPositions[artwork.id];
          if (!position) return null; // Ensure position is available before rendering
          return (
            <ThumbnailBox
              key={artwork.id}
              initialLeft={position.left}
              initialTop={position.top}
              {...artwork}
            />
          );
        })}
      </main>

      {/* About Overlay */}
      <AboutOverlay isVisible={isAboutOverlayVisible} onClose={() => setIsAboutOverlayVisible(false)} />

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
      <Footer />
    </div>
  );
}