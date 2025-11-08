'use client';

import { CourseLayout } from "@/components/common/courses/course-layout";
import { Code2 } from "lucide-react";
import { useQuestsByCategory } from "@/api/quests";

export default function NextjsPage() {
  const { data: quests = [], isLoading, error } = useQuestsByCategory("Next.js");

  if (isLoading) return <div className="p-8">Loading quests...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading quests: {error.message}</div>;

  const totalXP = quests.reduce((sum, quest) => sum + quest.xp, 0);

  return (
    <CourseLayout
      title="Next.js Mastery"
      icon={<Code2 size={32} />}
      gradient="from-yellow-400 to-orange-500"
      description="Embark on your journey to master the Next.js framework. Build a strong foundation and conquer advanced concepts."
      progress={30} // to be changed later
      totalXP={totalXP}
      quests={quests}
    />
  );

};
