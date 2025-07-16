export interface Artwork {
  id: string;
  type: 'text' | 'image' | 'speech-bubble' | 'checklist';
  content?: string | React.ReactNode;
  ratio: string;
  link?: string;
  imageUrl?: string;
  altText?: string;
  checklistItems?: { id: string; label: string; checked: boolean }[];
}

export const artworkData: Artwork[] = [
  {
    id: 'artwork-1',
    type: 'text',
    content: 'WHAT DAY IS IT?',
    ratio: 'ratio-1-1',
    link: '/artworks/7-17-artwork/index.html',
  },
];