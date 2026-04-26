import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          400: "#F87171",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D"
        },
        brand: {
          primary: "#DC2626",
          accent: "#F59E0B",
          dark: "#0F172A",
          light: "#F8FAFC"
        }
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "Arial", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 55px rgba(15, 23, 42, 0.10)"
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        shimmer: "shimmer 1.4s infinite",
        fadeIn: "fadeIn 500ms ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
