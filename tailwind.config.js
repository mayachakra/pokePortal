/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./**/*.{html,handlebars}'],
  theme: {
    colors: {
      primarybackground: '#724DA3',
      secondrybackground: '#DEB049',
      blackbackground: '#1E1E1E',
      fontcolor: '#F0F3F0',
    },
    fontFamily: {
      arcade: ['"Press Start 2P"'],
      font: ["'Philosopher'", 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
