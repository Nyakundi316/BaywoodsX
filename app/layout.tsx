'use client';
import { useEffect } from 'react';
import './globals.css';
import Navbar from './components/Navbar';
import { Outfit } from 'next/font/google';

// ✅ Correctly configure the font
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://code.tidio.co/nzatlcnjsvh22yq3jjfi9vfcm66a8pwj.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans">
        <Navbar /> {/* ✅ Correct position inside body */}
        {children}   {/* ✅ Only once */}
      </body>
    </html>
  );
}
