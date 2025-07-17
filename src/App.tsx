import { useState, useEffect } from 'react';
import {Heart, Sparkles, Search } from 'lucide-react';
import MemberCard from './components/MemberCard';
import SubscribeModal from './components/SubscribeModal';
import DarkModeToggle from './components/DarkModeToggle';
import LeaderboardBanner from './components/LeaderboardBanner';
import LeaderboardPage from './components/LeaderboardPage';
import Footer from './components/Footer';
import { Member } from './types';
import membersData from './data/members.json';

function App() {
  const [members] = useState<Member[]>(membersData.slice(0,57)); 
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleSubscribe = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleMessage = (member: Member) => {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(member.price);

    const message = `Haiii Zellsking Store, Nama Member: ${member.name}
    Harga: ${formattedPrice}
    Durasi: 30 hari

    Mohon segera di proses, terimakasih.`;
    
    const permanentPhone = "6282113952811";
    const whatsappUrl = `https://wa.me/${permanentPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    handleCloseModal();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleViewLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleBackToMembers = () => {
    setShowLeaderboard(false);
  };

  const filteredMembers = members.filter(member => {
    const matchesFilter = filter === 'all' || member.generation === filter;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (showLeaderboard) {
    return (
      <div className={`min-h-screen transition-all duration-700 relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`}>
        {/* Dotted Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className={`w-full h-full ${
            isDarkMode 
              ? 'bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[length:20px_20px]' 
              : 'bg-[radial-gradient(#60a5fa_1px,transparent_1px)] bg-[length:20px_20px]'
          }`}></div>
        </div>

        <div className="relative z-10">
          <LeaderboardPage isDarkMode={isDarkMode} onBack={handleBackToMembers} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 relative ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
    }`}>
      {/* Dotted Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className={`w-full h-full ${
          isDarkMode 
            ? 'bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[length:20px_20px]' 
            : 'bg-[radial-gradient(#60a5fa_1px,transparent_1px)] bg-[length:20px_20px]'
        }`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <div>
              <h1 className={`text-4xl font-bold ${
                isDarkMode 
                  ? 'text-white' 
                  : 'text-slate-900'
              }`}>
                Zellsking
              </h1>
              <p className={`text-base mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Zellsking Private Message Store
              </p>
            </div>
          </div>
          <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        </div>

        {/* Welcome Section */}
        <div className={`rounded-2xl p-8 mb-10 border backdrop-blur-sm shadow-lg ${
          isDarkMode 
            ? 'bg-slate-800/50 border-slate-700/50' 
            : 'bg-white/80 border-slate-200/50'
        }`}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-rose-500 mr-2" />
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className={`text-3xl font-bold mb-3 ${
              isDarkMode 
                ? 'text-white' 
                : 'text-slate-900'
            }`}>
              Welcome to Zellsking
            </h2>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Zellsking adalah platform pihak ketiga tidak resmi yang menyediakan akses ke Private Message JKT48 dengan harga terjangkau dan kualitas yang sesuai.
            </p>
          </div>
        </div>

        {/* Leaderboard Banner */}
        <LeaderboardBanner onViewLeaderboard={handleViewLeaderboard} isDarkMode={isDarkMode} />

        {/* Filter and Search Section */}
        <div className={`mb-8 p-4 rounded-2xl border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-slate-800/50 border-slate-700/50' 
            : 'bg-white/80 border-slate-200/50'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  filter === 'all'
                    ? 'bg-[#74b4da] text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('Anggota JKT48')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  filter === 'Anggota JKT48'
                    ? 'bg-[#74b4da] text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Members
              </button>
              <button
                onClick={() => setFilter('Trainee JKT48')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  filter === 'Trainee JKT48'
                    ? 'bg-[#74b4da] text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Trainees
              </button>
            </div>
            <div className="flex-1">
              <div className={`flex items-center px-4 py-2 rounded-xl border ${
                isDarkMode
                  ? 'bg-slate-700 border-slate-600'
                  : 'bg-white border-slate-200'
              }`}>
                <Search className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Search member..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`ml-2 w-full bg-transparent border-none focus:outline-none ${
                    isDarkMode ? 'text-white placeholder:text-slate-400' : 'text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Available Members */}
        <div className="flex items-center mb-8">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Available Members
          </h2>
          <span className={`ml-4 px-4 py-1 rounded-xl text-sm font-semibold border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
              : 'bg-blue-100/80 text-blue-700 border-blue-200/50'
          }`}>
            {filteredMembers.length} members
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onSubscribe={handleSubscribe}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        <SubscribeModal
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onMessage={handleMessage}
          isDarkMode={isDarkMode}
        />
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;