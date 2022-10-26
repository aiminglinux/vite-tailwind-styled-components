module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        mob: { max: "768px" },
      },
      keyframes: {
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-out": {
          "100%": {
            opacity: "0",
          },
          "0%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-in": "slide-in ease .3s",
        "fade-out": "fade-out linear 2s 2s forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
