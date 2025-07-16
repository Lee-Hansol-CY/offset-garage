import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    extend: {
      colors: {
        // Light Mode (Default) - Mapped from CSS variables in globals.css
        'bg-color': 'var(--bg-color)',
        'text-color': 'var(--text-color)',
        'box-bg-color': 'var(--box-bg-color)',
        'box-border-color': 'var(--box-border-color)',
        'box-content-color': 'var(--box-content-color)',
        'overlay-bg-color': 'var(--overlay-bg-color)',
        'overlay-text-color': 'var(--overlay-text-color)',
      },
      fontSize: {
        'fs-36': '36px',
        'fs-18': '18px',
        'fs-14': '14px',
        'fs-12': '12px',
      },
      spacing: {
        'button-sm': '32px',
        'button-lg': '48px',
      },
      borderWidth: {
        'default': '1.5px', // Custom name for 1.5px border
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;