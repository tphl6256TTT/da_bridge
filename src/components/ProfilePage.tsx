import React from 'react';
import { Trophy, Flame, Target, Star, Award, Settings as SettingsIcon, Palette, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BottomNav } from './BottomNav';
import type { UserData, Screen } from '../App';

interface ProfilePageProps {
  userData: UserData;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  updateUserData: (updates: Partial<UserData>) => void;
  onNavigateToShopPremium?: () => void;
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

export function ProfilePage({ userData, onBack, onNavigate, updateUserData, onNavigateToShopPremium }: ProfilePageProps) {
  const t = userData.language === 'en'
    ? {
        profile: 'Profile',
        level: 'Level',
        trophies: 'Trophies',
        streak: 'Streak',
        answers: 'Answers',
        upgradeToPremium: 'Upgrade to Premium',
        premiumFeatures: 'Unlock all features, ad-free experience, and exclusive cosmetics!',
        unlockPremium: 'Unlock Premium',
        worldsCompleted: 'Worlds Completed',
        totalQuestions: 'Total Questions',
        winRate: 'Win Rate',
        stats: 'Statistics',
        recentAchievements: 'Recent Achievements',
        firstWin: 'First Win',
        wonYourFirst: 'Won your first battle',
        streakMaster: 'Streak Master',
        maintained7Day: 'Maintained a 7-day streak',
        quickLearner: 'Quick Learner',
        completed5Worlds: 'Completed 5 worlds',
        friendsList: 'Friends',
        viewAll: 'View All',
        levels: 'Home',
        clan: 'Clan',
        friends: 'Friends',
        chat: 'Chat',
        adTitle: 'Bridge Master Pro',
        adDescription: 'Learn advanced bridge strategies!'
      }
    : {
        profile: '个人资料',
        level: '等级',
        trophies: '奖杯',
        streak: '连胜',
        answers: '答题',
        upgradeToPremium: '升级至高级版',
        premiumFeatures: '解锁所有功能、无广告体验和独家装饰！',
        unlockPremium: '解锁高级版',
        worldsCompleted: '完成世界',
        totalQuestions: '总题数',
        winRate: '胜率',
        stats: '统计',
        recentAchievements: '最近成就',
        firstWin: '首胜',
        wonYourFirst: '赢得首场战斗',
        streakMaster: '连胜大师',
        maintained7Day: '保持7天连胜',
        quickLearner: '快速学习者',
        completed5Worlds: '完成5个世界',
        friendsList: '好友',
        viewAll: '查看全部',
        levels: '首页',
        clan: '公会',
        friends: '好友',
        chat: '聊天',
        adTitle: '桥牌大师专业版',
        adDescription: '学习高级桥牌策略！'
      };

  const equippedCosmetic = (userData as any).equippedCosmetic || 'none';
  const currentCosmetic = availableCosmetics.find(c => c.id === equippedCosmetic) || availableCosmetics[0];

  return (
    <div className="mobile-container h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* User Card Header */}
      <div className="flex-shrink-0 bg-gradient-to-br from-mint-400 via-mint-500 to-mint-600 px-6 pt-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">{t.profile}</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onNavigate('customize')}
              className="text-white hover:bg-white/20"
            >
              <Palette className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onNavigate('settings')}
              className="text-white hover:bg-white/20"
            >
              <SettingsIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur">
              👤
            </div>
            {currentCosmetic.id !== 'none' && (
              <div className="absolute -top-1 -right-1 text-xl">
                {currentCosmetic.icon}
              </div>
            )}
          </div>
          <h3 className="text-white mb-1 text-sm">{userData.name}</h3>
          <p className="text-mint-100 text-xs mb-2">{userData.email}</p>
          
          {userData.isPremium && (
            <div className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-yellow-900" />
              <span className="text-xs">Premium</span>
            </div>
          )}
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
        {/* Main Stats Grid - SQUARE CARDS */}
        <div className="grid grid-cols-4 gap-2">
          <div className="w-full">
            <Card className="w-full aspect-square p-1.5 bg-gradient-to-br from-mint-50 to-mint-100 dark:from-gray-800 dark:to-gray-900 border-mint-200 dark:border-gray-700 text-center shadow-lg flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <p className="text-xs text-gray-900 dark:text-gray-100">{userData.level}</p>
              <p className="text-[9px] text-gray-700 dark:text-gray-300">{t.level}</p>
            </Card>
          </div>

          <div className="w-full">
            <Card className="w-full aspect-square p-1.5 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900 border-yellow-200 dark:border-gray-700 text-center shadow-lg flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-900 dark:text-gray-100">{userData.trophies}</p>
              <p className="text-[9px] text-gray-700 dark:text-gray-300">{t.trophies}</p>
            </Card>
          </div>

          <div className="w-full">
            <Card className="w-full aspect-square p-1.5 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 border-orange-200 dark:border-gray-700 text-center shadow-lg flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-900 dark:text-gray-100">{userData.loginStreak}</p>
              <p className="text-[9px] text-gray-700 dark:text-gray-300">{t.streak}</p>
            </Card>
          </div>

          <div className="w-full">
            <Card className="w-full aspect-square p-1.5 bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 border-red-200 dark:border-gray-700 text-center shadow-lg flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-900 dark:text-gray-100">{userData.answerStreak}</p>
              <p className="text-[9px] text-gray-700 dark:text-gray-300">{t.answers}</p>
            </Card>
          </div>
        </div>

        {/* Premium Upgrade Card */}
        {!userData.isPremium && (
          <Card className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
            <div className="flex items-start gap-2 mb-2">
              <Crown className="w-6 h-6 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="mb-1 text-xs">{t.upgradeToPremium}</h3>
                <p className="text-purple-50 text-[10px] leading-relaxed">{t.premiumFeatures}</p>
              </div>
            </div>
            <Button className="w-full bg-white text-purple-600 hover:bg-purple-50 h-8 text-xs" onClick={onNavigateToShopPremium}>
              {t.unlockPremium}
            </Button>
          </Card>
        )}

        {/* Statistics */}
        <Card className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-gray-900 dark:text-gray-100 mb-2 text-sm">{t.stats}</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl text-mint-600 dark:text-mint-400 mb-0.5">{userData.completedWorlds.length}</p>
              <p className="text-[10px] text-gray-700 dark:text-gray-300">{t.worldsCompleted}</p>
            </div>
            <div className="text-center">
              <p className="text-xl text-mint-600 dark:text-mint-400 mb-0.5">342</p>
              <p className="text-[10px] text-gray-700 dark:text-gray-300">{t.totalQuestions}</p>
            </div>
            <div className="text-center">
              <p className="text-xl text-mint-600 dark:text-mint-400 mb-0.5">87%</p>
              <p className="text-[10px] text-gray-700 dark:text-gray-300">{t.winRate}</p>
            </div>
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-gray-900 dark:text-gray-100 mb-2 text-sm">{t.recentAchievements}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 dark:text-gray-100 text-xs">{t.firstWin}</h4>
                <p className="text-[10px] text-gray-700 dark:text-gray-300">{t.wonYourFirst}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 dark:text-gray-100 text-xs">{t.streakMaster}</h4>
                <p className="text-[10px] text-gray-700 dark:text-gray-300">{t.maintained7Day}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-mint-100 dark:bg-mint-900/30 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-mint-600 dark:text-mint-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 dark:text-gray-100 text-xs">{t.quickLearner}</h4>
                <p className="text-[10px] text-gray-700 dark:text-gray-300">{t.completed5Worlds}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Friends List Preview */}
        <Card className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 dark:text-gray-100 text-sm">{t.friendsList}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('friends')}
              className="text-mint-600 dark:text-mint-400 h-7 text-xs"
            >
              {t.viewAll}
            </Button>
          </div>
          <div className="flex gap-2">
            {['👨', '👩', '👨', '👩', '👨'].map((avatar, idx) => (
              <div key={idx} className="w-10 h-10 bg-mint-100 dark:bg-mint-900/30 rounded-full flex items-center justify-center text-lg">
                {avatar}
              </div>
            ))}
          </div>
        </Card>

        {/* Empty Spacer Card - Allows scrolling past ad and nav */}
        <div className="h-[480px]" aria-hidden="true"></div>
      </div>

      <BottomNav
        activeTab="profile"
        onNavigate={onNavigate}
        labels={{
          levels: t.levels,
          clan: t.clan,
          friends: t.friends,
          chat: t.chat,
          profile: t.profile
        }}
      />
    </div>
  );
}