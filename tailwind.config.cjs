/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "custom-gradient":
          "radial-gradient(circle, rgba(5,29,60,1) 20%, rgba(0,7,14,1) 100%)",
      }),
    },
  },
  plugins: [],
};
