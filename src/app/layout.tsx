import './globals.css'

import React from 'react'
// eslint-disable-next-line camelcase
import { Open_Sans, Bebas_Neue } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  weight: ['400'],
})

export const metadata = {
  title: 'Valorant Lore',
  description: 'Trabalho final de Front-End',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-screen">
      <body
        className={`${bebasNeue.className} ${openSans.className} flex flex-col justify-center items-center bg-[#ff4655] h-full`}
      >
        {children}
      </body>
    </html>
  )
}
