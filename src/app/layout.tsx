import Image from 'next/image'
import './globals.css'

import React from 'react'
// eslint-disable-next-line camelcase
import { Roboto_Flex } from 'next/font/google'
import ValorantLogo from '../../public/valorant-logo.svg'

const roboto = Roboto_Flex({ subsets: ['latin'] })

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
        className={`${roboto.className} flex flex-col justify-center items-center bg-[#ff4655] h-full`}
      >
        <nav className="flex justify-center w-full p-6">
          <Image
            src={ValorantLogo}
            alt="Valorant Logo"
            width={100}
            height={100}
          />
        </nav>
        {children}
      </body>
    </html>
  )
}
