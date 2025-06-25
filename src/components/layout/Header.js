// src/components/layout/Header.js
"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">AwashInsurance</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/quote" className="text-gray-700 hover:text-blue-600 transition">
            Get Quote
          </Link>
          <Link href="/claim" className="text-gray-700 hover:text-blue-600 transition">
            Report Claim
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Simple hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg px-4 py-2 space-y-2">
          <Link
            href="/"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/quote"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Quote
          </Link>
          <Link
            href="/claim"
            className="block py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Report Claim
          </Link>
        </nav>
      )}
    </header>
  );
}