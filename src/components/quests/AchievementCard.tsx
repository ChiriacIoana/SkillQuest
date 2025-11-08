// components/achievements/AchievementCard.tsx
"use client";

import React from "react";
import { Sparkles, Lock } from "lucide-react";
import { rarityColors } from "@/components/common/ui/rarityColors";
import { AchievementProgress } from "./AchievementProgress";

type AchievementProp = {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode | string;
  rarity?: string;
  unlocked?: boolean;
  unlockedAt?: string | Date | null;
  progress?: string | null;
};

type Props = {
  achievement: AchievementProp;
  index?: number;
};

export function AchievementCard({ achievement, index = 0 }: Props) {
  const rarity =
    rarityColors[(achievement.rarity as keyof typeof rarityColors) ?? "common"];

  return (
    <div
      className={
        "relative group transition-all duration-300 hover:scale-105 h-full " +
        (achievement.unlocked ? "" : "opacity-75")
      }
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={
          "absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 " +
          (achievement.unlocked
            ? `${rarity.glow} opacity-0 group-hover:opacity-100`
            : "opacity-0")
        }
      ></div>
      <div
        className={
          "relative rounded-2xl border-2 " +
          rarity.border +
          " bg-gradient-to-br " +
          rarity.bg +
          " overflow-hidden " +
          (achievement.unlocked ? "shine-effect" : "") +
          " h-full flex flex-col justify-between"
        }
      >
        {!achievement.unlocked && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <Lock className="w-12 h-12 text-slate-500" />
          </div>
        )}

        <div className="absolute top-3 right-3 z-20">
          <div
            className={
              "px-3 py-1 rounded-full text-xs font-bold uppercase " +
              rarity.text +
              " bg-slate-900/70 backdrop-blur-sm"
            }
          >
            {achievement.rarity}
          </div>
        </div>

        <div className="p-6 relative z-5 flex-1 flex flex-col justify-between">
          <div>
            <div
              className={
                "text-6xl mb-4 " +
                (achievement.unlocked ? "float-animation" : "")
              }
            >
              {achievement.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {achievement.name}
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              {achievement.description}
            </p>
          </div>

          <div>
            {achievement.unlocked && achievement.unlockedAt ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>
                  Unlocked{" "}
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              </div>
            ) : achievement.progress ? (
              <AchievementProgress progress={achievement.progress} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
