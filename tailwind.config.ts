import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      'fade-in-down': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-20px)'
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)'
        },
      },
      'fade-in-up': {
        '0%': {
          opacity: '0',
          transform: 'translateY(20px)'
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)'
        },
      }
    },
    animation: {
      'fade-in-down': 'fade-in-down 1s ease-out',
      'fade-in-up': 'fade-in-up 1s ease-out 0.5s',
    }
  },
  plugins: [],
};
export default config;
