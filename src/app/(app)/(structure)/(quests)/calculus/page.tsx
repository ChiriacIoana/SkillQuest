'use client';

import React from 'react';
import { CourseLayout } from '@/components/common/courses/course-layout';
import { SquareSigma } from 'lucide-react';
import { useQuestsByCategory } from '@/api/quests';

export default function CalculusPage() {


    

    const { data, isLoading, error } = useQuestsByCategory("calculus");
const quests = data ?? []; 
    if (isLoading) return <div className="p-8">Loading quests...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading quests: {error.message}</div>;

const totalXP = quests.reduce((sum, quest) => sum + quest.xp, 0);
    
  return (
    <CourseLayout
      title="Calculus Fundamentals"
      icon={<SquareSigma size={32} />}
      gradient="from-emerald-400 to-teal-600"
      description="Build a solid understanding of calculus — from limits to integrals and infinite series."
      progress={20}
      totalXP={totalXP}
      quests={quests}
    />
  );
}
