module.exports = {
  darkMode: "class",
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}', // <-- make sure this includes your global.css location
  ],
  theme: {
    extend: {
        fontFamily:{
            sans: ['"Roboto"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            lato:["var(--font-lato)"]
        }
    },
  },
  plugins:{
    tailwindcss: {},
    autoprefixer:{}
  } ,
}