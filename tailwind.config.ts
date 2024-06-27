import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hammersmith-one)", ...fontFamily.sans],
        mono: [
          "var(--font-poppins)",
          
          ...fontFamily.mono,
        ],
        customFontSc: ["var(--font-playfair-display-sc)","sans-serif"],
        customFont: ["var(--font-playfair-display)","sans-serif"],
      
      },
      colors: {
        primary: {
          DEFAULT: "#00A86B", // Green
          100: "#E6F5EC",
          200: "#B8E3D0",
          300: "#8AD1B4",
          400: "#5CBF98",
          500: "#00A86B",
          600: "#009459",
          700: "#007A4B",
          800: "#005F3B",
          900: "#00472F",
        },
        secondary: {
          DEFAULT: "#FFFFFF", // White
          100: "#FFFFFF",
          200: "#F2F2F2",
          300: "#E6E6E6",
          400: "#D9D9D9",
          500: "#CCCCCC",
          600: "#B3B3B3",
          700: "#999999",
          800: "#808080",
          900: "#666666",
        },
        dark: {
          DEFAULT: "#343A40", // Dark Gray
          100: "#D3D6DA",
          200: "#A6ACB4",
          300: "#7A818F",
          400: "#4D5769",
          500: "#343A40",
          600: "#2C3037",
          700: "#24272E",
          800: "#1C1E24",
          900: "#141519",
        },
        destructive: {
          DEFAULT: "#ca2838",
        },
      },
      
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        enterFromRight: {
          from: { opacity: "0", transform: "translateX(200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: "0", transform: "translateX(-200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
          to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        scaleIn: "scaleIn 200ms ease",
        scaleOut: "scaleOut 200ms ease",
        fadeIn: "fadeIn 200ms ease",
        fadeOut: "fadeOut 200ms ease",
        enterFromLeft: "enterFromLeft 250ms ease",
        enterFromRight: "enterFromRight 250ms ease",
        exitToLeft: "exitToLeft 250ms ease",
        exitToRight: "exitToRight 250ms ease",
        slideUpAndFade: "slideUpAndFade 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: 'ui' }),require("@tailwindcss/forms")],
};
export default config;
