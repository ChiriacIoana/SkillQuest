'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/common/ui/card';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Trophy, Star, Zap } from 'lucide-react';

interface StatsPanelProps {
  name: string;
  level: number;
  completedQuests: number;
  currentXP: number;
  nextLevelXP: number;
  streak: number; 
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  name,
  level,
  completedQuests,
  currentXP,
  nextLevelXP,
  streak,
}) => {
  const xpPercent = Math.min(100, (currentXP / nextLevelXP) * 100);

  const levelMotion = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const completedMotion = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const streakMotion = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  const [levelDisplay, setLevelDisplay] = useState(0);
  const [completedDisplay, setCompletedDisplay] = useState(0);
  const [streakDisplay, setStreakDisplay] = useState(0);

  useEffect(() => {
    levelMotion.set(level);
    completedMotion.set(completedQuests);
    streakMotion.set(streak);

    const unsubLevel = levelMotion.onChange((v) => setLevelDisplay(Math.floor(v)));
    const unsubCompleted = completedMotion.onChange((v) => setCompletedDisplay(Math.floor(v)));
    const unsubStreak = streakMotion.onChange((v) => setStreakDisplay(Math.floor(v)));

    return () => {
      unsubLevel();
      unsubCompleted();
      unsubStreak();
    };
  }, [level, completedQuests, streak, levelMotion, completedMotion, streakMotion]);

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Welcome back, {name}! 👋
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
          <Star className="w-6 h-6 text-yellow-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Level</p>
            <p className="text-xl font-bold">{levelDisplay}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
          <Trophy className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Quests Completed</p>
            <p className="text-xl font-bold">{completedDisplay}</p>
          </div>
        </div>

        <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-purple-500" />
            <p className="text-sm text-gray-500 dark:text-gray-300">XP Progress</p>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-600 h-3 rounded-full overflow-hidden">
              <motion.div
                className="h-3 bg-gradient-to-r from-blue-400 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
              {currentXP} / {nextLevelXP} XP
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
          <Star className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Daily Streak</p>
            <p className="text-xl font-bold">{streakDisplay} 🔥</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
