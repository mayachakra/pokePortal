/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./**/*.{html,handlebars}'],
  theme: {
    extend: {
      colors: {
        "font": '#ffffff',
        "primary": '#724DA3',
        "secondary": '#E4B447',
        "subtext": '#454544',
        "linear": 'linear-gradient(0.25turn, #F9C932, #345CA1);',
      },
    },
  },
  plugins: [],
};
