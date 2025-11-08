'use client';

import React from 'react';
import { CourseLayout } from '@/components/common/courses/course-layout';
import { FileCodeCorner } from 'lucide-react';
import { useQuestsByCategory } from '@/api/quests';


export default function NodejsPage() {
  const { data: quests = [], isLoading, error } = useQuestsByCategory("NodeJs");
  
    if (isLoading) return <div className="p-8">Loading quests...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading quests: {error.message}</div>;
  
    const totalXP = quests.reduce((sum, quest) => sum + quest.xp, 0);
  

  return (
    <CourseLayout
      title="Node.js Development"
      icon={<FileCodeCorner size={32} />}
      gradient="from-pink-400 to-red-500"
      description="Upgrade your JavaScript skills by mastering Node.js — the runtime for building scalable server-side applications."
      progress={45}
      totalXP={totalXP}
      quests={quests}
    />
  );
}
