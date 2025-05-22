/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#111111", // Primary black
          light: "#f5f5f5",   // Soft background
          accent: "#ff3e3e",  // Red accent (buttons, highlights)
          muted: "#9ca3af",   // For text, borders
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"], // Outfit font fallback
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0, 0, 0, 0.1)",
      },
      transitionProperty: {
        image: "transform, filter, opacity",
      },
      scale: {
        102: "1.02",
        105: "1.05",
      },
    },
  },
  plugins: [],
};
