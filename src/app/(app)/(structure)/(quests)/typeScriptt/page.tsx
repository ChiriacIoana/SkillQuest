'use client';

import React from 'react';
import { CourseLayout } from '@/components/common/courses/course-layout';
import { FileCodeCorner } from 'lucide-react';
import { useQuestsByCategory } from '@/api/quests';


export default function TypeScriptPage() {
  const { data: quests = [], isLoading, error } = useQuestsByCategory("typescriptt");
  
    if (isLoading) return <div className="p-8">Loading quests...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading quests: {error.message}</div>;
  
    const totalXP = quests.reduce((sum, quest) => sum + quest.xp, 0);
  

  return (
    <CourseLayout
      title="TypeScript Pro"
      icon={<FileCodeCorner size={32} />}
      gradient="from-blue-500 to-indigo-700"
      description="Upgrade your JavaScript skills by mastering TypeScript — the language of scalable web apps."
      progress={45}
      totalXP={totalXP}
      quests={quests}
    />
  );
}
