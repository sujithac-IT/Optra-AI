import { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pitch: '#000000',
        surface: '#09090b',
        border: '#18181b',
        emerald: '#10b981',
        gold: '#f59e0b'
      },
      scrollbar: {
        DEFAULT: '6px',
        rounded: '6px'
      }
    }
  },
  plugins: []
}

export default config
