'use clinet';

import React from 'react';
import { Button } from '@/components/common/ui/button';
import { useRouter } from 'next/navigation';
import { Gamepad } from 'lucide-react';

export const QuestsHeader: React.FC = () => {
    const router = useRouter();
   
    return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl p-6 shadow-lg mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-black flex items-center gap-2">
          <Gamepad className="w-6 h-6 text-black 300" />
          SkillQuest Hub
        </h1>
        <p className="mt-2 text-black/90 max-w-xl text-sm md:text-base">
          Embark on epic quests, conquer challenges, and level up your skills!  
          Every quest you complete brings glory, XP, and mastery of coding, math, and more.
        </p>
      </div>

      <div>
        <Button
          size="lg"
          className="bg-black hover:bg-purple-500 text-white hover:text-gray-900 transition-colors"
          onClick={() => router.push('/questPath')}
        >
          See All Quests
        </Button>
      </div>
    </div>
  );
};