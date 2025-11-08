"use client";

import { BicepsFlexed } from 'lucide-react';

type Props = {
  progress: string; 
};

export function AchievementProgress({ progress }: Props) {
  const [current, total] = progress.split("/").map(Number);
  const percent = total ? (current / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Progress</span>
        <span className="text-white font-semibold">{progress}</span>
      </div>

      <div className="w-full h-2 bg-slate-900/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

type HeaderProps = {
  unlockedCount: number;
  totalCount: number;
  title?: string;
};

export function AchievementsHeader({ unlockedCount, totalCount, title = 'Achievements' }: HeaderProps) {
  const percent = totalCount ? Math.round((unlockedCount / totalCount) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <BicepsFlexed className="w-12 h-12 text-white" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-grey-800 to-blue-400 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border-2 border-purple-500/30">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-300 font-semibold">Overall Progress</span>
          <span className="text-2xl font-bold text-purple-400">{unlockedCount}/{totalCount}</span>
        </div>
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 transition-all duration-500 relative"
            style={{ width: `${percent}%` }}
          >
            <div className="absolute inset-0 bg-white/30 shine-effect" />
          </div>
        </div>
        <p className="text-slate-400 text-sm mt-2">{percent}% Complete</p>
      </div>
    </div>
  );
}
