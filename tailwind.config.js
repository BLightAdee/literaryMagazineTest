/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Material 3 Expressive Collegiate Tonal Palette (Notre Dame Navy, Royal, Amber, Soft Cream, Sage)
        primary: {
          DEFAULT: '#1E3A8A', // Notre Dame Deep Collegiate Navy
          container: '#DBEAFE', // Soft Pastel Blue Container
          on: '#FFFFFF',
          onContainer: '#1E293B',
          light: '#3B82F6',
        },
        secondary: {
          DEFAULT: '#D97706', // Warm Amber / Golden Dome
          container: '#FEF3C7', // Soft Pastel Honey Cream
          on: '#FFFFFF',
          onContainer: '#78350F',
        },
        tertiary: {
          DEFAULT: '#0F766E', // Expressive Pine / Sage
          container: '#CCFBF1', // Soft Mint
          on: '#FFFFFF',
          onContainer: '#134E4A',
        },
        surface: {
          DEFAULT: '#FAF8F5', // Warm Literary Paper White
          dim: '#F3EFEA',
          bright: '#FFFFFF',
          container: {
            lowest: '#FFFFFF',
            low: '#F7F4EF',
            DEFAULT: '#F2EDE4',
            high: '#EAE4D9',
            highest: '#E2DBCE',
          }
        },
        editorial: {
          ink: '#1C1917', // Warm Charcoal Ink
          muted: '#57534E', // Muted Lead
          faint: '#A8A29E', // Subdued caption
          border: '#E7E2D8', // Delicate Paper Divider
          card: '#FCFAF7',
          gold: '#C59B27', // Notre Dame True Gold
        }
      },
      fontFamily: {
        sans: ['"Google Sans Flex"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader"', '"EB Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Fraunces"', '"Newsreader"', 'serif'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
        'full': '9999px',
      },
      boxShadow: {
        'm3-1': '0px 1px 3px 1px rgba(28, 25, 23, 0.08), 0px 1px 2px 0px rgba(28, 25, 23, 0.04)',
        'm3-2': '0px 2px 6px 2px rgba(28, 25, 23, 0.08), 0px 1px 2px 0px rgba(28, 25, 23, 0.05)',
        'm3-3': '0px 4px 12px 3px rgba(28, 25, 23, 0.08), 0px 1px 3px 0px rgba(28, 25, 23, 0.06)',
        'm3-4': '0px 6px 16px 4px rgba(28, 25, 23, 0.10), 0px 2px 4px 0px rgba(28, 25, 23, 0.06)',
        'm3-hover': '0px 8px 24px 6px rgba(30, 58, 138, 0.12), 0px 4px 8px 0px rgba(28, 25, 23, 0.06)',
      },
      transitionTimingFunction: {
        'spring-expressive': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'm3-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
        'm3-standard': 'cubic-bezier(0.2, 0, 0, 1)',
      }
    },
  },
  plugins: [],
}
