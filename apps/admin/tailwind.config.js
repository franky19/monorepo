// import sharedConfig from 'tailwind-config/tailwind.config.js';

const config = {
  // ...sharedConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/payment-component/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '200px',
        sm: '640px',
        md: '769px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1536px',
      },
      fontSize: {
        xxs: '0.6rem',
      },
      fontFamily: {
        primary: ['TruenoSBd', 'sans-serif'],
        secondary: ['TruenoLt', 'sans-serif'],
        cardTitle: ['TruenoRg', 'sans-serif'],
      },
      colors: {
        black: '#000',
        gray: '#7b7b7b',
        light: '#dee2e6',
        primary: '#ff1659',
        graySoft: '#f5f5f5',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  safelist: [
    {
      pattern: /(bg|text|border)-(light|gray|graySoft)/,
    },
    {
      pattern: /font-(cardTitle|secondary)/,
    },
  ],
};

export default config;
