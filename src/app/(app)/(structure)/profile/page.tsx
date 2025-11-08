"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/common/ui/card";
import { StarsBackground } from "@/components/common/ui/stars";
import { useUser } from "@/api/users";
import { ArrowBigUpDash, SquareCode, LogOut, User, Zap } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const [userId, setUserId] = useState<number | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const stored = localStorage.getItem('userId');
    return stored ? parseInt(stored, 10) : undefined;
  });

  useEffect(() => {
    const onLogin = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail?.userId) setUserId(Number(detail.userId));
      else {
        const stored = localStorage.getItem('userId');
        if (stored) setUserId(parseInt(stored, 10));
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'userId' && e.newValue) setUserId(parseInt(e.newValue, 10));
    };

    window.addEventListener('skillquest:login', onLogin as EventListener);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('skillquest:login', onLogin as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const { data: user, isLoading, error } = useUser(userId);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  if (isLoading) return <div className="p-8">Loading profile...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading profile: {error.message}</div>;
  if (!user) return <div className="p-8">No user found. Please log in.</div>;

  const xpProgress = Math.min((user.currentXP / user.nextLevelXP) * 100, 100);

  return (
    <div
      className="relative min-h-screen w-full text-gray-900 dark:text-gray-100 
                 bg-gradient-to-br from-indigo-100 via-purple-200 to-blue-300 
                 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 overflow-hidden"
    >
    <StarsBackground />

      <div className="relative z-10 max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <User size={36} className="text-white" />
          Profile
        </h1>

        <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              {user.username}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <ArrowBigUpDash className="text-purple-400" /> <span>Level {user.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <SquareCode className="text-white" /> <span>{user.completedQuests} Quests</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-blue-500" /> <span>Streak: {user.streak} </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>XP Progress</span>
                <span>{user.currentXP}/{user.nextLevelXP} XP</span>
              </div>
              <div className="w-full bg-gray-300/40 dark:bg-gray-700/40 h-4 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transition-all duration-700"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                onClick={handleLogout}
                className="hover:bg-gray-400"
              >
                <LogOut size={18} /> Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
