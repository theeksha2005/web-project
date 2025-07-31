import React from 'react';
import { Sun, Cloud } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12 px-4 mt-20">
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

        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-xl mb-4">Learn</h4>
            <div className="space-y-2">
              <p>Weather Basics</p>
              <p>Seasons Guide</p>
              <p>Safety Tips</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-4">Play</h4>
            <div className="space-y-2">
              <p>Weather Games</p>
              <p>Interactive Quiz</p>
              <p>Dress-up Fun</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-4">Shop</h4>
            <div className="space-y-2">
              <p>T-Shirts</p>
              <p>Learning Cards</p>
              <p>Storybooks</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6">
          <p className="text-sm opacity-90">
            © 2025 Mini Meteorologists. Making weather learning magical for young minds! 🌈
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
