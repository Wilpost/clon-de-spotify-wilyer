/** @type {import('tailwindcss').Config} */
// import animations from '@midudev/tailwind-animations'
// const plugin = require('tailwindcss/plugin')

export default {
  content: [
    'index.html',
    './src/**/*.{jsx,js}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
        variable: ['Overpass Variable', 'system-ui']
      },
      gridTemplateRows: {
        rowsGrid: 'repeat(2, minmax(8px, 49px))'
      },
      gridTemplateColumns: {
        tableGrid: '26px repeat(auto-fit, minmax(100px, 1fr))',
        recentCardsGrid: 'repeat(4, minmax(100px, 245px))',
        gridSectionTrend: 'repeat(auto-fit, minmax(100px, auto))'
      },
      colors: {
        groundColor: '#121212',
        tempBarColor: '#4d4d4d',
        textGray: '#b3b3b3',
        textComun: '#f4f4f4',
        textGreenSpotify: '#1ed760',
        groundDark: '#242424',
        textWhite: '#ffff',
        arrowGround: '#050505',
        cardGround: '#181818',
        cardGroundSkeleton: '#575757',
        bgCardRecent: '#6867675e',
        secondaryDark: '#282828'
      },
      boxShadow: {
        '3xl': '0px 0px 10px 3px #201f1f1a',
        '4xl': '0px 0px 32px 3px #16161696',
        top: '-2px -2px 16px 1px #181818a3',
        rigth: '1px 1px 10px #333'
      },
      backgroundImage: {
        gradientRadial: 'linear-gradient(0deg, #12121200 31%, #65677e 113%)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        loadSkeleton: {
          '0%': {
            left: '-76px'
          },
          '100%': { left: '167px' }
        },
        fadeOut: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-60px)'
          },
          '100%': {
            opacity: 1,
            translateY: 'translateY(-50px)'
          }
        },
        FadeReverse: {
          '0%': {
            opacity: 1,
            translateY: 'translateY(-50px)'
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(-70px)'
          }
        },
        loadPage: {
          '0%': {
            opacity: 0.5,
            transform: 'scale(1)'
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1.5)'
          }
        },
        deployIn: {
          '0%': {
            width: '351px'
          },
          '100%': {
            width: '69px'
          }
        },
        translateIn: {
          '0%': {
            left: '0%'
          },
          '50%': {
            left: '-90%'
          },
          '100%': {
            left: '0%'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn .2s ease-in-out both',
        skeleton: 'loadSkeleton 2s ease-in-out infinite',
        fadeOut: 'fadeOut .2s ease-in-out both',
        fadeOutIn: 'fadeOut .1s ease-in-out both',
        FadeReverse: 'FadeReverse .2s ease-in-out both',
        loadPageSping1: 'loadPage .8s ease-in-out infinite',
        loadPageSping2: 'loadPage .7s ease-in-out infinite',
        loadPageSping3: 'loadPage .6s ease-in-out infinite',
        deployOut: 'deployIn .1s ease-in-out both',
        translateIn: 'translateIn 14s linear infinite'
      }
    },
    darkMode: 'class'
  }
}
