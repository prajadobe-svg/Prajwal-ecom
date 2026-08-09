/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#121212",
        surface: "#1B1B1A",
        surface2: "#232321",
        line: "#33322E",
        paper: "#F5F3EF",
        muted: "#95908A",
        brass: "#C99A4B",
        brassDark: "#9C7433",
        sage: "#5B7566",
        rust: "#B15A3E",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};
