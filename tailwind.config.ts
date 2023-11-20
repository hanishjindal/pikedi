import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      borderColor: {
        "theme": "#00d3b7",
        "lighest-theme": "#b9e9dd"
      },
      outlineColor: {
        "theme": "#00d3b7",
      },
      textColor: {
        "theme": "#00d3b7",
        "lightGray": "#F6F6F6",
        "lighest-theme": "#b9e9dd"
      },
      gradientColorStops: {
        "lighest-theme": "#b9e9dd",
        "theme": "#00d3b7",
      },
      ringColor: {
        "lighest-theme": "#b9e9dd",
        "theme": "#00d3b7",
      }
    },
  },
  plugins: [],
}
export default config
