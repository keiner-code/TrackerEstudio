const { Colors } = require("./constants/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter_400Regular"],
        medium: ["Inter_500Medium"],
        semibold: ["Inter_600SemiBold"],
        bold: ["Inter_700Bold"],
        mono: ["JetBrainsMono_400Regular"],
      },
      colors: {
        light: {
          ...Colors.light,
        },
        dark: {
          ...Colors.dark,
        },
      },
    },
  },
  plugins: [],
};
