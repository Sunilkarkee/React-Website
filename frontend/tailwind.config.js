/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Orange1: '#2563EB',  
        Orange2:'#1D4ED8', 
        Blue1: '#1E3A8A',     
        Green1: '#2F9E44',
        iw:'15px'   
      },
    },
  },
  plugins: [],
}


