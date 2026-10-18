/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#0F3835', // Ajuste elegante da paleta da Patrícia Fiaes
        }
      }
    },
  },
  plugins: [],
}