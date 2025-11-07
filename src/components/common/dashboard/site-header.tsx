'use client';

import Image from 'next/image';
import { Card, CardHeader } from '@/components/common/ui/card';
import { Orbitron } from 'next/font/google';
import { Share_Tech } from 'next/font/google';

const shareTech = Share_Tech({ subsets: ['latin'], weight: '400' });

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400','700'] });

export function SiteHeader() {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center gap-4 p-0">
        <img
          src="/sq_logo_v2.png"    
          alt="SkillQuest Logo"
          width={60}
          height={70}
          className="ml-8"
        />

        <h1
           className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.2em] 
              text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-500
              uppercase select-none ml-4 sm:ml-10 lg:ml-24 ${shareTech.className}`}
          style={{
            transform: 'scaleX(1.1)', 
          }}
        >
          SkillQuest
        </h1>
      </CardHeader>
    </Card>
  );
}