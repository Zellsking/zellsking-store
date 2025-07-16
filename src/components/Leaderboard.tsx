import React, { useState, useEffect } from 'react';
import { Trophy, Crown, Medal, Users } from 'lucide-react';
import { TopIdol } from '../types';

interface LeaderboardProps {
  isDarkMode: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ isDarkMode }) => {
  const [topIdols, setTopIdols] = useState<TopIdol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopIdols = async () => {
      try {
        const response = await fetch('https://production.jkt48pm.my.id/api/top-idol');
        const data = await response.json();
        
        if (data.success) {
          setTopIdols(data.data.slice(0, 5)); // Show top 5
        } else {
          setError('Failed to fetch leaderboard data');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchTopIdols();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-amber-400" />;
      case 1:
        return <Medal className="w-6 h-6 text-slate-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <Trophy className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getRankBadge = (index: number) => {
    const badges = [
      'bg-gradient-to-r from-amber-400 to-yellow-500 text-black',
      'bg-gradient-to-r from-slate-300 to-slate-400 text-black',
      'bg-gradient-to-r from-orange-400 to-orange-500 text-white',
      'bg-gradient-to-r from-indigo-400 to-indigo-500 text-white',
      'bg-gradient-to-r from-purple-400 to-purple-500 text-white'
    ];
    return badges[index] || 'bg-gradient-to-r from-slate-400 to-slate-500 text-white';
  };

  if (loading) {
    return (
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Trophy className="w-7 h-7 text-amber-400 mr-3" />
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Leaderboard Member Paling Aktif
          </h2>
        </div>
        <div className={`rounded-3xl p-8 backdrop-blur-xl border ${
          isDarkMode 
            ? 'bg-slate-900/40 border-slate-700/50' 
            : 'bg-white/60 border-slate-200/50'
        } shadow-2xl`}>
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-slate-300 rounded-2xl"></div>
                <div className="flex-1">
                  <div className="h-5 bg-slate-300 rounded-lg w-1/3 mb-3"></div>
                  <div className="h-4 bg-slate-300 rounded-lg w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Trophy className="w-7 h-7 text-amber-400 mr-3" />
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Leaderboard Member Paling Aktif
          </h2>
        </div>
        <div className={`rounded-3xl p-8 backdrop-blur-xl border ${
          isDarkMode 
            ? 'bg-slate-900/40 border-slate-700/50' 
            : 'bg-white/60 border-slate-200/50'
        } shadow-2xl`}>
          <p className={`text-center text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="flex items-center mb-8">
        <Trophy className="w-7 h-7 text-amber-400 mr-3" />
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Leaderboard Member Paling Aktif
        </h2>
      </div>
      
      <div className={`rounded-3xl p-8 backdrop-blur-xl border shadow-2xl ${
        isDarkMode 
          ? 'bg-slate-900/40 border-slate-700/50' 
          : 'bg-white/60 border-slate-200/50'
      }`}>
        <div className="space-y-6">
          {topIdols.map((idol, index) => (
            <div
              key={idol.user_id}
              className={`flex items-center p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] border ${
                isDarkMode 
                  ? 'bg-slate-800/30 hover:bg-slate-800/50 border-slate-700/30' 
                  : 'bg-white/40 hover:bg-white/60 border-slate-200/30'
              } backdrop-blur-sm`}
            >
              <div className="flex items-center mr-6">
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold shadow-lg ${getRankBadge(index)}`}>
                  #{index + 1}
                </span>
                <div className="ml-3">
                  {getRankIcon(index)}
                </div>
              </div>
              
              <div className="flex items-center flex-1">
                <img
                  src={`https://production.jkt48pm.my.id${idol.profile_image}`}
                  alt={idol.nickname}
                  className="w-16 h-16 rounded-2xl object-cover mr-6 border-2 border-indigo-400/30 shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {idol.nickname}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    ID: {idol.idol_id}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">
                <Users className="w-5 h-5 text-indigo-500 mr-2" />
                <span className={`font-bold text-lg ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {idol.subscription_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;