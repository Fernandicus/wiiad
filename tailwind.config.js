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
      },
      keyframes: {
        creditCardShineKeyFrames: {
          "0%": { transform: "translateX(0%)", opacity: "20%" },
          "50%": { opacity: "80%" },
          "100%": { transform: "translateX(110%)", opacity: "20%" },
        },
      },
    },
  },
  plugins: [],
};
