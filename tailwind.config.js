/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00577D',
          dark: '#004666',
          light: '#006894'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'login-img': "url('public/login.png')",
      }
    },
  },
  plugins: [],
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