'use client';

import React from 'react';
import { CourseLayout } from '@/components/common/courses/course-layout';
import { SquareSigma } from 'lucide-react';

export default function CalculusPage() {
  const quests = [
    {
      id: 10,
      title: 'Limits & Continuity',
      description: 'Understand how functions behave as they approach specific points or infinity.',
      xp: 25,
      difficulty: 'Beginner' as const,
    },
    {
      id: 2,
      title: 'Derivatives & Rules',
      description: 'Learn how to compute derivatives using power, product, and chain rules.',
      xp: 40,
      difficulty: 'Intermediate' as const,
    },
    {
      id: 8,
      title: 'Applications of Derivatives',
      description: 'Use derivatives for optimization, motion, and curve sketching problems.',
      xp: 50,
      difficulty: 'Intermediate' as const,
    },
    {
      id: 4,
      title: 'Integrals & Area',
      description: 'Discover how to find area under curves using definite and indefinite integrals.',
      xp: 45,
      difficulty: 'Advanced' as const,
    },
    {
      id: 5,
      title: 'Techniques of Integration',
      description: 'Learn advanced integration techniques like substitution and integration by parts.',
      xp: 55,
      difficulty: 'Advanced' as const,
    },
    {
      id: 6,
      title: 'Series & Convergence',
      description: 'Understand infinite series, Taylor series, and how they approximate functions.',
      xp: 60,
      difficulty: 'Advanced' as const,
    },
  ];

  return (
    <CourseLayout
      title="Calculus Fundamentals"
      icon={<SquareSigma size={32} />}
      gradient="from-emerald-400 to-teal-600"
      description="Build a solid understanding of calculus — from limits to integrals and infinite series."
      progress={20}
      totalXP={500}
      quests={quests}
    />
  );
}
