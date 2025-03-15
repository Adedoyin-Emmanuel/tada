/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#121212",
        },

        health: {
          default: "#7990F8",
          light: "hsla(229, 90%, 72%, 0.1)",
        },

        work: {
          default: "#46CF8B",
          light: "hsla(150, 59%, 54%, 0.1)",
        },

        mentalHealth: {
          default: "#BC5EAD",
          light: "hsla(310, 40%, 55%, 0.1)",
        },

        others: {
          default: "#908986",
          light: "hsla(18, 4%, 55%, 0.1)",
        },
      },
      fontFamily: {
        ilight: ["Inter-Light", "sans-serif"],
        iregular: ["Inter-Regular", "sans-serif"],
        imedium: ["Inter-Medium", "sans-serif"],
        isemibold: ["Inter-SemiBold", "sans-serif"],
        ibold: ["Inter-Bold", "sans-serif"],
        iextrabold: ["Inter-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
