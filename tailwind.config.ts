import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        "lightGray": "#F6F6F6",
        "theme": "#00d3b7",
        "lighest-theme": "#b9e9dd"
      },
      textColor: {
        "theme": "#00d3b7",
        "lightGray": "#F6F6F6",
      },
      gradientColorStops: {
        "lighest-theme": "#b9e9dd",
        "theme": "#00d3b7",
      }
    },
  },
  plugins: [],
}
export default config
