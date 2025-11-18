import React, { useState, useEffect } from 'react';
import { X, Heart, Gem, Lightbulb, Timer } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { UserData } from '../App';
import quizQuestions from '../data/quizQuestions';

interface QuizGameProps {
  userData: UserData;
  worldId: number;
  onComplete: (gemsEarned: number, newLevel: number) => void;
  onExit: () => void;
  updateUserData: (updates: Partial<UserData>) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export function QuizGame({ userData, worldId, onComplete, onExit, updateUserData }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(userData.hearts);
  const [gemsEarned, setGemsEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const questions = quizQuestions[worldId] || quizQuestions[1];
  const question = questions[currentQuestion];

  const t = userData.language === 'en'
    ? {
        question: 'Question',
        of: 'of',
        timeLeft: 'Time Left',
        hint: 'Hint',
        check: 'Check Answer',
        continue: 'Continue',
        complete: 'Complete!',
        correct: 'Correct!',
        incorrect: 'Incorrect',
        explanation: 'Explanation',
        questionsCorrect: 'questions correct',
        gemsEarned: 'Gems earned',
        finish: 'Finish',
        noHearts: 'Out of Hearts',
        buyHearts: 'Buy more hearts to continue'
      }
    : {
        question: '问题',
        of: '/',
        timeLeft: '剩余时间',
        hint: '提示',
        check: '检查答案',
        continue: '继续',
        complete: '完成！',
        correct: '正确！',
        incorrect: '错误',
        explanation: '解释',
        questionsCorrect: '题正确',
        gemsEarned: '获得宝石',
        finish: '完成',
        noHearts: '生命值用尽',
        buyHearts: '购买更多生命值以继续'
      };

  useEffect(() => {
    if (!showAnswer && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showAnswer) {
      handleAnswer(selectedAnswer ?? -1);
    }
  }, [timeLeft, showAnswer]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || showAnswer) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowAnswer(true);

    if (correct) {
      const gems = usedHint ? 5 : 10;
      setGemsEarned(gemsEarned + gems);
      setCorrectCount(correctCount + 1);
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      updateUserData({ hearts: newHearts });
    }
  };

  const handleContinue = () => {
    if (hearts <= 0) {
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setIsCorrect(false);
      setUsedHint(false);
      setTimeLeft(30);
    } else {
      // Quiz completed
      const newLevel = userData.level + Math.floor(gemsEarned / 50);
      updateUserData({ 
        gems: userData.gems + gemsEarned,
        level: newLevel,
        completedWorlds: [...userData.completedWorlds, worldId],
        unlockedWorlds: [...userData.unlockedWorlds, worldId + 1]
      });
      onComplete(gemsEarned, newLevel);
    }
  };

  const handleUseHint = () => {
    if (userData.gems >= 10 && !usedHint) {
      setUsedHint(true);
      updateUserData({ gems: userData.gems - 10 });
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showAnswer) {
      return selectedAnswer === index
        ? 'bg-mint-100 dark:bg-mint-900 border-mint-500'
        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600';
    }

    // After answer is revealed
    if (index === question.correctAnswer) {
      return 'bg-green-100 dark:bg-green-900 border-green-500';
    }
    if (index === selectedAnswer) {
      return 'bg-red-100 dark:bg-red-900 border-red-500';
    }
    return 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600';
  };

  if (hearts <= 0) {
    return (
      <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <Card className="p-8 text-center bg-white dark:bg-gray-800">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-gray-800 dark:text-gray-100 mb-2">{t.noHearts}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t.buyHearts}</p>
          <div className="flex gap-3">
            <Button onClick={onExit} variant="outline" className="flex-1">
              {t.finish}
            </Button>
            <Button 
              onClick={() => {
                if (userData.gems >= 50) {
                  setHearts(5);
                  updateUserData({ hearts: 5, gems: userData.gems - 50 });
                }
              }}
              className="flex-1 bg-mint-500 hover:bg-mint-600 text-white"
            >
              <Gem className="w-4 h-4 mr-2" />
              50
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <Button onClick={onExit} variant="ghost" size="sm">
          <X className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(userData.maxHearts)].map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${
                  i < hearts
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-mint-600">
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {t.question} {currentQuestion + 1} {t.of} {questions.length}
          </span>
          <span className="text-mint-600 dark:text-mint-400 text-sm">
            <Gem className="w-4 h-4 inline mr-1" />
            {gemsEarned}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-mint-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-4 flex-1">
        <Card className="p-6 mb-6 bg-white dark:bg-gray-800">
          <h3 className="text-gray-800 dark:text-gray-100 mb-4">{question.question}</h3>
          
          {usedHint && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                💡 {question.explanation}
              </p>
            </div>
          )}
        </Card>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showAnswer && handleAnswer(index)}
              disabled={showAnswer}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${getOptionStyle(index)}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-mint-100 dark:bg-mint-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-mint-600 dark:text-mint-400">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <span className="text-gray-800 dark:text-gray-100">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {!showAnswer && !usedHint && (
          <Button
            onClick={handleUseHint}
            disabled={userData.gems < 10}
            variant="outline"
            className="w-full mb-4"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {t.hint} (10 <Gem className="w-3 h-3 inline" />)
          </Button>
        )}

        {showAnswer && (
          <Card className={`p-4 mb-4 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
            <h4 className={`mb-2 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {isCorrect ? t.correct : t.incorrect}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{t.explanation}:</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{question.explanation}</p>
          </Card>
        )}

        {showAnswer && (
          <Button
            onClick={handleContinue}
            className="w-full bg-mint-500 hover:bg-mint-600 text-white"
          >
            {currentQuestion < questions.length - 1 ? t.continue : t.finish}
          </Button>
        )}
      </div>
    </div>
  );
}