/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": '#101928',
          "secondary": '#667085',
          "accent": '#98A2B3',
          // "neutral": '#D0D5DD',
        }
      }
    ]
  },
  plugins: [
    daisyui,
  ],
}

