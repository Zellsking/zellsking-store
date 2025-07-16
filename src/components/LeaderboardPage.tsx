import React, { useState, useEffect } from 'react';
import { Trophy, Crown, Medal, ArrowLeft, Star, Award, Sparkles, TrendingUp } from 'lucide-react';
import { TopIdol } from '../types';

// Cloudinary helper function
const getCloudinaryUrl = (imagePath: string, options: { width?: number; height?: number; crop?: string; gravity?: string; quality?: string; format?: string } = {}) => {
  const {
    width = 180,
    height = 180,
    crop = 'fill',
    gravity = 'face:center',
    quality = 'auto',
    format = 'webp'
  } = options;

  const baseUrl = `https://res.cloudinary.com/${import.meta.env.CLOUDINARY_CLOUD_NAME || 'your-cloud-name'}/image/fetch`;

  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`,
    `q_${quality}`,
    `f_${format}`
  ].join(',');

  const sourceUrl = `https://production.jkt48pm.my.id${imagePath}`;

  return `${baseUrl}/${transformations}/${encodeURIComponent(sourceUrl)}`;
};

// Default avatar fallback
const getDefaultAvatar = () => {
  return 'https://res.cloudinary.com/doig4w6cm/image/fetch/f_webp,q_80,ar_0.8,g_face:center,w_180,c_fill/https://res.cloudinary.com/haymzm4wp/image/upload/v1696626938/assets/img/default-anime-avatar_ms7sea.webp';
};

interface LeaderboardPageProps {
  isDarkMode: boolean;
  onBack: () => void;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ isDarkMode, onBack }) => {
  const [topIdols, setTopIdols] = useState<TopIdol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchTopIdols = async () => {
      try {
        const response = await fetch('https://production.jkt48pm.my.id/api/top-idol');
        const data = await response.json();

        if (data.success) {
          setTopIdols(data.data);
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

  const handleImageError = (userId: string) => {
    setImageErrors(prev => new Set(prev).add(userId));
  };

  const getImageUrl = (idol: TopIdol) => {
    // If image failed to load, use default avatar
    if (imageErrors.has(idol.user_id)) {
      return getDefaultAvatar();
    }

    // If no profile image, use default avatar
    if (!idol.profile_image) {
      return getDefaultAvatar();
    }

    // Try to load via Cloudinary
    try {
      return getCloudinaryUrl(idol.profile_image, {
        width: 180,
        height: 180,
        crop: 'fill',
        gravity: 'face:center',
        quality: 'auto',
        format: 'webp'
      });
    } catch (err) {
      console.error('Error generating Cloudinary URL:', err);
      return getDefaultAvatar();
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-8 h-8 text-amber-400 drop-shadow-glow" />;
      case 1:
        return <Medal className="w-7 h-7 text-slate-400 drop-shadow-glow" />;
      case 2:
        return <Medal className="w-7 h-7 text-orange-400 drop-shadow-glow" />;
      default:
        return <Award className="w-6 h-6 text-blue-400 drop-shadow-glow" />;
    }
  };

  const getRankBadge = (index: number) => {
    const badges = [
      'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-black shadow-amber-500/50 animate-pulse',
      'bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 text-black shadow-slate-400/50',
      'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 text-white shadow-orange-500/50',
      'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 text-white shadow-blue-500/30',
      'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 text-white shadow-purple-500/30'
    ];
    return badges[index] || 'bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 text-white shadow-slate-500/30';
  };

  const getCardStyle = (index: number) => {
    if (index === 0) {
      return isDarkMode
        ? 'bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-amber-500/20 border-amber-400/50 shadow-amber-500/20'
        : 'bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border-amber-300/70 shadow-amber-300/20';
    }
    if (index === 1) {
      return isDarkMode
        ? 'bg-gradient-to-br from-slate-500/20 via-slate-400/10 to-slate-500/20 border-slate-400/50 shadow-slate-400/20'
        : 'bg-gradient-to-br from-slate-50 via-slate-50 to-slate-50 border-slate-300/70 shadow-slate-300/20';
    }
    if (index === 2) {
      return isDarkMode
        ? 'bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-orange-500/20 border-orange-400/50 shadow-orange-400/20'
        : 'bg-gradient-to-br from-orange-50 via-orange-50 to-orange-50 border-orange-300/70 shadow-orange-300/20';
    }
    return isDarkMode
      ? 'bg-slate-800/40 border-slate-700/40 shadow-slate-800/20'
      : 'bg-white/80 border-slate-200/40 shadow-slate-200/20';
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <button
            onClick={onBack}
            className={`flex items-center mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 ${isDarkMode
                ? 'bg-slate-800/60 text-white border border-slate-700/60 hover:bg-slate-700/60'
                : 'bg-white/80 text-slate-800 border border-slate-200/60 hover:bg-white/90'
              } backdrop-blur-md shadow-lg`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">Back to Members</span>
          </button>

          <div className="text-center mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
              <div className="relative mb-4 sm:mb-0">
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 animate-pulse" />
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 absolute -top-1 -right-1 sm:-top-2 sm:-right-2 animate-bounce" />
              </div>
              <h1 className={`text-3xl sm:text-5xl font-bold sm:ml-6 bg-gradient-to-r ${isDarkMode
                  ? 'from-white via-slate-200 to-white'
                  : 'from-slate-900 via-slate-700 to-slate-900'
                } bg-clip-text text-transparent`}>
                Member Leaderboard
              </h1>
            </div>
            <p className={`text-base sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Member paling aktif mengirim pesan
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl border backdrop-blur-md shadow-xl animate-pulse ${isDarkMode
                  ? 'bg-slate-800/40 border-slate-700/40'
                  : 'bg-white/80 border-slate-200/40'
                }`}>
                <div className="flex items-center">
                  <div className="flex items-center mr-4 sm:mr-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-300 rounded-lg sm:rounded-xl"></div>
                    <div className="ml-2 sm:ml-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-300 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center flex-1">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-300 rounded-xl sm:rounded-2xl mr-4 sm:mr-8"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-5 sm:h-6 bg-slate-300 rounded-lg w-2/3 sm:w-1/3 mb-2 sm:mb-3"></div>
                      <div className="h-3 sm:h-4 bg-slate-300 rounded-lg w-1/2 sm:w-1/4 mb-1 sm:mb-2"></div>
                      <div className="h-3 sm:h-4 bg-slate-300 rounded-lg w-1/3 sm:w-1/5"></div>
                    </div>
                  </div>
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
      <div className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <button
            onClick={onBack}
            className={`flex items-center mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 ${isDarkMode
                ? 'bg-slate-800/60 text-white border border-slate-700/60 hover:bg-slate-700/60'
                : 'bg-white/80 text-slate-800 border border-slate-200/60 hover:bg-white/90'
              } backdrop-blur-md shadow-lg`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">Back to Members</span>
          </button>

          <div className="text-center">
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-slate-400 mx-auto mb-4 sm:mb-6" />
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Unable to Load Leaderboard
            </h2>
            <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <button
          onClick={onBack}
          className={`flex items-center mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 ${isDarkMode
              ? 'bg-slate-800/60 text-white border border-slate-700/60 hover:bg-slate-700/60'
              : 'bg-white/80 text-slate-800 border border-slate-200/60 hover:bg-white/90'
            } backdrop-blur-md shadow-lg`}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="text-sm sm:text-base">Back to Members</span>
        </button>

        <div className="text-center mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <div className="relative mb-4 sm:mb-0">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400" />
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 absolute -top-1 -right-1 sm:-top-2 sm:-right-2 animate-bounce" />
            </div>
            <h1 className={`text-3xl sm:text-5xl font-bold sm:ml-6 bg-gradient-to-r ${isDarkMode
                ? 'from-white via-slate-200 to-white'
                : 'from-slate-900 via-slate-700 to-slate-900'
              } bg-clip-text text-transparent`}>
              Member Leaderboard
            </h1>
          </div>
          <p className={`text-base sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Member paling aktif mengirim pesan
          </p>
          <div className="flex items-center justify-center mt-3 sm:mt-4">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2" />
            <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Updated in real-time
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {topIdols.map((idol, index) => (
            <div
              key={idol.user_id}
              className={`group p-4 sm:p-8 rounded-xl sm:rounded-2xl border transition-all duration-500 hover:scale-[1.02] backdrop-blur-md shadow-xl hover:shadow-2xl ${getCardStyle(index)}`}
            >
              <div className="flex items-center">
                <div className="flex items-center mr-4 sm:mr-8">
                  <span className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl text-base sm:text-xl font-bold shadow-2xl transition-all duration-300 group-hover:scale-110 ${getRankBadge(index)}`}>
                    #{index + 1}
                  </span>
                  <div className="ml-2 sm:ml-4 transition-all duration-300 group-hover:scale-110">
                    {getRankIcon(index)}
                  </div>
                </div>

                <div className="flex items-center flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={getImageUrl(idol)}
                      alt={idol.nickname}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover mr-4 sm:mr-8 border-2 border-blue-400/40 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-blue-400/60"
                      onError={() => handleImageError(idol.user_id)}
                    />
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-lg sm:text-2xl mb-2 sm:mb-3 truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {idol.nickname}
                    </h3>
                    <p className={`text-xs sm:text-sm mb-1 sm:mb-2 truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      ID: {idol.idol_id}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 mr-1" />
                        <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          Active Member
                        </span>
                      </div>
                      {index < 3 && (
                        <div className="flex items-center">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-1" />
                          <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Top Private Message
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;