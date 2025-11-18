import React from 'react';
import { Home, Users, UserPlus, MessageCircle, User } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavProps {
  activeTab: 'levels' | 'clan' | 'friends' | 'chat' | 'profile';
  onNavigate: (screen: Screen) => void;
  labels: {
    levels: string;
    clan: string;
    friends: string;
    chat: string;
    profile: string;
  };
}

export function BottomNav({ activeTab, onNavigate, labels }: BottomNavProps) {
  const NavButton = ({ 
    icon: Icon, 
    label, 
    screen, 
    navKey 
  }: { 
    icon: React.ElementType; 
    label: string; 
    screen: Screen;
    navKey: string;
  }) => {
    const isActive = activeTab === navKey;
    
    return (
      <button
        onClick={() => onNavigate(screen)}
        className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-mint-100'}`} />
        <span className={`text-[10px] ${isActive ? 'text-white' : 'text-mint-100'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* Ad Banner Placeholder - Directly above nav bar with no gap */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[375px] bg-gray-200 dark:bg-gray-700 h-12 flex items-center justify-center z-30">
        <span className="text-xs text-gray-500 dark:text-gray-400">Advertisement</span>
      </div>

      {/* Bottom Navigation - No rounded corners */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-16 bg-gradient-to-r from-mint-400 via-mint-500 to-mint-600 border-t border-mint-600 z-40">
        <div className="flex items-center justify-around h-full">
          <NavButton icon={Home} label={labels.levels} screen="mainMenu" navKey="levels" />
          <NavButton icon={Users} label={labels.clan} screen="clan" navKey="clan" />
          <NavButton icon={UserPlus} label={labels.friends} screen="friends" navKey="friends" />
          <NavButton icon={MessageCircle} label={labels.chat} screen="chat" navKey="chat" />
          <NavButton icon={User} label={labels.profile} screen="profile" navKey="profile" />
        </div>
      </div>
    </>
  );
}