// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // scan all React files
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'ai-gradient':'radial-gradient(circle at 20% 20%, #4f46e5, #1e1b4b 60%)',
//       }
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // scan all React files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require("autoprefixer"),
    // If you want to use official Tailwind plugins, add them here
    // e.g. require("@tailwindcss/forms"), require("@tailwindcss/typography")
  ],
};