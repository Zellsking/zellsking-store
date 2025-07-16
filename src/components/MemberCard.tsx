import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onSubscribe: (member: Member) => void;
  isDarkMode: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onSubscribe, isDarkMode }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl backdrop-blur-sm border ${
      isDarkMode 
        ? 'bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50' 
        : 'bg-white/80 border-slate-200/50 hover:border-blue-400/50'
    } shadow-lg hover:shadow-blue-500/10`}>
      <div className="relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            {member.generation}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-base sm:text-lg truncate drop-shadow-lg">
            {member.name}
          </h3>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
          <div className="flex items-center">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mr-2" />
            <span className={`text-sm sm:text-sm font-semibold truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Message Price
            </span>
          </div>
          <span className="text-xl sm:text-base font-bold bg-[#74b4da] bg-clip-text text-transparent">
            {formatPrice(member.price)}
          </span>
        </div>
        
        <button
          onClick={() => onSubscribe(member)}
          className="w-full bg-[#74b4da] hover:bg-[#649cba] text-white text-sm sm:text-base font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default MemberCard;