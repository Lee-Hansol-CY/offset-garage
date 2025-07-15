import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': '#00FF00',
        'text-light': '#000000',
        'box-bg-light': '#FFFFFF',
        'box-border-light': '#000000',
        'box-content-light': '#000000',
        'overlay-bg-light': 'rgba(255, 255, 255, 0.8)',
        'overlay-text-light': '#000000',

        'bg-dark': '#7F7F7F',
        'text-dark': '#000000', // Remains black as per request
        'overlay-bg-dark': 'rgba(0, 0, 0, 0.8)',
        'overlay-text-dark': '#FFFFFF',
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
        'gradient-conic':
          'conic-gradient(
            from 180deg at 50% 50%,
            var(--tw-gradient-stops)
          )',
      },
    },
  },
  plugins: [],
};
export default config;
