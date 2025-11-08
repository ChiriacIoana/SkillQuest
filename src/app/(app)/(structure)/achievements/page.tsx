"use client";

import { useEffect, useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { AchievementsHeader } from "@/components/quests/AchievementProgress";
import { AchievementFilters } from "@/components/common/ui/achievement-filter";
import { AchievementCard } from "@/components/quests/AchievementCard";
import { useQuery } from "@tanstack/react-query";
import {
  getAllAchievements,
  getUserAchievements,
  Achievement as AchievementType,
  UserAchievement,
} from "@/api/achievements";
import { useUser } from "@/api/users";
import { rarityColors } from "@/components/common/ui/rarityColors";

type Rarity = "common" | "rare" | "epic" | "legendary";

type AchievementView = AchievementType & {
  unlocked?: boolean;
  unlockedAt?: string | null;
  progress?: string | null;
  rarityName: string;
  rarityObj: {
    border: string;
    glow: string;
    bg: string;
    text: string;
  };
};

export default function AchievementsDisplay() {
  const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState<number | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    const s = localStorage.getItem("userId");
    return s ? parseInt(s, 10) : undefined;
  });

  useEffect(() => {
    const onLogin = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail?.userId) setUserId(Number(detail.userId));
      else {
        const s = localStorage.getItem("userId");
        if (s) setUserId(parseInt(s, 10));
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === "userId" && e.newValue) setUserId(parseInt(e.newValue, 10));
    };
    window.addEventListener("skillquest:login", onLogin as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("skillquest:login", onLogin as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const { data: allAchievements, isLoading: loadingAll } = useQuery({
    queryKey: ["achievements", "all"],
    queryFn: getAllAchievements,
  });

  const { data: userAchievements, isLoading: loadingUser } = useQuery<
    UserAchievement[],
    Error
  >({
    queryKey: userId
      ? ["achievements", "user", userId]
      : ["achievements", "user", "none"],
    queryFn: () =>
      userId
        ? getUserAchievements(userId)
        : Promise.resolve([] as UserAchievement[]),
    enabled: !!userId,
  });

  const { data: user } = useUser(userId);
  const defaultAchievementId = 100;

  const merged = useMemo(() => {
    const ua = userAchievements || [];
    const unlockedMap = new Map<number, UserAchievement>();
    ua.forEach((u) => {
      const maybeId =
        (u as any).achievementId ?? (u as any).achievement?.id ?? null;
      if (maybeId != null) unlockedMap.set(Number(maybeId), u);
    });

    const all = allAchievements || [];
    return all.map((a) => {
      const isDefaultUnlocked = a.id === defaultAchievementId;
      const uaRec = unlockedMap.get(a.id);

      let progress: string | null = null;
      if (!uaRec && user) {
        if (
          (a as any).questsRequired != null &&
          typeof user.completedQuests === "number"
        ) {
          progress = `${Math.min(
            user.completedQuests,
            (a as any).questsRequired
          )}/${(a as any).questsRequired}`;
        } else if (
          (a as any).xpRequired != null &&
          typeof user.currentXP === "number"
        ) {
          progress = `${Math.min(user.currentXP, (a as any).xpRequired)}/${
            (a as any).xpRequired
          }`;
        }
      }

      const unlockedAt =
        uaRec?.unlockedAt != null
          ? typeof uaRec.unlockedAt === "string"
            ? uaRec.unlockedAt
            : (uaRec.unlockedAt as Date).toISOString()
          : null;

      const rarityKey = (a.rarity as Rarity) ?? "common";
      const rarityObj = rarityColors[rarityKey];

      return {
        ...a,
        unlocked: !!uaRec || isDefaultUnlocked,
        unlockedAt,
        progress,
        rarityName: a.rarity,
        rarityObj,
      } as AchievementView;
    });
  }, [allAchievements, userAchievements, user]);

  const filteredAchievements = merged.filter((a) => {
    if (filter === "all") return true;
    if (filter === "unlocked") return a.unlocked;
    if (filter === "locked") return !a.unlocked;
    return true;
  });

  const unlockedCount = merged.filter((a) => a.unlocked).length;
  const totalCount = merged.length;
  const loading = loadingAll || loadingUser;

  if (loading) return <div className="p-8">Loading achievements...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        .shine-effect::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shine 3s infinite;
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <AchievementsHeader
          unlockedCount={unlockedCount}
          totalCount={totalCount}
        />

        <AchievementFilters filter={filter} setFilter={setFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredAchievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement as any}
              index={index}
            />
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-16">
            <Lock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No achievements found</p>
          </div>
        )}
      </div>
    </div>
  );
}
