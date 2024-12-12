/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./templates/**/*.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00577D',
          dark: '#00354D',
          light: '#166488',
          40: '#007CB3',
        },
        neutral: {
          DEFAULT: '#667085',
          dark: '#475467',
          light: '#B9BEC9',
          10: '#F9FAFB',
          60: '#475467',
          70: '#344054',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'login-img': "url('/login.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  safelist: [
    'bg-primary',
    'text-white',
    'hover:bg-primary-dark'
  ]
}