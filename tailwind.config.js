/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
		'./docs/.vitepress/**/*.{js,ts,vue}',
		'./docs/**/*.md',
	],
  theme: {
    extend: {
      colors: {
        vpDark: {
          "soft": "#202127",
          "bg": "#1b1b1f",
        },
        vpLight: {
          "soft": "#f6f6f7",
          "bg": "#ffffff",
        }
      }
    },
  },
  plugins: [],
}

