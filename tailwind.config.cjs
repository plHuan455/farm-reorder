/** @type {import('tailwindcss').Config} */
import { withTV } from "tailwind-variants/transformer"
import { extraCSSClasses } from "./src/libs/tailwindcss/index.ts"

export default withTV({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "4.5": "1.375rem",
        "7.5": "1.875rem"
      },
      fontFamily: {
        bigNumber: ["Sofia", "sans-serif"],
        content: ["Martian Mono", "sans-serif"]
      },
      zIndex: {
        header: 120,
        modal: 140,
      },
      space: {
        test: '20px'
      },
      colors: {
        foreground: {
          400: "hsl(var(--color-foreground-400))",
          DEFAULT: "hsl(var(--color-foreground))"
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))'
        },
        background: {
          DEFAULT: 'hsl(var(--color-background))'
        },
        content: {
          DEFAULT: "hsl(var(--color-content))",
          600: "hsl(var(--color-content-600))"
        },
        content2: {
          DEFAULT: "hsl(var(--color-content2))"
        } 
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ...extraCSSClasses,
      })
    },
  ],
})

