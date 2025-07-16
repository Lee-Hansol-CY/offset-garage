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
        v0.1-beta
        <div className="info-box">
          <h4>## [v0.1-beta]</h4>
          <ul>
            <li>2025-07-16</li>
          </ul>
          <h4>---</h4>
          <h4>### Added</h4>
          <ul>
            <li>Inkdrop(방명록) 기능 추가</li>
            <li>다크 모드 추가</li>
            <li>'What day is it?' 아트워크 게시</li>
          </ul>

          <h4>### Changed</h4>
          <ul>
            <li>Next.js 및 React.js로 전면 재구축</li>
          </ul>

          <h4>### Fixed</h4>
          <ul>
            <li>Inkdrop(방명록) 댓글 삭제 기능 버그 해결 (관리자만 가능)</li>
          </ul>

          <h4>### Security</h4>
          <ul>
            <li>백엔드 서버 연동</li>
          </ul>

          <h4>---</h4>

          <h4>## Coming Soon</h4>

          <h4>### Upcoming Features</h4>
          <ul>
            <li>UI/UX 세부사항 수정</li>
            <li>부드러운 화면 전환</li>
            <li>Footer 이스터에그</li>
            <li>모바일 최적화</li>
            <li>다크 모드로 접속 시 순간적인 라이트 모드 활성화 문제 해결</li>
            <li>커서 움직임에 반응하는 이펙트 추가</li>
          </ul>

          <h4>### Next Artworks</h4>
          <ul>
            <li>**Alphabet Flow**</li>
            <li>**Code Organism**</li>
            <li>**Digital Cassette**</li>
            <li>**Prompt Anatomy**</li>
            <li>**Web Hairball**</li>
            <li>**Syncronized Duo**</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}