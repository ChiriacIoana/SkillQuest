'use client';

import { CourseLayout } from "@/components/quests/course-layout";
import { Code2 } from "lucide-react";
import { useQuestsByCategory } from "@/api/quests";
import { GoBackButton } from "@/components/common/ui/goback-button";

export default function HTMLPage() {
  const { data: quests = [], isLoading, error } = useQuestsByCategory("HTML");

  if (isLoading) return <div className="p-8">Loading quests...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading quests: {error.message}</div>;

  const totalXP = quests.reduce((sum, quest) => sum + quest.xp, 0);

  return (
    <CourseLayout
      title="HTML Basics"
      icon={<Code2 size={32} />}
      gradient="from-green-400 to-teal-500"
      description="Master the building blocks of the web by learning HTML — the foundation of all websites."
      progress={30} // to be changed later
      totalXP={totalXP}
      quests={quests}
    />
  );

};