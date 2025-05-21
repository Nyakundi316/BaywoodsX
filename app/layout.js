// app/layout.js
import './globals.css'
import Navbar from './components/Navbar'
// Uncomment and configure fonts if you're using them
// import { GeistSans, GeistMono } from 'geist/font'

export const metadata = {
  title: 'Baywoods | Clothing & Shoes',
  description: 'Shop stylish clothing and shoes online from Baywoods.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
