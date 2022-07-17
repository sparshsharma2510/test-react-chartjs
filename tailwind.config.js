/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/layout/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              primary: {
                  100: "#5AB510",
                  200: "#479E00",
                  300: "#1E7F2D",
                  400: "#10631D",
              },
              light: {
                  100: "#FFFFFF",
                  200: "#F6F6F7",
                  300: "#D7E0DF",
              },
              dark: {
                  100: "#1D1D1D",
                  200: "#131313",
              },
          },
          fontFamily: {
              primary: ["Poppins", "sans-serif"],
              secondary: ["Roboto", "sans-serif"],
              tertiary: ["Bebas Neue", "cursive"],
              replace1: ["Lato", "sans-serif"],
              replace2: ["Open Sans", "sans-serif"],
              replace3: ["Inter", "sans-serif"],
          },
      },
  },
  plugins: [],
};
