/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Nunito", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(251, 113, 133, 0.35)"
      }
    }
  },
  plugins: []
};
