import React, { useState } from 'react';
import { ChevronLeft, Gem, Heart, Lightbulb, Sparkles, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { UserData } from '../App';

interface ShopProps {
  userData: UserData;
  onBack: () => void;
  updateUserData: (updates: Partial<UserData>) => void;
  initialTab?: 'hearts' | 'gems' | 'cosmetics' | 'premium';
  setInitialTab?: (tab: 'hearts' | 'gems' | 'cosmetics' | 'premium') => void;
}

export function Shop({ userData, onBack, updateUserData, initialTab = 'hearts', setInitialTab }: ShopProps) {
  const [selectedTab, setSelectedTab] = useState<'hearts' | 'gems' | 'cosmetics' | 'premium'>(initialTab);

  const t = userData.language === 'en'
    ? {
        shop: 'Shop',
        yourGems: 'Your Gems',
        hearts: 'Hearts',
        gems: 'Gems',
        cosmetics: 'Cosmetics',
        premium: 'Premium',
        buy: 'Buy',
        owned: 'Owned',
        popular: 'Most Popular',
        bestValue: 'Best Value',
        perMonth: '/month',
        perYear: '/year',
        save: 'Save',
        unlimitedHearts: 'Unlimited Hearts',
        noAds: 'No Ads',
        exclusiveContent: 'Exclusive Content',
        premiumBadge: 'Premium Badge',
        reviewAnswers: 'Review Wrong Answers',
        fasterLeveling: 'Faster Leveling',
        subscribe: 'Subscribe Now',
        refillHearts: 'Refill Hearts',
        fullHearts: 'Full Hearts',
        getMoreHearts: 'Get more hearts to keep playing!',
        orWaitMinutes: 'Or wait for hearts to refill over time',
        premiumBenefits: 'Premium Benefits',
        unlockAll: 'Unlock all premium features and supercharge your learning!'
      }
    : {
        shop: '商店',
        yourGems: '您的宝石',
        hearts: '生命值',
        gems: '宝石',
        cosmetics: '装饰品',
        premium: '高级会员',
        buy: '购买',
        owned: '已拥有',
        popular: '最受欢迎',
        bestValue: '最超值',
        perMonth: '/月',
        perYear: '/年',
        save: '节省',
        unlimitedHearts: '无限生命值',
        noAds: '无广告',
        exclusiveContent: '独家内容',
        premiumBadge: '高级徽章',
        reviewAnswers: '复习错误答案',
        fasterLeveling: '更快升级',
        subscribe: '立即订阅',
        refillHearts: '补充生命值',
        fullHearts: '生命值已满',
        getMoreHearts: '获取更多生命值继续游戏！',
        orWaitMinutes: '或等待生命值随时间恢复',
        premiumBenefits: '高级会员福利',
        unlockAll: '解锁所有高级功能，加速您的学习！'
      };

  const gemPackages = [
    { gems: 50, price: '$0.99' },
    { gems: 150, price: '$2.99' },
    { gems: 350, price: '$5.99', popular: true },
    { gems: 750, price: '$9.99' },
    { gems: 1500, price: '$19.99', bestValue: true },
  ];

  const cosmetics = [
    { id: 1, name: 'Rainbow Theme', emoji: '🌈', price: 100, owned: false },
    { id: 2, name: 'Golden Crown', emoji: '👑', price: 150, owned: false },
    { id: 3, name: 'Fire Effect', emoji: '🔥', price: 200, owned: false },
    { id: 4, name: 'Star Trail', emoji: '⭐', price: 180, owned: false },
    { id: 5, name: 'Sparkle Aura', emoji: '✨', price: 220, owned: false },
    { id: 6, name: 'Ice Theme', emoji: '❄️', price: 150, owned: false },
  ];

  const heartPackages = [
    { hearts: 1, gems: 10, popular: false },
    { hearts: 3, gems: 25, popular: true },
    { hearts: 5, gems: 40, popular: false },
  ];

  const handleBuyGems = (gems: number, price: string) => {
    // In production, this would integrate with payment system
    console.log(`Purchase ${gems} gems for ${price}`);
    // For demo purposes, just add the gems
    updateUserData({ gems: userData.gems + gems });
  };

  const handleBuyCosmetic = (cosmetic: typeof cosmetics[0]) => {
    if (userData.gems >= cosmetic.price) {
      updateUserData({ gems: userData.gems - cosmetic.price });
      // In production, would add to user's cosmetics collection
    }
  };

  const handleBuyHearts = (hearts: number, gems: number) => {
    if (userData.gems >= gems && userData.hearts < userData.maxHearts) {
      const newHearts = Math.min(userData.hearts + hearts, userData.maxHearts);
      updateUserData({ 
        gems: userData.gems - gems,
        hearts: newHearts
      });
    }
  };

  const handleBack = () => {
    // Reset to hearts tab for next time
    if (setInitialTab) {
      setInitialTab('hearts');
    }
    onBack();
  };

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Button onClick={handleBack} variant="ghost" size="sm" className="mr-3">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-gray-800 dark:text-gray-100">{t.shop}</h2>
        </div>
        <div className="flex items-center gap-1 text-mint-600">
          <Gem className="w-5 h-5" />
          <span>{userData.gems}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex">
        <button
          onClick={() => setSelectedTab('hearts')}
          className={`flex-1 py-3 text-center transition-colors ${
            selectedTab === 'hearts'
              ? 'text-mint-600 dark:text-mint-400 border-b-2 border-mint-600'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Heart className="w-5 h-5 mx-auto mb-1" />
          <span className="text-xs">{t.hearts}</span>
        </button>
        <button
          onClick={() => setSelectedTab('gems')}
          className={`flex-1 py-3 text-center transition-colors ${
            selectedTab === 'gems'
              ? 'text-mint-600 dark:text-mint-400 border-b-2 border-mint-600'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Gem className="w-5 h-5 mx-auto mb-1" />
          <span className="text-xs">{t.gems}</span>
        </button>
        <button
          onClick={() => setSelectedTab('cosmetics')}
          className={`flex-1 py-3 text-center transition-colors ${
            selectedTab === 'cosmetics'
              ? 'text-mint-600 dark:text-mint-400 border-b-2 border-mint-600'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Sparkles className="w-5 h-5 mx-auto mb-1" />
          <span className="text-xs">{t.cosmetics}</span>
        </button>
        <button
          onClick={() => setSelectedTab('premium')}
          className={`flex-1 py-3 text-center transition-colors ${
            selectedTab === 'premium'
              ? 'text-mint-600 dark:text-mint-400 border-b-2 border-mint-600'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Crown className="w-5 h-5 mx-auto mb-1" />
          <span className="text-xs">{t.premium}</span>
        </button>
      </div>

      <div className="p-6 pb-[128px] overflow-y-auto">
        {selectedTab === 'hearts' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2">{t.getMoreHearts}</p>
              <div className="flex items-center justify-center gap-2 text-mint-600 dark:text-mint-400">
                <Heart className="w-5 h-5 text-red-500" />
                <span>{userData.hearts}/{userData.maxHearts}</span>
              </div>
            </div>

            {heartPackages.map((pkg, idx) => (
              <Card
                key={idx}
                className={`p-4 bg-white dark:bg-gray-800 relative ${
                  pkg.popular ? 'border-2 border-mint-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-mint-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                      {t.popular}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        <span className="text-red-500">{pkg.hearts}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-gray-800 dark:text-gray-100">
                        {pkg.hearts} {pkg.hearts === 1 ? 'Heart' : 'Hearts'}
                      </h4>
                      <div className="flex items-center gap-1 text-mint-600 dark:text-mint-400">
                        <Gem className="w-4 h-4" />
                        <span>{pkg.gems}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBuyHearts(pkg.hearts, pkg.gems)}
                    disabled={userData.gems < pkg.gems || userData.hearts >= userData.maxHearts}
                    className="bg-mint-500 hover:bg-mint-600 text-white disabled:opacity-50"
                  >
                    {t.buy}
                  </Button>
                </div>
              </Card>
            ))}

            {userData.hearts >= userData.maxHearts && (
              <div className="text-center py-4">
                <p className="text-green-600 dark:text-green-400">{t.fullHearts}</p>
              </div>
            )}

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              <p>{t.orWaitMinutes}</p>
            </div>

            {/* Premium Promotion */}
            <Card className="p-6 bg-gradient-to-br from-gold/20 to-premium/20 dark:from-gold/10 dark:to-premium/10 border-2 border-gold/50">
              <div className="text-center">
                <Crown className="w-10 h-10 text-gold mx-auto mb-3" />
                <h3 className="text-gray-800 dark:text-gray-100 mb-2">{t.unlimitedHearts}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {t.unlockAll}
                </p>
                <Button 
                  onClick={() => setSelectedTab('premium')}
                  className="w-full bg-gradient-to-r from-gold to-premium hover:opacity-90 text-white"
                >
                  {t.subscribe}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {selectedTab === 'gems' && (
          <div className="space-y-3">
            {gemPackages.map((pkg, idx) => (
              <Card
                key={idx}
                className={`p-4 bg-white dark:bg-gray-800 relative ${
                  pkg.popular || pkg.bestValue ? 'border-2 border-mint-500' : ''
                }`}
              >
                {(pkg.popular || pkg.bestValue) && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-mint-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                      {pkg.popular ? t.popular : t.bestValue}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-mint-100 dark:bg-mint-900 rounded-xl flex items-center justify-center">
                      <Gem className="w-8 h-8 text-mint-600 dark:text-mint-400" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 dark:text-gray-100">{pkg.gems} Gems</h4>
                      <p className="text-mint-600 dark:text-mint-400">{pkg.price}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBuyGems(pkg.gems, pkg.price)}
                    className="bg-mint-500 hover:bg-mint-600 text-white"
                  >
                    {t.buy}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'cosmetics' && (
          <div className="grid grid-cols-2 gap-3">
            {cosmetics.map((cosmetic) => (
              <Card key={cosmetic.id} className="p-4 bg-white dark:bg-gray-800">
                <div className="text-center">
                  <div className="text-5xl mb-3">{cosmetic.emoji}</div>
                  <h4 className="text-gray-800 dark:text-gray-100 mb-2 text-sm">
                    {cosmetic.name}
                  </h4>
                  <div className="flex items-center justify-center gap-1 mb-3 text-mint-600 dark:text-mint-400">
                    <Gem className="w-4 h-4" />
                    <span>{cosmetic.price}</span>
                  </div>
                  <Button
                    onClick={() => handleBuyCosmetic(cosmetic)}
                    disabled={cosmetic.owned || userData.gems < cosmetic.price}
                    size="sm"
                    className="w-full"
                  >
                    {cosmetic.owned ? t.owned : t.buy}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'premium' && (
          <div className="space-y-4">
            {/* Monthly */}
            <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600">
              <div className="text-center mb-4">
                <Crown className="w-12 h-12 text-gold mx-auto mb-2" />
                <h3 className="text-gray-800 dark:text-gray-100 mb-1">Premium Monthly</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl text-mint-600 dark:text-mint-400">$9.99</span>
                  <span className="text-gray-600 dark:text-gray-400">{t.perMonth}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm">{t.unlimitedHearts}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="w-4 h-4">🚫</span>
                  <span className="text-sm">{t.noAds}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Sparkles className="w-4 h-4 text-mint-500" />
                  <span className="text-sm">{t.exclusiveContent}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Crown className="w-4 h-4 text-gold" />
                  <span className="text-sm">{t.premiumBadge}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{t.reviewAnswers}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="w-4 h-4">⚡</span>
                  <span className="text-sm">{t.fasterLeveling}</span>
                </div>
              </div>

              <Button className="w-full bg-mint-500 hover:bg-mint-600 text-white">
                {t.subscribe}
              </Button>
            </Card>

            {/* Yearly */}
            <Card className="p-6 bg-gradient-to-br from-mint-400 to-mint-600 text-white border-0 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs px-3 py-1 rounded-full">
                {t.save} 40%
              </div>

              <div className="text-center mb-4">
                <Crown className="w-12 h-12 mx-auto mb-2" />
                <h3 className="mb-1">Premium Yearly</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl">$59.99</span>
                  <span className="text-mint-100">{t.perYear}</span>
                </div>
                <p className="text-mint-100 text-sm mt-1">($4.99/month)</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{t.unlimitedHearts}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4">🚫</span>
                  <span className="text-sm">{t.noAds}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">{t.exclusiveContent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm">{t.premiumBadge}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm">{t.reviewAnswers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4">⚡</span>
                  <span className="text-sm">{t.fasterLeveling}</span>
                </div>
              </div>

              <Button className="w-full bg-white text-mint-600 hover:bg-mint-50">
                {t.subscribe}
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}