import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`mt-20 border-t backdrop-blur-sm ${
      isDarkMode 
        ? 'bg-slate-900/50 border-slate-700/50' 
        : 'bg-white/50 border-slate-200/50'
    }`}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <img 
              src={isDarkMode 
                ? "https://res.cloudinary.com/dlx2zm7ha/image/upload/v1752531509/light_j11zue.png" 
                : "https://res.cloudinary.com/dlx2zm7ha/image/upload/v1752531509/dark_cfchom.png"
              }
              alt="Zellsking Logo"
              className="w-12 h-12 mb-3 object-contain"
            />
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Zellsking
            </h3>
            <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Platform terpercaya dengan harga yang terjangkau untuk Private Message JKT48.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm hover:text-blue-500 transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Available Members
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm hover:text-blue-500 transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-blue-500 mr-3" />
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  hazelrafi909@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-blue-500 mr-3" />
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  +62 821 1395 2811
                </span>
              </div>

            </div>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t text-center ${
          isDarkMode ? 'border-slate-700/50' : 'border-slate-200/50'
        }`}>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          © {new Date().getFullYear()} Zellsking. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;