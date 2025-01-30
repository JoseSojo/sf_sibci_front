/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `index.html`,`./src/**/*.tsx`
  ],
  themes: [
    {
      custom: {
        "primary": "#ef5a6f",    
        "secondary": "#295f98",
        "accent": "#f59e0b",
        "neutral": "#212529",
        "base-100": "#101010",
        "info": "#38bdf8",
        "success": "#4ade80",
        "warning": "#facc15",
        "error": "#ef4444",
      },
    },
  ],
  plugins: [require('daisyui')],  
}

