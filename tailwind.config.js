module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "base": '9px 9px 0px -3px rgba(0,0,0,1)',
        "inset": "-5px 6px 0px -3px rgba(0,0,0,.2) inset"
      }
    },
  },
  plugins: [],
}
