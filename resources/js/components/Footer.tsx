// resources/js/Components/Footer.tsx
import React from 'react';
import { Sun, Cloud } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center items-center space-x-3 mb-6">
          <Sun className="w-10 h-10 text-yellow-300" />
          <span className="text-3xl font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Mini Meteorologists
          </span>
          <Cloud className="w-10 h-10 text-blue-300" />
        </div>
        <p className="text-lg mb-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          Making weather learning fun and safe for kids everywhere!
        </p>
        <div className="border-t border-white/20 pt-6">
          <p className="text-sm opacity-90">
            © 2025 Mini Meteorologists. Making weather learning magical for young minds! 🌈 Created By Theekshana Gaveshani
            
          </p>
        </div>
      </div>
    </footer>
  );
}
