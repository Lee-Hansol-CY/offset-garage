'use client';

import { useState, useEffect, useRef } from 'react';
import { getDimensionsFromRatio } from '../lib/utils';

interface ThumbnailData {
  id: string;
  ratio: string;
}

interface Position {
  left: number;
  top: number;
}

const MIN_OVERLAP = 50;
const MAX_INITIAL_PLACEMENT_ATTEMPTS = 100;
const SAFE_LEFT_MARGIN = 20;
const SAFE_RIGHT_MARGIN = 20;
const SAFE_TOP_MARGIN = 100;
const SAFE_BOTTOM_MARGIN = 70;

const useThumbnailPlacement = (thumbnails: ThumbnailData[]) => {
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [isClient, setIsClient] = useState(false);
  const placedThumbnails = useRef<Array<{ id: string; left: number; top: number; width: number; height: number }>>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const newPositions: Record<string, Position> = {};
    placedThumbnails.current = [];

    thumbnails.forEach((thumbnail) => {
      let attempts = 0;
      let foundPosition = false;
      let randomX = 0;
      let randomY = 0;

      const { width, height } = getDimensionsFromRatio(thumbnail.ratio);

      if (width === 0 || height === 0) {
        console.warn(`Invalid ratio or dimensions for thumbnail ${thumbnail.id}: ${thumbnail.ratio}`);
        newPositions[thumbnail.id] = { left: 0, top: 0 };
        placedThumbnails.current.push({ id: thumbnail.id, left: 0, top: 0, width: 0, height: 0 });
        return;
      }

      do {
        const availableWidth = window.innerWidth - SAFE_LEFT_MARGIN - SAFE_RIGHT_MARGIN - width;
        const availableHeight = window.innerHeight - SAFE_TOP_MARGIN - SAFE_BOTTOM_MARGIN - height;

        randomX = Math.random() * availableWidth + SAFE_LEFT_MARGIN;
        randomY = Math.random() * availableHeight + SAFE_TOP_MARGIN;

        randomX = Math.max(SAFE_LEFT_MARGIN, Math.min(randomX, window.innerWidth - width - SAFE_RIGHT_MARGIN));
        randomY = Math.max(SAFE_TOP_MARGIN, Math.min(randomY, window.innerHeight - height - SAFE_BOTTOM_MARGIN));

        let overlaps = false;
        for (const placed of placedThumbnails.current) {
          const overlapX = Math.max(0, Math.min(randomX + width, placed.left + placed.width) - Math.max(randomX, placed.left));
          const overlapY = Math.max(0, Math.min(randomY + height, placed.top + placed.height) - Math.max(randomY, placed.top));

          if (overlapX > MIN_OVERLAP || overlapY > MIN_OVERLAP) {
            overlaps = true;
            break;
          }
        }

        if (!overlaps) {
          foundPosition = true;
        }
        attempts++;
      } while (!foundPosition && attempts < MAX_INITIAL_PLACEMENT_ATTEMPTS);

      newPositions[thumbnail.id] = { left: randomX, top: randomY };
      placedThumbnails.current.push({ id: thumbnail.id, left: randomX, top: randomY, width, height });
    });

    setPositions(newPositions);
  }, [thumbnails, isClient]);

  return positions;
};

export default useThumbnailPlacement;
