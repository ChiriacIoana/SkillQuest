'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/common/ui/tooltip';
import { useRouter } from 'next/navigation';

interface Quest {
  id: number;
  title: string;
  xp: number;
  description?: string;
  href?: string;
}

const quests: Quest[] = [
  { id: 1, title: 'Next.js', xp: 20, description: 'Learn the basics of Next.js', href: '/Next.js' },
  { id: 2, title: 'NodeJs', xp: 15, description: 'Dive into server-side development with Node.js', href: '/NodeJs' },
  { id: 3, title: 'React', xp: 10, description: 'Understand the basics of React', href: '/React' },
  { id: 4, title: 'HTML', xp: 25, description: 'Learn the fundamentals of HTML', href: '/HTML' },
  { id: 5, title: 'Coming Soon', xp: 15, description: 'Stay tuned for upcoming quests!', href: '/coming-soon' },
];

export const RecommendedQuests: React.FC = () => {
  const Router = useRouter();
  
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
                <Button className="px-3 py-1 text-sm" onClick={() => quest.href && Router.push(quest.href)}>Start</Button>
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
