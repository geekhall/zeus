/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // tree-shaking for production
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // disable preflight, 解决 tailwindcss 与 Element Plus 样式冲突问题
  }
}
