import forms from "@tailwindcss/forms";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xsm: "0.75rem", // 12px
      },
      spacing: {
        13: "3.25rem", // 52px
      },
      colors: {
        accent: {
          1: "hsl(var(--accent1) / <alpha-value>)",
          2: "hsl(var(--accent2) / <alpha-value>)",
        },
        bkg: "hsl(var(--bkg) / <alpha-value>)",
        content: "hsl(var(--content) / <alpha-value>)",
      },
      fontFamily: { josefin: ['"Josefin sans"', "serif"] },
    },
  },
  plugins: [
    forms,
    function ({ addUtilities }) {
      addUtilities({
        ".border-gradient": {
          "box-sizing": " content-box",
          "border-width": " 8px",
          "border-style": " solid",
          "border-image": "linear-gradient(to right bottom, #55DDFF, #C058F3)",
          "border-image-slice": " 1",
        },
      });
    },
  ],
};
