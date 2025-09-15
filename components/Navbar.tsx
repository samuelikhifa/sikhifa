'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-lime-500 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-2xl hover:text-lime-100 transition-colors">
            Samuel
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-lime-100 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-lime-100 transition-colors font-medium">
              About
            </Link>
            <Link href="/services" className="text-white hover:text-lime-100 transition-colors font-medium">
              Services
            </Link>
            <Link href="/portfolio" className="text-white hover:text-lime-100 transition-colors font-medium">
              Portfolio
            </Link>
            <Link href="/contact" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="py-4 space-y-4 border-t border-lime-400">
            <Link 
              href="/" 
              className="block text-white hover:text-lime-100 transition-colors font-medium py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block text-white hover:text-lime-100 transition-colors font-medium py-2"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="block text-white hover:text-lime-100 transition-colors font-medium py-2"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link 
              href="/portfolio" 
              className="block text-white hover:text-lime-100 transition-colors font-medium py-2"
              onClick={closeMenu}
            >
              Portfolio
            </Link>
            <Link 
              href="/contact" 
              className="block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 