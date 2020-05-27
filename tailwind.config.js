module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // 'body': ['Rubik', 'sans-serif'],
        'body': ['Inter', 'serif'],
      },
      colors: {
        'primary-blue': '#1089ff',
        'primary-blue-dark': '#176dc1',
      },
      minHeight: {
        '20': '5rem',
        '10': '2.5rem',
        '12': '3rem',
      },
      filter: {
        'brightness-80': 'brightness(80%)',
      },
      transitionProperty: {
        'filter': 'filter',
      },
    },
  },
  variants: {
    filter: ['responsive', 'group-hover']
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}
