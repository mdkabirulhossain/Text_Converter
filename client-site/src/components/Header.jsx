import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          <Link to="/">TextPDF Pro</Link>
        </h1>
        <nav className="flex bg-gray-100 rounded-full p-1">
          <Link
            to="/subscription"
            className="px-6 py-2 rounded-full font-medium text-gray-600 hover:text-gray-900"
          >
            Pricing
          </Link>
        </nav>
      </div>
    </header>
  );
}
