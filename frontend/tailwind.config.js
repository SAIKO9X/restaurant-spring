/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["Cormorant Upright", "serif"],
        sans: ["Open Sans", "sans-serif"],
      },
      colors: {
        primary: "#dcca87",
        secondary: "#5A20CB",
        dark: "0C0B08",
      },
    },
  },
  plugins: [],
};
