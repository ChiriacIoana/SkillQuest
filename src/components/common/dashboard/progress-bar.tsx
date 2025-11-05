'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/common/ui/tooltip';

interface ProgressBarProps {
  current: number; // current XP
  max: number;     // XP for next level
  questsCompleted?: { name: string; xp: number }[]; // optional detailed quests
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  questsCompleted = [],
}) => {
  const percent = Math.min(100, (current / max) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>0 XP</span>
        <span>{current} / {max} XP</span>
      </div>

      <div className="w-full overflow-x-auto py-2">
        <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full">
          <motion.div
            className="h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {questsCompleted.map((q, index) => {
            const markerPercent = (q.xp / max) * 100;
            return (
              <div
                key={index}
                title={`${q.name}: ${q.xp} XP`}
                className="absolute top-0 h-6 w-1 bg-white dark:bg-gray-300 rounded-sm"
                style={{ left: `${markerPercent}%` }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>Level 1</span>
        <span>Level 2</span>
        <span>Level 3</span>
      </div>
    </div>
  );
};
