module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    fontFamily: {
      xixoio: ['xixoio', 'sans-serif'],
      xixoioDisplay: ['xixoio-display', 'sans-serif'],
    },

    screens: {
      sm: '769px',
      md: '1025px',
      lg: '1280px',
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
      },
    },

    fontSize: {
      sm: ['1rem'],
      base: ['1.125rem'],
      lg: ['2rem', { fontWeight: 'bold', letterSpacing: '0.05rem' }],
      xl: ['3rem', { fontWeight: 'bold' }],
      '2xl': ['4.5rem', { fontWeight: 'bold' }],
    },

    colors: {
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      primary: '#4f5966',
      secondary: '#edf2f5',
    },
    extend: {
      zIndex: {
        '-10': '-10',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}