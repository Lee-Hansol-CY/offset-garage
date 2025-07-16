export const getDimensionsFromRatio = (ratio: string) => {
  switch (ratio) {
    case 'ratio-1-1': return { width: 300, height: 300 };
    case 'ratio-16-9': return { width: 420, height: 236.25 };
    case 'ratio-4-3': return { width: 360, height: 270 };
    case 'ratio-3-4': return { width: 270, height: 360 };
    case 'ratio-9-16': return { width: 236.25, height: 420 };
    case 'ratio-2-1': return { width: 400, height: 200 };
    case 'ratio-1-2': return { width: 200, height: 400 };
    case 'ratio-1-3': return { width: 150, height: 450 };
    default: return { width: 0, height: 0 }; // Fallback
  }
};
