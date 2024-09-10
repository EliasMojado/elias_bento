import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // biege1: "#FAF0E6",
        // biege3: "#0D3D2F",
        // biege2: '#EED9C4',

        biege1: "#9AEF5E",
        biege2: "#D9B99B",
        biege3: "#3BD9AA",
        customred: "#D53C3C",
        customblue: "#1F82FB",
        customcrimson: "#480102",
        custompink: "#FF9ABF"
      },
    },
  },
  plugins: [],
};
export default config;
