import React, { useState } from 'react';
import { Send, Globe, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BottomNav } from './BottomNav';
import type { UserData } from '../App';

interface ChatSystemProps {
  userData: UserData;
  onBack: () => void;
  onNavigate?: (screen: import('../App').Screen) => void;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  message: string;
  timestamp: Date;
  cosmetics?: string[];
}

export function ChatSystem({ userData, onBack, onNavigate }: ChatSystemProps) {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('global');

  const t = userData.language === 'en'
    ? {
        chat: 'Chat',
        global: 'Global',
        friends: 'Friends',
        typeMessage: 'Type a message...',
        send: 'Send',
        online: 'online',
        you: 'You',
        levels: 'Levels',
        clan: 'Clan',
        profile: 'Profile'
      }
    : {
        chat: '聊天',
        global: '全球',
        friends: '好友',
        typeMessage: '输入消息...',
        send: '发送',
        online: '在线',
        you: '你',
        levels: '关卡',
        clan: '公会',
        profile: '个人'
      };

  const globalMessages: Message[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Alex Chen',
      avatar: '👨',
      message: 'Just completed World 5! The defense questions are tough!',
      timestamp: new Date(Date.now() - 300000),
      cosmetics: ['🔥']
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Sarah Kim',
      avatar: '👩',
      message: 'Anyone want to join our clan? We\'re top 10!',
      timestamp: new Date(Date.now() - 240000),
      cosmetics: ['⭐']
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Mike Johnson',
      avatar: '👨',
      message: 'Looking for battle opponents around level 40',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'Emma Wang',
      avatar: '👩',
      message: 'Tips for the bidding quiz? Struggling with conventions',
      timestamp: new Date(Date.now() - 120000),
      cosmetics: ['🌈']
    },
  ];

  const friendMessages: Message[] = [
    {
      id: '1',
      userId: 'friend1',
      userName: 'Alex Chen',
      avatar: '👨',
      message: 'Hey! Want to practice some battles?',
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: '2',
      userId: userData.id,
      userName: t.you,
      avatar: '👤',
      message: 'Sure! Give me 10 minutes',
      timestamp: new Date(Date.now() - 540000)
    },
    {
      id: '3',
      userId: 'friend1',
      userName: 'Alex Chen',
      avatar: '👨',
      message: 'Perfect! See you then 🎮',
      timestamp: new Date(Date.now() - 480000)
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In production, would send to backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const MessageBubble = ({ msg, isOwn }: { msg: Message; isOwn: boolean }) => (
    <div className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <div className="w-10 h-10 bg-mint-100 dark:bg-mint-900 rounded-full flex items-center justify-center flex-shrink-0 text-xl">
        {msg.avatar}
      </div>
      <div className={`flex-1 ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">{msg.userName}</span>
          {msg.cosmetics && msg.cosmetics.map((cosmetic, idx) => (
            <span key={idx} className="text-sm">{cosmetic}</span>
          ))}
          <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
        </div>
        <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${
          isOwn
            ? 'bg-mint-500 text-white rounded-tr-none'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none'
        }`}>
          <p className="text-sm">{msg.message}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-6 py-4 flex items-center border-b border-gray-200 dark:border-gray-700">
        <div className="w-10"></div>
        <h2 className="flex-1 text-center text-gray-800 dark:text-gray-100">{t.chat}</h2>
        <div className="w-10"></div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <TabsTrigger value="global" className="data-[state=active]:bg-mint-100 dark:data-[state=active]:bg-mint-900">
            <Globe className="w-4 h-4 mr-2" />
            {t.global}
          </TabsTrigger>
          <TabsTrigger value="friends" className="data-[state=active]:bg-mint-100 dark:data-[state=active]:bg-mint-900">
            <User className="w-4 h-4 mr-2" />
            {t.friends}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="flex-1 flex flex-col mt-0 pb-[180px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            {globalMessages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} isOwn={msg.userId === userData.id} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="friends" className="flex-1 flex flex-col mt-0 pb-[180px]">
          {/* Friend Chat List */}
          <div className="p-4 space-y-3 mb-4">
            {[
              { id: '1', name: 'Alex Chen', avatar: '👨', lastMessage: 'Perfect! See you then 🎮', time: '8m ago', online: true, unread: 0 },
              { id: '2', name: 'Sarah Kim', avatar: '👩', lastMessage: 'Great game!', time: '1h ago', online: true, unread: 2 },
              { id: '3', name: 'Mike Johnson', avatar: '👨', lastMessage: 'Thanks for the tips!', time: '3h ago', online: false, unread: 0 },
            ].map((friend) => (
              <Card key={friend.id} className="p-3 bg-white dark:bg-gray-800 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-mint-100 dark:bg-mint-900 rounded-full flex items-center justify-center text-xl">
                      {friend.avatar}
                    </div>
                    {friend.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-gray-800 dark:text-gray-100">{friend.name}</h4>
                      <span className="text-xs text-gray-400">{friend.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {friend.lastMessage}
                    </p>
                  </div>
                  {friend.unread > 0 && (
                    <div className="w-6 h-6 bg-mint-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{friend.unread}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4">
            {friendMessages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} isOwn={msg.userId === userData.id} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Fixed input at bottom above ad banner */}
      <div className="fixed bottom-[116px] left-1/2 -translate-x-1/2 w-[375px] bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-30">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={t.typeMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-mint-500 text-white"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <BottomNav 
        activeTab="chat"
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