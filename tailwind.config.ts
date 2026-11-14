import type { Config } from "tailwindcss";

// The ONLY colours on the site (flat, no gradients), from the supplied palette:
//   deep  #005ACD  primary blue: dark sections, text on light, buttons
//   azure #0093CB  accent: big numerals, bars, rules, hover states (large/graphic use only)
//   sky   #6DD7FD  accent on deep blue (large text, shapes)
//   mist  #BEF0FF  pale section background; small text on deep blue
//   paper #F5FFFF  lightest background; text on deep blue
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { deep: "#005ACD", azure: "#0093CB", sky: "#6DD7FD", mist: "#BEF0FF", paper: "#F5FFFF" },
      fontFamily: {
        display: ["var(--font-display)", "Michroma", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
