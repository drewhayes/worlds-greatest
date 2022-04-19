module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "gradient-detective",
    "gradient-imposter",
  ],
  theme: {
    extend: {
      colors: {
        "blue-green":     "#4b91aa",
        "tyrian-purple":  "#64113F",
        "teal":           "#7FB4C7",
        "davys-gray":     "#585B56",
        "golden-brown":   "#D7AF70"
      }
    },
  },
  plugins: [],
}
