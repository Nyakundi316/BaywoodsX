// app/components/ui/Footer.tsx
'use client';

import Link from 'next/link';
import { Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Baywoods</h2>
          <p className="text-sm text-gray-400">
            Streetwear made in Kenya. Crafted with purpose, powered by culture.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/shop/all" className="hover:underline">Shop</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +254 116 724 251
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> baywoods317@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} /> <Link href="https://instagram.com/bayw_oods" target="_blank" className="hover:underline">@bayw_oods</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-12 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Baywoods. All rights reserved.
      </div>
    </footer>
  );
}
