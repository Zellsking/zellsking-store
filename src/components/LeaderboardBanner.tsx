import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';

interface LeaderboardBannerProps {
  onViewLeaderboard: () => void;
  isDarkMode: boolean;
}

const LeaderboardBanner: React.FC<LeaderboardBannerProps> = ({ onViewLeaderboard, isDarkMode }) => {
  return (
    <div className={`rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-800/50 border-slate-700/50' 
        : 'bg-blue-100/80 border-blue-200/50'
    } backdrop-blur-sm`}>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
          <div className={`p-3 rounded-xl mb-3 sm:mb-0 sm:mr-4 ${
            isDarkMode ? 'bg-[#74b4da]' : 'bg-blue-200/80'
          }`}>
            <Trophy className={`w-6 h-6 ${
              isDarkMode ? 'text-white' : 'text-[#74b4da]'
            }`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Bingung Memilih Member?
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Lihat member yang paling aktif mengirim pesan
            </p>
          </div>
        </div>
        <button
          onClick={onViewLeaderboard}
          className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-[#74b4da] hover:bg-[#649cba] text-slate-900' 
              : 'bg-[#74b4da] hover:bg-[#649cba] text-white'
          } shadow-lg hover:shadow-xl`}
        >
          <span className="text-sm sm:text-base">Lihat Leaderboard</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default LeaderboardBanner;