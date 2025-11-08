'use client';

import React from 'react';
import { CourseLayout } from '@/components/common/courses/course-layout';
import { SquareSigma } from 'lucide-react';
import { useQuestsByCategory } from '@/api/quests';

export default function ReactPage() {

    const { data, isLoading, error } = useQuestsByCategory("React");
const quests = data ?? []; 
    if (isLoading) return <div className="p-8">Loading quests...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading quests: {error.message}</div>;

const totalXP = quests.reduce((sum, quest) => sum + quest.xp, 0);
    
  return (
    <CourseLayout
      title="React Development"
      icon={<SquareSigma size={32} />}
      gradient="from-emerald-400 to-teal-600"
      description="Build dynamic web applications using React and component-based architecture."
      progress={20}
      totalXP={totalXP}
      quests={quests}
    />
  );
}
