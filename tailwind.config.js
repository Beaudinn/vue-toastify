const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    variants: {
        backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-focus', 'dark-even', 'dark-odd', 'responsive', 'group-hover', 'group-focus', 'hover', 'focus', 'active'],
        borderColor: ['dark', 'dark-focus', 'dark-focus-within', 'responsive', 'group-hover', 'group-focus', 'hover', 'focus'],
        textColor: [
            'responsive',
            'group-hover',
            'group-focus',
            'hover',
            'focus-within',
            'focus',
            'active',
            'dark', 'dark-hover', 'dark-active'
        ],
        textDecoration: ['responsive', 'group-hover', 'group-focus', 'hover', 'focus'],
        zIndex: ['responsive', 'focus-within', 'focus'],
        display: ['dark','responsive'],
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            minWidth: {
                '0': '0',
                '120': '120px',
                '200': '200px',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'full': '100%',

            }
        },
    },
    plugins: [
        require('tailwindcss-dark-mode')({
        }),
        require('@tailwindcss/ui')({
            layout: 'sidebar',
        })
    ]
}
