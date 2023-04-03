/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        creditCardShine: "creditCardShineKeyFrames 1.5s linear infinite",
        slideLeftFromVisible: "slideLeftFromVisible .15s linear forwards",
        slideLeftFromVisibleRev: "slideLeftFromVisibleRev .15s linear forwards",
        slideLeftFromHidden: "slideLeftFromHidden .15s linear forwards",
        slideLeftFromHiddenRev: "slideLeftFromHiddenRev .15s linear forwards",
      },
      keyframes: {
        creditCardShineKeyFrames: {
          "0%": { transform: "translateX(0%)", opacity: "20%" },
          "50%": { opacity: "80%" },
          "100%": { transform: "translateX(110%)", opacity: "20%" },
        },
        slideLeftFromVisible: {
          "0%": {
            transform: "translateX(0%) ",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        slideLeftFromVisibleRev: {
          "0%": {
            transform: "translateX(-100%) ",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        slideLeftFromHidden: {
          "0%": {
            transform: "translateX(100%) ",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        slideLeftFromHiddenRev: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [],
};
