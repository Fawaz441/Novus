/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': "'Raleway', sans-serif",
        'oswald': "'Oswald', sans-serif"
      },
      colors: {
        primary: "#7108F6",
        primary2: "#DFC7FF",
        danger: "#BF1231",
        danger2: "#FFEEF0",
        gray: "#F9F9F9",
        gray2: "#F4F4F4",
        faintGray: "#9B9B9B",
        boldGray: "#575555",
        border: "#EEEEEE",
        green: "#08F692",
        dark: "#1E1E1E",
        yellow: "#FBBC05",
        purple: "#EADAFF"
      },
      borderRadius: {
        '6': '6px'
      },
      fontSize: {
        '12': '12px',
        '10': '10px'
      },
      maxWidth: {
        extra: "1500px"
      }
    },
  },
  plugins: [],
}
