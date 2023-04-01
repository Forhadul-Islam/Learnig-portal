/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      backgroundImage: (theme) => ({
        "custom-gradient":
          "radial-gradient(circle, rgba(5,29,60,1) 20%, rgba(0,7,14,1) 100%)",
        "form-gradient":
          "linear-gradient(90deg, rgba(235,252,255,1) 0%, rgba(235,231,238,1) 34%, rgba(255,245,255,1) 70%, rgba(239,255,252,1) 100%)",

        // "linear-gradient(90deg, rgba(176,227,235,1) 0%, rgba(238,221,254,1) 34%, rgba(249,218,251,1) 70%, rgba(217,240,236,1) 100%)",
      }),
    },
  },
  plugins: [],
};
