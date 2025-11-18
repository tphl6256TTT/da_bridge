import React, { useState, useEffect } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MainMenu } from './components/MainMenu';
import { LevelSelection } from './components/LevelSelection';
import { QuizGame } from './components/QuizGame';
import { ProfilePage } from './components/ProfilePage';
import { Shop } from './components/Shop';
import { ClanSection } from './components/ClanSection';
import { FriendsSection } from './components/FriendsSection';
import { ChatSystem } from './components/ChatSystem';
import { CheckInCalendar } from './components/CheckInCalendar';
import { Library } from './components/Library';
import { SettingsPage } from './components/SettingsPage';
import { CustomizePage } from './components/CustomizePage';

export type Language = 'en' | 'zh';
export type Theme = 'light' | 'dark';

export interface UserData {
  id: string;
  name: string;
  email: string;
  level: number;
  trophies: number;
  loginStreak: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  unlockedWorlds: number[];
  completedWorlds: number[];
  isPremium: boolean;
  language: Language;
  theme: Theme;
  answerStreak: number;
  clanId?: string;
  friendIds: string[];
}

export type Screen = 
  | 'onboarding' 
  | 'main' 
  | 'mainMenu'
  | 'levelSelect' 
  | 'quiz' 
  | 'profile' 
  | 'shop'
  | 'clan'
  | 'friends'
  | 'chat'
  | 'checkin'
  | 'library'
  | 'settings'
  | 'customize';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedWorld, setSelectedWorld] = useState<number | null>(null);
  const [shopInitialTab, setShopInitialTab] = useState<'hearts' | 'gems' | 'cosmetics' | 'premium'>('hearts');

  // Force remove dark class on initial mount to prevent system preference override
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    
    // Set color-scheme meta tag to prevent browser from auto-detecting
    let metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (!metaColorScheme) {
      metaColorScheme = document.createElement('meta');
      metaColorScheme.setAttribute('name', 'color-scheme');
      document.head.appendChild(metaColorScheme);
    }
    metaColorScheme.setAttribute('content', 'light');
  }, []);

  useEffect(() => {
    // Check if user is returning
    const storedUser = localStorage.getItem('bridgeAppUser');
    if (storedUser) {
      setIsFirstLaunch(false);
      const user = JSON.parse(storedUser);
      
      // Force light mode if theme is dark (migration)
      if (user.theme === 'dark') {
        console.log('🔄 Migrating user from dark to light mode...');
        user.theme = 'light';
        localStorage.setItem('bridgeAppUser', JSON.stringify(user));
      }
      
      setUserData(user);
      setCurrentScreen('main');
      // Apply stored theme
      document.documentElement.classList.toggle('dark', user.theme === 'dark');
    }
  }, []);

  // Apply theme whenever userData.theme changes
  useEffect(() => {
    if (userData?.theme) {
      document.documentElement.classList.toggle('dark', userData.theme === 'dark');
      
      // Update meta tag to match current theme
      const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
      if (metaColorScheme) {
        metaColorScheme.setAttribute('content', userData.theme);
      }
    }
  }, [userData?.theme]);

  const handleOnboardingComplete = (user: UserData) => {
    setUserData(user);
    localStorage.setItem('bridgeAppUser', JSON.stringify(user));
    setCurrentScreen('main');
  };

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleWorldSelect = (worldId: number) => {
    setSelectedWorld(worldId);
    setCurrentScreen('quiz');
  };

  const updateUserData = (updates: Partial<UserData>) => {
    if (!userData) return;
    const updated = { ...userData, ...updates };
    setUserData(updated);
    localStorage.setItem('bridgeAppUser', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
      {currentScreen === 'onboarding' && (
        <OnboardingFlow 
          onComplete={handleOnboardingComplete}
          isFirstLaunch={isFirstLaunch}
        />
      )}
      
      {currentScreen === 'main' && userData && (
        <MainMenu 
          userData={userData}
          onNavigate={handleScreenChange}
        />
      )}
      
      {currentScreen === 'mainMenu' && userData && (
        <MainMenu 
          userData={userData}
          onNavigate={handleScreenChange}
        />
      )}
      
      {currentScreen === 'levelSelect' && userData && (
        <LevelSelection 
          userData={userData}
          onWorldSelect={handleWorldSelect}
          onBack={() => setCurrentScreen('main')}
        />
      )}
      
      {currentScreen === 'quiz' && userData && selectedWorld !== null && (
        <QuizGame 
          userData={userData}
          worldId={selectedWorld}
          onComplete={(earnedGems, newLevel) => {
            updateUserData({ gems: userData.gems + earnedGems, level: newLevel });
            setCurrentScreen('main');
          }}
          onExit={() => setCurrentScreen('levelSelect')}
          updateUserData={updateUserData}
        />
      )}
      
      {currentScreen === 'profile' && userData && (
        <ProfilePage 
          userData={userData}
          onBack={() => setCurrentScreen('main')}
          onNavigate={handleScreenChange}
          updateUserData={updateUserData}
          onNavigateToShopPremium={() => {
            setShopInitialTab('premium');
            setCurrentScreen('shop');
          }}
        />
      )}
      
      {currentScreen === 'shop' && userData && (
        <Shop 
          userData={userData}
          onBack={() => setCurrentScreen('main')}
          updateUserData={updateUserData}
          initialTab={shopInitialTab}
          setInitialTab={setShopInitialTab}
        />
      )}
      
      {currentScreen === 'clan' && userData && (
        <ClanSection 
          userData={userData}
          onBack={() => setCurrentScreen('main')}
          onNavigate={handleScreenChange}
        />
      )}
      
      {currentScreen === 'friends' && userData && (
        <FriendsSection 
          userData={userData}
          onBack={() => setCurrentScreen('main')}
          onChat={(friendId) => setCurrentScreen('chat')}
          onNavigate={handleScreenChange}
        />
      )}
      
      {currentScreen === 'chat' && userData && (
        <ChatSystem 
          userData={userData}
          onBack={() => setCurrentScreen('main')}
          onNavigate={handleScreenChange}
        />
      )}
      
      {currentScreen === 'checkin' && userData && (
        <CheckInCalendar 
          userData={userData}
          onClose={() => setCurrentScreen('main')}
          updateUserData={updateUserData}
        />
      )}
      
      {currentScreen === 'library' && userData && (
        <Library 
          userData={userData}
          onBack={() => setCurrentScreen('main')}
        />
      )}
      
      {currentScreen === 'settings' && userData && (
        <SettingsPage 
          userData={userData}
          onBack={() => setCurrentScreen('profile')}
          updateUserData={updateUserData}
        />
      )}
      
      {currentScreen === 'customize' && userData && (
        <CustomizePage 
          userData={userData}
          onBack={() => setCurrentScreen('profile')}
          updateUserData={updateUserData}
        />
      )}
    </div>
  );
}