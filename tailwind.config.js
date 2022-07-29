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
            green: '#8BFF81',
            blue: '#67BFFF',
            purple: '#B880FF',
            taupe: '#CDBCAC',
            gray: {
                base: '#090909',
                '1st': '#131313',
                '2nd': '#272727',
                font: '#C5C5C5',
                'font-light': '#6A6A6A',
            },
        },
        extend: {
            fontFamily: {
                sans: ['Raleway', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
