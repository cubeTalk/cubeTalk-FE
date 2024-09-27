/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: "#9DDCFF",
        yellow: "#FFF068",
        red: "#FF9D9D",
        green: "#338600",
        emerald: "#a7f3d0",
        error: "#FD3E3E",
        darkgray: "#2A2A2A",
        midgray: "#676767",
        gray: "#909090",
        lightgray: "#D9D9D9",
        black: "#000",
        white: "#FFF",
      },
    },
    screens: {
      ss: "480px",
      sm: "620px",
      sl: "768px",
      md: "1060px",
      lg: "1200px",
    },
  },
  plugins: [],
};
