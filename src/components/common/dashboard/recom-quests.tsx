'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/common/ui/tooltip';

interface Quest {
  id: number;
  title: string;
  xp: number;
  description?: string;
}

const quests: Quest[] = [
  { id: 1, title: 'Learn TypeScript Basics', xp: 20, description: 'Intro to TS syntax and types' },
  { id: 2, title: 'JavaScript Loops Challenge', xp: 15, description: 'Master loops and iterations' },
  { id: 3, title: 'Effective Communication Tips', xp: 10, description: 'Improve your communication skills' },
  { id: 4, title: 'React State Mastery', xp: 25, description: 'Learn useState and useEffect deeply' },
  { id: 5, title: 'CSS Grid Layout', xp: 15, description: 'Build complex layouts easily' },
];

export const RecommendedQuests: React.FC = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle>Recommended Quests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
          {quests.map((quest) => (
            <motion.div
              key={quest.id}
              className="min-w-[220px] bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex flex-col justify-between hover:scale-105 transition-transform shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: quest.id * 0.1 }}
            >
              <div title={quest.description || ''} aria-label={quest.description || ''}>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{quest.title}</p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-300">{quest.xp} XP</p>
                <Button className="px-3 py-1 text-sm">Start</Button>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-400 to-purple-600"
                  style={{ width: `${(quest.xp / 30) * 100}%` }} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
