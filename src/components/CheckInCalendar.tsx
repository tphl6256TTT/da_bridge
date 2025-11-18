import React, { useState } from 'react';
import { X, Gem, Gift, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { UserData } from '../App';

interface CheckInCalendarProps {
  userData: UserData;
  onClose: () => void;
  updateUserData: (updates: Partial<UserData>) => void;
}

export function CheckInCalendar({ userData, onClose, updateUserData }: CheckInCalendarProps) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [reward, setReward] = useState(0);

  const t = userData.language === 'en'
    ? {
        dailyCheckIn: 'Daily Check-In',
        currentStreak: 'Current Streak',
        days: 'days',
        checkIn: 'Check In',
        claimed: 'Claimed!',
        comeBackTomorrow: 'Come back tomorrow for more rewards!',
        rewards: 'Check-In Rewards',
        day: 'Day',
        specialReward: 'Special Reward!',
        milestone: 'Milestone'
      }
    : {
        dailyCheckIn: '每日签到',
        currentStreak: '当前连击',
        days: '天',
        checkIn: '签到',
        claimed: '已领取！',
        comeBackTomorrow: '明天再来获得更多奖励！',
        rewards: '签到奖励',
        day: '第',
        specialReward: '特别奖励！',
        milestone: '里程碑'
      };

  const checkInRewards = [
    { day: 1, gems: 5, special: false },
    { day: 2, gems: 5, special: false },
    { day: 3, gems: 10, special: false },
    { day: 4, gems: 10, special: false },
    { day: 5, gems: 15, special: false },
    { day: 6, gems: 15, special: false },
    { day: 7, gems: 50, special: true, label: 'Week' },
    { day: 8, gems: 10, special: false },
    { day: 9, gems: 10, special: false },
    { day: 10, gems: 20, special: false },
    { day: 11, gems: 10, special: false },
    { day: 12, gems: 15, special: false },
    { day: 13, gems: 15, special: false },
    { day: 14, gems: 75, special: true, label: '2 Weeks' },
    { day: 15, gems: 15, special: false },
    { day: 16, gems: 15, special: false },
    { day: 17, gems: 20, special: false },
    { day: 18, gems: 20, special: false },
    { day: 19, gems: 25, special: false },
    { day: 20, gems: 25, special: false },
    { day: 21, gems: 100, special: true, label: '3 Weeks' },
    { day: 30, gems: 150, special: true, label: 'Month' },
    { day: 100, gems: 500, special: true, label: '100 Days!' },
  ];

  const handleCheckIn = () => {
    const nextDay = userData.loginStreak % 7 || 7;
    const dayReward = checkInRewards.find(r => r.day === nextDay) || checkInRewards[0];
    
    setReward(dayReward.gems);
    setCheckedIn(true);
    
    updateUserData({
      gems: userData.gems + dayReward.gems,
      loginStreak: userData.loginStreak + 1
    });
  };

  const getDayStatus = (day: number) => {
    const currentDay = userData.loginStreak % 7 || 7;
    if (day < currentDay) return 'completed';
    if (day === currentDay) return 'current';
    return 'locked';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="mobile-container max-w-md w-full bg-white dark:bg-gray-800 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-gray-800 dark:text-gray-100">{t.dailyCheckIn}</h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Streak Display */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-3xl mb-1">{userData.loginStreak}</div>
                <div className="text-xs">{t.days}</div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {t.currentStreak}: {userData.loginStreak} {t.days}
            </p>
          </div>

          {/* Check-In Success Message */}
          {checkedIn && (
            <Card className="p-6 mb-6 bg-gradient-to-br from-mint-400 to-mint-600 text-white border-0 text-center">
              <Star className="w-16 h-16 mx-auto mb-3" />
              <h3 className="mb-2">{t.claimed}</h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Gem className="w-6 h-6" />
                <span className="text-2xl">+{reward}</span>
              </div>
              <p className="text-mint-100 text-sm">{t.comeBackTomorrow}</p>
            </Card>
          )}

          {/* Weekly Calendar */}
          <div className="mb-6">
            <h3 className="text-gray-800 dark:text-gray-100 mb-4">{t.rewards}</h3>
            <div className="grid grid-cols-7 gap-2">
              {checkInRewards.slice(0, 7).map((reward) => {
                const status = getDayStatus(reward.day);
                return (
                  <div
                    key={reward.day}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 ${
                      status === 'completed'
                        ? 'bg-mint-500 text-white'
                        : status === 'current'
                        ? 'bg-mint-200 dark:bg-mint-800 border-2 border-mint-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    <div className="text-xs mb-1">{t.day}{reward.day}</div>
                    <div className="flex items-center gap-1">
                      {reward.special ? (
                        <Gift className="w-4 h-4" />
                      ) : (
                        <>
                          <Gem className="w-3 h-3" />
                          <span className="text-xs">{reward.gems}</span>
                        </>
                      )}
                    </div>
                    {status === 'completed' && (
                      <span className="text-xs mt-1">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Rewards */}
          <div className="space-y-3 mb-6">
            <h4 className="text-gray-800 dark:text-gray-100">{t.milestone} {t.rewards}</h4>
            {checkInRewards.filter(r => r.special).map((reward) => (
              <Card
                key={reward.day}
                className={`p-4 ${
                  userData.loginStreak >= reward.day
                    ? 'bg-mint-100 dark:bg-mint-900 border-mint-500'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-mint-400 to-mint-600 rounded-xl flex items-center justify-center">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-100">
                        {reward.label} {t.specialReward}
                      </p>
                      <div className="flex items-center gap-1 text-mint-600 dark:text-mint-400">
                        <Gem className="w-4 h-4" />
                        <span>{reward.gems}</span>
                      </div>
                    </div>
                  </div>
                  {userData.loginStreak >= reward.day && (
                    <span className="text-2xl">✓</span>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Check-In Button */}
          {!checkedIn && (
            <Button
              onClick={handleCheckIn}
              className="w-full h-14 bg-gradient-to-r from-mint-400 to-mint-600 hover:from-mint-500 hover:to-mint-700 text-white"
            >
              <Gift className="w-5 h-5 mr-2" />
              {t.checkIn}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
