/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ss: {
          purple: '#3D41FA',
          yellow: '#EEFF41',
          ink: '#0B0B0B'
        }
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    },
  },
  plugins: [],
}
