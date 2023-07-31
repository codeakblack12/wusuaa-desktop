/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Satoshi"', "sans-serif"],
      },
      colors: {
        "primary": "#222B44",
        "input": "#3C404D",
        "offwhite": "#FAFAFA",
        "dark": "#333333",
        "dark-transparent": "rgba(51, 51, 51, 0.5)",
        "light-gray": "#B3B3B3",
        "mid-gray": "#F1F1F1",
        "button": "#5795f7",
        "sky-blue": "#f0f4ff",
        "error": "#EF4444",
        "toggle-select": "#222B44",
        "toggle-unselect": "#F1F1F1",
        "toggle-unselect-text": "#B3B3B3"
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
}

