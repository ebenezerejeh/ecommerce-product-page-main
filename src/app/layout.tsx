import type { Metadata } from "next"
import { Kumbh_Sans } from "next/font/google"
import { CartProvider } from "@/contexts/cartContext"
import "./globals.css"

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Sneakers — Fall Limited Edition",
  description: "Fall Limited Edition Sneakers by Sneaker Company",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={kumbhSans.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
