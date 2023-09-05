/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./src/components/Navbar.jsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class'
}