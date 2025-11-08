"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/common/ui/card";
import { Button } from "@/components/common/ui/button";
import { Badge } from "@/components/common/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

interface QuestTrack {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  xprange: string;
  color: string;
  href: string;
}

const questTracks: QuestTrack[] = [
  {
    id: "next",
    title: "Next.js Journey",
    description: "Master the Next.js framework to build powerful server-side rendered React applications.",
    difficulty: "Intermediate",
    xprange: "50-200 XP",
    color: "from-yellow-400 to-orange-500",
    href: "/Next.js",
  },
  {
  id: "node",
  title: "Node.js Mastery",
  description: "Learn how to build fast, scalable server-side applications using Node.js and Express.",
  difficulty: "Advanced",
  xprange: "100-300 XP",
  color: "from-pink-400 to-red-500",
  href: "/NodeJs",
},

   {
    id: "react",
    title: "React Development",
    description: "Build dynamic web applications using React and component-based architecture.",
    difficulty: "Beginner",
    xprange: "250-400 XP",
    color: "from-green-400 to-emerald-500",
    href: "/React",
  },
  {
    id: "html",
    title: "HTML Essentials",
    description: "Learn the fundamentals of HTML and structure web pages effectively.",
    difficulty: "Beginner",
    xprange: "50-150 XP",
    color: "from-green-400 to-teal-500",
    href: "/HTML",
  },

];

export default function QuestsPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Choose Your Quest Path ⚔️
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Select a learning path below to start your adventure and earn XP as
          you level up your skills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {questTracks.map((track) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card
                className={`
      relative overflow-hidden bg-white dark:bg-gray-800
      rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
      hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]
      transition-all duration-300 ease-out
    `}
              >
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {track.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {track.description}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="secondary">{track.difficulty}</Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {track.xprange}
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>6 / 10 Quests</span>
                      <span>150 / 200 XP</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-2 bg-gradient-to-r ${track.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <Link href={track.href}>
                    <Button className="w-full mt-4">View Quests</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
