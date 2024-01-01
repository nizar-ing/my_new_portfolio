import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local';
import {Header} from "@/app/components/Header/Header";

const poppins = localFont({
  src: [
  {
  path: "../../public/fonts/Recoleta-Black.ttf",
  weight: "400",
  },
  {
  path: "../../public/fonts/Recoleta-Medium.ttf",
  weight: "300",
  },
  {
  path: "../../public/fonts/Recoleta-Light.ttf",
  weight: "200",
  },
  ],
  variable: "--font-Recoleta-Black",
  });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
