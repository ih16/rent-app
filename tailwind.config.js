module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        112: '28rem',
        120: '30rem',
        128: '32rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
