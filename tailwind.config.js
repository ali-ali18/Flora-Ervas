
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				backgroundDark: "#1a202c", // cor de fundo personalizada para o modo escuro
			  },
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
