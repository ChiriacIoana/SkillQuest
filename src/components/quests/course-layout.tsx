"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { GoBackButton } from "../common/ui/goback-button";


interface Quest {
  id: number;
  category?: string;
  title: string;
  description: string;
  xp: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completed?: boolean;
}

interface CourseLayoutProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
  progress: number;
  totalXP: number;
  quests: Quest[];
}

export const CourseLayout: React.FC<CourseLayoutProps> = ({
  title,
  icon,
  gradient,
  description,
  progress,
  totalXP,
  quests,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 md:px-12">
  <div
    className={`rounded-2xl p-8 mb-10 bg-gradient-to-r ${gradient} shadow-lg flex flex-col`}
  >
    <GoBackButton className="text-black mb-6 w-36 hover:text-black" />

    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div className="text-center md:text-left md:flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 flex items-center justify-center md:justify-start gap-3">
          {icon} {title}
        </h1>
        <p className="text-black/90 max-w-xl mx-auto md:mx-0">{description}</p>
      </div>

      <div className="mt-6 md:mt-0 w-full md:w-1/3 text-black">
        <div className="flex justify-between text-sm text-black mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden">
          <motion.div
            className="h-3 bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="mt-2 text-sm">{totalXP} XP Total</p>
      </div>
    </div>
  </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: quest.id * 0.05 }}
          >
            <Card
              className={`
                relative overflow-hidden bg-white dark:bg-gray-800
                rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
                hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
                transition-all duration-300 ease-out
              `}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {quest.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 min-h-[100px]">
                  {quest.description}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary">{quest.difficulty}</Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {quest.xp} XP
                  </span>
                </div>
                <Button
                  className="w-full"
                  variant={quest.completed ? "secondary" : "default"}
                  onClick={() => !quest.completed && router.push(`/${quest.category}/${quest.id}`)}
                >
                  {quest.completed ? "Completed ✅" : "Start Quest"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
