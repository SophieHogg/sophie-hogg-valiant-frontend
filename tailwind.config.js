/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      colors: {
        'neutral-primary': '#262c2d',
        'neutral-background': '#f8f8ff',
        'brand-primary': '#ffe857',
        'brand-highlight': '#fffea8'
      } 
    }
  },
  plugins: [],
}
