import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import type { UserData, Theme } from '../App';

interface SettingsPageProps {
  userData: UserData;
  onBack: () => void;
  updateUserData: (updates: Partial<UserData>) => void;
}

export function SettingsPage({ userData, onBack, updateUserData }: SettingsPageProps) {
  const t = userData.language === 'en'
    ? {
        settings: 'Settings',
        language: 'Language',
        darkMode: 'Dark Mode',
        notifications: 'Notifications',
        soundEffects: 'Sound Effects',
        termsOfService: 'Terms of Service',
        privacyPolicy: 'Privacy Policy',
        manageCookies: 'Manage Cookies',
        preferences: 'Preferences',
        legal: 'Legal & Privacy'
      }
    : {
        settings: '设置',
        language: '语言',
        darkMode: '深色模式',
        notifications: '通知',
        soundEffects: '音效',
        termsOfService: '服务条款',
        privacyPolicy: '隐私政策',
        manageCookies: '管理Cookie',
        preferences: '偏好设置',
        legal: '法律与隐私'
      };

  const handleThemeToggle = (checked: boolean) => {
    const newTheme: Theme = checked ? 'dark' : 'light';
    updateUserData({ theme: newTheme });
    document.documentElement.classList.toggle('dark', checked);
  };

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
        <h2 className="text-gray-800 dark:text-gray-100">{t.settings}</h2>
      </div>

      {/* Content */}
      <div className="p-6 pb-24">
        {/* Preferences Section */}
        <h3 className="text-gray-800 dark:text-gray-100 mb-4">{t.preferences}</h3>
        
        <Card className="p-4 mb-6 bg-white dark:bg-gray-800 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-800 dark:text-gray-100">{t.language}</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={userData.language === 'en' ? 'default' : 'outline'}
                onClick={() => updateUserData({ language: 'en' })}
                className={userData.language === 'en' ? 'bg-mint-500 hover:bg-mint-600 text-white' : ''}
              >
                Eng
              </Button>
              <Button
                size="sm"
                variant={userData.language === 'zh' ? 'default' : 'outline'}
                onClick={() => updateUserData({ language: 'zh' })}
                className={userData.language === 'zh' ? 'bg-mint-500 hover:bg-mint-600 text-white' : ''}
              >
                Chi
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base text-gray-800 dark:text-gray-100">{t.darkMode}</span>
            <Switch
              checked={userData.theme === 'dark'}
              onCheckedChange={handleThemeToggle}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base text-gray-800 dark:text-gray-100">{t.notifications}</span>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base text-gray-800 dark:text-gray-100">{t.soundEffects}</span>
            <Switch defaultChecked />
          </div>
        </Card>

        {/* Legal Section */}
        <h3 className="text-gray-800 dark:text-gray-100 mb-4">{t.legal}</h3>
        
        <Card className="p-4 bg-white dark:bg-gray-800 space-y-1">
          <button 
            className="w-full text-left py-3 text-base text-gray-800 dark:text-gray-100 hover:text-mint-600 dark:hover:text-mint-400 transition-colors border-b border-gray-200 dark:border-gray-700"
            onClick={() => window.alert('Terms of Service would open here')}
          >
            {t.termsOfService}
          </button>
          <button 
            className="w-full text-left py-3 text-base text-gray-800 dark:text-gray-100 hover:text-mint-600 dark:hover:text-mint-400 transition-colors border-b border-gray-200 dark:border-gray-700"
            onClick={() => window.alert('Privacy Policy would open here')}
          >
            {t.privacyPolicy}
          </button>
          <button 
            className="w-full text-left py-3 text-base text-gray-800 dark:text-gray-100 hover:text-mint-600 dark:hover:text-mint-400 transition-colors"
            onClick={() => window.alert('Cookie settings would open here')}
          >
            {t.manageCookies}
          </button>
        </Card>
      </div>
    </div>
  );
}
