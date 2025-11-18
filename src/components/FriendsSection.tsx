import React, { useState } from 'react';
import { UserPlus, Search, MessageCircle, Trophy, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { BottomNav } from './BottomNav';
import type { UserData } from '../App';

interface FriendsSectionProps {
  userData: UserData;
  onBack: () => void;
  onChat: (friendId: string) => void;
  onNavigate?: (screen: import('../App').Screen) => void;
}

export function FriendsSection({ userData, onBack, onChat, onNavigate }: FriendsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const t = userData.language === 'en'
    ? {
        friends: 'Friends',
        addFriend: 'Add Friend',
        searchFriends: 'Search friends...',
        online: 'Online',
        offline: 'Offline',
        level: 'Level',
        message: 'Message',
        remove: 'Remove',
        noFriends: 'No friends yet',
        addFriendsMessage: 'Add friends to compete and chat together!',
        suggestedFriends: 'Suggested Friends',
        add: 'Add',
        pending: 'Pending',
        levels: 'Levels',
        clan: 'Clan',
        chat: 'Chat',
        profile: 'Profile'
      }
    : {
        friends: '好友',
        addFriend: '添加好友',
        searchFriends: '搜索好友...',
        online: '在线',
        offline: '离线',
        level: '等级',
        message: '消息',
        remove: '移除',
        noFriends: '还没有好友',
        addFriendsMessage: '添加好友一起竞技和聊天！',
        suggestedFriends: '推荐好友',
        add: '添加',
        pending: '待定',
        levels: '关卡',
        clan: '公会',
        chat: '聊天',
        profile: '个人'
      };

  const friends = [
    { id: '1', name: 'Alex Chen', level: 45, trophies: 2340, streak: 15, online: true, avatar: '👨' },
    { id: '2', name: 'Sarah Kim', level: 42, trophies: 2180, streak: 12, online: true, avatar: '👩' },
    { id: '3', name: 'Mike Johnson', level: 40, trophies: 2050, streak: 8, online: false, avatar: '👨' },
    { id: '4', name: 'Emma Wang', level: 38, trophies: 1920, streak: 20, online: false, avatar: '👩' },
    { id: '5', name: 'David Lee', level: 35, trophies: 1780, streak: 5, online: true, avatar: '👨' },
  ];

  const suggestedFriends = [
    { id: '6', name: 'Jessica Brown', level: 44, trophies: 2250, avatar: '👩' },
    { id: '7', name: 'Tom Wilson', level: 41, trophies: 2100, avatar: '👨' },
    { id: '8', name: 'Lisa Zhang', level: 39, trophies: 1980, avatar: '👩' },
  ];

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter(f => f.online);
  const offlineFriends = filteredFriends.filter(f => !f.online);

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-800 dark:text-gray-100">{t.friends}</h2>
          <Button size="sm" className="bg-mint-500 hover:bg-mint-600 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            {t.addFriend}
          </Button>
        </div>

        <div className="relative">
          <Input
            type="text"
            placeholder={t.searchFriends}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-3 pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="p-6 space-y-4 pb-[128px]">
        {friends.length === 0 ? (
          <Card className="p-8 bg-white dark:bg-gray-800 text-center">
            <UserPlus className="w-16 h-16 text-mint-500 mx-auto mb-4" />
            <h3 className="text-gray-800 dark:text-gray-100 mb-2">{t.noFriends}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t.addFriendsMessage}</p>
            <Button className="bg-mint-500 hover:bg-mint-600 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              {t.addFriend}
            </Button>
          </Card>
        ) : (
          <>
            {/* Online Friends */}
            {onlineFriends.length > 0 && (
              <div className="mb-6">
                <h3 className="text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {t.online} ({onlineFriends.length})
                </h3>
                <div className="space-y-3">
                  {onlineFriends.map((friend) => (
                    <Card key={friend.id} className="p-4 bg-white dark:bg-gray-800">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-mint-100 dark:bg-mint-900 rounded-full flex items-center justify-center text-2xl">
                            {friend.avatar}
                          </div>
                          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-gray-800 dark:text-gray-100 mb-1">{friend.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span>{t.level} {friend.level}</span>
                            <span className="flex items-center gap-1">
                              <Trophy className="w-3 h-3" />
                              {friend.trophies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3 text-orange-500" />
                              {friend.streak}
                            </span>
                          </div>
                        </div>

                        <Button
                          onClick={() => onChat(friend.id)}
                          size="sm"
                          variant="ghost"
                          className="text-mint-600 dark:text-mint-400"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Offline Friends */}
            {offlineFriends.length > 0 && (
              <div className="mb-6">
                <h3 className="text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {t.offline} ({offlineFriends.length})
                </h3>
                <div className="space-y-3">
                  {offlineFriends.map((friend) => (
                    <Card key={friend.id} className="p-4 bg-white dark:bg-gray-800 opacity-75">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                          {friend.avatar}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-gray-800 dark:text-gray-100 mb-1">{friend.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span>{t.level} {friend.level}</span>
                            <span className="flex items-center gap-1">
                              <Trophy className="w-3 h-3" />
                              {friend.trophies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              {friend.streak}
                            </span>
                          </div>
                        </div>

                        <Button
                          onClick={() => onChat(friend.id)}
                          size="sm"
                          variant="ghost"
                          className="text-gray-400"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Suggested Friends */}
        <div>
          <h3 className="text-gray-800 dark:text-gray-100 mb-3">{t.suggestedFriends}</h3>
          <div className="space-y-3">
            {suggestedFriends.map((friend) => (
              <Card key={friend.id} className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-mint-100 dark:bg-mint-900 rounded-full flex items-center justify-center text-2xl">
                    {friend.avatar}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-gray-800 dark:text-gray-100 mb-1">{friend.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span>{t.level} {friend.level}</span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {friend.trophies}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="bg-mint-500 hover:bg-mint-600 text-white"
                  >
                    {t.add}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav 
        activeTab="friends"
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