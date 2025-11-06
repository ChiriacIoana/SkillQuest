"use client";

import React from "react";
import { CourseLayout } from "@/components/common/courses/course-layout";
import { Code2 } from "lucide-react";

export default function JavaScriptPage() {
  const quests = [
    {
      id: 1,
      title: "Variables & Data Types",
      description: "Learn about let, const, and different JS data types.",
      xp: 20,
      difficulty: "Beginner" as const,
    },
    {
      id: 2,
      title: "Loops & Arrays",
      description: "Understand iteration using for, while, and array methods.",
      xp: 30,
      difficulty: "Intermediate" as const,
    },
    {
      id: 3,
      title: "Functions Deep Dive",
      description:
        "Master function declarations, expressions, and arrow syntax.",
      xp: 40,
      difficulty: "Advanced" as const,
    },
  ];

  return (
    <CourseLayout
      title="JavaScript Mastery"
      icon={<Code2 size={32} />}
      gradient="from-yellow-400 to-orange-500"
      description="Embark on your journey to master the language of the web. Build a strong foundation and conquer advanced concepts."
      progress={30}
      totalXP={200}
        quests={quests}
    />
  );
}
