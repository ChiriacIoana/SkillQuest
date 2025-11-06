'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { CourseLayout } from '@/components/common/courses/course-layout';

const quests = [
  { id: 1, title: 'Variables & Data Types', description: 'Learn JS syntax', xp: 20 },
  { id: 2, title: 'Loops & Arrays', description: 'Understand loops', xp: 30 },
];

export default function QuestPage() {
  const params = useParams();
  const questId = Number(params.questId);
  const quest = quests.find((q) => q.id === questId);

  if (!quest) return <p>Quest not found!</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{quest.title}</h1>
      <p className="mt-2">{quest.description}</p>
      <p className="mt-2 font-bold">{quest.xp} XP</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Start Quest</button>
    </div>
  );
}
