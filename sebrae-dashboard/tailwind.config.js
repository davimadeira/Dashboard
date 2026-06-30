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
        sebrae: {
          orange: '#FF6B00',
          dark: '#1A1A2E',
        }
      }
    },
  },
  plugins: [],
}