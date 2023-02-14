/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    dropShadow: {
      'xl': '3px 3px 0px rgba(0, 0, 0, 1)',
      '2xl': '5px 5px 0px rgba(0, 0, 0, 1)',
      '2.5xl': '10px 10px 0px rgba(0, 0, 0, 1)',
      '3xl': '15px 15px 0px rgba(0, 0, 0, 1)',
      
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'grinish-yellow': '#DBFF00',
      'high_contrast_yellow': '#FFE606',
      'black': '#000000',
      'light-pink': '#FFCFCF',
      'dark_pink': '#ED6767',
      'light-sky': '#01E1FF',
      'white': '#FFFFFF',
      'ocen_blue': '#0099FF',
      'parrot_green': '#00FF29',
      'error_red': '#f70c0c',
      'deep_green': '#21fc12'
    }
  },
  plugins: [],
}
