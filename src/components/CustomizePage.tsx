import React from 'react';
import { ChevronLeft, Gem } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { UserData } from '../App';

interface CustomizePageProps {
  userData: UserData;
  onBack: () => void;
  updateUserData: (updates: Partial<UserData>) => void;
}

const availableCosmetics = [
  { id: 'none', name: 'None', icon: '👤', price: 0 },
  { id: 'fire', name: 'Fire', icon: '🔥', price: 100 },
  { id: 'star', name: 'Star', icon: '⭐', price: 150 },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈', price: 200 },
  { id: 'crown', name: 'Crown', icon: '👑', price: 250 },
  { id: 'diamond', name: 'Diamond', icon: '💎', price: 300 },
  { id: 'lightning', name: 'Lightning', icon: '⚡', price: 350 },
  { id: 'rocket', name: 'Rocket', icon: '🚀', price: 400 },
];

export function CustomizePage({ userData, onBack, updateUserData }: CustomizePageProps) {
  const t = userData.language === 'en'
    ? {
        customize: 'Customize',
        cosmetics: 'Profile Cosmetics',
        owned: 'Owned',
        unlock: 'Unlock',
        gems: 'gems',
        equipped: 'Equipped',
        selectCosmetic: 'Select a cosmetic to customize your profile'
      }
    : {
        customize: '装扮',
        cosmetics: '个人资料装饰',
        owned: '已拥有',
        unlock: '解锁',
        gems: '宝石',
        equipped: '已装备',
        selectCosmetic: '选择装饰来自定义您的个人资料'
      };

  const handleCosmeticSelect = (cosmetic: typeof availableCosmetics[0]) => {
    if (cosmetic.price === 0 || (userData as any).ownedCosmetics?.includes(cosmetic.id)) {
      // Equip the cosmetic
      updateUserData({ ...userData, equippedCosmetic: cosmetic.id } as any);
    } else if (userData.gems >= cosmetic.price) {
      // Purchase and equip
      const ownedCosmetics = (userData as any).ownedCosmetics || [];
      updateUserData({ 
        gems: userData.gems - cosmetic.price,
        ownedCosmetics: [...ownedCosmetics, cosmetic.id],
        equippedCosmetic: cosmetic.id
      } as any);
    }
  };

  const ownedCosmetics = (userData as any).ownedCosmetics || ['none'];
  const equippedCosmetic = (userData as any).equippedCosmetic || 'none';

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Button 
            onClick={onBack}
            variant="ghost" 
            size="sm"
            className="mr-3"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-gray-800 dark:text-gray-100">{t.customize}</h2>
        </div>
        <div className="flex items-center gap-1 text-mint-600">
          <Gem className="w-5 h-5" />
          <span>{userData.gems}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-24">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{t.selectCosmetic}</p>
        
        <h3 className="text-gray-800 dark:text-gray-100 mb-4">{t.cosmetics}</h3>
        
        <div className="grid grid-cols-4 gap-3">
          {availableCosmetics.map((cosmetic) => {
            const isOwned = ownedCosmetics.includes(cosmetic.id);
            const isEquipped = equippedCosmetic === cosmetic.id;
            const canAfford = userData.gems >= cosmetic.price;
            
            return (
              <Card
                key={cosmetic.id}
                onClick={() => handleCosmeticSelect(cosmetic)}
                className={`p-3 cursor-pointer flex flex-col items-center gap-2 transition-all ${
                  isEquipped
                    ? 'border-2 border-mint-500 bg-mint-50 dark:bg-mint-900'
                    : isOwned
                    ? 'border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-mint-400'
                    : canAfford
                    ? 'border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-mint-400'
                    : 'border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 opacity-60 cursor-not-allowed'
                }`}
              >
                <span className="text-3xl">{cosmetic.icon}</span>
                <span className="text-xs text-gray-800 dark:text-gray-100 text-center">{cosmetic.name}</span>
                {isEquipped ? (
                  <span className="text-[10px] text-mint-600 font-medium">{t.equipped}</span>
                ) : isOwned ? (
                  <span className="text-[10px] text-gray-600 dark:text-gray-400">{t.owned}</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <Gem className="w-3 h-3 text-mint-600" />
                    <span className={`text-[10px] ${canAfford ? 'text-mint-600' : 'text-red-500'}`}>
                      {cosmetic.price}
                    </span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
