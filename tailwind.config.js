module.exports = {
  // tailwindを適用したいファイル群を指定
  content: [
    "./app.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
