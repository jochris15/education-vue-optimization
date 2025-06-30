/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neo-white': '#FFFFFF',
                'neo-black': '#000000',
                'neo-pink': '#FF6B9D',
                'neo-blue': '#4ECDC4',
                'neo-yellow': '#FFE66D',
                'neo-purple': '#A8E6CF',
                'neo-green': '#88D8B0',
                'neo-orange': '#FF8B94',
                'neo-red': '#FFB3BA',
                'neo-gray': '#C7CEDB',
            },
            boxShadow: {
                'neo': '4px 4px 0px 0px #000000',
                'neo-lg': '6px 6px 0px 0px #000000',
                'neo-xl': '8px 8px 0px 0px #000000',
            },
            fontFamily: {
                'mono': ['ui-monospace', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
            }
        },
    },
    plugins: [],
}
