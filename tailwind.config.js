/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        maxHeight: {
          "screen-minus-100": "calc(100vh - 100px) !important",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        blue: {
          50: "#e6f2ff", // lightest edge
          100: "#cce5ff",
          200: "#99ccff",
          300: "#66b2ff",
          400: "#3399ff",
          500: "#007bff", // core blue
          600: "#0066cc",
          700: "#004c99",
          800: "#003366", // deep tech blue
          900: "#002244", // very dark blue
        },
        green: {
          50: "#f1fdf3",
          100: "#d7f8df",
          200: "#b4efc2",
          300: "#8be69f",
          400: "#5fd97a",
          500: "#3ac262", // logo green
          600: "#2da450",
          700: "#248443", // olive deep
          800: "#1c6336",
          900: "#144d2a",
        },
      },
      borderRadius: {
        full: "9999px !important",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
