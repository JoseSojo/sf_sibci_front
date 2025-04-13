/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `index.html`, `./src/**/*.tsx`
  ],
  themes: [
    {
      "primary": "#1DCD9F",
      "secondary": "#169976",
      "accent": "#f59e0b",
      "neutral": "#212529",
      "base": "#fefefe",
      "info": "#38bdf8",
      "success": "#4ade80",
      "warning": "#facc15",
      "error": "#ef4444",
    },
  ],
  plugins: [require('daisyui')],
}

