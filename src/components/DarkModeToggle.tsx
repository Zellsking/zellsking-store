import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-amber-500/80 text-slate-900 border-amber-400/50 hover:bg-amber-400/80 shadow-amber-500/20' 
          : 'bg-slate-700/80 text-white border-slate-600/50 hover:bg-slate-600/80 shadow-slate-700/20'
      }`}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default DarkModeToggle;