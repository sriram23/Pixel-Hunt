/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "top-color": "#ECEFF1",
        "bottom-color": "#CFD8DC",
        "button": "#BBCBD1",
      }
    },
  },
  plugins: [],
}

