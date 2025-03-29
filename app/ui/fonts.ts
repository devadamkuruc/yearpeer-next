import localFont from 'next/font/local'

export const yearpeerFont = localFont({
    src: [
        {
            path: './fonts/yearpeer-medium.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/yearpeer-extrabold.otf',
            weight: '800',
            style: 'normal',
        }
    ],
})