import React from 'react';
import Link from 'next/link';
import { Facebook, X, Instagram, Activity } from 'lucide-react';
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
  return (
    <footer className="bg-white/10 shadow-t-lg mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-6">
            <Link href="/" className="flex items-center">
                <Activity className="h-8 w-8 text-indigo-600" />
                <span className={`${bricolage.className} ml-2 text-xl font-bold text-white`}>TrackHub</span>
            </Link>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-white/50 hover:text-indigo-600 text-sm">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-white/50 hover:text-indigo-600 text-sm">Terms of Service</Link>
            <Link href="/contact" className="text-white/50 hover:text-indigo-600 text-sm">Contact</Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} TrackHub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-indigo-600">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-indigo-600">
              <X className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-indigo-600">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
