/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "hsl(var(--accent1) / <alpha-value>)",
          2: "hsl(var(--accent2) / <alpha-value>)",
        },
        bkg: "hsl(var(--bkg) / <alpha-value>)",
        content: "hsl(var(--content) / <alpha-value>)",
      },
      fontFamily: { josefin: ['"Josefin Slab"', "serif"] },
    },
  },
  plugins: [],
};
