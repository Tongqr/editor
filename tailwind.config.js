/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../../components/**/*.{vue,js,ts,jsx,tsx}",
    "../../pages/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
