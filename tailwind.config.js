/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "mainBg": `url('https://source.unsplash.com/1600x900/?nature')`,

      },
      fontFamily: {
        noorEHidayat: ["Noor-e-hidayat"],
        saleemQuran: ["PDMS Saleem QuranFont"]
      },
    }
  },
  plugins: [require("daisyui")],
}