import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1180px" },
    },
    extend: {
      colors: {
        // Apothecary palette — warm, clinical, refined
        cream: {
          DEFAULT: "#F7F4EE",
          50: "#FBFAF6",
          100: "#F7F4EE",
          200: "#EFEAE0",
          300: "#E5E1D8",
        },
        ink: {
          DEFAULT: "#1B1D1A",
          900: "#0E100D",
          800: "#1B1D1A",
          700: "#2C302B",
          600: "#4A4F49",
          500: "#6E736C",
          400: "#8B8F88",
          300: "#B4B8B0",
          200: "#D4D7CF",
          100: "#E5E1D8",
        },
        sage: {
          DEFAULT: "#5A6B52",
          50: "#F1F3EE",
          100: "#E1E6DA",
          200: "#C9D2BE",
          300: "#A8B59A",
          400: "#83937A",
          500: "#5A6B52",
          600: "#4A5A44",
          700: "#3F4D3A",
          800: "#2E3A2A",
        },
        clay: {
          DEFAULT: "#C8A584",
          100: "#F4ECE0",
          200: "#E8DCC9",
          300: "#D9C2A4",
          400: "#C8A584",
          500: "#A88564",
          600: "#83664A",
        },
        signal: {
          red: "#B5483A",
          amber: "#C68B2C",
          green: "#5C8A5A",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["3.25rem", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-lg": ["2.5rem", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-md": ["2rem", { lineHeight: "1.1", letterSpacing: "-0.018em" }],
        "display-sm": ["1.625rem", { lineHeight: "1.16", letterSpacing: "-0.014em" }],
        "title-lg": ["1.25rem", { lineHeight: "1.32", letterSpacing: "-0.01em" }],
        "title-md": ["1.0625rem", { lineHeight: "1.38", letterSpacing: "-0.005em" }],
        "body-lg": ["1rem", { lineHeight: "1.6" }],
        "body": ["0.9375rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55" }],
        "caption": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        "overline": ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },
      letterSpacing: {
        tightest: "-0.03em",
        editorial: "0.18em",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(27,29,26,0.04), 0 8px 24px -12px rgba(27,29,26,0.10)",
        lift: "0 4px 14px -6px rgba(27,29,26,0.10), 0 24px 48px -24px rgba(27,29,26,0.16)",
        card: "0 0 0 1px rgba(27,29,26,0.04), 0 2px 8px -4px rgba(27,29,26,0.08)",
        sheet: "0 -10px 30px -12px rgba(27,29,26,0.18)",
        focus: "0 0 0 3px rgba(90,107,82,0.18)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
        velvet: "cubic-bezier(0.16, 1, 0.3, 1)",
        crisp: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionDuration: {
        250: "250ms",
        320: "320ms",
        420: "420ms",
        600: "600ms",
        900: "900ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0,12px,0)" },
          "100%": { opacity: "1", transform: "translate3d(0,0,0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "shimmer": "shimmer 2.4s linear infinite",
        "marquee": "marquee 38s linear infinite",
      },
      backgroundImage: {
        "grain": "radial-gradient(rgba(27,29,26,0.05) 1px, transparent 1px)",
        "vignette":
          "radial-gradient(ellipse at center, transparent 55%, rgba(27,29,26,0.08))",
      },
    },
  },
  plugins: [],
};

export default config;
