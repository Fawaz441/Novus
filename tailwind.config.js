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
        '7108F6': "#7108F6",
        'DFC7FF': "#DFC7FF",
        'BF1231': "#BF1231",
        'FFEEF0': "#FFEEF0",
        'FF012F': "#FF012F",
        'F9F9F9': "#F9F9F9",
        'F4F4F4': "#F4F4F4",
        '9B9B9B': "#9B9B9B",
        '575555': "#575555",
        'EEEEEE': "#EEEEEE",
        '08F692': "#08F692",
        '1E1E1E': "#1E1E1E",
        'FBBC05': "#FBBC05",
        'EADAFF': "#EADAFF",
        'FFE9ED': '#FFE9ED'
      },
      borderRadius: {
        '3': '3px',
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
