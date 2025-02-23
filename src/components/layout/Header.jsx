

import React from 'react';
import { Sun, Cloud } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center text-primary-600">
              <Sun className="h-8 w-8 text-yellow-500" />
              <Cloud className="h-8 w-8 -ml-2 text-blue-500" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-gray-900">Weather Meetup</h1>
              <p className="text-sm text-gray-500">Plan your outdoor events with confidence</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://apps.apple.com/us/app/adventures-of-lil-dario/id6738572224" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Powered by Kevin Fich
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
