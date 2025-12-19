module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', "ui-sans-serif", "system-ui", "sans-serif"],
        lato: ["var(--font-lato)"],
      },

      keyframes: {
        fadeInList: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
      },

      animation: {
        fadeInList: "fadeInList 0.5s ease-out forwards",
      },
    },
  },

  plugins: [],
};
