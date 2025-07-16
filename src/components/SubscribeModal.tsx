import React from 'react';
import { X, MessageCircle, Clock, CreditCard, Sparkles } from 'lucide-react';

import { Member } from '../types';

interface SubscribeModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onMessage: (member: Member) => void;
  isDarkMode: boolean;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ 
  member, 
  isOpen, 
  onClose, 
  onMessage, 
  isDarkMode 
}) => {
  if (!isOpen || !member) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleMessage = () => {
    onMessage(member);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`relative  max-w-lg rounded-2xl overflow-hidden shadow-2xl transform transition-all border backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-slate-800/95 border-slate-700/50' 
          : 'bg-white/95 border-slate-200/50'
      } animate-in slide-in-from-bottom-4 duration-300`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/30 hover:bg-black/50 transition-all duration-200 backdrop-blur-sm border border-white/20"
        >
          <X className="w-4 h-4 text-white" />
        </button>
        
        <div className="relative">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">{member.name}</h3>
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 text-white/90 mr-2" />
              <p className="text-white/90 text-sm drop-shadow-md">{member.generation}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h4 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Subscribe to {member.name}
            </h4>
            
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-xl border ${
                isDarkMode 
                  ? 'bg-slate-800/30 border-slate-700/30' 
                  : 'bg-slate-50/80 border-slate-200/50'
              } backdrop-blur-sm`}>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 text-blue-500 mr-2" />
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Price
                  </span>
                </div>
                <span className="font-bold text-lg bg-[#74b4da] bg-clip-text text-transparent">
                  {formatPrice(member.price)}
                </span>
              </div>
              
              <div className={`flex items-center justify-between p-4 rounded-xl border ${
                isDarkMode 
                  ? 'bg-slate-800/30 border-slate-700/30' 
                  : 'bg-slate-50/80 border-slate-200/50'
              } backdrop-blur-sm`}>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-2" />
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Duration
                  </span>
                </div>
                <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  30 hari
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleMessage}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Message via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;