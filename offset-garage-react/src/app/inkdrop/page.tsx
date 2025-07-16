'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import AboutOverlay from '../../components/common/AboutOverlay';
import Footer from '../../components/common/Footer';
import GuestbookEntry from '../../components/guestbook/GuestbookEntry';
import GuestbookInput from '../../components/guestbook/GuestbookInput';
import { useTheme } from '../../context/ThemeContext';
import useThumbnailPlacement from '../../hooks/useThumbnailPlacement';

interface GuestbookEntryData {
  id: string;
  content: string;
  ratio: string;
}

// Helper function to generate a random ratio class
function getRandomRatioClass() {
  const ratios = ['ratio-1-1', 'ratio-16-9', 'ratio-4-3', 'ratio-3-4', 'ratio-9-16', 'ratio-2-1', 'ratio-1-2', 'ratio-1-3'];
  return ratios[Math.floor(Math.random() * ratios.length)];
}

export default function Inkdrop() {
  const [isAboutOverlayVisible, setIsAboutOverlayVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntryData[]>([]);
  const [guestbookMessage, setGuestbookMessage] = useState<{ message: string; type: 'info' | 'error' | 'success' } | null>(null);
  const [isLocalhost, setIsLocalhost] = useState(false);

  const thumbnailPositions = useThumbnailPlacement(guestbookEntries);

  const displayMessage = (message: string, type: 'info' | 'error' | 'success') => {
    setGuestbookMessage({ message, type });
    setTimeout(() => {
      setGuestbookMessage(null);
    }, 3000);
  };

  const fetchGuestbookEntries = async () => {
    try {
      const response = await fetch('/api/guestbook', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch guestbook entries');
      }
      const data = await response.json();
      const formattedData = data.map((entry: any) => ({ ...entry, ratio: getRandomRatioClass() }));
      setGuestbookEntries(formattedData);
    } catch (error) {
      console.error(error);
      displayMessage('방명록을 불러오는 데 실패했습니다.', 'error');
    }
  };

  const handleDeleteEntry = async (id: string) => {
    // Optimistic update: remove the entry from the UI immediately
    const originalEntries = guestbookEntries;
    setGuestbookEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));

    try {
      const response = await fetch(`/api/guestbook?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete entry');
      }

      displayMessage('방명록이 성공적으로 삭제되었습니다.', 'success');
      // No need to fetchGuestbookEntries() here, as the UI is already updated
    } catch (error: any) {
      console.error(error);
      displayMessage(error.message || '방명록 삭제에 실패했습니다.', 'error');
      // Revert to original entries if deletion fails
      setGuestbookEntries(originalEntries);
    }
  };

  useEffect(() => {
    fetchGuestbookEntries();
    setIsLocalhost(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  }, []);

  const handleNewEntry = async (newEntryContent: string) => {
    if (newEntryContent.length === 0) {
      displayMessage('방명록 내용을 입력해주세요.', 'error');
      return;
    }
    if (newEntryContent.length > 100) {
      displayMessage(`글자 수 초과: ${newEntryContent.length}/100`, 'error');
      return;
    }

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newEntryContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to post new entry');
      }

      displayMessage('방명록이 성공적으로 게시되었습니다.', 'success');
      fetchGuestbookEntries(); // Refresh the list
    } catch (error: any) {
      console.error(error);
      displayMessage(error.message || '방명록 작성에 실패했습니다.', 'error');
    }
  };

  return (
    <div>
      <Header onAboutClick={() => setIsAboutOverlayVisible(true)} />

      <main id="guestbook-grid">
        {guestbookEntries.map((entry) => {
          const position = thumbnailPositions[entry.id];
          if (!position) return null; // Ensure position is available before rendering
          return (
            <GuestbookEntry
              key={entry.id}
              initialLeft={position.left}
              initialTop={position.top}
              isLocalhost={isLocalhost}
              onDelete={handleDeleteEntry}
              {...entry}
            />
          );
        })}
      </main>

      <GuestbookInput onNewEntry={handleNewEntry} />

      {guestbookMessage && (
        <div id="guestbook-message" className={`guestbook-message text-fs-14 ${guestbookMessage.type === 'error' ? 'text-red-500' : ''}`}>
          {guestbookMessage.message}
        </div>
      )}

      <AboutOverlay isVisible={isAboutOverlayVisible} onClose={() => setIsAboutOverlayVisible(false)} />

      <Footer />
    </div>
  );
}
