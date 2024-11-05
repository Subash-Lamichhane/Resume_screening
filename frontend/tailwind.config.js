/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'upload-inner' : '#659cb8',
        'upload-outer' : '#6092ab',

      }
    },
    

  },
  plugins: [],
}