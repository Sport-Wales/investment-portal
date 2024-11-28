/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'sw-red': '#E32434',
          'sw-yellow': '#F6B207',
          'sw-blue': '#164B64',
          'sw-green': '#299D91',
          'sw-grey': '#BFBEC5',
          'sw-light-grey': '#F4F5F7',
        },
        fontFamily: {
          primary: ['Montserrat', 'Arial', 'sans-serif'],
        },
        fontSize: {
          'body': '20px',
          'label': '20px',
          'subhead': '20px',
          'secondary': '40px',
          'hero': '95px',
        },
        lineHeight: {
          'tight': '100%',
          'normal': '110%',
          'relaxed': '130%',
        },
      },
    },
    plugins: [],
  }