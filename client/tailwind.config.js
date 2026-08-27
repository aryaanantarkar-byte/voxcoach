/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F7F4EB',
        foreground: '#18181B',
        card: '#FFFFFF',
        'card-foreground': '#18181B',
        border: '#000000',
        neo: {
          bg: '#F7F4EB',
          card: '#FFFFFF',
          yellow: '#FFE600',
          red: '#FF6B6B',
          teal: '#4ECCD3',
          purple: '#A78BFA',
          pink: '#FFC6FF',
          green: '#51CF66',
          black: '#000000',
        }
      },
      boxShadow: {
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo': '4px 4px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
        'neo-hover': '2px 2px 0px 0px #000000',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

