/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#08080a',
        foreground: '#f3f1ea',
        surface: '#111114',
        'surface-2': '#17171b',
        muted: '#807f78',
        accent: '#ff2a85',
        'accent-2': '#ff65a3',
        line: 'rgba(243, 241, 234, 0.1)',
        'line-strong': 'rgba(243, 241, 234, 0.22)',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Anton', 'sans-serif'],
        sans: ['var(--font-onest)', 'Onest', 'sans-serif'],
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section)',
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
