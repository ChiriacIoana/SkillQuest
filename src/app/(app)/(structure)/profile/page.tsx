"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/common/ui/card";
import { StarsBackground } from "@/components/common/ui/stars";
import { useUser } from "@/api/users";
import {
  ArrowBigUpDash,
  SquareCode,
  LogOut,
  User,
  Zap,
  WandSparkles,
} from "lucide-react";

import { getUserType, UserType } from "@/api/coderType";

export default function ProfilePage() {
  const router = useRouter();

  //user id state
  const [userId, setUserId] = useState<number | null>(null);

  //coder type state
  const [userType, setUserType] = useState<UserType | null>(null);
  const [typeLoading, setTypeLoading] = useState(false);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [thinkingText, setThinkingText] = useState<string | null>(null);

  const THINKING_MESSAGES = [
  'Thinking...',
  'Analyzing your activity...',
  'Reviewing completed quests...',
  'Calculating XP patterns...',
  'Determining your coder type...',
];
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("userId");
    if (stored) setUserId(Number(stored));

    const onLogin = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail?.userId) {
        setUserId(Number(detail.userId));
      }
    };

    window.addEventListener("skillquest:login", onLogin as EventListener);
    return () =>
      window.removeEventListener("skillquest:login", onLogin as EventListener);
  }, []);


  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUser(userId ?? undefined);

  const fetchUserType = async () => {
    if (!userId) return;

    setThinkingText(THINKING_MESSAGES[0]);
      let index = 0;

       const interval = setInterval(() => {
      index++;
      if (index < THINKING_MESSAGES.length) {
      setThinkingText(THINKING_MESSAGES[index]);
      } else {
        index = 0;
      }
  }, 1000);

    try {
      setTypeLoading(true);
      setTypeError(null);
      
       const [result] = await Promise.all([
      getUserType(userId),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
      clearInterval(interval);
      setThinkingText(null);
      setUserType(result);
    } catch (err: any) {
      setTypeError(err.message || "Failed to determine coder type");
    } finally {
      setTypeLoading(false);
    }
  };

 
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  
  if (userLoading)
    return <div className="p-8 text-center">Loading profile...</div>;

  if (userError)
    return (
      <div className="p-8 text-center text-red-500">
        Error loading profile
      </div>
    );

  if (!user)
    return (
      <div className="p-8 text-center">
        No user found. Please log in.
      </div>
    );

  const xpProgress = Math.min(
    (user.currentXP / user.nextLevelXP) * 100,
    100
  );

 
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      <StarsBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <User className="text-white" /> Profile
        </h1>

        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {user.username}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center gap-6">
              <span className="flex items-center gap-2">
                <ArrowBigUpDash className="text-purple-500" />
                Level {user.level}
              </span>
              <span className="flex items-center gap-2">
                <SquareCode />
                {user.completedQuests} Quests
              </span>
              <span className="flex items-center gap-2">
                <Zap className="text-blue-500" />
                Streak {user.streak}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>XP Progress</span>
                <span>
                  {user.currentXP}/{user.nextLevelXP}
                </span>
              </div>
              <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2" /> Log out
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            onClick={fetchUserType}
            disabled={typeLoading}
            className="px-8 py-6 text-xl"
          >
            <WandSparkles className="mr-3" />
            {typeLoading ? thinkingText ?? "Thinking..." : "Find your coder type"}
          </Button>
        </div>


        {userType && (
          <div className="mt-8 p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 border">
            <h2 className="text-2xl font-bold mb-2">
              {userType.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {userType.description}
            </p>
          </div>
        )}

        {typeError && (
          <p className="text-red-500 mt-4 text-center">
            {typeError}
          </p>
        )}
      </div>
    </div>
  );
}
