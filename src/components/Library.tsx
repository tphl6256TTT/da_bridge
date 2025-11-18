import React, { useState } from 'react';
import { ChevronLeft, Book, Lock, Star, ShoppingBag, Gem } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { UserData } from '../App';

interface LibraryProps {
  userData: UserData;
  onBack: () => void;
}

const books = [
  {
    id: 1,
    title: 'Bridge Basics 1: An Introduction',
    author: 'Audrey Grant',
    level: 'Beginner',
    type: 'free',
    description: 'Learn the fundamentals of bridge bidding and play',
    image: '📘',
    chapters: 12
  },
  {
    id: 2,
    title: 'Standard Bidding with SAYC',
    author: 'Audrey Grant',
    level: 'Beginner',
    type: 'free',
    description: 'Master the Standard American Yellow Card system',
    image: '📗',
    chapters: 15
  },
  {
    id: 3,
    title: 'Bridge Basics 2: Competitive Bidding',
    author: 'Audrey Grant',
    level: 'Intermediate',
    type: 'gems',
    price: 500,
    description: 'Understand overcalls, takeout doubles, and more',
    image: '📙',
    chapters: 14
  },
  {
    id: 4,
    title: 'Play of the Hand',
    author: 'Louis Watson',
    level: 'Intermediate',
    type: 'hkd',
    price: 48,
    description: 'Classic text on card play techniques',
    image: '📕',
    chapters: 20
  },
  {
    id: 5,
    title: 'Defense in Bridge',
    author: 'Mike Lawrence',
    level: 'Intermediate',
    type: 'gems',
    price: 750,
    description: 'Master defensive card play and signaling',
    image: '📘',
    chapters: 18
  },
  {
    id: 6,
    title: 'Advanced Bridge Techniques',
    author: 'Hugh Kelsey',
    level: 'Advanced',
    type: 'hkd',
    price: 78,
    description: 'Squeeze plays, endplays, and advanced tactics',
    image: '📗',
    chapters: 22
  },
  {
    id: 7,
    title: 'The Rodwell Files',
    author: 'Eric Rodwell',
    level: 'Advanced',
    type: 'hkd',
    price: 98,
    description: 'Modern bidding theory from a world champion',
    image: '📙',
    chapters: 25
  },
  {
    id: 8,
    title: 'Opening Leads',
    author: 'Robert Ewen',
    level: 'Beginner',
    type: 'gems',
    price: 350,
    description: 'Choose the right opening lead every time',
    image: '📕',
    chapters: 10
  },
  {
    id: 9,
    title: '25 Bridge Conventions',
    author: 'Barbara Seagram',
    level: 'Intermediate',
    type: 'gems',
    price: 600,
    description: 'Popular conventions explained simply',
    image: '📘',
    chapters: 25
  },
  {
    id: 10,
    title: 'Winning Declarer Play',
    author: 'Dorothy Hayden Truscott',
    level: 'Advanced',
    type: 'hkd',
    price: 88,
    description: 'Plan the play and execute perfectly',
    image: '📗',
    chapters: 19
  },
  {
    id: 11,
    title: 'Bridge: 25 Steps to Learning 2/1',
    author: 'Paul Thurston',
    level: 'Intermediate',
    type: 'hkd',
    price: 68,
    description: 'Master the Two-Over-One bidding system',
    image: '📙',
    chapters: 25
  },
  {
    id: 12,
    title: 'The Finesse: Only a Last Resort',
    author: 'David Bird',
    level: 'Intermediate',
    type: 'gems',
    price: 450,
    description: 'Better alternatives to the simple finesse',
    image: '📕',
    chapters: 12
  },
  {
    id: 13,
    title: 'Counting at Bridge',
    author: 'Mike Lawrence',
    level: 'Advanced',
    type: 'hkd',
    price: 78,
    description: 'Count your way to better results',
    image: '📘',
    chapters: 16
  },
  {
    id: 14,
    title: 'Modern Losing Trick Count',
    author: 'Ron Klinger',
    level: 'Advanced',
    type: 'gems',
    price: 850,
    description: 'Updated approach to hand evaluation',
    image: '📗',
    chapters: 14
  },
  {
    id: 15,
    title: 'Card Combinations',
    author: 'Victor Mollo',
    level: 'Intermediate',
    type: 'gems',
    price: 550,
    description: 'Maximize your tricks from any holding',
    image: '📙',
    chapters: 15
  },
  {
    id: 16,
    title: 'The Blue Club',
    author: 'Benito Garozzo',
    level: 'Advanced',
    type: 'hkd',
    price: 128,
    description: 'The famous Italian strong club system',
    image: '📕',
    chapters: 28
  },
  {
    id: 17,
    title: 'Slam Bidding',
    author: 'Ron Klinger',
    level: 'Advanced',
    type: 'hkd',
    price: 88,
    description: 'Reach good slams and avoid bad ones',
    image: '📘',
    chapters: 17
  },
  {
    id: 18,
    title: 'Thinking About Imps',
    author: 'David Bird',
    level: 'Advanced',
    type: 'gems',
    price: 900,
    description: 'Strategy for team games',
    image: '📗',
    chapters: 20
  },
];

export function Library({ userData, onBack }: LibraryProps) {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');

  const t = userData.language === 'en'
    ? {
        library: 'Library',
        all: 'All',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        chapters: 'chapters',
        free: 'Free',
        unlock: 'Unlock',
        gems: 'gems',
        purchase: 'Purchase',
        read: 'Read'
      }
    : {
        library: '图书馆',
        all: '全部',
        beginner: '初级',
        intermediate: '中级',
        advanced: '高级',
        chapters: '章节',
        free: '免费',
        unlock: '解锁',
        gems: '宝石',
        purchase: '购买',
        read: '阅读'
      };

  const filteredBooks = selectedLevel === 'all' 
    ? books 
    : books.filter(book => book.level === selectedLevel);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'Advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-gray-800 dark:text-gray-100">{t.library}</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          <Button
            size="sm"
            variant={selectedLevel === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedLevel('all')}
            className={selectedLevel === 'all' ? 'bg-mint-500 text-white' : ''}
          >
            {t.all}
          </Button>
          <Button
            size="sm"
            variant={selectedLevel === 'Beginner' ? 'default' : 'outline'}
            onClick={() => setSelectedLevel('Beginner')}
            className={selectedLevel === 'Beginner' ? 'bg-mint-500 text-white' : ''}
          >
            {t.beginner}
          </Button>
          <Button
            size="sm"
            variant={selectedLevel === 'Intermediate' ? 'default' : 'outline'}
            onClick={() => setSelectedLevel('Intermediate')}
            className={selectedLevel === 'Intermediate' ? 'bg-mint-500 text-white' : ''}
          >
            {t.intermediate}
          </Button>
          <Button
            size="sm"
            variant={selectedLevel === 'Advanced' ? 'default' : 'outline'}
            onClick={() => setSelectedLevel('Advanced')}
            className={selectedLevel === 'Advanced' ? 'bg-mint-500 text-white' : ''}
          >
            {t.advanced}
          </Button>
        </div>
      </div>

      {/* Scrollable Book List */}
      <div className="px-6 py-4 space-y-4 overflow-y-auto pb-32">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="p-4 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex gap-4">
              {/* Book Icon */}
              <div className="w-20 h-28 bg-gradient-to-br from-mint-100 to-mint-200 dark:from-mint-900 dark:to-mint-800 rounded-lg flex items-center justify-center text-5xl flex-shrink-0">
                {book.image}
              </div>

              {/* Book Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-gray-800 dark:text-gray-100 text-sm mb-1">{book.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
                  </div>
                </div>

                <Badge className={`${getLevelColor(book.level)} text-xs mb-2`}>
                  {book.level}
                </Badge>

                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {book.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {book.chapters} {t.chapters}
                  </span>

                  {book.type === 'free' ? (
                    <Button size="sm" className="bg-mint-500 hover:bg-mint-600 text-white text-xs h-8 px-4">
                      {t.read}
                    </Button>
                  ) : book.type === 'gems' ? (
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white text-xs h-8 px-4 gap-1">
                      <Star className="w-3 h-3" />
                      {book.price}
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 px-4 gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      ${book.price}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}