/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./**/*.{html,handlebars}'],
  theme: {
    colors: {
      fire: '#FDDFDF',
      grass: '#DEFDE0',
      electric: '#FCF7DE',
      dragon: '#DEF3FD',
      ground: '#f4e7da',
      rock: '#d5d5d4',
      fairy: '#fceaff',
      poison: '#98d7a5',
      bug: '#f8d5a3',
      water: '#97b3e6',
      psychic: '#eaeda1',
      flying: '#F5F5F5',
      fighting: '#E6E0D4',
      normal: '#f5f5f5',
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
