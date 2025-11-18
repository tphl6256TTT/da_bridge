import React, { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { Globe, Mail } from 'lucide-react';
import type { UserData, Language } from '../App';

interface OnboardingFlowProps {
  onComplete: (userData: UserData) => void;
  isFirstLaunch: boolean;
}

export function OnboardingFlow({ onComplete, isFirstLaunch }: OnboardingFlowProps) {
  const [step, setStep] = useState(isFirstLaunch ? 'loading' : 'loading');
  const [language, setLanguage] = useState<Language>('en');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isOver18, setIsOver18] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  // Simulate loading
  React.useEffect(() => {
    if (step === 'loading') {
      setTimeout(() => {
        setStep(isFirstLaunch ? 'language' : 'complete');
      }, 2000);
    }
  }, [step, isFirstLaunch]);

  const skillQuestions = [
    {
      question: language === 'en' 
        ? "How familiar are you with bridge?" 
        : "你对桥牌有多熟悉？",
      options: language === 'en'
        ? ["Never played", "Beginner", "Intermediate", "Advanced"]
        : ["从未玩过", "初学者", "中级", "高级"]
    },
    {
      question: language === 'en'
        ? "Do you know how bidding works?"
        : "你知道叫牌如何进行吗？",
      options: language === 'en'
        ? ["No", "Basic understanding", "Yes, very well"]
        : ["不知道", "基本了解", "非常了解"]
    },
    {
      question: language === 'en'
        ? "Have you played card games before?"
        : "你以前玩过纸牌游戏吗？",
      options: language === 'en'
        ? ["No", "Occasionally", "Frequently"]
        : ["没有", "偶尔", "经常"]
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);
    
    if (newAnswers.length === skillQuestions.length) {
      setTimeout(() => setStep('account'), 500);
    }
  };

  const calculateStartingLevel = () => {
    const avgScore = quizAnswers.reduce((a, b) => a + b, 0) / quizAnswers.length;
    if (avgScore < 1) return [1]; // World 1 only
    if (avgScore < 2) return [1, 2]; // Worlds 1 and 2
    return [1, 2, 3]; // Worlds 1, 2, and 3
  };

  const handleAccountCreation = (method: string) => {
    const unlockedWorlds = calculateStartingLevel();
    const newUser: UserData = {
      id: `user_${Date.now()}`,
      name: 'Bridge Player',
      email: 'player@example.com',
      level: 1,
      trophies: 0,
      loginStreak: 1,
      gems: 50, // Starting gems
      hearts: 5,
      maxHearts: 5,
      unlockedWorlds,
      completedWorlds: [],
      isPremium: false,
      language,
      theme: 'light', // Always default to light theme
      answerStreak: 0,
      friendIds: []
    };
    
    onComplete(newUser);
  };

  if (step === 'loading') {
    return (
      <div className="mobile-container flex items-center justify-center min-h-screen bg-gradient-to-b from-mint-400 to-mint-600">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-5xl">🃏</span>
            </div>
          </div>
          <h1 className="text-white mb-4">Bridge Master</h1>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'language') {
    return (
      <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-400 to-mint-600 p-8 flex flex-col items-center justify-center">
        <Globe className="w-16 h-16 text-white mb-8" />
        <h2 className="text-white text-center mb-12">Select Your Language<br/>选择您的语言</h2>
        <div className="w-full max-w-sm space-y-4">
          <Button 
            onClick={() => {
              setLanguage('en');
              setStep('terms');
            }}
            className="w-full h-16 bg-white text-mint-600"
          >
            English
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setLanguage('zh');
              setStep('terms');
            }}
            className="w-full h-16 bg-white text-mint-600"
          >
            中文
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'terms') {
    return (
      <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-mint-700 dark:text-mint-300 mb-6">
            {language === 'en' ? 'Terms & Privacy' : '条款与隐私'}
          </h2>
          
          <Card className="p-6 mb-6 bg-white dark:bg-gray-800">
            <h3 className="text-mint-600 dark:text-mint-400 mb-4">
              {language === 'en' ? 'Terms of Service' : '服务条款'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'By using Bridge Master, you agree to our terms of service...'
                : '使用 Bridge Master，即表示您同意我们的服务条款...'}
            </p>
          </Card>

          <Card className="p-6 mb-6 bg-white dark:bg-gray-800">
            <h3 className="text-mint-600 dark:text-mint-400 mb-4">
              {language === 'en' ? 'Privacy Policy' : '隐私政策'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'We respect your privacy and protect your personal data...'
                : '我们尊重您的隐私并保护您的个人数据...'}
            </p>
          </Card>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                {language === 'en' 
                  ? 'I agree to the Terms of Service and Privacy Policy'
                  : '我同意服务条款和隐私政策'}
              </label>
            </div>
            
            <div className="flex items-start gap-3">
              <Checkbox 
                id="age" 
                checked={isOver18}
                onCheckedChange={(checked) => setIsOver18(checked as boolean)}
              />
              <label htmlFor="age" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                {language === 'en' 
                  ? 'I confirm that I am 18 years or older'
                  : '我确认我已年满18岁'}
              </label>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => setStep('quiz')}
          disabled={!agreedToTerms || !isOver18}
          className="w-full bg-mint-500 hover:bg-mint-600 text-white disabled:opacity-50"
        >
          {language === 'en' ? 'Continue' : '继续'}
        </Button>
      </div>
    );
  }

  if (step === 'quiz') {
    const currentQuestion = skillQuestions[quizAnswers.length];
    
    // Safety check: if no current question, show loading
    if (!currentQuestion) {
      return (
        <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="flex gap-2 justify-center">
              <div className="w-2 h-2 bg-mint-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-mint-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-mint-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col">
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            {skillQuestions.map((_, idx) => (
              <div 
                key={idx}
                className={`flex-1 h-2 rounded-full ${
                  idx < quizAnswers.length 
                    ? 'bg-mint-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-mint-600 dark:text-mint-400">
            {language === 'en' ? 'Skill Assessment' : '技能评估'} {quizAnswers.length + 1}/{skillQuestions.length}
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-gray-800 dark:text-gray-100 mb-8 text-center">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <Button
                key={idx}
                onClick={() => handleQuizAnswer(idx)}
                className="w-full h-16 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-mint-100 dark:hover:bg-gray-600 border-2 border-mint-300"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'account') {
    return (
      <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col justify-center">
        <h2 className="text-gray-800 dark:text-gray-100 text-center mb-4">
          {language === 'en' ? 'Create Your Account' : '创建您的账户'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          {language === 'en' 
            ? 'Sign up to save your progress across devices'
            : '注册以在设备间同步您的进度'}
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => handleAccountCreation('google')}
            className="w-full h-14 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-50 border-2 border-gray-300 dark:border-gray-600"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {language === 'en' ? 'Continue with Google' : '使用 Google 继续'}
          </Button>

          <Button
            onClick={() => handleAccountCreation('apple')}
            className="w-full h-14 bg-black text-white hover:bg-gray-900"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            {language === 'en' ? 'Continue with Apple' : '使用 Apple 继续'}
          </Button>

          <Button
            onClick={() => handleAccountCreation('email')}
            className="w-full h-14 bg-mint-500 hover:bg-mint-600 text-white"
          >
            <Mail className="w-5 h-5 mr-3" />
            {language === 'en' ? 'Continue with Email' : '使用电子邮件继续'}
          </Button>
        </div>

        <Button
          onClick={() => handleAccountCreation('skip')}
          className="w-full mt-6 bg-transparent hover:bg-mint-100 dark:hover:bg-gray-700 text-mint-600 dark:text-mint-400"
        >
          {language === 'en' ? 'Skip for now' : '暂时跳过'}
        </Button>
      </div>
    );
  }

  return null;
}