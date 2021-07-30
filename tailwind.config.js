const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      brightness: {
        '05': '.05',
      },
      height: {
        128: '32rem',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      orange: colors.orange,
      amber: colors.amber,
    },
    fontFamily: {
      sans: ['Proxima Nova'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
