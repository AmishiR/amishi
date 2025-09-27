"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MindZen</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/quiz"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Assessment
            </Link>
            <Link
              href="/quiz/result"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Results
            </Link>
            <Link
              href="#resources"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Resources
            </Link>
            <Link
              href="/quiz"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
            >
              Start Assessment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/quiz"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={toggleMenu}
              >
                Assessment
              </Link>
              <Link
                href="/quiz/result"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={toggleMenu}
              >
                Results
              </Link>
              <Link
                href="#resources"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={toggleMenu}
              >
                Resources
              </Link>
              <Link
                href="/quiz"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-center font-medium mt-2"
                onClick={toggleMenu}
              >
                Start Assessment
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
