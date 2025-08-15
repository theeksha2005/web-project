// resources/js/Components/Navbar.tsx
import React from 'react';
import { Sun, Cloud, Home, BookOpen, Gamepad2, Star, ShoppingBag, Info, LogIn } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl border-b-4 border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Sun className="w-10 h-10 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
              <Cloud className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-bounce" />
            </div>
            <span className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Mini Meteorologists
            </span>
          </div>

          {/* Menu */}
          <div className="flex items-center space-x-2">
            {[
              { name: 'Home', href: '/site1', icon: Home, color: 'bg-red-100 text-red-600 hover:bg-red-200' },
              { name: 'Learn', href: '/learn', icon: BookOpen, color: 'bg-green-100 text-green-600 hover:bg-green-200' },
              { name: 'Games', href: '/', icon: Gamepad2, color: 'bg-purple-100 text-purple-600 hover:bg-purple-200' },
              { name: 'Stargazing', href: '/', icon: Star, color: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' },
              { name: 'Shop', href: '/shop', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600 hover:bg-pink-200' },
              { name: 'About', href: '/', icon: Info, color: 'bg-orange-100 text-orange-600 hover:bg-orange-200' },
              { name: 'Sign In', href: '/site2', icon: LogIn, color: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hidden md:flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-bold ${item.color} transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

