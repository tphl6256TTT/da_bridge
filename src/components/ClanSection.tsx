import React from 'react';
import { ChevronLeft, Users, Trophy, Swords, Crown, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BottomNav } from './BottomNav';
import type { UserData } from '../App';

interface ClanSectionProps {
  userData: UserData;
  onBack: () => void;
  onNavigate?: (screen: import('../App').Screen) => void;
}

export function ClanSection({ userData, onBack, onNavigate }: ClanSectionProps) {
  const t = userData.language === 'en'
    ? {
        clans: 'Clans',
        myClan: 'My Clan',
        noClan: 'You are not in a clan',
        joinClan: 'Join a Clan',
        findClan: 'Find the perfect clan for you',
        clanRank: 'Clan Rank',
        members: 'Members',
        clanPoints: 'Clan Points',
        clanWars: 'Clan Wars',
        leaderboard: 'Leaderboard',
        topClans: 'Top Clans',
        join: 'Join',
        online: 'online',
        level: 'Level',
        levels: 'Levels',
        clan: 'Clan',
        friends: 'Friends',
        chat: 'Chat',
        profile: 'Profile'
      }
    : {
        clans: '公会',
        myClan: '我的公会',
        noClan: '您还没有加入公会',
        joinClan: '加入公会',
        findClan: '找到适合您的公会',
        clanRank: '公会排名',
        members: '成员',
        clanPoints: '公会积分',
        clanWars: '公会战',
        leaderboard: '排行榜',
        topClans: '顶级公会',
        join: '加入',
        online: '在线',
        level: '等级',
        levels: '关卡',
        clan: '公会',
        friends: '好友',
        chat: '聊天',
        profile: '个人'
      };

  const topClans = [
    { id: 1, name: 'Bridge Masters', members: 50, points: 15420, rank: 1, emoji: '👑' },
    { id: 2, name: 'Card Warriors', members: 48, points: 14850, rank: 2, emoji: '⚔️' },
    { id: 3, name: 'Ace Squad', members: 45, points: 13990, rank: 3, emoji: '🃏' },
    { id: 4, name: 'Diamond Alliance', members: 42, points: 12750, rank: 4, emoji: '💎' },
    { id: 5, name: 'Trump Titans', members: 40, points: 11200, rank: 5, emoji: '🛡️' },
  ];

  const clanMembers = [
    { id: 1, name: 'Alex Chen', level: 45, points: 2340, online: true },
    { id: 2, name: 'Sarah Kim', level: 42, points: 2180, online: true },
    { id: 3, name: 'Mike Johnson', level: 40, points: 2050, online: false },
    { id: 4, name: 'Emma Wang', level: 38, points: 1920, online: true },
    { id: 5, name: 'David Lee', level: 35, points: 1780, online: false },
  ];

  if (!userData.clanId) {
    return (
      <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10"></div>
          <h2 className="flex-1 text-center text-gray-800 dark:text-gray-100">{t.clans}</h2>
        </div>

        <div className="p-6 pb-[128px] overflow-y-auto">
          {/* No Clan State */}
          <Card className="p-8 mb-6 bg-white dark:bg-gray-800 text-center">
            <Users className="w-16 h-16 text-mint-500 mx-auto mb-4" />
            <h3 className="text-gray-800 dark:text-gray-100 mb-2">{t.noClan}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t.findClan}</p>
            <Button className="bg-mint-500 hover:bg-mint-600 text-white">
              {t.joinClan}
            </Button>
          </Card>

          {/* Top Clans */}
          <h3 className="text-gray-800 dark:text-gray-100 mb-4">{t.topClans}</h3>
          <div className="space-y-3">
            {topClans.map((clan) => (
              <Card key={clan.id} className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    clan.rank === 1 ? 'bg-yellow-100 dark:bg-yellow-900' :
                    clan.rank === 2 ? 'bg-gray-200 dark:bg-gray-700' :
                    clan.rank === 3 ? 'bg-orange-100 dark:bg-orange-900' :
                    'bg-mint-100 dark:bg-mint-900'
                  }`}>
                    {clan.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-500 dark:text-gray-400">#{clan.rank}</span>
                      <h4 className="text-gray-800 dark:text-gray-100">{clan.name}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        <Users className="w-3 h-3 inline mr-1" />
                        {clan.members}
                      </span>
                      <span>
                        <Trophy className="w-3 h-3 inline mr-1" />
                        {clan.points.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-mint-500 hover:bg-mint-600 text-white">
                    {t.join}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <BottomNav 
          activeTab="clan"
          onNavigate={onNavigate || (() => {})}
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

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-4 flex items-center border-b border-gray-200 dark:border-gray-700">
        <div className="w-10"></div>
        <h2 className="flex-1 text-center text-gray-800 dark:text-gray-100">{t.myClan}</h2>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-4 pb-[128px]">
        {/* Clan Header */}
        <Card className="p-6 mb-4 bg-gradient-to-br from-mint-400 to-mint-600 text-white border-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl">
              👑
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Bridge Masters</h3>
              <div className="flex items-center gap-3 text-sm text-mint-100">
                <span>
                  <Users className="w-4 h-4 inline mr-1" />
                  50 {t.members}
                </span>
                <span>
                  <Trophy className="w-4 h-4 inline mr-1" />
                  #{1}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">15,420</p>
              <p className="text-xs text-mint-100">{t.clanPoints}</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">12</p>
              <p className="text-xs text-mint-100">{t.online}</p>
            </div>
          </div>
        </Card>

        {/* Clan Wars */}
        <Card className="p-4 mb-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center">
                <Swords className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="text-gray-800 dark:text-gray-100">{t.clanWars}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Battle</p>
              </div>
            </div>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
              Join Battle
            </Button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">👑</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Bridge Masters</span>
              </div>
              <span className="text-mint-600 dark:text-mint-400">8,450</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
              <div className="bg-mint-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚔️</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Card Warriors</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">6,230</span>
            </div>
          </div>
        </Card>

        {/* Members List */}
        <Card className="p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-800 dark:text-gray-100">{t.members}</h4>
            <span className="text-sm text-gray-600 dark:text-gray-400">50/50</span>
          </div>

          <div className="space-y-3">
            {clanMembers.map((member, idx) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  idx === 0 ? 'bg-yellow-100 dark:bg-yellow-900' :
                  idx === 1 ? 'bg-gray-200 dark:bg-gray-700' :
                  idx === 2 ? 'bg-orange-100 dark:bg-orange-900' :
                  'bg-mint-100 dark:bg-mint-900'
                }`}>
                  <span>
                    {idx === 0 ? '👑' : 
                     idx === 1 ? '🥈' : 
                     idx === 2 ? '🥉' : '👤'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm text-gray-800 dark:text-gray-100">{member.name}</h4>
                    {member.online && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {t.level} {member.level} • {member.points.toLocaleString()} pts
                  </p>
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            ))}\n          </div>
        </Card>
      </div>

      <BottomNav 
        activeTab="clan"
        onNavigate={onNavigate || (() => {})}
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