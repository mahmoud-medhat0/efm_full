/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.ts",
    "./resources/**/*.tsx",
    "./resources/**/*.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        background: "#2D3A4A",
        primary: "#bb9f86",
        hover: "#dd6236",
        accent: "#FFC801",
        font: "#8fb635",
        gold: "#be9e88",
        rom:"#2d3a4a",
        black:"#2d3a4a"
      },
    },
  },
  plugins: [],
};
