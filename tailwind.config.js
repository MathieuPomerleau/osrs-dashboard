/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            primary: '#B29379',
            red: '#FF5252',
            orange: '#FFA654',
            yellow: '#FCFF81',
            green: { DEFAULT: '#8BFF81', light: '#b3ffad' },
            blue: '#67BFFF',
            purple: '#B880FF',
            taupe: '#CDBCAC',
            white: '#FFFFFF',
            black: '#000000',
            gray: {
                base: '#090909',
                '1st': '#131313',
                '2nd': '#272727',
                '3rd': '#363636',
                font: '#C5C5C5',
                'font-light': '#6A6A6A',
                'font-lightest': '#464646',
            },
        },
        extend: {
            animation: {
                'reverse-spin': 'reverse-spin 0.5s linear infinite',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            gridTemplateColumns: {
                8: 'repeat(8, minmax(0, 1fr))',
            },
            keyframes: {
                shimmer: {
                    '100%': {
                        transform: 'translateX(100%)',
                    },
                },
                'reverse-spin': {
                    from: {
                        transform: 'rotate(360deg)',
                    },
                },
            },
        },
    },
    plugins: [],
};
