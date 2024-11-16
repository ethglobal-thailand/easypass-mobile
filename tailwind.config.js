/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: "#1A1A1A",
        primary: "#7842ED",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
