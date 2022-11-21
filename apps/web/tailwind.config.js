module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D3958",
      },
      boxShadow: {
        base: "9px 9px 0px -3px rgba(0,0,0,1)",
        inset: "-5px 6px 0px -3px rgba(0,0,0,.2) inset",
      },
      keyframes: {
        text: {
          "0%": { opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "text-anim": "text 6s ease infinite",
      },
    },
  },
  plugins: [],
};
