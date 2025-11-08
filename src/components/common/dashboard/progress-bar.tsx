'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/common/ui/tooltip';

interface ProgressBarProps {
  current: number;
  max: number;     
  questsCompleted?: { name: string; xp: number }[]; // optional 
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
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
      </div>
    </div>
  );
};
