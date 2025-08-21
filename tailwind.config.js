// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./node_modules/@heroui/theme/dist/components/(button|modal).js"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
