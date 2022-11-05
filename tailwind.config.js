/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "scale(0.9, 0.9)" },
          "50%": { transform: "scale(1, 1)" },
        },
      },
      backgroundImage: {
        "header-mobile": "url('/img/header-mobile.png')",
        "header-desktop": "url('/img/header-desktop.png')",
        footer: "url('/img/footer.png')",
        "footer-mobile": "url('/img/footer-mobile.png')",
        button: "url('/img/button.png')",
        box: "url('/img/box.png')",
        panah: "url('/img/spin-panah.png')",
        "spin-desktop": "url('/img/bg-spin-desktop.png')",
        "spin-mobile": "url('/img/bg-spin-mobile.png')",
        "home-mobile": "url('/img/bg-home-mobile.jpg')",
        "question-mobile": "url('/img/bg-question-mobile.png')",
        "question-desktop": "url('/img/bg-question-desktop-top.png')",
        family: "url('/img/il-family-1.png')",
        doctor: "url('/img/doctor.png')",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
