import React, { useState } from 'react';
import { ChevronLeft, Lock, Star, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { UserData } from '../App';

interface LevelSelectionProps {
  userData: UserData;
  onWorldSelect: (worldId: number) => void;
  onBack: () => void;
}

interface World {
  id: number;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  questionTypes: string[];
  emoji: string;
  color: string;
}

const worlds: World[] = [
  {
    id: 1,
    name: { en: 'Bridge Basics', zh: '桥牌基础' },
    description: { en: 'Learn the fundamentals of bridge', zh: '学习桥牌的基本知识' },
    questionTypes: ['Card Values', 'Suit Ranking', 'Basic Rules'],
    emoji: '🎴',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 2,
    name: { en: 'Bidding Fundamentals', zh: '叫牌基础' },
    description: { en: 'Master the art of bidding', zh: '掌握叫牌艺术' },
    questionTypes: ['Opening Bids', 'Responses', 'Point Counting'],
    emoji: '🎯',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 3,
    name: { en: 'Card Play Basics', zh: '打牌基础' },
    description: { en: 'Learn fundamental card play techniques', zh: '学习基本打牌技巧' },
    questionTypes: ['Trick Taking', 'Following Suit', 'Trump Usage'],
    emoji: '🃏',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 4,
    name: { en: 'Intermediate Bidding', zh: '中级叫牌' },
    description: { en: 'Advanced bidding strategies', zh: '高级叫牌策略' },
    questionTypes: ['Conventions', 'Competitive Bidding', 'Slam Bidding'],
    emoji: '🎪',
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 5,
    name: { en: 'Defense Techniques', zh: '防守技巧' },
    description: { en: 'Master defensive play', zh: '掌握防守打法' },
    questionTypes: ['Opening Leads', 'Signals', 'Card Reading'],
    emoji: '🛡️',
    color: 'from-red-400 to-red-600'
  },
  {
    id: 6,
    name: { en: 'Declarer Play', zh: '庄家打牌' },
    description: { en: 'Advanced declarer techniques', zh: '高级庄家技巧' },
    questionTypes: ['Finesses', 'Entries', 'Timing'],
    emoji: '👑',
    color: 'from-yellow-400 to-yellow-600'
  }
];

export function LevelSelection({ userData, onWorldSelect, onBack }: LevelSelectionProps) {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const t = userData.language === 'en' 
    ? {
        title: 'Select Your World',
        locked: 'Complete previous world to unlock',
        questionTypes: 'Question Types',
        start: 'Start',
        back: 'Back',
        completed: 'Completed'
      }
    : {
        title: '选择您的世界',
        locked: '完成上一个世界以解锁',
        questionTypes: '问题类型',
        start: '开始',
        back: '返回',
        completed: '已完成'
      };

  const isWorldUnlocked = (worldId: number) => {
    return userData.unlockedWorlds.includes(worldId);
  };

  const isWorldCompleted = (worldId: number) => {
    return userData.completedWorlds.includes(worldId);
  };

  if (selectedWorld) {
    return (
      <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <Card className={`w-full max-w-sm bg-gradient-to-br ${selectedWorld.color} text-white border-0 p-8 transform scale-110 transition-transform`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{selectedWorld.emoji}</div>
            <h2 className="mb-2">{selectedWorld.name[userData.language]}</h2>
            <p className="text-white/90 mb-6">{selectedWorld.description[userData.language]}</p>
            
            <div className="bg-white/20 rounded-lg p-4 mb-6">
              <p className="text-sm mb-2">{t.questionTypes}:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedWorld.questionTypes.map((type, idx) => (
                  <span key={idx} className="text-xs bg-white/30 px-3 py-1 rounded-full">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setSelectedWorld(null)}
                className="flex-1 bg-white/20 text-white"
              >
                {t.back}
              </Button>
              <Button
                onClick={() => onWorldSelect(selectedWorld.id)}
                className="flex-1 bg-white text-gray-900"
              >
                <Play className="w-4 h-4 mr-2" />
                {t.start}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-6 py-4 flex items-center border-b border-gray-200 dark:border-gray-700">
        <Button 
          onClick={onBack}
          variant="ghost" 
          size="sm"
          className="mr-3"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-gray-800 dark:text-gray-100">{t.title}</h2>
      </div>

      {/* World Cards */}
      <div className="p-6 space-y-4 pb-24">
        {worlds.map((world) => {
          const unlocked = isWorldUnlocked(world.id);
          const completed = isWorldCompleted(world.id);

          return (
            <Card
              key={world.id}
              onClick={() => unlocked && setSelectedWorld(world)}
              className={`p-4 cursor-pointer transition-all ${
                unlocked
                  ? 'bg-white dark:bg-gray-800 hover:scale-[1.02] hover:shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                  unlocked ? `bg-gradient-to-br ${world.color}` : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {unlocked ? world.emoji : <Lock className="w-8 h-8 text-gray-500" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-800 dark:text-gray-100">
                      {world.name[userData.language]}
                    </h3>
                    {completed && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {unlocked ? world.description[userData.language] : t.locked}
                  </p>
                  {unlocked && completed && (
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3].map((star) => (
                        <Star key={star} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  )}
                </div>

                {unlocked && !completed && (
                  <div className="w-8 h-8 rounded-full bg-mint-100 dark:bg-mint-900 flex items-center justify-center">
                    <Play className="w-4 h-4 text-mint-600 dark:text-mint-400" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}