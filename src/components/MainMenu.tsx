import React from 'react';
import { Heart, Trophy, Flame, Gem, ShoppingBag, Settings, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BottomNav } from './BottomNav';
import type { UserData, Screen } from '../App';

interface MainMenuProps {
  userData: UserData;
  onNavigate: (screen: Screen) => void;
}

export function MainMenu({ userData, onNavigate }: MainMenuProps) {
  const translations = {
    en: {
      welcome: 'Welcome back',
      dailyChallenge: 'Daily Challenge',
      completeDailyBonus: 'Complete your daily check-in for bonus gems!',
      checkIn: 'Check In',
      continueLearn: 'Continue Learning',
      playNow: 'Play Now',
      missions: 'Daily Missions',
      answerQuestions: 'Answer 5 questions correctly',
      winBattle: 'Win a battle match',
      achievements: 'Recent Achievements',
      levels: 'Home',
      clan: 'Clan',
      friends: 'Friends',
      chat: 'Chat',
      profile: 'Profile'
    },
    zh: {
      welcome: '欢迎回来',
      dailyChallenge: '每日挑战',
      completeDailyBonus: '完成每日签到获得宝石奖励！',
      checkIn: '签到',
      continueLearn: '继续学习',
      playNow: '开始游戏',
      missions: '每日任务',
      answerQuestions: '正确回答5个问题',
      winBattle: '赢得一场对战',
      achievements: '最近成就',
      levels: '首页',
      clan: '公会',
      friends: '好友',
      chat: '聊天',
      profile: '个人'
    }
  };

  const t = translations[userData.language];

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Top Stats Bar */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">{userData.level}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-yellow-600">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">{userData.trophies}</span>
          </div>
          
          <div className="flex items-center gap-1 text-orange-600">
            <Flame className="w-4 h-4" />
            <span className="text-sm">{userData.loginStreak}</span>
          </div>
          
          <div className="flex items-center gap-1 text-mint-600">
            <Gem className="w-4 h-4" />
            <span className="text-sm">{userData.gems}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="lg" 
            variant="ghost"
            onClick={() => onNavigate('checkin')}
            className="w-12 h-12 p-0"
          >
            <Calendar className="w-6 h-6 text-mint-600" />
          </Button>
          <Button 
            size="lg" 
            variant="ghost"
            onClick={() => onNavigate('shop')}
            className="w-12 h-12 p-0"
          >
            <ShoppingBag className="w-6 h-6 text-mint-600" />
          </Button>
          <Button 
            size="lg" 
            variant="ghost"
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 p-0"
          >
            <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-[128px]">
        <div className="mb-6">
          <h2 className="text-gray-800 dark:text-gray-100 mb-1">
            {t.welcome}, {userData.name}! 👋
          </h2>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span>{userData.hearts}/{userData.maxHearts}</span>
          </div>
        </div>

        {/* Daily Challenge Card */}
        <Card className="p-4 mb-4 bg-gradient-to-r from-mint-400 to-mint-600 text-white border-0 shadow-lg">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="mb-2">{t.dailyChallenge}</h3>
              <p className="text-mint-50 text-sm">{t.completeDailyBonus}</p>
            </div>
            <Calendar className="w-8 h-8" />
          </div>
          <Button 
            onClick={() => onNavigate('checkin')}
            className="w-full bg-white text-mint-600"
          >
            {t.checkIn}
          </Button>
        </Card>

        {/* Continue Learning Card */}
        <Card className="p-4 mb-4 bg-white dark:bg-gray-800">
          <h3 className="text-gray-800 dark:text-gray-100 mb-3">{t.continueLearn}</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-mint-100 dark:bg-mint-900 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🃏</span>
            </div>
            <div className="flex-1">
              <h4 className="text-gray-800 dark:text-gray-100">World {userData.unlockedWorlds[userData.unlockedWorlds.length - 1]}</h4>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-mint-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => onNavigate('levelSelect')}
            className="w-full bg-mint-500 text-white"
          >
            {t.playNow}
          </Button>
        </Card>

        {/* Daily Missions */}
        <Card className="p-4 mb-4 bg-white dark:bg-gray-800">
          <h3 className="text-gray-800 dark:text-gray-100 mb-3">{t.missions}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mint-100 dark:bg-mint-900 rounded-lg flex items-center justify-center">
                  <span>✓</span>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-100 text-sm">{t.answerQuestions}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <Gem className="w-3 h-3" />
                    <span>+10</span>
                  </div>
                </div>
              </div>
              <span className="text-mint-600 dark:text-mint-400">3/5</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mint-100 dark:bg-mint-900 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-mint-600" />
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-100 text-sm">{t.winBattle}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <Gem className="w-3 h-3" />
                    <span>+20</span>
                  </div>
                </div>
              </div>
              <span className="text-gray-400">0/1</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate('shop')}
            className="h-20 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-2 border-mint-200 dark:border-mint-800 flex flex-col items-center justify-center"
          >
            <ShoppingBag className="w-6 h-6 mb-1 text-mint-600" />
            <span className="text-sm">Shop</span>
          </Button>
          
          <Button
            onClick={() => onNavigate('library')}
            className="h-20 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-2 border-mint-200 dark:border-mint-800 flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-1">📚</span>
            <span className="text-sm">Library</span>
          </Button>
        </div>
      </div>

      <BottomNav
        activeTab="levels"
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