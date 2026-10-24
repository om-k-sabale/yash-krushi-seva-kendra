/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          600: '#059669',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#0a2e1c'
        },
        sun: {
          400: '#facc15',
          500: '#EAB308',
          600: '#ca8a04'
        },
        soil: {
          700: '#5c4326',
          800: '#43301b'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'leaf-texture': "radial-gradient(circle at 1px 1px, rgba(22,101,52,0.08) 1px, transparent 0)"
      },
      boxShadow: {
        card: '0 2px 10px -2px rgba(20,83,45,0.15), 0 1px 3px -1px rgba(20,83,45,0.1)',
        'card-hover': '0 12px 24px -6px rgba(20,83,45,0.25)'
      }
    }
  },
  plugins: []
}
