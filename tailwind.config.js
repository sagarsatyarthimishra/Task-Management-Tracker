/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",               // Add HTML file to the content array
      "./src/**/*.{js,ts,jsx,tsx}",  // Make sure the JS/TS files are also included
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  