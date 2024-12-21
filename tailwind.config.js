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
          "primary": '#113066',
          "accent": "#101928",
          "secondary": '#667085',
          // "neutral": '#D0D5DD',
        }
      }
    ]
  },
  plugins: [
    daisyui,
  ],
}

