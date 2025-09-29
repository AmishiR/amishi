// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-5 bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2">
          <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
        </div>
        <span className="text-xl font-light text-black">Mind Zen</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/about" className="text-gray-600 hover:text-gray-900 font-light text-sm">
          ABOUT US
        </Link>
        <Link href="/work" className="text-gray-600 hover:text-gray-900 font-light text-sm">
          WORK WITH US
        </Link>
        <Link href="/events" className="text-gray-600 hover:text-gray-900 font-light text-sm">
          EVENTS
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-light text-sm">
          CONTACT US
        </Link>
      </div>

      {/* CTA Button */}
      <button className="border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50 transition-colors">
        <span className="font-light text-gray-700 text-sm">GET STARTED</span>
        <span className="ml-2">→</span>
      </button>
    </nav>
  );
};

export default Navbar;