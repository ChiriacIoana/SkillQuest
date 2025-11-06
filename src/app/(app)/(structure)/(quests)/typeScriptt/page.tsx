'use client';

import React from 'react';
import { CourseLayout } from '@/components/common/courses/course-layout';
import { FileCodeCorner } from 'lucide-react';


export default function TypeScriptPage() {
  const quests = [
    {
      id: 1,
      title: 'Getting Started with TypeScript',
      description: 'Set up TypeScript in your project and learn the basics of type checking.',
      xp: 30,
      difficulty: 'Beginner' as const,
    },
    {
      id: 2,
      title: 'Mastering Types & Interfaces',
      description: 'Understand primitive types, custom interfaces, and type aliases.',
      xp: 40,
      difficulty: 'Intermediate' as const,
    },
    {
      id: 3,
      title: 'Generics & Advanced Types',
      description: 'Learn how to create flexible, reusable code using generics and utility types.',
      xp: 50,
      difficulty: 'Advanced' as const,
    },
    {
      id: 4,
      title: 'Type Narrowing & Guards',
      description: 'Explore how to write safer code using type guards and narrowing techniques.',
      xp: 35,
      difficulty: 'Intermediate' as const,
    },
    {
      id: 5,
      title: 'Integrating TypeScript with React',
      description: 'Use props, hooks, and generics effectively in your React + TypeScript projects.',
      xp: 60,
      difficulty: 'Advanced' as const,
    },
  ];

  return (
    <CourseLayout
      title="TypeScript Pro"
      icon={<FileCodeCorner size={32} />}
      gradient="from-blue-500 to-indigo-700"
      description="Upgrade your JavaScript skills by mastering TypeScript — the language of scalable web apps."
      progress={45}
      totalXP={400}
      quests={quests}
    />
  );
}
